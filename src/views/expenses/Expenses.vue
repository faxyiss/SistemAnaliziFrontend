<template>
  <div class="space-y-6">
    <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="relative w-full md:w-80">
          <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
          <input
            v-model="searchText"
            type="text"
            placeholder="Gider başlığı veya notu ara..."
            class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>

        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto z-30">
          <button
            @click="isCategoryModalOpen = true"
            class="w-full md:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-4 py-2.5 rounded-xl font-medium transition-all text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20"
          >
            <FolderPlusIcon :size="16" class="text-blue-600" />
            Kategori Yönetimi
          </button>

          <button
            @click="isExpenseModalOpen = true"
            class="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm shadow-sm shadow-blue-200"
          >
            <PlusIcon :size="18" />
            Yeni Gider Tanımla
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse table-auto">
          <thead>
            <tr
              class="bg-slate-50/60 border-b border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider"
            >
              <th class="py-4 px-4 text-center w-14">No</th>
              <th class="py-4 px-4 min-w-[280px]">Gider Bilgisi</th>
              <th class="py-4 px-4 min-w-[140px]">Kategori</th>
              <th class="py-4 px-4 min-w-[130px]">Gider Tipi</th>
              <th class="py-4 px-4 min-w-[130px]">İşlem Tarihi</th>
              <th class="py-4 px-4 min-w-[130px] text-right">Tutar</th>
              <th class="py-4 px-4 text-right min-w-[120px]">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700 text-sm">
            <tr v-if="filteredExpenses.length === 0">
              <td colspan="7" class="py-12 text-center text-slate-400 font-medium">
                Aradığınız kriterlere uygun gider bulunamadı.
              </td>
            </tr>

            <tr
              v-else
              v-for="(expense, index) in filteredExpenses"
              :key="expense.id"
              class="hover:bg-slate-50/40 transition-colors"
            >
              <td class="py-4 px-4 text-center font-bold text-slate-400 align-middle">
                #{{ index + 1 }}
              </td>

              <td class="py-4 px-4 align-middle">
                <div class="flex items-center gap-3">
                  <div
                    class="flex-shrink-0 w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/50 flex items-center justify-center text-slate-500"
                  >
                    <ReceiptIcon :size="18" />
                  </div>
                  <div class="flex flex-col min-w-0 max-w-[240px]">
                    <span class="font-bold text-slate-800 text-sm truncate" :title="expense.title">
                      {{ expense.title }}
                    </span>
                    <span
                      v-if="expense.notes"
                      class="text-xs text-slate-400 truncate mt-0.5"
                      :title="expense.notes"
                    >
                      {{ expense.notes }}
                    </span>
                  </div>
                </div>
              </td>

              <td class="py-4 px-4 align-middle whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200"
                >
                  {{ getCategoryName(expense.categoryId) }}
                </span>
              </td>

              <td class="py-4 px-4 align-middle whitespace-nowrap">
                <div class="flex items-center gap-1.5">
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold border',
                      getExpenseTypeStyles(expense.expenseType),
                    ]"
                  >
                    {{ getExpenseTypeName(expense.expenseType) }}
                  </span>
                </div>
              </td>

              <td class="py-4 px-4 align-middle whitespace-nowrap">
                <div class="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                  <CalendarIcon :size="14" />
                  {{ expense.startDate }}
                </div>
              </td>

              <td
                class="py-4 px-4 align-middle font-bold text-slate-800 text-right whitespace-nowrap"
              >
                ₺{{ expense.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) }}
              </td>

              <td class="py-4 px-4 align-middle text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-1.5">
                  <button
                    class="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Düzenle"
                  >
                    <EditIcon :size="15" />
                  </button>
                  <button
                    @click="deleteExpense(expense.id)"
                    class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Sil"
                  >
                    <Trash2Icon :size="15" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 bg-slate-50/30 font-medium"
      >
        <span
          >Toplam <b class="text-slate-600">{{ filteredExpenses.length }}</b> adet gider kaydı
          listeleniyor.</span
        >
      </div>
    </div>

    <AddExpenseCategoryModal
      :is-open="isCategoryModalOpen"
      @close="isCategoryModalOpen = false"
      @add="(cat) => categories.push(cat)"
    />

    <AddExpenseModal
      :is-open="isExpenseModalOpen"
      :categories="categories"
      @close="isExpenseModalOpen = false"
      @saved="handleExpenseSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SearchIcon,
  PlusIcon,
  FolderPlusIcon,
  ReceiptIcon,
  CalendarIcon,
  EditIcon,
  Trash2Icon,
} from 'lucide-vue-next'

import AddExpenseCategoryModal from './AddExpenseCategoryModal.vue'
import AddExpenseModal from './AddExpenseModal.vue'

// Durum Yönetimleri
const isCategoryModalOpen = ref(false)
const isExpenseModalOpen = ref(false)
const searchText = ref('')

// Örnek Kategoriler (Gerçek veriyi API'den çekeceksin)
const categories = ref([
  { id: '1', name: 'Ofis Malzemeleri' },
  { id: '2', name: 'Faturalar' },
])

// Örnek Giderler Listesi
const expenses = ref<any[]>([
  {
    id: 1,
    title: 'Elektrik Faturası',
    notes: 'Mayıs 2026 Tüketimi',
    categoryId: '2',
    expenseType: 1,
    startDate: '2026-05-18',
    amount: 1250.0,
  },
  {
    id: 2,
    title: 'Kırtasiye Alışverişi',
    notes: 'A4 Kağıt, Kalem, Zımba',
    categoryId: '1',
    expenseType: 0,
    startDate: '2026-05-15',
    amount: 850.5,
  },
])

// Arama Filtresi
const filteredExpenses = computed(() => {
  if (!searchText.value) return expenses.value
  return expenses.value.filter(
    (e) =>
      e.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
      (e.notes && e.notes.toLowerCase().includes(searchText.value.toLowerCase())),
  )
})

// Yardımcı Metotlar
const getCategoryName = (id: string) => {
  const cat = categories.value.find((c) => c.id === id)
  return cat ? cat.name : 'Belirtilmedi'
}

const getExpenseTypeName = (type: number) => {
  if (type === 0) return 'Tek Seferlik'
  if (type === 1) return 'Aylık Sabit'
  if (type === 2) return 'Dönemsel'
  return 'Diğer'
}

const getExpenseTypeStyles = (type: number) => {
  if (type === 0) return 'bg-emerald-50 text-emerald-600 border-emerald-100'
  if (type === 1) return 'bg-blue-50 text-blue-600 border-blue-100'
  if (type === 2) return 'bg-amber-50 text-amber-600 border-amber-100'
  return 'bg-slate-50 text-slate-600 border-slate-100'
}

// Aksiyon Metotları
const handleExpenseSaved = (newExpense: any) => {
  expenses.value.unshift(newExpense)
  isExpenseModalOpen.value = false
}

const deleteExpense = (id: number) => {
  if (confirm('Bu gideri silmek istediğinize emin misiniz?')) {
    expenses.value = expenses.value.filter((e) => e.id !== id)
  }
}
</script>

<style scoped>
/* Sistemindeki diğer tablolarla uyumlu zarif kaydırma çubuğu */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
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
