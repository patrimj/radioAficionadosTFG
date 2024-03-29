import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ActSecComponent } from '../act-sec/act-sec.component';
import { SubirCsvComponent } from '../subir-csv/subir-csv.component';
import { ActividadesService } from '../../servicios/actividades.service';
import { ActividadSecundaria, nuevaActSecundaria, ActSecModificada } from '../../interfaces/actividad-secundaria';
import {ContactosComponent} from "../act-sec/contactos/contactos.component";

@Component({
  selector: 'app-actividad-secundaria',
  standalone: true,
  imports: [CommonModule, ActSecComponent, ReactiveFormsModule, MessagesModule, SubirCsvComponent, ContactosComponent],
  templateUrl: './actividad-secundaria.component.html',
  styleUrl: './actividad-secundaria.component.css'
})
export class ActividadSecundariaComponent implements OnInit {

  /* Inicialización de variables */

  mensajeEliminado: Message[] = [];
  mensajeModificado: Message[] = [];
  mensajeCreado: Message[] = [{ severity: 'info', summary: 'Complete todos los campos', detail: '' }];

  actividadesSecundarias: ActividadSecundaria[] = [];
  actividadSecundaria: ActividadSecundaria | null = null;
  idActividad: number = 0;
  imagenNombre: string = "";
  imagenFichero: File = new File([], '');

  formularioModificar = new FormGroup({
    nombre: new FormControl(),
    fecha: new FormControl(),
    localizacion: new FormControl(),
    frecuencia: new FormControl(),
    banda: new FormControl(),
    completada: new FormControl()
  });

  formularioNueva = new FormGroup({
   nombre: new FormControl('', [Validators.required]),
   fecha: new FormControl('', [Validators.required]),
   localizacion: new FormControl('', [Validators.required]),
   frecuencia: new FormControl('', [Validators.required]),
   banda: new FormControl('', [Validators.required]),
   id_modo: new FormControl('', [Validators.required]),
   id_modalidad: new FormControl('', [Validators.required]),
  });

  imagen(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.imagenNombre = target.files[0].name;
      this.imagenFichero = target.files[0];
    }
  }

  /* Acciones nada más abrir el componente */

  constructor(private actividadService: ActividadesService) { }
  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades() {
    this.actividadService.mostrarActividadesSecundariasOperador().subscribe(
      data => {
        if (data) {
          this.actividadesSecundarias = data;
        } else {
          this.actividadesSecundarias = [];
        }
      }
    )
  }

  /* Recepcion de Outputs */

  recibirIdActividad(event: any) {
    this.idActividad = event;
    console.log(this.idActividad);
  }

  recibirActividadModificar(event: any) {
    this.actividadSecundaria = event;
    const fechaString = new Date(this.actividadSecundaria!.fecha).toISOString();
    const fechaFormateada = fechaString.split('T')[0];

    this.mensajeModificado = [{ severity: 'info', summary: 'Complete todos los campos', detail: '' }];

    this.formularioModificar = new FormGroup({
      nombre: new FormControl(this.actividadSecundaria!.nombre, Validators.required),
      fecha: new FormControl(fechaFormateada, Validators.required),
      localizacion: new FormControl(this.actividadSecundaria!.localizacion, Validators.required),
      frecuencia: new FormControl(this.actividadSecundaria!.frecuencia, Validators.required),
      banda: new FormControl(this.actividadSecundaria!.banda, Validators.required),
      completada: new FormControl(this.actividadSecundaria!.completada, Validators.required),
    });
  }

  /* Llamadas a servicios */

  crearNuevaActividad() {

    this.mensajeCreado = [{ severity: 'info', summary: 'Complete todos los campos', detail: '' }];

    if (this.formularioNueva.valid) {
      const formulario = this.convertirFormGroupAFormData();

      this.actividadService.crearActividadSecundaria(formulario).subscribe(
        response => {
          this.mensajeCreado = [{ severity: 'success', summary: 'Actividad creada', detail: 'La actividad ha sido creada correctamente' }];
          this.cargarActividades();
        },
        error => {
          this.mensajeCreado = [{ severity: 'error', summary: 'Error', detail: 'No se ha podido crear la actividad' }];
        }
      );
  } else {
      this.mensajeCreado = [{ severity: 'error', summary: 'Error', detail: 'Rellene los campos correctamente' }];
  }}
  guardarModificacion() {
    if (this.formularioModificar.valid) {
      const actividadModificada: ActSecModificada = {
        nombre: this.formularioModificar.get('nombre')?.value,
        fecha: this.formularioModificar.get('fecha')?.value,
        localizacion: this.formularioModificar.get('localizacion')?.value,
        frecuencia: this.formularioModificar.get('frecuencia')?.value,
        banda: this.formularioModificar.get('banda')?.value,
        completada: this.formularioModificar.get('completada')?.value,
      };

      this.actividadService.modificarActividadSecundaria(this.actividadSecundaria!.id, actividadModificada).subscribe(
        response => {
          this.mensajeModificado = [{ severity: 'success', summary: 'Actividad modificada', detail: 'La actividad ha sido modificada correctamente' }];
          this.cargarActividades();
        },
        error => {
          this.mensajeModificado = [{ severity: 'error', summary: 'Error', detail: 'No se ha podido modificar la actividad' }];
        }
      );
    } else {
      this.mensajeModificado = [{ severity: 'error', summary: 'Error', detail: 'Rellene los campos correctamente' }];
    }
  }

  recibirVerContacto(event: any) {
    this.actividadSecundaria = event;
  }

  convertirFormGroupAFormData(): FormData {
    const formData = new FormData();
    const id = JSON.parse(localStorage.getItem('datosLogin')!).usuario.id

    formData.append('nombre', this.formularioNueva.get('nombre')?.value!);
    formData.append('fecha', this.formularioNueva.get('fecha')?.value!);
    formData.append('localizacion', this.formularioNueva.get('localizacion')?.value!);
    formData.append('frecuencia', this.formularioNueva.get('frecuencia')?.value!);
    formData.append('banda', this.formularioNueva.get('banda')?.value!);
    formData.append('id_modo', this.formularioNueva.get('id_modo')?.value!);
    formData.append('id_modalidad', this.formularioNueva.get('id_modalidad')?.value!);
    formData.append('archivo', this.imagenFichero);
    formData.append('id_operador', id);

    return formData;
  }
}
