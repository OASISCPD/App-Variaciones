import { useEffect, useState } from "react"
import type { VariacionDTO } from "../home/mod/ModalVariacionView"
import axios from "axios";
import { API_URL } from "../../service/connection";
import { useParams } from "react-router-dom";

export const PrintPage = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<VariacionDTO | null>(null)
    const [loading, setLoading] = useState<boolean>(false);


    const fetchVariacion = async () => {
        try {
            setLoading(true);
            // cambiar 1179 por el ID que necesites
            const res = await axios.get(`${API_URL}/variaciones/${id}`, {
                withCredentials: true
            })
            console.log(res.data)
            setData(res.data[0] || null)
        } catch (error) {
            console.error("Error al obtener la variacion");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVariacion()
    }, []);

    useEffect(() => {
        if (data && !loading) {
            //delay para asegurar q tengo todo por problemas de navegador externos a la app
            const timer = setTimeout(() => {
                window.print()
            }, 500)
            return () => clearTimeout(timer)
        }
    }), [data, loading]

    // Cerrar ventana después de imprimir o cancelar
    useEffect(() => {
        const handleAfterPrint = () => {
            setTimeout(() => {
                window.close();
            }, 1000); // Espera 1 segundo antes de cerrar
        };

        const handleBeforeUnload = () => {
            // Este se ejecuta cuando el usuario cancela la impresión
            setTimeout(() => {
                window.close();
            }, 1000);
        };

        // Agregar event listeners
        window.addEventListener('afterprint', handleAfterPrint);

        // Para detectar si se cancela la impresión, usamos un timeout
        let printCancelTimer: number;

        const originalPrint = window.print;
        window.print = function () {
            // Limpiar timer anterior si existe
            if (printCancelTimer) {
                clearTimeout(printCancelTimer);
            }

            // Timer para detectar cancelación (si no se ejecuta afterprint)
            printCancelTimer = setTimeout(() => {
                window.close();
            }, 3000); // Si no se imprime en 3 segundos, cerrar

            // Llamar al print original
            originalPrint.call(window);
        };

        // Cleanup
        return () => {
            window.removeEventListener('afterprint', handleAfterPrint);
            if (printCancelTimer) {
                clearTimeout(printCancelTimer);
            }
            // Restaurar print original
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

    // Agregar esta función antes del return
    const formatMonto = (monto: string | number) => {
        return parseFloat(monto.toString()).toLocaleString('es-AR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    };

    // Agregar esta función antes del return
    const abreviarTurno = (turno: string) => {
        const turnoLower = turno.toLowerCase();
        if (turnoLower.includes('mañana') || turnoLower.includes('manana')) return 'M';
        if (turnoLower.includes('tarde')) return 'T';
        if (turnoLower.includes('noche')) return 'N';
        return turno.charAt(0).toUpperCase(); // fallback: primera letra en mayúscula
    };

    return (
        <div className="bg-white text-black p-4 font-mono text-sm mx-auto flex flex-col items-center justify-center leading-tight" style={{ width: '58mm', minHeight: '100mm' }}>
            {/* Header */}
            <div className="text-center mb-4 border-b border-black pb-2">
                <div className="text-xs mb-1">Bingo Oasis</div>
                <div className="font-bold text-sm">VARIACIÓN DE CAJA</div>
                <div className="text-right text-xs font-bold">N° {data.id_variacion}</div>
            </div>

            {/* Info Principal en 3 columnas */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                <div className="text-center">
                    <div className="font-bold mb-1">FECHA</div>
                    <div className="border-b border-dotted border-black pb-1">{fechaFormateada}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold mb-1">TURNO</div>
                    <div className="border-b border-dotted border-black pb-1">{abreviarTurno(data.turno ?? '')}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold mb-1">SECTOR</div>
                    <div className="border-b border-dotted border-black pb-1">{data.sector}</div>
                </div>
            </div>

            {/* Empleado */}
            <div className="mb-4  border-black pt-2">
                <div className="font-bold text-xs mb-2 text-center">NOMBRE DEL EMPLEADO</div>
                <div className="text-center text-sm font-bold border-black pb-1">
                    {data.nombre_empleado}
                </div>
            </div>

            {/* Variación */}
            <div className="mb-4 pt-2">
                <div className="font-bold text-xs mb-2">VARIACIÓN</div>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <div className="w-6 h-6 border-2 border-black mr-2 flex items-center justify-center">
                            {data.tipo_variacion === 'FALTANTE' && (
                                <span className="text-xs font-bold leading-none">✕</span>
                            )}
                        </div>
                        <span className={`text-xs ${data.tipo_variacion === 'FALTANTE' ? 'font-bold' : ''}`}>
                            FALTANTE
                        </span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 border-2 border-black mr-2 flex items-center justify-center">
                            {data.tipo_variacion === 'SOBRANTE' && (
                                <span className="text-xs font-bold leading-none">✕</span>
                            )}
                        </div>
                        <span className={`text-xs ${data.tipo_variacion === 'SOBRANTE' ? 'font-bold' : ''}`}>
                            SOBRANTE
                        </span>
                    </div>
                </div>
                {/* Monto destacado */}
                <div className="text-center text-2xl">
                    <div className="border-2 border-black p-2">
                        ${formatMonto(data.monto)}
                    </div>
                </div>
            </div>
            {/* Firmas y Legajos */}
            <div className="border-t border-dotted border-black pt-2">
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="text-center">
                        <div className="border-b border-dotted border-black pb-12 mb-1 h-6">

                        </div>
                        <div className="font-bold mb-2">FIRMA DEL EMPLEADO</div>
                        <div className="border-b border-dotted border-black pb-1 mb-1">
                            {data.legajo_empleado}
                        </div>
                        <div className="font-bold text-xs">LEGAJO</div>
                    </div>
                    <div className="text-center">
                        <div className="border-b border-dotted border-black pb-12 mb-1 h-6">
                        </div>
                        <div className="font-bold mb-2">FIRMA DEL RESPONSABLE</div>
                        <div className="border-b border-dotted border-black pb-1 mb-1">
                            {data.legajo_responsable}
                        </div>
                        <div className="font-bold text-xs">LEGAJO</div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="text-center mt-4 text-xs  border-black pt-2">
                <div>Sistema de Variaciones v1.0</div>
                <div>{new Date().toLocaleDateString()}</div>
            </div>
        </div>
    )
}