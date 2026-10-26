<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    
    <AppHeader>
      <template #actions>
        <RouterLink 
          to="/admin" 
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Panel
        </RouterLink>
      </template>
    </AppHeader>

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
      
      <!-- Encabezado -->
      <div class="border-b border-gray-200 dark:border-slate-700 pb-4 mb-6">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Monitoreo de Evaluaciones</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Revisa el historial de reportes o el estado de cumplimiento de los monitores.</p>
      </div>

      <!-- Sistema de Pestañas (Tabs) -->
      <div class="flex space-x-1 bg-slate-200/60 dark:bg-slate-800 p-1 rounded-xl w-full md:w-max mb-6">
        <button 
          @click="activeTab = 'historial'"
          :class="['flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all', activeTab === 'historial' ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          Historial de Reportes
        </button>
        <button 
          @click="activeTab = 'estado'"
          :class="['flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all', activeTab === 'estado' ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Estado Global
        </button>
      </div>

      <!-- ========================================== -->
      <!-- PESTAÑA 1: HISTORIAL DE REPORTES           -->
      <!-- ========================================== -->
      <div v-show="activeTab === 'historial'" class="animate-fade-in">
        
      <!-- Panel de Filtros (Historial) -->
      <div class="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-6 flex flex-col md:flex-row gap-4 justify-between items-end transition-colors">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1 w-full">
          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Semana</label>
            <select v-model="filtroSemanaHistorial" class="w-full p-2.5 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer">
              <option value="">Todas las semanas</option>
              <option v-for="sem in semanas" :key="sem.Id" :value="sem.Numero_Semana">
                Semana {{ sem.Numero_Semana }} ({{ sem.Anio }})
              </option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Buscar</label>
            <input v-model="filtroTextoHistorial" type="text" placeholder="Monitor, tutor, asignatura..." class="w-full p-2.5 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" />
          </div>
        </div>

        <!-- BOTÓN DE EXPORTAR EXCEL -->
        <button 
          @click="exportarAExcelAdmin" 
          class="w-full md:w-auto inline-flex justify-center items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Descargar Excel
        </button>
      </div>

        <!-- Tabla de Evaluaciones Realizadas -->
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden transition-colors">
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider border-b border-gray-200 dark:border-slate-600">
                <tr>
                  <th class="px-5 py-3.5 text-center">Semana</th>
                  <th class="px-5 py-3.5">Monitor</th>
                  <th class="px-5 py-3.5">Asignatura</th>
                  <th class="px-5 py-3.5">Tutor</th>
                  <th class="px-5 py-3.5 text-center">Estado</th>
                  <th class="px-5 py-3.5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
                <tr v-if="cargando">
                  <td colspan="6" class="px-5 py-12 text-center text-slate-500 dark:text-slate-400">
                    <div class="flex justify-center items-center gap-3"><div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>Cargando...</div>
                  </td>
                </tr>
                <tr v-else-if="historialFiltrado.length === 0">
                  <td colspan="6" class="px-5 py-12 text-center text-slate-500 dark:text-slate-400">
                    No se encontraron evaluaciones.
                  </td>
                </tr>
                <tr v-for="ev in historialFiltrado" :key="ev.Id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td class="px-5 py-3.5 text-center font-bold text-slate-700 dark:text-slate-300">S-{{ ev.Semana }}</td>
                  <td class="px-5 py-3.5">
                    <p class="font-semibold text-slate-800 dark:text-white">{{ ev.Monitor_Nombre }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ ev.Correo_Monitor }}</p>
                  </td>
                  <td class="px-5 py-3.5">
                    <p class="font-semibold text-slate-800 dark:text-white">{{ getNombreAsignatura(ev) }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">Sección {{ getSeccionAsignatura(ev) }}</p>
                  </td>
                  <td class="px-5 py-3.5 text-slate-600 dark:text-slate-300">{{ ev.Tutor }}</td>
                  <td class="px-5 py-3.5 text-center">
                    <span v-if="ev.Estado === 'Completado Viernes'" class="inline-flex items-center bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-200 dark:border-emerald-800">Completado</span>
                    <span v-else class="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-200 dark:border-blue-800">Preliminar</span>
                  </td>
                  <td class="px-5 py-3.5 text-center">
                    <button @click="abrirDetalle(ev)" class="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-md">
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- PESTAÑA 2: ESTADO GLOBAL                   -->
      <!-- ========================================== -->
      <div v-show="activeTab === 'estado'" class="animate-fade-in">
        
        <!-- Panel de Filtros (Estado Global) -->
        <div class="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-6 transition-colors">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Semana a evaluar</label>
              <select v-model="semanaSeleccionadaEstado" class="w-full p-2.5 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer">
                <option value="">Todas las semanas registradas</option>
                <option v-for="sem in semanas" :key="sem.Id" :value="sem.Numero_Semana">
                  Semana {{ sem.Numero_Semana }} ({{ sem.Anio }})
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Facultad</label>
              <select v-model="filtroFacultadEstado" class="w-full p-2.5 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer">
                <option value="">Todas las facultades</option>
                <option v-for="f in facultadesUnicas" :key="f" :value="f">{{ f }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Buscar Asignatura / Tutor</label>
              <input v-model="filtroTextoEstado" type="text" placeholder="Buscar..." class="w-full p-2.5 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>
          </div>
        </div>

        <!-- Tabla de Estado Global -->
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden transition-colors">
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider border-b border-gray-200 dark:border-slate-600">
                <tr>
                  <th class="px-5 py-3.5">Facultad / Carrera</th>
                  <th class="px-5 py-3.5">Asignatura</th>
                  <th class="px-5 py-3.5">Tutor</th>
                  <th class="px-5 py-3.5">Monitor Asignado</th>
                  <th class="px-5 py-3.5 text-center">Estado Evaluación</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
                <tr v-if="cargando">
                  <td colspan="5" class="px-5 py-12 text-center text-slate-500 dark:text-slate-400">Cargando catálogo...</td>
                </tr>
                <tr v-else-if="estadoGlobalFiltrado.length === 0">
                  <td colspan="5" class="px-5 py-12 text-center text-slate-500 dark:text-slate-400">
                    No se encontraron asignaturas con estos filtros.
                  </td>
                </tr>
                <tr v-for="asig in estadoGlobalFiltrado" :key="asig.Id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td class="px-5 py-3.5">
                    <p class="font-semibold text-slate-800 dark:text-white">{{ asig.Facultad }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ asig.Carrera }}</p>
                  </td>
                  <td class="px-5 py-3.5">
                    <p class="font-semibold text-slate-800 dark:text-white">{{ asig.Asignatura }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">Sección {{ asig.Sección || asig.Seccion }}</p>
                  </td>
                  <td class="px-5 py-3.5 text-slate-600 dark:text-slate-300">{{ asig.Tutor }}</td>
                  <td class="px-5 py-3.5">
                    <span v-if="asig.Monitor_Nombre" class="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-200 dark:border-blue-800">
                      {{ asig.Monitor_Nombre }}
                    </span>
                    <span v-else class="inline-flex items-center bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-md text-xs font-medium">
                      Sin asignar
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-center">
                    <span v-if="!semanaSeleccionadaEstado" class="text-slate-400 dark:text-slate-500 text-xs italic">Seleccione semana</span>
                    <span v-else-if="!asig.Monitor_Nombre" class="inline-flex items-center bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200 dark:border-slate-600">
                      Sin Monitor
                    </span>
                    <span v-else-if="estaEvaluada(asig.Id, semanaSeleccionadaEstado)" class="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Evaluada
                    </span>
                    <span v-else class="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2.5 py-1 rounded-md text-xs font-bold border border-red-200 dark:border-red-800">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Pendiente
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </main>

    <AppFooter />

    <!-- Modal de Detalle -->
    <Transition name="fade">
      <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/40 backdrop-blur-sm p-4">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
          
          <div class="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between bg-white dark:bg-slate-800 shrink-0">
            <div>
              <h3 class="text-lg font-bold text-slate-800 dark:text-white">Detalle de Evaluación</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ evaluacionSeleccionada?.Monitor_Nombre }} - {{ evaluacionSeleccionada ? getNombreAsignatura(evaluacionSeleccionada) : '' }}</p>
            </div>
            <button @click="cerrarDetalle" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 overflow-y-auto space-y-6" v-if="evaluacionSeleccionada">
            <div>
              <h4 class="text-sm font-bold text-slate-800 dark:text-white mb-3 border-b border-gray-200 dark:border-slate-700 pb-1">Criterios Evaluados</h4>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span class="block text-xs text-slate-500 dark:text-slate-400 mb-1">Ruta Aprendizaje</span>
                  <span class="font-bold text-sm" :class="getColorCriterio(evaluacionSeleccionada.Ruta_Aprendizaje)">{{ evaluacionSeleccionada.Ruta_Aprendizaje || 'N/A' }}</span>
                </div>
                <div class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span class="block text-xs text-slate-500 dark:text-slate-400 mb-1">Lectura H5P</span>
                  <span class="font-bold text-sm" :class="getColorCriterio(evaluacionSeleccionada.Lectura_H5P)">{{ evaluacionSeleccionada.Lectura_H5P || 'N/A' }}</span>
                </div>
                <div class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span class="block text-xs text-slate-500 dark:text-slate-400 mb-1">Foros Consulta</span>
                  <span class="font-bold text-sm" :class="getColorCriterio(evaluacionSeleccionada.Foros_Consulta)">{{ evaluacionSeleccionada.Foros_Consulta || 'N/A' }}</span>
                </div>
                <div class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span class="block text-xs text-slate-500 dark:text-slate-400 mb-1">Evaluación Semanal</span>
                  <span class="font-bold text-sm" :class="getColorCriterio(evaluacionSeleccionada.Evaluacion_Semanal)">{{ evaluacionSeleccionada.Evaluacion_Semanal || 'N/A' }}</span>
                </div>
                <div class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span class="block text-xs text-slate-500 dark:text-slate-400 mb-1">Motivación e Inter.</span>
                  <span class="font-bold text-sm" :class="getColorCriterio(evaluacionSeleccionada.Motiva_Interaccion)">{{ evaluacionSeleccionada.Motiva_Interaccion || 'N/A' }}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-sm font-bold text-slate-800 dark:text-white mb-2 border-b border-gray-200 dark:border-slate-700 pb-1">Observaciones</h4>
              <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 prose prose-sm max-w-none dark:prose-invert" v-html="evaluacionSeleccionada.Observaciones || '<em>Sin observaciones registradas.</em>'"></div>
            </div>

            <div>
              <h4 class="text-sm font-bold text-slate-800 dark:text-white mb-2 border-b border-gray-200 dark:border-slate-700 pb-1">Mensaje enviado al Tutor</h4>
              <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 text-sm text-slate-700 dark:text-slate-300 prose prose-sm max-w-none dark:prose-invert" v-html="evaluacionSeleccionada.Mensaje_Tutor || '<em>Sin mensaje registrado.</em>'"></div>
            </div>
          </div>

          <div class="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700 flex justify-end shrink-0">
            <button @click="cerrarDetalle" class="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchData, NOCODB_ENDPOINTS } from '@/api';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ExcelJS from 'exceljs';

