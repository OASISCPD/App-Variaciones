import { BiDownload } from "react-icons/bi";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import type { CajaDTO, ModalType } from "../../../types";
import { formateDateTime, getStatusBadge, getTipoVariacionBadge } from "../../../utils";
import { MdFilterAlt } from "react-icons/md";
import { getEstadoNombre } from "../../../utils/statusMapper";
import { TiDocumentText } from "react-icons/ti";
import { Filters } from "./Filters";
import { ButtonFilter } from "../../../shared/UI/ButtonFilter";

interface props {
    fechaDesde: string;
    setFechaDesde: (string: string) => void
    fechaHasta: string;
    setFechaHasta: (string: string) => void
    legajo: string
    setLegajo: (string: string) => void
    cajas: CajaDTO[]
    openModal: (type: ModalType, data: CajaDTO | null) => void
    optionSelected: (value: string) => void
    optionSelect: string
    reFetch: () => void
    loading: boolean
    reset: () => void
}


export const VariacionesModule: React.FC<props> = ({ reset, fechaDesde, setFechaDesde, fechaHasta, setFechaHasta, legajo, setLegajo, cajas, openModal, reFetch, loading, optionSelect, optionSelected }) => {
    return (
        <div className="bg-[--bg-100] rounded-lg shadow">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-[--text-100]">Listado de Variaciones <span className="text-[--primary-300]"> ({cajas.length})</span></h2>
                    <div className="flex space-x-2">
                        <button onClick={() => openModal('agregar', null)} className="px-4 py-2  text-[--text-100] bg-[--primary-100] hover:bg-[--primary-200] transition-all rounded ]">
                            + Agregar Variación
                        </button>
                    </div>
                </div>
                {/* Filters */}
                <Filters fechaDesde={fechaDesde} isSelect={true} fechaHasta={fechaHasta} legajo={legajo} setFechaDesde={setFechaDesde} setFechaHasta={setFechaHasta} setLegajo={setLegajo} optionSelect={optionSelect} optionSelected={optionSelected} />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                    {/* Grupo de botones de filtros */}
                    <div className="flex-1">
                        <ButtonFilter onReset={reset} onClick={reFetch} />
                    </div>
                    {/* Botón de exportar */}
                    <div className="flex justify-end -mt-4">
                        <button
                            onClick={() => alert('Descargando excel....')}
                            className="flex items-center justify-center gap-2 px-4 py-2 font-medium text-[var(--primary-300)] bg-[var(--bg-200)] border border-[var(--primary-200)] hover:border-[var(--primary-300)] hover:bg-[var(--bg-300)] rounded-md transition-all duration-200 w-full sm:w-auto"
                        >
                            <BiDownload className="text-lg flex-shrink-0" />
                            <span className="whitespace-nowrap">Exportar a Excel</span>
                        </button>
                    </div>
                </div>
                {/* Table */}
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-md">
                    <table className="min-w-full divide-y divide-[--bg-300]">
                        <thead className="bg-[--primary-100]">
                            <tr>
                                {[
                                    "Id", "Usuario", "Fecha", "Empleado", "Legajo", "Detalle",
                                    "N° Variación", "Tipo Variación", "Faltante", "Estado", "Sobrante", "Acciones"
                                ].map((header) => (
                                    <th
                                        key={header}
                                        className="px-6 py-3 text-left text-xs font-medium text-[--text-200] uppercase tracking-wider"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-[--bg-100] divide-y divide-[--bg-300]">
                            {loading
                                ? Array.from({ length: 5 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse">
                                        {Array.from({ length: 12 }).map((__, colIdx) => (
                                            <td
                                                key={colIdx}
                                                className="px-6 py-4 whitespace-nowrap"
                                            >
                                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))
                                : cajas.map((item) => (
                                    <tr key={item.id} className="hover:bg-[--bg-200]">
                                        <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                            {item.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                            {item.usuario}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                            {formateDateTime(item.fecha)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                            {item.nombre_empleado}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                            {item.empleado}
                                        </td>
                                        <td
                                            title={item.detalle}
                                            className="px-6 py-4 whitespace-nowrap uppercase max-w-[300px] truncate"
                                        >
                                            {getStatusBadge(item.detalle)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                            {item.num_variacion}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                            {getTipoVariacionBadge(item.tipo_variacion)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-red-600">
                                            {item.faltante ? item.faltante.toLocaleString() : "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                            {getEstadoNombre(item.estado)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-green-600">
                                            {item.sobrante ? item.sobrante.toLocaleString() : "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openModal("ticket_variacion", item)}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    <TiDocumentText size={20} />
                                                </button>
                                                <button
                                                    onClick={() => openModal("variacion", item)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <FaEye size={20} />
                                                </button>
                                                <button
                                                    onClick={() => openModal("editar", item)}
                                                    className="text-yellow-600 hover:text-yellow-900"
                                                >
                                                    <FaEdit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => openModal("eliminar", item)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <FaTrash size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}