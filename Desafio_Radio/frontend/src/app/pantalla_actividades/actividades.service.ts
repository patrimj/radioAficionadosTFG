import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//---Interfaces---

import {
  ActividadesRespuesta,
  ActividadRespuesta,
  ParticipantesRespuesta,
  Actividad,
  ActividadUnicoContactoRespuesta,
  ActividadVariosContactosRespuesta,
  ModalidadesRespuesta,
  ModosRespuesta
} from "./actividades";

import {
  ConcursoRespuesta,
} from "../pantalla_concursos/concursos";


@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }


  // VER TODAS LAS ACTIVIDADES Y SUS CONCURSOS (SI TIENE) 

  mostrarActividades(): Observable<ActividadesRespuesta> {
    return this.http.get<ActividadesRespuesta>(`${this.baseUrl}/actividades`).pipe(
      tap(response => {
        if (response) {
          console.log('Usuarios:', response)
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

  // VER TODAS LAS ACTIVIDADES TERMINADAS

  mostrarActividadesTerminadas(): Observable<ActividadesRespuesta> {
    return this.http.get<ActividadesRespuesta>(`${this.baseUrl}/actividades/terminadas`).pipe(
      tap(response => {
        if (response) {
          console.log('Usuarios:', response)
        } else {
          throw new Error('Error, no se pudo mostrar las actividades terminadas')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  //VER TODAS LAS ACTIVIDADES PENDIENTES 

  mostrarActividadesPendientes(): Observable<ActividadesRespuesta> {
    return this.http.get<ActividadesRespuesta>(`${this.baseUrl}/actividades/pendientes`).pipe(
      tap(response => {
        if (response) {
          console.log('Usuarios:', response)
        } else {
          throw new Error('Error, no se pudo mostrar las actividades pendientes')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // TERMINAR ACTIVIDAD (BOTÓN) (OPERADOR)

  terminarActividad(id: number): Observable<ActividadRespuesta> {
    return this.http.put<ActividadRespuesta>(`${this.baseUrl}/actividad/terminar/${id}`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Usuarios:', response)
        } else {
          throw new Error('Error, no se pudo terminar la actividad')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // BUSCAR ACTIVIDAD POR ID (AFICIONADO)

  mostrarActividadId(id: number): Observable<ActividadRespuesta> {
    return this.http.get<ActividadRespuesta>(`${this.baseUrl}/actividad/buscarId/${id}`).pipe(
      tap(response => {
        if (response) {
          console.log('Usuarios:', response)
        } else {
          throw new Error('Error, no se pudo mostrar la actividad')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

    // BUSCAR ACTIVIDAD POR NOMBRE (AFICIONADO)

    mostrarActividadNombre(nombre: string): Observable<ActividadRespuesta> {
      return this.http.get<ActividadRespuesta>(`${this.baseUrl}/actividad/buscarNombre/${nombre}`).pipe(
        tap(response => {
          if (response) {
            console.log('Actividades:', response)
          } else {
            throw new Error('Error, no se pudo mostrar la actividad')
          }
        }),
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
    }

    // VER PARTICIPANTES ACTIVIDAD (MODAL) (AFICIONADO)

    verParticipantesActividad(id: number): Observable<ParticipantesRespuesta> {
      return this.http.get<ParticipantesRespuesta>(`${this.baseUrl}/participantes/${id}`, { params: { auth: 'true' } }).pipe(
        tap(response => {
          if (response) {
            console.log('Usuarios:', response)
          } else {
            throw new Error('Error, no se pudo mostrar los participantes de la actividad')
          }
        }),
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
    }

    // ELIMINAR ACTIVIDAD (OPERADOR)

    eliminarActividad(id: number): Observable<ActividadRespuesta> {
      return this.http.delete<ActividadRespuesta>(`${this.baseUrl}/actividad/baja/${id}`, { params: { auth: 'true' } }).pipe(
        tap(response => {
          if (response) {
            console.log('Usuarios:', response)
          } else {
            throw new Error('Error, no se pudo eliminar la actividad')
          }
        }),
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
    }

    // MODIFICAR ACTIVIDAD (OPERADOR)

    modificarActividad(actividad: Actividad, formData: FormData): Observable<ActividadRespuesta | undefined> {
      return this.http.put<ActividadRespuesta>(`${this.baseUrl}/actividad/modificar/${actividad.id}`, formData, { params: { auth: 'true' } }).pipe(
        tap(response => {
          if (response) {
            console.log('Actividad modificada:', response)
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


    // ALTA ACTIVIDAD DE UN UNICO CONTACTO (OPERADOR)

    altaActividadUnico(actividad: Actividad, formData: FormData): Observable<ActividadUnicoContactoRespuesta | undefined> {
      return this.http.post<ActividadUnicoContactoRespuesta>(`${this.baseUrl}/actividad/alta/unicoContacto`, formData, { responseType: 'json', params: { auth: 'true' } }).pipe(
        tap(response => {
          if (response) {
            console.log('Actividad  de un unico contacto creada:', response)
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

    // ALTA ACTIVIDAD DE VARIOS CONTACTOS (OPERADOR)

    altaActividadVarios(actividad: Actividad, formData: FormData): Observable<ActividadVariosContactosRespuesta | undefined> {
      return this.http.post<ActividadVariosContactosRespuesta>(`${this.baseUrl}/actividad/alta/variosContactos`, formData, { responseType: 'json', params: { auth: 'true' } }).pipe(
        tap(response => {
          if (response) {
            console.log('Actividad de varios contactos creada:', response)
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

    // MOSTRAR MODALIDADES

    modalidades(): Observable<ModalidadesRespuesta> {
      return this.http.get<ModalidadesRespuesta>(`${this.baseUrl}/actividades/modalidades`, { params: { auth: 'true' } }).pipe(
        tap(response => {
          if (response) {
            console.log('Modalidades:', response)
          } else {
            throw new Error('Error, no se pudo mostrar las modalidades')
          }
        }),
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
    }

    // MOSTRAR MODOS

    modos(): Observable<ModosRespuesta> {
      return this.http.get<ModosRespuesta>(`${this.baseUrl}/actividades/modos`, { params: { auth: 'true' } }).pipe(
        tap(response => {
          if (response) {
            console.log('Modos:', response)
          } else {
            throw new Error('Error, no se pudo mostrar los mods')
          }
        }),
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
    }

    //MOSTRAR CONCURSOS

    mostrarConcursosPendientes(): Observable<ConcursoRespuesta> {

      return this.http.get<ConcursoRespuesta>(`${this.baseUrl}/concursos/pendientes`, { params: { auth: 'true' } }).pipe(
          tap(response => {
              if (response) {
                  console.log('Usuarios:', response)
              } else {
                  throw new Error('Error, no se pudo mostrar los concursos pendientes')
              }
          }),
          catchError((error) => {
              console.error(error);
              throw error;
          })
      );
  }

  }