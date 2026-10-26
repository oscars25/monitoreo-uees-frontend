<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    
    <AppHeader>
      <template #actions>
        <RouterLink 
          to="/dashboard" 
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Sistema
        </RouterLink>
      </template>
    </AppHeader>

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-12">
      
      <!-- Encabezado de la vista -->
      <div class="border-b border-gray-200 dark:border-slate-700 pb-4 mb-10">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Panel de Administración</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Seleccione el módulo que desea gestionar en el sistema.</p>
      </div>

      <!-- Tarjetas de Opciones (Ahora son 3 columnas) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- Tarjeta Semanas -->
        <RouterLink 
          to="/admin/semanas" 
          class="group flex flex-col bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-md transition-all duration-200"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="flex-1 pt-1">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white">Semanas</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Configura el calendario académico.</p>
            </div>
          </div>
          <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-semibold text-blue-600">
            Gestionar Semanas
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </div>
        </RouterLink>

        <!-- Tarjeta Asignaturas -->
        <RouterLink 
          to="/admin/asignaturas" 
          class="group flex flex-col bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 hover:border-amber-400 hover:shadow-md transition-all duration-200"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="flex-1 pt-1">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white">Asignaturas</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Gestiona el catálogo, tutores y monitores.</p>
            </div>
          </div>
          <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-semibold text-amber-600">
            Gestionar Catálogo
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </div>
        </RouterLink>

        <!-- ⭐ NUEVA Tarjeta Evaluaciones -->
        <RouterLink 
          to="/admin/evaluaciones" 
          class="group flex flex-col bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 hover:border-emerald-400 hover:shadow-md transition-all duration-200"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="flex-1 pt-1">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white">Evaluaciones</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Revisa el monitoreo realizado por los tutores.</p>
            </div>
          </div>
          <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-semibold text-emerald-600">
            Ver Reportes
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </div>
        </RouterLink>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>