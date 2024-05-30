import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//---Interfaces---

import {
  UsuariosRespuesta,
  Usuario,
  AsignarRolRespuesta,
  LoginRespuesta,
  UsuarioRespuesta,
  RecuperacionPasswordRespuesta,
  ModificarAltaUsuarioRespuesta

} from "./usuarios";


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }


  // LOGIN

  login(email: string, password: string): Observable<LoginRespuesta> {
    return this.http.post<LoginRespuesta>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response) {
          console.log('Usuario:', response)
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

  // REGISTRO

  registro(usuario: Usuario, formData: FormData): Observable<UsuarioRespuesta> {
    return this.http.post<UsuarioRespuesta>(`${this.baseUrl}/registro`, formData).pipe(
      tap(response => {
        if (response) {
          console.log('Usuario:', response)
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

  // RECUPERAR CONTRASEÑA

  recuperarPassword(email: string): Observable<RecuperacionPasswordRespuesta> {
    return this.http.post<RecuperacionPasswordRespuesta>(`${this.baseUrl}/usuarios/recuperar`, { email }).pipe(
      tap(response => {
        if (response) {
          console.log('Usuario:', response)
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

  // BUSCAR USUARIO POR NOMBRE

  mostrarUsuariosNombre(nombre: string): Observable<UsuariosRespuesta> {

    return this.http.get<UsuariosRespuesta>(`${this.baseUrl}/usuario/buscarNombre/${nombre}`).pipe(
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

  // BUSCAR USUARIO POR INDICATIVO

  mostrarUsuariosIndicativo(indicativo: string): Observable<UsuariosRespuesta> {

    return this.http.get<UsuariosRespuesta>(`${this.baseUrl}/usuario/buscarIndicativo/${indicativo}`).pipe(
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

  // ALTA COMPLETA DE USUARIO

  altaUsuario(usuario: Usuario, formData: FormData): Observable<ModificarAltaUsuarioRespuesta | undefined> {
    return this.http.post<ModificarAltaUsuarioRespuesta>(`${this.baseUrl}/usuario/alta/${usuario.id_rol}`, formData, { responseType: 'json', params: { auth: 'true' } }).pipe(
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

  bajaUsuario(id: number): Observable<UsuarioRespuesta> {
    return this.http.delete<UsuarioRespuesta>(`${this.baseUrl}/usuario/baja/${id}`, { params: { auth: 'true' } }).pipe(
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

  modificarUsuario(usuario: Usuario, formData: FormData): Observable<ModificarAltaUsuarioRespuesta | undefined> {

    return this.http.put<ModificarAltaUsuarioRespuesta>(`${this.baseUrl}/usuario/modificar/${usuario.id}`, formData, { params: { auth: 'true' } }).pipe(
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

  // ASIGNAR ROL

  asignarRol(id_rol: number, id_usuario: number): Observable<AsignarRolRespuesta | undefined> {
    return this.http.post<AsignarRolRespuesta>(`${this.baseUrl}/usuario/asignar/${id_rol}/${id_usuario}`, {}, { params: { auth: 'true' } }).pipe(
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

  // VER UN USUARIO CON DIPLOMA

  mostrarUsuarioConDiploma(email: string): Observable<UsuarioRespuesta> {

    return this.http.get<UsuarioRespuesta>(`${this.baseUrl}/usuario/diploma/${email}`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Usuario con diploma:', response)
        } else {
          throw new Error('Error, no se pudo mostrar el usuario con diploma')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // VER USUARIOS CON DIPLOMA

  mostrarUsuariosConDiploma(): Observable<UsuariosRespuesta> {
    return this.http.get<UsuariosRespuesta>(`${this.baseUrl}/usuarios/diploma`, { params: { auth: 'true' } }).pipe(
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

  // VER USUARIOS

  mostrarUsuarios(): Observable<UsuariosRespuesta> {

    return this.http.get<UsuariosRespuesta>(`${this.baseUrl}/usuarios`, { params: { auth: 'true' } }).pipe(
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

  // TOKEN

  private token: string | number = '';

  setToken(token: string | number): void { // guarda el token en el localstorage
    this.token = token;
    localStorage.setItem('token', token.toString());
  }

  getToken(): string | number { // obtiene el token del localstorage
    if (!this.token) {
      this.token = JSON.parse( localStorage.getItem('datosLogin')!).token  || '';
    }
    return this.token;
  }

  logout(): void { // elimina el token del localstorage
    this.token = '';
    localStorage.removeItem('datosLogin');
  }


}