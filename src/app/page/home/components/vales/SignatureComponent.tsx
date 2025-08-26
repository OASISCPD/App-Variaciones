import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
import { API_URL } from "../../../../service/connection";
import { LoaderHover } from "../../../../shared/Loader";
import { inputStyle } from "../../../../utils/const";

interface SignatureComponentProps {
    onSuccess: (id: string) => void;
}

// Hook para detectar ancho de pantalla
function useCanvasSize() {
    if (typeof window === "undefined") return { width: 350, height: 120 };
    const w = window.innerWidth;
    if (w < 640) return { width: 250, height: 100 };      // mobile
    if (w < 1024) return { width: 320, height: 110 };     // tablet
    return { width: 350, height: 120 };                   // desktop
}

export const SignatureComponent: React.FC<SignatureComponentProps> = ({ onSuccess }) => {

    // ...existing code...
    const size = useCanvasSize();
    const [loading, setLoading] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const signatureRef = useRef<SignatureCanvas>(null);
    const [success, setSuccess] = useState(false);

    const handleClear = () => {
        signatureRef.current?.clear();
        setHasSignature(false);
    };

    const handleSave = async () => {
        if (!signatureRef.current) return;
        if (signatureRef.current.isEmpty()) {
            toast.error("Debe firmar antes de guardar");
            return;
        }
        const dataUrl = signatureRef.current.toDataURL("image/png");
        const file = await base64ToFile(dataUrl, "signature.png");
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
            setSuccess(true)
            handleClear();
        } catch (error) {
            toast.error("Ocurrió un error al guardar la firma");
        } finally {
            setLoading(false);
        }
    };

    const base64ToFile = (base64Data: string, filename: string): Promise<File> => {
        return new Promise((resolve) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.src = base64Data;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx!.fillStyle = "#FFFFFF";
                ctx!.fillRect(0, 0, canvas.width, canvas.height);
                ctx!.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(new File([blob], filename, { type: "image/png" }));
                    }
                }, "image/png");
            };
        });
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <label className="block text-sm font-medium mb-1">Firma</label>
            {loading && <LoaderHover />}
            <SignatureCanvas
                ref={signatureRef}
                penColor="black"
                canvasProps={{
                    width: size.width,
                    height: size.height,
                    className: "border rounded border-[var(--primary-300)] bg-white/40",
                }}
                onBegin={() => setHasSignature(true)}
            />
            {success && (
                <h1 className="text-green-600 font-bold text-base">¡Firma guardada correctamente!</h1>
            )}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={handleClear}
                    className={inputStyle}
                    disabled={loading}
                >
                    Limpiar
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className={inputStyle}
                    disabled={loading || !hasSignature}
                >
                    {loading ? "Guardando..." : "Guardar firma"}
                </button>
            </div>
        </div>
    );
};
