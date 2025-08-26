import axios from "axios";
import type { CajaDTO } from "../types";
import { API_URL } from "./connection";
import type { GetFilters } from "../utils";
import { api } from "../api/api";

// Campos que el backend permite actualizar (parciales)
export type CajaUpdatableFields = Partial<{
    empleado: string;
    detalle: string;
    num_variacion: number | string;
    tipo_variacion: string;
    sobrante: number | string;
    faltante: number | string;
    estado: string;               // <- para “eliminar” usás "4"
    usuario: string;              // si querés permitir actualizarlo
}>;


const buildParams = (f?: GetFilters) => {
    if (!f) return {};
    const params: Record<string, string | number> = {};
    if (f.fechaDesde) params["fecha_desde"] = f.fechaDesde;
    if (f.fechaHasta) params["fecha_hasta"] = f.fechaHasta;
    if (f.legajo) params["legajo"] = String(f.legajo);
    if (f.tipo) params["tipo"] = f.tipo;
    return params;
};

export const getCajas = async (filters?: GetFilters): Promise<CajaDTO[]> => {
    try {
        const response = await axios.get(`${API_URL}/cajas`, {
            withCredentials: true,
            params: buildParams(filters)
        });
        return response.data
    } catch (error) {
        console.log("ERROR");
        throw error

    }
}

export const updateCaja = async (id: number, values: CajaUpdatableFields) => {
    const { data } = await api.put(`/cajas/${id}`, values);
    return data//backend devuelve body actualizado

}