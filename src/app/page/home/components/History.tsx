import type { Variacion } from "../../../types"

interface props {
    mockData: Variacion[]
}

export const HistoryBox: React.FC<props> = ({ mockData }) => {
    return (
        <div className="bg-[--bg-100] rounded-lg shadow">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-[--text-200]">Historial de Variaciones</h2>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="px-3 py-2 border border-[--bg-300] rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-100]"
                        />
                        <button className="px-4 py-2 text-sm text-[--text-100] bg-[--primary-100] rounded hover:bg-[--primary-200]">
                            Buscar
                        </button>
                    </div>
                </div>
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-[--text-200] mb-1">Fecha desde</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border border-[--bg-300] rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-100]"
                            placeholder="Seleccionar fecha"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[--text-200] mb-1">Fecha hasta</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border border-[--bg-300] rounded-md focus:outline-none focus:ring-2 focus:ring-[--primary-100]"
                            placeholder="Seleccionar fecha"
                        />
                    </div>
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[--bg-300]">
                        <thead className="bg-[--bg-200]">
                            <tr>
                                {[
                                    "Fecha", "Legajo", "Empleado", "Detalle",
                                    "N° Variación", "Tipo Variación", "Sobrante",
                                    "Faltante", "Usuario", "Acción"
                                ].map(header => (
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
                            {mockData.slice(0, 6).map((item) => (
                                <tr key={item.id} className="hover:bg-[--bg-200]">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">{item.fecha}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">{item.legajo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">{item.empleado}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">{item.detalle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">{item.numeroVariacion}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">{item.tipoVariacion}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                                        {item.sobrante ? item.sobrante.toLocaleString() : "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                                        {item.faltante ? item.faltante.toLocaleString() : "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[--text-200]">Marisa Mendoza</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                        <button className="hover:underline">Agregar variación a {item.legajo}</button>
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