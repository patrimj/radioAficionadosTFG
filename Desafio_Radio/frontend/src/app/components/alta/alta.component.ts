import { Component } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {RegistroComponent} from "./registro/registro.component";

@Component({
  selector: 'app-alta',
  standalone: true,
  imports: [
    LoginComponent,
    RegistroComponent
  ],
  templateUrl: './alta.component.html',
  styleUrl: './alta.component.css'
})
export class AltaComponent {

}
