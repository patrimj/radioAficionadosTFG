import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//---Interfaces---

import {


} from "./contactos";


@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }


}