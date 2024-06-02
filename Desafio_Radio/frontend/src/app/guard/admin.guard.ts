import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Rol} from "../pantalla_usuarios/usuarios";

export const adminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const datosLogin = JSON.parse(localStorage.getItem('usuarioDatos')!);

  if (datosLogin && datosLogin.usuario.roles.some((rol: Rol) => rol.nombre === 'admin')) {
    return true;
  } else {
    router.navigate(['/inicio']);
    return false;
  }
};

