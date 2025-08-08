import { FaEdit, FaTrash, FaUndo } from "react-icons/fa"
import type { ModalUsersType, UserDTO } from "../../../types"
import format from "date-fns/format"
import { UsersSkeleton } from "./UserSkeleton"

interface ListUsersProps {
    UsersData: UserDTO[]
    openModal: (type: ModalUsersType, data: UserDTO | null) => void
    loading: boolean;
}

export const ListUsers: React.FC<ListUsersProps> = ({ UsersData, openModal, loading }) => {
    return (
        <div className="overflow-x-auto max-h-[600px]">
            <table className="min-w-full divide-y divide-[--bg-300]">
                <thead className="bg-[--bg-200]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[--text-200] uppercase tracking-wider">
                            {/* Indicador */}
                        </th>
                        {[
                            "Legajo", "Nombre y Apellido", "Usuario", "Permisos", "Fecha registro", "Acciones"
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
                {loading ? (
                    <UsersSkeleton />
                ) : (
                    <tbody className="bg-[--bg-100] divide-y divide-[--bg-300]">
                        {UsersData.map((item) => (
                            <tr key={item.legajo} className="hover:bg-[--bg-200]">
                                {/* Estado: activo/inactivo */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div
                                        className={`w-2 sm:w-4 h-2 sm:h-4 rounded-full shrink-0 ${item.estado === 1 ? 'bg-green-500' : 'bg-gray-400'}`}
                                        title={item.estado === 1 ? 'Activo' : 'Inactivo'}
                                    ></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">{item.legajo}</td>
                                <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">{item.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">{item.usr}</td>
                                <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">{item.permisos_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">{format(new Date(item.fecha_registro), 'dd/MM/yyyy HH:mm')}</td>
                                <td className="px-6 py-4 whitespace-nowrap  text-[--text-200]">
                                    <div className="flex space-x-2 justify-between">
                                        <button onClick={() => openModal('editar', item)} className="text-yellow-600 hover:text-yellow-900">
                                            <FaEdit />
                                        </button>
                                        {item.estado === 1 ? (
                                            <button onClick={() => openModal('eliminar', item)} className="text-red-600 hover:text-red-900">
                                                <FaTrash />
                                            </button>
                                        ) : (
                                            <button onClick={() => openModal('agregar', item)} className="text-green-600 hover:text-green-900">
                                                <FaUndo />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div >
    )
}