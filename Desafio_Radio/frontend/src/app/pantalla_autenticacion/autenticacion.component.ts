import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//---Helpers---
import { validarUsuario} from '../helpers/validaciones';

//---PrimeNG---
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

//---Servicios---
import { UsuariosService } from '../pantalla_usuarios/usuarios.service';

//---Interfaces---
import { Usuario } from "../pantalla_usuarios/usuarios";


@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule],
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.css'
})

export class AutenticacionComponent implements OnInit {

      //---Mensajes---
  mensaje: Message[] = [];
  mensajePassword: Message[] = [];

  //---Usuarios---
  usuarios: Usuario[] = [];
  usuario: Usuario = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', password: '', url_foto: new File([], ''), id_examen: '' };

  //---Recursos---
  usuarioSeleccionado: boolean = false;  //para deseleccionar 
  imagenSubir: File = new File([], '');
  emailRecuperacion: string = '';

    constructor(private usuariosService: UsuariosService, private router: Router) { }

    ngOnInit(): void {

    }

    imagen(event: Event) {
        const eventTarget = event.target as HTMLInputElement;
        if (eventTarget.files && eventTarget.files.length > 0) {
          this.imagenSubir = eventTarget.files[0];
          console.log('imagen:', this.imagenSubir);
        }
      }

    validarDatosUsuario(): string {
        return validarUsuario(this.usuario);
      }

    // RECUPERAR CONTRASEÑA

  recuperarPassword(email: string) {
    this.usuariosService.recuperarPassword(email).subscribe((respuesta) => {
        this.mensajePassword = [{severity:'info', summary:'Mensaje', detail: respuesta.msg}];
    })
  }

  // REGISTRO

  registro() {

    const mensajeValidado = this.validarDatosUsuario();
    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    if (this.usuario.id_rol === undefined) {
      this.usuario.id_rol = 3;
    }

    const formData = new FormData();
    formData.append('archivo', this.imagenSubir, this.imagenSubir.name);
    formData.append('nombre', this.usuario.nombre);
    formData.append('email', this.usuario.email);
    formData.append('apellido_uno', this.usuario.apellido_uno);
    formData.append('apellido_dos', this.usuario.apellido_dos);
    formData.append('id_examen', this.usuario.id_examen);
    formData.append('password', this.usuario.password);

    this.usuariosService.registro(this.usuario, formData).subscribe(
      data => {
        if (data) {
          this.mensaje = [{ severity: 'success', summary: `Usuario  ${this.usuario.email} registrado correctamente`, detail: '' }];

          this.usuario = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', url_foto: new File([], ''), id_examen: '', password: '', roles: [] };
        }
      },
      error => {
        if (error) {
          this.mensaje = [{ severity: 'error', summary: 'Error, asegúrate de haber completado todos los campos', detail: '' }];
        }
      }
    );
  }

  // LOGIN

  login() {
    this.usuariosService.login(this.usuario.email, this.usuario.password).subscribe(
      (respuesta) => {
        if (respuesta && respuesta.token) {
          localStorage.setItem('token', respuesta.token);
          this.mensaje = [{ severity: 'success', summary: 'Bienvenido', detail: `Usuario  ${this.usuario.email} logueado` }];
        } else {
          this.mensaje = [{ severity: 'error', summary: 'Error', detail: 'Login fallido' }];
        }
      },
      (error) => {
        console.error(error);
        this.mensaje = [{ severity: 'error', summary: 'Error', detail: 'Error en el servidor' }];
      }
    );
  }
}