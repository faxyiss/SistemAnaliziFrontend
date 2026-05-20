<template>
  <div class="space-y-6">
    <!-- Satış & Finans Kartları -->
    <div>
      <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Satış & Finans</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">Bu Ayki Ciro</p>
            <h3 class="text-2xl font-bold text-slate-800 mt-1">
              {{ isLoadingSales ? '...' : formatCurrency(monthlySales.totalRevenue) }}
            </h3>
            <p class="text-xs text-slate-400 mt-1">{{ currentMonthLabel }}</p>
          </div>
          <div class="p-3 bg-emerald-50 rounded-xl flex-shrink-0">
            <TrendingUpIcon :size="22" class="text-emerald-500" />
          </div>
        </div>

        <div
          class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Bu Ayki Giderler
            </p>
            <h3 class="text-2xl font-bold text-slate-800 mt-1">
              {{ isLoadingExpenses ? '...' : formatCurrency(monthlyExpense) }}
            </h3>
            <p class="text-xs text-slate-400 mt-1">Operasyonel giderler</p>
          </div>
          <div class="p-3 bg-red-50 rounded-xl flex-shrink-0">
            <ReceiptIcon :size="22" class="text-red-500" />
          </div>
        </div>

        <div
          class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Personel Maliyeti
            </p>
            <h3 class="text-2xl font-bold text-slate-800 mt-1">
              {{ isLoadingEmployees ? '...' : formatCurrency(employeeSummary.totalEmployerCost) }}
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              {{ employeeSummary.activeEmployees }} aktif personel
            </p>
          </div>
          <div class="p-3 bg-blue-50 rounded-xl flex-shrink-0">
            <UsersIcon :size="22" class="text-blue-500" />
          </div>
        </div>

        <div
          class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Bekleyen Veresiye
            </p>
            <h3 class="text-2xl font-bold text-amber-600 mt-1">
              {{ isLoadingCustomers ? '...' : formatCurrency(totalDebt) }}
            </h3>
            <p class="text-xs text-slate-400 mt-1">{{ debtorCount }} borçlu müşteri</p>
          </div>
          <div class="p-3 bg-amber-50 rounded-xl flex-shrink-0">
            <ClockIcon :size="22" class="text-amber-500" />
          </div>
        </div>
      </div>
    </div>

    <!-- Stok & Üretim Kartları -->
    <div>
      <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Stok & Üretim</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Envanter Değeri
            </p>
            <h3 class="text-2xl font-bold text-slate-800 mt-1">
              {{ isLoadingProducts ? '...' : formatCurrency(totalInventoryValue) }}
            </h3>
            <p class="text-xs text-slate-400 mt-1">{{ totalProductCount }} ürün çeşidi</p>
          </div>
          <div class="p-3 bg-indigo-50 rounded-xl flex-shrink-0">
            <PackageIcon :size="22" class="text-indigo-500" />
          </div>
        </div>

        <div
          class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Biten Ürünler
            </p>
            <h3
              class="text-2xl font-bold mt-1"
              :class="outOfStockCount > 0 ? 'text-red-600' : 'text-slate-800'"
            >
              {{ isLoadingProducts ? '...' : `${outOfStockCount} Ürün` }}
            </h3>
            <p class="text-xs text-slate-400 mt-1">Stoku tükenen ürünler</p>
          </div>
          <div
            class="p-3 rounded-xl flex-shrink-0"
            :class="outOfStockCount > 0 ? 'bg-red-50' : 'bg-slate-50'"
          >
            <AlertTriangleIcon
              :size="22"
              :class="outOfStockCount > 0 ? 'text-red-500' : 'text-slate-300'"
            />
          </div>
        </div>

        <div
          class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Hammadde Değeri
            </p>
            <h3 class="text-2xl font-bold text-slate-800 mt-1">
              {{ isLoadingRawMaterials ? '...' : formatCurrency(totalRawMaterialValue) }}
            </h3>
            <p class="text-xs text-slate-400 mt-1">{{ totalRawMaterialCount }} hammadde çeşidi</p>
          </div>
          <div class="p-3 bg-orange-50 rounded-xl flex-shrink-0">
            <LayersIcon :size="22" class="text-orange-500" />
          </div>
        </div>

        <div
          class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">Bu Ay Üretim</p>
            <h3 class="text-2xl font-bold text-slate-800 mt-1">
              {{ isLoadingProduction ? '...' : `${productionSummary.totalQuantity} Adet` }}
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              {{ formatCurrency(productionSummary.totalCost) }} maliyet
            </p>
          </div>
          <div class="p-3 bg-purple-50 rounded-xl flex-shrink-0">
            <SettingsIcon :size="22" class="text-purple-500" />
          </div>
        </div>
      </div>
    </div>

    <!-- Grafik + Son Satışlar -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Gelir & Gider Grafiği -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 lg:col-span-2">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <h3 class="font-bold text-slate-800 text-base">Aylık Gelir & Gider</h3>
          <div class="flex items-center gap-1.5">
            <button
              v-for="y in years"
              :key="y"
              @click="selectYear(y)"
              class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
              :class="
                summaryYear === y
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-100'
              "
            >
              {{ y }}
            </button>
          </div>
        </div>
        <div
          v-if="isLoadingChart"
          class="h-64 flex items-center justify-center text-slate-400 text-sm"
        >
          Grafik yükleniyor...
        </div>
        <div v-else class="h-64">
          <apexchart type="bar" height="100%" :options="chartOptions" :series="chartSeries" />
        </div>
      </div>

      <!-- Son Satışlar -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <h3 class="font-bold text-slate-800 text-base">Son Satışlar</h3>
          <router-link
            to="/sales"
            class="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Tümü →
          </router-link>
        </div>

        <div v-if="isLoadingSales" class="py-8 text-center text-slate-400 text-sm">
          Yükleniyor...
        </div>

        <div v-else-if="recentSales.length === 0" class="py-8 text-center">
          <ShoppingCartIcon :size="28" class="text-slate-200 mx-auto mb-2" />
          <p class="text-sm text-slate-400">Henüz satış yok</p>
        </div>

        <div v-else class="space-y-2.5">
          <div
            v-for="sale in recentSales"
            :key="sale.id"
            class="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <div
                class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0"
              >
                <ShoppingCartIcon :size="13" class="text-emerald-600" />
              </div>
              <div class="min-w-0">
                <p class="text-xs font-bold text-slate-800 truncate">{{ sale.productName }}</p>
                <p class="text-[11px] text-slate-400 mt-0.5">
                  {{ sale.customerName || 'Perakende' }} · {{ formatDate(sale.saleDate) }}
                </p>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-xs font-bold text-emerald-600">
                {{ formatCurrency(sale.totalAmount) }}
              </p>
              <span
                class="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                :class="paymentBadge(sale.paymentType)"
              >
                {{ sale.paymentType }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Finansal Özet -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <h3 class="font-bold text-slate-800 text-base">{{ currentMonthLabel }} — Finansal Özet</h3>
        <span class="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg font-semibold"
          >Bu Ay</span
        >
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="text-center p-3 rounded-xl bg-emerald-50 border border-emerald-100">
          <p class="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Toplam Gelir</p>
          <p class="text-lg font-bold text-emerald-700 mt-1">
            {{ formatCurrency(monthlySales.totalRevenue) }}
          </p>
        </div>
        <div class="text-center p-3 rounded-xl bg-red-50 border border-red-100">
          <p class="text-xs text-red-500 font-semibold uppercase tracking-wide">Toplam Gider</p>
          <p class="text-lg font-bold text-red-600 mt-1">
            {{ formatCurrency(totalMonthlyExpenses) }}
          </p>
        </div>
        <div
          class="text-center p-3 rounded-xl border"
          :class="estimatedProfit >= 0 ? 'bg-blue-50 border-blue-100' : 'bg-red-50 border-red-100'"
        >
          <p
            class="text-xs font-semibold uppercase tracking-wide"
            :class="estimatedProfit >= 0 ? 'text-blue-600' : 'text-red-500'"
          >
            Tahmini Kâr
          </p>
          <p
            class="text-lg font-bold mt-1"
            :class="estimatedProfit >= 0 ? 'text-blue-700' : 'text-red-600'"
          >
            {{ formatCurrency(estimatedProfit) }}
          </p>
        </div>
        <div class="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
          <p class="text-xs text-slate-500 font-semibold uppercase tracking-wide">Personel Yükü</p>
          <p class="text-lg font-bold text-slate-700 mt-1">
            {{ formatCurrency(employeeSummary.totalEmployerCost) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  TrendingUpIcon,
  ReceiptIcon,
  UsersIcon,
  ClockIcon,
  ShoppingCartIcon,
  PackageIcon,
  AlertTriangleIcon,
  LayersIcon,
  SettingsIcon,
} from 'lucide-vue-next'

const BASE_URL = '/api'
const getToken = () => localStorage.getItem('token')

const now = new Date()
const currentMonth = now.getMonth() + 1
const currentYear = now.getFullYear()
const summaryYear = ref(currentYear)
const years = [currentYear - 1, currentYear]

const currentMonthLabel = computed(() =>
  now.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
)

// ── Loading ────────────────────────────────────────────────
const isLoadingSales = ref(false)
const isLoadingExpenses = ref(false)
const isLoadingEmployees = ref(false)
const isLoadingCustomers = ref(false)
const isLoadingProducts = ref(false)
const isLoadingRawMaterials = ref(false)
const isLoadingProduction = ref(false)
const isLoadingChart = ref(true)

// ── Data ───────────────────────────────────────────────────
const monthlySales = ref({ totalRevenue: 0, totalItems: 0 })
const recentSales = ref<any[]>([])
const yearlySales = ref<any[]>([])
const monthlyExpense = ref(0)
const expenseSummary = ref<any[]>([])
const employeeSummary = ref({ totalEmployerCost: 0, totalNetSalary: 0, activeEmployees: 0 })
const totalDebt = ref(0)
const debtorCount = ref(0)
const totalInventoryValue = ref(0)
const totalProductCount = ref(0)
const outOfStockCount = ref(0)
const totalRawMaterialValue = ref(0)
const totalRawMaterialCount = ref(0)
const productionSummary = ref({ totalQuantity: 0, totalCost: 0 })

// ── Computed ───────────────────────────────────────────────
const totalMonthlyExpenses = computed(
  () => monthlyExpense.value + employeeSummary.value.totalEmployerCost,
)
const estimatedProfit = computed(() => monthlySales.value.totalRevenue - totalMonthlyExpenses.value)

// ── Grafik ─────────────────────────────────────────────────
const turkishMonths = [
  'Oca',
  'Şub',
  'Mar',
  'Nis',
  'May',
  'Haz',
  'Tem',
  'Ağu',
  'Eyl',
  'Eki',
  'Kas',
  'Ara',
]

const monthlyRevenueData = computed(() => {
  const data = Array(12).fill(0)
  yearlySales.value.forEach((sale: any) => {
    const m = new Date(sale.saleDate).getMonth()
    if (m >= 0 && m < 12) data[m] += Number(sale.totalAmount) || 0
  })
  return data
})

const monthlyExpenseData = computed(() => {
  const data = Array(12).fill(0)
  expenseSummary.value.forEach((item: any) => {
    if (item.month >= 1 && item.month <= 12) data[item.month - 1] = Number(item.totalAmount) || 0
  })
  return data
})

const chartSeries = computed(() => [
  { name: 'Gelir (Ciro)', data: monthlyRevenueData.value },
  { name: 'Gider', data: monthlyExpenseData.value },
])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    fontFamily: 'inherit',
    toolbar: { show: false },
    zoom: { enabled: false },
    stacked: true,
    stackType: 'normal',
  },
  colors: ['#10b981', '#ef4444'],
  plotOptions: {
    bar: { horizontal: false, borderRadius: 4, borderRadiusApplication: 'end', columnWidth: '50%' },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: turkishMonths,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { fontSize: '11px', colors: Array(12).fill('#94a3b8') } },
  },
  yaxis: {
    labels: {
      formatter: (v: number) => (v >= 1000 ? `₺${(v / 1000).toFixed(0)}k` : `₺${v}`),
      style: { fontSize: '11px', colors: ['#94a3b8'] },
    },
  },
  grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
  legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px' },
  tooltip: { theme: 'light', y: { formatter: (v: number) => formatCurrency(v) } },
}))

