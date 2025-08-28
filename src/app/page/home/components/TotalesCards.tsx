import { formatCurrency } from "../../../utils";
import type { CajaDTO } from "../../../types";

interface TotalesCardsProps {
    cajas: CajaDTO[];
    loading: boolean;
}

export const TotalesCards: React.FC<TotalesCardsProps> = ({ cajas, loading }) => {
    // Calcular sumatorias solo si no está loading
    const totalSobrante = loading ? 0 : cajas.reduce((sum, item) => sum + (item.sobrante || 0), 0);
    const totalFaltante = loading ? 0 : cajas.reduce((sum, item) => sum + (item.faltante || 0), 0);

    if (loading) {
        // Skeleton loading state con los mismos colores que los componentes reales
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Skeleton Sobrante - manteniendo colores verdes */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-[var(--bg-300)] rounded-lg p-4 animate-pulse">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="h-4 bg-green-200 rounded w-24 mb-2"></div>
                            <div className="h-8 bg-green-300 rounded w-32"></div>
                        </div>
                        <div className="p-3 bg-green-200 rounded-full">
                            <div className="w-6 h-6 bg-green-300 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Skeleton Faltante - manteniendo colores rojos */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-[var(--bg-300)] rounded-lg p-4 animate-pulse">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="h-4 bg-red-200 rounded w-24 mb-2"></div>
                            <div className="h-8 bg-red-300 rounded w-32"></div>
                        </div>
                        <div className="p-3 bg-red-200 rounded-full">
                            <div className="w-6 h-6 bg-red-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Estado normal con datos
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Total Sobrante */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 border border-[var(--bg-300)] rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-green-800">Total Sobrante</p>
                        <p className="text-2xl font-bold text-[var(--primary-100)]">
                            {formatCurrency(totalSobrante)}
                        </p>
                    </div>
                    <div className="p-3 bg-green-200 rounded-full">
                        <svg className="w-6 h-6 text-[var(--primary-100)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Total Faltante */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-[var(--bg-300)] rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-red-800">Total Faltante</p>
                        <p className="text-2xl font-bold text-[var(--accent-100)]">
                            {formatCurrency(totalFaltante)}
                        </p>
                    </div>
                    <div className="p-3 bg-red-200 rounded-full">
                        <svg className="w-6 h-6 text-[var(--accent-100)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
