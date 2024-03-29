import {Component, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ActividadesService} from "../../../servicios/actividades.service";
import {CardModule} from "primeng/card";
import {AccordionModule} from "primeng/accordion";
import {ActividadSecundaria} from "../../../interfaces/actividad-secundaria";
import {Contacto} from "../../../interfaces/contacto";

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './contactos.component.html',
  // styleUrl: './contactos.component.css'
})
export class ContactosComponent implements OnInit {
  constructor(private servicioActividad: ActividadesService) {}

  @Input() secundaria?: ActividadSecundaria
  contactos?: Contacto[]

  ngOnInit(): void {
    this.obtenerContactos()
    console.log(this.secundaria)
  }

  private obtenerContactos() {
    if (this.secundaria) {
      this.servicioActividad.verContactosSec(this.secundaria!.id).subscribe(
        cuerpo => {
          this.contactos = cuerpo.data
          console.log(this.contactos)
        }
      );
    }
  }
}
