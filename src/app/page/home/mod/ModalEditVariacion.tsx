import { useForm } from "react-hook-form";
import type { CajaDTO } from "../../../types"
import { inputStyle } from "../../../utils/const";
import { useEffect, useState } from "react";
import { InputEmpleado } from "../../../shared/UI/InputEmpleado";
import { SelectTipoVariacion } from "./components/SelectTipoVariacion";
import { SelectSector } from "./components/SelectSector";
import { LoaderHover } from "../../../shared/Loader";
import { toast } from "react-toastify";

interface ModalEditProps {
    data: CajaDTO | null;
    cancel: () => void;
    confirm: (update: CajaDTO) => void;
}
export const ModalEdit: React.FC<ModalEditProps> = ({ cancel, confirm, data }) => {
    if (!data) return null

    const [loading, setLoading] = useState(false);
    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm<CajaDTO>({ defaultValues: data })

    const onSubmit = async (formData: CajaDTO) => {
        console.log("Datos del formulario:", formData);

        // Validaciones personalizadas
        if (!formData.empleado) {
            toast.warning('Falta el legajo del empleado');
            return;
        }
        if (!formData.tipo_variacion) {
            toast.warning('Debe seleccionar un sector');
            return;
        }
        if (!formData.detalle) {
            toast.warning('Debe seleccionar un tipo de variación');
            return;
        }
        if (formData.sobrante === 0 && formData.faltante === 0) {
            toast.warning('El monto de sobrante o faltante debe ser mayor a 0');
            return;
        }

        // Validar coherencia entre tipo de variación y montos
        if (formData.detalle === 'SOBRANTE' && formData.faltante > 0) {
            toast.warning('Si seleccionaste SOBRANTE, el campo faltante debe ser 0');
            return;
        }
        if (formData.detalle === 'FALTANTE' && formData.sobrante > 0) {
            toast.warning('Si seleccionaste FALTANTE, el campo sobrante debe ser 0');
            return;
        }

        setLoading(true);
        try {
            confirm(formData);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (data?.fecha) {
            const fechaFormateada = new Date(data.fecha).toISOString().slice(0, 16);
            setValue("fecha", fechaFormateada);
        }
    }, [data, setValue]);

    return (
        <div className="space-y-6">
            {loading && <LoaderHover />}
            <div className="border-2 border-[var(--primary-300)] rounded-lg p-6 bg-[var(--bg-100)]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[var(--text-200)]">
                    {/* Fecha */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Fecha</label>
                        <input
                            type="datetime-local"
                            {...register("fecha", { required: "La fecha es obligatoria" })}
                            className={inputStyle}
                        />
                        {errors.fecha && <p className="text-sm text-[var(--accent-100)]">{errors.fecha.message}</p>}
                    </div>

                    {/* Empleado */}
                    <InputEmpleado
                        value={watch("empleado")}
                        onChange={(legajo) => setValue("empleado", legajo)}
                        error={errors.empleado?.message}
                        required
                        placeholder="Buscar por legajo o nombre..."
                        initialLegajo={data.empleado}
                    />

                    {/* Tipo de Variación */}
                    <SelectTipoVariacion
                        value={watch("detalle")}
                        onChange={(tipo) => setValue("detalle", tipo)}
                        error={errors.detalle?.message}
                        required
                    />

                    {/* N° Variación */}
                    <div>
                        <label className="block text-sm font-medium mb-1">N° Variacion</label>
                        <input
                            type="number"
                            {...register("num_variacion", {
                                required: "Este campo es obligatorio",
                                valueAsNumber: true,
                                min: { value: 0, message: "Debe ser mayor o igual a 0" }
                            })}
                            className={inputStyle}
                            placeholder="2985"
                        />
                        {errors.num_variacion && <p className="text-sm text-[var(--accent-100)]">{errors.num_variacion.message}</p>}
                    </div>

                    {/* Sector */}
                    <SelectSector
                        value={watch("tipo_variacion")}
                        onChange={(sector) => setValue("tipo_variacion", sector)}
                        error={errors.tipo_variacion?.message}
                        required
                    />

                    {/* Sobrante */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Sobrante <span className="text-green-400 text-[10px] sm:text-xs">(monto)</span></label>
                        <input
                            type="number"
                            step="0.01"
                            defaultValue={0}
                            disabled={watch("detalle") === "FALTANTE"}
                            {...register("sobrante", {
                                valueAsNumber: true,
                                min: { value: 0, message: "Debe ser mayor o igual a 0" }
                            })}
                            className={`${inputStyle} text-green-500 ${watch("detalle") === "FALTANTE" ? "opacity-50 cursor-not-allowed" : ""}`}
                            placeholder="Sobrante"
                        />
                        {errors.sobrante && <p className="text-sm text-[var(--accent-100)]">{errors.sobrante.message}</p>}
                    </div>

                    {/* Faltante */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Faltante <span className="text-red-400 text-[10px] sm:text-xs">(monto)</span></label>
                        <input
                            type="number"
                            step="0.01"
                            defaultValue={0}
                            disabled={watch("detalle") === "SOBRANTE"}
                            {...register("faltante", {
                                valueAsNumber: true,
                                min: { value: 0, message: "Debe ser mayor o igual a 0" }
                            })}
                            className={`${inputStyle} text-red-500 ${watch("detalle") === "SOBRANTE" ? "opacity-50 cursor-not-allowed" : ""}`}
                            placeholder="Faltante"
                        />
                        {errors.faltante && <p className="text-sm text-[var(--accent-100)]">{errors.faltante.message}</p>}
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col items-center space-y-2 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full text-[var(--text-100)] font-semibold py-2 rounded disabled:opacity-50"
                            style={{ backgroundColor: "var(--primary-100)" }}
                        >
                            {loading ? "Guardando..." : "Guardar Cambios"}
                        </button>
                        <button
                            type="button"
                            onClick={cancel}
                            disabled={loading}
                            className="text-[var(--primary-100)] hover:underline text-sm disabled:opacity-50"
                        >
                            Volver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}