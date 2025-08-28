import type { FC } from "react";
import { useState } from "react";
import { SignatureComponent } from "../components/vales/SignatureComponentV1";
import { API_URL } from "../../../service/connection";
import { toast } from "react-toastify";

interface Props {
    id?: string;
    valeId: number;//id del vale que se esta actualizando en cuestion
    success: () => void
}

export const ModalViewSignature: FC<Props> = ({ id, success, valeId }) => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<boolean>(false)

    const successId = async (idSignature: string) => {
        console.log('ID de firma obtenido:', idSignature);

        if (!valeId) {
            toast.error("Error: No se encontró el ID del vale");
            return;
        }

        setUpdating(true);
        try {
            const response = await fetch(`${API_URL}/vales/${valeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    firma_empleado: idSignature
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar la firma');
            }

            const result = await response.json();
            console.log('Vale actualizado:', result);

            toast.success("Firma actualizada correctamente");
            success(); // Llamar al success del padre

        } catch (error) {
            console.error('Error al actualizar la firma:', error);
            toast.error(`Error al actualizar la firma`);
        } finally {
            setUpdating(false);
        }
    };

    if (!id) {
        return (
            <div className="text-center text-[var(--accent-100)] py-4">
                {updating && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-600 font-medium">
                            Actualizando firma del vale...
                        </p>
                    </div>
                )}
                <SignatureComponent existingSignature={id} onSuccess={successId} />
            </div>
        );
    }

    const url = `https://drive.google.com/file/d/${id}/preview`;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {loading && (
                <div className="mb-2 text-sm text-gray-500">Cargando firma...</div>
            )}
            <iframe
                src={url}
                width="400"
                height="200"
                allow="autoplay"
                className="rounded border shadow-sm"
                title="Firma del empleado"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />

            {!loading && (
                <div className="mt-4 text-center">
                    <p className="text-green-600 font-medium mb-2">
                        Firma cargada correctamente
                    </p>
                    
                    {/* Botón para reemplazar firma */}
                    {/*     <button
                        onClick={() => window.location.reload()} // O manejar el reemplazo de otra forma
                        className="px-4 py-2 text-sm bg-[var(--bg-200)] text-[var(--text-200)] border border-[var(--primary-300)] rounded-lg hover:bg-[var(--bg-300)] transition-colors"
                    >
                        Reemplazar firma
                    </button> */}
                </div>
            )}
        </div>
    );
};