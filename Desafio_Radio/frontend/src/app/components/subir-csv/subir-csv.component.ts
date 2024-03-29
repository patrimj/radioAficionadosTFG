import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { CsvService } from '../../servicios/csv.service';

@Component({
  selector: 'app-subir-csv',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MessagesModule],
  templateUrl: './subir-csv.component.html',
  styleUrl: './subir-csv.component.css'
})
export class SubirCsvComponent {

  constructor(private csvService: CsvService) { }

  mensaje: Message[] = [{ severity: 'info', summary: 'Seleccione un fichero CSV'}];

  formularioCsv = new FormGroup({
    nombre: new FormControl(''),
    archivo: new FormControl(),
  })

  seleccionarArchivo(event: any) {

    this.formularioCsv.get('nombre')?.setValue(event.target.files[0].name)
    this.formularioCsv.get('archivo')?.setValue(event.target.files[0]);

    const nombre = this.formularioCsv.get('nombre')?.value;

    if (nombre) {
      if (this.validarExtension(nombre)) {
        this.formularioCsv.get('nombre')?.setValue(event.target.files[0].name)
        this.formularioCsv.get('archivo')?.setValue(event.target.files[0]);
        this.mensaje = [{ severity: 'success', summary: 'Archivo adjuntado correctamente'}];
      } else {
        this.mensaje = [{ severity: 'error', summary: 'El archivo no es un CSV'}];
        this.formularioCsv.reset();
      }
    }
  }

  subirArchivo() {
    const archivo = this.formularioCsv.get('archivo')?.value;
    if (archivo) {
      this.csvService.enviarCsv(archivo).subscribe(
        response => {
          this.mensaje = [{ severity: 'success', summary: 'Archivo enviado correctamente'}];
        },
        error => {
          this.mensaje = [{ severity: 'error', summary: 'Error al enviar el archivo'}];
        }
      );
    } else {
      this.mensaje = [{ severity: 'error', summary: 'No se ha adjuntado ningun archivo'}];
    }
  }

  validarExtension(nombre: string): boolean {
    const extension = nombre.split('.').pop();
    if (extension === 'csv') {
      return true;
    } else {
      return false;
    }
  }
}
