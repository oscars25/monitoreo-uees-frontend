import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Monitor {
  id: number;
  Nombre: string;
  Correo: string;
  Facultad: string;
  Rol: string; // "Monitor" o "Coordinador"
}

export const useAuthStore = defineStore('auth', () => {
  const monitor = ref<Monitor | null>(null);
  const isAuthenticated = ref(false);

  function setMonitor(data: Monitor) {
    monitor.value = data;
    isAuthenticated.value = true;
    // Guardar en localStorage por si recargan la página
    localStorage.setItem('monitor', JSON.stringify(data));
  }

  function logout() {
    monitor.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('monitor');
  }

  // Recuperar sesión al iniciar
  const savedMonitor = localStorage.getItem('monitor');
  if (savedMonitor) {
    monitor.value = JSON.parse(savedMonitor);
    isAuthenticated.value = true;
  }

  return { monitor, isAuthenticated, setMonitor, logout };
});