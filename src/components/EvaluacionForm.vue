<template>
  <div class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mb-6 pb-24 min-h-[600px] relative transition-colors duration-300">
    
    <!-- ========================================== -->
    <!-- ESTADO DE CARGA INICIAL                    -->
    <!-- ========================================== -->
    <div v-if="semanaCargando" class="flex flex-col justify-center items-center h-64 gap-4">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      <p class="text-sm font-medium text-slate-500">Cargando información del sistema...</p>
    </div>

    <!-- ========================================== -->
    <!-- ALERTA SIN SEMANA                          -->
    <!-- ========================================== -->
    <div v-else-if="!semanaActiva" class="bg-amber-50 border border-amber-200 rounded-lg p-5 flex items-start gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>
        <h3 class="text-sm font-bold text-amber-800">No hay semana académica activa</h3>
        <p class="text-sm text-amber-700 mt-1">Contacta al administrador para que verifique el calendario académico vigente.</p>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- VISTA 1: MENÚ PRINCIPAL                    -->
    <!-- ========================================== -->
    <div v-else-if="vistaActual === 'menu'" class="flex flex-col items-center justify-center pt-8 md:pt-12">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Panel del Monitor</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Semana {{ semanaActiva.Numero_Semana }} - {{ semanaActiva.Descripcion }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <!-- Opción 1: Evaluación -->
        <button @click="vistaActual = 'evaluacion'" class="group flex flex-col items-center p-8 bg-white border border-gray-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all duration-200">
          <div class="p-4 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span class="text-xl font-bold text-slate-800 dark:text-white mb-2">Realizar Evaluación</span>
          <span class="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed">Registrar o editar los criterios de evaluación semanal de sus asignaturas asignadas.</span>
        </button>

        <!-- Opción 2: Notificación -->
        <button @click="abrirVistaNotificacion" class="group flex flex-col items-center p-8 bg-white border border-gray-200 rounded-2xl hover:border-emerald-400 hover:shadow-md transition-all duration-200">
          <div class="p-4 bg-emerald-50 rounded-full mb-4 group-hover:bg-emerald-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="text-xl font-bold text-slate-800 dark:text-white mb-2">Notificar Coordinador</span>
          <span class="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed">Revisar el estado de las evaluaciones y enviar el reporte consolidado en formato PDF.</span>
        </button>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- VISTA 2: REALIZAR EVALUACIÓN               -->
    <!-- ========================================== -->
    <div v-else-if="vistaActual === 'evaluacion'">
      
      <!-- Botón Regresar -->
      <button 
        @click="volverAlMenu" 
        class="group mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al menú anterior
      </button>

      <div class="border-b border-gray-200 pb-4 mb-6">
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Registro de Evaluación</h2>
        <p class="text-sm text-slate-500 mt-1">Complete los criterios para la asignatura seleccionada.</p>
      </div>

      <!-- Alerta sin asignaturas -->
      <div v-if="todasLasAsignaturas.length === 0" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
        <p class="text-sm text-red-700 font-medium">No tienes asignaturas asignadas en el catálogo para evaluar.</p>
      </div>

      <template v-if="todasLasAsignaturas.length > 0">
        
        <!-- Selectores de Carrera y Asignatura -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Carrera</label>
            <select v-model="selectedCarrera" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer" :disabled="asignaturasCargando">
              <option value="">Seleccione una carrera</option>
              <option v-for="carrera in carreras" :key="carrera" :value="carrera">{{ carrera }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Asignatura</label>
            <select v-model="selectedAsignatura" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer" :disabled="!selectedCarrera" @change="onCambioAsignatura">
              <option value="">Seleccione una asignatura</option>
              <option v-for="asig in asignaturasFiltradas" :key="asig.Id" :value="asig">
                {{ asig.Asignatura }} (Sección {{ asig.Sección }})
              </option>
            </select>
          </div>
        </div>

        <!-- Indicadores de estado de búsqueda -->
        <div v-if="cargandoEvaluacion" class="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 p-3 rounded-lg mb-6">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          Buscando evaluación previa en el sistema...
        </div>

        <!-- Alertas de estado (Edición / Creación) -->
        <div v-if="!cargandoEvaluacion && evaluacionExistente && selectedAsignatura" class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <p class="text-sm text-emerald-800 font-medium">Evaluación ya registrada para esta semana. Puede actualizar los datos si es necesario.</p>
        </div>
        <div v-if="!cargandoEvaluacion && !evaluacionExistente && selectedAsignatura" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <p class="text-sm text-blue-800 font-medium">Se creará un nuevo registro de evaluación para esta asignatura en la semana actual.</p>
        </div>

        <!-- FORMULARIO DE EVALUACIÓN -->
        <template v-if="selectedAsignatura">
          
          <!-- Datos Informativos del Tutor -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Tutor Asignado</label>
              <input type="text" :value="selectedAsignatura.Tutor" class="w-full p-2.5 bg-slate-100 border border-slate-200 text-slate-700 text-sm rounded-lg cursor-not-allowed" readonly />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Correo del Tutor</label>
              <input type="text" :value="selectedAsignatura.Correo_Tutor" class="w-full p-2.5 bg-slate-100 border border-slate-200 text-slate-700 text-sm rounded-lg cursor-not-allowed" readonly />
            </div>
          </div>

          <!-- Panel de Criterios de Evaluación -->
          <div class="mb-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div class="bg-slate-50 px-5 py-4 border-b border-gray-200">
              <h3 class="text-base font-bold text-slate-800">Criterios de Evaluación</h3>
            </div>
            
            <div class="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Ruta de Aprendizaje -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Ruta de Aprendizaje</label>
                <select v-model="form.Ruta_Aprendizaje" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer">
                  <option value="" disabled>Seleccione...</option>
                  <option value="SI">SI</option><option value="NO">NO</option><option value="N/A">N/A</option>
                </select>
              </div>

              <!-- Lectura H5P -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Lectura H5P</label>
                <select v-model="form.Lectura_H5P" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer">
                  <option value="" disabled>Seleccione...</option>
                  <option value="SI">SI</option><option value="NO">NO</option><option value="N/A">N/A</option>
                </select>
              </div>

              <!-- Foros de Consulta -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Foros de Consulta</label>
                <select v-model="form.Foros_Consulta" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer">
                  <option value="" disabled>Seleccione...</option>
                  <option value="SI">SI</option><option value="NO">NO</option><option value="N/A">N/A</option>
                </select>
              </div>
              <!-- Evaluación Semanal -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Evaluación Semanal</label>
                <select v-model="form.Evaluacion_Semanal" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer">
                  <option value="" disabled>Seleccione...</option>
                  <option value="SI">SI</option><option value="NO">NO</option><option value="N/A">N/A</option>
                </select>
              </div>
              <!-- Motivación e Interacción -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Motivación e Interacción</label>
                <select v-model="form.Motiva_Interaccion" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer">
                  <option value="" disabled>Seleccione...</option>
                  <option value="SI">SI</option><option value="NO">NO</option><option value="N/A">N/A</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Editores de Texto Enriquecido -->
          <div class="space-y-6 mb-8">
            <!-- Observaciones -->
            <div class="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div class="bg-slate-50 px-5 py-3 border-b border-gray-200">
                <label class="text-sm font-bold text-slate-800">Observaciones</label>
                <p class="text-xs text-slate-500 mt-0.5">Notas que se incluirán en el reporte del coordinador.</p>
              </div>
              <QuillEditor v-model:content="form.Observaciones" contentType="html" theme="snow" :toolbar="toolbarOptions" class="bg-white" style="min-height: 120px;" />
            </div>

            <!-- Mensaje al Tutor -->
            <div class="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div class="bg-slate-50 px-5 py-3 border-b border-gray-200">
                <label class="text-sm font-bold text-slate-800">Mensaje al Tutor (Opcional)</label>
                <p class="text-xs text-slate-500 mt-0.5">Este texto se enviará como introducción en la notificación al tutor.</p>
              </div>
              <QuillEditor v-model:content="form.Mensaje_Tutor" contentType="html" theme="snow" :toolbar="toolbarOptions" class="bg-white" style="min-height: 120px;" />
            </div>
          </div>

          <!-- Botón Guardar -->
          <div class="pt-6 border-t border-gray-200 flex justify-end">
            <button 
              @click="guardarEvaluacion" 
              class="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
              :disabled="!formValido || cargandoEvaluacion || enviando"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              {{ evaluacionExistente ? 'Actualizar Evaluación' : 'Guardar Evaluación' }}
            </button>
          </div>
        </template>
      </template>
    </div>

    <!-- ========================================== -->
    <!-- VISTA 3: NOTIFICAR COORDINADOR             -->
    <!-- ========================================== -->
    <div v-else-if="vistaActual === 'notificacion'">
      
      <!-- Botón Regresar -->
      <button 
        @click="volverAlMenu" 
        class="group mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al menú anterior
      </button>

      <div class="border-b border-gray-200 pb-4 mb-6">
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Enviar Reporte Consolidado</h2>
        <p class="text-sm text-slate-500 mt-1">Verifique el estado de las evaluaciones y notifique al coordinador de la carrera.</p>
      </div>

      <!-- Filtro de Carrera y Datos del Coordinador -->
      <div class="mb-8 bg-slate-50 p-5 rounded-xl border border-slate-200">
        <label class="block text-sm font-semibold text-slate-700 mb-2">Seleccione la carrera a reportar:</label>
        <select v-model="selectedCarreraNotificacion" @change="filtrarAsignaturasNotificacion" class="w-full md:w-1/2 p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer">
          <option value="">Seleccione una carrera</option>
          <option v-for="carrera in carreras" :key="carrera" :value="carrera">{{ carrera }}</option>
        </select>

        <!-- Aviso del coordinador asignado -->
        <div v-if="coordinadorActual" class="mt-4 flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg w-full md:w-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div>
            <p class="text-sm text-blue-900 font-medium">
              Coordinador asignado: <span class="font-bold">{{ coordinadorActual.nombre }}</span>
            </p>
            <p v-if="coordinadorActual.correo" class="text-xs text-blue-700">{{ coordinadorActual.correo }}</p>
          </div>
        </div>
      </div>

      <!-- Tabla de Estados -->
      <div v-if="selectedCarreraNotificacion" class="mb-8">
        <h3 class="text-base font-bold text-slate-800 mb-3">Estado de Evaluaciones</h3>
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table class="w-full text-sm text-left">
            <thead class="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th class="px-5 py-3">Asignatura</th>
                <th class="px-5 py-3 text-center">Sección</th>
                <th class="px-5 py-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="asig in asignaturasNotificacion" :key="asig.Id" class="hover:bg-slate-50 transition-colors">
                <td class="px-5 py-3.5 font-medium text-slate-800">{{ asig.Asignatura }}</td>
                <td class="px-5 py-3.5 text-slate-500 text-center">{{ asig.Sección }}</td>
                <td class="px-5 py-3.5 text-center">
                  <span v-if="estaEvaluada(asig.Id)" class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-200">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                    OK
                  </span>
                  <span v-else class="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-md text-xs font-bold border border-red-200">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    FALTA
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Formulario de Redacción -->
      <div v-if="selectedCarreraNotificacion" class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
        <div class="bg-slate-50 px-5 py-4 border-b border-gray-200">
          <h3 class="text-base font-bold text-slate-800">Redactar Mensaje al Coordinador</h3>
        </div>
        
        <div class="p-5 space-y-5">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Asunto del Correo</label>
            <input v-model="mensajeCoordinador.asunto" type="text" placeholder="Ej. Reporte de Monitoreo - Semana 4" class="w-full p-2.5 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Cuerpo del Mensaje</label>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <QuillEditor v-model:content="mensajeCoordinador.cuerpo" contentType="html" theme="snow" :toolbar="toolbarOptions" class="bg-white" style="min-height: 150px;" />
            </div>
          </div>
        </div>

        <div class="bg-slate-50 dark:bg-slate-900/50 px-5 py-4 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3">
          
          <!-- NUEVO BOTÓN: Descargar Excel -->
          <button 
            @click="exportarAExcel" 
            class="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-gray-300 dark:border-slate-600 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar Excel
          </button>

          <!-- Tu botón verde actual (Enviar) -->
          <button 
            @click="enviarConsolidado" 
            class="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
            :disabled="!mensajeValido || enviando"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Enviar Reporte Consolidado (PDF)
          </button>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- OVERLAY DE CARGA (PANTALLA COMPLETA)       -->
    <!-- ========================================== -->
    <Transition name="fade">
      <div v-if="enviando" class="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/40 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-5 max-w-sm mx-4">
          <div class="spinner">
            <div v-for="i in 12" :key="i" class="spinner-bar" :style="{ transform: `rotate(${i * 30}deg) translateY(-24px)`, animationDelay: `${(i * 0.1).toFixed(1)}s` }"></div>
          </div>
          <div class="text-center">
            <p class="text-lg font-bold text-slate-800">Procesando solicitud</p>
            <p class="text-sm text-slate-500 mt-1">Enviando información al servidor...</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import { useAuthStore } from '@/stores/auth';
import { fetchData, postToN8n, N8N_WEBHOOKS, NOCODB_ENDPOINTS } from '@/api';
// IMPORTAMOS EL SISTEMA DE TOASTS
import { useToast } from '@/composables/useToast';
import ExcelJS from 'exceljs';

// ==========================================
// EXPORTAR A EXCEL CON ESTILOS (Sin Filtros)
// ==========================================
const exportarAExcel = async () => {
  if (!selectedCarreraNotificacion.value || !semanaActiva.value) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Semana');

  // 1. Definir el ancho de las columnas
  worksheet.columns = [
    { width: 5 },  // A: N°
    { width: 35 }, // B: Asignatura
    { width: 10 }, // C: Sección
    { width: 35 }, // D: Tutor
    { width: 15 }, // E: Criterio 1
    { width: 15 }, // F: Criterio 2
    { width: 15 }, // G: Criterio 3
    { width: 15 }, // H: Criterio 4
    { width: 15 }, // I: Criterio 5
    { width: 60 }, // J: Observaciones
  ];

  // 2. Función para agregar los títulos combinando celdas
  const mergeAndStyle = (row: number, text: string, isBold: boolean = true) => {
    worksheet.mergeCells(`C${row}:J${row}`); 
    const cell = worksheet.getCell(`C${row}`);
    cell.value = text;
    cell.font = { bold: isBold, size: 11, color: { argb: 'FF000000' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  };

  // 3. Insertar los títulos
  mergeAndStyle(2, "VICERRECTORÍA DE INNOVACIÓN Y TECNOLOGÍA EDUCATIVA");
  mergeAndStyle(3, "DIRECCIÓN DE TECNOLOGÍA EDUCATIVA");
  mergeAndStyle(4, `INFORME DE MONITOREO VIRTUAL PARA EL ${selectedCarreraNotificacion.value.toUpperCase()}`);
  mergeAndStyle(5, `CICLO ${authStore.monitor?.Ciclo || '02-2026'}`);
  mergeAndStyle(6, semanaActiva.value.Descripcion);
  mergeAndStyle(7, `MONITOR: ${authStore.monitor?.Nombre}`);

  // 4. Insertar el LOGO
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

  // 5. Cabecera de la tabla (Fila 9)
  const headerRow = worksheet.getRow(9);
  const tableHeaders = [
    "N°", "ASIGNATURA", "SECCIÓN", "TUTOR",
    "Cumplimiento de la Ruta de Aprendizaje",
    "Incluye lectura principal (mediador pedagogico h5p)",
    "Realiza foros de consulta e interacción",
    "Evaluación semanal formativa o sumativa (Individual o grupal)",
    "Motiva a la interacción y participación activa del estudiante en el aula",
    "OBSERVACIONES Y APOYO BRINDADO EN LA SEMANA"
  ];

  headerRow.values = tableHeaders;
  headerRow.height = 50; 

  // 6. Aplicar ESTILOS a la cabecera (Colores de la plantilla)
  headerRow.eachCell((cell, colNumber) => {
    cell.font = { bold: true, size: 9, color: { argb: 'FF000000' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Pintar de colores según la columna
    if (colNumber >= 1 && colNumber <= 4) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };
    } else if (colNumber >= 5 && colNumber <= 8) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } };
    } else if (colNumber === 9) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDEBF7' } };
    } else if (colNumber === 10) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCE4D6' } };
    }
  });

  // 7. Agregar los datos y aplicar bordes
  let currentRow = 10;
  asignaturasNotificacion.value.forEach((asig, index) => {
    const evalEncontrada = evaluacionesSemana.value.find((e: any) => String(e.Catalogo_Id_Num) === String(asig.Id));
    const observacionesLimpias = evalEncontrada?.Observaciones 
      ? evalEncontrada.Observaciones.replace(/<[^>]*>?/gm, '') 
      : '';

    const row = worksheet.getRow(currentRow);
    row.values = [
      index + 1,
      asig.Asignatura,
      asig.Sección || asig.Seccion,
      asig.Tutor,
      evalEncontrada ? (evalEncontrada.Ruta_Aprendizaje || 'N/A') : '',
      evalEncontrada ? (evalEncontrada.Lectura_H5P || 'N/A') : '',
      evalEncontrada ? (evalEncontrada.Foros_Consulta || 'N/A') : '',
      evalEncontrada ? (evalEncontrada.Evaluacion_Semanal || 'N/A') : '',
      evalEncontrada ? (evalEncontrada.Motiva_Interaccion || 'N/A') : '',
      observacionesLimpias
    ];

    row.height = 30;

    row.eachCell((cell, colNumber) => {
      cell.font = { size: 10 };
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      
      if (colNumber === 10) {
        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      }
    });

    currentRow++;
  });

  // ⚠️ NOTA: Aquí se eliminó la línea que agregaba el autoFilter

  // 8. Descargar el archivo
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `Informe_${selectedCarreraNotificacion.value.replace(/\s+/g, '_')}_Semana_${semanaActiva.value.Numero_Semana}.xlsx`;
  a.click();
  
  window.URL.revokeObjectURL(url);
};