// ==========================================
// ESTADO
// ==========================================
const activeTab = ref<'historial' | 'estado'>('historial');
const cargando = ref(true);

// Datos globales
const evaluaciones = ref<any[]>([]);
const semanas = ref<any[]>([]);
const asignaturas = ref<any[]>([]);

// Filtros (Historial)
const filtroSemanaHistorial = ref('');
const filtroTextoHistorial = ref('');

// Filtros (Estado Global)
const semanaSeleccionadaEstado = ref('');
const filtroFacultadEstado = ref('');
const filtroTextoEstado = ref('');

// Modal
const mostrarModal = ref(false);
const evaluacionSeleccionada = ref<any>(null);

// ==========================================
// COMPUTADOS (Historial)
// ==========================================
const historialFiltrado = computed(() => {
  return evaluaciones.value.filter(ev => {
    const matchSemana = !filtroSemanaHistorial.value || String(ev.Semana) === String(filtroSemanaHistorial.value);
    const texto = filtroTextoHistorial.value.toLowerCase();
    
    const nombreAsig = String(getNombreAsignatura(ev) || '').toLowerCase();
    const monitor = String(ev.Monitor_Nombre || '').toLowerCase();
    const tutor = String(ev.Tutor || '').toLowerCase();
    const carrera = String(ev.Carrera || '').toLowerCase();

    const matchTexto = !filtroTextoHistorial.value || 
      monitor.includes(texto) ||
      tutor.includes(texto) ||
      nombreAsig.includes(texto) || 
      carrera.includes(texto);
      
    return matchSemana && matchTexto;
  }).sort((a, b) => b.Id - a.Id);
});

