export interface Noticia {
    id: number;
    nombre: string;
    fecha: Date;
    descripcion: string;
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
    rol?: RolAsignado[];
}

export interface RolAsignado {
    id_rol: number;
    id_usuario: number;
}

// RESPUESTAS BACKEND

export interface UsuariosRespuesta {
    message: string;
    data: Usuario[];
}

export interface RespuestaNoticias {
    message: string;
    data: Noticia[];
}



