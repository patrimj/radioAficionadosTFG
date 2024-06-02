export interface Modalidad {
    id: number;
    descripcion: string;
}

export interface Modo {
    id: number;
    nombre: string;
}

export interface PrincipalesSecundarias {
    id_principal: number;
    id_secundaria: number;
    premio: string;
}

export interface ActPrimaria {
    id: number;
    nombre: string;
    descripcion: string;
    url_foto: string;
    completada: boolean;
    solucion: string;
    PrincipalesSecundarias: PrincipalesSecundarias;
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
    act_primarias?: ActPrimaria[];
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

export interface ActividadVariosContactosRespuesta {
    message: string;
    data: {
        actividad: Actividad;
        principal_secundaria: PrincipalesSecundarias;
    };
}

export interface ActividadUnicoContactoRespuesta {
    message: string;
    data: Actividad;
}