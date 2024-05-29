export interface RolAsignado {
    id_rol: number;
    id_usuario: number;
}

export interface Rol {
    id: number;
    nombre: string;
    RolAsignado: RolAsignado;
}

export interface Concurso {
    nombre: string;
    descripcion: string;
    url_foto: File;
}

export interface UsuarioConcurso {
    id_usuario: number;
    id_principal: number;
    actividad_principal: Concurso;
}

export interface Actividad {
    nombre: string;
    url_foto: File;
    localizacion: string;
    fecha: string;
    frecuencia: string;
    banda: string;
    id_modo: number;
    id_modalidad: number;
}

export interface UsuarioActividad {
    id_usuario: number;
    id_secundaria: number;
    premio: null | string;
    act_secundaria: Actividad;
}

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    apellido_uno: string;
    apellido_dos: string;
    password: string;
    url_foto: File;
    id_examen: string;
    roles?: Rol[];
    id_rol?: number;
    usuario_principal?: UsuarioConcurso[];
    usuario_secundarias?: UsuarioActividad[];
}

// RESPUESTAS

export interface UsuariosRespuesta {
    message: string;
    data: Usuario[];
}

export interface AsignarRolRespuesta {
    message: string;
    data: RolAsignado;
}

export interface ModificarAltaUsuarioRespuesta {
    message: string;
    data: {
        usuario: Usuario;
        rol: RolAsignado;
    };
}

export interface RegistroRespuesta {
    message: string;
    data: Usuario;
}

export interface LoginRespuesta {
    token: string;
    usuario: Usuario;
}

export interface RecuperacionPasswordRespuesta {
    msg: string;
}