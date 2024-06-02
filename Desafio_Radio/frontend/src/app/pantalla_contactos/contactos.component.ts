
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
import { ContactosService } from './contactos.service';

//---Interfaces---

import {
  Usuario,
  ContactosRegistrado,
  ContactoDetalle,
  Concurso, 
  SolucionConcurso,
  Actividades,
  PremioActividad,


} from "./contactos";


@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule, ToastModule],
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.css'
})
export class ContactosComponent implements OnInit {

  //---Mensajes---
  mensaje: Message[] = [];

  //---Contactos---
  contactosRegistrados: ContactosRegistrado[] = [];
  contactosRegistrado: ContactosRegistrado = { id_usuario: '', id_secundaria: '', premio: '' };
  contactoDetalles: ContactoDetalle[] = [];
  contactoDetalle: ContactoDetalle = { nombre: '', id_examen: '', email: '', usuario_secundarias: [] };

  //---Concursos
  concursos: Concurso[] = [];
  concurso: Concurso = { id: 0, nombre: '' };
  soluciones: SolucionConcurso[] = [];
  solucion: SolucionConcurso = { solucion: '' };

  //---Actividades

  actividades: Actividades[] = [];
  actividad: Actividades = { id: 0, nombre: '' };
  premios: PremioActividad[] = [];
  premio: PremioActividad = { premio: '' };
  premiosTotales: string[] = [];
  modalidad:  string = '';

  //---Usuario---
  usuarios: Usuario[] = [];
  usuario: Usuario = { id: 0, id_examen: '' };


  constructor(private contactosService: ContactosService, private router: Router) { }

  ngOnInit(): void {


  }

  //---Métodos---

  // REGISTRAR CONTACTO (Botón final)

  registrarContacto() {
    this.contactosService.registrarContacto(this.contactosRegistrado).subscribe((registro) => {
      this.contactosRegistrado = registro.data;
    })
  }

  // LISTAR USUARIOS 

  mostrarUsuarios() {
    this.contactosService.mostrarUsuarios().subscribe((usuario) => {
      this.usuarios = usuario.data;
    });
  }

  // MOSTRAR TODOS LOS CONTACTOS DETALLADOS

  mostrarContactosConDetalles() {
    this.contactosService.mostrarContactosConDetalles().subscribe((contacto) => {
      this.contactoDetalles = contacto.data;
    });
  }

  // ************************** REGISTRAR USUARIO EN UNA ACTIVIDAD DE VARIOS CONTACTOS ************************** //


  // LISTAR CONCURSOS

  mostrarConcursosContacto() {
    this.contactosService.mostrarConcursosContacto().subscribe((concurso) => {
      this.concursos = concurso.data;
    });
  }

  // MOSTRAR SOLUCIÓN CONCURSO

  solucionConcurso(id_principal: string) {
    this.contactosService.solucionConcurso(id_principal).subscribe((solucion) => {
      this.solucion = solucion.data;
    });
  }

  // MOSTRAR ACTIVIDADES QUE PERTENECEN A UN CONCURSO

  actividadesVariosContactos(id_principal: string) {
    this.contactosService.actividadesVariosContactos(id_principal).subscribe((actividades) => {
      this.actividades = actividades.data;
    });
  }

  // MOSTRAR PREMIO DE LA ACTIVIDAD

  premioActividad(id_secundaria: string) {
    this.contactosService.premioActividad(id_secundaria).subscribe((premio) => {
      this.premio = premio.data;
    });
  }

  // MOSTRAR LOS PREMIOS DE UN USUARIO EN UN CONCURSO

  premiosUsuarioConcurso(id_usuario: string, id_principal: string) {
    this.contactosService.premiosUsuarioConcurso(id_usuario, id_principal).subscribe((premios) => {
      this.premiosTotales = premios.data;
    });
  }
  // ************************** REGISTRAR USUARIO EN UNA ACTIVIDAD DE VARIOS CONTACTOS ************************** //


  // MOSTRAR TODAS LAS ACTIVIDADES

  mostrarActividades() {
    this.contactosService.mostrarActividades().subscribe((actividad) => {
      this.actividades = actividad.data;
    });
  }

  // MOSTRAR LA MODALIDAD DE LA ACTIVIDAD

  modalidadActividad(id_secundaria: string){
    this.contactosService.modalidadActividad(id_secundaria).subscribe((modalidad) => {
      this.modalidad = modalidad.data;
    });
  }


}
