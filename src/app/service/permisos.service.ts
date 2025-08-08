import axios from "axios";

import type { PermisoDTO } from '../types/index'
import { API_URL } from "./connection";

export const getPermisos = async (): Promise<PermisoDTO[]> => {
    const response = await axios.get<PermisoDTO[]>(`${API_URL}/permisos`);
    return response.data;
}
