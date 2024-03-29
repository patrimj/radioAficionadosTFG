import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CsvService {
    private baseUrl: string = environment.baseUrl
    private csvUrl: string = `${this.baseUrl}/procesar-csv`;

    constructor(private http: HttpClient) { }

    enviarCsv(archivo: File) {
        const formData = new FormData();
        formData.append('archivo', archivo);

        return this.http.post(this.csvUrl, formData);
    }
}