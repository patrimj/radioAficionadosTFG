//JuanNavarrete
import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageModule} from "primeng/message";
import {UsuarioService} from "../../../servicios/usuario.service";
import {RespuestaLogin} from "../../../interfaces/respuesta.login";
import {ToastModule} from "primeng/toast";
import {Message, MessageService} from "primeng/api";

@Component({
  selector: 'app-editar-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    ToastModule
  ],
  templateUrl: './editar-password.component.html',
  styleUrl: './editar-password.component.css',
  providers: [MessageService]
})
export class EditarPasswordComponent {
  constructor(private servicioUsuario: UsuarioService) {}
  cambiada?: boolean
  contrasenaValida?: boolean
  mensajes: Message[] = [];

  formContrasena = new FormGroup({
    contrasena: new FormControl(''),
    confContrasena: new FormControl(''),
  });

  editarContrasena() {
    const usuario = (JSON.parse(localStorage.getItem('datosLogin')!) as RespuestaLogin).usuario;
    const contrasena = this.formContrasena.get('contrasena');
    const confContrasena = this.formContrasena.get('confContrasena');

    this.mensajes.push({severity:'error', summary:'No se puede editar', detail:'Ningun campo puede estar vacio'});

    if (contrasena?.value !== confContrasena?.value) {
      this.cambiada = false;

      return;
    }

    this.servicioUsuario.cambiarContrasena(usuario.id, {password: contrasena?.value! }).subscribe(
      body => {
        this.cambiada = body.cambiada;
      }
    );
  }
}
