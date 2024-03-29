//Patricia
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//---Servicio---
import { ActividadesService } from '../../servicios/actividades.service';

//---Interfaces---
import { Principales } from '../../interfaces/principales';
import { ParticipantesSecundarias } from '../../interfaces/principales';


//---Usuario registrado---
import { Rol } from '../../interfaces/rol';
import { Usuario } from '../../interfaces/usuario';

//---PrimeNG---
import { DataViewModule } from 'primeng/dataview';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

//---Helpers---
import { recibirIdUsuario, recibirUsuario, esAdmin } from '../../helpers/comun';
import { validarPrincipal } from '../../helpers/validaciones';
import { error } from 'console';

@Component({
    selector: 'app-principales',
    standalone: true,
    imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule, DataViewModule],
    templateUrl: './principales.component.html',
    styleUrl: './principales.component.css'
})
export class PrincipalesComponent implements OnInit {

    //---Mensajes---
    mensaje: Message[] = [];
    mensajeEliminado: Message[] = [];
    mensajeModificado: Message[] = [];

    //---Actividades---
    principales: Principales[] = [];
    principal: Principales = { id: 0, nombre: '', descripcion: '', url_foto: new File([], ''), completada: false, solucion: '' };

    //---Participantes---
    participantesSecundarias: ParticipantesSecundarias[] = [];
    participanteSecundaria: ParticipantesSecundarias = {
        id: 0,
        usuario_secundarias_secundarias: {
            nombre: '',
            email: '',
            apellido_uno: '',
            apellido_dos: '',
            url_foto: '',
            id_examen: ''
        },
        act_secundaria: {
            nombre: ''
        }
    };


    tipoActividad = 'todas'; // todas o terminadas
    actividadPrincipal = 0; //para el input
    principalSeleccionada: boolean = false;  //para deseleccionar
    imagenSubir: File = new File([], ''); //para subir imagen

    //---Usuario---
    usuario: Usuario | null = null;
    id_usuario = 0;
    esAdmin: Rol | null = null;

    constructor(private actividadesService: ActividadesService, private router: Router) { }

    ngOnInit() {
        this.usuario = recibirUsuario();
        this.id_usuario = recibirIdUsuario(this.usuario);
        this.esAdmin = esAdmin(this.usuario);
        this.mostrarPrincipales();
        this.mostrarParticipantesSecundarias();
    }

    imagen(event: Event) {
        const eventTarget = event.target as HTMLInputElement;
        if (eventTarget.files && eventTarget.files.length > 0) {
            this.imagenSubir = eventTarget.files[0];
            console.log('imagen:', this.imagenSubir);
        }
    }

    hayRegistrosPrincipales() {
        return this.principales.length > 0;
    }


    mostrarPrincipales() {
        this.actividadesService.mostrarActividadesPrincipales().subscribe((respuesta) => {
            this.principales = respuesta.data;
        });
    }

    mostrarPrincipalesTerminadas() {
        this.actividadesService.mostrarActividadesPrincipalesTerminadas().subscribe((respuesta) => {
            this.principales = respuesta.data;
        })
    }

    mostrarPrincipalesPendientes() {
        this.actividadesService.mostrarActividadesPrincipalesPendientes().subscribe((respuesta) => {
            this.principales = respuesta.data;
        })
    }

    validarPrincipal() {
        return validarPrincipal(this.principal);
    }

    altaPrincipal() {
        const mensajeValidado = this.validarPrincipal();

        if (mensajeValidado) {
            this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
            return;
        }

        const formData = new FormData();
        formData.append('archivo', this.imagenSubir, this.imagenSubir.name);
        formData.append('nombre', this.principal.nombre);
        formData.append('descripcion', this.principal.descripcion);
        formData.append('completada', this.principal.completada.toString());
        formData.append('solucion', this.principal.solucion);


        this.actividadesService.altaActividadPrincipal(formData).subscribe(
            data => {
                if (data) {
                    this.mensaje = [{ severity: 'success', summary: 'Concurso creado correctamente', detail: '' }];
                    this.mensajeModificado = [];
                    this.mensajeEliminado = [];

                    this.mostrarPrincipales();

                    this.principal = { id: 0, nombre: '', descripcion: '', url_foto: new File([], ''), completada: false, solucion: '' };
                }
            },
            error => {
                if (error) {
                    this.mensaje = [{ severity: 'error', summary: 'Error,', detail: ' complete todos los campos' }];
                }
            }
        );

    }

    modificarPrincipal() {

        const mensajeValidado = this.validarPrincipal();

        if (mensajeValidado) {
            this.mensaje = [{ severity: 'error', summary: 'Error', detail: mensajeValidado }];
            return;
        }

        const formData = new FormData();
        formData.append('archivo', this.imagenSubir, this.imagenSubir.name);
        formData.append('nombre', this.principal.nombre);
        formData.append('descripcion', this.principal.descripcion);
        formData.append('completada', this.principal.completada.toString());
        formData.append('solucion', this.principal.solucion);

        this.actividadesService.modificarActividadPrincipal(this.principal, formData).subscribe(
            data => {
                if (data) {
                    this.mensajeModificado = [{ severity: 'success', summary: 'Concurso modificado correctamente', detail: '' }];
                    this.mensaje = [];
                    this.mensajeEliminado = [];

                    this.mostrarPrincipales();

                    this.principal = { id: 0, nombre: '', descripcion: '', url_foto: new File([], ''), completada: false, solucion: '' };
                }
            },
            error => {
                if (error) {
                    this.mensajeModificado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
                }
            }
        );
    }

    eliminarPrincipal(id: number) {
        this.actividadesService.bajaActividadPrincipal(id).subscribe(
            data => {
                if (data) {
                    this.mensajeEliminado = [{ severity: 'success', summary: 'Concurso eliminado correctamente', detail: '' }];
                    this.mensaje = [];
                    this.mensajeModificado = [];
                    this.mostrarPrincipales();
                }
            },
            error => {
                if (error) {
                    this.mensajeEliminado = [{ severity: 'error', summary: 'Error', detail: 'Error' }];
                }
            }
        );
    }
    mostrarParticipantesSecundarias() {
        this.actividadesService.mostrarParticipantesSecundarias().subscribe((respuesta) => {
            console.log('Participantes sec:', respuesta.data);
            this.participantesSecundarias = respuesta.data;
        })
    }
    seleccionarPrincipal(principal: Principales) {
        this.principal = principal;
        this.principalSeleccionada = true;
    }

    deseleccionarPrincipal() {
        this.principal = { id: 0, nombre: '', descripcion: '', url_foto: new File([], ''), completada: false, solucion: '' };
        this.principalSeleccionada = false;
    }

    inicio(): void {
        this.router.navigate(['unico-contacto']);
    }

    cargarActividades() {
        switch (this.tipoActividad) {
            case 'todas':
                this.mostrarPrincipales();
                break;
            case 'terminadas':
                this.mostrarPrincipalesTerminadas();
                break;
            case 'pendientes':
                this.mostrarPrincipalesPendientes();
                break;
        }
    }
}
