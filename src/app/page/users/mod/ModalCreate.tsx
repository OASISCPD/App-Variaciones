import { useForm } from "react-hook-form";
import type { User } from "../../../types";
import { inputStyle } from "../../../utils/const";

interface ModalCreateProps {
  cancel: () => void;
  confirm: (newUser: User) => void;
}

export const ModalCreate: React.FC<ModalCreateProps> = ({ cancel, confirm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      legajo: "",
      nombre: "",
      usuario: "",
      permisos: "",
      fecha_registro: "",
    },
  });

  const onSubmit = (newUser: User) => {
    confirm(newUser);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 border-gray-300 rounded-lg p-6 bg-[var(--bg-100)]"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[var(--text-200)]">Legajo</label>
            <input
              type="text"
              {...register("legajo", { required: "Campo obligatorio" })}
              className={inputStyle}
            />
            {errors.legajo && <p className="text-red-500 text-sm">{errors.legajo.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-200)]">Nombre</label>
            <input
              type="text"
              {...register("nombre", { required: "Campo obligatorio" })}
              className={inputStyle}
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-200)]">Usuario</label>
            <input
              type="text"
              {...register("usuario", { required: "Campo obligatorio" })}
              className={inputStyle}
            />
            {errors.usuario && <p className="text-red-500 text-sm">{errors.usuario.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-200)]">Permisos</label>
            <input
              type="text"
              {...register("permisos", { required: "Campo obligatorio" })}
              className={inputStyle}
            />
            {errors.permisos && <p className="text-red-500 text-sm">{errors.permisos.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-200)]">Fecha de Registro</label>
            <input
              type="datetime-local"
              {...register("fecha_registro", { required: "Campo obligatorio" })}
              className={inputStyle}
            />
            {errors.fecha_registro && (
              <p className="text-red-500 text-sm">{errors.fecha_registro.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-[var(--primary-100)] text-[var(--text-100)] hover:opacity-90"
          >
            Crear Usuario
          </button>
          <button
            type="button"
            onClick={cancel}
            className="px-4 py-2 text-[var(--primary-100)] hover:underline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
