export const getEstadoNombre = (estadoId: number | string) => {
    const estados: Record<string, string> = {
        "1": "En revisión",
        "2": "Descontado",
        "3": "Anulado",
        "4": "Eliminado"
    };

    return estados[String(estadoId)] || "Desconocido";
};