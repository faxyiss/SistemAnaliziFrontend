<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="emit('close')"></div>

    <div
      class="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-2xl overflow-hidden transform transition-all z-10"
    >
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 class="text-base font-bold text-slate-800 flex items-center gap-2">
          <ReceiptIcon :size="18" class="text-blue-600" />
          Yeni Gider Tanımla
        </h3>
        <button
          @click="emit('close')"
          class="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
        >
          <XIcon :size="18" />
        </button>
      </div>

      <form @submit.prevent="submitForm" class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
              >Gider Başlığı</label
            >
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="Örn: Elektrik Faturası"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
              >Tutar (₺)</label
            >
            <input
              v-model.number="form.amount"
              type="number"
              step="0.01"
              min="0.01"
              required
              class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide"
                >Kategori</label
              >
              <button
                type="button"
                @click="isCategoryModalOpen = true"
                class="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                <PlusIcon :size="14" />
                Yeni Kategori Ekle
              </button>
            </div>

            <div class="relative w-full">
              <button
                @click="isDropdownOpen = !isDropdownOpen"
                type="button"
                class="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-600 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <span class="truncate font-medium" :class="{ 'text-slate-400': !form.categoryId }">
                  {{ selectedCategoryName }}
                </span>
                <ChevronDownIcon
                  class="text-slate-400 transition-transform duration-200"
                  :class="{ 'rotate-180': isDropdownOpen }"
                  :size="16"
                />
              </button>

              <div
                v-if="isDropdownOpen"
                class="fixed inset-0 z-40"
                @click="isDropdownOpen = false"
              ></div>

              <div
                v-if="isDropdownOpen"
                class="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 space-y-2 max-h-60 flex flex-col"
              >
                <div class="relative flex-shrink-0">
                  <SearchIcon
                    class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                    :size="14"
                  />
                  <input
                    v-model="categorySearchText"
                    type="text"
                    placeholder="Kategori ara..."
                    class="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-xs transition-all"
                    @click.stop
                  />
                </div>

                <div class="overflow-y-auto flex-1 space-y-0.5 max-h-40 custom-scrollbar">
                  <button
                    v-for="cat in filteredCategories"
                    :key="cat.id"
                    @click="selectCategory(cat.id)"
                    type="button"
                    class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors truncate"
                    :class="
                      form.categoryId === cat.id
                        ? 'bg-blue-50 text-blue-600 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    "
                  >
                    {{ cat.name }}
                  </button>

                  <div
                    v-if="filteredCategories.length === 0"
                    class="text-center py-3 text-xs text-slate-400"
                  >
                    Kategori bulunamadı.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
              >Gider Tipi</label
            >
            <div class="relative">
              <select
                v-model.number="form.expenseType"
                required
                class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white appearance-none"
              >
                <option :value="0">Tek Seferlik</option>
                <option :value="1">Aylık Sabit</option>
                <option :value="2">Dönemsel</option>
              </select>
              <ChevronDownIcon
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                :size="16"
              />
            </div>
          </div>
        </div>

        <div class="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
              >
                {{ form.expenseType === 2 ? 'Dönem Başlangıcı' : 'İşlem Tarihi' }}
              </label>
              <input
                v-model="form.startDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white"
              />
            </div>

            <div v-if="form.expenseType === 2">
              <label
                class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
                >Dönem Bitiş Tarihi</label
              >
              <input
                v-model="form.endDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white"
              />
            </div>

            <div v-if="form.expenseType === 1">
              <label
                class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
                >Her Ayın Kaçıncı Günü?</label
              >
              <input
                v-model.number="form.recurringDay"
                type="number"
                min="1"
                max="31"
                required
                class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white"
              />
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
            >Açıklama & Notlar (Opsiyonel)</label
          >
          <textarea
            v-model="form.notes"
            rows="2"
            class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
            placeholder="Gider ile ilgili eklemek istediğiniz detaylar..."
          ></textarea>
        </div>

        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 transition-colors flex items-center gap-1"
          >
            Gideri Kaydet
          </button>
        </div>
      </form>
    </div>

    <AddExpenseCategoryModal
      :is-open="isCategoryModalOpen"
      @close="isCategoryModalOpen = false"
      @add="handleAddNewCategory"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref, computed } from 'vue'
import { XIcon, ReceiptIcon, PlusIcon, ChevronDownIcon, SearchIcon } from 'lucide-vue-next'
import AddExpenseCategoryModal from './AddExpenseCategoryModal.vue'

const props = defineProps<{
  isOpen: boolean
  categories: any[]
}>()

const emit = defineEmits(['close', 'saved', 'add-category'])

const isCategoryModalOpen = ref(false)
const isDropdownOpen = ref(false)
const categorySearchText = ref('')

const defaultForm = {
  categoryId: '',
  title: '',
  amount: null as number | null,
  expenseType: 0,
  startDate: new Date().toISOString().split('T')[0],
  endDate: null,
  recurringDay: null,
  notes: '',
}

const form = reactive({ ...defaultForm })

const selectedCategoryName = computed(() => {
  if (!form.categoryId) return 'Kategori Seçiniz...'
  const found = props.categories.find((c) => c.id === form.categoryId)
  return found ? found.name : 'Kategori Seçiniz...'
})

const filteredCategories = computed(() => {
  const search = categorySearchText.value.trim().toLowerCase()
  if (!search) return props.categories
  return props.categories.filter((c) => c.name.toLowerCase().includes(search))
})

const selectCategory = (catId: string) => {
  form.categoryId = catId
  isDropdownOpen.value = false
  categorySearchText.value = ''
}

const handleAddNewCategory = (createdCategory: any) => {
  emit('add-category', createdCategory)
  form.categoryId = createdCategory.id
  isCategoryModalOpen.value = false
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      Object.assign(form, defaultForm)
      isDropdownOpen.value = false
      categorySearchText.value = ''
    }
  },
)

watch(
  () => form.expenseType,
  (newType) => {
    if (newType !== 2) form.endDate = null
    if (newType !== 1) form.recurringDay = null
  },
)

const submitForm = async () => {
  if (!form.categoryId) {
    alert('Lütfen bir kategori seçiniz.')
    return
  }
  try {
    emit('saved', { ...form, id: Date.now() })
  } catch (error) {
    console.error('Kaydetme hatası', error)
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
