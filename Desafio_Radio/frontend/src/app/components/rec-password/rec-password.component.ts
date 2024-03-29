import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {LoginComponent} from "../alta/login/login.component";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsuarioService} from "../../servicios/usuario.service";

@Component({
  selector: 'app-rec-password',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule
  ],
  templateUrl: './rec-password.component.html',
  styleUrl: './rec-password.component.css'
})
export class RecPasswordComponent {
  constructor(private usuarioServicio: UsuarioService) {}

  recuperarPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
  });

  manejarCambioPassword() {
    let cambiada = false;

    if (this.recuperarPasswordForm.invalid) {
      // TODO: Mostrar notificación.
      return
    }

    const email = this.recuperarPasswordForm.get('email')!.value!

    this.usuarioServicio.recuperarPassword(email).subscribe(
      body => cambiada = body.msg
    )


    if (!cambiada) {
      // TODO: Mostrar notificación.
      console.log(cambiada);
      return;
    }

    console.log('cambiada.')
  }
}
