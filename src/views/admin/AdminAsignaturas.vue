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
      
      <!-- Encabezado de Página -->
      <div class="border-b border-gray-200 dark:border-slate-700 pb-4 mb-6">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Administrar Asignaturas</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Gestiona el catálogo de asignaturas, tutores y monitores asignados.</p>
      </div>

      <!-- Panel de Filtros -->
      <div class="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-6">
        <h3 class="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros de Búsqueda
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Facultad</label>
            <select v-model="filtroFacultad" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer">
              <option value="">Todas las facultades</option>
              <option v-for="f in facultadesUnicas" :key="f" :value="f">{{ f }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Ciclo</label>
            <select v-model="filtroCiclo" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer">
              <option value="">Todos los ciclos</option>
              <option v-for="c in ciclosUnicos" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Buscar</label>
            <input v-model="filtroTexto" type="text" placeholder="Asignatura, tutor o monitor..." class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
          </div>
        </div>
      </div>

      <!-- Header de la Lista -->
      <div class="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 class="text-lg font-bold text-slate-800">
          Lista de Asignaturas
          <span class="text-sm font-medium text-slate-500 ml-2">({{ asignaturasFiltradas.length }} resultados)</span>
        </h3>
        <div class="flex gap-3 w-full md:w-auto">
          <a 
            href="http://localhost:8080" 
            target="_blank"
            class="flex-1 md:flex-none inline-flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Importar Excel
          </a>
          <button 
            @click="abrirFormulario()" 
            class="flex-1 md:flex-none inline-flex justify-center items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nueva Asignatura
          </button>
        </div>
      </div>

      <!-- Tabla de Datos -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th class="px-5 py-3.5">Facultad</th>
                <th class="px-5 py-3.5">Carrera</th>
                <th class="px-5 py-3.5">Asignatura</th>
                <th class="px-5 py-3.5 text-center">Sección</th>
                <th class="px-5 py-3.5">Tutor</th>
                <th class="px-5 py-3.5">Monitor</th>
                <th class="px-5 py-3.5 text-center">Ciclo</th>
                <th class="px-5 py-3.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="cargando">
                <td colspan="8" class="px-5 py-12 text-center text-slate-500">
                  <div class="flex justify-center items-center gap-3">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    Cargando catálogo...
                  </div>
                </td>
              </tr>
              <tr v-else-if="asignaturasFiltradas.length === 0">
                <td colspan="8" class="px-5 py-12 text-center text-slate-500">
                  No hay asignaturas registradas. 
                  <a href="http://localhost:8080" target="_blank" class="font-medium text-blue-600 hover:underline ml-1">
                    Importa un Excel desde NocoDB
                  </a>
                </td>
              </tr>
              <tr v-for="asig in asignaturasFiltradas" :key="asig.Id" class="hover:bg-slate-50 transition-colors">
                <td class="px-5 py-3.5 text-slate-600">{{ asig.Facultad }}</td>
                <td class="px-5 py-3.5 text-slate-600">{{ asig.Carrera }}</td>
                <td class="px-5 py-3.5 font-semibold text-slate-800">{{ asig.Asignatura }}</td>
                <td class="px-5 py-3.5 text-slate-500 text-center">{{ asig.Sección }}</td>
                <td class="px-5 py-3.5 text-slate-600">{{ asig.Tutor }}</td>
                <td class="px-5 py-3.5">
                  <span v-if="asig.Monitor_Nombre" 
                        class="inline-flex items-center bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-200">
                    {{ asig.Monitor_Nombre }}
                  </span>
                  <span v-else class="inline-flex items-center bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-xs font-medium">
                    Sin asignar
                  </span>
                </td>
                <td class="px-5 py-3.5 text-slate-500 text-center text-xs">{{ asig.Ciclo || '—' }}</td>
                <td class="px-5 py-3.5 text-center whitespace-nowrap">
                  <div class="flex items-center justify-center gap-3">
                    <button @click="abrirFormulario(asig)" class="text-blue-600 hover:text-blue-800 transition-colors" title="Editar">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="confirmarEliminar(asig)" class="text-red-500 hover:text-red-700 transition-colors" title="Eliminar">
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
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
          
          <!-- Cabecera del Modal -->
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
            <h3 class="text-lg font-bold text-slate-800">
              {{ editando ? 'Editar Asignatura' : 'Registrar Nueva Asignatura' }}
            </h3>
            <button @click="cerrarModal" class="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Cuerpo del Modal -->
          <div class="p-6 overflow-y-auto space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <!-- FACULTAD (Ahora es un Select) -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Facultad <span class="text-red-500">*</span></label>
                <select 
                  v-model="formulario.Facultad" 
                  @change="onFacultadChange"
                  class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option value="" disabled>Seleccione una facultad</option>
                  <option v-for="f in facultadesUnicas" :key="f" :value="f">{{ f }}</option>
                </select>
              </div>

              <!-- CARRERA (Ahora es un Select dependiente) -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Carrera <span class="text-red-500">*</span></label>
                <select 
                  v-model="formulario.Carrera" 
                  :disabled="!formulario.Facultad"
                  class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>Seleccione una carrera</option>
                  <option v-for="c in carrerasPorFacultad" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>

              <!-- Asignatura -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Asignatura <span class="text-red-500">*</span></label>
                <input v-model="formulario.Asignatura" type="text" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Ej: Programación Web" />
              </div>
              <!-- Sección -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Sección</label>
                <input v-model.number="formulario.Sección" type="number" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <!-- Ciclo -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Ciclo</label>
                <input v-model="formulario.Ciclo" type="text" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Ej: 02-2026" />
              </div>
              <!-- Tutor -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Tutor <span class="text-red-500">*</span></label>
                <input v-model="formulario.Tutor" type="text" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <!-- Correo Tutor -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Correo Tutor <span class="text-red-500">*</span></label>
                <input v-model="formulario.Correo_Tutor" type="email" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <!-- Correo Coordinador -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Correo Coordinador</label>
                <input v-model="formulario.Correo_Coordinador" type="email" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              
              <!-- Separador Visual -->
              <div class="md:col-span-2 border-t border-gray-200 my-2"></div>

              <!-- Monitor Asignado -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Asignar Monitor</label>
                <select v-model="monitorSeleccionado" @change="asignarMonitor" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer">
                  <option value="">Sin asignar</option>
                  <option v-for="mon in monitores" :key="mon.Id" :value="mon">{{ mon.Nombre }} ({{ mon.Facultad }})</option>
                </select>
              </div>
              <!-- Nombre Monitor (Readonly) -->
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nombre del Monitor</label>
                <input v-model="formulario.Monitor_Nombre" type="text" class="w-full p-2.5 bg-slate-100 border border-slate-200 text-slate-600 text-sm rounded-lg cursor-not-allowed" readonly />
              </div>
              <!-- Correo Monitor (Readonly) -->
              <div class="md:col-span-2">
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Correo del Monitor</label>
                <input v-model="formulario.Correo_Monitor" type="email" class="w-full p-2.5 bg-slate-100 border border-slate-200 text-slate-600 text-sm rounded-lg cursor-not-allowed" readonly />
              </div>
            </div>
          </div>

          <!-- Footer del Modal -->
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
              {{ guardando ? 'Guardando...' : 'Guardar Asignatura' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchData, crearRegistro, actualizarRegistro, eliminarRegistro, NOCODB_ENDPOINTS } from '@/api';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

// ==========================================
// ESTADO
// ==========================================
const asignaturas = ref<any[]>([]);
const monitores = ref<any[]>([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const editando = ref(false);
const guardando = ref(false);
const editandoId = ref<number | null>(null);
const monitorSeleccionado = ref<any>(null);

// Filtros
const filtroFacultad = ref('');
const filtroCiclo = ref('');
const filtroTexto = ref('');

// Formulario
const formulario = ref<any>({
  Facultad: '',
  Carrera: '',
  Asignatura: '',
  Sección: null,
  Ciclo: '',
  Tutor: '',
  Correo_Tutor: '',
  Correo_Coordinador: '',
  Monitor_Nombre: '',
  Correo_Monitor: ''
});

// ==========================================
// COMPUTADOS
// ==========================================
const facultadesUnicas = computed(() => {
  return [...new Set(asignaturas.value.map(a => a.Facultad))].filter(Boolean).sort();
});

const ciclosUnicos = computed(() => {
  return [...new Set(asignaturas.value.map(a => a.Ciclo))].filter(Boolean).sort();
});

// ⭐ NUEVO: Obtiene las carreras que pertenecen a la facultad seleccionada
const carrerasPorFacultad = computed(() => {
  if (!formulario.value.Facultad) return [];
  return [...new Set(
    asignaturas.value
      .filter(a => a.Facultad === formulario.value.Facultad)
      .map(a => a.Carrera)
  )].filter(Boolean).sort();
});

const asignaturasFiltradas = computed(() => {
  return asignaturas.value.filter(a => {
    const matchFacultad = !filtroFacultad.value || a.Facultad === filtroFacultad.value;
    const matchCiclo = !filtroCiclo.value || a.Ciclo === filtroCiclo.value;
    const matchTexto = !filtroTexto.value || 
      (a.Asignatura?.toLowerCase().includes(filtroTexto.value.toLowerCase())) ||
      (a.Tutor?.toLowerCase().includes(filtroTexto.value.toLowerCase())) ||
      (a.Monitor_Nombre?.toLowerCase().includes(filtroTexto.value.toLowerCase()));
    return matchFacultad && matchCiclo && matchTexto;
  });
});

// ==========================================
// MÉTODOS DE CARGA
// ==========================================
const cargarAsignaturas = async () => {
  cargando.value = true;
  try {
    const data = await fetchData(NOCODB_ENDPOINTS.asignaturas);
    asignaturas.value = data.list || [];
  } catch (error) {
    console.error(error);
    alert('Error al cargar asignaturas.');
  } finally {
    cargando.value = false;
  }
};

const cargarMonitores = async () => {
  try {
    const data = await fetchData(NOCODB_ENDPOINTS.monitores);
    monitores.value = data.list || [];
  } catch (error) {
    console.error('Error al cargar monitores:', error);
  }
};

// ==========================================
// LÓGICA DEL FORMULARIO
// ==========================================
const asignarMonitor = () => {
  if (monitorSeleccionado.value) {
    formulario.value.Monitor_Nombre = monitorSeleccionado.value.Nombre;
    formulario.value.Correo_Monitor = monitorSeleccionado.value.Correo;
  } else {
    formulario.value.Monitor_Nombre = '';
    formulario.value.Correo_Monitor = '';
  }
};

// ⭐ NUEVO: Si el usuario cambia la facultad, reseteamos la carrera si ya no pertenece a esa facultad
const onFacultadChange = () => {
  if (!carrerasPorFacultad.value.includes(formulario.value.Carrera)) {
    formulario.value.Carrera = '';
  }
};

const abrirFormulario = (asig?: any) => {
  if (asig) {
    editando.value = true;
    editandoId.value = asig.Id;
    formulario.value = { ...asig };
    monitorSeleccionado.value = monitores.value.find(m => m.Nombre === asig.Monitor_Nombre) || null;
  } else {
    editando.value = false;
    editandoId.value = null;
    monitorSeleccionado.value = null;
    formulario.value = {
      Facultad: filtroFacultad.value || '',
      Carrera: '',
      Asignatura: '',
      Sección: null,
      Ciclo: filtroCiclo.value || '',
      Tutor: '',
      Correo_Tutor: '',
      Correo_Coordinador: '',
      Monitor_Nombre: '',
      Correo_Monitor: ''
    };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardar = async () => {
  if (!formulario.value.Facultad || !formulario.value.Carrera || !formulario.value.Asignatura || !formulario.value.Tutor || !formulario.value.Correo_Tutor) {
    alert('Por favor completa los campos obligatorios (*)');
    return;
  }

  guardando.value = true;
  try {
    if (editando.value && editandoId.value) {
      await actualizarRegistro(NOCODB_ENDPOINTS.asignaturas, editandoId.value, formulario.value);
    } else {
      await crearRegistro(NOCODB_ENDPOINTS.asignaturas, formulario.value);
    }
    cerrarModal();
    await cargarAsignaturas();
  } catch (error) {
    console.error(error);
    alert('Error al guardar.');
  } finally {
    guardando.value = false;
  }
};

const confirmarEliminar = async (asig: any) => {
  if (!confirm(`¿Estás seguro de eliminar la asignatura "${asig.Asignatura}" de la carrera ${asig.Carrera}?`)) return;
  try {
    await eliminarRegistro(NOCODB_ENDPOINTS.asignaturas, asig.Id);
    await cargarAsignaturas();
  } catch (error) {
    console.error(error);
    alert('Error al eliminar.');
  }
};

// ==========================================
// CICLO DE VIDA
// ==========================================
onMounted(async () => {
  await Promise.all([cargarAsignaturas(), cargarMonitores()]);
});
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