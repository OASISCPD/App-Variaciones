import { useState, type FC } from "react"
import { useAuth } from "../../../context/AuthContext"
import { LoaderHover } from "../../../shared/Loader"
import { useForm } from "react-hook-form"
import { number } from "framer-motion"
import { inputStyle } from "../../../utils/const"
import { SelectTurnos } from "../components/vales/SelectTurnos"
import { SignatureComponent } from "../components/vales/SignatureComponent"
import axios from "axios"
import { API_URL } from "../../../service/connection"
import { createVale } from "../../../service/vales.service"
import { toast } from "react-toastify"

type ValeFormData = {
    empleado: string,
    turno: string,
    fecha: string,
    importe: number,
    firma_empleado: string,
    id_usuario?: number
}

interface ModalAddValeProps {
    openModal: (value: null) => void
}

export const ModalAddVale: FC<ModalAddValeProps> = ({ openModal }) => {
    const { user } = useAuth()
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<ValeFormData>();

    const onSubmit = async (data: ValeFormData) => {
        console.log('Formulario enviando...', data);
        try {
            setLoading(true);
            if (!user?.id) {
                // Puedes mostrar un error o evitar el envío
                alert("No hay usuario logueado");
                return;
            }
            //creamos body a enviar 
            const payload = {
                empleado: String(data.empleado).trim(),
                turno: data.turno,
                fecha: data.fecha,
                importe: Number(data.importe), // <-- CORRECTO
                firma_empleado: data.firma_empleado || "",
                id_usuario: user?.id
            };

            const vale = await createVale(payload)
            console.log('Vale Creado --->', vale)
            toast.success('Vale ceado correctamente');
            reset();
            openModal(null)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }


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
                            type="date"
                            {...register("fecha", { required: "La fecha es obligatoria" })}
                            className={inputStyle}
                        />
                        {errors.fecha && <p className="text-sm text-[var(--accent-100)]">{errors.fecha.message}</p>}
                    </div>
                    {/* Legajo */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Legajo</label>
                        <input
                            type="number"
                            {...register("empleado", {
                                required: "El legajo es obligatorio",
                                valueAsNumber: true,
                                min: { value: 0, message: "No puede ser menor a 0" }
                            })}
                            className={inputStyle}
                            placeholder="13763"
                        />
                        {errors.empleado && <p className="text-sm text-[var(--accent-100)]">{errors.empleado.message}</p>}
                    </div>

                    {/* Turnos */}
                    <SelectTurnos
                        value={watch("turno")}
                        onChange={v => setValue("turno", v, { shouldValidate: true })}
                        error={errors.turno?.message}
                        required
                    />
                    {/* Sobrante */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Importe</label>
                        <input
                            type="number"
                            step="0.01"
                            defaultValue={0}
                            {...register("importe", {
                                valueAsNumber: true,
                                min: { value: 0, message: "Debe ser mayor o igual a 0" }
                            })}
                            className={inputStyle}
                            placeholder="Importe"
                        />
                        {errors.importe && <p className="text-sm text-[var(--accent-100)]">{errors.importe.message}</p>}
                    </div>
                    {/* FIRMA */}
                    <SignatureComponent onSuccess={id => setValue("firma_empleado", id)} />

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
    )
}