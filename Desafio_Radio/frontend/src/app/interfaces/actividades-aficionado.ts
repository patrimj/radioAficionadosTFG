export interface ActividadPrincipal {
  id: number;
  nombre: string;
  url_foto: string;
  solucion: string;
  act_secundarias?: ActividadSecundaria[];
 }
 
 export interface ActividadSecundaria {
  id: number;
  nombre?: string;
  url_foto: string;
  localizacion: string;
  fecha: Date;
  frecuencia: string;
  banda: string;
  PrincipalesSecundarias?:PrincipalesSecundarias;
 }
 
 export interface PrincipalesSecundarias {
  premio: string;
 }

export interface RespuestaBackendOperador {
    message: string;
    data: ActividadPrincipal[];
  }
