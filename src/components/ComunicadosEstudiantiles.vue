<template>
  <div class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mb-6 pb-24 min-h-[600px] relative transition-colors duration-300">
    
    <!-- Botón Regresar -->
    <button @click="$emit('volver')" class="group mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      Volver al menú anterior
    </button>

    <div class="border-b border-gray-200 dark:border-slate-700 pb-4 mb-6">
      <h2 class="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Comunicados Estudiantiles</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Envía un comunicado a todos los estudiantes de una asignatura.</p>
    </div>

    <!-- Estado de Carga -->
    <div v-if="cargandoDatos" class="flex flex-col justify-center items-center h-40 gap-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      <p class="text-sm font-medium text-slate-500">Cargando base de datos de estudiantes...</p>
    </div>

    <div v-else class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden mb-6">
      <div class="p-5 space-y-5">
        
        <!-- Selectores -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Carrera</label>
            <select v-model="selectedCarreraComunicado" class="w-full p-2.5 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-amber-500 transition-colors cursor-pointer">
              <option value="">Seleccione una carrera</option>
              <option v-for="carrera in carrerasUnicas" :key="carrera" :value="carrera">{{ carrera }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Asignatura</label>
            <select v-model="selectedAsignaturaComunicado" class="w-full p-2.5 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-amber-500 transition-colors cursor-pointer" :disabled="!selectedCarreraComunicado">
              <option value="">Seleccione una asignatura</option>
              <option v-for="asig in asignaturasUnicas" :key="asig" :value="asig">{{ asig }}</option>
            </select>
          </div>
        </div>

        <!-- Redacción -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Asunto del Correo</label>
          <input v-model="asuntoComunicado" type="text" placeholder="Ej. Recordatorio de entrega" class="w-full p-2.5 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-amber-500 transition-colors" />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Cuerpo del Mensaje</label>
          <div class="border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden">
            <QuillEditor v-model:content="cuerpoComunicado" contentType="html" theme="snow" :toolbar="toolbarOptions" class="bg-white dark:bg-slate-800" style="min-height: 200px;" />
          </div>
        </div>

        <!-- 👇 NUEVA ZONA DE ARCHIVOS MEJORADA 👇 -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Documentos adjuntos (Opcional)</label>
          
          <!-- Zona Drag & Drop -->
          <div 
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-slate-600 border-dashed rounded-xl hover:border-amber-500 dark:hover:border-amber-500 transition-colors cursor-pointer relative bg-slate-50 dark:bg-slate-800/50"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <!-- Input oculto que cubre toda la zona -->
            <input 
              type="file" 
              multiple 
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              @change="handleFileChange"
              ref="fileInput"
            />
            <div class="space-y-1 text-center">
              <svg class="mx-auto h-10 w-10 text-slate-400 dark:text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                <span class="relative cursor-pointer rounded-md font-semibold text-amber-600 hover:text-amber-500 focus-within:outline-none">
                  Sube un archivo
                </span>
                <p class="pl-1">o arrástralo y suéltalo aquí</p>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400">PDF, PNG, JPG, DOCX hasta 10MB</p>
            </div>
          </div>

          <!-- Lista de archivos seleccionados -->
          <ul v-if="archivosAdjuntos.length > 0" class="mt-4 space-y-2">
            <li v-for="(file, index) in archivosAdjuntos" :key="index" class="flex items-center justify-between p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-sm">
              <div class="flex items-center gap-3 overflow-hidden">
                <!-- Icono de documento -->
                <div class="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-md flex-shrink-0">
                  <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                </div>
                <div class="flex flex-col truncate">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{{ file.name }}</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">{{ formatSize(file.size) }}</span>
                </div>
              </div>
              <!-- Botón de eliminar -->
              <button @click="removeFile(index)" type="button" class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors" title="Eliminar archivo">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </li>
          </ul>
        </div>
        <!-- 👆 FIN DE LA ZONA DE ARCHIVOS MEJORADA 👆 -->

      </div>

      <!-- Footer -->
      <div class="bg-slate-50 dark:bg-slate-900/50 px-5 py-4 border-t border-gray-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <span class="text-sm font-medium text-slate-600 dark:text-slate-400">
          Se enviará a los estudiantes de: <br class="md:hidden" />
          <span class="font-bold text-amber-600">{{ selectedAsignaturaComunicado || '(Ninguna)' }}</span>
        </span>
        
        <button 
          @click="enviarComunicado" 
          class="w-full md:w-auto inline-flex justify-center items-center gap-2 bg-amber-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed"
          :disabled="!comunicadoValido || enviando"
        >
          <svg v-if="enviando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          {{ enviando ? 'Enviando...' : 'Enviar Comunicado' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import { useAuthStore } from '@/stores/auth';
import { apiClient, postToN8n, N8N_WEBHOOKS } from '@/api';
import { useToast } from '@/composables/useToast';

const emit = defineEmits(['volver']);

const toolbarOptions = [
  [{ 'header': [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['link', 'image'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'color': [] }, { 'background': [] }],
  ['clean']
];

const authStore = useAuthStore();
const toast = useToast();

const cargandoDatos = ref(true);
const enviando = ref(false);

const listaEstudiantes = ref<any[]>([]);
const selectedCarreraComunicado = ref('');
const selectedAsignaturaComunicado = ref('');
const asuntoComunicado = ref('');
const cuerpoComunicado = ref('');

const archivosAdjuntos = ref<File[]>([]);
const fileInput = ref<HTMLInputElement | null>(null); // Referencia para limpiar el input

// 1. Manejo del input clásico
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    archivosAdjuntos.value = Array.from(target.files);
  }
};

// 2. Manejo de Drag & Drop
const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files;
  if (files) {
    archivosAdjuntos.value = Array.from(files);
    // Nota: Si el usuario suelta archivos, no se actualiza el input nativo, 
    // pero como usamos la variable 'archivosAdjuntos' para el FormData, funcionará perfecto.
  }
};

