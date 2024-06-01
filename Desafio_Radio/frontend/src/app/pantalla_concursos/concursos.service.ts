import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//---Interfaces---

import {
    ConcursoRespuesta,
    Concurso,
    ParticipantesConcursoRespuesta  
} from "./concursos";


@Injectable({
    providedIn: 'root'
})
export class ConcursosService {
    private baseUrl: string = environment.baseUrl

    constructor(private http: HttpClient) { }

    // MUESTRA TODOS LOS CONCURSOS 

    mostrarConcursos(): Observable<ConcursoRespuesta> {

        return this.http.get<ConcursoRespuesta>(`${this.baseUrl}/concursos`, { params: { auth: 'true' } }).pipe(
            tap(response => {
                if (response) {
                    console.log('Usuarios:', response)
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

    // MUESTRA TODS LOS CONCURSOS TERMINADOS

    mostrarConcursosTerminados(): Observable<ConcursoRespuesta> {

        return this.http.get<ConcursoRespuesta>(`${this.baseUrl}/concursos/terminados`, { params: { auth: 'true' } }).pipe(
            tap(response => {
                if (response) {
                    console.log('Usuarios:', response)
                } else {
                    throw new Error('Error, no se pudo mostrar los concursos terminados')
                }
            }),
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

    // MUESTRA TODS LOS CONCURSOS PENDIENTES

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

    //ALTA CONCURSO 

    altaConcurso(concurso: Concurso, formData: FormData): Observable<ConcursoRespuesta | undefined> {
        return this.http.post<ConcursoRespuesta>(`${this.baseUrl}/concurso/alta`, formData, { responseType: 'json', params: { auth: 'true' } }).pipe(
            tap(response => {
                if (response) {
                    console.log('Concurso creado:', response)
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

    // MODIFICAR CONCURSO

    modificarConcurso(concurso: Concurso, formData: FormData): Observable<ConcursoRespuesta | undefined> {

        return this.http.put<ConcursoRespuesta>(`${this.baseUrl}/concurso/modificar/${concurso.id}`, formData, { params: { auth: 'true' } }).pipe(
            tap(response => {
                if (response) {
                    console.log('Concurso modificado:', response)
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

    // BAJA CONCURSO

    bajaConcurso(id: number): Observable<ConcursoRespuesta> {
        return this.http.delete<ConcursoRespuesta>(`${this.baseUrl}/concurso/baja/${id}`, { params: { auth: 'true' } }).pipe(
            tap(response => {
                if (response) {
                    console.log('Concurso eliminado:', response)
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

    //TERMINAR CONCURSO

    terminarConcurso(id: number): Observable<ConcursoRespuesta> {
        return this.http.put<ConcursoRespuesta>(`${this.baseUrl}/concurso/terminar/${id}`, { params: { auth: 'true' } }).pipe(
            tap(response => {
                if (response) {
                    console.log('Concurso terminado:', response)
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

    // MOSTRAR CONCURSO ID

    mostrarConcursoId(id: number): Observable<ConcursoRespuesta> {
        return this.http.get<ConcursoRespuesta>(`${this.baseUrl}/concurso/buscarId/${id}`, { params: { auth: 'true' } }).pipe(
            tap(response => {
                if (response) {
                    console.log('Concurso:', response)
                } else {
                    throw new Error('Error, no se pudo mostrar el concurso')
                }
            }),
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

    // MOSTRAR CONCURSO NOMBRE

    mostrarConcursoNombre(nombre: string): Observable<ConcursoRespuesta> {
        return this.http.get<ConcursoRespuesta>(`${this.baseUrl}/concurso/buscarNombre/${nombre}`, { params: { auth: 'true' } }).pipe(
            tap(response => {
                if (response) {
                    console.log('Concurso:', response)
                } else {
                    throw new Error('Error, no se pudo mostrar el concurso')
                }
            }),
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

    // VER ACTIVIDADES DE UN CONCURSO (MODAL) (AFICIONADO) *** Pantalla Perfil (actividadRoutes) ***

    verActividadesConcurso(id_principal: number): Observable<ConcursoRespuesta> {
        return this.http.get<ConcursoRespuesta>(`${this.baseUrl}/concurso/actividades/${id_principal}`, { params: { auth: 'true' } }).pipe(
            tap(response => {
                if (response) {
                    console.log('Actividades:', response)
                } else {
                    throw new Error('Error, no se pudo mostrar las actividades del concurso')
                }
            }),
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

    // VER PARTICIPANTES DE UN CONCURSO (MODAL) (AFICIONADO) 

    verParticipantesConcurso(id_principal: number): Observable<ParticipantesConcursoRespuesta> {
        return this.http.get<ParticipantesConcursoRespuesta>(`${this.baseUrl}/concurso/participantes/${id_principal}`, { params: { auth: 'true' } }).pipe(
            tap(response => {
                if (response) {
                    console.log('Participantes:', response)
                } else {
                    throw new Error('Error, no se pudo mostrar los participantes del concurso')
                }
            }),
            catchError((error) => {
                console.error(error);
                throw error;
            })
        );
    }

}