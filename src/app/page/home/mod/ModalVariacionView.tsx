// src/components/variaciones/ModalVariacionView.tsx
import axios from "axios";
import { useEffect, useState, type FC } from "react";
import { API_URL } from "../../../service/connection";
import type { ModalData } from "../../../types";
import { RiPrinterLine } from "react-icons/ri";

type TipoVariacion = "FALTANTE" | "SOBRANTE";

export interface VariacionDTO {
    id?: number;
    fecha: string;                 // "2025-08-12"
    turno?: string | null;         // "Mañana"
    sector?: string | null;        // "CPD"
    usuario_id: number;            // 7
    tipo_variacion: TipoVariacion; // "SOBRANTE"
    monto: number;                 // 5000.00
    firma_empleado?: string | null;
    firma_responsable?: string | null;
    legajo_empleado?: number | null;     // 13763
    nombre_empleado?: string | null;
    legajo_responsable?: number | null;  // 13763
    created_at?: string | null;          // "2025-08-12 08:47:10"
    id_variacion: number;                // 1171 (FK a cajas.id)
}

interface Props {
    modalData: ModalData
}


export const ModalVariacionView: FC<Props> = ({ modalData }) => {
    if (!modalData.data?.id) {
        return null
    }

    const [variacion, setVariacion] = useState<VariacionDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    const fetchVariacion = async () => {
        try {
            const res = await axios.get(`${API_URL}/variaciones/${modalData.data?.id}`, { withCredentials: true });
            console.log(res.data[0]);
            console.log(modalData.data);

            setVariacion(res.data[0] || null)
        } catch (error) {
            console.error("Error al obtener la variacion", error);

        } finally {
            setLoading(false)
        }
    }

    const onClickPrinter = () => {
        window.open(`/print-variacion/${variacion?.id_variacion}`)
    }

    useEffect(() => {
        fetchVariacion()
    }, [])

    if (loading) {
        return <p className="text-[--text-200]">Cargando variación...</p>;
    }

    if (!variacion) {
        return <p className="text-[--text-200]">No se encontró la variación</p>;
    }

    return (
        <div className="space-y-6 text-[--text-200]">
            {/* Header con título y número */}
            <div className="text-center border-b border-[--bg-300] pb-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm opacity-75">Bingo Oasis</div>
                    <div className="text-lg font-bold">VARIACIÓN DE CAJA</div>
                    <div className="text-sm font-mono text-[--primary-300]">N° {variacion?.id_variacion || '000000'} </div>
                </div>
                <RiPrinterLine className="text-[--primary-300]" onClick={() => { onClickPrinter() }} size={20} />
            </div>
            {/* Información principal en 3 columnas */}
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                    <div className="font-semibold mb-2 text-[--text-100]">FECHA</div>
                    <div className="border-b border-dotted border-[--primary-200] pb-1 min-h-[24px]">
                        {variacion?.fecha ? new Date(variacion.fecha).toLocaleDateString('es-AR') : '..../...../.....'}
                    </div>
                </div>

                <div className="text-center">
                    <div className="font-semibold mb-2 text-[--text-100]">TURNO</div>
                    <div className="border-b uppercase border-dotted border-[--primary-200] pb-1 min-h-[24px]">
                        {variacion?.turno || '........................'}
                    </div>
                </div>

                <div className="text-center">
                    <div className="font-semibold mb-2 text-[--text-100]">SECTOR</div>
                    <div className="border-b border-dotted border-[--primary-200] pb-1 min-h-[24px]">
                        {variacion.sector || '........................'}
                    </div>
                </div>
            </div>
            {/* Nombre del empleado */}
            <div className="mb-6">
                <div className="font-semibold mb-2 text-[--text-100]">NOMBRE DEL EMPLEADO</div>
                <div className="border-b border-dotted border-[--primary-200] pb-1 min-h-[24px]">
                    {modalData.data.nombre_empleado || '...................................................................'}
                </div>
            </div>
            {/* Sección de variación con checkboxes y monto */}
            <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                    <div className="font-semibold mb-4 text-[--text-100]">
                        VARIACIÓN
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={modalData?.data?.faltante > 0}
                                    readOnly
                                    className="sr-only"
                                />
                                <div
                                    className={`w-5 h-5 border-2 border-[--primary-200] ${modalData?.data?.faltante > 0
                                        ? "bg-[--primary-100] border-[--primary-200]"
                                        : "bg-transparent"
                                        }`}
                                >
                                    {modalData?.data?.faltante > 0 && (
                                        <div className="w-full h-full flex items-center justify-center text-white text-xs">
                                            ✓
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className="font-medium">FALTANTE</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={modalData?.data?.sobrante > 0}
                                    readOnly
                                    className="sr-only"
                                />
                                <div
                                    className={`w-5 h-5 border-2 border-[--primary-200] ${modalData?.data?.sobrante > 0
                                        ? "bg-[--primary-100] border-[--primary-200]"
                                        : "bg-transparent"
                                        }`}
                                >
                                    {modalData?.data?.sobrante > 0 && (
                                        <div className="w-full h-full flex items-center justify-center text-white text-xs">
                                            ✓
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className="font-medium">SOBRANTE</span>
                        </label>
                    </div>
                </div>
                {/* Monto */}
                <div>
                    <div className="h-16 border-2 border-[--primary-200] bg-[--bg-300] flex items-center justify-center">
                        <span className={`text-2xl font-bold ${modalData.data.sobrante > 0 ? 'text-[--primary-300]' : 'text-[--accent-100]'}`}>
                            ${variacion?.monto ? Math.abs(variacion.monto).toLocaleString('es-AR') : '0'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Firmas */}
            <div className="grid grid-cols-2 gap-8 mb-6">
                <div className="text-center">
                    <div className="border-b border-dotted border-[--primary-200] pb-1 mb-2 min-h-[40px] flex items-end justify-center">
                        {variacion?.firma_empleado && variacion.firma_empleado !== 'firma_digital_' + modalData.data.empleado + '.png'
                            ? variacion.firma_empleado
                            : '................................'
                        }
                    </div>
                    <div className="font-semibold text-[--text-100]">FIRMA DEL EMPLEADO</div>
                </div>

                <div className="text-center">
                    <div className="border-b border-dotted border-[--primary-200] pb-1 mb-2 min-h-[40px] flex items-end justify-center">
                        {'................................'}
                    </div>
                    <div className="font-semibold text-[--text-100]">FIRMA DEL RESPONSABLE</div>
                </div>
            </div>

            {/* Legajos */}
            <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                    <div className="border-b border-dotted border-[--primary-200] pb-1 mb-2 min-h-[24px]">
                        {modalData.data.empleado || '........................'}
                    </div>
                    <div className="font-semibold text-[--text-100]">LEGAJO</div>
                </div>

                <div className="text-center">
                    <div className="border-b border-dotted border-[--primary-200] pb-1 mb-2 min-h-[24px]">
                        {modalData.data.legajo_usuario || '........................'}
                    </div>
                    <div className="font-semibold text-[--text-100]">LEGAJO</div>
                </div>
            </div>
        </div>

    );
};

