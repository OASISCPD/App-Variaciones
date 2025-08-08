import axios from "axios";
import { type UserDTO } from "../types";
import { API_URL } from "./connection";

export const fetchUsers = async (): Promise<UserDTO[]> => {
    const response = await fetch(`${API_URL}/usuarios`);
    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }

    const data = await response.json();
    return data;
};


export const updateUsuarioService = async (id: number, updates: Partial<UserDTO>): Promise<boolean> => {
    try {
        const response = await axios.put(`${API_URL}/usuarios/${id}`, updates)
        return response.status === 200;
    } catch (error) {
        console.error('Error al actualizar el usuario', error);
        return false
    }
}
