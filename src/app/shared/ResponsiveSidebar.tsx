import axios from "axios";
import React from "react"
import { BiLogOut, BiMenu, BiX } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import { API_URL } from "../service/connection";
import { FaHome, FaUsers } from "react-icons/fa";

// Tipos para los elementos del menú
interface MenuItem {
    id: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
}
// Props para el componente principal
interface ResponsiveSidebarProps {
    menuItems: MenuItem[]
    logo?: React.ReactNode
    children: React.ReactNode
    defaultOpen?: boolean
}

// Contexto para manejar el estado del sidebar
type SidebarContextType = {
    isOpen: boolean
    toggleSidebar: () => void
    closeSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

// Hook para usar el contexto del sidebar
export const useSidebar = () => {
    const context = React.useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar debe ser usado dentro de un SidebarProvider")
    }
    return context
}

export function ResponsiveSidebar({
    menuItems,
    /* logo, */
    children,
    defaultOpen = false
}: ResponsiveSidebarProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    // Detectar cambios en el tamaño de la pantalla
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        }

        // Configuración inicial
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const toggleSidebar = React.useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    const closeSidebar = React.useCallback(() => {
        if (window.innerWidth < 1024) {
            setIsOpen(false)
        }
    }, [])

    // Valor del contexto
    const contextValue = React.useMemo(() => ({
        isOpen,
        toggleSidebar,
        closeSidebar
    }), [isOpen, toggleSidebar, closeSidebar])

    const logout = async () => {
        const navigate = useNavigate()

        try {
            await axios.get(`${API_URL}/logout`, {
                withCredentials: true // importante si la sesión se maneja con cookies
            })
            navigate("/")
        } catch (err) {
            console.error("Error al cerrar sesión", err)
        }
    }

    return (
        <SidebarContext.Provider value={contextValue}>
            <div className="flex h-screen w-full overflow-hidden bg-[var(--bg-100)]">
                {/* Overlay para cerrar el sidebar en móvil */}
                {isOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                        onClick={closeSidebar}
                        aria-hidden="true"
                    />
                )}
                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-30 lg:hidden w-64 transform shadow-lg transition-transform duration-300 ease-in-out 
    bg-[var(--primary-100)] border-r border-[var(--bg-300)] 
    ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0`}
                >
                    {/* Header */}
                    <div className="flex h-16 items-center justify-between px-4 border-b border-[var(--bg-300)]">
                        <div className="flex items-center">
                            <h1 className="text-[var(--text-100)] text-lg font-semibold tracking-wide">Variaciones de cajas</h1>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="rounded-md p-2 text-[var(--text-100)] hover:bg-[var(--text-200)] md:hidden"
                            aria-label="Cerrar sidebar"
                        >
                            <BiX className="h-5 w-5" />
                        </button>
                    </div>

                    {/* CONTENIDO SCROLLEABLE */}
                    <div className="flex flex-col max-h-[calc(100vh-4rem)] overflow-y-auto">
                        {/* Menú navegación */}
                        <nav className="flex flex-col px-4 py-4 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.href || "#"}
                                    onClick={() => window.innerWidth < 1024 && closeSidebar()}
                                    className="flex items-center gap-3 rounded-md px-3 py-2  text-sm text-[var(--text-100)] hover:bg-[var(--primary-200)] hover:text-[var(--text-200)] transition-colors duration-300"
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Usuario */}
                        <div className="px-4 pt-2 pb-3">
                            <div className="rounded-lg bg-[var(--primary-200)] px-4 py-3 text-sm text-[var(--text-200)] shadow-sm">
                                <span className="font-medium">Usuario:</span> Alex Becci
                            </div>
                        </div>

                        {/* Cerrar sesión */}
                        <div className="mt-auto px-4 py-3 border-t border-[var(--primary-200)]">
                            <button
                                onClick={logout}
                                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--text-100)] hover:bg-[var(--primary-200)] hover:text-[var(--text-200)] transition-colors duration-300"
                            >
                                <BiLogOut className="text-lg" />
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </aside>
                {/* Contenido principal */}
                <main className="flex flex-1 tracking-wider bg-[var(--primary-100)] flex-col overflow-auto">
                    {/* Header con botón para abrir el sidebar */}
                    <header className="flex h-16 items-center px-4 lg:hidden">
                        <button
                            onClick={toggleSidebar}
                            className="rounded-md p-2 text-[var(--text-200)] hover:bg-[var(--primary-200)] duration-300 "
                            aria-label="Abrir sidebar"
                        >
                            <BiMenu className="h-5 w-5" />
                        </button>
                    </header>
                    <header className=" hidden  lg:flex  lg:block items-center justify-between h-16 px-4 py-4 border-b border-[var(--bg-300)] bg-[var(--primary-100)]">
                        {/* Título */}
                        <h1 className="text-[var(--text-100)] text-lg font-semibold tracking-wide">
                            Variaciones de cajas
                        </h1>

                        {/* Navegación */}
                        <nav className="flex items-center gap-6">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.href || "#"}
                                    className="flex items-center gap-2 text-sm text-[var(--text-100)] hover:text-[var(--text-200)] transition-colors"
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}

                            {/* Usuario */}
                            <div className="px-3 py-1 rounded bg-[var(--primary-200)] text-[var(--text-200)] text-sm shadow-sm">
                                <span className="font-medium">Usuario:</span> Alex Becci
                            </div>

                            {/* Logout */}
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-sm text-[var(--text-100)] hover:text-[var(--text-200)] transition-colors"
                            >
                                <BiLogOut className="text-lg" />
                                Cerrar sesión
                            </button>
                        </nav>
                    </header>

                    {/* Contenido dinámico */}
                    <div className="flex-1">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarContext.Provider>

    )
}

// Componente para usar el sidebar en una página
export function SidebarPage({ children }: { children: React.ReactNode }) {
    // Ejemplo de elementos del menú

    const menuItems: MenuItem[] = [
        { id: "inicio", label: "Inicio", href: "/home", icon: <FaHome /> },
        { id: "usuarios", label: "Usuarios", href: "/users", icon: <FaUsers /> },
    ];

    return (
        <ResponsiveSidebar menuItems={menuItems}>
            {children}
        </ResponsiveSidebar>
    )
}