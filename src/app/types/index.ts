// type reutilizable para los props que manejan ordenamiento
export type SortState<T> = {
    sortField: keyof T;
    sortOrder: 'asc' | 'desc';
};

export type CajaDTO = {
    id: number;
    fecha: string;
    empleado: string;
    nombre_empleado: string
    detalle: string;
    num_variacion: number;
    tipo_variacion: string;
    sobrante: number;
    faltante: number;
    variacion_firma_empleado: string;
    variacion_id: number;
    variacion_created_at: string;
    created_at: string;
    update_at: string;
    legajo_usuario: number;
    estado: string;
    usuario: string; // o `usuario_id: number` si lo cambias
}

export type ValeDTO = {
    id: number;
    empleado: string;
    turno: string
    fecha: string;
    importe: number;
    firma_empleado: string;
    created_at: string;
    usuario_nombre: string;
    legajo_usuario: number;
    nombre_empleado: string;
    estado_id: number;
}

export interface Variacion {
    id: number
    usuario: string
    fecha: string
    empleado: string
    legajo: string
    detalle: string
    numeroVariacion: string
    tipoVariacion: string
    faltante: number | null
    sobrante: number | null
}
export interface RegistrosVariaciones {
    id: number
    usuario_id: number
    cajas_id: number
    accion: string
    empleado_id: number
    created_at: string
    usuario_nombre_completo: string
}
export type UserDTO = {
    id: number;
    nombre: string;
    apellido: string;
    usr: string;
    email: string;
    password?: string;
    estado: number;
    celular: string;
    fecha_registro: string;
    legajo: number
    permisos_id: number | string;
    nombre_empleado: string;
}

export type PermisoDTO = {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface ModalData {
    type: ModalType | null
    data: CajaDTO | null
}
export interface ModalDataVale {
    type: ModalType | null
    data: ValeDTO | null

}
export type ModalType = "variacion" | "vale" | "editar" | "eliminar" | "agregar" | "agregar_usuario" | "ticket_variacion" | 'agregar_vale' | 'editar_vale' | 'eliminar_vale' | "firma" | "subir_firma" | null

export interface ModalDataUsers {
    type: ModalUsersType | null;
    data: UserDTO | null
}

export type ModalUsersType = "agregar" | "eliminar" | "editar"


export type ActiveTabDTO = "listado" | "historial" | "vales"
