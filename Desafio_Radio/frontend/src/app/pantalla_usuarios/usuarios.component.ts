import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//---Helpers---
import { validarUsuario, validarDatosRol } from '../helpers/validaciones';

//---PrimeNG---
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

//---Servicios---
import { UsuariosService } from './usuarios.service';

//---Interfaces---
import { Usuario } from "./usuarios";


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})


export class UsuariosComponent implements OnInit {

  //---Mensajes---
  mensaje: Message[] = [];
  mensajeEliminado: Message[] = [];
  mensajeModificado: Message[] = [];
  mensajeRol: Message[] = [];

  //---Usuarios---
  usuarios: Usuario[] = [];
  usuario: Usuario = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', password: '', url_foto: new File([], ''), id_examen: '' };

  //---Recursos---
  usuarioSeleccionado: boolean = false;  //para deseleccionar 
  imagenSubir: File = new File([], '');
  nombreUsuario: string = '';
  indicativoUsuario: string = '';

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.mostrarUsuarios();
  }

  imagen(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget.files && eventTarget.files.length > 0) {
      this.imagenSubir = eventTarget.files[0];
      console.log('imagen:', this.imagenSubir);
    }
  }

  hayRegistros() {
    return this.usuarios.length > 0;
  }

  validarDatosUsuario(): string {
    return validarUsuario(this.usuario);
  }

  validarDatosRol(): string {
    return validarDatosRol(this.usuario.email);
  }

  // VER USUARIOS

  mostrarUsuarios() {
    this.usuariosService.mostrarUsuarios().subscribe((usuario) => {
      this.usuarios = usuario.data;
    })
  }

  // ASIGNAR ROL

  asignarRol() {

    const mensajeValidado = this.validarDatosRol();
    if (mensajeValidado) {
      this.mensajeRol = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    if (this.usuario.id_rol === undefined) {
      this.mensajeRol = [{ severity: 'error', summary: 'Error', detail: 'Debe seleccionar un rol' }];
      return;
    }

    if (!this.usuario.email || this.usuario.email.trim() === '') {
      this.mensajeRol = [{ severity: 'error', summary: 'Error', detail: 'Debe proporcionar un correo electrónico existente' }];
      return;
    }

    this.usuariosService.asignarRol(this.usuario.id_rol, this.usuario.id,).subscribe(
      data => {
        if (data) {
          this.mensajeRol = [{ severity: 'success', summary: '', detail: `Rol asignado a ${this.usuario.email}` }];
          this.mensaje = [];
          this.mensajeModificado = [];
          this.mensajeEliminado = [];

          this.mostrarUsuarios();
        }
      },
      error => {
        if (error) {
          this.mensajeRol = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
          console.error(error);
        }
      }
    );
  }

  // MODIFICAR USUARIOS

  modificarUsuario() {

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

    this.usuariosService.modificarUsuario(this.usuario, formData).subscribe(
      data => {
        if (data) {
          this.mensajeModificado = [{ severity: 'success', summary: `Usuario  ${this.usuario.email} modificado`, detail: '' }];
          this.mensaje = [];
          this.mensajeEliminado = [];
          this.mensajeRol = [];

          this.mostrarUsuarios();

          this.usuario = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', url_foto: new File([], ''), id_examen: '', password: '', roles: [] };

        }
      },
      error => {
        if (error) {
          this.mensajeModificado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  // BAJA DE USUARIOS

  eliminarUsuario(id: number) {

    this.usuariosService.bajaUsuario(id).subscribe(
      data => {
        if (data) {
          this.mensajeEliminado = [{ severity: 'success', summary: '', detail: `Usuario  ${this.usuario.email} eliminado` }];
          this.mensajeModificado = [];
          this.mensaje = [];
          this.mensajeRol = [];

          this.mostrarUsuarios();
        }
      },
      error => {
        if (error) {
          this.mensajeEliminado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  // ALTA COMPLETA DE USUARIO

  crearUsuario() {

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

    this.usuariosService.altaUsuario(this.usuario, formData).subscribe(
      data => {
        if (data) {
          this.mensaje = [{ severity: 'success', summary: `Usuario  ${this.usuario.email} creado`, detail: '' }];
          this.mensajeModificado = [];
          this.mensajeEliminado = [];
          this.mensajeRol = [];

          this.mostrarUsuarios();

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

  // BUSCAR USUARIO POR INDICATIVO

  buscarUsuarioIndicativo(indicativo: string) {
    this.usuariosService.mostrarUsuariosIndicativo(indicativo).subscribe((respuesta) => {
      this.usuarios = respuesta.data;
    })
  }

  // BUSCAR USUARIO POR NOMBRE

  buscarUsuarioNombre(nombre: string) {
    this.usuariosService.mostrarUsuariosNombre(nombre).subscribe((respuesta) => {
      this.usuarios = respuesta.data;
    })
  }

  //RECURSOS VARIOS

  //seleccionar usuario
  seleccionarUsuario(usuario: Usuario) {
    this.usuario = usuario;
    this.usuarioSeleccionado = true;
  }

  //deseleccionar usuario
  deseleccionarUsuario() {
    this.usuario = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', url_foto: new File([], ''), id_examen: '', password: '', roles: [] };
    this.usuarioSeleccionado = false;
  }


}