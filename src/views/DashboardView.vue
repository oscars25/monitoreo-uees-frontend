<template>
  <!-- 1. Fondo general de la página y transición -->
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    
    <AppHeader>
      <template #actions>
        <!-- Datos del usuario -->
        <div class="hidden md:flex items-center gap-3 mr-3">
          <div class="text-right">
            <!-- 2. Textos del usuario -->
            <p class="text-sm font-bold text-slate-800 dark:text-white leading-tight">{{ authStore.monitor?.Nombre }}</p>
            <p class="text-xs font-medium text-slate-500 dark:text-slate-400">{{ authStore.monitor?.Facultad }}</p>
          </div>
          <!-- 3. Anillo del avatar (se vuelve gris oscuro en dark mode) -->
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-slate-800 bg-blue-700">
            {{ iniciales }}
          </div>
        </div>

        <!-- Botón de Cerrar Sesión -->
        <!-- 4. Colores base y hover del botón -->
        <button 
          @click="logout" 
          class="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
        >
          <!-- 5. Icono del botón -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar Sesión
        </button>
      </template>
    </AppHeader>

    <main class="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
      
      <!-- Encabezado de la vista -->
      <!-- 6. Borde inferior y textos del encabezado -->
      <div class="border-b border-gray-200 dark:border-slate-700 pb-4 mb-6 transition-colors duration-300">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Panel del Monitor</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Registra y edita las evaluaciones semanales de tus asignaturas asignadas.
        </p>
      </div>

      <!-- Componente del Formulario (Ya lo actualizamos en el paso anterior) -->
      <EvaluacionForm />
      
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import EvaluacionForm from '@/components/EvaluacionForm.vue';

// ==========================================
// ESTADO Y LÓGICA (Sin cambios)
// ==========================================
const authStore = useAuthStore();
const router = useRouter();

const iniciales = computed(() => {
  const nombre = authStore.monitor?.Nombre || '';
  return nombre.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();
});

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>