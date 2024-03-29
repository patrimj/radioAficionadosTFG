// Patricia

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

//---PrimeNG---
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

//---Interfaces---
import { Noticias } from '../../interfaces/noticias';
import { Rol } from '../../interfaces/rol';
import { Usuario } from '../../interfaces/usuario';

//---Servicio---
import { AuthService } from '../../servicios/auth.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { WebsocketService } from '../../servicios/websocket.service';

//---Helpers---
import { recibirIdUsuario, recibirUsuario, esAdmin } from '../../helpers/comun';
import { validarNoticias } from '../../helpers/validaciones';

import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule, ToastModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})

export class NoticiasComponent implements OnInit {

  //---Mensajes---
  mensaje: Message[] = [];
  mensajeEliminado: Message[] = [];
  mensajeModificado: Message[] = [];

  //---Noticias---
  noticias: Noticias[] = [];
  noticia: Noticias = { id: 0, nombre: '', fecha: new Date(), descripcion: '' };

  //Utilizado para filtrar x Administrador (Hecho por : Elena)
  usuario: Usuario | null = null;
  id_usuario = 0;
  esAdmin: Rol | null = null;

  noticiaSeleccionada: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router, private authService: AuthService, private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.usuario = recibirUsuario();
    this.id_usuario = recibirIdUsuario(this.usuario);
    this.esAdmin = esAdmin(this.usuario);
    this.mostrarNoticia()
  }

  hayRegistros() {
    return this.noticias.length > 0;
  }

  eliminarNoticia(id: number) {
    this.usuarioService.eliminarNoticia(id).subscribe(
      data => {
        if (data) {
          this.mensajeEliminado = [{ severity: 'success', summary: 'Noticia eliminada', detail: '' }]
          this.mensaje = [];
          this.mensajeModificado = [];
          this.mostrarNoticia();
        }
      },
      error => {
        if (error) {
          this.mensajeEliminado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  mostrarNoticia() {
    this.usuarioService.mostrarNoticias().subscribe((noticias) => {
      this.noticias = noticias;
    });
  }

  validarNoticia(): string {
    return validarNoticias(this.noticia)
  }

  agregarNoticia() {
    const mensajeValidado = this.validarNoticia();

    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    this.usuarioService.crearNoticia(this.noticia).subscribe(
      data => {
        if (data) {
          this.mensaje = [{ key: 'mensaje', severity: 'success', summary: 'Noticia creada', detail: '' }]
          this.mensajeModificado = [];
          this.mensajeEliminado = [];

          this.mostrarNoticia();
          
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

  seleccionarNoticia(noticia: Noticias) {
    this.noticia = noticia;
    this.noticiaSeleccionada = true;
  }

  deseleccionarNoticia() {
    this.noticia = { id: 0, nombre: '', fecha: new Date(), descripcion: '' };
    this.noticiaSeleccionada = false;
  }

  modificarNoticia() {

    const mensajeValidado = this.validarNoticia();

    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    this.usuarioService.modificarNoticia(this.noticia).subscribe(

      data => {
        if (data) {
          this.mensajeModificado = [{ severity: 'success', summary: 'Noticia modificada', detail: '' }];
          this.mensaje = [];
          this.mensajeEliminado = [];

          this.mostrarNoticia();

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
  


}
