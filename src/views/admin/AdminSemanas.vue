<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    
    <!-- Header institucional -->
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
      
      <!-- Encabezado y Botón Crear -->
      <div class="border-b border-gray-200 dark:border-slate-700 pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Administrar Semanas</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Configura el calendario académico y las semanas activas.</p>
        </div>
        <button 
          @click="abrirFormulario()" 
          class="w-full md:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nueva Semana
        </button>
      </div>

      <!-- Tabla de Datos -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider border-b border-gray-200 dark:border-slate-600">
              <tr>
                <th class="px-5 py-3.5 text-center">N°</th>
                <th class="px-5 py-3.5 text-center">Año</th>
                <th class="px-5 py-3.5 text-center">Inicio</th>
                <th class="px-5 py-3.5 text-center">Fin</th>
                <th class="px-5 py-3.5">Descripción</th>
                <th class="px-5 py-3.5 text-center">Estado</th>
                <th class="px-5 py-3.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="cargando">
                <td colspan="7" class="px-5 py-12 text-center text-slate-500">
                  <div class="flex justify-center items-center gap-3">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    Cargando calendario...
                  </div>
                </td>
              </tr>
              <tr v-else-if="semanas.length === 0">
                <td colspan="7" class="px-5 py-12 text-center text-slate-500">
                  No hay semanas registradas. Comienza creando la primera.
                </td>
              </tr>
              <tr v-for="sem in semanas" :key="sem.Id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td class="px-5 py-3.5 text-center font-bold text-slate-800 dark:text-white">{{ sem.Numero_Semana }}</td>
                <td class="px-5 py-3.5 text-center text-slate-600 dark:text-slate-300">{{ sem.Anio }}</td>
                <td class="px-5 py-3.5 text-center text-slate-600 dark:text-slate-300">{{ formatearFecha(sem.Fecha_Inicio) }}</td>
                <td class="px-5 py-3.5 text-center text-slate-600 dark:text-slate-300">{{ formatearFecha(sem.Fecha_Fin) }}</td>
                <td class="px-5 py-3.5 text-slate-700 dark:text-slate-300">{{ sem.Descripcion || '—' }}</td>
                <td class="px-5 py-3.5 text-center">
                  <span v-if="sem.Activa" class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-200">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                    Activa
                  </span>
                  <span v-else class="inline-flex items-center text-slate-400 text-xs font-medium">
                    Inactiva
                  </span>
                </td>
                <td class="px-5 py-3.5 text-center whitespace-nowrap">
                  <div class="flex items-center justify-center gap-3">
                    <button @click="abrirFormulario(sem)" class="text-blue-600 hover:text-blue-800 transition-colors" title="Editar">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="confirmarEliminar(sem)" class="text-red-500 hover:text-red-700 transition-colors" title="Eliminar">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <AppFooter />

    <!-- Modal Formulario (Crear / Editar) -->
    <Transition name="fade">
      <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/40 backdrop-blur-sm p-4">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md flex flex-col overflow-hidden">
          
          <!-- Header del modal -->
          <div class="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between bg-white dark:bg-slate-800 shrink-0">
            <h3 class="text-lg font-bold text-slate-800 dark:text-white">
              {{ editando ? 'Editar Semana' : 'Registrar Nueva Semana' }}
            </h3>
            <button @click="cerrarModal" class="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Cuerpo del modal -->
          <div class="p-6 space-y-5">
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">N° Semana</label>
                <input v-model.number="formulario.Numero_Semana" type="number" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Año</label>
                <input v-model.number="formulario.Anio" type="number" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Fecha Inicio</label>
                <input v-model="formulario.Fecha_Inicio" type="date" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Fecha Fin</label>
                <input v-model="formulario.Fecha_Fin" type="date" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5">Descripción</label>
              <input v-model="formulario.Descripcion" type="text" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Ej. Semana 1: 5-10 oct" />
            </div>

            <!-- Checkbox Activa -->
            <div class="pt-2">
              <label class="flex items-center gap-3 cursor-pointer select-none bg-slate-50 p-4 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                <input v-model="formulario.Activa" type="checkbox" class="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer" />
                <div>
                  <span class="text-sm font-bold text-slate-800 block">Marcar como semana activa</span>
                  <span class="text-xs text-slate-500 block">Esta semana será la que se muestre por defecto a los monitores.</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Footer del modal -->
          <div class="px-6 py-4 bg-slate-50 border-t border-gray-200 flex justify-end gap-3 shrink-0">
            <button 
              @click="cerrarModal" 
              class="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-gray-300 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
            >
              Cancelar
            </button>
            <button 
              @click="guardar" 
              class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
              :disabled="guardando"
            >
              <svg v-if="guardando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              {{ guardando ? 'Guardando...' : 'Guardar Semana' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchData, crearRegistro, actualizarRegistro, eliminarRegistro, NOCODB_ENDPOINTS } from '@/api';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

