export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ⚠️ ELIMINAMOS NOCODB_URL y NOCODB_API_KEY por seguridad.
// Ya n8n maneja la conexión de forma interna.

// Endpoints de n8n
export const N8N_WEBHOOKS = {
  login: '/webhook/login-monitor',
  guardarEvaluacion: '/webhook/guardar-evaluacion',
  enviarConsolidado: '/webhook/enviar-consolidado',
  nocoProxy: '/webhook/noco-proxy', // 👈 Agregamos el nuevo Proxy
};

// Endpoints de NocoDB (Ahora solo guardamos los Table IDs)
export const NOCODB_ENDPOINTS = {
  monitores: 'mkectkjcefcl4io',
  asignaturas: 'mbk616lcidzyduy',
  evaluaciones: 'm1t79grifzjthjy',
  semanas: 'mp3zb0f84u4yjwf',
};