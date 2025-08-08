import { RiArrowUpDownLine, RiArrowUpFill, RiArrowDownFill } from "react-icons/ri";
import type { SortState } from "../types";
import type { JSX } from "react";


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




export const getStatusBadge = (detalle: string) => {
    const lower = detalle.trim().toLowerCase();

    if (lower.includes("faltante")) {
        return (
            <span className="px-2 py-1 text-xs text-white bg-[var(--accent-100)] border border-[var(--primary-200)] rounded">
                Faltante
            </span>
        );
    } else if (lower.includes("sobrante")) {
        return (
            <span className="px-2 py-1 text-xs text-[var(--primary-200)] border border-[var(--primary-200)] bg-[var(--bg-200)] rounded">
                Sobrante
            </span>
        );
    }

    return (
        <span className="px-2 py-1 text-xs text-gray-700 bg-gray-200 border border-[var(--primary-200)] rounded">
            {detalle}
        </span>
    );
};

export const getTipoVariacionBadge = (tipo: string) => {
    const lower = tipo.trim().toLowerCase();

    if (lower.includes("sala")) {
        return <span className="border rounded-full uppercase py-1 px-2 border-blue-300 text-blue-600 bg-blue-50">SALA</span>;
    }

    if (lower.includes("caja")) {
        return <span className="border rounded-full uppercase py-1 px-2 border-green-300 text-green-600 bg-green-50">CAJAS</span>;
    }

    if (lower.includes("bingo")) {
        return <span className="border rounded-full uppercase py-1 px-2 border-purple-300 text-purple-600 bg-purple-50">BINGO</span>;
    }

    if (lower.includes("atc") || lower.includes("mkt")) {
        return <span className="border rounded-full uppercase py-1 px-2 border-pink-300 text-pink-600 bg-pink-50">ATC/MKT</span>;
    }

    if (lower.includes("gastronomia")) {
        return <span className="border rounded-full uppercase py-1 px-2 border-yellow-300 text-yellow-700 bg-yellow-50">GASTRONOMÍA</span>;
    }

    if (lower.includes("sistemas")) {
        return <span className="border rounded-full uppercase py-1 px-2 border-indigo-300 text-indigo-600 bg-indigo-50">SISTEMAS</span>;
    }

    if (lower.includes("tesoreria")) {
        return <span className="border rounded-full uppercase py-1 px-2 border-red-300 text-red-600 bg-red-50">TESORERÍA</span>;
    }

    if (lower.includes("seguridad")) {
        return <span className="border rounded-full uppercase py-1 px-2 border-gray-300 text-gray-700 bg-gray-100">SEGURIDAD</span>;
    }

    // Default badge
    return <span className="border rounded-full uppercase py-1 px-2 border-gray-300 text-gray-600 bg-gray-50">{tipo.toUpperCase()}</span>;
};


