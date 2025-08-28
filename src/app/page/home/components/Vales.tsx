import type { ModalType, ValeDTO } from "../../../types";
import type { FC } from "react";
import { Filters } from "./Filters";
import { formatCurrency, formateDateTime, getTurnoBadge } from "../../../utils";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ButtonFilter } from "../../../shared/UI/ButtonFilter";
import { TiDocumentText } from "react-icons/ti";
import { ArchivoFirmadoCard } from "./ArchivoFirmadoCard";
import { SignatureComponentV2 } from "./SignatureComponentV2";
import { toast } from "react-toastify";
import { API_URL } from "../../../service/connection";

interface props {
    fechaDesde: string;
    setFechaDesde: (string: string) => void
    fechaHasta: string;
    setFechaHasta: (string: string) => void
    legajo: string
    setLegajo: (string: string) => void
    vales: ValeDTO[]
    openModal: (type: ModalType, data: ValeDTO | null) => void
    reFetch: () => void
    reset: () => void
    loading: boolean
}

export const ValesModule: FC<props> = ({ fechaDesde, fechaHasta, legajo, loading, openModal, reFetch, setFechaDesde, setFechaHasta, setLegajo, vales, reset }) => {


    const updateFirma = async (id_firma: string, id: number) => {
        console.log("Firmaaaaa --->", id_firma)
        try {
            const res = await fetch(`${API_URL}/vales/${id}`, {
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
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-[--text-100]">Listado de Vales <span className="text-[--primary-300]"> ({vales.length})</span></h2>
                    <div className="flex space-x-2">
                        <button onClick={() => openModal('agregar_vale', null)} className="px-4 py-2 text-[--text-100] bg-[--primary-100] hover:bg-[--primary-200] transition-all rounded">
                            + Agregar Vale
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <Filters fechaDesde={fechaDesde} fechaHasta={fechaHasta} isSelect={false} legajo={legajo} setFechaDesde={setFechaDesde} setFechaHasta={setFechaHasta} setLegajo={setLegajo} />

                {/* Filter Button */}
                <ButtonFilter onReset={reset} onClick={() => reFetch()} />

                {loading ? (
                    // Loading states
                    <div className="space-y-4">
                        {/* Mobile Loading Cards */}
                        <div className="lg:hidden">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx} className="bg-[--bg-200] rounded-lg p-4 animate-pulse mb-4">
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Loading Table */}
                        <div className="hidden lg:block overflow-x-auto max-h-[500px] overflow-y-auto rounded-md">
                            <table className="min-w-full divide-y divide-[--bg-300]">
                                <thead className="bg-[--primary-100]">
                                    <tr>
                                        {["ID", "Legajo", "Fecha", "Importe", "Turno", "Usuario", "Firma del empleado", "Acciones"].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-[--text-200] uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-[--bg-100] divide-y divide-[--bg-300]">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <tr key={idx} className="animate-pulse">
                                            {Array.from({ length: 8 }).map((__, colIdx) => (
                                                <td key={colIdx} className="px-4 py-4 whitespace-nowrap">
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
                        {/* Mobile Cards View - Versión mejorada */}
                        <div className="lg:hidden space-y-4 max-h-[500px] overflow-y-auto">
                            {vales.map((item) => (
                                <div key={item.id} className="bg-[--bg-200] rounded-lg p-4 border border-[--bg-300] shadow-md hover:shadow-lg transition-shadow duration-200">
                                    {/* Header principal con ID y fecha */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl font-bold text-[--primary-300]">
                                                    #{item.id}
                                                </span>
                                                <div className="h-6 w-px bg-[--bg-300]"></div>
                                                <span className="text-sm text-[--text-100]">
                                                    {formateDateTime(item.fecha)}
                                                </span>
                                            </div>

                                            {/* Badge de estado */}
                                            {!item.firma_empleado || item.firma_empleado === "" ? (
                                                <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                                                    Pendiente
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                                    Completo
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Info del empleado en una línea */}
                                    <div className="mb-4 p-3 bg-[--bg-100] rounded-md">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-[--text-200] truncate">
                                                    {item.usuario_nombre}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-xs text-[--text-100]">
                                                        Legajo: <span className="font-medium">{item.empleado}</span>
                                                    </span>
                                                    <span className="text-xs text-[--text-100]">
                                                        Turno: <span className="font-medium capitalize">{item.turno}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Importe centrado y destacado */}
                                    <div className="mb-4 text-center">
                                        <p className="text-xs text-[--text-100] uppercase tracking-wide mb-1">Importe</p>
                                        <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
                                            <span className="text-2xl font-bold text-green-700">
                                                {formatCurrency(item.importe)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Acciones y firma en dos secciones separadas */}
                                    <div className="space-y-3">
                                        {/* Archivo Firmado */}
                                        <div className="mt-2">
                                            <span className="block text-xs text-[--text-100] uppercase mb-1">Archivo firmado</span>
                                            {item.firma_empleado ? (
                                                <ArchivoFirmadoCard type="vales"
                                                    id={item.id}
                                                    url={item.firma_empleado}
                                                    fechaSubida={item.created_at}
                                                    onDelete={() => reset()}
                                                />
                                            ) : (
                                                <SignatureComponentV2
                                                    onSuccess={(id_firma: string) => updateFirma(id_firma, item.id)}
                                                />
                                            )}
                                        </div>

                                        {/* Botones de acción principales */}
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => openModal("vale", item)}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-green-100 text-green-700 hover:bg-green-200 rounded-md transition-colors text-sm font-medium"
                                                title="Ver vale"
                                            >
                                                <TiDocumentText size={16} />
                                                Ver
                                            </button>
                                            <button
                                                onClick={() => openModal("editar_vale", item)}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-md transition-colors text-sm font-medium"
                                                title="Editar"
                                            >
                                                <FaEdit size={14} />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => openModal("eliminar_vale", item)}
                                                className="flex items-center justify-center p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
                                                title="Eliminar"
                                            >
                                                <FaTrash size={14} />
                                            </button>
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
                                        {["ID", "Legajo", "Fecha", "Importe", "Turno", "Usuario", "Firma del empleado", "Acciones"].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-[--text-200] uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-[--bg-100] divide-y divide-[--bg-300]">
                                    {vales.map((item) => (
                                        <tr key={item.id} className="hover:bg-[--bg-200]">
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{item.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{item.empleado}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{formateDateTime(item.fecha)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{formatCurrency(item.importe)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getTurnoBadge(item.turno)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">{item.usuario_nombre}</td>
                                            {/*      <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2 justify-center">
                                                    <button
                                                        onClick={() => openModal("firma", item)}
                                                        className={`${!item.firma_empleado || item.firma_empleado === ""
                                                            ? "text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100"
                                                            : "text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100"
                                                            } p-0.5 rounded-md transition-all duration-200`}
                                                        title={!item.firma_empleado || item.firma_empleado === "" ? "Agregar firma" : "Editar firma"}
                                                    >
                                                        {!item.firma_empleado || item.firma_empleado === "" ? (
                                                            <HiOutlinePlus size={20} />
                                                        ) : (
                                                            <HiOutlinePencilAlt size={20} />
                                                        )}
                                                    </button>
                                                    {!item.firma_empleado || item.firma_empleado === "" && (
                                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                                                            Pendiente
                                                        </span>
                                                    )}
                                                </div>
                                            </td> */}
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                                {item.firma_empleado ? (
                                                    <ArchivoFirmadoCard type="vales" id={item.id} onDelete={() => reset()} url={item.firma_empleado} fechaSubida={item.created_at} />
                                                ) : (
                                                    // Si NO existe, muestra el botón para agregar/subir archivo
                                                    <SignatureComponentV2 onSuccess={(id_firma: string) => updateFirma(id_firma, item.id)} />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openModal("vale", item)}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        <TiDocumentText size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => openModal("editar_vale", item)}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                    >
                                                        <FaEdit size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => openModal("eliminar_vale", item)}
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
                    </>
                )}
            </div>
        </div>
    )
}