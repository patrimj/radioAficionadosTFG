import { Routes } from '@angular/router';

//-----Componentes-----\\

// Pantalla de Gestión de Usuarios
import { UsuariosComponent } from './components/pantalla_usuarios/usuarios.component'

//-----Guards-----\\

import {adminGuard} from "./guard/admin.guard";
import {authGuard} from "./guard/auth.guard";
import {operadorGuard} from "./guard/operador.guard";

//-----Rutas-----\\

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/inicio'},
  {path: 'usuarios', component: UsuariosComponent, canActivate: [adminGuard]},
  
];
