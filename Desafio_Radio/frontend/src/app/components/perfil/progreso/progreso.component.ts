import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../../servicios/usuario.service";
import {ActSecundariaProg, Perfil, PrincipalProg} from "../../../interfaces/perfil";
import {ActividadesService} from "../../../servicios/actividades.service";
import {CardModule} from "primeng/card";
import {ChipModule} from "primeng/chip";
import {DatePipe} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {AccordionModule} from "primeng/accordion";

@Component({
  selector: 'app-progreso',
  standalone: true,
  imports: [
    CardModule,
    ChipModule,
    DatePipe,
    ButtonModule,
    AccordionModule
  ],
  templateUrl: './progreso.component.html',
  styleUrl: './progreso.component.css'
})
export class ProgresoComponent implements OnInit {
  constructor(private servicioActividad: ActividadesService) {}

  perfil?: Perfil;
  editandoPerfil = false;
  editandoPassword = false;
  principales: PrincipalProg[] = [];
  principalSelec?: PrincipalProg
  secundarias?: ActSecundariaProg[];

  ngOnInit(): void {
    this.obtenerActividades()
  }

  private obtenerActividades() {
    const idUsuario = JSON.parse(localStorage.getItem('datosLogin')!).usuario.id
    this.servicioActividad.verSecundariasUsuario(idUsuario).subscribe(
      cuerpo => {
        this.principales = cuerpo.data
        console.log(this.principales)
      }
    );
  }
}
