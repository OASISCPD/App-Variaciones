import { BiDownload } from "react-icons/bi";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import type { CajaDTO, ModalType } from "../../../types";
import { formatCurrency, formateDateTime, getStatusBadge, getTipoVariacionBadge } from "../../../utils";
import { getEstadoNombre } from "../../../utils/statusMapper";
import { TiDocumentText } from "react-icons/ti";
import { Filters } from "./Filters";
import { ButtonFilter } from "../../../shared/UI/ButtonFilter";
import { SignatureComponentV2 } from "./SignatureComponentV2";
import { ArchivoFirmadoCard } from "./ArchivoFirmadoCard";
import { TotalesCards } from "./TotalesCards";
import { toast } from "react-toastify";
import { API_URL } from "../../../service/connection";

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

    const updateFirma = async (id_firma: string, id: number) => {
        console.log("Firmaaaaa --->", id_firma)
        try {
            const res = await fetch(`${API_URL}/variaciones/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firma_empleado: id_firma }) // o firma_empleado: null según tu backend
            });

            if (!res.ok) throw new Error("Error al actualizar firma");

            toast.success("Firma actualizada con éxito");
            reset();
        } catch (error) {
            toast.error("No se pudo actualizar la firma");
            console.error(error);
        }
    }
    return (
        <div className="bg-[--bg-100] rounded-lg shadow">
            <div className="p-6">
                {/* Header existente */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-[--text-100]">Listado de Variaciones <span className="text-[--primary-300]"> ({cajas.length})</span></h2>
                    <div className="flex space-x-2">
                        <button onClick={() => openModal('agregar', null)} className="px-4 py-2 text-[--text-100] bg-[--primary-100] hover:bg-[--primary-200] transition-all rounded">
                            + Agregar Variación
                        </button>
                    </div>
                </div>

                {/* Cards de totales */}
                <TotalesCards cajas={cajas} loading={loading} />

                {/* Filters existente */}
                <Filters fechaDesde={fechaDesde} isSelect={true} fechaHasta={fechaHasta} legajo={legajo} setFechaDesde={setFechaDesde} setFechaHasta={setFechaHasta} setLegajo={setLegajo} optionSelect={optionSelect} optionSelected={optionSelected} />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                    <div className="flex-1">
                        <ButtonFilter onReset={reset} onClick={reFetch} />
                    </div>
                    <div className="flex justify-end -mt-4">
                        <button
                            onClick={() => alert('Descargando excel....')}
                            className="flex items-center justify-center gap-2 px-4 py-2 font-medium text-[var(--primary-300)] bg-[var(--bg-200)] border border-[var(--primary-200)] hover:border-[var(--primary-300)] hover:bg-[var(--bg-300)] rounded transition-all duration-200 w-full sm:w-auto"
                        >
                            <BiDownload className="text-lg flex-shrink-0" />
                            <span className="whitespace-nowrap">Exportar a Excel</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    // Loading state
                    <div className="space-y-4">
                        {/* Mobile Loading Cards */}
                        <div className="sm:hidden">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx} className="bg-[--bg-200] rounded-lg p-4 animate-pulse mb-4">
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Loading Table */}
                        <div className="hidden sm:block overflow-x-auto max-h-[500px] overflow-y-auto rounded-md">
                            <table className="min-w-full divide-y divide-[--bg-300]">
                                <thead className="bg-[--primary-100]">
                                    <tr>
                                        {["Id", "Usuario", "Fecha", "Empleado", "Legajo", "Detalle", "N° Variación", "Tipo Variación", "Faltante", "Sobrante", "Estado", "Archivo Firmado", "Acciones"].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-[--text-200] uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-[--bg-100] divide-y divide-[--bg-300]">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <tr key={idx} className="animate-pulse">
                                            {Array.from({ length: 13 }).map((__, colIdx) => (
                                                <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                                                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Mobile Cards View */}
                        <div className="lg:hidden space-y-4 max-h-[500px] overflow-y-auto">
                            {cajas.map((item) => (
                                <div key={item.id} className="bg-[--bg-200] rounded-lg p-4 border border-[--bg-300] shadow-sm">
                                    {/* Header de la card con ID y acciones */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-[--primary-300]">
                                                #{item.id}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-[--primary-100] text-white rounded-full">
                                                {item.num_variacion}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openModal("ticket_variacion", item)}
                                                className="text-green-600 hover:text-green-900 p-1"
                                            >
                                                <TiDocumentText size={16} />
                                            </button>
                                            <button
                                                onClick={() => openModal("variacion", item)}
                                                className="text-blue-600 hover:text-blue-900 p-1"
                                            >
                                                <FaEye size={16} />
                                            </button>
                                            <button
                                                onClick={() => openModal("editar", item)}
                                                className="text-yellow-600 hover:text-yellow-900 p-1"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => openModal("eliminar", item)}
                                                className="text-red-600 hover:text-red-900 p-1"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Información principal */}
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div>
                                            <span className="text-xs text-[--text-100] uppercase">Empleado</span>
                                            <p className="text-xs font-medium text-[--text-200]">{item.nombre_empleado}</p>
                                            <p className="text-xs text-[--text-100]">Legajo: {item.empleado}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-[--text-100] uppercase">Fecha</span>
                                            <p className="text-xs text-[--text-200]">{formateDateTime(item.fecha)}</p>
                                            <p className="text-xs text-[--text-100]">Por: {item.usuario}</p>
                                        </div>
                                    </div>

                                    {/* Tipo y Detalle */}
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            {getTipoVariacionBadge(item.tipo_variacion)}
                                            {getStatusBadge(item.detalle)}
                                        </div>
                                    </div>

                                    {/* Montos */}
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div>
                                            <span className="text-xs text-red-600 uppercase">Faltante</span>
                                            <p className="text-lg font-bold text-red-600">
                                                {item.faltante ? formatCurrency(item.faltante) : "-"}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-green-600 uppercase">Sobrante</span>
                                            <p className="text-lg font-bold text-green-600">
                                                {item.sobrante ? formatCurrency(item.sobrante) : "-"}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Archivo Firmado */}
                                    <div className="mt-2">
                                        <span className="block text-xs text-[--text-100] uppercase mb-1">Archivo firmado</span>
                                        {item.variacion_firma_empleado ? (
                                            <ArchivoFirmadoCard type="variaciones"
                                                id={item.variacion_id}
                                                url={item.variacion_firma_empleado}
                                                fechaSubida={item.variacion_created_at}
                                                onDelete={() => reset()}
                                            />
                                        ) : (
                                            <SignatureComponentV2
                                                onSuccess={(id_firma: string) => updateFirma(id_firma, item.variacion_id)}
                                            />
                                        )}
                                    </div>
                                    {/* Estado */}
                                    <div className="pt-3 border-t border-[--bg-300]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-[--text-100] uppercase">Estado</span>
                                            <span className="text-sm font-medium text-[--text-200]">
                                                {getEstadoNombre(item.estado)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto max-h-[500px] overflow-y-auto rounded-md">
                            <table className="min-w-full divide-y divide-[--bg-300]">
                                <thead className="bg-[--primary-100]">
                                    <tr>
                                        {["Id", "Usuario", "Fecha", "Empleado", "Legajo", "Detalle", "N° Variación", "Tipo Variación", "Faltante", "Sobrante", "Estado", "Archivo Firmado", "Acciones"].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-[--text-200] uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-[--bg-100] divide-y divide-[--bg-300]">
                                    {cajas.map((item) => (
                                        <tr key={item.id} className="hover:bg-[--bg-200]">
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{item.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{item.usuario}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{formateDateTime(item.fecha)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{item.nombre_empleado}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{item.empleado}</td>
                                            <td title={item.detalle} className="px-6 py-4 whitespace-nowrap uppercase max-w-[300px] truncate">
                                                {getStatusBadge(item.detalle)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{item.num_variacion}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{getTipoVariacionBadge(item.tipo_variacion)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-red-600">{item.faltante ? formatCurrency(item.faltante) : "-"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-green-600">{item.sobrante ? formatCurrency(item.sobrante) : "-"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{getEstadoNombre(item.estado)}</td>
                                            {/* PARTE DEL VALE FIRMADO */}
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                                {item.variacion_firma_empleado ? (
                                                    <ArchivoFirmadoCard type="variaciones" id={item.variacion_id} onDelete={() => reset()} url={item.variacion_firma_empleado} fechaSubida={item.variacion_created_at} />
                                                ) : (
                                                    // Si NO existe, muestra el botón para agregar/subir archivo
                                                    <SignatureComponentV2 onSuccess={(id_firma: string) => updateFirma(id_firma, item.variacion_id)} />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                                <div className="flex space-x-2">
                                                    <button onClick={() => openModal("ticket_variacion", item)} className="text-green-600 hover:text-green-900">
                                                        <FaEye size={20} />
                                                    </button>
                                                    <button onClick={() => openModal("editar", item)} className="text-yellow-600 hover:text-yellow-900">
                                                        <FaEdit size={20} />
                                                    </button>
                                                    <button onClick={() => openModal("eliminar", item)} className="text-red-600 hover:text-red-900">
                                                        <FaTrash size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}