//JuanNavarrete
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {UsuarioService} from "../../servicios/usuario.service";
import {Perfil} from "../../interfaces/perfil";
import {CardModule} from "primeng/card";
import {RouterLink} from "@angular/router";
import {EditarPerfilComponent} from "./editar-perfil/editar-perfil.component";
import {EditarPasswordComponent} from "./editar-password/editar-password.component";
import {MessageModule} from "primeng/message";
import {ProgresoComponent} from "./progreso/progreso.component";
import { ActividadesAficionadoComponent } from '../actividades-aficionado/actividades-aficionado.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    RouterLink,
    EditarPerfilComponent,
    EditarPasswordComponent,
    MessageModule,
    ProgresoComponent,
    ActividadesAficionadoComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  encapsulation: ViewEncapsulation.None,

})
export class PerfilComponent implements OnInit {
  constructor(private servicioUsuario: UsuarioService) {}

  perfil?: Perfil;
  editandoPerfil = false;
  editandoPassword = false;
  mirandoProgreso = false;

  ngOnInit(): void {
    this.mostrarPerfil()
  }

  mostrarPerfil() {
    const datosLogin = localStorage.getItem('datosLogin') || '{}';
    const id = JSON.parse(datosLogin).usuario.id;

    this.servicioUsuario.mostrarPerfil(id).subscribe(perfil => {
      if (perfil !== null) this.perfil = perfil;
    })
  }

  mostrarEditarContrasena() {
    this.editandoPassword = true
  }

  mostrarEditarPerfil() {
    this.editandoPerfil = true
  }

  mostrarActividades() {
    this.mirandoProgreso = true
  }
}
