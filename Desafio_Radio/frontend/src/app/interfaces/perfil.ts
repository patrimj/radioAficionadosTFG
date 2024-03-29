import {Modalidad} from "./modalidad";

export interface Perfil {
  usuario: Usuario
}

export interface Usuario {
  id: number
  nombre: string
  email: string
  apellido_uno: string
  apellido_dos: string
  password: string
  url_foto: any
  id_examen: string
  created_at: string
  updated_at: string
  deleted_at: any
}

export interface ModificarPerfil {
  nombre: string
  apellido_uno: string
  apellido_dos: string
}

export interface RespuestaModificarPerfil {
  id: number
  nombre: string
  apellido_uno: string
  apellido_dos: string
}

export interface RespuestaCambioPerfil {
  cambiada: boolean
}

export interface PostPassword {
  password: string
}

export interface RespuestaPostPassword {
  cambiada: boolean
}

export interface RespuestaProgreso {
  msg: string
  data: PrincipalProg[]
}

export interface PrincipalProg {
  id: number
  nombre: string
  descripcion: string
  url_foto?: string
  completada: boolean
  solucion: string
  created_at: string
  updated_at: string
  deleted_at: any
  act_secundarias: ActSecundariaProg[]
}

export interface ActSecundariaProg {
  id: number
  nombre: string
  url_foto?: string
  localizacion: string
  fecha?: string,
  modalidad: Modalidad,
  act_secundarias_usuario: ActSecundariasUsuario[]
}

export interface ActSecundariasUsuario {
  id_usuario: number
  id_secundaria: number
  premio: string
  created_at?: string
  updated_at?: string
  deleted_at: any
}
