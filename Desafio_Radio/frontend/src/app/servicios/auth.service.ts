import { Injectable } from '@angular/core';
import {PeticionLogin} from "../interfaces/peticion.login";
import { HttpClient } from '@angular/common/http';
import {tap} from "rxjs";
import {RespuestaLogin} from "../interfaces/respuesta.login";
import {environment} from "../environments/environment";
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// JuanNavarrete

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: Error - NullInjectorError: No provider for _HttpClient!
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  //TODO: Modificar login la ruta que guarde el token, etc 
  login(datosLogin: PeticionLogin) {
    return this.http.post<RespuestaLogin>(`${this.baseUrl}/login`, datosLogin)
  }

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
