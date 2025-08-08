import type { Variacion } from "../types";

// Datos reales del archivo
export const mockData: Variacion[] = [
    {
        id: 1,
        usuario: "Patricia Bruno",
        fecha: "2025-03-30 19:56:58",
        empleado: "Macarena Dominguez",
        legajo: "14008",
        detalle: "faltante",
        numeroVariacion: "25430",
        tipoVariacion: "sala",
        faltante: 10000,
        sobrante: null,
    },
    {
        id: 2,
        usuario: "Jessica Gonzalez",
        fecha: "2025-03-30 18:23:47",
        empleado: "Macarena Dominguez",
        legajo: "14008",
        detalle: "FALTANTE",
        numeroVariacion: "25430",
        tipoVariacion: "sala",
        faltante: 10000,
        sobrante: null,
    },
    {
        id: 3,
        usuario: "Patricia Bruno",
        fecha: "2025-03-30 16:30:11",
        empleado: "Fabiola Gonzalez",
        legajo: "13713",
        detalle: "encontrado en sala",
        numeroVariacion: "26898",
        tipoVariacion: "CAJAS",
        faltante: null,
        sobrante: 12850,
    },
    {
        id: 4,
        usuario: "Patricia Bruno",
        fecha: "2025-03-29 21:16:53",
        empleado: "ANGELICA VILLALBA",
        legajo: "14129",
        detalle: "sobrante",
        numeroVariacion: "26900",
        tipoVariacion: "CAJAS",
        faltante: null,
        sobrante: 1000,
    },
    {
        id: 5,
        usuario: "Patricia Bruno",
        fecha: "2025-03-29 21:16:31",
        empleado: "VICTORIA RABBIA",
        legajo: "14128",
        detalle: "sobrante",
        numeroVariacion: "26899",
        tipoVariacion: "CAJAS",
        faltante: null,
        sobrante: 1650,
    },
    {
        id: 6,
        usuario: "Patricia Bruno",
        fecha: "2025-03-29 20:30:51",
        empleado: "Santiago Gimenez",
        legajo: "14067",
        detalle: "FALTANTE",
        numeroVariacion: "26890",
        tipoVariacion: "sala",
        faltante: 100000,
        sobrante: null,
    },
]



export const inputStyle = "w-full px-3 py-2 border rounded bg-[var(--bg-200)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)]";
export const inputStyleDisabled = "w-full px-3 py-2 border rounded bg-[var(--bg-200)] text-gray-500 cursor-not-allowed";
