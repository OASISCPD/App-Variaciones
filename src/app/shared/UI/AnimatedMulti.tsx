import Select from "react-select";
import { BiChevronDown } from "react-icons/bi";


const customStyles = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: "#1C1C1C",
        borderColor: "#434343",
        color: "var(--text-100)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "0.375rem", // rounded-md
        padding: "0.25rem 0.75rem", // py-2 px-3
        minHeight: "40px",
        boxShadow: "none",
        outline: "none",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
            borderColor: "var(--primary-200)",
        },
        display: "flex",
        alignItems: "center",
    }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: "#1C1C1C",
        borderRadius: "0.375rem",
        padding: "4px 6px",
        width: "100%",
        display: "flex", // <- clave
        justifyContent: "space-between", // texto a la izquierda, ❌ a la derecha
        alignItems: "center", // alineación vertical
    }),

    multiValueLabel: (provided: any) => ({
        ...provided,
        color: "var(--text-100)",
        fontSize: "0.75rem",
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color: "#ff4d4d",
        marginLeft: "8px", // separación entre texto y ❌
        ":hover": {
            backgroundColor: "#ff4d4d",
            color: "var(--text-100)",
        },
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: "var(--text-100)",
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: "#292e3b",
        color: "var(--text-100)",
        zIndex: 50,
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#434343" : "#2b2b2b",
        color: "var(--text-100)",
        fontSize: "0.875rem",
        ":active": {
            backgroundColor: "#414654",
        },
    }),
    input: (provided: any) => ({
        ...provided,
        color: '#FFFFFF'
    }),
    dropdownIndicator: () => ({
        display: "none",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
};

export type AreaDTO = {
    label: string;
    value: string
}
interface OptionType {
    data: AreaDTO[]
    area: string
    placeholder?: string
    onChange: (selected: AreaDTO[]) => void;
}
export const AreaSelect: React.FC<OptionType> = ({ data, area, placeholder = 'Seleccionar', onChange }) => {
    return (
        <div>
            <label className="block text-[var(--text-200)]  mb-1">{area}</label>
            <div className="relative">
                <Select
                    isMulti
                    onChange={(selected) => {
                        const selectedOptions = selected as AreaDTO[];
                        onChange?.(selectedOptions);//llamamos a la funcion si solo si existe
                    }}
                    options={data}
                    styles={customStyles}
                    placeholder={placeholder}
                    className=" text-white"
                />
                <BiChevronDown className="absolute  right-3 top-1/2 -translate-y-1/2 text-[var(--primary-300)] pointer-events-none" />
            </div>
        </div>
    );
};
