import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../../service/connection";
import { LoaderHover } from "../../../shared/Loader";
import { HiOutlineUpload } from "react-icons/hi";

interface SignatureComponentProps {
    onSuccess: (id: string) => void;
}

export const SignatureComponentV2: React.FC<SignatureComponentProps> = ({
    onSuccess
}) => {
    const [loading, setLoading] = useState(false);
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
            toast.success("Firma guardada correctamente");
            onSuccess(imageId.fileId);
        } catch (error) {
            toast.error("Ocurrió un error al guardar la firma");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {loading && <LoaderHover />}

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
                    className={`w-full p-1 border border-dashed border-gray-600 rounded-lg text-center hover:bg-[var(--bg-200)] hover:border-[var(--primary-200)] transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                    disabled={loading}
                >
                    <HiOutlineUpload
                        className="mx-auto mb-1 text-[var(--text-200)]"
                        size={16}
                    />
                    <p className="text-[10px] font-medium text-[var(--text-200)] mb-1">
                        {loading ? "Subiendo archivo..." : "Subir archivo firmado"}
                    </p>
                    <p className="text-[10px] text-gray-400 rounded-md inline-block">
                        PNG, JPG, PDF (máx: 10MB)
                    </p>
                </button>
            </div>
        </div>
    );
};
