import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import type { FC } from "react";
import type { ModalDataVale } from "../../../types";
import { inputStyle } from "../../../utils/const";
import { LoaderHover } from "../../../shared/Loader";
import { toast } from "react-toastify";
import { InputEmpleado } from "../../../shared/UI/InputEmpleado";
import { SelectTurnos } from "../components/vales/SelectTurnos";
import { API_URL } from "../../../service/connection";

interface FormData {
    fecha: string;
    empleado: string;
    turno: string;
    importe: number;
}

interface props {
    modalData: ModalDataVale;
    onSuccess: () => void;
    openModal: (data: any) => void;
}

export const ModalEditVale: FC<props> = ({ modalData, onSuccess, openModal }) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm<FormData>({
        mode: 'onChange'
    });

    // Precargar datos cuando el modal se abre
    useEffect(() => {
        if (modalData?.data) {
            const data = modalData.data;

            // Formatear fecha para datetime-local input
            const fechaFormatted = data.fecha
                ? new Date(data.fecha).toISOString().slice(0, 16)
                : new Date().toISOString().slice(0, 16);

            // Establecer valores por defecto
            reset({
                fecha: fechaFormatted,
                empleado: data.empleado || "",
                turno: data.turno || "",
                importe: parseFloat(data.importe?.toString() || "0"),
                /*  concepto: data.concepto || data.detalle || "" */
            });
        }
    }, [modalData, reset]);

    // Registrar campo empleado con validación
    useEffect(() => {
        register("empleado", {
            required: "El empleado es obligatorio"
        });
    }, [register]);

    const onSubmit = async (formData: FormData) => {
        console.log("Datos del formulario de edición:", formData);
        console.log("ID del vale a editar:", modalData.data?.id);
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/vales/${modalData.data?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    empleado: formData.empleado,
                    fecha: formData.fecha,
                    importe: formData.importe,
                    turno: formData.turno
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar la firma');
            }

            const result = await response.json();
            console.log('Vale actualizado:', result);

       /*      // Simular delay
            await new Promise(resolve => setTimeout(resolve, 1000)); */

            toast.success("Vale actualizado correctamente");
            onSuccess(); // Cerrar modal y refrescar lista

        } catch (error) {
            console.error("Error al actualizar vale:", error);
            toast.error("Error al actualizar el vale");
        } finally {
            setLoading(false);
        }
    };

    if (!modalData?.data) return null;

    return (
        <div className="space-y-6">
            {loading && <LoaderHover />}

            <div className="border-2 border-[var(--primary-300)] rounded-lg p-6 bg-[var(--bg-100)]">
                <div className="mb-4 text-center">
                    <h3 className="text-lg font-semibold text-[var(--text-200)]">
                        Editar Vale #{modalData.data.id}
                    </h3>
                    <p className="text-sm text-[var(--text-100)] mt-1">
                        Modifica los datos del vale seleccionado
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[var(--text-200)]">
                    {/* Fecha */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Fecha <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            {...register("fecha", {
                                required: "La fecha es obligatoria"
                            })}
                            className={inputStyle}
                        />
                        {errors.fecha && (
                            <p className="text-sm text-[var(--accent-100)] mt-1">
                                {errors.fecha.message}
                            </p>
                        )}
                    </div>

                    {/* Empleado */}
                    <InputEmpleado
                        value={watch("empleado")}
                        onChange={(legajo) => setValue("empleado", legajo, { shouldValidate: true })}
                        error={errors.empleado?.message}
                        required
                        placeholder="Buscar por legajo o nombre..."
                        initialLegajo={modalData?.data?.empleado || ""}
                    />

                    {/* Turnos */}
                    <SelectTurnos
                        value={watch("turno")}
                        onChange={(v) => setValue("turno", v, { shouldValidate: true })}
                        error={errors.turno?.message}
                        required
                    />

                    {/* Importe */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Importe <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            {...register("importe", {
                                required: "El importe es obligatorio",
                                valueAsNumber: true,
                                min: { value: 0, message: "Debe ser mayor o igual a 0" }
                            })}
                            className={inputStyle}
                            placeholder="0.00"
                        />
                        {errors.importe && (
                            <p className="text-sm text-[var(--accent-100)] mt-1">
                                {errors.importe.message}
                            </p>
                        )}
                    </div>

                    {/* Información adicional */}
                    <div className="bg-[var(--bg-200)] p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-[var(--text-100)] mb-2">
                            Información del vale
                        </h4>
                        <div className="text-xs text-[var(--text-100)] space-y-1">
                            <p><strong>Empleado actual:</strong> {modalData.data.nombre_empleado}</p>
                            <p><strong>Creado:</strong> {new Date(modalData.data.created_at).toLocaleString('es-AR')}</p>
                            <p><strong>Estado de firma:</strong> {modalData.data.firma_empleado ? 'Firmado' : 'Sin firmar'}</p>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-[var(--primary-100)] text-[var(--text-100)] font-semibold py-2.5 px-4 rounded-lg hover:bg-[var(--primary-200)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? "Actualizando..." : "Actualizar Vale"}
                        </button>
                        <button
                            type="button"
                            onClick={() => openModal(null)}
                            disabled={loading}
                            className="flex-1 bg-[var(--bg-300)] text-[var(--text-200)] font-medium py-2.5 px-4 rounded-lg hover:bg-[var(--bg-400)] disabled:opacity-50 disabled:cursor-not-allowed border border-[var(--primary-200)] transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};