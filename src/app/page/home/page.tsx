import { SidebarPage } from "../../shared/ResponsiveSidebar"
import { ContainerPages } from "../../shared/ContainerPages"
import { useEffect, useState } from "react"
import { NavigationTabs } from "./components/NavigationTabs"
import { ModalVariacion } from "./mod/ModalVariacion"
import { ContainerModals } from "../../shared/ContainerModals"
import { type ModalData, type ModalType, type CajaDTO, type ValeDTO, type ActiveTabDTO, type RegistrosVariaciones, type ModalDataVale } from "../../types"
import { VariacionesModule } from "./components/List"
import { HistoryBox } from "./components/History"
import { ModalAdd } from "./mod/ModalAdd"
import { ModalQuestion } from "./mod/ModalDelete"
import { ModalEdit } from "./mod/ModalEdit"
import { getCajas, updateCaja } from "../../service/cajas.service"
import axios from "axios"
import { API_URL } from "../../service/connection"
import { toast } from "react-toastify"
import { LoaderHover } from "../../shared/Loader"
import { ModalVariacionView } from "./mod/ModalVariacionView"
import { ValesModule } from "./components/Vales"
import { getVales } from "../../service/vales.service"
import { createRegistro, getRegistros } from "../../service/register.service"
import { useAuth } from "../../context/AuthContext"
import { FaSleigh } from "react-icons/fa"
import { ModalAddVale } from "./mod/ModalAddVale"
import { ModalViewSignature } from "./mod/ModalViewSignature"

const PageHome = () => {
    return (
        <SidebarPage>
            <ContainerPages>
                <Home />
            </ContainerPages>
        </SidebarPage>
    )
}


