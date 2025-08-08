import type { ModalData } from "../../../types"

interface props {
    modalData: ModalData | null
}
export const ModalVariacion: React.FC<props> = ({ modalData }) => {
    if (!modalData || !modalData.data) return null
    const { data } = modalData;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Usuario</label>
                    <p className="mt-1 text-sm text-gray-900">{data.usuario}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                    <p className="mt-1 text-sm text-gray-900">{data.fecha}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Empleado</label>
                    <p className="mt-1 text-sm text-gray-900">{data.empleado}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Legajo</label>
                    <p className="mt-1 text-sm text-gray-900">{data.legajo}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">N° Variación</label>
                    <p className="mt-1 text-sm text-gray-900">{data.numeroVariacion}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo Variación</label>
                    <p className="mt-1 text-sm text-gray-900">{data.tipoVariacion}</p>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Detalle</label>
                <p className="mt-1 text-sm text-gray-900">{data.detalle}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Faltante</label>
                    <p className="mt-1 text-sm text-red-600">
                        {data.faltante ? `$${data.faltante.toLocaleString()}` : "-"}
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sobrante</label>
                    <p className="mt-1 text-sm text-green-600">
                        {data.sobrante ? `$${data.sobrante.toLocaleString()}` : "-"}
                    </p>
                </div>
            </div>
        </div>
    )
}

