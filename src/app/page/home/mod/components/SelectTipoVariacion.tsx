import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

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
            value: 'SOBRANTE',
            label: 'Sobrante',
            icon: TiArrowSortedUp,
            selectedColor: 'bg-[var(--primary-100)] hover:bg-[var(--primary-200)]'
        },
        {
            value: 'FALTANTE',
            label: 'Faltante',
            icon: TiArrowSortedDown,
            selectedColor: 'bg-[var(--accent-100)] hover:bg-red-600'
        }
    ];

    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-3 text-[var(--text-200)]">
                Tipo de Variación {required && <span className="text-[var(--accent-100)]">*</span>}
            </label>

            <div className="flex bg-[var(--bg-300)] rounded-lg p-1 mb-4">
                {opciones.map((opcion) => {
                    const isSelected = value === opcion.value;
                    const IconComponent = opcion.icon;

                    return (
                        <button
                            key={opcion.value}
                            type="button"
                            onClick={() => onChange(opcion.value)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${isSelected
                                ? `${opcion.selectedColor} text-white`
                                : 'text-[var(--text-200)] hover:bg-[var(--bg-200)] hover:text-[var(--text-100)]'
                                }`}
                        >
                            <IconComponent size={16} />
                            {opcion.label}
                        </button>
                    );
                })}
            </div>

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