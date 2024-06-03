import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario, Rol } from '../../pantalla_usuarios/usuarios';
import { UsuariosService } from '../../pantalla_usuarios/usuarios.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule, TabMenuModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  rutaActual: string = "";
  datosLogin = JSON.parse(localStorage.getItem('usuarioDatos')!) || null;
  isMenuVisible = false;
  urlFoto = '';

  usuario: Usuario | null = null;
  rol: Rol | null = null;

  rutas: MenuItem[] = [
    { label: 'Inicio', command: () => this.router.navigate(['inicio']) },
    { label: 'Concursos', command: () => this.router.navigate(['concursos']) },
    { label: 'Actividades', command: () => this.router.navigate(['actividades']) },
    { label: 'Gestion Usuarios', command: () => this.router.navigate(['usuarios']) },
    { label: 'Insertar contacto', command: () => this.router.navigate(['contactos']) },
    { label: 'Mi perfil', command: () => this.router.navigate(['perfil']) },
    { label: 'Iniciar sesión', command: () => this.router.navigate(['autenticacion']) },
    { label: 'Cerrar Sesión', command: () => this.cerrarSesion() }
  ];
  rutasRol: MenuItem[] = [];

  constructor(private location: Location, private router: Router, private usuariosService: UsuariosService) {
    this.rutaActual = this.location.path();
  }

  ngOnInit() {
    this.rutasRol = [...this.rutasRol, ...this.rutas.filter(
      ruta => ruta.label != 'Insertar contacto' && ruta.label != 'Gestion Usuarios'
        && ruta.label != 'Cerrar Sesión' && ruta.label != 'Mi perfil'
    )];
    
    if (this.datosLogin != null) {
      this.rutasRol = [];

      this.datosLogin.roles.forEach((rol: { RolAsignado: { id_rol: number } }) => {
        let idRol = rol.RolAsignado.id_rol;

        switch (idRol) {

          case 1: // Administrador
            this.rutasRol = [...this.rutasRol, ...this.rutas.filter(
              ruta => ruta.label != 'Insertar contacto' && ruta.label != 'Iniciar sesión'
            )];
            break;

          case 2: // Operador
            this.rutasRol = [...this.rutasRol, ...this.rutas.filter(
              ruta => ruta.label != 'Gestion Usuarios' && ruta.label != 'Iniciar sesión'
            )];
            break;

          case 3: // Usuario
            this.rutasRol = [...this.rutasRol, ...this.rutas.filter(
              ruta => ruta.label != 'Insertar contacto' && ruta.label != 'Gestion Usuarios' && ruta.label != 'Iniciar sesión'
            )];
            break;
        }
      });

      // eliminmos duplicados 
      this.rutasRol = this.rutasRol.filter((ruta, index, self) =>
        index === self.findIndex((t) => (
          t.label === ruta.label
        ))
      );
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
    this.usuariosService.logout();
    window.location.reload()
  }
}
