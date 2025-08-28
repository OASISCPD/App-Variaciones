import { useForm } from "react-hook-form";
import { inputStyle } from "../../../utils/const";
import { API_URL } from "../../../service/connection";
import { useState } from "react";
import { LoaderHover } from "../../../shared/Loader";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { createRegistro } from "../../../service/register.service";
import { getCurrentDateTime } from "../../../utils";
import { InputEmpleado } from "../../../shared/UI/InputEmpleado";
import { SelectTipoVariacion } from "./components/SelectTipoVariacion";
import { SelectSector } from "./components/SelectSector";

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
    const { user } = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        reset,
        watch, setValue,
        formState: { errors },
    } = useForm<VariacionFormData>({
        defaultValues: {
            fecha: getCurrentDateTime(),//valor por defecto,
            tipoVariacion: "",
        }
    });

    const onSubmit = async (data: VariacionFormData) => {
        console.log("Formulario enviado:", data);
        if (!data.empleado) {
            toast.warning('Falta el legajo del empleado')
            return
        }
        if (!data.tipoVariacion) {
            toast.warning('Debe seleccionar un sector')
            return
        }
        if (!data.detalle) {
            toast.warning('Debe seleccionar un tipo de variación')
            return
        }
        if (data.sobrante === 0 && data.faltante === 0) {
            toast.warning('El monto de sobrante o faltante debe ser mayor a 0')
            return
        }

        // Validar coherencia entre tipo de variación y montos
        if (data.detalle === 'SOBRANTE' && data.faltante > 0) {
            toast.warning('Si seleccionaste SOBRANTE, el campo faltante debe ser 0')
            return
        }
        if (data.detalle === 'FALTANTE' && data.sobrante > 0) {
            toast.warning('Si seleccionaste FALTANTE, el campo sobrante debe ser 0')
            return
        }
        try {
            setLoading(true)
            //1) CREAR CAJA
            const bodyCaja = {
                empleado: data.empleado,
                detalle: data.detalle,
                num_variacion: data.numeroVariacion,
                tipo_variacion: data.tipoVariacion,
                sobrante: data.sobrante || 0,
                faltante: data.faltante || 0,
                estado: 1,
                usuario: user?.id.toString()//esto deberia por session de la cookie
            };

            const resCaja = await fetch(`${API_URL}/cajas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyCaja)
            });

            if (!resCaja.ok) {
                const errorText = await resCaja.text();
                throw new Error(errorText || "Error al crear la caja");
            }

            const cajaCreada = await resCaja.json();
            console.log("Caja creada:", cajaCreada);

            // 2) Crear la variación usando el id de la caja
            const bodyVariacion: create_variacion = {
                fecha: data.fecha,
                turno: "Mañana", // o dinámico
                sector: data.tipoVariacion, // o dinámico
                usuario_id: user?.id || 0,
                tipo_variacion: data.detalle,
                monto: (data.sobrante || 0) > 0 ? data.sobrante : data.faltante,
                firma_empleado: "",
                firma_responsable: "",
                legajo_empleado: Number(data.empleado),
                legajo_responsable: Number(user?.usr), // o el que corresponda
                id_variacion: cajaCreada.id
            };

            const resVariacion = await fetch(`${API_URL}/variaciones`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyVariacion)
            });

            if (!resVariacion.ok) {
                const errorText = await resVariacion.text();
                throw new Error(errorText || "Error al crear la variación");
            }

            const variacionCreada = await resVariacion.json();
            console.log("Variación creada:", variacionCreada);
            //3 ) Crear registro de la accion(usa cajaCreada.id como cajas_id);
            const bodyRegistro = {
                usuario_id: Number(user?.id) || 0,
                cajas_id: Number(cajaCreada.id),
                accion: `Agrega variación a ${data.empleado}`,
                empleado_id: Number(data.empleado),
            }
            const registroCreado = await createRegistro(bodyRegistro);
            console.log("Registro creado:", registroCreado);
            toast.success("Variación creadas con éxito");
            reset();
            //aca se cerraria el modal
            openModal(null);
        } catch (error) {
            console.error("Error al guardar la variacion", error)
            toast.error("Error al guardar la variacion")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="space-y-6">
            {loading && (
                <LoaderHover />
            )}
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
                    {/* Reemplazar el input de legajo con: */}
                    <InputEmpleado
                        value={watch("empleado")}
                        onChange={(legajo) => setValue("empleado", (legajo))}
                        error={errors.empleado?.message}
                        required
                        placeholder="Buscar por legajo o nombre..."
                    />
                    {/* Reemplazar el textarea de detalle con el select: */}
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
                            {...register("numeroVariacion", {
                                required: "Este campo es obligatorio",
                                valueAsNumber: true,
                                min: { value: 0, message: "Debe ser mayor o igual a 0" }
                            })}
                            className={inputStyle}
                            placeholder="2985"
                        />
                        {errors.numeroVariacion && <p className="text-sm text-[var(--accent-100)]">{errors.numeroVariacion.message}</p>}
                    </div>
                    {/* Tipo Variación */}
                    {/* <div>
                        <label className="block text-sm font-medium mb-1">Tipo de Variación</label>
                        <input
                            {...register("tipoVariacion", { required: "Campo obligatorio" })}
                            className={inputStyle}
                            placeholder="Tipo de variación"
                        />
                        {errors.tipoVariacion && <p className="text-sm text-[var(--accent-100)]">{errors.tipoVariacion.message}</p>}
                    </div> */}
                    <SelectSector
                        value={watch("tipoVariacion")}
                        onChange={(sector) => setValue("tipoVariacion", sector)}
                        error={errors.tipoVariacion?.message}
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
