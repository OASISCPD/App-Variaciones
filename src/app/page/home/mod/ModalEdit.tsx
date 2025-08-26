import { useForm } from "react-hook-form";
import type { CajaDTO, Variacion } from "../../../types"
import { inputStyle, inputStyleDisabled } from "../../../utils/const";
import { AiFillLock } from "react-icons/ai";
import { useEffect } from "react";

interface ModalEditProps {
    data: CajaDTO | null;
    cancel: () => void;
    confirm: (update: CajaDTO) => void;
}
export const ModalEdit: React.FC<ModalEditProps> = ({ cancel, confirm, data }) => {
    if (!data) return null

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<CajaDTO>({ defaultValues: data })
    const onSubmit = (formData: CajaDTO) => {
        confirm(formData)
    }

    useEffect(() => {
        if (data?.fecha) {
            const fechaFormateada = new Date(data.fecha).toISOString().split("T")[0];
            setValue("fecha", fechaFormateada);
        }
    }, [data, setValue]);

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
                            className={inputStyle}
                        />
                        {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha.message}</p>}
                    </div>

                    <div>
                        <label className="flex items-center gap-1 text-sm font-medium text-[var(--text-200)]">Legajo
                            <AiFillLock size={16} className="text-gray-400" title="Campo bloqueado" />
                        </label>
                        {/*  <input
                            type="number"
                            min={0}
                            {...register("empleado", {
                                required: "El legajo es obligatorio",
                                min: { value: 0, message: "No puede ser negativo" },
                            })}
                            className={`${inputStyle}`}
                        /> */}
                        <div className={`${inputStyleDisabled} text-[var(--accent-200)]`}>{data.empleado}</div>
                        {errors.empleado && <p className="text-red-500 text-sm">{errors.empleado.message}</p>}
                    </div>

                    <div>
                        <label className="flex items-center gap-1 text-sm font-medium text-[var(--text-200)]">
                            Nombre y apellido
                            <AiFillLock size={16} className="text-gray-400" title="Campo bloqueado" />
                        </label>
                        {/*    <input
                            type="text"
                            {...register("nombre_empleado", { required: "Este campo es obligatorio" })}
                            className={`${inputStyleDisabled}`}
                        /> */}
                        <div className={`${inputStyleDisabled} text-[var(--accent-200)]`}>{data.nombre_empleado}</div>
                        {errors.nombre_empleado && <p className="text-red-500 text-sm">{errors.nombre_empleado.message}</p>}
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
                            {...register("num_variacion", {
                                required: "Este campo es obligatorio",
                                min: { value: 0, message: "Debe ser 0 o mayor" },
                            })}
                            className={`${inputStyle}`}
                        />
                        {errors.num_variacion && (
                            <p className="text-red-500 text-sm">{errors.num_variacion.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Tipo de variación</label>
                        <input
                            type="text"
                            {...register("tipo_variacion", { required: "Campo requerido" })}
                            className={`${inputStyle}`}
                        />
                        {errors.tipo_variacion && (
                            <p className="text-red-500 text-sm">{errors.tipo_variacion.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--text-200)]">Sobrante</label>
                        <input
                            type="number"
                            min={0}
                            {...register("sobrante", {
                                valueAsNumber: true,
                                required: "Este campo es obligatorio",
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
                                required: "Este campo es obligatorio",
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
            </form >
        </div >
    )
}