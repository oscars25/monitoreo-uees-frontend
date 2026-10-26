import axios from 'axios';
import { API_BASE_URL, N8N_WEBHOOKS, NOCODB_ENDPOINTS } from './config';

// Cliente para n8n
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// ==========================================
// LECTURA (READ) - Vía Proxy de n8n
// ==========================================

export const fetchData = async (tableId: string, params = {}) => {
  const response = await apiClient.post(N8N_WEBHOOKS.nocoProxy, {
    action: 'read',
    table: tableId
  });
  const data = response.data;
  if (Array.isArray(data)) {
    return { list: data };
  }
  return data;
};

// ==========================================
// CREAR (CREATE) - Vía Proxy de n8n
// ==========================================
export const crearRegistro = async (tableId: string, data: any) => {
  const response = await apiClient.post(N8N_WEBHOOKS.nocoProxy, {
    action: 'create',
    table: tableId,
    data: data
  });
  return response.data;
};

// ==========================================
// ACTUALIZAR (UPDATE) - Vía Proxy de n8n
// ==========================================
export const actualizarRegistro = async (tableId: string, id: number | string, data: any) => {
  // Mantenemos la limpieza de datos en el frontend para no enviar basura a n8n
  const datosLimpios: any = {};
  
  Object.keys(data).forEach(key => {
    const esCampoSistema = ['Id', 'id', 'CreatedAt', 'UpdatedAt', 'nc_order'].includes(key) || key.startsWith('nc_');
    const esObjetoComplejo = typeof data[key] === 'object' && data[key] !== null;

    if (!esCampoSistema && !esObjetoComplejo) {
      datosLimpios[key] = data[key];
    }
  });

  // Enviamos al proxy de n8n
  const response = await apiClient.post(N8N_WEBHOOKS.nocoProxy, {
    action: 'update',
    table: tableId,
    id: Number(id), // n8n usará esto como Row ID
    data: datosLimpios
  });
  return response.data;
};

// ==========================================
// ELIMINAR (DELETE) - Vía Proxy de n8n
// ==========================================
export const eliminarRegistro = async (tableId: string, id: number | string) => {
  const response = await apiClient.post(N8N_WEBHOOKS.nocoProxy, {
    action: 'delete',
    table: tableId,
    id: Number(id)
  });
  return response.data;
};

// ==========================================
// ENVIAR A N8N (OTROS WEBHOOKS)
// ==========================================
export const postToN8n = async (webhook: string, data: any) => {
  const response = await apiClient.post(webhook, data);
  return response.data;
};

export { N8N_WEBHOOKS, NOCODB_ENDPOINTS };