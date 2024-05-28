export interface Modalidad {
    id: number;
    descripcion: string;
}

export interface Modo {
    id: number;
    nombre: string;
}

export interface Actividad {
    id: number;
    id_operador: number | null;
    nombre: string;
    url_foto: string;
    localizacion: string;
    fecha: string;
    frecuencia: string;
    banda: string;
    id_modo: number | null;
    id_modalidad: number | null;
    completada: boolean | null;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    act_primarias?: any[];
    modalidad?: Modalidad;
    modo?: Modo;
}

export interface ActividadesRespuesta {
    message: string;
    data: Actividad[];
}

export interface ActividadRespuesta {
    message: string;
    data: Actividad;
}

export interface UsuarioSecundariasSecundarias {
    nombre: string;
    email: string;
    apellido_uno: string;
    apellido_dos: string;
    url_foto: string;
    id_examen: string;
}

export interface ActSecundaria {
    nombre: string;
}

export interface Participante {
    usuario_secundarias_secundarias: UsuarioSecundariasSecundarias;
    act_secundaria: ActSecundaria;
}

export interface ParticipantesRespuesta {
    message: string;
    data: Participante[];
}

export interface ModalidadesRespuesta {
    message: string;
    data: Modalidad[];
}

export interface ModosRespuesta {
    message: string;
    data: Modo[];
}