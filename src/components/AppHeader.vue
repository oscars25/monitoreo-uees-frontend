<template>
  <!-- 👇 Agregamos dark:bg-slate-900 y transición -->
  <header class="bg-white dark:bg-slate-900 border-b-4 shadow-sm transition-colors duration-300" style="border-color: #FFD100;">
    <div class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      
      <!-- Logo + Título -->
      <div class="flex items-center gap-4">
        <img src="/logo-uees.png" alt="UEES" class="h-12 w-auto" />
        <div class="border-l-2 border-gray-200 dark:border-slate-700 pl-4 hidden md:block transition-colors duration-300">
          <!-- 👇 Cambiamos el style por clases de Tailwind para que el modo oscuro funcione -->
          <h1 class="text-lg font-bold leading-tight text-blue-900 dark:text-white">
            Sistema de Monitoreo
          </h1>
        </div>
      </div>

      <!-- Acciones -->
      <div class="flex items-center gap-4">
        
        <!-- 👇 BOTÓN DE MODO OSCURO -->
        <button 
          @click="toggleDark" 
          class="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-yellow-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 mr-2"
          title="Cambiar tema"
        >
          <!-- Icono de Luna (Modo Claro) -->
          <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <!-- Icono de Sol (Modo Oscuro) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>

        <!-- Tus otros botones (Avatar, Cerrar Sesión, etc.) -->
        <slot name="actions"></slot>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode';
const { isDark, toggleDark } = useDarkMode();
</script>