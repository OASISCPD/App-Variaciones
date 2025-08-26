import type { ModalData } from "../../../types"
import format from "date-fns/format"
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
                    <label className="block text-sm font-medium text-[--text-200]">Usuario</label>
                    <p className="mt-1 text-sm text-[--text-100]">{data.usuario}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[--text-200]">Fecha</label>
                    <p className="mt-1 text-sm text-[--text-100]">{data.fecha ? format(new Date(data.fecha), 'dd/MM/yyyy HH:mm:ss') : 'Sin fecha'}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[--text-200]">Empleado</label>
                    <p className="mt-1 text-sm text-[--text-100]">{data.nombre_empleado}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[--text-200]">Legajo</label>
                    <p className="mt-1 text-sm text-[--accent-200]">{data.empleado}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[--text-200]">N° Variación</label>
                    <p className="mt-1 text-sm text-[--text-100]">{data.num_variacion}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[--text-200]">Tipo Variación</label>
                    <p className="mt-1 text-sm text-[--text-100]">{data.tipo_variacion}</p>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-[--text-200]">Detalle</label>
                <p className="mt-1 text-sm text-[--text-100]">{data.detalle}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-[--text-200]">Faltante</label>
                    <p className="mt-1 text-sm text-[--accent-100]">
                        {data.faltante !== null && data.faltante !== undefined
                            ? `$${data.faltante.toLocaleString()}`
                            : "0"}
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[--text-200]">Sobrante</label>
                    <p className="mt-1 text-sm text-green-600">
                        {data.sobrante
                            ? `$${data.sobrante.toLocaleString()}`
                            : "0"}
                    </p>
                </div>
            </div>
        </div>
    )
}