// ── Helpers ────────────────────────────────────────────────
const formatCurrency = (v: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(v ?? 0)

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })

const paymentBadge = (type: string) => {
  const t = (type || '').toLowerCase()
  if (t === 'cash' || t === 'nakit') return 'bg-emerald-50 text-emerald-600'
  if (t === 'credit' || t === 'veresiye') return 'bg-amber-50 text-amber-600'
  return 'bg-slate-100 text-slate-500'
}

// ── API ────────────────────────────────────────────────────
const fetchMonthlySales = async () => {
  isLoadingSales.value = true
  try {
    const start = new Date(currentYear, currentMonth - 1, 1).toISOString()
    const end = new Date(currentYear, currentMonth, 0, 23, 59, 59).toISOString()
    const res = await fetch(
      `${BASE_URL}/Sales/history?startDate=${start}&endDate=${end}&page=1&pageSize=5&sortBy=date_desc`,
      { headers: { Authorization: `Bearer ${getToken()}` } },
    )
    if (res.ok) {
      const data = await res.json()
      monthlySales.value = {
        totalRevenue: data.totalRevenue ?? 0,
        totalItems: data.totalItems ?? 0,
      }
      recentSales.value = data.items ?? []
    }
  } catch {
    console.error('Satışlar çekilemedi.')
  } finally {
    isLoadingSales.value = false
  }
}

