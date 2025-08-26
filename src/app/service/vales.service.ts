import axios from "axios";
import type { ValeDTO } from "../types";
import { API_URL } from "./connection";
import type { GetFilters } from "../utils";

const buildParams = (f?: GetFilters) => {
    if (!f) return {};
    const params: Record<string, string> = {};
    if (f.fechaDesde) params["fecha_desde"] = f.fechaDesde;
    if (f.fechaHasta) params["fecha_hasta"] = f.fechaHasta;
    if (f.legajo && String(f.legajo).trim() !== "") params["legajo"] = String(f.legajo).trim();
    return params;
}
export interface CreateValePayload {
    empleado: string;
    turno: string;
    fecha: string;
    importe: number;
    firma_empleado: string;
    id_usuario: number
}

export const createVale = async (payload: CreateValePayload) => {
    const { data } = await axios.post(`${API_URL}/vales`, payload, {
        headers: { "Content-Type": "application/json" },
    });
    return data;
}

export const getVales = async (filters?: GetFilters): Promise<ValeDTO[]> => {
    try {
        const response = await axios.get(`${API_URL}/vales`, {
            withCredentials: true,
            params: buildParams(filters)
        })
        return response.data
    } catch (error) {
        console.log("ERROR");
        throw error
    }
}
