import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface SelectTipoVariacionProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
}

export const SelectTipoVariacion: React.FC<SelectTipoVariacionProps> = ({
    value,
    onChange,
    error,
    required = false
}) => {
    const opciones = [
        {
            value: 'FALTANTE',
            label: 'FALTANTE',
            color: 'bg-red-500 hover:bg-red-600',
            selectedColor: 'bg-red-600 ring-2 ring-red-300',
            iconColor: 'text-red-100'
        },
        {
            value: 'SOBRANTE',
            label: 'SOBRANTE',
            color: 'bg-green-500 hover:bg-green-600',
            selectedColor: 'bg-green-600 ring-2 ring-green-300',
            iconColor: 'text-green-100'
        }
    ];

    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-3 text-[var(--text-200)]">
                Tipo de Variación {required && <span className="text-[var(--accent-100)]">*</span>}
            </label>

            <div className="grid grid-cols-2 gap-4">
                {opciones.map((opcion) => {
                    const isSelected = value === opcion.value;

                    return (
                        <button
                            key={opcion.value}
                            type="button"
                            onClick={() => onChange(opcion.value)}
                            className={`
                                relative p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none
                                ${isSelected
                                    ? `${opcion.selectedColor} border-transparent text-white transform scale-105 shadow-lg`
                                    : `border-[var(--primary-300)] bg-[var(--bg-200)] text-[var(--text-200)] hover:bg-[var(--bg-300)] hover:border-[var(--primary-200)] hover:shadow-md`
                                }
                            `}
                        >
                            <div className="flex flex-col items-center space-y-2">
                                <span className={`font-semibold text-xs ${isSelected ? 'text-white' : 'text-[var(--accent-200)]'}`}>
                                    {opcion.label}
                                </span>
                            </div>

                            {/* Checkmark cuando está seleccionado */}
                           {/*  {isSelected && (
                                <div className="absolute top-2 right-2">
                                    <div className="bg-white rounded-full p-1">
                                        <AiOutlineCheckCircle className="w-4 h-4 text-green-600" />
                                    </div>
                                </div>
                            )} */}
                        </button>
                    );
                })}
            </div>

            {/* Indicador de selección textual */}
          {/*   {value && (
                <div className="mt-3 p-2 bg-[var(--bg-300)] rounded-md border border-[var(--primary-300)]">
                    <p className="text-sm text-[var(--text-200)] text-center">
                        <span className="font-medium">Seleccionado:</span> {value}
                    </p>
                </div>
            )} */}

            {error && (
                <p className="text-sm text-[var(--accent-100)] mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};