const fetchYearlySales = async () => {
  isLoadingChart.value = true
  try {
    const start = new Date(summaryYear.value, 0, 1).toISOString()
    const end = new Date(summaryYear.value, 11, 31, 23, 59, 59).toISOString()
    const res = await fetch(
      `${BASE_URL}/Sales/history?startDate=${start}&endDate=${end}&page=1&pageSize=9999`,
      { headers: { Authorization: `Bearer ${getToken()}` } },
    )
    if (res.ok) {
      const data = await res.json()
      yearlySales.value = data.items ?? []
    }
  } catch {
    console.error('Yıllık satışlar çekilemedi.')
  } finally {
    isLoadingChart.value = false
  }
}

const fetchExpenses = async () => {
  isLoadingExpenses.value = true
  try {
    const [r1, r2] = await Promise.all([
      fetch(`${BASE_URL}/Expenses?page=1&pageSize=1&month=${currentMonth}&year=${currentYear}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
      fetch(`${BASE_URL}/Expenses/summary?year=${summaryYear.value}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
    ])
    if (r1.ok) {
      const d = await r1.json()
      monthlyExpense.value = d.totalAmount ?? 0
    }
    if (r2.ok) expenseSummary.value = await r2.json()
  } catch {
    console.error('Giderler çekilemedi.')
  } finally {
    isLoadingExpenses.value = false
  }
}

const fetchEmployeeSummary = async () => {
  isLoadingEmployees.value = true
  try {
    const res = await fetch(
      `${BASE_URL}/Employees/summary?month=${currentMonth}&year=${currentYear}`,
      { headers: { Authorization: `Bearer ${getToken()}` } },
    )
    if (res.ok) employeeSummary.value = await res.json()
  } catch {
    console.error('Personel özeti çekilemedi.')
  } finally {
    isLoadingEmployees.value = false
  }
}

const fetchDebtors = async () => {
  isLoadingCustomers.value = true
  try {
    const res = await fetch(`${BASE_URL}/Customers?debtFilter=has_debt&page=1&pageSize=999`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    if (res.ok) {
      const data = await res.json()
      const items = data.items ?? []
      totalDebt.value = items.reduce((s: number, c: any) => s + (c.currentBalance ?? 0), 0)
      debtorCount.value = items.length
    }
  } catch {
    console.error('Müşteri borçları çekilemedi.')
  } finally {
    isLoadingCustomers.value = false
  }
}

const fetchProducts = async () => {
  isLoadingProducts.value = true
  try {
    const res = await fetch(`${BASE_URL}/Products/search?page=1&pageSize=999`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    if (res.ok) {
      const data = await res.json()
      const items: any[] = data.items ?? []
      totalProductCount.value = items.length
      totalInventoryValue.value = items.reduce((s, p) => s + (p.totalCostValue ?? 0), 0)
      outOfStockCount.value = items.filter((p) => (p.remainingQuantity ?? 0) === 0).length
    }
  } catch {
    console.error('Ürünler çekilemedi.')
  } finally {
    isLoadingProducts.value = false
  }
}

const fetchRawMaterials = async () => {
  isLoadingRawMaterials.value = true
  try {
    const res = await fetch(`${BASE_URL}/Products/raw-materials?page=1&pageSize=999`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    if (res.ok) {
      const data = await res.json()
      const items: any[] = data.items ?? []
      totalRawMaterialCount.value = items.length
      totalRawMaterialValue.value = items.reduce((s, p) => s + (p.totalCostValue ?? 0), 0)
    }
  } catch {
    console.error('Hammaddeler çekilemedi.')
  } finally {
    isLoadingRawMaterials.value = false
  }
}

const fetchProduction = async () => {
  isLoadingProduction.value = true
  try {
    const start = new Date(currentYear, currentMonth - 1, 1).toISOString()
    const end = new Date(currentYear, currentMonth, 0, 23, 59, 59).toISOString()
    const res = await fetch(
      `${BASE_URL}/Production/logs?page=1&pageSize=999&startDate=${start}&endDate=${end}`,
      { headers: { Authorization: `Bearer ${getToken()}` } },
    )
    if (res.ok) {
      const data = await res.json()
      productionSummary.value = {
        totalQuantity: data.summaryTotalQuantity ?? 0,
        totalCost: data.summaryTotalCost ?? 0,
      }
    }
  } catch {
    console.error('Üretim özeti çekilemedi.')
  } finally {
    isLoadingProduction.value = false
  }
}

const selectYear = async (y: number) => {
  summaryYear.value = y
  isLoadingChart.value = true
  await Promise.all([fetchYearlySales(), fetchExpenses()])
  isLoadingChart.value = false
}

onMounted(() => {
  fetchMonthlySales()
  fetchYearlySales()
  fetchExpenses()
  fetchEmployeeSummary()
  fetchDebtors()
  fetchProducts()
  fetchRawMaterials()
  fetchProduction()
})
</script>
