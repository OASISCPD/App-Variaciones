import type { ModalType, ValeDTO } from "../../../types";
import type { FC } from "react";
import { MdFilterAlt } from "react-icons/md";
import { Filters } from "./Filters";
import { formateDateTime, getStatusBadge } from "../../../utils";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { ButtonFilter } from "../../../shared/UI/ButtonFilter";

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


    return (
        <div className="bg-[--bg-100] rounded-lg shadow">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-[--text-100]">Listado de Vales <span className="text-[--primary-300]"> ({vales.length})</span></h2>
                    <div className="flex space-x-2">

                        <button onClick={() => openModal('agregar_vale', null)} className="px-4 py-2  text-[--text-100] bg-[--primary-100] hover:bg-[--primary-200] transition-all rounded ]">
                            + Agregar Vale
                        </button>
                    </div>
                </div>
                {/* Filters */}
                <Filters fechaDesde={fechaDesde} fechaHasta={fechaHasta} isSelect={false} legajo={legajo} setFechaDesde={setFechaDesde} setFechaHasta={setFechaHasta} setLegajo={setLegajo} />
                {/* FILTROS  */}
                <ButtonFilter onReset={reset} onClick={() => reFetch()} />
                {/* TABLE */}
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-md">
                    <table className="min-w-full divide-y divide-[--bg-300]">
                        <thead className="bg-[--primary-100]">
                            <tr>
                                {[
                                    "id", "Legajo", "fecha",
                                    "firma del empleado", "importe", "Turno", "usuario", "Acciones"
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
                            {loading ? Array.from({ length: 5 }).map((_, idx) => (
                                <tr key={idx} className="animate-pulse">
                                    {Array.from({ length: 8 }).map((__, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className="px-4 py-4 whitespace-nowrap"
                                        >
                                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                                        </td>
                                    ))}
                                </tr>
                            )) : vales.map((item) => (
                                <tr key={item.id} className="hover:bg-[--bg-200]">
                                    <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                        {item.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                        {item.empleado}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                        {formateDateTime(item.fecha)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2 justify-center">
                                            <button
                                                onClick={() => openModal("firma", item)}
                                                className="text-blue-600 hover:text-blue-200"
                                            >
                                                <HiOutlinePencilAlt size={20} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                        {item.importe}
                                    </td>
                                    <td
                                        title={item.turno}
                                        className="px-6 py-4 whitespace-nowrap text-[--text-200]"
                                    >
                                        {getStatusBadge(item.turno)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                        {item.usuario_nombre}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openModal("vale", item)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <FaEye size={20} />
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
            </div>
        </div>

    )
}