interface Modalidad {
    id?: number;
    descripcion: string;
}

interface PrincipalesSecundarias {
    id_principal: number;
    id_secundaria: number;
    premio: string;
}

interface ActPrimaria {
    id?: number;
    nombre: string;
    descripcion?: string;
    url_foto?: string;
    completada?: boolean;
    solucion?: string;
    PrincipalesSecundarias?: PrincipalesSecundarias;
}

interface Modo {
    nombre: string;
}

interface Actividad {
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

interface RespuestaActividades {
    message: string;
    data: Actividad[];
}

interface RespuestaTotalActividadesYconcursos {
    message: string;
    data: number;
}

interface ActPrincipalUsuario {
    id: number;
    nombre: string;
    email: string;
    id_examen: string;
}

interface Concurso {
    nombre: string;
    descripcion: string;
    url_foto: string;
    completada: boolean;
    solucion: string;
    act_principales_usuario: ActPrincipalUsuario[];
}

interface RespuestaConcursos {
    message: string;
    data: Concurso[];
}

interface Perfil {
    id: number;
    nombre: string;
    email: string;
    apellido_uno: string;
    apellido_dos: string;
    password: string;
    url_foto: string;
    id_examen: string;
}

interface RespuestaPerfil {
    message: string;
    data: Perfil;
}