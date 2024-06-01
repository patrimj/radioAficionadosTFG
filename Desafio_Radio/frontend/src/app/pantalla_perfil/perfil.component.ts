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
import { PerfilService } from './perfil.service';

//---Interfaces---
import { Perfil, Actividad, Concurso } from "./perfiles";


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  //---Mensajes---
  mensaje: Message[] = [];
  mensajeModificado: Message[] = [];

  //---Usuarios---
  usuarios: Perfil[] = [];
  usuario: Perfil = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', password: '', url_foto: new File([], ''), id_examen: '' };

  actividades: Actividad[] = [];
  actividad: Actividad = {
    id: 0,
    nombre: '',
    url_foto: '',
    fecha: '',
    modalidad: {
      descripcion: ''
    },
    modo: {
      nombre: ''
    }
  };

  concursos: Concurso[] = [];
  concruso: Concurso = {
    nombre: '',
    descripcion: '',
    url_foto: '',
    completada: false,
    solucion: '',
    act_principales_usuario: []
  };


  totalActividadesConcursos: number = 0;

  imagenSubir: File = new File([], '');

  constructor(private perfilService: PerfilService, private router: Router) { }

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

  // VER ACTIVIDADES DE UN UNICO CONTACTO (AFICIONADO)

  getActividadesUnicoContactoAficionado() {
    this.perfilService.getActividadesUnicoContactoAficionado().subscribe((actividad) => {
      this.actividades = actividad.data;
    })
  }

  // VER ACTIVIDADES DE VARIOS CONTACTOS Y CONCURSO (AFICIONADO)

  getActividadesVariosContactosAficionado() {
    this.perfilService.getActividadesVariosContactosAficionado().subscribe((actividad) => {
      this.actividades = actividad.data;
    })
  }

  // VER ACTIVIDADES DE UN CONCURSO (MODAL) (AFICIONADO) *** Pantalla concurso ***

  getActividadesPorConcurso(idPrincipal: number) {
    this.perfilService.getActividadesPorConcurso(idPrincipal).subscribe((actividad) => {
      this.actividades = actividad.data;
    })
  }

  // MOSTRAR TOTAL ACTIVIDADES EN LAS QUE HA PARTICIPADO UN USUARIO (AFICIONADO)

  getTotalActividadesParticipado() {
    this.perfilService.getTotalActividadesParticipado().subscribe((respuesta) => {
      this.totalActividadesConcursos = respuesta.data;
    })
  }

  // CONCURSOS DE UN USUARIO (AFICIONADO)

  getConcursosAficionado() {
    this.perfilService.getConcursosAficionado().subscribe((concurso) => {
      this.concursos = concurso.data;
    })
  }

  // MOSTRAR EL TOTAL DE CONCURSOS EN LOS QUE HA PARTICIPADO UN USUARIO (AFICIONADO)

  getTotalConcursosParticipado() {
    this.perfilService.getTotalConcursosParticipado().subscribe((respuesta) => {
      this.totalActividadesConcursos = respuesta.data;
    })
  }

  // MOSTRAR PERFIL
  getPerfil(){
    this.perfilService.getPerfil().subscribe((perfil) => {
      this.usuario = perfil.data;
    })
  }

  // MODIFICAR PERFIL

  modificarPerfil(){

    const mensajeValidado = this.validarDatosUsuario();
    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.imagenSubir, this.imagenSubir.name);
    formData.append('nombre', this.usuario.nombre);
    formData.append('email', this.usuario.email);
    formData.append('apellido_uno', this.usuario.apellido_uno);
    formData.append('apellido_dos', this.usuario.apellido_dos);
    formData.append('id_examen', this.usuario.id_examen);

    this.perfilService.modificarPerfil(this.usuario, formData).subscribe(
      data => {
        if (data) {
          this.mensajeModificado = [{ severity: 'success', summary: `Usuario  ${this.usuario.email} modificado`, detail: '' }];
          this.mensaje = [];

          this.getPerfil();

          this.usuario = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', url_foto: new File([], ''), id_examen: '', password: '' };

        }
      },
      error => {
        if (error) {
          this.mensajeModificado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  // CAMBIAR CONTRASEÑA


  
  // CREAR Y PEDIR DIPLOMA DE ACTIVIDAD 

  pedirDiploma(actividad: string, url: string) {
    this.perfilService.pedirDiploma(actividad, url).subscribe((respuesta) => {
      this.mensaje = [{ severity: 'success', summary: `Diploma enviado a su correo electrónico`, detail: '' }];
    });
  }





}
