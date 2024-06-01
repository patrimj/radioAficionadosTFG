export interface Participante {
    id: number;
    nombre: string;
    url_foto: string;
    id_examen: string;
}

export interface Participantes {
    usuario: Participante;
}

export interface ParticipantesConcursoRespuesta {
    message: string;
    data: Participantes[];
}

export interface Concurso {
    id: number;
    nombre: string;
    descripcion: string;
    url_foto: File;
    completada: boolean;
    solucion: string;
}

export interface ConcursoRespuesta {
    message: string;
    data: Concurso[];
}
