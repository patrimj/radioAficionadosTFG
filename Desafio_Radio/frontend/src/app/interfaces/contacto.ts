// Juan Navarrete

import {Secundarias} from "./principales";

export interface RespuestaRestantesActividad {
  letras: string[]
}

export interface MostrarUsuarioSecundaria {
  idUsuario: string
  idActividad: string
}

export interface RespuestaObtenerPuntuacion {
  msg: string,
  data: number
}

export interface CrearContacto {
  idUsuario: String,
  idActividad: String,
  premio: String | number | boolean,
}

export interface RespuestaCrearContacto {
  msg: string,
  data: boolean
}

export interface RespuestaContactoCompleto {
  msg: string,
  data: boolean
}

export interface BuscarContactosSec {
  msg: string
  data: Contacto[]
}

export interface Contacto {
  id_usuario: number
  id_secundaria: number
  premio: string
  created_at?: string
  updated_at?: string
  deleted_at: any
  usuario_secundarias_secundarias: UsuarioSecundariasSecundarias

}

export interface UsuarioSecundariasSecundarias {
  id: number
  id_examen: string
}
