<template>
  <div class="space-y-8">
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-400 tracking-wider uppercase">Toplam Varlık Değeri</span>
          <h3 class="text-2xl font-bold text-slate-800 mt-1">₺142.500</h3>
        </div>
        <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <TrendingUpIcon :size="24" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-400 tracking-wider uppercase">Bu Ayki Net Kâr</span>
          <h3 class="text-2xl font-bold text-slate-800 mt-1">₺24.800</h3>
        </div>
        <div class="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <DollarSignIcon :size="24" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-400 tracking-wider uppercase">Bekleyen Veresiye</span>
          <h3 class="text-2xl font-bold text-amber-600 mt-1">₺12.450</h3>
        </div>
        <div class="p-3 bg-amber-50 text-amber-500 rounded-xl">
          <ClockIcon :size="24" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-400 tracking-wider uppercase">Kritik Stok Uyarıları</span>
          <h3 class="text-2xl font-bold text-red-600 mt-1">3 Ürün</h3>
        </div>
        <div class="p-3 bg-red-50 text-red-500 rounded-xl">
          <AlertTriangleIcon :size="24" />
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-50 pb-4">
          <h3 class="font-bold text-slate-800 text-base">Nakit Akışı Projeksiyonu</h3>
          <span class="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg font-semibold">Bu Ay</span>
        </div>
        <div class="h-72 mt-4">
          <apexchart 
            type="area" 
            height="100%" 
            :options="chartOptions" 
            :series="series">
          </apexchart>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-slate-50 pb-4">
          <h3 class="font-bold text-slate-800 text-base">Hammadde Öngörüsü</h3>
          <span class="text-xs text-red-600 bg-red-50 px-2.5 py-1 rounded-lg font-semibold">Kritik</span>
        </div>
        <div class="space-y-4 pt-2">
          <div class="flex items-center justify-between text-sm">
            <span class="font-medium text-slate-600">Un Stoğu</span>
            <span class="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">4 Gün Kaldı</span>
          </div>
          <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div class="bg-red-500 h-full w-[25%]"></div>
          </div>
          <div class="flex items-center justify-between text-sm pt-2">
            <span class="font-medium text-slate-600">Maya Stoğu</span>
            <span class="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">12 Gün Kaldı</span>
          </div>
          <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div class="bg-amber-500 h-full w-[55%]"></div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  TrendingUpIcon, 
  DollarSignIcon, 
  ClockIcon, 
  AlertTriangleIcon
} from 'lucide-vue-next';

// Grafikte gösterilecek veriler (Nakit Girişi ve Çıkışı)
const series = ref([
  {
    name: 'Nakit Girişi (Tahsilat)',
    data: [31000, 40000, 28000, 51000, 42000, 109000, 100000]
  }, 
  {
    name: 'Nakit Çıkışı (Ödeme)',
    data: [11000, 32000, 45000, 32000, 34000, 52000, 41000]
  }
]);

// Grafiğin görsel ayarları (Renkler, çizgiler, eksenler)
const chartOptions = ref({
  chart: {
    type: 'area',
    fontFamily: 'inherit',
    toolbar: { show: false }, // Sağ üstteki gereksiz menüyü gizle
    zoom: { enabled: false }
  },
  colors: ['#10b981', '#ef4444'], // Zümrüt Yeşili (Giriş) ve Kırmızı (Çıkış)
  dataLabels: { 
    enabled: false // Noktaların üzerindeki rakamları gizle (sade görünüm)
  },
  stroke: { 
    curve: 'smooth', // Çizgileri yumuşat
    width: 2 
  },
  xaxis: {
    categories: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      formatter: (value: number) => {
        return "₺" + value / 1000 + "k"; // 40000 yerine ₺40k yazsın
      }
    }
  },
  grid: {
    borderColor: '#f1f5f9', // Arka plan ızgara rengi (slate-100)
    strokeDashArray: 4, // Kesik çizgili ızgara
  },
  tooltip: {
    theme: 'light'
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  }
});
</script>