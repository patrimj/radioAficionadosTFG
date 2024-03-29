// JuanNavarrete & Patricia

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//---Servicio---
import { AuthService } from '../servicios/auth.service';

//---Interfaces---
import { Noticias } from '../interfaces/noticias';
import {UsuarioRegistrado, UsuarioRegistro} from "../interfaces/usuario";
import { RespuestaBackend } from "../interfaces/usuario";
import { RespuestaBackendDiplomas } from "../interfaces/usuario";
import { AsignarRolRespuesta } from '../interfaces/rol';
import { RespuestaRecuperarPassword } from "../interfaces/respuesta.login";
import {
  Perfil,
  PostPassword,
  ModificarPerfil,
  RespuestaModificarPerfil,
  RespuestaPostPassword
} from "../interfaces/perfil";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient, private authService: AuthService) { }

  // ---------------------------- RUTAS CUALQUIER USUARIO ----------------------------

  // CAMBIAR CONTRASEÑA

  cambiarContrasena(id: number, datos: PostPassword): Observable<RespuestaPostPassword> {
    return this.http.put<RespuestaPostPassword>(`${this.baseUrl}/usuario/contrasena/${id}`, datos);
  }

  // VER PERFIL 
  mostrarPerfil(id: number): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.baseUrl}/usuario/perfil/${id}`, { params: { auth: 'true' } });
  }

  // MODIFICAR PERFIL
  modificarPerfil(id: number, datos: FormData): Observable<RespuestaModificarPerfil> {

    return this.http.put<RespuestaModificarPerfil>(`${this.baseUrl}/usuario/perfil/${id}`, datos, {responseType: "json", params: { auth: 'true' }});

  }

  //VER NOTICIAS (REGISTRADOS Y NO REGISTRADOS)

  mostrarNoticias(): Observable<Noticias[]> {
    return this.http.get<Noticias[]>(`${this.baseUrl}/noticias`).pipe(
      tap(response => {
        if (response) {
          console.log('Noticias:', response)
        } else {
          throw new Error('Error, no se pudo mostrar las noticias')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // ---------------------------- RUTAS ADMINISTRADOR ----------------------------

  //ELIMINAR NOTICIAS

  eliminarNoticia(id: number): Observable<Noticias | undefined> {
    return this.http.delete<Noticias>(`${this.baseUrl}/noticia/eliminar/${id}`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Noticia eliminada:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  //MODIFICAR NOTICIAS

  modificarNoticia(noticia: Noticias): Observable<Noticias | undefined> {
    return this.http.put<Noticias>(`${this.baseUrl}/noticia/modificar/${noticia.id}`, noticia, { params: { auth: 'true' } }).pipe(
      tap(response => {
        console.log('Noticia modificada:', response)
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  //CREAR NOTICIAS

  crearNoticia(noticia: Noticias): Observable<Noticias | undefined> { 

    return this.http.post<Noticias>(`${this.baseUrl}/noticia/crear`, noticia, {  params: { auth: 'true' }  }).pipe(
      tap(response => {
        console.log('Response:', response);
        if (response) {
          console.log('Noticia creada:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  //VER UN USUARIO

  mostrarUsuarioPorId(id: number): Observable<RespuestaBackend> { 
    return this.http.get<RespuestaBackend>(`${this.baseUrl}/usuario/${id}`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Usuario:', response)
        } else {
          throw new Error('Error, no se pudo mostrar el usuario que buscas')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // VER USUARIOS

  verUsuarios(): Observable<RespuestaBackend> {

    return this.http.get<RespuestaBackend>(`${this.baseUrl}/usuarios`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Usuarios:', response)
        } else {
          throw new Error('Error, no se pudo mostrar los usuarios')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // ALTA DE USUARIOS

  altaUsuario(usuarioRegistro: UsuarioRegistro, formData: FormData): Observable<UsuarioRegistro | undefined> { 

    return this.http.post<UsuarioRegistro>(`${this.baseUrl}/usuario/alta/${usuarioRegistro.id_rol}`, formData, { responseType: 'json', params: { auth: 'true' }  }).pipe(
      tap(response => {
        if (response) {
          console.log('Usuario creado:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // BAJA DE USUARIOS

  bajaUsuario(id: number): Observable<UsuarioRegistro | undefined> { 
    return this.http.delete<UsuarioRegistro>(`${this.baseUrl}/usuario/baja/${id}`, { params: { auth: 'true' }  }).pipe(
      tap(response => {
        if (response) {
          console.log('Usuario eliminado:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // MODIFICAR USUARIOS

  modificarUsuario(usuarioRegistro: UsuarioRegistro, formData: FormData): Observable<UsuarioRegistro | undefined> { 

    return this.http.put<UsuarioRegistro>(`${this.baseUrl}/usuario/modificar/${usuarioRegistro.id}`, formData, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Usuario modificado:', response)
        } else {
          throw new Error('Error, datos incorrectos');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }


  // VER USUARIOS CON DIPLOMA

  mostrarUsuariosConDiploma(): Observable<RespuestaBackendDiplomas> { // Patricia
    return this.http.get<RespuestaBackendDiplomas>(`${this.baseUrl}/usuarios/diploma`, { params: { auth: 'true' }  }).pipe(
      tap(response => {
        if (response) {
          console.log('Usuarios con diploma:', response)
        } else {
          throw new Error('Error, no se pudo mostrar los usuarios con diplomas')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // ASIGNAR ROL

  asignarRol(id_rol: number, id_usuario: number): Observable<AsignarRolRespuesta | undefined> { 
    return this.http.post<AsignarRolRespuesta>(`${this.baseUrl}/usuario/asignar/${id_rol}/${id_usuario}`, {}, { params: { auth: 'true' }  }).pipe(
      tap(response => {
        if (response) {
          console.log('Rol asignado:', response)
        } else {
          throw new Error('Error, no se pudo asignar el rol');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  //RECUPERAR CONTRASEÑA

  recuperarPassword(email: string) { //Juan

    return this.http.post<RespuestaRecuperarPassword>(
      `${this.baseUrl}/usuarios/recuperar`,
      { email: email }
    )
  }

  obtenerRol(nombre: string) {
    return this.http.get<RespuestaRecuperarPassword>(
      `${this.baseUrl}/rol/${nombre}`,
      { params: { auth: 'true' } },
    )
  }

  registrarUsuario(datos: FormData): Observable<UsuarioRegistrado | undefined> {
    return this.http.post<UsuarioRegistrado>(`${this.baseUrl}/usuarios/registrar`, datos, { responseType: "json" });
  }

/*   cerrarSesion(token: string): Observable<UsuarioRegistrado | undefined> {
    return this.http.post<SesionCerrada>(`${this.baseUrl}/cerrar-sesion`, {}, {headers: {"x-token": token}});
  } */
}
