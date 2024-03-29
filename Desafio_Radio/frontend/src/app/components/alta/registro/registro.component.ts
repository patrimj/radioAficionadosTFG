// JuanNavarrete
import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";
import {UsuarioService} from "../../../servicios/usuario.service";
import {Rol} from "../../../interfaces/rol";
import {MessageService} from "primeng/api";
import {MessagesModule} from 'primeng/messages'
import {getLocaleFirstDayOfWeek, NgIf} from "@angular/common";
import $ from "jquery";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    RouterLink,
    ReactiveFormsModule,
    MessagesModule,
    NgIf
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers: [MessageService]
})
export class RegistroComponent implements OnInit {

  constructor(private servicioUsuario: UsuarioService, private servicioMensajes: MessageService) {
    // this.obtenerRolRegistro()
  }

  ngOnInit() {
    // TODO: Obtener rol de aficionado
  }

  // TODO: Cambiar a GET. Solo temporal.
  rolAficionado: Rol = {
    id: 3,
    nombre: "aficionado"
  };

  fotoPerfil?: File;
  registrado = false;

  registroForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    confPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    indicativo: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(7),
    ]),
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(7)
    ]),
    apellidoUno: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25)
    ]),
    apellidoDos: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25)
    ]),

  });

  registrarConFoto(inputFoto: HTMLInputElement) {
    inputFoto.click()

    inputFoto.onchange = () => this.manejarFoto(inputFoto)
  }


  registrarUsuario() {
    const datos = new FormData();
    datos.append('email', this.registroForm.get('email')!.value!)
    datos.append('nombre', this.registroForm.get('nombre')!.value!)
    datos.append('apellido_uno', this.registroForm.get('apellidoUno')!.value!)
    datos.append('apellido_dos', this.registroForm.get('apellidoDos')!.value!)
    datos.append('password', this.registroForm.get('password')!.value!)
    datos.append('id_examen', this.registroForm.get('nombre')!.value!)

    if (this.fotoPerfil?.name) datos.append('archivo', this.fotoPerfil!, this.fotoPerfil.name)

    // const usuario: UsuarioRegistro = {
    //   id: 0,
    //   email: this.registroForm.get('email')!.value!,
    //   nombre: this.registroForm.get('nombre')!.value!,
    //   apellido_uno: this.registroForm.get('apellidoUno')!.value!,
    //   apellido_dos: this.registroForm.get('apellidoDos')!.value!,
    //   password: this.registroForm.get('password')!.value!,
    //   roles: [this.rolAficionado],
    //   id_examen: this.registroForm.get('indicativo')!.value!,
    // }

    let mensaje = "";

    this.servicioUsuario.registrarUsuario(datos).subscribe(
      body => {
        this.registrado = body!.data
        mensaje = body!.msg
      }
    );

    if (this.registrado) this.servicioMensajes.add({
      severity: 'success',
      summary: '¡Registrado!',
      detail: 'El usuario se ha registrado correctamente'
    })
    else this.servicioMensajes.add({
      severity: 'error',
      summary: 'Usuario no registrado.',
      detail: mensaje
    })
  }

  manejarFoto(inputFoto: HTMLInputElement) {
    console.log('a');

    if (!this.registroForm.valid) {
      this.servicioMensajes.add({severity:'error', summary:'No es posible registrarse', detail:'Ningun campo puede estar vacio'});
      return
    }

    this.fotoPerfil = inputFoto.files![0];

    let contrasena = this.registroForm.get('password')!.value!;
    let confContrasena = this.registroForm.get('confPassword')!.value!;

    if (contrasena !== confContrasena) {
      this.servicioMensajes.add({severity:'error', summary:'No es posible registrarse', detail:'Las contraseñas no son validas'});
      return;
    }

    if (this.fotoPerfil) this.registrarUsuario();
    else this.servicioMensajes.add({severity:'error', summary:'No es posible registrarse', detail:'Las contraseñas no son validas'});
  }
}
