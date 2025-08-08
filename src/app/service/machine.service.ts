/* import axios from 'axios';
import { API_URL } from './connection.ts';
import type { CollectionDto } from '../types/index.ts';

//traer la recaudacion general
export const getRevenue = async (date: string): Promise<CollectionDto[]> => {
    const response = await axios.get(`${API_URL}/recaudacion`, {
        params: {
            fecha_desde: date,
            fecha_hasta: date
        },
        withCredentials: true,
    });
    return response.data;

}

//traer la recaudacion pero mediante maquina
export const getRevenueByMachine = async (fechaDesde: string, fechaHasta: string) => {
    try {
        const response = await axios.get(`${API_URL}/recaudacion_x_maquina`, {
            params: {
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error al obtener recaudación por máquina:", error);
        throw error;
    }
}
 */