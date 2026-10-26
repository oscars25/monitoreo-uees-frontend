<template>
  <RouterView />
  <ToastContainer />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import ToastContainer from '@/components/ToastContainer.vue';
import { initDarkMode } from '@/composables/useDarkMode'; 

const authStore = useAuthStore();
const router = useRouter();

let idleTimeout: ReturnType<typeof setTimeout> | null = null;

// Tiempo de inactividad: 15 minutos
const IDLE_TIMEOUT_MS = 15 * 60 * 1000;

const resetTimer = () => {
  if (idleTimeout) clearTimeout(idleTimeout);

  if (authStore.isAuthenticated) {
    idleTimeout = setTimeout(() => {
      authStore.logout();
      router.push('/login');
      alert('Tu sesión ha expirado por inactividad. Por favor, inicia sesión de nuevo.');
    }, IDLE_TIMEOUT_MS);
  }
};

const eventosActividad = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

onMounted(() => {

  initDarkMode(); 

  eventosActividad.forEach(evento => {
    window.addEventListener(evento, resetTimer);
  });
  resetTimer();
});

onUnmounted(() => {
  eventosActividad.forEach(evento => {
    window.removeEventListener(evento, resetTimer);
  });
  if (idleTimeout) clearTimeout(idleTimeout);
});
</script>