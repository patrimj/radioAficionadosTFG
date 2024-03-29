import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { Rol } from '../../interfaces/rol';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule, TabMenuModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  rutaActual: string = "";
  datosLogin = JSON.parse(localStorage.getItem('datosLogin')!) || null;
  isMenuVisible = false;
  urlFoto = '';
  
  usuario: Usuario | null = null;
  rol: Rol | null = null;
  
  rutas: MenuItem[] = [
    { label: 'Noticias', command: () => this.router.navigate(['noticias'])},
    { label: 'Concursos', command: () => this.router.navigate(['concursos'])},
    { label: 'Actividades', command: () => this.router.navigate(['actividades'])},
    { label: 'Gestion Usuarios', command: () => this.router.navigate(['usuarios'])},
    { label: 'Insertar contacto', command: () => this.router.navigate(['insertar-contacto'])},
    { label: 'Mi perfil', command: () => this.router.navigate(['perfil'])},
    { label: 'Iniciar sesión', command: () => this.router.navigate(['alta'])},
    { label: 'Cerrar Sesión', command: () => this.cerrarSesion() }
  ];
  rutasRol: MenuItem[] = [];



  constructor(private location: Location, private router: Router, private authService: AuthService) {
    this.rutaActual = this.location.path();
  }

  ngOnInit() {

    let idRol = 0;

    if (this.datosLogin != null) {
      idRol = this.datosLogin.usuario.roles[0].id;
    }

    switch (idRol) {
      case 1: // Administrador
        this.rutasRol = this.rutas.filter(
          ruta => ruta.label != 'Iniciar sesión' && ruta.label != 'Actividades' && ruta.label != 'Insertar contacto'
        )
        break;
      case 2: // Operador
        this.rutasRol = this.rutas.filter(
          ruta => ruta.label != 'Insertar contacto' && ruta.label != 'Gestion Usuarios' && ruta.label != 'Iniciar sesión'
        );
        break;
      case 3: // Usuario
        this.rutasRol = this.rutas.filter(
          ruta => ruta.label != 'Insertar contacto' && ruta.label != 'Gestion Usuarios'
          && ruta.label != 'Iniciar sesión' && ruta.label != 'Insertar contacto'
        )
        break;
      default: // No logueado
        this.rutasRol = this.rutas.filter(
          ruta => ruta.label != 'Insertar contacto' && ruta.label != 'Gestion Usuarios'
            && ruta.label != 'Cerrar Sesión' && ruta.label != 'Insertar contacto' && ruta.label != 'Mi perfil'
            && ruta.label != 'Concursos' && ruta.label != 'Actividades' 
        )
        break;
    }
  }

  closeItem(event: Event, index: number) {
    this.rutasRol = this.rutasRol.filter((item, i) => i !== index);
    event.preventDefault();
  }

  cambiarFoto() {
    if (this.datosLogin != null) {
      this.urlFoto = this.datosLogin.usuario.url_foto;
    }
  }

  alternarMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  cerrarSesion() {
    this.authService.logout();
    window.location.reload()
  }
}