const Home = () => {
    const { user } = useAuth()

    const [activeTab, setActiveTab] = useState<ActiveTabDTO>("listado")
    //modal para variaciones
    const [modalData, setModalData] = useState<ModalData | null>(null)
    const [modalDataVale, setModalDataVale] = useState<ModalDataVale | null>(null);
    const [fechaDesde, setFechaDesde] = useState("")
    const [fechaHasta, setFechaHasta] = useState("")
    const [legajo, setLegajo] = useState("")
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
    //estado para el select
    const [optionSelect, setOptionSelect] = useState<string>("")

    //variables [] importantes donde se setea la data de la api
    const [vales, setVales] = useState<ValeDTO[]>([])
    const [cajas, setCajas] = useState<CajaDTO[]>([])
    const [history, setHistory] = useState<RegistrosVariaciones[]>([])


    //funcion para manejar el cambio de opcion
    const handleOptionSelected = (value: string) => {
        setOptionSelect(value)
    }

    const handleSetActiveTab = async (data: ActiveTabDTO) => {
        setActiveTab(data);
        if (data === 'vales') {
            await fetchVales();
        }

        if (data === 'listado') {
            // lógica específica si hace falta
            await fetchCajas()
        }
        if (data === 'historial') {
            await fetchHistory()
            // lógica específica si hace falta
            /* await fetchCajas() */
        }
    }

    const openModal = (type: ModalType, data: CajaDTO | null = null) => {
        setModalData({ type, data })
    }

    const openModalVales = (type: ModalType, data: ValeDTO | null = null) => {
        console.log(type, data);
        if (data) {
            setModalDataVale({ type: type, data: data })
        } else {
            setModalDataVale({ type: type, data: null })
        }
    }

    const closeModal = () => {
        setModalData(null)
        setModalDataVale(null)
    }

    const handleDelete = async (id: number | string, legajo: string | number) => {
        console.log(id);
        try {
            setLoading(true)
            const res = await axios.put(`${API_URL}/cajas/${id}`, {
                estado: "4"//siempre 4 ===eliminado en la base de datos
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

            console.log('caja actualizada', res.data);
            //3 ) Crear registro de la accion(usa cajaCreada.id como cajas_id);
            const bodyRegistro = {
                usuario_id: Number(user?.id) || 0,
                cajas_id: Number(id),
                accion: `Elimina la variación a ${legajo}`,
                empleado_id: Number(legajo),
            }
            const registroCreado = await createRegistro(bodyRegistro);
            console.log("Registro creado:", registroCreado);
            toast.success('Variación eliminada')
            setLoading(false)
            closeModal()
        } catch (error) {
            console.error("Error al actualizar el estado de mi objeto de la tabla -cajas", error);
            toast.error('Error al eliminar variación')
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async (updateData: CajaDTO) => {
        console.log(updateData);
        setLoading(true)
        const updates = {
            detalle: updateData.detalle,
            num_variacion: updateData.num_variacion,
            tipo_variacion: updateData.tipo_variacion,
            sobrante: updateData.sobrante,
            faltante: updateData.faltante,
        }

        try {
            const res = await updateCaja(updateData.id, updates);
            console.log('Caja actualizada', res);
            const bodyRegistro = {
                usuario_id: Number(user?.id) || 0,
                cajas_id: Number(updateData.id),
                accion: `Actualiza la variación a ${updateData.empleado}`,
                empleado_id: Number(updateData.empleado),
            }
            const registroCreado = await createRegistro(bodyRegistro);
            console.log('REGistro historial actualizado', registroCreado)
            toast.success("Registro Actualizado correctamente");
            closeModal();
            fetchCajas()
        } catch (error) {
            console.error('Error al actualizar caja', error)
        } finally {
            setLoading(false)
        }
    }

    const filterButton = (type: "cajas" | "vales" | "historial") => {
        /*     if (!fechaDesde) return toast.warning("Falta un valor para el campo fecha desde");
            if (!fechaHasta) return toast.warning("Falta un valor para el campo fecha hasta"); */

        console.log("📅 Fecha desde:", fechaDesde);
        console.log("📅 Fecha hasta:", fechaHasta);
        console.log("🆔 Legajo:", legajo);
        if (optionSelect && type === 'cajas') console.log("📌 Opción seleccionada:", optionSelect);

        if (type === 'cajas') fetchCajas()
        if (type === 'vales') fetchVales()
        if (type === 'historial') fetchHistory()
    }

    const fetchHistory = async () => {
        setLoadingFetch(true);
        try {
            const data = await getRegistros({ fechaDesde, fechaHasta, legajo });
            setHistory(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingFetch(false)
        }

    }
    const fetchCajas = async () => {
        setLoadingFetch(true)
        try {
            const data = await getCajas({ fechaDesde, fechaHasta, legajo, tipo: (optionSelect as 'sobrante' | 'faltante' | '') || "" });
            setCajas(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingFetch(false)
        }
    }

    const fetchVales = async () => {
        setLoadingFetch(true)
        try {
            const data = await getVales({ fechaDesde, fechaHasta, legajo });
            setVales(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingFetch(false)
        }
    }
    const resetValues = () => {
        setFechaDesde("");
        setFechaHasta("");
        setLegajo("");
        setOptionSelect("");
    }

    useEffect(() => {
        fetchCajas()
    }, [])

    return (
        <div className="">
            {loading && (
                <LoaderHover />
            )}
            {/* Navigation Tabs */}
            <NavigationTabs activeTab={activeTab} setActiveTab={handleSetActiveTab} />
            <div className="p-6">
                {activeTab === "listado" && (
                    <VariacionesModule reset={resetValues} optionSelect={optionSelect} optionSelected={handleOptionSelected} loading={loadingFetch} reFetch={() => filterButton('cajas')} fechaDesde={fechaDesde} fechaHasta={fechaHasta} legajo={legajo} cajas={cajas} openModal={(type: ModalType, data: CajaDTO | null) => openModal(type, data)} setFechaDesde={setFechaDesde} setFechaHasta={setFechaHasta} setLegajo={setLegajo} />
                )}
                {activeTab === "historial" && (
                    <HistoryBox reset={resetValues} setLegajo={setLegajo} reFetch={() => filterButton('historial')} fechaDesde={fechaDesde} fechaHasta={fechaHasta} legajo={legajo} setFechaDesde={setFechaDesde} setFechaHasta={setFechaHasta} loading={loadingFetch} registers={history} />
                )}
                {activeTab === 'vales' && (
                    <ValesModule reset={resetValues} fechaDesde={fechaDesde} fechaHasta={fechaHasta} legajo={legajo} setFechaDesde={setFechaDesde} setFechaHasta={setFechaHasta} loading={loadingFetch} reFetch={() => filterButton('vales')} setLegajo={setLegajo} vales={vales} openModal={(type: ModalType, data: ValeDTO | null) => openModalVales(type, data)} />
                )}
            </div>
            {/* Modal */}
            {modalData?.type && (
                <ContainerModals>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-[var(--primary-200)]">
                            {modalData.type === "variacion" ? "Detalles de Variación" : modalData.type === 'vale' ? "Vale de Caja" : modalData.type === 'editar' ? 'Editar Variacion' : modalData.type === 'eliminar' ? "Eliminar" : modalData.type === "agregar" ? "Agregar Variacion" : modalData.type === 'ticket_variacion' ? "Variación" : modalData.type === 'agregar_vale' ? "Agregar Vale" : modalData.type === 'firma' && "Ver Firma"}
                        </h3>
                        <button
                            onClick={closeModal}
                            className="text-[var(--text-100)] bg-[var(--primary-100)] hover:bg-[var(--accent-100)] rounded-full w-8 h-8 flex items-center justify-center transition"
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>
                    </div>
                    {modalData.type === "variacion" ? (
                        <ModalVariacion modalData={modalData} />
                    ) /* : modalData.type === "vale" ? (
                        <ModalVale modalData={modalData} />
                    ) */ : modalData.type === "agregar" ? (
                            <ModalAdd openModal={(value) => { openModal(value); fetchCajas() }} />
                        ) : modalData.type === 'eliminar' ? (
                            <ModalQuestion item={modalData.data} cancel={() => openModal(null)} confirm={handleDelete} text="¿Estás seguro que querés eliminar esta variación?"
                                subText="Esta acción no se puede deshacer." />
                        ) : modalData.type === "editar" ? (
                            <ModalEdit cancel={() => openModal(null)} confirm={(updateData: CajaDTO) => handleUpdate(updateData)} data={modalData.data} />
                        ) : modalData.type === 'ticket_variacion' && (
                            <ModalVariacionView modalData={modalData} />
                        )}
                    {(modalData.type === 'variacion' || modalData.type === 'vale') && (
                        <div className="flex justify-end mt-6 gap-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm border  text-white  rounded hover:bg-[--accent-100] transition-all"
                            >
                                Cerrar
                            </button>
                        </div>
                    )}


                </ContainerModals>
            )}
            {modalDataVale?.type && (
                <ContainerModals>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-[var(--primary-200)]">
                            {modalDataVale.type === "variacion" ? "Detalles de Variación" : modalDataVale.type === 'vale' ? "Vale de Caja" : modalDataVale.type === 'editar' ? 'Editar Variacion' : modalDataVale.type === 'eliminar' ? "Eliminar" : modalDataVale.type === "agregar" ? "Agregar Variacion" : modalDataVale.type === 'ticket_variacion' ? "Variación" : modalDataVale.type === 'agregar_vale' ? "Agregar Vale" : modalDataVale.type === 'firma' && "Ver Firma"}
                        </h3>
                        <button
                            onClick={closeModal}
                            className="text-[var(--text-100)] bg-[var(--primary-100)] hover:bg-[var(--accent-100)] rounded-full w-8 h-8 flex items-center justify-center transition"
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>
                    </div>
                    {modalDataVale.type === 'agregar_vale' && (
                        <ModalAddVale openModal={() => { fetchVales(); closeModal() }} />
                    )}
                    {modalDataVale.type === 'firma' && (
                        <ModalViewSignature id={modalDataVale.data?.firma_empleado} />
                    )}
                </ContainerModals>
            )}
        </div >
    )
}





export default PageHome