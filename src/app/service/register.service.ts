import { api } from "../api/api";
import type { GetFilters } from "../utils";

export interface CreateRegistroPayload {
    usuario_id: number;
    cajas_id: number;
    accion: string;
    empleado_id: number;
    created_at?: string; // opcional
}

export const createRegistro = async (payload: CreateRegistroPayload) => {
    const { data } = await api.post("/registros", payload);
    return data; // devuelve el registro creado (según tu controller)
};


const buildParams = (f?: GetFilters) => {
    if (!f) return {};
    const params: Record<string, string> = {};
    if (f.fechaDesde) params['fecha_desde'] = f.fechaDesde;
    if (f.fechaHasta) params['fecha_hasta'] = f.fechaHasta;
    if (f.legajo && String(f.legajo).trim() !== '') params['legajo'] = String(f.legajo).trim();
    return params;
};

export const getRegistros = async (filters?: GetFilters) => {
    const { data } = await api.get('/registros', {
        withCredentials: true,
        params: buildParams(filters)
    })
    return data
}