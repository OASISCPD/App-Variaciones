import { useEffect, useState, type FC } from "react";
import { getPermisos } from "../../../service/permisos.service";

import type { PermisoDTO } from '../../../types/index'
interface SelectPermisosProps {
    register: any;
    error?: string;
    defaultValue?: string | number
}

export const SelectPermisos: FC<SelectPermisosProps> = ({ register, defaultValue, error }) => {
    const [permisos, setPermisos] = useState<PermisoDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchPermisos = async () => {
        try {
            const data = await getPermisos();
            setPermisos(data)
        } catch (error) {
            console.error('Error al obtener los permisos', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPermisos()
    }, [])

    return (
        <div>
            <label className="text-sm font-medium text-[var(--text-200)]">Permisos</label>

            {loading ? (
                <div className="w-full h-10 rounded bg-[var(--bg-300)] animate-pulse mt-2" />
            ) : (
                <select
                    defaultValue={defaultValue}
                    {...register("permisos_id", { required: "Campo obligatorio" })}
                    className="w-full px-3 text-[var(--text-200)] py-2 border rounded bg-[var(--bg-300)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)]"
                >
                    <option className="text-[var(--text-200)]" value="" disabled>
                        Seleccione un permiso...
                    </option>
                    {permisos.map((permiso) => (
                        <option key={permiso.id} value={String(permiso.id)}>
                            {permiso.nombre} - {permiso.descripcion}
                        </option>
                    ))}
                </select>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );

}