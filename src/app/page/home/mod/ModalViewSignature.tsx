import type { FC } from "react";
import { useState } from "react";

interface Props {
    id?: string;
}

export const ModalViewSignature: FC<Props> = ({ id }) => {
    const [loading, setLoading] = useState(true);
    console.log(id);
    
    if (!id) {
        return (
            <div className="text-center text-[var(--accent-100)] py-4">
                No se encontró la firma.
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
                className="rounded border"
                title="Firma"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
            {!loading && (
                <p className="mt-2 text-green-600 font-medium">Firma cargada correctamente</p>
            )}
        </div>
    );
};