interface Noticia {
    id: number;
    nombre: string;
    fecha: string;
    descripcion: string;
}

interface RespuestaNoticias {
    message: string;
    data: Noticia[];
}