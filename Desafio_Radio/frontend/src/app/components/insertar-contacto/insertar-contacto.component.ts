// JuanNavarrete
import {Component, OnInit} from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import {ListboxClickEvent, ListboxModule} from "primeng/listbox";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsuarioService} from "../../servicios/usuario.service";
import {MessageModule} from "primeng/message";
import {ActividadesService} from "../../servicios/actividades.service";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {Modalidad} from "../../interfaces/modalidad";
import {UsuarioRegistro} from "../../interfaces/usuario";
import {Secundarias} from "../../interfaces/principales";
import {CrearContacto, MostrarUsuarioSecundaria, RespuestaCrearContacto} from "../../interfaces/contacto";
import {MessageService} from "primeng/api";
import {InputNumberModule} from "primeng/inputnumber";

@Component({
  selector: 'app-insertar-contacto',
  standalone: true,
  imports: [
    ListboxModule,
    ReactiveFormsModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    TagModule,
    ScrollPanelModule,
    TableModule,
    InputTextModule,
    InputNumberModule
  ],
  templateUrl: './insertar-contacto.component.html',
  styleUrl: './insertar-contacto.component.html',
  providers: [ UsuarioService, MessageService ]
})
export class InsertarContactoComponent implements OnInit {

  constructor(
    private servicioUsuarios: UsuarioService,
    private servicioActividad: ActividadesService,
    private servicioMensajes: MessageService
  ) {}

  usuarios?: UsuarioRegistro[];
  secundarias?: Secundarias[];
  modalidades?: Modalidad[];
  letrasRestantes?: string[];
  puntuacionRestante?: number;
  puntuacionPremio?: number;

  formularioInvalido = true;
  contactoFijado = false;

  usuarioSecundariaForm = new FormGroup({
    secundariaSelec: new FormControl<Secundarias | null>(null, [
      Validators.required
    ]),
    usuarioSelec: new FormControl<UsuarioRegistro | null>(null, [
      Validators.required
    ])
  });

  premioLetra = new FormControl<String>('', [
    Validators.required
  ]);

  modalidad = this.modalidades?.find(
    modalidadBuscada => {
      return modalidadBuscada.id == this.usuarioSecundariaForm.get('secundariaSelec')?.value?.id_modalidad
    }
  )

  descModalidades = {
    generica: "genérica",
    letras: "letras",
    puntos: "puntos"
  }

  ngOnInit() {
    this.obtenerUsuarios()
    this.obtenerSecundarias()
    this.obtenerModalidades()
  }

  obtenerUsuarios() {
    this.servicioUsuarios.verUsuarios().subscribe(
      respuestaBackend => this.usuarios = respuestaBackend.data
    );
  }

  obtenerSecundarias() {
    this.servicioActividad.mostrarActividadesSecundariasAdmin().subscribe(
      respuestaBackend => this.secundarias = respuestaBackend.data
    );
  }

  obtenerModalidades() {
    this.servicioActividad.verModalidades().subscribe(
      respuestaBackend => {
        this.modalidades = respuestaBackend.modalidades
      }
    );
  }


  obtenerLetrasRestantes(usuarioSecundaria: MostrarUsuarioSecundaria) {
    this.servicioActividad.verLetrasRestantesSecundaria(usuarioSecundaria).subscribe(
      respuestaBackend => {
        this.letrasRestantes = respuestaBackend
      }
    )
  }

  fijarContacto() {
    if (this.contactoFijado) return;

    if (this.usuarioSecundariaForm.invalid) {
      this.servicioMensajes.add({
        severity:'error',
        summary:'Contacto invalido',
        detail:'Debes seleccionar tanto un usuario como una actividad.'
      });

      return;
    }

    this.formularioInvalido = false;

    const secundariaSelec = this.usuarioSecundariaForm.get('secundariaSelec')?.value;
    const usuarioSelec = this.usuarioSecundariaForm.get('usuarioSelec')?.value;

    this.servicioActividad.comprobarContactoCompleto(usuarioSelec!.id, secundariaSelec!.id).subscribe(
      cuerpo => {
        this.manejarFijarContacto(cuerpo.data, secundariaSelec!, usuarioSelec!)
      }
    )
  }

  crearContacto() {
    if (this.usuarioSecundariaForm.invalid) {
      this.servicioMensajes.add({
        severity:'error',
        summary:'Contacto invalido',
        detail:'Debes rellenar todos los campos.'
      });

      return;
    }

    const secundariaSelec = this.usuarioSecundariaForm.get('secundariaSelec')?.value;
    const usuarioSelec = this.usuarioSecundariaForm.get('usuarioSelec')?.value;

    let premio: String | number | boolean;

    if (this.modalidad?.descripcion === this.descModalidades.puntos) {
      premio = this.validarPremioPuntos()
    } else if (this.modalidad?.descripcion === this.descModalidades.letras) {
      premio = this.validarPremioLetras()
    } else premio = this.modalidad?.descripcion === this.descModalidades.generica;

    console.log( this.modalidad?.descripcion, premio)

    if (premio === false) {
      this.servicioMensajes.add({
        severity: 'error',
        summary: 'Actividad no valida',
        detail: "Debes introducir algun premio."
      })

      return;
    }

    const contacto: CrearContacto = {
      idUsuario: usuarioSelec!.id.toString(),
      idActividad: secundariaSelec!.id.toString(),
      premio: premio,
    };


    if (this.modalidad?.descripcion === this.descModalidades.letras) {
      // Contacto por letras
      this.servicioActividad.crearContacto(contacto).subscribe(
        insertado => {
          this.manejarInsercionContacto(insertado);
        }
      );
    } else if (this.modalidad?.descripcion === this.descModalidades.puntos) {
      // Contacto por puntos
      this.servicioActividad.crearContactoPuntos(contacto).subscribe(
        insertado => {
          this.manejarInsercionContacto(insertado);
        });
    } else if (this.modalidad?.descripcion === this.descModalidades.generica) {
      // Contacto generico
      this.servicioActividad.crearContactoGenerico(contacto).subscribe(
        insertado => {
          this.manejarInsercionContacto(insertado);
        });
    } else {
      this.servicioMensajes.add({
        severity: 'error',
        summary: 'Actividad no valida',
        detail: "Ha ocurrido un error al insertar el contacto."
      })

      return;
    }
  }

