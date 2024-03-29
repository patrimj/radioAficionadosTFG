//Patricia
export interface Noticias {
    id: number;
    nombre: string;
    fecha: Date;
    descripcion: string;
}

export interface NoticiasResponse {
    data: Noticias[];
    msg: string;
}
