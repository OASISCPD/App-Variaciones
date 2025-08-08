import { useForm } from "react-hook-form";
import { inputStyle } from "../../../utils/const";

type VariacionFormData = {
    fecha: string;
    legajo: number;
    empleado: string;
    detalle: string;
    numeroVariacion: number;
    tipoVariacion: string;
    sobrante: number;
    faltante: number;
};

interface ModalAddProps {
    openModal: (value: null) => void;
}

export const ModalAdd: React.FC<ModalAddProps> = ({ openModal }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VariacionFormData>();

    const onSubmit = (data: VariacionFormData) => {
        console.log("Formulario enviado:", data);
        reset();
        openModal(null);
    };

    return (
        <div className="space-y-6">
            <div className="border-2 border-[var(--primary-300)] rounded-lg p-6 bg-[var(--bg-100)]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[var(--text-200)]">
                    {/* Fecha */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Fecha</label>
                        <input
                            type="date"
                            {...register("fecha", { required: "La fecha es obligatoria" })}
                            className={inputStyle}
                        />
                        {errors.fecha && <p className="text-sm text-[var(--accent-100)]">{errors.fecha.message}</p>}
                    </div>

                    {/* Legajo */}
                    <div>
                        <input
                            type="number"
                            {...register("legajo", {
                                required: "El legajo es obligatorio",
                                valueAsNumber: true,
                                min: { value: 0, message: "No puede ser menor a 0" }
                            })}
                            className={inputStyle}
                            placeholder="Legajo"
                        />
                        {errors.legajo && <p className="text-sm text-[var(--accent-100)]">{errors.legajo.message}</p>}
                    </div>

                    {/* Nombre */}
                    <div>
                        <input
                            {...register("empleado", { required: "El nombre es obligatorio" })}
                            className={inputStyle}
                            placeholder="Nombre y apellido"
                        />
                        {errors.empleado && <p className="text-sm text-[var(--accent-100)]">{errors.empleado.message}</p>}
                    </div>

                    {/* Detalle */}
                    <div>
                        <textarea
                            {...register("detalle")}
                            className={inputStyle}
                            placeholder="Detalle"
                        />
                    </div>

                    {/* N° Variación */}
                    <div>
                        <input
                            type="number"
                            {...register("numeroVariacion", {
                                required: "Este campo es obligatorio",
                                valueAsNumber: true,
                                min: { value: 0, message: "Debe ser mayor o igual a 0" }
                            })}
                            className={inputStyle}
                            placeholder="N° Variación"
                        />
                        {errors.numeroVariacion && <p className="text-sm text-[var(--accent-100)]">{errors.numeroVariacion.message}</p>}
                    </div>

                    {/* Tipo Variación */}
                    <div>
                        <input
                            {...register("tipoVariacion", { required: "Campo obligatorio" })}
                            className={inputStyle}
                            placeholder="Tipo de variación"
                        />
                        {errors.tipoVariacion && <p className="text-sm text-[var(--accent-100)]">{errors.tipoVariacion.message}</p>}
                    </div>

                    {/* Sobrante */}
                    <div>
                        <input
                            type="number"
                            step="0.01"
                            {...register("sobrante", {
                                valueAsNumber: true,
                                min: { value: 0, message: "Debe ser mayor o igual a 0" }
                            })}
                            className={inputStyle}
                            placeholder="Sobrante"
                        />
                        {errors.sobrante && <p className="text-sm text-[var(--accent-100)]">{errors.sobrante.message}</p>}
                    </div>

                    {/* Faltante */}
                    <div>
                        <input
                            type="number"
                            step="0.01"
                            {...register("faltante", {
                                valueAsNumber: true,
                                min: { value: 0, message: "Debe ser mayor o igual a 0" }
                            })}
                            className={inputStyle}
                            placeholder="Faltante"
                        />
                        {errors.faltante && <p className="text-sm text-[var(--accent-100)]">{errors.faltante.message}</p>}
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col items-center space-y-2 pt-4">
                        <button
                            type="submit"
                            className="w-full text-[var(--text-100)] font-semibold py-2 rounded"
                            style={{ backgroundColor: "var(--primary-100)" }}
                        >
                            Agregar
                        </button>
                        <button
                            type="button"
                            onClick={() => openModal(null)}
                            className="text-[var(--primary-100)] hover:underline text-sm"
                        >
                            Volver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
