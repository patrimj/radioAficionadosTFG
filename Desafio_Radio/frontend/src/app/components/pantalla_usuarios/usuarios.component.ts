import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//---PrimeNG---
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

//---Servicios---
import { UsuariosService } from '../../servicios/usuarios.service';

import { Usuario } from "../../interfaces/usuarios";


@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [CommonModule, RouterOutlet, FormsModule, MessagesModule],
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.css'
})


export class UsuariosComponent implements OnInit {

    usuarios: Usuario[] = [];
    usuario: Usuario = { id: 0, nombre: '', email: '', apellido_uno: '', apellido_dos: '', password: '', url_foto: new File([], ''), id_examen: '' };


    constructor(private usuariosService: UsuariosService, private router: Router) { }

    ngOnInit(): void {

    }

    mostrarUsuarios() {
        this.usuariosService.mostrarUsuarios().subscribe((respuesta) => {
          this.usuarios = respuesta.data;
        })
      }
    

}