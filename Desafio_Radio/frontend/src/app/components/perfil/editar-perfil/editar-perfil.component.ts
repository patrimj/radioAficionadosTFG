//JuanNavarrete
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModificarPerfil, Perfil, RespuestaModificarPerfil} from "../../../interfaces/perfil";
import {UsuarioService} from "../../../servicios/usuario.service";
import {ToastModule} from "primeng/toast";
import {Message, MessageService} from "primeng/api";
import { MessagesModule } from 'primeng/messages';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MessagesModule,
    FileUploadModule
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css',
  providers: [MessageService]
})
export class EditarPerfilComponent implements OnInit {
  mensajes: Message[] = [];
  nuevaFotoPerfil?: File
  valoresAntiguos?: ModificarPerfil

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioMensajes: MessageService
  ) {}
  @Input({required: true}) perfil: Perfil | undefined;

  formPerfil = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.max(20),
    ]),
    apellidoUno: new FormControl('', [
      Validators.required,
      Validators.max(20),
    ]),
    apellidoDos: new FormControl('', [
      Validators.required,
      Validators.max(20),
    ])
  });

  ngOnInit() {
    this.valoresAntiguos = {
      nombre: this.perfil!.usuario.nombre,
      apellido_uno: this.perfil!.usuario.apellido_uno,
      apellido_dos: this.perfil!.usuario.apellido_dos
    }

    this.formPerfil.setValue({
      nombre: this.valoresAntiguos.nombre,
      apellidoUno: this.valoresAntiguos.apellido_uno,
      apellidoDos: this.valoresAntiguos.apellido_dos,
    });
  }

  editarPerfil() {
    if (
      this.formPerfil.get('nombre')!.value! === this.valoresAntiguos?.nombre &&
      this.formPerfil.get('apellidoUno')!.value! === this.valoresAntiguos?.apellido_uno &&
      this.formPerfil.get('apellidoDos')!.value! === this.valoresAntiguos?.apellido_dos &&
      !this.nuevaFotoPerfil
    ) this.servicioMensajes.add(
      {severity:'error', summary:'No se ha editado el perfil.', detail:'No se ha modificado ningun campo'}
    )

    const id = this.perfil!.usuario.id;

    const datos = new FormData();
    datos.append('nombre', this.formPerfil.get('nombre')!.value!)
    datos.append('apellido_uno', this.formPerfil.get('apellidoUno')!.value!)
    datos.append('apellido_dos', this.formPerfil.get('apellidoDos')!.value!)

    if (this.nuevaFotoPerfil) datos.append('archivo', this.nuevaFotoPerfil, this.nuevaFotoPerfil.name)

    if (this.formPerfil.invalid) {
      this.servicioMensajes.add(
        {severity:'error', summary:'No se puede editar', detail:'Ningun campo puede estar vacio'}
      )

      return;
    }

    this.servicioUsuario.modificarPerfil(id, datos).subscribe(
      body => {
        if (body.id) this.servicioMensajes.add(
          {severity:'error', summary:'No se puede editar', detail:'Ningun campo puede estar vacio'}
        )
      }
    )
  }

  manejarFoto($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (input.files && input.files.length < 1) return

    this.nuevaFotoPerfil = input.files![0]

    console.log(this.nuevaFotoPerfil)
  }
}
