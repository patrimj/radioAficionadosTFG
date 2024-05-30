export interface Usuario {
    nombre: string;
    url_foto: string;
    id_examen: string;
}

export interface ActividadPrincipal {
    nombre: string;
}

export interface ParticipantesConcursoRespuesta {
    message: string;
    data: {
        usuario: Usuario;
        actividad_principal: ActividadPrincipal;
    }[];
}

export interface Concurso {
    id: number;
    nombre: string;
    descripcion: string;
    url_foto: string;
    completada: boolean;
    solucion: string;
}

export interface ConcursoRespuesta {
    message: string;
    data: Concurso | Concurso[];
}
