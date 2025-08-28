import { useEffect, useState } from "react"
import axios from "axios";
import { API_URL } from "../../service/connection";
import { useParams } from "react-router-dom";

interface ValeDTO {
    id: number;
    empleado: string;
    fecha: string;
    firma_empleado: string;
    importe: string | number;
    turno: string;
    usuario_nombre: string;
    created_at: string;
    concepto?: string;
    detalle?: string;
    legajo_usuario: number;
    nombre_empleado: string;
}

export const PrintVale = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<ValeDTO | null>(null)
    const [loading, setLoading] = useState<boolean>(false);

    const fetchVale = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/vales/${id}`, {
                withCredentials: true
            })
            console.log(res.data)
            // Actualizar para manejar la estructura correcta
            if (res.data.success && res.data.data) {
                setData(res.data.data)
            } else {
                setData(null)
            }
        } catch (error) {
            console.error("Error al obtener el vale");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVale()
    }, []);

    // Auto-print y cerrar ventana
    useEffect(() => {
        if (data && !loading) {
            const timer = setTimeout(() => {
                window.print()
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [data, loading])

    // Cerrar ventana después de imprimir o cancelar
    useEffect(() => {
        const handleAfterPrint = () => {
            setTimeout(() => {
                window.close();
            }, 1000);
        };

     /*    const handleBeforeUnload = () => {
            setTimeout(() => {
                window.close();
            }, 1000);
        };
 */
        window.addEventListener('afterprint', handleAfterPrint);

        let printCancelTimer: number;

        const originalPrint = window.print;
        window.print = function () {
            if (printCancelTimer) {
                clearTimeout(printCancelTimer);
            }

            printCancelTimer = setTimeout(() => {
                window.close();
            }, 3000);

            originalPrint.call(window);
        };

        return () => {
            window.removeEventListener('afterprint', handleAfterPrint);
            if (printCancelTimer) {
                clearTimeout(printCancelTimer);
            }
            window.print = originalPrint;
        };
    }, []);

    if (loading) {
        return <div className="text-center p-4">Cargando...</div>;
    }

    if (!data) {
        return <div className="text-center p-4">No se encontraron datos</div>;
    }

    // Formatear fecha
    const fechaFormateada = new Date(data.fecha).toLocaleDateString('es-AR');

    const formatImporte = (importe: string | number) => {
        return parseFloat(importe.toString()).toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    };

    const abreviarTurno = (turno: string) => {
        const turnoLower = turno.toLowerCase();
        if (turnoLower.includes('mañana') || turnoLower.includes('manana')) return 'M';
        if (turnoLower.includes('tarde')) return 'T';
        if (turnoLower.includes('noche')) return 'N';
        return turno.charAt(0).toUpperCase();
    };

    return (
        <div className="bg-white text-black p-4 font-mono text-sm mx-auto flex flex-col items-center justify-center leading-tight" style={{ width: '58mm', minHeight: '100mm' }}>
            {/* Header */}
            <div className="text-center mb-4 border-b border-black pb-2">
                <div className="text-xs mb-1">Bingo Oasis</div>
                <div className="font-bold text-sm">VALE</div>
                <div className="text-center text-xs font-bold">N° {data.id}</div>
            </div>
            {/* Info Principal en 3 columnas */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                <div className="text-center">
                    <div className="font-bold mb-1">FECHA</div>
                    <div className="border-b border-dotted border-black pb-1">{fechaFormateada}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold mb-1">TURNO</div>
                    <div className="border-b border-dotted border-black pb-1">{abreviarTurno(data.turno)}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold mb-1">LEGAJO</div>
                    <div className="border-b border-dotted border-black pb-1">{data.empleado}</div>
                </div>
            </div>
            {/* Empleado */}
            <div className="mb-4 border-black pt-2">
                <div className="font-bold text-xs mb-2 text-center">NOMBRE DEL EMPLEADO</div>
                <div className="text-center text-sm font-bold border-black pb-1">
                    {data.nombre_empleado}
                </div>
            </div>
            {/* Importe destacado */}
            <div className="mb-4 pt-2">
                <div className="font-bold text-xs mb-2 text-center">IMPORTE</div>
                <div className="text-center text-2xl">
                    <div className="border-2 border-black p-3">
                        {formatImporte(data.importe)}
                    </div>
                </div>
            </div>

            {/* Firmas y Legajos */}
            <div className="border-t border-dotted border-black pt-2">
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="text-center">
                        <div className="border-b border-dotted border-black pb-12 mb-1 h-6"></div>
                        <div className="font-bold mb-2">FIRMA DEL EMPLEADO</div>
                        <div className="border-b border-dotted border-black pb-1 mb-1">
                            {data.empleado}
                        </div>
                        <div className="font-bold text-xs">LEGAJO</div>
                    </div>
                    <div className="text-center">
                        <div className="border-b border-dotted border-black pb-12 mb-1 h-6"></div>
                        <div className="font-bold mb-2">FIRMA DEL RESPONSABLE</div>
                        <div className="border-b border-dotted border-black pb-1 mb-1">
                            {data.legajo_usuario}
                        </div>
                        <div className="font-bold text-xs">LEGAJO</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4 text-xs border-black pt-2">
                <div>Sistema de Vales v1.0</div>
                <div>{new Date().toLocaleDateString()}</div>
            </div>
        </div>
    )
}