// ==========================================
// CONFIGURACIÓN DE EDITOR DE TEXTO
// ==========================================
const toolbarOptions = [
  [{ 'header': [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'color': [] }, { 'background': [] }],
  ['clean']
];

const authStore = useAuthStore();
// INICIALIZAMOS LOS TOASTS
const toast = useToast();

// ==========================================
// ESTADO GLOBAL DE LA VISTA
// ==========================================
const vistaActual = ref<'menu' | 'evaluacion' | 'notificacion'>('menu');

// ==========================================
// ESTADO DE DATOS
// ==========================================
const carreras = ref<string[]>([]);
const todasLasAsignaturas = ref<any[]>([]);
const evaluacionesSemana = ref<any[]>([]); // Cache de evaluaciones de la semana actual

const semanaActiva = ref<any>(null);
const semanaCargando = ref(true);
const enviando = ref(false);

// ==========================================
// ESTADO VISTA: EVALUACIÓN
// ==========================================
const selectedCarrera = ref('');
const selectedAsignatura = ref<any>(null);
const asignaturasCargando = ref(false);
const evaluacionExistente = ref<any>(null);
const cargandoEvaluacion = ref(false);

const form = ref({
  Ruta_Aprendizaje: '', 
  Lectura_H5P: '', 
  Foros_Consulta: '', 
  Motiva_Interaccion: '', 
  Evaluacion_Semanal: '', 
  Observaciones: '', 
  Mensaje_Tutor: ''
});

// ==========================================
// ESTADO VISTA: NOTIFICACIÓN
// ==========================================
const selectedCarreraNotificacion = ref('');
const asignaturasNotificacion = ref<any[]>([]);
const mensajeCoordinador = ref({
  asunto: '',
  cuerpo: ''
});

// ==========================================
// COMPUTADOS Y VALIDACIONES
// ==========================================
const asignaturasFiltradas = computed(() => {
  return todasLasAsignaturas.value.filter(a => a.Carrera === selectedCarrera.value);
});

const formValido = computed(() => {
  return form.value.Ruta_Aprendizaje !== '' && form.value.Lectura_H5P !== '' && 
         form.value.Foros_Consulta !== '' && form.value.Motiva_Interaccion !== '' && 
         form.value.Evaluacion_Semanal !== '' && form.value.Observaciones !== '';
});

const mensajeValido = computed(() => {
  return mensajeCoordinador.value.asunto.trim() !== '' && mensajeCoordinador.value.cuerpo.trim() !== '';
});

// Busca los datos del coordinador en la carrera seleccionada
const coordinadorActual = computed(() => {
  if (!asignaturasNotificacion.value.length) return null;
  
  // Buscamos la primera asignatura que tenga datos del coordinador
  const asigConCoordinador = asignaturasNotificacion.value.find(a => a.Correo_Coordinador || a.Nombre_Coordinador);
  
  if (asigConCoordinador) {
    return {
      // Si en tu base de datos tienes el nombre, lo usará. Si no, dirá "Coordinador de Carrera"
      nombre: asigConCoordinador.Nombre_Coordinador || asigConCoordinador.Coordinador || 'Coordinador de Carrera',
      correo: asigConCoordinador.Correo_Coordinador || ''
    };
  }
  return null;
});

// ==========================================
// UTILIDADES
// ==========================================
const normalizar = (texto: string): string => {
  if (!texto) return '';
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
};

const volverAlMenu = () => {
  vistaActual.value = 'menu';
  selectedCarrera.value = '';
  selectedAsignatura.value = null;
  selectedCarreraNotificacion.value = '';
  limpiarFormulario();
};

const limpiarFormulario = () => {
  form.value = { 
    Ruta_Aprendizaje: '', 
    Lectura_H5P: '', 
    Foros_Consulta: '', 
    Motiva_Interaccion: '', 
    Evaluacion_Semanal: '', 
    Observaciones: '', 
    Mensaje_Tutor: '' 
  };
  evaluacionExistente.value = null;
};

// ==========================================
// CARGA DE DATOS INICIALES
// ==========================================
const cargarSemanaActiva = async () => {
  semanaCargando.value = true;
  try {
    const data = await fetchData(NOCODB_ENDPOINTS.semanas);
    const hoy = new Date();
    const fechaHoy = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
    
    semanaActiva.value = (data.list || []).find((s: any) => {
      return fechaHoy >= s.Fecha_Inicio.split('T')[0] && fechaHoy <= s.Fecha_Fin.split('T')[0];
    }) || null;

    if (semanaActiva.value) {
      await cargarEvaluacionesSemana();
    }
  } catch (error) {
    console.error('Error al cargar semana:', error);
  } finally {
    semanaCargando.value = false;
  }
};

const cargarEvaluacionesSemana = async () => {
  if (!semanaActiva.value || !authStore.monitor) return;
  try {
    const data = await fetchData(NOCODB_ENDPOINTS.evaluaciones);
    // Filtramos solo las evaluaciones de esta semana, año y monitor
    evaluacionesSemana.value = (data.list || []).filter((e: any) => 
      String(e.Semana) === String(semanaActiva.value.Numero_Semana) &&
      String(e.Anio) === String(semanaActiva.value.Anio) &&
      String(e.Correo_Monitor).trim().toLowerCase() === authStore.monitor.Correo.trim().toLowerCase()
    );
  } catch (error) {
    console.error('Error al cargar evaluaciones para estado:', error);
  }
};

const cargarAsignaturas = async () => {
  if (!authStore.monitor) return;
  asignaturasCargando.value = true;
  try {
    const data = await fetchData(NOCODB_ENDPOINTS.asignaturas);
    const todas = data.list || [];
    const facultadMonitor = normalizar(authStore.monitor.Facultad);
    
    todasLasAsignaturas.value = todas.filter((a: any) => normalizar(a.Facultad) === facultadMonitor);
    carreras.value = [...new Set(todasLasAsignaturas.value.map(a => a.Carrera))].filter(Boolean).sort() as string[];
  } catch (error) {
    console.error('Error al cargar asignaturas:', error);
  } finally {
    asignaturasCargando.value = false;
  }
};

onMounted(async () => {
  await Promise.all([cargarSemanaActiva(), cargarAsignaturas()]);
});

// ==========================================
// LÓGICA: VISTA EVALUACIÓN
// ==========================================
const onCambioAsignatura = async () => {
  limpiarFormulario();
  if (!selectedAsignatura.value || !semanaActiva.value || !authStore.monitor) return;
  
  cargandoEvaluacion.value = true;
  try {
    const evalEncontrada = evaluacionesSemana.value.find((e: any) => String(e.Catalogo_Id_Num) === String(selectedAsignatura.value.Id));
    
    if (evalEncontrada) {
      evaluacionExistente.value = evalEncontrada;
      form.value = {
        Ruta_Aprendizaje: evalEncontrada.Ruta_Aprendizaje || '',
        Lectura_H5P: evalEncontrada.Lectura_H5P || '',
        Foros_Consulta: evalEncontrada.Foros_Consulta || '',
        Motiva_Interaccion: evalEncontrada.Motiva_Interaccion || '',
        Evaluacion_Semanal: evalEncontrada.Evaluacion_Semanal || '',
        Observaciones: evalEncontrada.Observaciones || '',
        Mensaje_Tutor: evalEncontrada.Mensaje_Tutor || ''
      };
    }
  } finally {
    cargandoEvaluacion.value = false;
  }
};

const guardarEvaluacion = async () => {
  if (enviando.value || !selectedAsignatura.value || !authStore.monitor || !semanaActiva.value) return;

  const payload = {
    Catalogo_Id_Num: selectedAsignatura.value.Id,
    Catalogo_Id: [selectedAsignatura.value.Id],
    Evaluacion_Id: evaluacionExistente.value?.Id || null,
    Asignatura: selectedAsignatura.value.Asignatura,
    Seccion: selectedAsignatura.value.Sección,
    Tutor: selectedAsignatura.value.Tutor,
    Correo_Tutor: selectedAsignatura.value.Correo_Tutor,
    Monitor_Nombre: authStore.monitor.Nombre,
    Correo_Monitor: authStore.monitor.Correo,
    Semana: semanaActiva.value.Numero_Semana,
    Anio: semanaActiva.value.Anio,
    Estado: new Date().getDay() >= 4 ? 'Completado Viernes' : 'Preliminar Enviado',
    ...form.value
  };

  enviando.value = true;
  try {
    await postToN8n(N8N_WEBHOOKS.guardarEvaluacion, payload);
    // TOAST DE ÉXITO
    toast.success('Evaluación guardada correctamente.');
    
    // Refrescar la caché de evaluaciones para actualizar los estados
    await cargarEvaluacionesSemana();
    
    selectedAsignatura.value = null;
    selectedCarrera.value = '';
    limpiarFormulario();
  } catch (error) {
    // TOAST DE ERROR
    toast.error('Error al guardar la evaluación.');
  } finally {
    enviando.value = false;
  }
};

// ==========================================
// LÓGICA: VISTA NOTIFICACIÓN
// ==========================================
const abrirVistaNotificacion = () => {
  vistaActual.value = 'notificacion';
  selectedCarreraNotificacion.value = '';
  asignaturasNotificacion.value = [];
  mensajeCoordinador.value = { asunto: '', cuerpo: '' };
};

const filtrarAsignaturasNotificacion = () => {
  asignaturasNotificacion.value = todasLasAsignaturas.value.filter(a => a.Carrera === selectedCarreraNotificacion.value);
};

const estaEvaluada = (catalogoId: string) => {
  return evaluacionesSemana.value.some((e: any) => String(e.Catalogo_Id_Num) === String(catalogoId));
};

const enviarConsolidado = async () => {
  if (!authStore.monitor || !semanaActiva.value || !selectedCarreraNotificacion.value) return;

  // 1. Contamos cuántas asignaturas de la lista actual NO están evaluadas
  const asignaturasFaltantes = asignaturasNotificacion.value.filter(
    asig => !estaEvaluada(asig.Id)
  );

  // 2. Si hay faltantes, lanzamos la advertencia (Usamos confirm nativo, como te gusta)
  if (asignaturasFaltantes.length > 0) {
    const mensaje = `Ojo: Tienes ${asignaturasFaltantes.length} asignatura(s) sin evaluar en esta carrera.\n\n¿Estás seguro de que deseas enviar el reporte de todos modos?`;
    
    // Si el usuario presiona "Cancelar", detenemos el envío
    if (!confirm(mensaje)) {
      return; 
    }
  }
  
  // 3. Si no hay faltantes (o el usuario aceptó), procedemos con el envío normal
  enviando.value = true;
  try {
    await postToN8n(N8N_WEBHOOKS.enviarConsolidado, {
      Monitor_Nombre: authStore.monitor.Nombre,
      Correo_Monitor: authStore.monitor.Correo,
      Facultad: authStore.monitor.Facultad,
      Carrera: selectedCarreraNotificacion.value,
      Semana: semanaActiva.value.Numero_Semana,
      Anio: semanaActiva.value.Anio,
      Descripcion_Semana: semanaActiva.value.Descripcion,
      Asunto_Correo: mensajeCoordinador.value.asunto,
      Cuerpo_Correo: mensajeCoordinador.value.cuerpo
    });
    
    // TOAST DE ÉXITO
    toast.success('Reporte enviado al coordinador exitosamente.');
    volverAlMenu();
  } catch (error) {
    // TOAST DE ERROR
    toast.error('Error al enviar el consolidado.');
  } finally {
    enviando.value = false;
  }
};
</script>

<style scoped>
/* ==========================================
   ANIMACIONES DEL OVERLAY DE CARGA
   ========================================== */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.spinner {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-bar {
  position: absolute;
  width: 4px;
  height: 14px;
  background-color: #2563eb; /* Azul corporativo */
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform-origin: center;
  animation: spinner-fade 1.2s linear infinite;
}

@keyframes spinner-fade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.15; }
}
</style>