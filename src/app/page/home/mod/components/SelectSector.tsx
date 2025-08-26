import React from 'react';
import { inputStyle } from '../../../../utils/const';

interface SelectSectorProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
}

export const SelectSector: React.FC<SelectSectorProps> = ({
    value,
    onChange,
    error,
    required = false
}) => {
    const sectores = [
        { value: '', label: 'Seleccionar sector...', disabled: true },
        { value: 'SALA', label: 'SALA' },
        { value: 'CAJAS', label: 'CAJAS' },
        { value: 'BINGO', label: 'BINGO' },
        { value: 'CPD', label: 'CPD' },
        { value: 'GASTRONOMIA', label: 'GASTRONOMIA' },
        { value: 'SISTEMAS', label: 'SISTEMAS' }
    ];

    return (
        <div className="w-full relative">
            <label className="block text-sm font-medium mb-1 text-[var(--text-200)]">
                Sector {required && <span className="text-[var(--accent-100)]">*</span>}
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${inputStyle} appearance-none bg-[var(--bg-200)] pr-10 ${error ? 'border-[var(--accent-100)] focus:ring-[var(--accent-100)]' : ''
                    }`}
            >
                {sectores.map((sector) => (
                    <option
                        key={sector.value}
                        value={sector.value}
                        disabled={sector.disabled || false}
                        className="bg-[var(--bg-200)] text-[var(--text-200)]"
                    >
                        {sector.label}
                    </option>
                ))}
            </select>

            {/* Icono de flecha personalizado */}
            <div className="absolute right-3 top-9 pointer-events-none">
                <svg className="w-4 h-4 text-[var(--text-100)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {error && (
                <p className="text-sm text-[var(--accent-100)] mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};