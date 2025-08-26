import React from "react";

interface SelectTurnosProps {
    value: string;
    onChange: (v: string) => void;
    error?: string;
    required?: boolean
}

const opciones = [
    { label: "Mañana", value: "mañana" },
    { label: "Tarde", value: "tarde" },
    { label: "Noche", value: "noche" },
];

export const SelectTurnos: React.FC<SelectTurnosProps> = ({ value, onChange, error, required }) => (
    <div>
        <label className="block text-sm font-medium mb-1">Turno</label>
        <div className="flex gap-2">
            {opciones.map((op) => (
                <button
                    type="button"
                    key={op.value}
                    className={`px-4 py-2 rounded border transition-all
            ${value === op.value
                            ? "border-[var(--primary-100)] bg-[var(--primary-100)] text-white font-semibold"
                            : "border-[var(--bg-300)] bg-[var(--bg-100)] text-[var(--text-200)]"}
          `}
                    onClick={() => onChange(op.value)}
                >
                    {op.label}
                </button>
            ))}
        </div>
        {((required && !value) || error) && (
            <p className="text-sm text-[var(--accent-100)]">
                {error || "El turno es obligatorio"}
            </p>
        )}
    </div>
);