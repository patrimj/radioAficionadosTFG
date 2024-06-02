import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//---Interfaces---

import {
  RegistrarContactoRespuesta,
  UsuariosRespuesta,
  ContactosConDetallesRespuesta,
  ConcursoContactoRespuesta,
  SolucionConcursoRespuesta,
  ActividadesVariosContactosRespuesta,
  PremioActividadRespuesta,
  PremiosUsuarioConcursoRespuesta,
  ActividadesContactoRespuesta,
  ModalidadActividadRespuesta,
  ContactosRegistrado

} from "./contactos";


@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  // REGISTRAR CONTACTO (Botón final)

  registrarContacto(contactosRegistrado: ContactosRegistrado): Observable<RegistrarContactoRespuesta> {
    return this.http.post<RegistrarContactoRespuesta>(`${this.baseUrl}/contacto/registrar`, contactosRegistrado, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Contacto registrado:', response)
        } else {
          throw new Error('Error, no se pudo registrar el contacto')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // LISTAR USUARIOS 

  mostrarUsuarios(): Observable<UsuariosRespuesta> {
    return this.http.get<UsuariosRespuesta>(`${this.baseUrl}/contacto/usuarios`, { params: { auth: 'true' } }).pipe(
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

  // MOSTRAR TODOS LOS CONTACTOS DETALLADOS

  mostrarContactosConDetalles(): Observable<ContactosConDetallesRespuesta> {
    return this.http.get<ContactosConDetallesRespuesta>(`${this.baseUrl}/contacto/contactos`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Contactos:', response)
        } else {
          throw new Error('Error, no se pudo mostrar los contactos')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // ************************** REGISTRAR USUARIO EN UNA ACTIVIDAD DE VARIOS CONTACTOS ************************** //


  // LISTAR CONCURSOS

  mostrarConcursosContacto(): Observable<ConcursoContactoRespuesta> {
    return this.http.get<ConcursoContactoRespuesta>(`${this.baseUrl}/contacto/concursos`, { params: { auth: 'true' } }).pipe(
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

  // MOSTRAR SOLUCIÓN CONCURSO

  solucionConcurso(id_principal: number): Observable<SolucionConcursoRespuesta> {
    return this.http.get<SolucionConcursoRespuesta>(`${this.baseUrl}/contacto/concurso/solucion/${id_principal}`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Solución:', response)
        } else {
          throw new Error('Error, no se pudo mostrar la solución')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // MOSTRAR ACTIVIDADES QUE PERTENECEN A UN CONCURSO

  actividadesVariosContactos(id_principal: number): Observable<ActividadesVariosContactosRespuesta> {
    return this.http.get<ActividadesVariosContactosRespuesta>(`${this.baseUrl}/contacto/concurso/actividades/${id_principal}`, { params: { auth: 'true' } }).pipe(
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

  // MOSTRAR PREMIO DE LA ACTIVIDAD

  premioActividad(id_secundaria: number): Observable<PremioActividadRespuesta> {
    return this.http.get<PremioActividadRespuesta>(`${this.baseUrl}/contacto/actividad/premio/${id_secundaria}`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Premio:', response)
        } else {
          throw new Error('Error, no se pudo mostrar el premio')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }


  // MOSTRAR LOS PREMIOS DE UN USUARIO EN UN CONCURSO

  premiosUsuarioConcurso(id_usuario: number, id_principal: number): Observable<PremiosUsuarioConcursoRespuesta> {
    return this.http.get<PremiosUsuarioConcursoRespuesta>(`${this.baseUrl}/contacto/usuario/premios/${id_usuario}/${id_principal}`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Premios:', response)
        } else {
          throw new Error('Error, no se pudo mostrar los premios')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  // ************************** REGISTRAR USUARIO EN UNA ACTIVIDAD DE VARIOS CONTACTOS ************************** //


  // MOSTRAR TODAS LAS ACTIVIDADES

  mostrarActividades(): Observable<ActividadesContactoRespuesta> {
    return this.http.get<ActividadesContactoRespuesta>(`${this.baseUrl}/actividades`, { params: { auth: 'true' } }).pipe(
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

  // MOSTRAR LA MODALIDAD DE LA ACTIVIDAD

  modalidadActividad(id_secundaria: number): Observable<ModalidadActividadRespuesta> {
    return this.http.get<ModalidadActividadRespuesta>(`${this.baseUrl}/contacto/actividad/modalidad/${id_secundaria}`, { params: { auth: 'true' } }).pipe(
      tap(response => {
        if (response) {
          console.log('Modalidad:', response)
        } else {
          throw new Error('Error, no se pudo mostrar la modalidad')
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }


}