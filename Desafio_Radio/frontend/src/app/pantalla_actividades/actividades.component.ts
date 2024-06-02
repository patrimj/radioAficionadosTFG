
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
import { PerfilService } from '../pantalla_perfil/perfil.service';

//---Interfaces---

import {
  Actividad,
  UsuarioSecundariasSecundarias,
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
    act_primarias: [],
    modalidad: { id: 0, descripcion: '' },
    modo: { id: 0, nombre: '' }
  }

  //---Participantes---

  participantes: UsuarioSecundariasSecundarias[] = [];
  participante: UsuarioSecundariasSecundarias = { nombre: '', email: '', apellido_uno: '', apellido_dos: '', url_foto: '', id_examen: '' };

  //---Modalidades y Modos ---

  modalidades : Modalidad[] = [];
  modos : Modo[] = [];

  modalidad : Modalidad = { id: 0, descripcion: '' };
  modo : Modo = { id: 0, nombre: '' };

  //---Recursos---
  usuario: Usuario | null = null;
  tipoActividad = 'todas'; // todas o terminadas
  actividadPrincipal = 0; //para el input
  actividadSeleccionada: boolean = false;
  imagenSubir: File = new File([], ''); //para subir imagen

  constructor(private actividadesService: ActividadesService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = this.getUsuario();
    this.mostrarActividades();
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

  // COMPROBAR SI EL USUARIO ES ADMIN

  getUsuario(): Usuario | null {
    const usuario = localStorage.getItem('usuarioDatos');
    return usuario ? JSON.parse(usuario) : null;
  }

  esAdmin(): boolean {
    const usuario = this.getUsuario();
    return usuario !== null && usuario !== undefined && usuario.rol !== null && usuario.rol !== undefined && usuario.rol.some(rol => rol.id_rol === 1);
  }

  // VALIDAR CONCURSO

  validarActividad(): string {

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
      this.actividad = respuesta.data;
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
    formData.append('id_modalidad', this.actividad.id_modalidad.toString());
    formData.append('id_modo', this.actividad.id_modo.toString());

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
            act_primarias: [],
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
    formData.append('id_modalidad', this.actividad.id_modalidad.toString());
    formData.append('id_modo', this.actividad.id_modo.toString());

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
            act_primarias: [],
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

altaActividadVarios(){

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
  formData.append('id_modalidad', this.actividad.id_modalidad.toString());
  formData.append('id_modo', this.actividad.id_modo.toString());

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
          act_primarias: [],
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

seleccionarPrincipal(concurso: Concurso) {
  this.concurso = concurso;
  this.actividadSeleccionada = true;
}

deseleccionarPrincipal() {
  this.concurso = { id: 0, nombre: '', descripcion: '', url_foto: new File([], ''), completada: false, solucion: '' };
  this.actividadSeleccionada = false;
}
}
