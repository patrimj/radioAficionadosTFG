
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
import { ConcursosService } from './concursos.service';
import { PerfilService } from '../pantalla_perfil/perfil.service';

//---Interfaces---

import {
  Concurso,
  Participante
} from "./concursos";

import { Actividad } from "../pantalla_perfil/perfiles";

import {
  Usuario
} from "../pantalla_inicio/inicio";

//---Helpers---
import { validarConcurso } from '../helpers/validaciones';


@Component({
  selector: 'app-concursos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule, ToastModule],
  templateUrl: './concursos.component.html',
  styleUrl: './concursos.component.css'
})
export class ConcursosComponent implements OnInit {

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
    nombre: '',
    url_foto: '',
    fecha: '',
    modalidad: { descripcion: '' },
    modo: { nombre: '' },
    act_primarias: []
  };

  //---Participantes---
  participantes: Participante[] = [];
  participante: Participante = { id: 0, nombre: '', url_foto: '', id_examen: '' };

  //---Recursos---
  tipoConcurso = 'todas'; // todas o terminadas
  actividadPrincipal = 0; //para el input
  concursoSeleccionado: boolean = false;
  imagenSubir: File = new File([], ''); //para subir imagen
  nombreConcurso: string = '';
  datosLogin = JSON.parse(localStorage.getItem('usuarioDatos')!) || null;

  constructor(private concursoService: ConcursosService, private perfilService: PerfilService, private router: Router) { }

  ngOnInit(): void {
    this.mostrarConcursos();
    this.mostrarConcursoNombre(this.nombreConcurso);

  }

  imagen(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget.files && eventTarget.files.length > 0) {
      this.imagenSubir = eventTarget.files[0];
      console.log('imagen:', this.imagenSubir);
    }
  }

  hayRegistros() {
    return this.concursos.length > 0;
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

  // VALIDAR CONCURSO

  validarConcurso(): string {
    return validarConcurso(this.concurso)
  }

  //---Métodos---

  // MUESTRA TODOS LOS CONCURSOS 

  mostrarConcursos() {
    this.concursoService.mostrarConcursos().subscribe((concurso) => {
      this.concursos = concurso.data;
    });
  }

  // MUESTRA TODS LOS CONCURSOS TERMINADOS

  mostrarConcursosTerminados() {
    this.concursoService.mostrarConcursosTerminados().subscribe((concurso) => {
      this.concursos = concurso.data;
    });
  }

  // MUESTRA TODS LOS CONCURSOS PENDIENTES

  mostrarConcursosPendientes() {
    this.concursoService.mostrarConcursosPendientes().subscribe((concurso) => {
      this.concursos = concurso.data;
    });
  }

  //ALTA CONCURSO 

  altaConcurso() {
    const mensajeValidado = this.validarConcurso();
    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.imagenSubir, this.imagenSubir.name);
    formData.append('nombre', this.concurso.nombre);
    formData.append('descripcion', this.concurso.descripcion);
    formData.append('solucion', this.concurso.solucion);

    this.concursoService.altaConcurso(this.concurso, formData).subscribe(
      data => {
        if (data) {
          this.mensaje = [{ severity: 'success', summary: `Concurso ${this.concurso.nombre} creado`, detail: '' }];
          this.mensajeModificado = [];
          this.mensajeEliminado = [];

          this.mostrarConcursos();

          this.concurso = { id: 0, nombre: '', descripcion: '', url_foto: new File([], ''), completada: false, solucion: '' };
        }
      },
      error => {
        if (error) {
          this.mensaje = [{ severity: 'error', summary: 'Error, asegúrate de haber completado todos los campos', detail: '' }];
        }
      }
    );
  }

  // MODIFICAR CONCURSO

  modificarConcurso() {
    const mensajeValidado = this.validarConcurso();
    if (mensajeValidado) {
      this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.imagenSubir, this.imagenSubir.name);
    formData.append('nombre', this.concurso.nombre);
    formData.append('descripcion', this.concurso.descripcion);
    formData.append('solucion', this.concurso.solucion);

    this.concursoService.modificarConcurso(this.concurso, formData).subscribe(
      data => {
        if (data) {
          this.mensajeModificado = [{ severity: 'success', summary: `Concurso ${this.concurso.nombre} modificado`, detail: '' }];
          this.mensaje = [];
          this.mensajeEliminado = [];

          this.mostrarConcursos();

          this.concurso = { id: 0, nombre: '', descripcion: '', url_foto: new File([], ''), completada: false, solucion: '' };
        }
      },
      error => {
        if (error) {
          this.mensajeModificado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );

  }

  // BAJA CONCURSO

  bajaConcurso(id: number) {
    this.concursoService.bajaConcurso(id).subscribe(
      data => {
        if (data) {
          this.mensajeEliminado = [{ severity: 'success', summary: '', detail: `Concurso ${this.concurso.nombre} eliminado` }];
          this.mensajeModificado = [];
          this.mensaje = [];

          this.mostrarConcursos();
        }
      },
      error => {
        if (error) {
          this.mensajeEliminado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  //TERMINAR CONCURSO

  terminarConcurso(id: number) {
    this.concursoService.terminarConcurso(id).subscribe(
      data => {
        if (data) {
          this.mensaje = [{ severity: 'success', summary: '', detail: `Concurso ${this.concurso.nombre} terminado` }];
          this.mensajeModificado = [];
          this.mensajeEliminado = [];

          this.mostrarConcursos();
        }
      },
      error => {
        if (error) {
          this.mensaje = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
        }
      }
    );
  }

  // MOSTRAR CONCURSO ID

  mostrarConcursoId(id: number) {
    this.concursoService.mostrarConcursoId(id).subscribe((respuesta) => {
      this.concursos = respuesta.data;
    })
  }

  // MOSTRAR CONCURSO NOMBRE

  mostrarConcursoNombre(nombre: string) {
    this.concursoService.mostrarConcursoNombre(nombre).subscribe((respuesta) => {
      this.concursos = respuesta.data;
    })
  }

  // VER ACTIVIDADES DE UN CONCURSO (MODAL) (AFICIONADO) *** Pantalla Perfil (actividadRoutes) ***

  getActividadesPorConcurso(idPrincipal: number) {
    this.perfilService.getActividadesPorConcurso(idPrincipal).subscribe((actividad) => {
      this.actividades = actividad.data;
    })
  }

  // VER PARTICIPANTES DE UN CONCURSO (MODAL) (AFICIONADO) 

  verParticipantesConcurso(idPrincipal: number) {
    this.concursoService.verParticipantesConcurso(idPrincipal).subscribe((respuesta) => {
      this.participantes = respuesta.data.map(data => data.usuario);
    })
  }

  cargarConcursos() {
    switch (this.tipoConcurso) {
      case 'todas':
        this.mostrarConcursos();
        break;
      case 'terminadas':
        this.mostrarConcursosTerminados();
        break;
      case 'pendientes':
        this.mostrarConcursosPendientes();
        break;
    }
  }

  seleccionarPrincipal(concurso: Concurso) {
    this.concurso = concurso;
    this.concursoSeleccionado = true;
  }

  deseleccionarPrincipal() {
    this.concurso = { id: 0, nombre: '', descripcion: '', url_foto: new File([], ''), completada: false, solucion: '' };
    this.concursoSeleccionado = false;
  }


}
