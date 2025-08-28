import { useForm } from "react-hook-form";
import type { UserDTO } from "../../../types"
import {  inputStyleDisabled } from "../../../utils/const";
import { SelectPermisos } from "../components/PermisosSelect";

interface ModalEditProps {
    data: UserDTO | null
    cancel: () => void;
    confirm: (update: UserDTO) => void
}

const formatDateForInput = (isoDate: string | undefined) => {
    if (!isoDate) return "";
    return new Date(isoDate).toISOString().slice(0, 16);//yyyy-MM-DD HH:mm
}

export const ModalEdit: React.FC<ModalEditProps> = ({ cancel, confirm, data }) => {
    if (!data) return null

    // Supongamos que `data` viene como prop o del backend:
    const formattedData = {
        ...data,
        fecha_registro: formatDateForInput(data?.fecha_registro)
    };

    const { register, handleSubmit, formState: { errors } } = useForm<UserDTO>({ defaultValues: formattedData })

    const onSubmit = (updateData: UserDTO) => {
        confirm(updateData)
    }

    return (
        <div className="space-y-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-2 border-gray-300 rounded-lg p-6 bg-[var(--bg-100)]">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Legajo</label>
                        <div className={`${inputStyleDisabled}`}
                        /*  type="text"
                         {...register("legajo", { required: "Campo obligatorio" })}
                         className={`${inputStyleDisabled}`} */
                        >
                            {data.legajo}
                        </div>
                        {errors.legajo && <p className="text-red-500 text-sm">{errors.legajo.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Nombre</label>
                        {/*   <input
                            type="text"
                            {...register("nombre", { required: "Campo obligatorio" })}
                            className={inputStyle}
                        /> */}
                        <div className={inputStyleDisabled}>
                            {data.nombre}
                        </div>
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Apellido</label>
                        {/* <input
                            type="text"
                            {...register("apellido", { required: "Campo obligatorio" })}
                            className={inputStyle}
                        /> */}
                        <div className={inputStyleDisabled}>
                            {data.apellido}
                        </div>
                        {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Usuario</label>
                        <div className={`${inputStyleDisabled}`}
                        >
                            {data.usr}
                        </div>
                        {errors.usr && <p className="text-red-500 text-sm">{errors.usr.message}</p>}
                    </div>
                    <SelectPermisos
                        register={register}
                        error={errors.permisos_id?.message}
                        defaultValue={data.permisos_id}
                    />

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Fecha de Registro</label>
                        <input
                            disabled
                            type="datetime-local"
                            {...register("fecha_registro", { required: "Campo obligatorio" })}
                            className={inputStyleDisabled}
                        />
                        {errors.fecha_registro && (
                            <p className="text-red-500 text-sm">{errors.fecha_registro.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-between pt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-[var(--primary-100)] text-[var(--text-100)] hover:opacity-90"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        type="button"
                        onClick={cancel}
                        className="px-4 py-2 text-[var(--primary-100)] hover:underline"
                    >
                        Volver
                    </button>
                </div>
            </form>
        </div >
    )
}