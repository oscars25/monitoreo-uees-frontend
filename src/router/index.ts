import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { 
      path: '/login', 
      name: 'login', 
      component: () => import('@/views/LoginView.vue') 
    },
    { 
      path: '/dashboard', 
      name: 'dashboard', 
      component: () => import('@/views/DashboardView.vue'), 
      meta: { requiresAuth: true } 
    },
    // ==========================================
    // RUTAS ADMIN (AHORA PROTEGIDAS)
    // ==========================================
    { 
      path: '/admin', 
      name: 'admin', 
      component: () => import('@/views/admin/AdminDashboard.vue'),
      meta: { requiresAuth: true } // 👈 Protegida
    },
    { 
      path: '/admin/semanas', 
      name: 'admin-semanas', 
      component: () => import('@/views/admin/AdminSemanas.vue'),
      meta: { requiresAuth: true } // 👈 Protegida
    },
    { 
      path: '/admin/asignaturas', 
      name: 'admin-asignaturas', 
      component: () => import('@/views/admin/AdminAsignaturas.vue'),
      meta: { requiresAuth: true } // 👈 Protegida
    },
    { 
      path: '/admin/evaluaciones', 
      name: 'admin-evaluaciones', 
      component: () => import('@/views/admin/AdminEvaluaciones.vue'),
      meta: { requiresAuth: true } // 👈 Protegida
    },
  ]
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  
  // Verificamos si el usuario está autenticado (en el store o en el localStorage)
  const isAuth = authStore.isAuthenticated || !!localStorage.getItem('monitor');
  
  console.log('🛡️ Guardián:', {
    destino: to.path,
    requiereAuth: to.meta.requiresAuth,
    isAuthenticated: isAuth
  });

  // Si la ruta requiere autenticación y NO hay sesión, lo mandamos al login
  if (to.meta.requiresAuth && !isAuth) {
    console.log('⛔ Redirigiendo a /login');
    // Guardamos la ruta a la que quería ir para redirigirlo después del login
    return { path: '/login', query: { redirect: to.fullPath } };
  }

  // Si ya está logueado e intenta ir al login, lo mandamos al dashboard
  if (to.path === '/login' && isAuth) {
    return '/dashboard';
  }
});

export default router;