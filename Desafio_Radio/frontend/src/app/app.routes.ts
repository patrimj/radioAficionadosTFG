import { Routes } from '@angular/router';

//-----Componentes-----\\

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

//-----Guards-----\\

import {adminGuard} from "./guard/admin.guard";
import {authGuard} from "./guard/auth.guard";
import {operadorGuard} from "./guard/operador.guard";

//-----Rutas-----\\

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/inicio'},
  {path: 'usuarios', component: UsuariosComponent, canActivate: [adminGuard]},
  {path: 'actividades', component: ActividadesComponent},
  {path: 'concursos', component: ConcursosComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'perfil', component: PerfilComponent, canActivate: [authGuard]},
  {path: 'autenticacion', component: AutenticacionComponent},
  {path: 'contactos', component: ContactosComponent, canActivate: [operadorGuard]},

];
