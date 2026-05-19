<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-100">
      
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-slate-800">İşletme Hesabı Oluştur</h2>
        <p class="text-sm text-slate-500 mt-2">Kolay stok ve finans takibi için hemen kaydolun.</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">
        
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">İşletme Adı</label>
          <input 
            v-model="businessName" 
            type="text" 
            required 
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Örn: Akıllı Market veya Başak Fırını"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">E-posta Adresi</label>
          <input 
            v-model="email" 
            type="email" 
            required 
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="esnaf@ornek.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">İşletme Türü</label>
          <select 
            v-model="businessType" 
            required
            class="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          >
            <option value="" disabled selected>Lütfen birini seçin</option>
            <option value="commerce">Sadece Satış / Ticaret (Al-Sat)</option>
            <option value="production">Üretim ve Satış (İmalat / Reçete Odaklı)</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Şifre</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 mt-2 disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center items-center"
        >
          <span v-if="isLoading">İşleniyor...</span>
          <span v-else>Hesap Oluştur</span>
        </button>

      </form>

      <div class="mt-6 text-center text-sm text-slate-600">
        Zaten hesabınız var mı? 
        <router-link to="/login" class="text-blue-600 hover:underline font-medium">Giriş Yapın</router-link>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const businessName = ref('');
const email = ref('');
const businessType = ref('');
const password = ref('');

// Yüklenme durumunu tutacağımız değişken
const isLoading = ref(false);

const API_URL = 'http://31.210.36.10:5000/api/auth';

const handleRegister = async () => {
  // Eğer zaten bir işlem sürüyorsa fonksiyonu durdur (çift tıklama garantisi)
  if (isLoading.value) return;

  // İstek başlıyor, butonu pasif yap
  isLoading.value = true;
  
  const mappedBusinessType = businessType.value === 'commerce' ? 0 : 1;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: businessName.value,
        email: email.value,
        password: password.value,
        businessType: mappedBusinessType
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Kayıt işlemi sırasında bir hata oluştu.');
    }

    alert(`Hesap başarıyla oluşturuldu!\nİşletme Türü: ${businessType.value === 'production' ? 'Üretim' : 'Ticaret'}`);
    
    router.push('/login');

  } catch (error: any) {
    alert(`Hata: ${error.message}`);
  } finally {
    // İşlem başarılı da olsa, hata da verse butonu tekrar aktif hale getiriyoruz
    isLoading.value = false;
  }
};
</script>