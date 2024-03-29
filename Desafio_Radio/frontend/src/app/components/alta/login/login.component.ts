import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import { ButtonModule } from 'primeng/button';
import {PeticionLogin} from "../../../interfaces/peticion.login";
import {AuthService} from "../../../servicios/auth.service";
import {RespuestaLogin} from "../../../interfaces/respuesta.login";
import * as clavesStorage from "../../../helpers/clavesStorage";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {CardModule} from "primeng/card";

// JuanNavarrete

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    CardModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService, RouterOutlet, RouterLink]
})
export class LoginComponent {
  constructor(
    private servicioAuth: AuthService,
    private router: Router
  ) { }

  valorEmail = "";
  valorPassword = "";

  manejarDatosLogin = () => {
    const datosLogin: PeticionLogin = {
      email: this.valorEmail,
      password: this.valorPassword
    };

    this.servicioAuth.login(datosLogin).subscribe(this.manejarRespuestaLogin);
  }

  private manejarRespuestaLogin = (datos: RespuestaLogin) => {

    if (!datos.token) {
      // TODO: Insertar alerta de error.
      console.log('Usuario no valido')
      return;
    }

    localStorage.setItem(clavesStorage.datosLogin, JSON.stringify(datos));
    // TODO: Insertar alerta de exito.
    console.log(localStorage);
    console.log(datos);
    this.router.navigate(['noticias']);
  }
}
