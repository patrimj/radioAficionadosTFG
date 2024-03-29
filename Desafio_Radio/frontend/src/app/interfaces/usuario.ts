//Patricia

import { Rol } from "./rol";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  apellido_uno: string;
  apellido_dos: string;
  roles: Rol[];
}

export interface UsuarioRegistro {
  id: number;
  nombre: string;
  email: string;
  apellido_uno: string;
  apellido_dos: string;
  url_foto?: File;
  id_examen: string;
  password: string;
  roles: Rol[];
  id_rol?: number;
}

export interface RespuestaBackend {
  message: string;
  data: UsuarioRegistro[];
}
export interface RespuestaBackendDiplomas {
  message: string;
  data: UsuarioDiplomas[];
}

export interface UsuarioDiplomas {
  id: number;
  nombre: string;
  email: string;
  apellido_uno: string;
  apellido_dos: string;
  url_foto: string;
  id_examen: string;
  roles: Rol[];
  usuario_principal: Usuario_principal[]
  usuario_secundarias: Usuario_secundarias[]
}

export interface Usuario_principal {
  id_usuario: number;
  id_principal: number;
  actividad_principal: Act_principales_usuario
}

export interface Act_principales_usuario {
  nombre: string;
  descripcion: string;
  url_foto: string;
  completada: boolean;
  solucion: string
}

export interface Usuario_secundarias {
  id_usuario: number;
  id_secundaria: number;
  premio: string;
  act_secundaria: Act_secundarias_usuario
}

export interface Act_secundarias_usuario {
  nombre: string;
  url_foto: string;
  localizacion: string;
  fecha: Date;
  frecuencia: string;
  banda: string;
  id_modo: number;
  id_modalidad: number;
}

// El archivo entero es de Patricia, pero se ha creado esta interfaz para diferenciarla de la ruta de insertar como Administrador.
export interface UsuarioRegistrado {
  msg: string,
  data: boolean
}

