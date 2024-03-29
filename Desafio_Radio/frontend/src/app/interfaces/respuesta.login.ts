import {Usuario} from "./usuario";

export interface RespuestaLogin {
  usuario: Usuario,
  token: string,
  error?: string
}

export interface RespuestaRecuperarPassword {
  msg: boolean
}
