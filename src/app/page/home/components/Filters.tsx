import type { FC } from "react";
import { inputStyle } from "../../../utils/const";

interface propsFilters {
    fechaDesde: string;
    setFechaDesde: (string: string) => void
    fechaHasta: string;
    setFechaHasta: (string: string) => void
    legajo: string
    setLegajo: (string: string) => void
    isSelect: boolean
    optionSelected?: (value: string) => void
    optionSelect?: string
}
export const Filters: FC<propsFilters> = ({ fechaDesde, fechaHasta, legajo, setFechaDesde, setFechaHasta, setLegajo, isSelect, optionSelect = '', optionSelected }) => {
    return (
        <div className={`grid grid-cols-1 ${isSelect ? "md:grid-cols-4" : "md:grid-cols-3"} gap-4 mb-6`}>
            <div>
                <label className="block  font-medium text-[--text-200] mb-1">Fecha desde</label>
                <input
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                    className={inputStyle}
                />
            </div>
            <div>
                <label className="block  font-medium text-[--text-200] mb-1">Fecha hasta</label>
                <input
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                    className={inputStyle}
                />
            </div>
            <div>
                <label className="block  font-medium text-[--text-200] mb-1">Legajo</label>
                <input
                    type="text"
                    value={legajo}
                    placeholder="13763"
                    onChange={(e) => setLegajo(e.target.value)}
                    className={inputStyle}
                />
            </div>
            {isSelect && (
                <div>
                    <label className="block font-medium text-[--text-200] mb-1">Elegir opción</label>
                    <select
                        value={optionSelect}
                        onChange={(e) => optionSelected?.(e.target.value)}
                        className={inputStyle}
                    >
                        <option value="">Elegir opción</option>
                        <option value="sobrante">Sobrante</option>
                        <option value="faltante">Faltante</option>
                    </select>
                </div>
            )}
        </div>
    )
}