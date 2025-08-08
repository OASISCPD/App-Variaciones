import type React from "react"
import type { ModalData } from "../../../types"

interface props {
    modalData: ModalData | null
}
export const ModalVale: React.FC<props> = ({ modalData }) => {

    if (!modalData || !modalData.data) return null

    const { data } = modalData;
    return (
        <div className="space-y-6">
            <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-gray-900">VARIACIÓN DE CAJA</h4>
                    <p className="text-sm text-gray-600">N° 024798</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">FECHA</label>
                        <div className="border-b border-gray-400 pb-1">
                            <span className="text-sm">{data.fecha.split(" ")[0]}</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">TURNO</label>
                        <div className="border-b border-gray-400 pb-1">
                            <span className="text-sm">Mañana</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">SECTOR</label>
                        <div className="border-b border-gray-400 pb-1">
                            <span className="text-sm">{data.tipoVariacion}</span>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-xs font-medium text-gray-700 mb-2">NOMBRE DEL EMPLEADO</label>
                    <div className="border-b border-gray-400 pb-1">
                        <span className="text-sm">{data.empleado}</span>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-xs font-medium text-gray-700 mb-2">VARIACIÓN</label>
                    <div className="flex space-x-6">
                        <div className="flex items-center">
                            <input type="checkbox" checked={data.faltante !== null} readOnly className="mr-2" />
                            <span className="text-sm">FALTANTE</span>
                            <input
                                type="checkbox"
                                checked={data.sobrante !== null}
                                readOnly
                                className="ml-4 mr-2"
                            />
                            <span className="text-sm">SOBRANTE</span>
                        </div>
                    </div>
                    <div className="mt-2 text-sm">
                        <span className="font-medium">Monto: </span>
                        <span className={data.faltante ? "text-red-600" : "text-green-600"}>
                            ${(data.faltante || data.sobrante || 0).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-8">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">FIRMA DEL EMPLEADO</label>
                        <div className="border-b border-gray-400 h-8"></div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">FIRMA DEL RESPONSABLE</label>
                        <div className="border-b border-gray-400 h-8"></div>
                    </div>
                </div>
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-6 bg-blue-50">
                <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-gray-900">VALE</h4>
                    <p className="text-xs text-gray-600">Vale niños - 20.000 unidades hoja simple</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">FECHA:</label>
                        <div className="border-b border-gray-400 pb-1">
                            <span className="text-sm">{data.fecha.split(" ")[0]}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">EMPLEADO:</label>
                        <div className="border-b border-gray-400 pb-1">
                            <span className="text-sm">{data.empleado}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">MONTO:</label>
                        <div className="border-b border-gray-400 pb-1">
                            <span className="text-sm font-semibold">
                                ${(data.faltante || data.sobrante || 0).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">CONCEPTO:</label>
                        <div className="border-b border-gray-400 pb-1">
                            <span className="text-sm">{data.detalle}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">FIRMA</label>
                            <div className="border-b border-gray-400 h-6"></div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">ACLARACIÓN</label>
                            <div className="border-b border-gray-400 h-6"></div>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-gray-500 mt-4 text-center">Dimensiones: 13 CM x 6 CM</div>
            </div>
        </div>
    )
}