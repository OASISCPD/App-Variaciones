import type {/*  ModalType, */ RegistrosVariaciones } from "../../../types"
import { Filters } from "./Filters"
import { formateDateTime, getActionColor } from "../../../utils";
/* import { MdFilterAlt } from "react-icons/md"; */
import { FiSettings as Settings, FiClock as Clock, FiUser as User, FiHash as Hash } from "react-icons/fi";
import { ButtonFilter } from "../../../shared/UI/ButtonFilter";

interface props {
    registers: RegistrosVariaciones[]
    fechaDesde: string;
    setFechaDesde: (s: string) => void
    fechaHasta: string;
    setFechaHasta: (s: string) => void
    legajo: string
    setLegajo: (s: string) => void
    /*  openModal: (type: ModalType, data: RegistrosVariaciones | null) => void */
    reFetch: () => void
    loading: boolean
    reset: () => void
}

const DesktopTableSkeleton = () => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[--bg-300]">
            <thead className="bg-[--bg-200]">
                <tr>
                    {["Fecha", "Legajo", "Acción", "Usuario", "Id Cajas"].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-[--text-200] uppercase tracking-wider">
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-[--bg-100] divide-y divide-[--bg-300]">
                {Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}>
                        {Array.from({ length: 5 }).map((__, j) => (
                            <td key={j} className="px-6 py-4">
                                <div className="h-4 w-28 bg-[--bg-300] rounded animate-pulse" />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const MobileCardSkeleton = () => (
    <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[--bg-100] p-6 rounded-xl shadow-sm border border-[--bg-300]">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 shrink-0 rounded-full bg-[--bg-300] animate-pulse" />
                        <div>
                            <div className="h-4 w-40 bg-[--bg-300] rounded animate-pulse mb-2" />
                            <div className="h-5 w-24 bg-[--bg-300] rounded animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="h-4 w-48 bg-[--bg-300] rounded animate-pulse" />
                    <div className="h-4 w-40 bg-[--bg-300] rounded animate-pulse" />
                    <div className="h-4 w-36 bg-[--bg-300] rounded animate-pulse" />
                </div>
            </div>
        ))}
    </div>
);

export const HistoryBox: React.FC<props> = ({
    registers, fechaDesde, fechaHasta, legajo, loading,
    reFetch, setFechaDesde, setFechaHasta, setLegajo, reset
}) => {

    return (
        <div className="bg-[--bg-100] rounded-lg shadow">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-[--text-100]">
                        Historial de Variaciones
                    </h2>
                </div>

                {/* Filters */}
                <Filters
                    fechaDesde={fechaDesde}
                    fechaHasta={fechaHasta}
                    isSelect={false}
                    legajo={legajo}
                    setFechaDesde={setFechaDesde}
                    setFechaHasta={setFechaHasta}
                    setLegajo={setLegajo}
                />

                {/* Botón Filtrar */}
                <ButtonFilter onReset={reset} onClick={reFetch} />
                {/* MOBILE: cards (sm-) */}
                <div className="block max-h-[500px] overflow-y-auto md:hidden">
                    {loading ? (
                        <MobileCardSkeleton />
                    ) : registers.length === 0 ?
                        <div className="p-6 text-center text-[--text-200]">
                            No hay datos disponibles
                        </div>
                        : (
                            <div className="grid grid-cols-1 gap-4">
                                {registers.map((item) => (
                                    <div key={item.id} className="bg-[--bg-100] p-6 rounded-xl shadow-sm border border-[--bg-300] hover:shadow-md transition-all">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                                                    {/* <Settings size={20} className="text-blue-600" /> */}
                                                    <h1 className="text-blue-600 text-base">{item.id}</h1>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-[--text-100] text-sm mb-1">
                                                        {item.usuario_nombre_completo}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                            {item.accion}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-4 ">
                                            <div className="flex items-center space-x-2">
                                                <Clock size={16} className="text-[--text-200]" />
                                                <span className="text-xs text-[--text-200]">
                                                    FECHA: <span className="text-[--text-100]">{formateDateTime(item.created_at)}</span>
                                                </span>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <User size={16} className="text-[--text-200]" />
                                                <span className="text-xs text-[--text-200]">
                                                    LEGAJO: <span className="text-[--primary-300]">{item.empleado_id}</span>
                                                </span>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Hash size={16} className="text-[--text-200]" />
                                                <span className="text-xs text-[--text-200]">
                                                    ID CAJAS: <span className="text-[--accent-100]">{item.cajas_id}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>

                {/* DESKTOP: tabla (md+) */}
                <div className="hidden md:block max-h-[400px] overflow-y-auto">
                    {loading ? (
                        <DesktopTableSkeleton />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-[--bg-300]">
                                <thead className="bg-[--primary-100]">
                                    <tr>
                                        {["Id", "Fecha", "Legajo", "Acción", "Usuario", "Id Cajas"].map(header => (
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
                                    {registers.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-4 text-center text-sm text-[--text-200]"
                                            >
                                                No hay datos disponibles
                                            </td>
                                        </tr>
                                    ) : (
                                        registers.map((item) => (
                                            <tr key={item.id} className="hover:bg-[--bg-200]">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">
                                                    {item.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">
                                                    {formateDateTime(item.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">
                                                    {item.empleado_id}
                                                </td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getActionColor(item.accion)}`}>
                                                    {item.accion}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">
                                                    {item.usuario_nombre_completo}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">
                                                    {item.cajas_id}
                                                </td>
                                            </tr>
                                        )))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
