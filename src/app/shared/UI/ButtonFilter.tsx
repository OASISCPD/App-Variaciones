import type { FC } from "react"
import { MdFilterAlt } from "react-icons/md"
import { IoRefreshOutline } from "react-icons/io5"

interface props {
    onClick: () => void
    onReset: () => void
}

export const ButtonFilter: FC<props> = ({ onClick, onReset }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <button
                    onClick={() => onClick()}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-[var(--primary-300)] bg-[var(--bg-200)] rounded hover:bg-[var(--bg-300)] border border-[var(--primary-200)]  transition-colors duration-200" 
                >
                    <MdFilterAlt className="text-lg text-[var(--primary-300)]" />
                    Filtrar
                </button>

                <button
                    onClick={() => onReset()}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-[var(--primary-300)] bg-[var(--bg-200)] border border-[var(--primary-200)] rounded hover:bg-[var(--bg-300)] hover:border-[var(--primary-200)] transition-all duration-200"
                    title="Restablecer filtros"
                >
                    <IoRefreshOutline className="text-lg text-[var(--primary-300)]" />
                    Restablecer
                </button>
            </div>
        </div>
    )
}