export interface RolAsignado {
    id_rol: number;
    id_usuario: number;
}

export interface Rol {
    id: number;
    nombre: string;
    RolAsignado: RolAsignado;
}

export interface ActividadPrincipal {
    nombre: string;
    descripcion: string;
    url_foto: string;
}

export interface UsuarioPrincipal {
    id_usuario: number;
    id_principal: number;
    actividad_principal: ActividadPrincipal;
}

export interface ActSecundaria {
    nombre: string;
    url_foto: string;
    localizacion: string;
    fecha: string;
    frecuencia: string;
    banda: string;
    id_modo: number;
    id_modalidad: number;
}

export interface UsuarioSecundaria {
    id_usuario: number;
    id_secundaria: number;
    premio: null | string;
    act_secundaria: ActSecundaria;
}

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    apellido_uno: string;
    apellido_dos: string;
    password: string;
    url_foto: string;
    id_examen: string;
    roles?: Rol[];
    usuario_principal?: UsuarioPrincipal[];
    usuario_secundarias?: UsuarioSecundaria[];
}

// RESPUESTAS

export interface UsuariosDiplomaRespuesta {
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