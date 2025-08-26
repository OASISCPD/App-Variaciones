import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../service/connection';
import { inputStyle } from '../../utils/const';
import axios from 'axios';

interface Empleado {
    legajo: string;
    nombre: string;
    apellido?: string;
    mail?: string;
    contacto_numero?: string;
}

interface ApiResponse {
    success: boolean;
    data: Empleado[];
    total: number;
}

interface InputEmpleadoProps {
    value: string;
    onChange: (legajo: string) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
}

export const InputEmpleado: React.FC<InputEmpleadoProps> = ({
    value,
    onChange,
    error,
    required = false,
    placeholder = "Buscar empleado..."
}) => {
    const [query, setQuery] = useState('');
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);
    const debounceRef = useRef<number>();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchEmpleados = async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setEmpleados([]);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get<ApiResponse>(`${API_URL}/empleados/search`, {
                params: { legajo: searchQuery },
                withCredentials: true
            });

            if (response.data.success) {
                setEmpleados(response.data.data || []);
            } else {
                setEmpleados([]);
            }
        } catch (error) {
            console.error('Error buscando empleados:', error);
            setEmpleados([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (query && !selectedEmpleado) {
                fetchEmpleados(query);
                setShowDropdown(true);
            } else {
                setEmpleados([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, selectedEmpleado]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setQuery(inputValue);

        // Si había un empleado seleccionado y empieza a escribir, lo deselecciona
        if (selectedEmpleado) {
            setSelectedEmpleado(null);
            onChange('');
        }

        if (/^\d+$/.test(inputValue)) {
            onChange(inputValue);
        }
    };

    const handleSelectEmpleado = (empleado: Empleado) => {
        setSelectedEmpleado(empleado);
        setQuery(''); // Limpiar el input
        onChange(empleado.legajo);
        setShowDropdown(false);
    };

    const handleRemoveSelection = () => {
        setSelectedEmpleado(null);
        setQuery('');
        onChange('');
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <label className="block text-sm font-medium mb-2 text-[var(--text-200)]">
                Empleado {required && <span className="text-[var(--accent-100)]">*</span>}
            </label>

            {/* Tarjeta del empleado seleccionado */}
            {selectedEmpleado && (
                <div className="mb-3 p-3 bg-[var(--bg-200)] border border-[var(--primary-300)] rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-[var(--primary-100)] text-white">
                                {selectedEmpleado.legajo}
                            </span>
                            <div>
                                <div className="font-semibold text-[var(--text-200)] text-xs sm:text-sm">
                                    {selectedEmpleado.nombre} {selectedEmpleado.apellido || ''}
                                </div>
                                {selectedEmpleado.mail && (
                                    <div className="text-xs hidden sm:block text-[var(--text-100)] opacity-70">
                                        {selectedEmpleado.mail}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleRemoveSelection}
                            className="p-1 hover:bg-[var(--bg-300)] rounded-full transition-colors"
                        >
                            <svg className="w-4 h-4 text-[var(--text-100)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Input solo se muestra si no hay empleado seleccionado */}
            {!selectedEmpleado && (
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className={`${inputStyle} pr-10 transition-all duration-200 ${showDropdown ? 'rounded-b-none border-[var(--primary-200)]' : ''
                            } ${error ? 'border-[var(--accent-100)] focus:ring-[var(--accent-100)]' : ''}`}
                        autoComplete="off"
                    />

                    {/* Icono de búsqueda o loader */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {loading ? (
                            <div className="animate-spin w-4 h-4 border-2 border-[var(--primary-100)] border-t-transparent rounded-full"></div>
                        ) : (
                            <svg className="w-4 h-4 text-[var(--text-100)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </div>
                </div>
            )}

            {/* Dropdown mejorado */}
            {showDropdown && empleados.length > 0 && !selectedEmpleado && (
                <div className="absolute z-50 w-full bg-[var(--bg-200)] border border-[var(--primary-300)] border-t-0 rounded-b-lg shadow-xl max-h-60 overflow-auto">
                    {empleados.map((empleado, index) => (
                        <button
                            key={empleado.legajo}
                            type="button"
                            onClick={() => handleSelectEmpleado(empleado)}
                            className={`w-full px-4 py-3 text-left hover:bg-[var(--bg-300)] focus:bg-[var(--bg-300)] focus:outline-none transition-colors duration-150 group ${index !== empleados.length - 1 ? 'border-b border-[var(--primary-300)]/20' : ''
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm border text-xs font-medium bg-[var(--primary-100)] text-white">
                                            {empleado.legajo}
                                        </span>
                                        <div>
                                            <div className="font-semibold text-[var(--text-200)] group-hover:text-[var(--text-100)]">
                                                {empleado.nombre} {empleado.apellido || ''}
                                            </div>
                                            {empleado.mail && (
                                                <div className="text-xs text-[var(--text-100)] opacity-70">
                                                    {empleado.mail}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <svg className="w-4 h-4 text-[var(--primary-200)] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Estado vacío */}
            {showDropdown && !loading && empleados.length === 0 && query.length >= 2 && !selectedEmpleado && (
                <div className="absolute z-50 w-full bg-[var(--bg-200)] border border-[var(--primary-300)] border-t-0 rounded-b-lg shadow-xl">
                    <div className="px-4 py-6 text-center text-[var(--text-100)]">
                        <svg className="mx-auto h-8 w-8 text-[var(--text-100)] opacity-50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-sm">No se encontraron empleados</p>
                        <p className="text-xs opacity-70 mt-1">Intenta con otro término de búsqueda</p>
                    </div>
                </div>
            )}

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