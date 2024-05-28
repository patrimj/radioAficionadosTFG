export interface Noticia {
    id: number;
    nombre: string;
    fecha: string;
    descripcion: string;
}

export interface RespuestaNoticias {
    message: string;
    data: Noticia[];
}