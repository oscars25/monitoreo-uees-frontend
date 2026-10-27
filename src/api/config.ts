export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const N8N_WEBHOOKS = {
  login: '/webhook/login-monitor',
  guardarEvaluacion: '/webhook/guardar-evaluacion',
  enviarConsolidado: '/webhook/enviar-consolidado',
  nocoProxy: '/webhook/noco-proxy', 
  enviarComunicado: '/webhook/enviar-comunicado', 
  comunicadosProxy: '/webhook/comunicados-proxy',
};

export const NOCODB_ENDPOINTS = {
  monitores: 'mkectkjcefcl4io',
  asignaturas: 'mbk616lcidzyduy',
  evaluaciones: 'm1t79grifzjthjy',
  semanas: 'mp3zb0f84u4yjwf',
  estudiantes: 'mmwkjf4dc3n6817', 
};