// ==========================================
// COMPUTADOS (Estado Global)
// ==========================================
const facultadesUnicas = computed(() => {
  return [...new Set(asignaturas.value.map(a => a.Facultad))].filter(Boolean).sort();
});

const estadoGlobalFiltrado = computed(() => {
  return asignaturas.value.filter(asig => {
    const matchFacultad = !filtroFacultadEstado.value || asig.Facultad === filtroFacultadEstado.value;
    const texto = filtroTextoEstado.value.toLowerCase();
    
    const nombre = String(asig.Asignatura || '').toLowerCase();
    const tutor = String(asig.Tutor || '').toLowerCase();

    const matchTexto = !filtroTextoEstado.value || 
      nombre.includes(texto) ||
      tutor.includes(texto);
      
    return matchFacultad && matchTexto;
  });
});

// ==========================================
// MÉTODOS DE AYUDA (LOOKUP)
// ==========================================
const getNombreAsignatura = (ev: any) => {
  const cat = asignaturas.value.find(a => String(a.Id) === String(ev.Catalogo_Id_Num));
  return cat ? cat.Asignatura : (ev.Asignatura || 'Asignatura Desconocida');
};

const getSeccionAsignatura = (ev: any) => {
  const cat = asignaturas.value.find(a => String(a.Id) === String(ev.Catalogo_Id_Num));
  return cat ? (cat.Sección || cat.Seccion) : (ev.Seccion || ev.Sección || '—');
};

