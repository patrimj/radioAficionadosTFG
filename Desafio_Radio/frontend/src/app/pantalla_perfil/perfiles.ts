export interface Modalidad {
    id?: number;
    descripcion: string;
}

export interface PrincipalesSecundarias {
    id_principal: number;
    id_secundaria: number;
    premio: string;
}

export interface ActPrimaria {
    id?: number;
    nombre: string;
    descripcion?: string;
    url_foto?: string;
    completada?: boolean;
    solucion?: string;
    PrincipalesSecundarias?: PrincipalesSecundarias;
}

export interface Modo {
    nombre: string;
}

export interface Actividad {
    id: number;
    nombre: string;
    url_foto: string;
    localizacion?: string;
    fecha: string;
    frecuencia?: string;
    banda?: string;
    completada?: boolean;
    modalidad: Modalidad;
    act_primarias?: ActPrimaria[];
    modo: Modo;
}

export interface RespuestaActividades {
    message: string;
    data: Actividad[];
}

export interface RespuestaTotalActividadesYconcursos {
    message: string;
    data: number;
}

export interface ActPrincipalUsuario {
    id: number;
    nombre: string;
    email: string;
    id_examen: string;
}

export interface Concurso {
    nombre: string;
    descripcion: string;
    url_foto: string;
    completada: boolean;
    solucion: string;
    act_principales_usuario: ActPrincipalUsuario[];
}

export interface RespuestaConcursos {
    message: string;
    data: Concurso[];
}

export interface Perfil {
    id: number;
    nombre: string;
    email: string;
    apellido_uno: string;
    apellido_dos: string;
    password: string;
    url_foto: File;
    id_examen: string;
}

export interface RespuestaPerfil {
    message: string;
    data: Perfil;
}