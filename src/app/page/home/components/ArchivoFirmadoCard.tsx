import { BiDownload } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { formateDateTime } from "../../../utils";
import { GrDocumentText } from "react-icons/gr";
import { useState } from "react";
import { ModalQuestionDelete } from "../mod/ModalDeleteFirma";
import { ContainerModals } from "../../../shared/ContainerModals";
import { API_URL } from "../../../service/connection";
import { toast } from "react-toastify";

interface ArchivoFirmadoCardProps {
    url: string;
    fechaSubida?: string; // opcional, para mostrar la fecha
    onDelete: () => void;
    id: number;
    type: string;
}

export const ArchivoFirmadoCard: React.FC<ArchivoFirmadoCardProps> = ({
    fechaSubida,
    onDelete,
    id,
    type,
    url
}) => {
    const [modal, setModal] = useState<boolean>(false);

    const clickDelete = () => {
        console.log('delete', id);
        setModal(true)
    }
    const handleDownload = () => {
        const driveUrl = `https://drive.google.com/uc?export=download&id=${url}`
        window.open(driveUrl, "_blank")
    }
    const deleteFirma = async () => {
        try {
            const res = await fetch(`${API_URL}/${type}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firma_empleado: null }) // o firma_empleado: null según tu backend
            });

            if (!res.ok) throw new Error("Error al eliminar firma");

            toast.success("Firma eliminada con éxito");

            onDelete()
        } catch (error) {
            toast.error("No se pudo eliminar la firma");
            console.error(error);
        }
    };
    return (
        <>
            <div className="flex items-center justify-between  shadow-sm">
                {/* Info del archivo */}
                <div className="flex flex-col bg-[var(--bg-300)]  rounded-lg p-2">
                    <div className="flex items-center gap-2">
                        <GrDocumentText className="text-blue-600 text-sm" />
                        <span className="truncate max-w-[140px] text-[--text-100] font-medium text-xs">
                            {type === 'vales' ? 'vale' : 'variación'}_{id}_firmado.pdf
                        </span>
                    </div>
                    {fechaSubida && (
                        <span className="text-[11px] text-[var(--text-200)]">Subido • {formateDateTime(fechaSubida)}</span>
                    )}
                </div>
                {/* Acciones */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDownload}
                        className="text-blue-600 p-1 hover:text-blue-800"
                        title="Descargar archivo"
                    >
                        <BiDownload className="text-lg" />
                    </button>
                    <button
                        onClick={() => clickDelete()}
                        className="text-red-500 p-1 hover:text-red-700"
                        title="Eliminar archivo"
                    >
                        <FaTimes size={14} />
                    </button>
                </div>

            </div>
            {modal && (
                <ContainerModals>
                    <ModalQuestionDelete item={null} subText="¿Estás seguro de que deseas eliminar este archivo?" text="Eliminar firma" cancel={() => setModal(false)} confirm={() => deleteFirma()} />
                </ContainerModals>
            )}
        </>

    );
};