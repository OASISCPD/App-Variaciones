import { RiArrowUpDownLine, RiArrowUpFill, RiArrowDownFill } from "react-icons/ri";
import type { SortState } from "../types";
import type { JSX } from "react";
import { format } from "date-fns";


export const parseAmount = (amount: number | string): string => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;

    return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};


// Función para formatear montos
export const formatCurrency = (value: number): string => {
    const absValue = Math.abs(value);
    const formatted = new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(absValue);

    return value < 0 ? `-$${formatted}` : `$${formatted}`;
};


// Función para obtener fecha y hora actual en formato requerido
export const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Formatea una fecha ISO a "dd/mm/yyyy hh:mm"
export const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

// Función para determinar el color del monto
export const getAmountColor = (value: number): string => {
    if (value < 0) return 'text-[var(--accent-100)]';
    return 'text-[var(--text-100)]';
};

export const getSortIcon = <T,>(
    field: keyof T,
    sortState: SortState<T>
): JSX.Element => {
    if (sortState.sortField !== field)
        return <RiArrowUpDownLine size={14} className="ml-1 text-[var(--text-300)]" />;

    return sortState.sortOrder === 'asc'
        ? <RiArrowUpFill size={14} className="ml-1 text-[var(--bg-500)]" />
        : <RiArrowDownFill size={14} className="ml-1 text-[var(--accent-100)]" />;
};

export const formatCurrencyHome = (value: any) =>
    parseFloat(value).toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    });

export type GetFilters = {
    fechaDesde?: string;   // "YYYY-MM-DD"
    fechaHasta?: string;   // "YYYY-MM-DD"
    legajo?: string | number;
    tipo?: "sobrante" | "faltante" | ""; // del select
}


export const getStatusBadge = (detalle: string) => {
    const lower = detalle.trim().toLowerCase();

    if (lower.includes("faltante")) {
        return (
            <span className="px-2 py-1 text-xs text-white bg-[var(--accent-100)] border border-[var(--primary-200)] rounded-md">
                Faltante
            </span>
        );
    } else if (lower.includes("sobrante")) {
        return (
            <span className="px-2 py-1 text-xs text-[var(--primary-200)] border border-[var(--primary-200)] bg-[var(--bg-200)] rounded-md">
                Sobrante
            </span>
        );
    }

    return (
        <span className="px-2 py-1 text-xs text-gray-700 bg-gray-200 border border-[var(--primary-200)] rounded-md">
            {detalle}
        </span>
    );
};

export const getTurnoBadge = (turno: string) => {
    const lower = turno.trim().toLowerCase();

    if (lower.includes("mañana") || lower.includes("manana")) {
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wide bg-green-100 text-green-700 border border-green-300">
                Mañana
            </span>
        );
    }

    if (lower.includes("tarde")) {
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wide bg-yellow-100 text-yellow-700 border border-yellow-300">
                Tarde
            </span>
        );
    }

    if (lower.includes("noche")) {
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wide bg-blue-100 text-blue-700 border border-blue-300">
                Noche
            </span>
        );
    }

    // Default para turnos no reconocidos
    return (
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wide bg-gray-100 text-gray-700 border border-gray-300">
            {turno}
        </span>
    );
};

export const getTipoVariacionBadge = (tipo: string) => {
    const lower = tipo.trim().toLowerCase();

    if (lower.includes("sala")) {
        return <span className="border rounded-md uppercase py-1 px-2 border-blue-300 text-blue-600 bg-blue-50">SALA</span>;
    }

    if (lower.includes("caja")) {
        return <span className="border rounded-md uppercase py-1 px-2 border-green-300 text-green-600 bg-green-50">CAJAS</span>;
    }

    if (lower.includes("bingo")) {
        return <span className="border rounded-md uppercase py-1 px-2 border-purple-300 text-purple-600 bg-purple-50">BINGO</span>;
    }

    if (lower.includes("atc") || lower.includes("mkt")) {
        return <span className="border rounded-md uppercase py-1 px-2 border-pink-300 text-pink-600 bg-pink-50">ATC/MKT</span>;
    }

    if (lower.includes("gastronomia")) {
        return <span className="border rounded-md uppercase py-1 px-2 border-yellow-300 text-yellow-700 bg-yellow-50">GASTRONOMÍA</span>;
    }

    if (lower.includes("sistemas")) {
        return <span className="border rounded-md uppercase py-1 px-2 border-indigo-300 text-indigo-600 bg-indigo-50">SISTEMAS</span>;
    }

    if (lower.includes("tesoreria")) {
        return <span className="border rounded-md uppercase py-1 px-2 border-red-300 text-red-600 bg-red-50">TESORERÍA</span>;
    }

    if (lower.includes("seguridad")) {
        return <span className="border rounded-md uppercase py-1 px-2 border-gray-300 text-gray-700 bg-gray-100">SEGURIDAD</span>;
    }

    // Default badge
    return <span className="border rounded-md uppercase py-1 px-2 border-gray-300 text-gray-600 bg-gray-50">{tipo.toUpperCase()}</span>;
};


export const formateDateTime = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss")
}

export function getActionColor(accion: string): string {
    const lower = accion.toLowerCase();

    if (lower.includes("agrega") || lower.includes("agregar")) {
        return "text-green-500";
    }
    if (lower.includes("edita") || lower.includes("editar") || lower.includes("actualiza")) {
        return "text-yellow-500";
    }
    if (lower.includes("elimina") || lower.includes("elimino") || lower.includes("eliminar")) {
        return "text-[--accent-100]";
    }
    return "text-[--text-200]";
}

