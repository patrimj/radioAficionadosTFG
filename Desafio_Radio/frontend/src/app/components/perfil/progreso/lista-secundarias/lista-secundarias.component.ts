import {Component, Input} from '@angular/core';
import {ActSecundariaProg} from "../../../../interfaces/perfil";
import {CardModule} from "primeng/card";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-lista-secundarias',
  standalone: true,
  imports: [
    CardModule,
    DatePipe
  ],
  templateUrl: './lista-secundarias.component.html',
  styleUrl: './lista-secundarias.component.css'
})
export class ListaSecundariasComponent {
  @Input() secundaria?: ActSecundariaProg
}
