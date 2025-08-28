import { useEffect, useState } from "react"
import { ContainerPages } from "../../shared/ContainerPages"
import { SidebarPage } from "../../shared/ResponsiveSidebar"
import { type ModalDataUsers, type ModalUsersType, type UserDTO } from "../../types"
import { ContainerModals } from "../../shared/ContainerModals"
import { ModalEdit } from "./mod/ModalEdit"
import { ModalQuestion } from "./mod/ModalDelete"
import { ListUsers } from "./components/ListTable"
import { fetchUsers, updateUsuarioService } from "../../service/usuarios.service"
import { LoaderHover } from "../../shared/Loader"
import { toast } from "react-toastify"

const UsersPage = () => {
    return (
        <SidebarPage>
            <ContainerPages>
                <UsersTemplate />
            </ContainerPages>
        </SidebarPage>
    )
}

export const UsersTemplate = () => {
    const [modalData, setModalData] = useState<ModalDataUsers | null>(null)
    //logica user
    const [user, setUser] = useState<UserDTO[]>([]);
    //loading
    const [loading, setLoading] = useState<boolean>(true);
    const getUsers = async () => {
        try {
            const data = await fetchUsers();
            setUser(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const parseUserFormDataUpdate = (data: UserDTO): Partial<UserDTO> => {
        return {
            nombre: data.nombre,
            permisos_id: Number(data.permisos_id),
        };
    }

    const onSubmit = async (data: UserDTO) => {
        const parsedData = await parseUserFormDataUpdate(data);
        const success = await updateUsuarioService(data.id, parsedData);
        if (success) {
            console.log("Usuario actualizado con éxito");
            toast.success('Usuario actualizado con éxito');
            getUsers()
        } else {
            console.log("Fallo al actualizar el usuario");
            toast.error('Fallo al actualizar el usuario')
        }
        setLoading(false)
        closeModal()
    }

    const openModal = (type: ModalUsersType, data: UserDTO | null = null) => {
        console.log(data);
        setModalData({ type, data })
    }
    const closeModal = () => {
        setModalData(null)
    }

    //editar
    const handleEdit = (updateData: UserDTO) => {
        console.log(updateData);
        setLoading(true)
        onSubmit(updateData)
        /*  alert(`${JSON.stringify(updateData)}`) */
        /*  closeModal() */
    }
    //eliminar
    const handleDelete = async (id: number | string) => {
        const success = await updateUsuarioService(Number(id), { estado: 0 })
        if (success) {
            console.log("Usuario eliminado con éxito");
            toast.success('Usuario eliminado con éxito');
            getUsers()
        } else {
            console.log("Fallo al actualizar el usuario");
            toast.error('Fallo al eliminado el usuario')
        }
        setLoading(false)
        closeModal()
    }

    const handleBackDelete = async (id: number | string) => {
        const success = await updateUsuarioService(Number(id), { estado: 1 })
        if (success) {
            console.log("Usuario agregado con éxito");
            toast.success('Usuario agregado nuevamente con éxito');
            getUsers()
        } else {
            console.log("Fallo al actualizar el usuario");
            toast.error('Fallo al agregar nuevamente a el usuario')
        }
        setLoading(false);
        closeModal()
    }
    return (
        <div className="p-6">
            <div className="bg-[--bg-100] rounded-lg shadow">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-[--text-200]">Listado de Usuarios</h2>
                    </div>
                    {/* LIST */}
                    <ListUsers loading={loading} UsersData={user} openModal={openModal} />
                </div>
            </div>
            {modalData?.type && (
                <ContainerModals>
                    {loading && (
                        <LoaderHover />
                    )}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-[var(--primary-100)]">
                            {modalData.type === "agregar" ? "Agregar Usuario" : modalData.type === 'editar' ? "Editar Usuario" : modalData.type === 'eliminar' && 'Eliminar Usuario'}
                        </h3>
                        <button
                            onClick={closeModal}
                            className="text-[var(--text-100)] bg-[var(--primary-100)] hover:bg-[var(--accent-100)] rounded-full w-8 h-8 flex items-center justify-center transition"
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>
                    </div>
                    {modalData.type === 'agregar' ? (
                        <ModalQuestion cancel={closeModal} confirm={handleBackDelete} item={modalData.data} text="¿Estás seguro que querés reactivar este usuario?"
                            subText="Este usuario volverá a estar activo en el sistema y podrá operar normalmente." />
                    ) : modalData.type === 'editar' ? (
                        <ModalEdit cancel={closeModal} confirm={handleEdit} data={modalData.data} />
                    ) : modalData.type === 'eliminar' && (
                        <ModalQuestion cancel={closeModal} confirm={handleDelete} item={modalData.data} text="¿Eliminar usuario?" subText="Se eliminará automaticamente" />
                    )}
                </ContainerModals>
            )}
        </div>
    )
}




export default UsersPage