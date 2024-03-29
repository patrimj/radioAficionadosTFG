//Patricia
export interface Principales {
    id: number;
    nombre: string;
    descripcion: string;
    url_foto: File;
    completada: boolean;
    solucion: string
}

export interface RespuestaBackendPrincipales {
    message: string;
    data: Principales[];
}

export interface Secundarias {
    id: number;
    id_operador: number;
    nombre: string;
    url_foto: string;
    localizacion: string;
    id_principal: number;
    fecha: Date;
    frecuencia: string;
    banda: string;
    id_modo: number;
    id_modalidad: number;
    completada: boolean;
}

export interface RespuestaBackendSecundarias {
    message: string;
    data: Secundarias[];
}

export interface ParticipantesPrincipales {
    id: number;
    usuario: Usuario_principal;
    actividad_principal: PrincipalesNombre;
}

export interface PrincipalesNombre {
    nombre: string;
}

export interface Usuario_principal {
    nombre: string;
    email: string;
    apellido_uno: string;
    apellido_dos: string;
    url_foto: string;
    id_examen: string;
}

export interface RespuestaBackendParticipantesPrincipales {
    message: string;
    data: ParticipantesPrincipales[];
}

export interface ParticipantesSecundarias {
    id: number;
    usuario_secundarias_secundarias: Usuario_secundaria;
    act_secundaria: SecundariasNombre;
}

export interface SecundariasNombre {
    nombre: string
}

export interface Usuario_secundaria {
    nombre: string;
    email: string;
    apellido_uno: string;
    apellido_dos: string;
    url_foto: string;
    id_examen: string;
}

export interface RespuestaBackendParticipantesSecundarias {
    message: string;
    data: ParticipantesSecundarias[];
}