// 3. Eliminar archivo de la lista
const removeFile = (index: number) => {
  archivosAdjuntos.value.splice(index, 1);
  // Si borramos todos los archivos, limpiamos el input para poder volver a subir el mismo
  if (archivosAdjuntos.value.length === 0 && fileInput.value) {
    fileInput.value.value = '';
  }
};

// 4. Formatear el tamaño del archivo (KB / MB)
const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Filtramos las carreras únicas basándonos en la Facultad del monitor
const carrerasUnicas = computed(() => {
  const facultadMonitor = String(authStore.monitor?.Facultad || '').trim().toLowerCase();
  
  const carreras = listaEstudiantes.value
    .filter(e => String(e.FACULTAD || '').trim().toLowerCase() === facultadMonitor)
    .map(e => e.CARRERA);
    
  return [...new Set(carreras)].filter(Boolean).sort();
});

// Filtramos las asignaturas únicas basándonos en la carrera seleccionada
const asignaturasUnicas = computed(() => {
  if (!selectedCarreraComunicado.value) return [];
  
  const asignaturas = listaEstudiantes.value
    .filter(e => e.CARRERA === selectedCarreraComunicado.value)
    .map(e => e.ASIGNATURA);
    
  return [...new Set(asignaturas)].filter(Boolean).sort();
});

const comunicadoValido = computed(() => {
  return selectedAsignaturaComunicado.value !== '' && 
         asuntoComunicado.value.trim() !== '' && 
         cuerpoComunicado.value.trim() !== '';
});

onMounted(async () => {
  try {
    const response = await apiClient.post(N8N_WEBHOOKS.comunicadosProxy);
    listaEstudiantes.value = response.data.list || [];
  } catch (error) {
    console.error('Error al cargar estudiantes:', error);
    toast.error('Error al cargar la base de datos de estudiantes.');
  } finally {
    cargandoDatos.value = false;
  }
});

const enviarComunicado = async () => {
  if (!comunicadoValido.value || !authStore.monitor) return;

  enviando.value = true;
  try {
    const formData = new FormData();
    formData.append('Monitor_Nombre', authStore.monitor?.Nombre || '');
    formData.append('Correo_Monitor', authStore.monitor?.Correo || '');
    formData.append('Facultad', authStore.monitor?.Facultad || '');
    formData.append('Asignatura_Nombre', selectedAsignaturaComunicado.value);
    formData.append('Asunto', asuntoComunicado.value);
    formData.append('Cuerpo', cuerpoComunicado.value);

    archivosAdjuntos.value.forEach((archivo) => {
      formData.append('archivos', archivo);
    });

    await postToN8n(N8N_WEBHOOKS.enviarComunicado, formData);
    
    toast.success('Comunicado enviado exitosamente.');
    emit('volver');
  } catch (error) {
    toast.error('Error al enviar el comunicado.');
  } finally {
    enviando.value = false;
  }
};
</script>