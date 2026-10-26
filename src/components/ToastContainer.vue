<template>
  <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
    <TransitionGroup 
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto max-w-sm w-full bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden flex items-start"
      >
        <!-- Franja de color según el tipo -->
        <div :class="{
          'bg-emerald-500': toast.type === 'success',
          'bg-red-500': toast.type === 'error',
          'bg-amber-500': toast.type === 'warning',
          'bg-blue-500': toast.type === 'info'
        }" class="w-1.5 self-stretch shrink-0"></div>

        <div class="p-4 flex gap-3 flex-1">
          <!-- Iconos SVG -->
          <div class="shrink-0 mt-0.5">
            <svg v-if="toast.type === 'success'" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            <svg v-if="toast.type === 'error'" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            <svg v-if="toast.type === 'warning'" class="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <svg v-if="toast.type === 'info'" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>

          <!-- Mensaje -->
          <div class="flex-1">
            <p class="text-sm font-medium text-slate-800">{{ toast.message }}</p>
          </div>

          <!-- Botón cerrar -->
          <button @click="remove(toast.id)" class="shrink-0 text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast';
const { toasts, remove } = useToast();
</script>