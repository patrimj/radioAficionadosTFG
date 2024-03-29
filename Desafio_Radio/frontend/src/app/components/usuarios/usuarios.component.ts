//Patricia

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//---Helpers---
import { validarUsuario, validarDatosRol } from '../../helpers/validaciones';


//---PrimeNG---
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

//---Servicio---
import { UsuarioService } from '../../servicios/usuario.service';

//---Interfaces---
import { UsuarioRegistro } from "../../interfaces/usuario";
import { UsuarioDiplomas } from "../../interfaces/usuario";


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
  usuarios: UsuarioRegistro[] = []
  usuario: UsuarioRegistro = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', url_foto: new File([], ''), id_examen: '', password: '', roles: [] }
  usuariosDiplomas: UsuarioDiplomas[] = []

  tipoUsuario = 'todos'; // para el select
  usuarioSeleccionado: boolean = false;  //para deseleccionar 
  imagenSubir: File = new File([], '');

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.mostrarUsuario();
    this.mostrarUsuariosConDiploma();
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

  hayRegistrosDiplomas() {
    return this.usuariosDiplomas.length > 0;
  }

  validarDatosUsuario(): string {
    return validarUsuario(this.usuario);
  }

  validarDatosRol(): string {
    return validarDatosRol(this.usuario.email);
  }

  //mostrar todos los usuarios
  mostrarUsuario() {
    this.usuarioService.verUsuarios().subscribe((respuesta) => {
      this.usuarios = respuesta.data;
    })
  }

  //filtrar usuario por id
  mostrarUsuarioPorId(id: number) {
    this.usuarioService.mostrarUsuarioPorId(id).subscribe((respuesta) => {
      this.usuarios = respuesta.data;
    })
  }


  //todos los usuarios con diplomas
  mostrarUsuariosConDiploma() {
    this.usuarioService.mostrarUsuariosConDiploma().subscribe((respuesta) => {
      this.usuariosDiplomas = respuesta.data;
    })
  }

  //seleccionar usuario
  seleccionarUsuario(usuario: UsuarioRegistro) {
    this.usuario = usuario;
    this.usuarioSeleccionado = true;
  }

  //deseleccionar usuario
  deseleccionarUsuario() {
    this.usuario = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', url_foto: new File([], ''), id_examen: '', password: '', roles: [] };
    this.usuarioSeleccionado = false;
  }

  //crear usuario
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
    formData.append('password', this.usuario.password);

    this.usuarioService.altaUsuario(this.usuario, formData).subscribe(
      data => {
        if (data) {
          this.mensaje = [{ severity: 'success', summary: `Usuario  ${this.usuario.email} creado`, detail: '' }];
          this.mensajeModificado = [];
          this.mensajeEliminado = [];
          this.mensajeRol = [];

          this.mostrarUsuario();

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
    formData.append('password', this.usuario.password);

    this.usuarioService.modificarUsuario(this.usuario, formData).subscribe(
      data => {
        if (data) {
          this.mensajeModificado = [{ severity: 'success', summary: `Usuario  ${this.usuario.email} modificado`, detail: '' }];
          this.mensaje = [];
          this.mensajeEliminado = [];
          this.mensajeRol = [];

          this.mostrarUsuario();

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

  eliminarUsuario(id: number) {

    this.usuarioService.bajaUsuario(id).subscribe(
      data => {
        if (data) {
          this.mensajeEliminado = [{ severity: 'success', summary: '', detail: `Usuario  ${this.usuario.email} eliminado` }];
          this.mensajeModificado = [];
          this.mensaje = [];
          this.mensajeRol = [];

          this.mostrarUsuario();
        }
      },
      error => {
        if (error) {
          this.mensajeEliminado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }


  cargarUsuarios() {
    switch (this.tipoUsuario) {
      case 'todos':
        this.mostrarUsuario();
        break;
      case 'conDiploma':
        this.mostrarUsuariosConDiploma();
        break;
      default:
        this.mostrarUsuario();
        break;
    }
  }


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

    this.usuarioService.asignarRol(this.usuario.id_rol, this.usuario.id,).subscribe(
      data => {
        if (data) {
          this.mensajeRol = [{ severity: 'success', summary: '', detail: `Rol asignado a ${this.usuario.email}` }];
          this.mensaje = [];
          this.mensajeModificado = [];
          this.mensajeEliminado = [];

          this.mostrarUsuario();
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
}
