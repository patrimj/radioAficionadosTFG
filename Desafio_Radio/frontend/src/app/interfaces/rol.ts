//Juan
export interface Rol {
  id: number
  nombre: string
}
//Patricia
export interface AsignarRolRespuesta {
  message: string;
  data: {
    id_rol?: string;
    id_usuario: string;
  };
}