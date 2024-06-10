import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//---Interfaces---

import {
  RespuestaActividadesUnico,
  RespuestaActividadesVarios,
  RespuestaTotalActividadesYconcursos,
  RespuestaConcursos,
  RespuestaPerfil,
  Perfil

} from "./perfiles";


@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  // VER ACTIVIDADES DE UN UNICO CONTACTO (AFICIONADO)

  getActividadesUnicoContactoAficionado(): Observable<RespuestaActividadesUnico> {
    return this.http.get<RespuestaActividadesUnico>(`${this.baseUrl}/actividades/unicoContacto/aficionado`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividades:', response)
        } else {
          throw new Error('Error, no se pudo mostrar las actividades')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // VER ACTIVIDADES DE VARIOS CONTACTOS Y CONCURSO (AFICIONADO)

  getActividadesVariosContactosAficionado(): Observable<RespuestaActividadesVarios> {
    return this.http.get<RespuestaActividadesVarios>(`${this.baseUrl}/actividades/variosContactos/aficionado`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividades:', response)
        } else {
          throw new Error('Error, no se pudo mostrar las actividades')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // VER ACTIVIDADES DE UN CONCURSO (MODAL) (AFICIONADO) *** Pantalla concurso ***

  getActividadesPorConcurso(idPrincipal: number): Observable<RespuestaActividadesVarios> {
    return this.http.get<RespuestaActividadesVarios>(`${this.baseUrl}/perfil/actividades/${idPrincipal}`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividades:', response)
        } else {
          throw new Error('Error, no se pudo mostrar las actividades')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // MOSTRAR TOTAL ACTIVIDADES EN LAS QUE HA PARTICIPADO UN USUARIO (AFICIONADO)

  getTotalActividadesParticipado(): Observable<RespuestaTotalActividadesYconcursos> {
    return this.http.get<RespuestaTotalActividadesYconcursos>(`${this.baseUrl}/actividades/total`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Total de actividades:', response)
        } else {
          throw new Error('Error, no se pudo mostrar el total de actividades')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // CONCURSOS DE UN USUARIO (AFICIONADO)

  getConcursosAficionado(): Observable<RespuestaConcursos> {
    return this.http.get<RespuestaConcursos>(`${this.baseUrl}/concursos/aficionado`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Concursos:', response)
        } else {
          throw new Error('Error, no se pudo mostrar los concursos')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // MOSTRAR EL TOTAL DE CONCURSOS EN LOS QUE HA PARTICIPADO UN USUARIO (AFICIONADO)

  getTotalConcursosParticipado(): Observable<RespuestaTotalActividadesYconcursos> {
    return this.http.get<RespuestaTotalActividadesYconcursos>(`${this.baseUrl}/concursos/total`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Total de concursos:', response)
        } else {
          throw new Error('Error, no se pudo mostrar el total de concursos')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // MOSTRAR PERFIL

  getPerfil(): Observable<RespuestaPerfil> {
    return this.http.get<RespuestaPerfil>(`${this.baseUrl}/perfil`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Perfil:', response)
        } else {
          throw new Error('Error, no se pudo mostrar el perfil')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // MODIFICAR PERFIL

  modificarPerfil(usuario: Perfil, formData: FormData): Observable<RespuestaPerfil> {
    return this.http.put<RespuestaPerfil>(`${this.baseUrl}/usuario/perfil/${usuario.id}`, formData, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Perfil modificado:', response)
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

  // CAMBIAR CONTRASEÑA

  cambiarPassword(email: string, password: string): Observable<RespuestaPerfil> {
    const body = { email, password };
    return this.http.put<RespuestaPerfil>(`${this.baseUrl}/cambiar-password`, body, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Contraseña cambiada:', response)
        } else {
          throw new Error('Error, no se pudo cambiar la contraseña');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // CREAR Y PEDIR DIPLOMA DE ACTIVIDAD 

  pedirDiploma(actividad: string, url: string): Observable<string> {

    return this.http.post<string>(`${this.baseUrl}/diploma/enviar`, { actividad, url }, { params: { auth: 'true' }, responseType: 'text' as 'json' }).pipe(
      tap(response => {
        if (response) {
          console.log('Diploma:', response);
        } else {
          throw new Error('Error, no se pudo pedir el diploma');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}