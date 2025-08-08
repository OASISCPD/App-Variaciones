import { BiDownload } from "react-icons/bi";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import type { CajaDTO, ModalType, Variacion } from "../../../types";
import { getStatusBadge, getTipoVariacionBadge } from "../../../utils";
import { MdFilterAlt } from "react-icons/md";

interface props {
    fechaDesde: string;
    setFechaDesde: (string: string) => void
    fechaHasta: string;
    setFechaHasta: (string: string) => void
    legajo: string
    setLegajo: (string: string) => void
    cajas: CajaDTO[]
    openModal: (type: ModalType, data: Variacion | null) => void
}

export const ListBox: React.FC<props> = ({ fechaDesde, setFechaDesde, fechaHasta, setFechaHasta, legajo, setLegajo, cajas, openModal }) => {
    return (
        <div className="bg-[--bg-100] rounded-lg shadow">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-[--text-100]">Listado de Variaciones</h2>
                    <div className="flex space-x-2">
                        {/*   <button onClick={() => openModal('agregar_usuario', null)} className="px-4 py-2  text-[--text-200] bg-[--bg-200] rounded hover:bg-[--bg-300]">
                            👤 Agregar Empleado
                        </button> */}
                        <button onClick={() => openModal('agregar', null)} className="px-4 py-2  text-[--text-100] bg-[--primary-100] hover:bg-[--primary-200] transition-all rounded ]">
                            + Agregar Variación
                        </button>
                    </div>
                </div>
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="block  font-medium text-[--text-200] mb-1">Fecha desde</label>
                        <input
                            type="date"
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                            className="w-full bg-[--bg-200] text-gray-400 px-3 py-2 border border-[--bg-300] rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-100]"
                        />
                    </div>
                    <div>
                        <label className="block  font-medium text-[--text-200] mb-1">Fecha hasta</label>
                        <input
                            type="date"
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                            className="w-full bg-[--bg-200] text-gray-400 px-3 py-2 border border-[--bg-300] rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-100]"
                        />
                    </div>
                    <div>
                        <label className="block  font-medium text-[--text-200] mb-1">Legajo</label>
                        <input
                            type="text"
                            value={legajo}
                            onChange={(e) => setLegajo(e.target.value)}
                            className="w-full bg-[--bg-200] text-gray-400 px-3 py-2 border border-[--bg-300] rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-100]"
                        />
                    </div>
                    <div>
                        <label className="block  font-medium text-[--text-200] mb-1">Elegir opción</label>
                        <select className="w-full bg-[--bg-200] text-gray-400 px-3 uppercase py-2 border border-[--bg-300] rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-100]">
                            <option value="">Elegir opción</option>
                            <option value="sobrante">Sobrante</option>
                            <option value="faltante">Faltante</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <button className="flex items-center px-3 py-2  text-[--text-200] bg-[--bg-200] rounded hover:bg-[--bg-300]">
                        <MdFilterAlt className="text-lg" /> Filtrar
                    </button>
                    <button onClick={() => alert('Descargando excel....')}
                        className="flex items-center gap-2 px-4 py-2  font-medium text-[--primary-300]  border border-[--primary-200] hover:border-[--primary-300] rounded-md  transition-all"
                    >
                        <BiDownload className="text-lg" />
                        <span className="hidden sm:inline">Exportar a Excel</span>
                    </button>

                </div>
                {/* Table */}
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="min-w-full divide-y divide-[--bg-300]">
                        <thead className="bg-[--primary-100]">
                            <tr>
                                {[
                                    "Usuario", "Fecha", "Empleado", "Legajo", "Detalle",
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
                        <tbody className="bg-[--bg-100] divide-y divide-[--bg-300] ">
                            {cajas.map((item) => (
                                <tr key={item.id} className="hover:bg-[--bg-200]">
                                    <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">{item.usuario}</td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">{item.fecha}</td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">{item.empleado}</td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">{item.empleado}</td>
                                    <td className="px-6 py-4 whitespace-nowrap  uppercase truncate">{getStatusBadge(item.detalle)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">{item.num_variacion}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">
                                        {getTipoVariacionBadge(item.tipo_variacion)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-red-600">
                                        {item.faltante ? item.faltante.toLocaleString() : "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[--text-200]">En revisíon</td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-green-600">
                                        {item.sobrante ? item.sobrante.toLocaleString() : "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openModal("variacion", item)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <FaEye className="text-base sm:text-lg" />
                                            </button>
                                            <button onClick={() => openModal('editar', item)} className="text-yellow-600 hover:text-yellow-900">
                                                <FaEdit className="text-base sm:text-lg" />
                                            </button>
                                            <button onClick={() => openModal('eliminar', item)} className="text-red-600 hover:text-red-900">
                                                <FaTrash className="text-base sm:text-lg" />
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