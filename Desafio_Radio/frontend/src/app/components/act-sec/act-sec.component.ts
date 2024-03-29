import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ActividadSecundaria } from '../../interfaces/actividad-secundaria';
import { ActividadesService } from '../../servicios/actividades.service';

@Component({
  selector: 'app-act-sec',
  standalone: true,
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './act-sec.component.html',
  styleUrl: './act-sec.component.css'
})
export class ActSecComponent {

  @Input() actividad: ActividadSecundaria | null = null;
  @Output() salidaModificarActividad = new EventEmitter<ActividadSecundaria>();
  @Output() salidaVerContactos = new EventEmitter<ActividadSecundaria>();

  modificarActividad(actividad: ActividadSecundaria) {
    this.salidaModificarActividad.emit(actividad);
  }

  cambiarImagen(estado: boolean): string {
    return this.actividad?.completada == true ? 'img-completada' : '';
  }

  guardarId(id: number) {
    localStorage.setItem('idActividad', id.toString());
  }

  verContactos(actividad: ActividadSecundaria) {
    this.salidaVerContactos.emit(actividad);
  }
}