// ==========================================
// MÉTODOS PRINCIPALES
// ==========================================
const cargarDatos = async () => {
  cargando.value = true;
  try {
    const [dataEval, dataSem, dataAsig] = await Promise.all([
      fetchData(NOCODB_ENDPOINTS.evaluaciones),
      fetchData(NOCODB_ENDPOINTS.semanas),
      fetchData(NOCODB_ENDPOINTS.asignaturas)
    ]);
    
    evaluaciones.value = dataEval.list || [];
    asignaturas.value = dataAsig.list || [];
    
    semanas.value = (dataSem.list || []).sort((a: any, b: any) => b.Numero_Semana - a.Numero_Semana);
    if (semanas.value.length > 0) {
      semanaSeleccionadaEstado.value = semanas.value[0].Numero_Semana;
    }
  } catch (error) {
    console.error('Error al cargar datos:', error);
    alert('Error al cargar los datos del servidor.');
  } finally {
    cargando.value = false;
  }
};

const estaEvaluada = (catalogoId: string, semana: string | number) => {
  return evaluaciones.value.some(e => 
    String(e.Catalogo_Id_Num) === String(catalogoId) && 
    String(e.Semana) === String(semana)
  );
};

const abrirDetalle = (ev: any) => {
  evaluacionSeleccionada.value = ev;
  mostrarModal.value = true;
};

const cerrarDetalle = () => {
  mostrarModal.value = false;
  evaluacionSeleccionada.value = null;
};

const getColorCriterio = (valor: string) => {
  if (valor === 'SI') return 'text-emerald-600';
  if (valor === 'NO') return 'text-red-600';
  return 'text-slate-500';
};

