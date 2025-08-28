import type React from "react"
import type { ModalDataVale } from "../../../types"
import { RiPrinterLine } from "react-icons/ri"

interface props {
    modalData: ModalDataVale | null
}

export const ModalVale: React.FC<props> = ({ modalData }) => {

    if (!modalData || !modalData.data) return null

    const { data } = modalData;
    console.log(data);

    // Formatear fecha
    const fechaFormateada = data.fecha ? new Date(data.fecha).toLocaleDateString('es-AR') : '..../...../.....';

    const onClickPrinter = () => {
        window.open(`/print-vale/${modalData.data?.id}`)
    }

    return (
        <div className="space-y-6 text-[--text-200]">
            {/* Header con título y número */}
            <div className="text-center border-b border-[--bg-300] pb-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm opacity-75">Bingo Oasis</div>
                    <div className="text-lg font-bold">VALE</div>
                    <div className="text-sm font-mono text-[--primary-300]">N° {data.id || '000000'}</div>
                </div>
                <RiPrinterLine
                    className="text-[--primary-300] cursor-pointer hover:text-[--primary-200] transition-colors"
                    onClick={onClickPrinter}
                    size={20}
                />
            </div>

            {/* Información principal en 3 columnas */}
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                    <div className="font-semibold mb-2 text-[--text-100]">FECHA</div>
                    <div className="border-b border-dotted border-[--primary-200] pb-1 min-h-[24px]">
                        {fechaFormateada}
                    </div>
                </div>

                <div className="text-center">
                    <div className="font-semibold mb-2 text-[--text-100]">TURNO</div>
                    <div className="border-b border-dotted uppercase border-[--primary-200] pb-1 min-h-[24px]">
                        {data.turno ? data.turno : '...'}
                    </div>
                </div>

                <div className="text-center">
                    <div className="font-semibold mb-2 text-[--text-100]">LEGAJO</div>
                    <div className="border-b border-dotted border-[--primary-200] pb-1 min-h-[24px]">
                        {data.empleado || '........................'}
                    </div>
                </div>
            </div>

            {/* Nombre del empleado */}
            <div className="mb-6">
                <div className="font-semibold mb-2 text-[--text-100]">NOMBRE DEL EMPLEADO</div>
                <div className="border-b border-dotted border-[--primary-200] pb-1 min-h-[24px]">
                    {data.nombre_empleado || '...................................................................'}
                </div>
            </div>

            {/* Monto destacado */}
            <div className="mb-6">
                <div className="font-semibold mb-4 text-[--text-100] text-center">
                    IMPORTE
                </div>
                <div className="flex justify-center">
                    <div className="h-20 w-48 border-2 border-[--primary-200] bg-[--bg-300] flex items-center justify-center rounded">
                        <span className="text-3xl font-bold text-[--primary-300]">
                            ${data.importe ? Number(data.importe).toLocaleString('es-AR', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2
                            }) : '0'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Concepto/Detalle */}
            {/*     <div className="mb-6">
                <div className="font-semibold mb-2 text-[--text-100]">CONCEPTO</div>
                <div className="border border-[--primary-200] bg-[--bg-200] p-3 rounded min-h-[60px]">
                    <span className="text-sm">
                        {data.concepto || data.detalle || 'Vale por diferencia de caja'}
                    </span>
                </div>
            </div> */}

            {/* Firmas */}
            <div className="grid grid-cols-2 gap-8 mb-6">
                <div className="text-center">
                    <div className="border-b border-dotted border-[--primary-200] pb-1 mb-2 min-h-[40px] flex items-end justify-center">
                        {'................................'}
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
            <div className="grid grid-cols-1 gap-4 mb-6">

                <div className="text-center w-full ml-auto">
                    <div className="border-b border-dotted border-[--primary-200] pb-1 mb-2 min-h-[40px] flex items-end justify-center">
                        {data.legajo_usuario ?? '................................'}
                    </div>
                    <div className="font-semibold text-[--text-100]">LEGAJO DEL RESPONSABLE</div>
                </div>
            </div>

            {/* Nota pie de página */}
            <div className="text-xs text-center text-[--text-300]">
                Este vale es válido únicamente con la firma del empleado y del responsable.
            </div>
        </div>
    )
}