// ==========================================
// ESTADO
// ==========================================
const semanas = ref<any[]>([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const editando = ref(false);
const guardando = ref(false);
const editandoId = ref<number | null>(null);

const formulario = ref({
  Numero_Semana: 0,
  Anio: new Date().getFullYear(),
  Fecha_Inicio: '',
  Fecha_Fin: '',
  Descripcion: '',
  Activa: false
});

// ==========================================
// UTILIDADES
// ==========================================
const formatearFecha = (fecha: string) => {
  if (!fecha) return '';
  return fecha.split('T')[0];
};

// ==========================================
// CARGA DE DATOS
// ==========================================
const cargarSemanas = async () => {
  cargando.value = true;
  try {
    const data = await fetchData(NOCODB_ENDPOINTS.semanas);
    semanas.value = (data.list || []).sort((a: any, b: any) => a.Numero_Semana - b.Numero_Semana);
  } catch (error) {
    console.error(error);
    alert('Error al cargar semanas. Revisa la consola (F12).');
  } finally {
    cargando.value = false;
  }
};

// ==========================================
// LÓGICA DEL FORMULARIO
// ==========================================
const abrirFormulario = (sem?: any) => {
  if (sem) {
    editando.value = true;
    editandoId.value = sem.Id;
    formulario.value = {
      Numero_Semana: sem.Numero_Semana,
      Anio: sem.Anio,
      Fecha_Inicio: formatearFecha(sem.Fecha_Inicio),
      Fecha_Fin: formatearFecha(sem.Fecha_Fin),
      Descripcion: sem.Descripcion || '',
      Activa: sem.Activa || false
    };
  } else {
    editando.value = false;
    editandoId.value = null;
    formulario.value = {
      Numero_Semana: semanas.value.length > 0 ? Math.max(...semanas.value.map(s => s.Numero_Semana)) + 1 : 1,
      Anio: new Date().getFullYear(),
      Fecha_Inicio: '',
      Fecha_Fin: '',
      Descripcion: '',
      Activa: false
    };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardar = async () => {
  guardando.value = true;
  try {
    if (editando.value && editandoId.value) {
      await actualizarRegistro(NOCODB_ENDPOINTS.semanas, editandoId.value, formulario.value);
    } else {
      await crearRegistro(NOCODB_ENDPOINTS.semanas, formulario.value);
    }
    cerrarModal();
    await cargarSemanas();
  } catch (error) {
    console.error(error);
    alert('Error al guardar. Revisa la consola (F12).');
  } finally {
    guardando.value = false;
  }
};

const confirmarEliminar = async (sem: any) => {
  if (!confirm(`¿Estás seguro de eliminar la semana ${sem.Numero_Semana} del año ${sem.Anio}?`)) return;
  try {
    await eliminarRegistro(NOCODB_ENDPOINTS.semanas, sem.Id);
    await cargarSemanas();
  } catch (error) {
    console.error(error);
    alert('Error al eliminar.');
  }
};

// ==========================================
// CICLO DE VIDA
// ==========================================
onMounted(cargarSemanas);
</script>

<style scoped>
/* Transición para el modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>