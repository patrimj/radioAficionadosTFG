export interface ActividadSecundaria {
    id: number;
    id_operador: number;
    id_modo: number;
    modalidad: ModalidadSecundaria;
    nombre: string;
    localizacion: string;
    fecha: Date;
    url_foto: string;
    completada: boolean;
    frecuencia: string;
    banda: string;
}

export interface nuevaActSecundaria {
    nombre: string;
    localizacion: string;
    fecha: Date;
    url_foto: File;
    completada: boolean;
    frecuencia: string;
    banda: string;
    id_modo: number;
    id_modalidad: number;
}

export interface ActSecModificada {
    nombre: string;
    localizacion: string;
    fecha: Date;
    completada: boolean;
    frecuencia: string;
    banda: string;
}

interface ModalidadSecundaria {
    id: number;
    descripcion: string;
}
