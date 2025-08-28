import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../../../service/connection";
import { LoaderHover } from "../../../../shared/Loader";
import { HiOutlineUpload } from "react-icons/hi";

interface SignatureComponentProps {
    onSuccess: (id: string) => void;
    existingSignature?: string; // ID de firma existente
}

export const SignatureComponent: React.FC<SignatureComponentProps> = ({
    onSuccess,
    existingSignature
}) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Función para subir archivo desde dispositivo
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validar tipo de archivo
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Solo se permiten archivos PNG, JPG, JPEG o PDF");
            return;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("El archivo no debe superar los 5MB");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("archivo", file);

            const response = await fetch(`${API_URL}/drive/upload`, {
                method: "POST",
                body: formData,
                credentials: "include",
                mode: "cors",
            });

            if (!response.ok) throw new Error("Error al cargar la imagen en la API");

            const imageId: any = await response.json();
            onSuccess(imageId.fileId);
            toast.success("Firma guardada correctamente");
            setSuccess(true);
        } catch (error) {
            toast.error("Ocurrió un error al guardar la firma");
        } finally {
            setLoading(false);
        }
    };

    // Si ya existe una firma, mostrar opción de reemplazar
    if (existingSignature && !success) {
        return (
            <div className="flex flex-col items-center gap-4 p-4 bg-[var(--bg-200)] rounded-lg">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-[var(--text-200)] mb-2">
                        Firma existente
                    </h3>
                    <p className="text-sm text-[var(--text-100)] mb-4">
                        Este vale ya tiene una firma registrada.
                    </p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="px-4 py-2 bg-[var(--primary-100)] text-white rounded-lg hover:bg-[var(--primary-200)] transition-colors"
                    >
                        Reemplazar firma
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {loading && <LoaderHover />}

            {success ? (
                <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-green-600 mb-2">
                        ¡Firma guardada correctamente!
                    </h3>
                    <p className="text-sm text-[var(--text-100)]">
                        La firma ha sido asociada al vale exitosamente.
                    </p>
                </div>
            ) : (
                <>
                    <label className="block text-sm font-medium mb-3 text-[var(--text-200)] text-center">
                        Subir Firma del Empleado
                    </label>

                    <div className="w-full max-w-md">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,application/pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-full p-8 border-2 border-dashed border-[var(--primary-300)] rounded-lg text-center hover:bg-[var(--bg-200)] hover:border-[var(--primary-200)] transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                }`}
                            disabled={loading}
                        >
                            <HiOutlineUpload
                                className="mx-auto mb-4 text-[var(--primary-300)]"
                                size={48}
                            />
                            <p className="text-lg font-medium text-[var(--text-200)] mb-2">
                                {loading ? "Subiendo archivo..." : "Seleccionar archivo de firma"}
                            </p>
                            <p className="text-sm text-[var(--text-100)] mb-2">
                                Haz clic aquí o arrastra tu archivo
                            </p>
                            <p className="text-xs text-[var(--text-100)] px-4 py-2 bg-[var(--bg-300)] rounded-md inline-block">
                                Formatos: PNG, JPG, JPEG, PDF • Máximo: 5MB
                            </p>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
