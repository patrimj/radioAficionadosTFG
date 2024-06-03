import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


// Pantalla de Gestión de Usuarios
import { UsuariosComponent } from './pantalla_usuarios/usuarios.component';
// Pantalla de Actividades
import { ActividadesComponent } from './pantalla_actividades/actividades.component';
// Pantalla de Concursos
import { ConcursosComponent } from './pantalla_concursos/concursos.component';
// Pantalla de Inicio
import { InicioComponent } from './pantalla_inicio/inicio.component';
// Pantalla de Perfil
import { PerfilComponent } from './pantalla_perfil/perfil.component';
// Pantalla de Login y Registro
import { AutenticacionComponent } from './pantalla_autenticacion/autenticacion.component';
// Pantalla de Gestión de Contactos
import { ContactosComponent } from './pantalla_contactos/contactos.component';
// Header
import { HeaderComponent } from './components/header/header.component';
// Footer
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UsuariosComponent, ActividadesComponent, ConcursosComponent, InicioComponent, PerfilComponent, AutenticacionComponent, ContactosComponent, HeaderComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
