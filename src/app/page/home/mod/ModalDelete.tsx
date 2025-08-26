import type { CajaDTO } from "../../../types";

interface ModalQuestionProps {
    text: string;
    subText: string;
    confirm: (id: number | string, legajo: string | number) => void
    cancel: () => void
    item: CajaDTO | null
}
export const ModalQuestion: React.FC<ModalQuestionProps> = ({ cancel, confirm, text, subText, item }) => {
    if (!item) return null
    return (
        <div className="space-y-6 p-6 bg-[var(--bg-100)] border-2 border-gray-300 rounded-lg text-center">
            <h2 className="text-lg font-semibold text-[var(--text-100)]">{text}</h2>
            {subText && <p className="text-sm text-[var(--text-200)]">{subText}</p>}

            <div className="flex justify-center gap-4 pt-4">
                <button
                    onClick={() => confirm(item.id, item.empleado)}
                    className="px-4 py-2 rounded  text-[var(--text-200)] font-semibold  bg-[var(--primary-100)] hover:bg-[var(--primary-200)] transition-all"
                >
                    Confirmar
                </button>
                <button
                    onClick={cancel}
                    className="px-4 py-2 rounded border border-gray-300 text-[var(--text-200)] hover:bg-[var(--accent-100)] transition-all"
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}