  private validarPremioPuntos() {
    if (!this.puntuacionPremio) {
      return false;
    } else if (this.puntuacionPremio < 1) {
      this.servicioMensajes.add({
        severity: 'error',
        summary: 'Puntuación no valida',
        detail: "La puntuacion debe ser mayor que 0."
      })

      return false;
    }

    return this.puntuacionPremio
  }

  private manejarInsercionContacto(respuesta: RespuestaCrearContacto) {
    if (!respuesta.data) this.servicioMensajes.add({
      severity: 'error',
      summary: 'Error al insertar el contacto',
      detail: respuesta.msg
    })
    else if (!respuesta) {
      this.servicioMensajes.add({
        severity: 'error',
        summary: 'Error al insertar el contacto',
        detail: 'Se ha producido un error en el servidor.'
      })
    }
    else {
      this.manejarExitoInsercion();
    }
  }

  private manejarExitoInsercion() {
    this.servicioMensajes.add({
      severity: 'success',
      summary: 'Exito',
      detail: 'Se ha registrado el contacto correctamente.'
    });

    const secundariaSelec = this.usuarioSecundariaForm.get('secundariaSelec')?.value;
    const usuarioSelec = this.usuarioSecundariaForm.get('usuarioSelec')?.value;

    if (this.modalidad?.descripcion === this.descModalidades.letras) {
      this.obtenerLetrasRestantes({
        idUsuario: usuarioSelec!.id.toString(),
        idActividad: secundariaSelec!.id.toString()
      });

      if (this.letrasRestantes!.length < 1) {
        this.servicioMensajes.add({
          severity: 'success',
          summary: 'Exito',
          detail: `¡El usuario ${usuarioSelec?.id_examen} ha conseguido todos sus premios en ${secundariaSelec?.nombre}!`
        });

        this.premioLetra.reset();
        this.usuarioSecundariaForm.reset();
        this.contactoFijado = false;

        return
      }

      this.premioLetra.reset();
    } else if (this.modalidad?.descripcion === this.descModalidades.puntos) {
      this. obtenerPuntuacionRestante({
        idUsuario: usuarioSelec!.id.toString(),
        idActividad: secundariaSelec!.id.toString()
      });

      if (this.puntuacionRestante! <= 1) {
        this.servicioMensajes.add({
          severity: 'success',
          summary: 'Exito',
          detail: `¡El usuario ${usuarioSelec?.id_examen} ha conseguido todos sus premios en ${secundariaSelec?.nombre}!`
        });

        this.puntuacionRestante = 0;
        this.usuarioSecundariaForm.reset();
        this.contactoFijado = false;
      }
    }
  }

  private manejarFijarContacto(completado: boolean, secundariaSelec:  Secundarias, usuarioSelec: UsuarioRegistro) {
    if (completado) {
      this.servicioMensajes.add({
        severity:'error',
        summary: 'Contacto invalido',
        detail: 'Ese usuario ya ha completado el concurso.'
      });

      return;
    }

    this.contactoFijado = true;

    this.modalidad = this.modalidades?.find(
      modalidad => modalidad.id == secundariaSelec?.id_modalidad
    )

    if (this.modalidad?.descripcion! == this.descModalidades.letras) {
      this.obtenerLetrasRestantes({
        idUsuario: usuarioSelec!.id.toString(),
        idActividad: secundariaSelec!.id.toString()
      });
    } else if (this.modalidad?.descripcion! == this.descModalidades.puntos) {
      this.obtenerPuntuacionRestante({
        idUsuario: usuarioSelec.id.toString(),
        idActividad: secundariaSelec.id.toString()
      });
    }
  }

  private validarPremioLetras(): boolean | String {
    if (this.premioLetra.invalid) {
      this.servicioMensajes.add({
        severity: 'error',
        summary: 'Contacto invalido',
        detail: 'Ese usuario ya ha completado el concurso.'
      });

      return false;
    }

    return this.premioLetra.value!
  }

  private obtenerPuntuacionRestante(usuarioSecundaria: MostrarUsuarioSecundaria) {
    this.servicioActividad.verPuntuacionRestanteSecundaria(usuarioSecundaria).subscribe(
      respuestaBackend => {
        this.puntuacionRestante = respuestaBackend.data
        console.log('datos', respuestaBackend.data)
      }
    )
  }
}
