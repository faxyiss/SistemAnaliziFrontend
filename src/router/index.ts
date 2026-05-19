import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Proje ilk açıldığında (ana dizin) direkt Login sayfasına yönlendir
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      // Sayfayı projemize tanıtıyoruz
      component: () => import('../views/auth/Login.vue'),
    },
    {
      // Yeni eklediğimiz kayıt ol rotası
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/dashboard',
      component: () => import('../layouts/AppLayout.vue'),
      children: [
        {
          path: '', // Ana panel
          name: 'dashboard',
          component: () => import('../views/dashboard/Dashboard.vue'),
        },
        {
          path: '/stocks', // Yeni Eklenen Stok Yönlendirmesi!
          name: 'stocks',
          component: () => import('../views/stocks/Stocks.vue'),
        },
        {
          path: '/customers', // Yeni Eklenen Müşteri Yönlendirmesi!
          name: 'customers',
          component: () => import('../views/Customers/Customers.vue'),
        },
        {
          path: '/sales', // Yeni Eklenen Satış Yönlendirmesi!
          name: 'sales',
          component: () => import('../views/Sales/Sales.vue'),
        },
        {
          path: '/production',
          name: 'production',
          component: () => import('../views/Production/Production.vue'),
        },
        {
          path: '/expenses',
          name: 'expenses',
          // Dosyayı oluşturduğun klasör yoluna göre burayı düzenleyebilirsin
          component: () => import('../views/Expenses/Expenses.vue'),
        },
      ],
    },
  ],
})

export default router
