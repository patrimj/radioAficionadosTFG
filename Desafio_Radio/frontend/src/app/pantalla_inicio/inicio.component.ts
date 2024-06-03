import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

//---PrimeNG---
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from "primeng/toast";

//---Interfaces---
import {
  Usuario,
  Noticia,
} from "./inicio";

//---Servicio---
import { InicioService } from './inicio.service';
import { WebsocketService } from '../servicios/websocket.service';

//---Helpers---
import { validarNoticias } from '../helpers/validaciones';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule, ToastModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  //---Mensajes---
  mensaje: Message[] = [];
  mensajeEliminado: Message[] = [];
  mensajeModificado: Message[] = [];

  //---Noticias---
  noticias: Noticia[] = [];
  noticia: Noticia = { id: 0, nombre: '', fecha: new Date(), descripcion: '' };

  //---Usuario---
  adminOper: Usuario = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', password: '', url_foto: '', id_examen: '' };
  adminOpers: Usuario[] = [];

  //---Recursos---
  usuario: Usuario | null = null;
  noticiaSeleccionada: boolean = false;

  datosLogin = JSON.parse(localStorage.getItem('usuarioDatos')!) || null;


  constructor(private inicioService: InicioService, private router: Router, private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.mostrarNoticias();
    this.administradores();
    this.mostrarOperadores();
  }

  hayRegistros() {
    return this.noticias.length > 0;
  }

  // COMPROBAR SI EL USUARIO ES ADMIN

  esAdmin(): boolean {
    let esAdmin = false; 

    if (this.datosLogin && this.datosLogin.roles) {
        for (let i = 0; i < this.datosLogin.roles.length; i++) {
            if (this.datosLogin.roles[i].RolAsignado && this.datosLogin.roles[i].RolAsignado.id_rol === 1) {
                esAdmin = true;
                break; 
            }
        }
    }
    return esAdmin; 
}



  // ELIMINAR NOTICIA

  eliminarNoticia(id: number) {
    this.inicioService.eliminarNoticia(id).subscribe(
      data => {
        if (data) {
          this.mensajeEliminado = [{ severity: 'success', summary: 'Noticia eliminada', detail: '' }]
          this.mensaje = [];
          this.mensajeModificado = [];
          this.mostrarNoticias();
        }
      },
      error => {
        if (error) {
          this.mensajeEliminado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  //MOSTRAR NOTICIAS

  mostrarNoticias() {
    this.inicioService.mostrarNoticias().subscribe((noticia) => {
      this.noticias = noticia.data;
    });
  }

  // VALIDAR NOTICIA

  validarNoticia(): string {
    return validarNoticias(this.noticia)
  }

  // CREAR NOTICIA

  crearNoticia() {
    const mensajeValidado = this.validarNoticia();

    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    this.inicioService.crearNoticia(this.noticia).subscribe(
      data => {
        if (data) {
          this.mensaje = [{ key: 'mensaje', severity: 'success', summary: 'Noticia creada', detail: '' }]
          this.mensajeModificado = [];
          this.mensajeEliminado = [];

          this.mostrarNoticias();

          this.webSocketService.noticiaCreada(this.noticia);

          this.noticia = { id: 0, nombre: '', fecha: new Date(), descripcion: '' };
        }
      },
      error => {
        if (error) {
          this.mensaje = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  // SELECCIONAR NOTICIA

  seleccionarNoticia(noticia: Noticia) {
    this.noticia = noticia;
    this.noticiaSeleccionada = true;
  }

  // DESELECCIONAR NOTICIA

  deseleccionarNoticia() {
    this.noticia = { id: 0, nombre: '', fecha: new Date(), descripcion: '' };
    this.noticiaSeleccionada = false;
  }

  // MODIFICAR NOTICIA

  modificarNoticia() {

    const mensajeValidado = this.validarNoticia();

    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    this.inicioService.modificarNoticia(this.noticia).subscribe(

      data => {
        if (data) {
          this.mensajeModificado = [{ severity: 'success', summary: 'Noticia modificada', detail: '' }];
          this.mensaje = [];
          this.mensajeEliminado = [];

          this.mostrarNoticias();

          this.noticia = { id: 0, nombre: '', fecha: new Date(), descripcion: '' };
        }
      },
      error => {
        if (error) {
          this.mensajeModificado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }

      }
    );

  }

  // MOSTRAR ADMINISTRADORES

  administradores() {
    this.inicioService.mostrarAdministradores().subscribe((admin) => {
      this.adminOpers = admin.data;
    })
  }

  // MOSTRAR OPERADORES

  mostrarOperadores() {
    this.inicioService.mostrarAdministradores().subscribe((oper) => {
      this.adminOpers = oper.data;
    })
  }



}
