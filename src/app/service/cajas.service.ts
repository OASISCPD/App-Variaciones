import axios from "axios";
import type { CajaDTO } from "../types";
import { API_URL } from "./connection";


export const getCajas = async (): Promise<CajaDTO[]> => {
    try {
        const response = await axios.get(`${API_URL}/cajas`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log("ERROR");
        throw error

    }
}