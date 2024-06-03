import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//---PrimeNG---
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from "primeng/toast";

//---Servicio---
import { ActividadesService } from './actividades.service';

//---Interfaces---

import {
  Actividad,
  Participante,
  Modalidad, Modo
} from "./actividades";

import {
  Concurso,
} from "../pantalla_concursos/concursos";

import {
  Usuario
} from "../pantalla_inicio/inicio";

//---Helpers---
import { validarActividad } from '../helpers/validaciones';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule, ToastModule],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent implements OnInit {

  //---Mensajes---
  mensaje: Message[] = [];
  mensajeEliminado: Message[] = [];
  mensajeModificado: Message[] = [];

  //---Concursos---
  concursos: Concurso[] = [];
  concurso: Concurso = { id: 0, nombre: '', descripcion: '', url_foto: new File([], ''), completada: false, solucion: '' };

  //---Actividades---
  actividades: Actividad[] = [];
  actividad: Actividad = {
    id: 0,
    id_operador: 0,
    nombre: '',
    url_foto: '',
    localizacion: '',
    fecha: '',
    frecuencia: '',
    banda: '',
    id_modalidad: 0,
    id_modo: 0,
    completada: false,
    act_primarias: [{
      id: 0,
      nombre: '',
      descripcion: '',
      url_foto: '',
      completada: false,
      solucion: '',
      PrincipalesSecundarias: {
        id_principal: 0,
        id_secundaria: 0,
        premio: ''
      }
    }],
    modalidad: { id: 0, descripcion: '' },
    modo: { id: 0, nombre: '' }
  };


  //---Participantes---

  participantes: Participante[] = [];
  participante: Participante = {
    id: 0,
    usuario_secundarias_secundarias: { nombre: '', email: '', apellido_uno: '', apellido_dos: '', url_foto: '', id_examen: '' },
    act_secundaria: { nombre: '' }
  };

  //---Modalidades y Modos ---

  modalidades: Modalidad[] = [];
  modos: Modo[] = [];

  modalidad: Modalidad = { id: 0, descripcion: '' };
  modo: Modo = { id: 0, nombre: '' };

  //---Recursos---
  tipoActividad = 'todas'; // todas o terminadas
  tipoCrear = 'unico'; // unico o varios
  actividadSeleccionada: boolean = false;
  imagenSubir: File = new File([], ''); //para subir imagen
  nombreActividad = '';
  datosLogin = JSON.parse(localStorage.getItem('usuarioDatos')!) || null;

  constructor(private actividadesService: ActividadesService, private router: Router) { }

  ngOnInit(): void {

    this.mostrarActividades();
    this.mostrarActividadNombre(this.nombreActividad);
    this.modalidadesActividad();
    this.modosActividad();
    this.mostrarConcursosPendientes();
  }

  

  imagen(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget.files && eventTarget.files.length > 0) {
      this.imagenSubir = eventTarget.files[0];
      console.log('imagen:', this.imagenSubir);
    }
  }

  hayRegistros() {
    return this.actividades.length > 0;
  }

  // COMPROBAR SI EL USUARIO ES OPERADOR

  esOper(): boolean {
    let esOper = false; 

    if (this.datosLogin && this.datosLogin.roles) {
        for (let i = 0; i < this.datosLogin.roles.length; i++) {
            if (this.datosLogin.roles[i].RolAsignado && this.datosLogin.roles[i].RolAsignado.id_rol === 2) {
              esOper = true;
                break; 
            }
        }
    }
    return esOper; 
}
  // VALIDAR ACTIVIDAD

  validarActividad(): string {
    let principalesSecundarias;
    if (this.actividad.act_primarias && this.actividad.act_primarias[0]) {
      principalesSecundarias = this.actividad.act_primarias[0].PrincipalesSecundarias;
    }
    return validarActividad(this.actividad, principalesSecundarias);
  }

  //---Métodos---

  // VER TODAS LAS ACTIVIDADES Y SUS CONCURSOS (SI TIENE) 

  mostrarActividades() {
    this.actividadesService.mostrarActividades().subscribe((actividad) => {
      this.actividades = actividad.data;
    });
  }

  // VER TODAS LAS ACTIVIDADES TERMINADAS

  mostrarActividadesTerminadas() {
    this.actividadesService.mostrarActividadesTerminadas().subscribe((actividad) => {
      this.actividades = actividad.data;
    });
  }

  //VER TODAS LAS ACTIVIDADES PENDIENTES 

  mostrarActividadesPendientes() {
    this.actividadesService.mostrarActividadesPendientes().subscribe((actividad) => {
      this.actividades = actividad.data;
    });
  }

  // TERMINAR ACTIVIDAD (BOTÓN) (OPERADOR)

  terminarActividad(id: number) {
    this.actividadesService.terminarActividad(id).subscribe(
      data => {
        if (data) {
          this.mensaje = [{ severity: 'success', summary: '', detail: `Actividad ${this.actividad.nombre} terminado` }];
          this.mensajeModificado = [];
          this.mensajeEliminado = [];

          this.mostrarActividades();
        }
      },
      error => {
        if (error) {
          this.mensaje = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  // BUSCAR ACTIVIDAD POR ID (AFICIONADO)

  mostrarActividadId(id: number) {
    this.actividadesService.mostrarActividadId(id).subscribe((respuesta) => {
      this.actividad = respuesta.data;
    })
  }


  // BUSCAR ACTIVIDAD POR NOMBRE (AFICIONADO)

  mostrarActividadNombre(nombre: string) {
    this.actividadesService.mostrarActividadNombre(nombre).subscribe((respuesta) => {
      if (Array.isArray(respuesta.data)) {
        this.actividades = respuesta.data;
      } else {
        this.actividades = [respuesta.data];
      }
    })
  }

  // VER PARTICIPANTES ACTIVIDAD (MODAL) (AFICIONADO)

  verParticipantesActividad(id: number) {
    this.actividadesService.verParticipantesActividad(id).subscribe((respuesta) => {
      this.participantes = respuesta.data;
    })
  }

  // ELIMINAR ACTIVIDAD (OPERADOR)

  eliminarActividad(id: number) {
    this.actividadesService.eliminarActividad(id).subscribe(
      data => {
        if (data) {
          this.mensajeEliminado = [{ severity: 'success', summary: '', detail: `Actividad ${this.actividad.nombre} eliminada` }];
          this.mensajeModificado = [];
          this.mensaje = [];

          this.mostrarActividades();
        }
      },
      error => {
        if (error) {
          this.mensajeEliminado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  // MODIFICAR ACTIVIDAD (OPERADOR)

  modificarActividad() {
    const mensajeValidado = validarActividad(this.actividad);
    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.imagenSubir, this.imagenSubir.name);
    formData.append('nombre', this.actividad.nombre);
    formData.append('localizacion', this.actividad.localizacion);
    formData.append('fecha', this.actividad.fecha);
    formData.append('frecuencia', this.actividad.frecuencia);
    formData.append('banda', this.actividad.banda);
    formData.append('id_modalidad', (this.actividad.id_modalidad ?? '').toString());
    formData.append('id_modo', (this.actividad.id_modo ?? '').toString());

    this.actividadesService.modificarActividad(this.actividad, formData).subscribe(
      data => {
        if (data) {
          this.mensajeModificado = [{ severity: 'success', summary: `Actividad ${this.actividad.nombre} modificada`, detail: '' }];
          this.mensaje = [];
          this.mensajeEliminado = [];

          this.mostrarActividades();

          this.actividad = {
            id: 0,
            id_operador: 0,
            nombre: '',
            url_foto: '',
            localizacion: '',
            fecha: '',
            frecuencia: '',
            banda: '',
            id_modalidad: 0,
            id_modo: 0,
            completada: false,
            act_primarias: [{
              id: 0,
              nombre: '',
              descripcion: '',
              url_foto: '',
              completada: false,
              solucion: '',
              PrincipalesSecundarias: {
                id_principal: 0,
                id_secundaria: 0,
                premio: ''
              }
            }],
            modalidad: { id: 0, descripcion: '' },
            modo: { id: 0, nombre: '' }
          };
        }
      },
      error => {
        if (error) {
          this.mensajeModificado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  // ALTA ACTIVIDAD DE UN UNICO CONTACTO (OPERADOR)

  altaActividadUnico() {
    const mensajeValidado = validarActividad(this.actividad);
    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.imagenSubir, this.imagenSubir.name);
    formData.append('nombre', this.actividad.nombre);
    formData.append('localizacion', this.actividad.localizacion);
    formData.append('fecha', this.actividad.fecha);
    formData.append('frecuencia', this.actividad.frecuencia);
    formData.append('banda', this.actividad.banda);
    formData.append('id_modalidad', (this.actividad.id_modalidad ?? '').toString());
    formData.append('id_modo', (this.actividad.id_modo ?? '').toString());

    this.actividadesService.altaActividadUnico(this.actividad, formData).subscribe(
      data => {
        if (data) {
          this.mensajeModificado = [{ severity: 'success', summary: `Actividad ${this.actividad.nombre} creada`, detail: '' }];
          this.mensaje = [];
          this.mensajeEliminado = [];

          this.mostrarActividades();

          this.actividad = {
            id: 0,
            id_operador: 0,
            nombre: '',
            url_foto: '',
            localizacion: '',
            fecha: '',
            frecuencia: '',
            banda: '',
            id_modalidad: 0,
            id_modo: 0,
            completada: false,
            act_primarias: [{
              id: 0,
              nombre: '',
              descripcion: '',
              url_foto: '',
              completada: false,
              solucion: '',
              PrincipalesSecundarias: {
                id_principal: 0,
                id_secundaria: 0,
                premio: ''
              }
            }],
            modalidad: { id: 0, descripcion: '' },
            modo: { id: 0, nombre: '' }
          };
        }
      },
      error => {
        if (error) {
          this.mensajeModificado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  // ALTA ACTIVIDAD DE VARIOS CONTACTOS (OPERADOR)

  altaActividadVarios() {

    const mensajeValidado = validarActividad(this.actividad);
    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.imagenSubir, this.imagenSubir.name);
    formData.append('nombre', this.actividad.nombre);
    formData.append('localizacion', this.actividad.localizacion);
    formData.append('fecha', this.actividad.fecha);
    formData.append('frecuencia', this.actividad.frecuencia);
    formData.append('banda', this.actividad.banda);
    formData.append('id_modalidad', (this.actividad.id_modalidad ?? '').toString());
    formData.append('id_modo', (this.actividad.id_modo ?? '').toString());
    if (this.actividad.act_primarias && this.actividad.act_primarias[0] && this.actividad.act_primarias[0].PrincipalesSecundarias) {
      formData.append('premio', (this.actividad.act_primarias[0].PrincipalesSecundarias.premio ?? '').toString());
      formData.append('id_principal', (this.actividad.act_primarias[0].PrincipalesSecundarias.id_principal ?? '').toString());
    }


    this.actividadesService.altaActividadVarios(this.actividad, formData).subscribe(
      data => {
        if (data) {
          this.mensajeModificado = [{ severity: 'success', summary: `Actividad ${this.actividad.nombre} creada`, detail: '' }];
          this.mensaje = [];
          this.mensajeEliminado = [];

          this.mostrarActividades();

          this.actividad = {
            id: 0,
            id_operador: 0,
            nombre: '',
            url_foto: '',
            localizacion: '',
            fecha: '',
            frecuencia: '',
            banda: '',
            id_modalidad: 0,
            id_modo: 0,
            completada: false,
            act_primarias: [{
              id: 0,
              nombre: '',
              descripcion: '',
              url_foto: '',
              completada: false,
              solucion: '',
              PrincipalesSecundarias: {
                id_principal: 0,
                id_secundaria: 0,
                premio: ''
              }
            }],
            modalidad: { id: 0, descripcion: '' },
            modo: { id: 0, nombre: '' }
          };
        }
      },
      error => {
        if (error) {
          this.mensajeModificado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  // MOSTRAR MODALIDADES

  modalidadesActividad() {
    this.actividadesService.modalidades().subscribe((modalidades) => {
      this.modalidades = modalidades.data;
    });

  }
  // MOSTRAR MODOS

  modosActividad() {
    this.actividadesService.modos().subscribe((modos) => {
      this.modos = modos.data;
    });

  }

  //MOSTRAR CONCURSOS

  mostrarConcursosPendientes() {
    this.actividadesService.mostrarConcursosPendientes().subscribe((concurso) => {
      this.concursos = concurso.data;
    });
  }

  cargarActividades() {
    switch (this.tipoActividad) {
      case 'todas':
        this.mostrarActividades();
        break;
      case 'terminadas':
        this.mostrarActividadesTerminadas();
        break;
      case 'pendientes':
        this.mostrarActividadesPendientes();
        break;
    }
  }

  cargarCrear() {
    switch (this.tipoCrear) {
      case 'unico contacto':
        this.altaActividadUnico();
        break;
      case 'varios contactos':
        this.altaActividadVarios();

        break;
    }
  }

  seleccionarActividad(actividad: Actividad) {
    this.actividad = actividad;
    this.actividadSeleccionada = true;
  }

  deseleccionarActividad() {
    this.actividad = {
      id: 0,
      id_operador: 0,
      nombre: '',
      url_foto: '',
      localizacion: '',
      fecha: '',
      frecuencia: '',
      banda: '',
      id_modalidad: 0,
      id_modo: 0,
      completada: false,
      act_primarias: [],
      modalidad: { id: 0, descripcion: '' },
      modo: { id: 0, nombre: '' }
    }
    this.actividadSeleccionada = false;
  }
}
