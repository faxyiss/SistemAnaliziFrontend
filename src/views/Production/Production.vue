<template>
  <div class="space-y-0">
    <!-- Tab Başlıkları -->
    <div class="border-b border-gray-200 bg-white px-4 pt-3 rounded-t-2xl">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
        <li class="mr-2" role="presentation">
          <button
            @click="activeTab = 'raw-materials'"
            :class="[
              'inline-block p-3.5 border-b-2 rounded-t-xl transition-colors',
              activeTab === 'raw-materials'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-100',
            ]"
            type="button"
          >
            📦 Hammadde Deposu
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            @click="activeTab = 'production'"
            :class="[
              'inline-block p-3.5 border-b-2 rounded-t-xl transition-colors',
              activeTab === 'production'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-100',
            ]"
            type="button"
          >
            ⚙️ Üretim Paneli
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            @click="activeTab = 'history'"
            :class="[
              'inline-block p-3.5 border-b-2 rounded-t-xl transition-colors',
              activeTab === 'history'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-100',
            ]"
            type="button"
          >
            🕓 Üretim Geçmişi
          </button>
        </li>
      </ul>
    </div>

    <!-- Tab İçerikleri -->
    <RawMaterialTab v-if="activeTab === 'raw-materials'" />
    <ProductionTab v-if="activeTab === 'production'" />
    <ProductionHistoryTab v-if="activeTab === 'history'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RawMaterialTab from './RawMaterialTab.vue'
import ProductionTab from './ProductionTab.vue'
import ProductionHistoryTab from './ProductionHistoryTab.vue'

defineOptions({ name: 'ProductionView' })

const activeTab = ref('raw-materials')
</script>
