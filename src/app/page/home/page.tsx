import { SidebarPage } from "../../shared/ResponsiveSidebar"
import { ContainerPages } from "../../shared/ContainerPages"
import { useEffect, useState } from "react"
import { NavigationTabs } from "./components/NavigationTabs"
import { ModalVariacion } from "./mod/ModalVariacion"
import { ContainerModals } from "../../shared/ContainerModals"
import { ModalVale } from "./mod/ModalVale"
import { type ModalData, type ModalType, type Variacion, type CajaDTO } from "../../types"
import { ListBox } from "./components/List"
import { HistoryBox } from "./components/History"
import { ModalAdd } from "./mod/ModalAdd"
import { ModalQuestion } from "./mod/ModalDelete"
import { ModalEdit } from "./mod/ModalEdit"
import { getCajas } from "../../service/cajas.service"
import { mockData } from "../../utils/const"

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
    const [activeTab, setActiveTab] = useState<"listado" | "historial">("listado")
    const [modalData, setModalData] = useState<ModalData | null>(null)
    const [fechaDesde, setFechaDesde] = useState("")
    const [fechaHasta, setFechaHasta] = useState("")
    const [legajo, setLegajo] = useState("")
    const [cajas, setCajas] = useState<CajaDTO[]>([])
    const openModal = (type: ModalType, data: Variacion | null = null) => {
        setModalData({ type, data })
    }
    const closeModal = () => {
        setModalData(null)
    }

    const handleDelete = (id: number | string) => {
        alert(`${id} eliminado....`)
        closeModal()
    }

    const handleEdit = (updateData: Variacion) => {
        console.log(updateData);
        alert(`${JSON.stringify(updateData)}`)
        closeModal()
    }
    const fetchCajas = async () => {
        try {
            const data = await getCajas();
            setCajas(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchCajas()
    }, [])
    return (
        <div className="">
            {/* Navigation Tabs */}
            <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="p-6">
                {activeTab === "listado" && (
                    <ListBox fechaDesde={fechaDesde} fechaHasta={fechaHasta} legajo={legajo} cajas={cajas} openModal={(type: ModalType, data: Variacion | null) => openModal(type, data)} setFechaDesde={setFechaDesde} setFechaHasta={setFechaHasta} setLegajo={setLegajo} />
                )}
                {activeTab === "historial" && (
                    <HistoryBox mockData={mockData} />
                )}
            </div>
            {/* Modal */}
            {modalData?.type && (
                <ContainerModals>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-[var(--primary-100)]">
                            {modalData.type === "variacion" ? "Detalles de Variación" : modalData.type === 'vale' ? "Vale de Caja" : modalData.type === 'editar' ? 'Editar Variacion' : modalData.type === 'eliminar' ? "Eliminar" : modalData.type === "agregar" && "Agregar Variacion"}
                        </h3>
                        <button
                            onClick={closeModal}
                            className="text-[var(--text-100)] bg-[var(--primary-100)] hover:bg-[var(--accent-100)] rounded-full w-8 h-8 flex items-center justify-center transition"
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>

                    </div>
                    {(modalData.type === "variacion" || modalData.type === "vale") && (
                        <div className="mb-6">
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setModalData({ ...modalData, type: "variacion" })}
                                    className={`px-4 py-2 rounded transition ${modalData.type === "variacion"
                                        ? "bg-[var(--primary-100)] text-[var(--text-100)] hover:opacity-90"
                                        : "bg-[var(--bg-200)] text-[var(--text-200)] hover:bg-[var(--bg-300)]"
                                        }`}
                                >
                                    Variación de Cajas
                                </button>

                                <button
                                    onClick={() => setModalData({ ...modalData, type: "vale" })}
                                    className={`px-4 py-2 rounded transition ${modalData.type === "vale"
                                        ? "bg-[var(--primary-100)] text-[var(--text-100)] hover:opacity-90"
                                        : "bg-[var(--bg-200)] text-[var(--text-200)] hover:bg-[var(--bg-300)]"
                                        }`}
                                >
                                    Vale
                                </button>

                            </div>
                        </div>
                    )}
                    {modalData.type === "variacion" ? (
                        <ModalVariacion modalData={modalData} />
                    ) : modalData.type === "vale" ? (
                        <ModalVale modalData={modalData} />
                    ) : modalData.type === "agregar" ? (
                        <ModalAdd openModal={(value) => openModal(value)} />
                    ) : modalData.type === 'eliminar' ? (
                        <ModalQuestion item={modalData.data} cancel={() => openModal(null)} confirm={handleDelete} text="¿Estás seguro que querés eliminar esta variación?"
                            subText="Esta acción no se puede deshacer." />
                    ) : modalData.type === "editar" && (
                        <ModalEdit cancel={() => openModal(null)} confirm={() => handleEdit} data={modalData.data} />
                    )}
                    {(modalData.type === 'variacion' || modalData.type === 'vale') && (
                        <div className="flex justify-end mt-6 gap-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cerrar
                            </button>
                        </div>
                    )}
                </ContainerModals>
            )}
        </div >
    )
}





export default PageHome