import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//---PrimeNG---
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

//---Servicio---
import { ActividadesService } from '../../servicios/actividades.service';

//---Interfaces---
import { ActividadPrincipal } from '../../interfaces/actividades-aficionado';
import { ActividadSecundaria } from '../../interfaces/actividades-aficionado';

@Component({
  selector: 'app-actividades-aficionado',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule],
  templateUrl: './actividades-aficionado.component.html',
  styleUrl: './actividades-aficionado.component.css'
})
export class ActividadesAficionadoComponent implements OnInit {

  //---Mensajes---
  mensaje: Message[] = [];

  //---Actividades---
  actividades: ActividadPrincipal[] = [];

  actividadesSecundarias: ActividadSecundaria[] = [];

  constructor(private actividadesService: ActividadesService, private router: Router) { }

  ngOnInit(): void {
    this.mostrarActRelacionadasAficionado();
    this.mostrarActSecundariasAficionado();
  }

  hayRegistros() {
    return this.actividades.length > 0;
  }

  hayRegistrosSecundarios() {
    return this.actividadesSecundarias.length > 0;
  }

  mostrarActRelacionadasAficionado() {
    this.actividadesService.mostrarActRelacionadasAficionado().subscribe((respuesta) => {
      this.actividades = respuesta.data;
    });
  }

  mostrarActSecundariasAficionado() {
    this.actividadesService.mostrarActSecundariasAficionado().subscribe((respuesta) => {
      this.actividadesSecundarias = respuesta.data;
    });

  }

  pedirDiploma(actividad: string, url: string) {
    this.actividadesService.pedirDiploma(actividad, url).subscribe((respuesta) => {
      this.mensaje = [{ severity: 'success', summary: `Diploma enviado a su correo electrónico`, detail: '' }];
    });
  }




}
