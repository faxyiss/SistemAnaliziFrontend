<template>
  <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="emit('close')"></div>

    <div
      class="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm overflow-hidden transform transition-all z-10"
    >
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 class="text-base font-bold text-slate-800 flex items-center gap-2">
          <FolderPlusIcon :size="18" class="text-blue-600" />
          Yeni Gider Kategorisi
        </h3>
        <button
          @click="emit('close')"
          class="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
        >
          <XIcon :size="18" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
            >Kategori Adı</label
          >
          <input
            v-model="categoryName"
            type="text"
            required
            :disabled="isSaving"
            placeholder="Örn: Faturalar, Ofis, Personel..."
            class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm disabled:opacity-60"
          />
        </div>

        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
          <button
            type="button"
            @click="emit('close')"
            :disabled="isSaving"
            class="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            İptal
          </button>
          <button
            type="submit"
            :disabled="isSaving"
            class="px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 transition-colors flex items-center gap-1 disabled:opacity-60"
          >
            {{ isSaving ? 'Kaydediliyor...' : 'Kategoriyi Ekle' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { FolderPlusIcon, XIcon } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add', category: any): void
}>()

const categoryName = ref('')
const isSaving = ref(false)

watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) categoryName.value = ''
  },
)

const handleSubmit = async () => {
  if (!categoryName.value.trim() || isSaving.value) return

  isSaving.value = true
  try {
    // Kendi API mantığına uyarlayabilirsin
    const newCategory = { id: Date.now().toString(), name: categoryName.value.trim(), type: 1 }
    emit('add', newCategory)
    emit('close')
  } catch (error) {
    console.error('Kategori eklenirken hata oluştu:', error)
  } finally {
    isSaving.value = false
  }
}
</script>
