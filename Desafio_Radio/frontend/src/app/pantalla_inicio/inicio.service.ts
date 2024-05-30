import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//---Interfaces---

import {
  Noticia,
  RespuestaNoticias,
  UsuariosRespuesta
} from "./inicio";



@Injectable({
  providedIn: 'root'
})
export class InicioService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }


  // MOSTRAR NOTICIAS

  mostrarNoticias(): Observable<RespuestaNoticias> {

    return this.http.get<RespuestaNoticias>(`${this.baseUrl}/noticias`, { params: { auth: 'true' } }).pipe(
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

  // ELIMINAR NOTICIAS

  eliminarNoticia(id: number): Observable<Noticia> {
    return this.http.delete<Noticia>(`${this.baseUrl}/noticia/eliminar/${id}`, { params: { auth: 'true' } }).pipe(
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

  // MODIFICAR NOTICIAS

  modificarNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.put<Noticia>(`${this.baseUrl}/noticia/modificar/${noticia.id}`, noticia, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Noticia modificada:', response)
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

  // CREAR NOTICIAS

  crearNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(`${this.baseUrl}/noticia/crear`, noticia, { params: { auth: 'true' } }).pipe(
      tap(response => {
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

  // MOSTRAR ADMIN (Sección Sobre Nosotros)

  mostrarAdministradores(): Observable<UsuariosRespuesta> {

    return this.http.get<UsuariosRespuesta>(`${this.baseUrl}/administradores`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Administradores:', response)
        } else {
          throw new Error('Error, no se pudo mostrar los administradores')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // MOSTRAR OPERADORES

  mostrarOperadores(): Observable<UsuariosRespuesta> {

    return this.http.get<UsuariosRespuesta>(`${this.baseUrl}/operadores`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Operadores:', response)
        } else {
          throw new Error('Error, no se pudo mostrar los operadores')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

}