// ==========================================
// EXPORTAR A EXCEL (Para Administrador)
// ==========================================
const exportarAExcelAdmin = async () => {
  const datosAExportar = historialFiltrado.value;
  
  if (datosAExportar.length === 0) {
    alert('No hay datos para exportar con los filtros actuales.');
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Consolidado');

  // 1. Definir anchos de columnas (Aumentados para los títulos largos)
  worksheet.columns = [
    { width: 8 },  // A: Semana
    { width: 25 }, // B: Monitor
    { width: 30 }, // C: Facultad / Carrera
    { width: 35 }, // D: Asignatura
    { width: 8 },  // E: Sección
    { width: 30 }, // F: Tutor
    { width: 25 }, // G: Ruta
    { width: 25 }, // H: H5P
    { width: 25 }, // I: Foros
    { width: 25 }, // J: Eval Semanal
    { width: 25 }, // K: Motivación
    { width: 50 }, // L: Observaciones
  ];

  // 2. Función auxiliar para títulos
  const mergeAndStyle = (row: number, text: string, isBold: boolean = true) => {
    worksheet.mergeCells(`C${row}:L${row}`); 
    const cell = worksheet.getCell(`C${row}`);
    cell.value = text;
    cell.font = { bold: isBold, size: 11, color: { argb: 'FF000000' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  };

  // 3. Títulos del reporte
  mergeAndStyle(2, "VICERRECTORÍA DE INNOVACIÓN Y TECNOLOGÍA EDUCATIVA");
  mergeAndStyle(3, "DIRECCIÓN DE TECNOLOGÍA EDUCATIVA");
  mergeAndStyle(4, "INFORME CONSOLIDADO DE MONITOREO VIRTUAL");
  
  // Subtítulo dinámico según los filtros aplicados
  let subtitulo = "Filtro: ";
  if (filtroSemanaHistorial.value) subtitulo += `Semana ${filtroSemanaHistorial.value} | `;
  if (filtroTextoHistorial.value) subtitulo += `Búsqueda: "${filtroTextoHistorial.value}"`;
  if (!filtroSemanaHistorial.value && !filtroTextoHistorial.value) subtitulo += "Todos los registros";

  mergeAndStyle(5, subtitulo, false);

  // 4. Insertar Logo
  try {
    const response = await fetch('/logo-uees.png'); 
    const blob = await response.blob();
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });

    const imageId = workbook.addImage({
      base64: base64 as string,
      extension: 'png',
    });

    worksheet.addImage(imageId, {
      tl: { col: 0.2, row: 1.2 }, 
      ext: { width: 80, height: 80 } 
    });
  } catch (error) {
    console.error('No se pudo cargar el logo:', error);
  }

  // 5. Cabecera de la tabla (Fila 7) - Nombres exactos de la plantilla
  const headerRow = worksheet.getRow(7);
  const tableHeaders = [
    "SEMANA", "MONITOR", "FACULTAD / CARRERA", "ASIGNATURA", "SECCIÓN", "TUTOR",
    "Cumplimiento de la Ruta de Aprendizaje",
    "Incluye lectura principal (mediador pedagogico h5p)",
    "Realiza foros de consulta e interacción",
    "Evaluación semanal formativa o sumativa (Individual o grupal)",
    "Motiva a la interacción y participación activa del estudiante en el aula",
    "OBSERVACIONES Y APOYO BRINDADO EN LA SEMANA"
  ];

  headerRow.values = tableHeaders;
  headerRow.height = 60; // Aumentamos la altura para que quepa el texto largo

  // 6. Estilos de la cabecera
  headerRow.eachCell((cell, colNumber) => {
    cell.font = { bold: true, size: 9, color: { argb: 'FF000000' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Colores de la plantilla
    if (colNumber >= 1 && colNumber <= 6) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } }; // Gris
    } else if (colNumber >= 7 && colNumber <= 10) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } }; // Verde
    } else if (colNumber === 11) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDEBF7' } }; // Azul
    } else if (colNumber === 12) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCE4D6' } }; // Durazno
    }
  });

  // 7. Llenar los datos
  let currentRow = 8;
  datosAExportar.forEach((ev: any) => {
    const observacionesLimpias = ev.Observaciones ? ev.Observaciones.replace(/<[^>]*>?/gm, '') : '';
    
    const cat = asignaturas.value.find(a => String(a.Id) === String(ev.Catalogo_Id_Num));
    const nombreAsignatura = cat ? cat.Asignatura : (ev.Asignatura || 'Desconocida');
    const seccion = cat ? (cat.Sección || cat.Seccion) : (ev.Seccion || ev.Sección || '—');
    
    const facultadReal = cat ? cat.Facultad : (ev.Facultad || '—');
    const carreraReal = cat ? cat.Carrera : (ev.Carrera || '—');

    const row = worksheet.getRow(currentRow);
    row.values = [
      `S-${ev.Semana}`,
      ev.Monitor_Nombre,
      `${facultadReal} - ${carreraReal}`,
      nombreAsignatura,
      seccion,
      ev.Tutor,
      ev.Ruta_Aprendizaje || 'N/A',
      ev.Lectura_H5P || 'N/A',
      ev.Foros_Consulta || 'N/A',
      ev.Evaluacion_Semanal || 'N/A',
      ev.Motiva_Interaccion || 'N/A',
      observacionesLimpias
    ];

    row.height = 25;

    row.eachCell((cell, colNumber) => {
      cell.font = { size: 9 };
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      
      if (colNumber === 12) {
        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      }
    });

    currentRow++;
  });

  // 8. Descargar archivo
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `Consolidado_Monitoreo_${new Date().toISOString().split('T')[0]}.xlsx`;
  a.click();
  
  window.URL.revokeObjectURL(url);
};


onMounted(cargarDatos);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(.prose p) { margin-bottom: 0.5rem; }
:deep(.prose ul) { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.5rem; }
</style>