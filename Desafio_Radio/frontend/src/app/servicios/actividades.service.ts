// JuanNavarrete, Patricia & Elena

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//---Servicio---
import { AuthService } from '../servicios/auth.service';

//---Interfaces---
import { ActividadSecundaria, nuevaActSecundaria, ActSecModificada } from '../interfaces/actividad-secundaria';
import { Principales, RespuestaBackendPrincipales, RespuestaBackendSecundarias, RespuestaBackendParticipantesPrincipales, RespuestaBackendParticipantesSecundarias } from '../interfaces/principales';
import { RespuestaBackendOperador } from '../interfaces/actividades-aficionado';
import { RespuestaModalidades } from "../interfaces/modalidad";
import {
  BuscarContactosSec,
  CrearContacto,
  MostrarUsuarioSecundaria, RespuestaContactoCompleto,
  RespuestaCrearContacto, RespuestaObtenerPuntuacion,
  RespuestaRestantesActividad
} from "../interfaces/contacto";
import { LetrasUsuarioSecundaria } from "../interfaces/letras-usuario-secundaria";
import { RespuestaProgreso } from "../interfaces/perfil";

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient, private authService: AuthService) { }


  // ---------------------------- RUTAS ADMINISTRADOR ----------------------------

  // VER TODAS LAS ACTIVIDADES PRINCIPALES

  mostrarActividadesPrincipales(): Observable<RespuestaBackendPrincipales> {

    return this.http.get<RespuestaBackendPrincipales>(`${this.baseUrl}/actividades/principales`, {  params: { auth: 'true' }  }).pipe(
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

  // VER TODAS LAS ACTIVIDADES SECUNDARIAS

  mostrarActividadesSecundariasAdmin(): Observable<RespuestaBackendSecundarias> {

    return this.http.get<RespuestaBackendSecundarias>(`${this.baseUrl}/actividades/secundarias`, {  params: { auth: 'true' }  }).pipe(
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

  // VER TODAS LAS ACTIVIDADES PRINCIPALES TERMINADAS

  mostrarActividadesPrincipalesTerminadas(): Observable<RespuestaBackendPrincipales> {
    return this.http.get<RespuestaBackendPrincipales>(`${this.baseUrl}/actividades/principales/terminadas`, {  params: { auth: 'true' }  }).pipe(
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

  // VER TODAS LAS ACTIVIDADES SECUNDARIAS TERMINADAS

  mostrarActividadesSecundariasTerminadas(): Observable<RespuestaBackendSecundarias> {
    return this.http.get<RespuestaBackendSecundarias>(`${this.baseUrl}/actividades/secundarias/terminadas`, {  params: { auth: 'true' }  }).pipe(
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

  // VER TODAS LAS ACTIVIDADES PRINCIPALES NO TERMINADAS
  mostrarActividadesPrincipalesPendientes(): Observable<RespuestaBackendPrincipales> {

    return this.http.get<RespuestaBackendPrincipales>(`${this.baseUrl}/actividades/principales/pendientes`, {  params: { auth: 'true' }  }).pipe(
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

  // VER TODAS LAS ACTIVIDADES SECUNDARIAS NO TERMINADAS

  mostrarActividadesSecundariasPendientes(): Observable<RespuestaBackendSecundarias> {

    return this.http.get<RespuestaBackendSecundarias>(`${this.baseUrl}/actividades/secundarias/pendientes`, {  params: { auth: 'true' }  }).pipe(
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

  // ALTA ACTIVIDAD

  altaActividadPrincipal( formData: FormData): Observable<Principales> {
    return this.http.post<Principales>(`${this.baseUrl}/actividad/principal/alta`, formData, {  params: { auth: 'true' } , responseType: 'json' }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividad:', response)
        } else {
          throw new Error('Error, no se pudo dar de alta la actividad')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // MODIFICAR ACTIVIDAD

  modificarActividadPrincipal(principal: Principales, formData: FormData): Observable<Principales> {

    return this.http.put<Principales>(`${this.baseUrl}/actividad/principal/modificar/${principal.id}`, formData, {  params: { auth: 'true' }  }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividad:', response)
        } else {
          throw new Error('Error, no se pudo modificar la actividad')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // BAJA ACTIVIDAD

  bajaActividadPrincipal(id: number): Observable<Principales> {
    const headers = new HttpHeaders({
      'x-token': this.authService.getToken(),
    });
    return this.http.delete<Principales>(`${this.baseUrl}/actividad/principal/baja/${id}`, {  params: { auth: 'true' }  }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividad:', response)
        } else {
          throw new Error('Error, no se pudo dar de baja la actividad')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // VER PARTICIPANTES ACTIVIDAD SECUNDARIAS

  mostrarParticipantesSecundarias(): Observable<RespuestaBackendParticipantesSecundarias> {

    return this.http.get<RespuestaBackendParticipantesSecundarias>(`${this.baseUrl}/participantes/secundarias`, {  params: { auth: 'true' }  }).pipe(
      tap(response => {
        if (response) {
          console.log('Participantes de las actividades secundarias:', response)
        } else {
          throw new Error('Error, no se pudo mostrar los participantes de las actividades secundarias')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // ---------------------------- RUTAS OPERADOR ----------------------------

  // CREAR CONTACTO
  crearContacto(contacto: CrearContacto) {
    return this.http.post<RespuestaCrearContacto>(`${this.baseUrl}/contacto`, contacto, { params: { auth: 'true' } });
  }

  // CREAR CONTACTO PUNTOS
  crearContactoPuntos(contacto: CrearContacto) {
    return this.http.post<RespuestaCrearContacto>(`${this.baseUrl}/contacto/puntos`, contacto, { params: { auth: 'true' } });
  }

  // CREAR CONTACTO GENERICO
  crearContactoGenerico(contacto: CrearContacto) {
    return this.http.post<RespuestaCrearContacto>(`${this.baseUrl}/contacto/generico`, contacto, { params: { auth: 'true' } });
  }


  // VER TODOS LOS CONTACTOS

  // VER CONTACTO CONCRETO (para ver sus premios y poder asignarle unos que no tenga)

  // CREAR ACTIVIDAD SECUNDARIA

  crearActividadSecundaria(actividad: FormData): Observable<nuevaActSecundaria>{
    const headers = new HttpHeaders({
      'x-token': this.authService.getToken(),
    });
    return this.http.post<nuevaActSecundaria>(`${this.baseUrl}/secundarias`, actividad, { headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividad:', response)
        } else {
          throw new Error('Error, no se pudo crear la actividad')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // VER ACTIVIDADES SECUNDARIAS

  mostrarActividadesSecundariasOperador(): Observable<ActividadSecundaria[]> {
    const headers = new HttpHeaders({
      'x-token': this.authService.getToken(),
    });
    return this.http.get<ActividadSecundaria[]>(`${this.baseUrl}/secundarias`, { headers }).pipe(
      tap(response => {
        if (response) {
          return true;
        } else {
          throw new Error('Error, no se pudo mostrar las actividades secundarias');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // VER UNA ACTIVIDAD SECUNDARIA EN CONCRETO

  mostrarActividadSecundaria(id: number): Observable<ActividadSecundaria> {
    const headers = new HttpHeaders({
      'x-token': this.authService.getToken(),
    });
    return this.http.get<ActividadSecundaria>(`${this.baseUrl}/secundarias/${id}`, { headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividad Secundaria:', response);
        } else {
          throw new Error('Error, no se pudo mostrar la actividad secundaria');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // TERMINAR ACTIVIDADES SECUNDARIAS

  terminarActividadSecundaria(id: number): Observable<ActividadSecundaria> {
    const headers = new HttpHeaders({
      'x-token': this.authService.getToken(),
    })
    return this.http.put<ActividadSecundaria>(`${this.baseUrl}/secundarias/terminar/${id}`, { headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividad Secundaria:', response);
        } else {
          throw new Error('Error, no se pudo terminar la actividad secundaria');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // DAR DE BAJA UNA ACTIVIDAD SECUNDARIA

  // MODIFICAR ACTIVIDAD SECUNDARIA

  modificarActividadSecundaria(id: number, actividad: ActSecModificada): Observable<ActSecModificada> {
    const headers = new HttpHeaders({
      'x-token': this.authService.getToken(),
    })
    return this.http.put<ActSecModificada>(`${this.baseUrl}/secundarias/modificar/${id}`, actividad, { headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividad Secundaria:', response);
        } else {
          throw new Error('Error, no se pudo modificar la actividad secundaria');
        }
      })
    )
  }

  // ALTA ACTIVIDAD SECUNDARIA

  darAltaActividadSecundaria() {
    const headers = new HttpHeaders({
      'x-token': this.authService.getToken(),
    })
    return this.http.post<ActividadSecundaria>(`${this.baseUrl}/secundarias/alta`, { headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividad Secundaria:', response);
        } else {
          throw new Error('Error, no se pudo dar de alta la actividad secundaria');
        }
      })
    )
  }

  verModalidades(): Observable<RespuestaModalidades> {
    return this.http.get<RespuestaModalidades>(`${this.baseUrl}/modalidades`, { params: { auth: 'true' } });
  }

  comprobarContactoCompleto(idUsuario: number, idActividad: number) {
    return this.http.post<RespuestaContactoCompleto>(
      `${this.baseUrl}/contactos/completo`,
      { idUsuario: idUsuario, idActividad: idActividad },
      { params: { auth: 'true' } }
    );
  }


  // ---------------------------- RUTAS AFICIONADO ----------------------------

  // VER ACTIVIDADES OPERADOR (CONCURSOS Y ACTIVIDADES)

  mostrarActRelacionadasAficionado(): Observable<RespuestaBackendOperador> {
    return this.http.get<RespuestaBackendOperador>(`${this.baseUrl}/aficionado/principales`, {  params: { auth: 'true' }  }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividades:', response);
        } else {
          throw new Error('Error, no se pudo mostrar las actividades');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  mostrarActSecundariasAficionado(): Observable<RespuestaBackendSecundarias> {
    return this.http.get<RespuestaBackendSecundarias>(`${this.baseUrl}/aficionado/secundarias`, {  params: { auth: 'true' }  }).pipe(
      tap(response => {
        if (response) {
          console.log('Actividades Secundarias:', response);
        } else {
          throw new Error('Error, no se pudo mostrar las actividades secundarias');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  //PEDIR DIPLOMA

  pedirDiploma(actividad: string, url: string): Observable<string> {

    return this.http.post<string>(`${this.baseUrl}/diploma/enviar`, { actividad, url }, {  params: { auth: 'true' } , responseType: 'text' as 'json' }).pipe(
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

  verPuntuacionRestanteSecundaria(usuarioSecundaria: MostrarUsuarioSecundaria) {
    return this.http.post<RespuestaObtenerPuntuacion>(`${this.baseUrl}/contactos/restantes/puntuacion`, usuarioSecundaria, { params: { auth: 'true' } })
  }

  // VER RESTANTES USUARIO SECUNDARIA  (para ver los premios que le faltan en esa actividad)
  verLetrasRestantesSecundaria(usuarioSecundaria: MostrarUsuarioSecundaria): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/restantes/letras`, usuarioSecundaria, { params: { auth: 'true' } });
  }

  verSecundariasUsuario(idUsuario: Number) {
    return this.http.get<RespuestaProgreso>(
      `${this.baseUrl}/participante/secundarias/${idUsuario}`,
      { params: { auth: 'true' } }
    );
  }

  verContactosSec(id: number) {
    return this.http.get<BuscarContactosSec>(
      `${this.baseUrl}/contactos/${id}`,
      { params: { auth: 'true' } }
    );
  }
}
