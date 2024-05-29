import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//---Servicios---
import { AuthService } from '../servicios/auth.service';

//---Interfaces---

import { 
  UsuariosRespuesta, 
  Usuario, 
  AsignarRolRespuesta,
  LoginRespuesta,
  RegistroRespuesta,
  RecuperacionPasswordRespuesta

} from "../interfaces/usuarios";


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient, private authService: AuthService) { }


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

  registro(usuario: Usuario, formData: FormData): Observable<RegistroRespuesta> {
    return this.http.post<RegistroRespuesta>(`${this.baseUrl}/registro`, formData).pipe(
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

  altaUsuario(usuario: Usuario, formData: FormData): Observable<Usuario | undefined> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuario/alta/${usuario.id_rol}`, formData, { responseType: 'json', params: { auth: 'true' } }).pipe(
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

bajaUsuario(id: number): Observable<Usuario | undefined> { 
  return this.http.delete<Usuario>(`${this.baseUrl}/usuario/baja/${id}`, { params: { auth: 'true' }  }).pipe(
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

modificarUsuario(usuario: Usuario, formData: FormData): Observable<Usuario | undefined> { 

  return this.http.put<Usuario>(`${this.baseUrl}/usuario/modificar/${usuario.id}`, formData, { params: { auth: 'true' } }).pipe(
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

// VER UN USUARIO CON DIPLOMA

mostrarUsuarioConDiploma(email: string): Observable<Usuario> {
  
    return this.http.get<Usuario>(`${this.baseUrl}/usuario/diploma/${email}`, { params: { auth: 'true' } }).pipe(
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
  return this.http.get<UsuariosRespuesta>(`${this.baseUrl}/usuarios/diploma`, { params: { auth: 'true' }  }).pipe(
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

mostrarUsuarios(): Observable < UsuariosRespuesta > {

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


}