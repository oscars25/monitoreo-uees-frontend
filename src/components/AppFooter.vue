<template>
  <footer class="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 mt-12 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6 py-6">
      
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Izquierda: Texto institucional -->
        <div class="text-center md:text-left">

          <p class="text-xs text-gray-500 dark:text-slate-400">
            Universidad Evangélica de El Salvador
          </p>
          <p class="text-xs text-gray-400 dark:text-slate-500 mt-1">
            © {{ anio }} Todos los derechos reservados
          </p>
        </div>

        <!-- Derecha: Solo logo DTE -->
        <img 
          src="/logo-dte.png" 
          alt="Dirección de Tecnología Educativa" 
          class="h-12 w-auto opacity-90" 
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const anio = new Date().getFullYear();
</script>