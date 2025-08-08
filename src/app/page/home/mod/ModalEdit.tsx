import { useForm } from "react-hook-form";
import type { Variacion } from "../../../types"
import { inputStyle } from "../../../utils/const";

interface ModalEditProps {
    data: Variacion | null;
    cancel: () => void;
    confirm: (update: Variacion) => void;
}
export const ModalEdit: React.FC<ModalEditProps> = ({ cancel, confirm, data }) => {
    if (!data) return null

    const { register, handleSubmit, formState: { errors } } = useForm<Variacion>({ defaultValues: data })
    const onSubmit = (formData: Variacion) => {
        confirm(formData)
    }
    return (
        <div className="space-y-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-2 border-gray-300 rounded-lg p-6 bg-[var(--bg-100)]"
            >
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Fecha</label>
                        <input
                            type="date"
                            {...register("fecha", { required: "La fecha es obligatoria" })}
                            className={`${inputStyle}`}
                        />
                        {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Legajo</label>
                        <input
                            type="number"
                            min={0}
                            {...register("legajo", {
                                required: "El legajo es obligatorio",
                                min: { value: 0, message: "No puede ser negativo" },
                            })}
                            className={`${inputStyle}`}
                        />
                        {errors.legajo && <p className="text-red-500 text-sm">{errors.legajo.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Nombre y apellido</label>
                        <input
                            type="text"
                            {...register("empleado", { required: "Este campo es obligatorio" })}
                            className={`${inputStyle}`}
                        />
                        {errors.empleado && <p className="text-red-500 text-sm">{errors.empleado.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Detalle</label>
                        <textarea
                            {...register("detalle")}
                            className={`${inputStyle}`}
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">N° Variación</label>
                        <input
                            type="number"
                            min={0}
                            {...register("numeroVariacion", {
                                required: "Este campo es obligatorio",
                                min: { value: 0, message: "Debe ser 0 o mayor" },
                            })}
                            className={`${inputStyle}`}
                        />
                        {errors.numeroVariacion && (
                            <p className="text-red-500 text-sm">{errors.numeroVariacion.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Tipo de variación</label>
                        <input
                            type="text"
                            {...register("tipoVariacion", { required: "Campo requerido" })}
                            className={`${inputStyle}`}
                        />
                        {errors.tipoVariacion && (
                            <p className="text-red-500 text-sm">{errors.tipoVariacion.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Sobrante</label>
                        <input
                            type="number"
                            min={0}
                            {...register("sobrante", {
                                valueAsNumber: true,
                                min: { value: 0, message: "No puede ser negativo" },
                            })}
                            className={`${inputStyle}`}
                        />
                        {errors.sobrante && <p className="text-red-500 text-sm">{errors.sobrante.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Faltante</label>
                        <input
                            type="number"
                            min={0}
                            {...register("faltante", {
                                valueAsNumber: true,
                                min: { value: 0, message: "No puede ser negativo" },
                            })}
                            className={`${inputStyle}`}
                        />
                        {errors.faltante && <p className="text-red-500 text-sm">{errors.faltante.message}</p>}
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
        </div>
    )
}