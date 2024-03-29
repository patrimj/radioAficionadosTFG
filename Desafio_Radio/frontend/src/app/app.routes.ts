import { Routes } from '@angular/router';
import {LoginComponent} from "./components/alta/login/login.component";
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ActividadSecundariaComponent } from './components/actividad-secundaria/actividad-secundaria.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component'
import { PrincipalesComponent } from './components/principales/principales.component';
import {RecPasswordComponent} from "./components/rec-password/rec-password.component";
import {PerfilComponent} from "./components/perfil/perfil.component";
import {SubirCsvComponent} from "./components/subir-csv/subir-csv.component";
import {AltaComponent} from "./components/alta/alta.component";
import {InsertarContactoComponent} from "./components/insertar-contacto/insertar-contacto.component";
import {adminGuard} from "./guard/admin.guard";
import {authGuard} from "./guard/auth.guard";
import {operadorGuard} from "./guard/operador.guard";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/noticias'},
  {path: 'login', component: LoginComponent},
  {path: 'noticias', component: NoticiasComponent},
  {path: 'actividades', component: ActividadSecundariaComponent },
  {path: 'usuarios', component: UsuariosComponent, canActivate: [adminGuard]},
  {path: 'concursos', component: PrincipalesComponent, canActivate: [authGuard]},
  {path: 'rec-password', component: RecPasswordComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'subir-csv', component: SubirCsvComponent},
  {path: 'alta', component: AltaComponent},
  {path: 'insertar-contacto', component: InsertarContactoComponent}
];
