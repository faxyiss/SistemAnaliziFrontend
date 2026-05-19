<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-100">
      
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-slate-800">Panele Giriş Yap</h2>
        <p class="text-sm text-slate-500 mt-2">İşletme verilerinizi yönetmek için oturum açın.</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        
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
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
        >
          Giriş Yap
        </button>

      </form>

      <div class="mt-6 text-center text-sm text-slate-600">
        İşletme hesabınız yok mu? 
        <router-link to="/register" class="text-blue-600 hover:underline font-medium">Hemen Kayıt Olun</router-link>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

const API_URL = 'http://31.210.36.10:5000/api/auth';

const handleLogin = async () => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'E-posta veya şifre hatalı.');
    }

    // Gelen JWT Token'ı ve kullanıcı bilgilerini tarayıcıya kaydet
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ 
      fullName: data.fullName, 
      businessType: data.businessType,
      userId: data.userId
    }));

    // Panele yönlendir
    router.push('/dashboard');

  } catch (error: any) {
    alert(`Hata: ${error.message}`);
  }
};
</script>