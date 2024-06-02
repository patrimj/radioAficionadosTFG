

export interface ModalidadActividadRespuesta {
    message: string;
    data: string;
}

export interface ActividadesContactoRespuesta {
    message: string;
    data: Actividades[];
}

export interface PremiosUsuarioConcursoRespuesta {
    message: string;
    data: string[];
}

export interface PremioActividad {
    premio: string;
}

export interface PremioActividadRespuesta {
    message: string;
    data: PremioActividad;
}

export interface Actividades {
    id: number;
    nombre: string;
};


export interface ActividadesVariosContactosRespuesta {
    message: string;
    data: Actividades[];
}

export interface SolucionConcurso {
    solucion: string;
}

export interface SolucionConcursoRespuesta {
    message: string;
    data: SolucionConcurso;
}

export interface Concurso {
    id: number;
    nombre: string;
}

export interface ConcursoContactoRespuesta {
    message: string;
    data: Concurso[]
}

export interface ContactoDetalle {
    nombre: string;
    id_examen: string;
    email: string;
    usuario_secundarias: {
        premio: string;
        act_secundaria: {
            nombre: string;
        };
        principales_secundarias: null;
    }[];

}

export interface ContactosConDetallesRespuesta {
    message: string;
    data: ContactoDetalle[];
}

export interface ContactosRegistrado {
    id_usuario: string;
    id_secundaria: string;
    premio: string | null;
}

export interface RegistrarContactoRespuesta {
    message: string;
    data: ContactosRegistrado;
}

export interface Usuario {
    id: number;
    id_examen: string;
}

export interface UsuariosRespuesta {
    message: string;
    data: Usuario[];
}