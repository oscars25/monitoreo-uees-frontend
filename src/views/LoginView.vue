<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-slate-50">
    
    <div class="w-full max-w-md">
      
      <!-- Logo DTE -->
      <div class="text-center mb-8">
        <img src="/logo-dte.png" alt="DTE" class="h-16 mx-auto" />
      </div>

      <!-- Tarjeta de login -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        <!-- Franja decorativa superior -->
        <div class="h-1.5 w-full bg-blue-700"></div>

        <div class="p-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Iniciar Sesión</h2>
            <p class="text-sm text-slate-500 mt-1">Sistema de Monitoreo Académico</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-5">
            
            <!-- Campo Correo -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                Correo institucional
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input 
                  v-model="email" 
                  type="email" 
                  placeholder="usuario@uees.edu.sv" 
                  class="w-full pl-10 p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  required 
                />
              </div>
            </div>

            <!-- Campo Contraseña -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                Contraseña
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  v-model="password" 
                  type="password" 
                  placeholder="••••••••" 
                  class="w-full pl-10 p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  required 
                />
              </div>
            </div>

            <!-- Botón Ingresar -->
            <button 
              type="submit" 
              class="w-full inline-flex justify-center items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed mt-2"
              :disabled="cargando"
            >
              <svg v-if="cargando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {{ cargando ? 'Verificando...' : 'Ingresar al Sistema' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Créditos -->
      <p class="text-center text-xs font-medium text-slate-400 mt-8">
        Universidad Evangélica de El Salvador &middot; {{ anio }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { postToN8n, N8N_WEBHOOKS } from '@/api';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();
const cargando = ref(false);
const anio = new Date().getFullYear();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Por favor ingresa correo y contraseña');
    return;
  }

  cargando.value = true;
  try {
    // Petición al webhook de n8n
    const response = await postToN8n(N8N_WEBHOOKS.login, {
      email: email.value,
      password: password.value
    });

    if (response.success) {
      // Obtenemos el rol que viene desde la base de datos
      const rolUsuario = response.monitor.Rol || 'Monitor'; // Fallback a 'Monitor' si no viene

      // Guardamos al usuario en el store
      authStore.setMonitor({
        id: response.monitor.id,
        Nombre: response.monitor.Nombre,
        Correo: response.monitor.Correo,
        Facultad: response.monitor.Facultad,
        Rol: rolUsuario // 👈 Ahora sí, guardamos el rol dinámico
      });

      // Redirección basada en el rol
      if (rolUsuario === 'Admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
      
    } else {
      alert('❌ ' + (response.message || 'Credenciales incorrectas'));
    }
  } catch (error) {
    console.error(error);
    alert('❌ Error al conectar con el servidor.');
  } finally {
    cargando.value = false;
  }
};
</script>