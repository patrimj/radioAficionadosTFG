import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const datosLogin = JSON.parse(localStorage.getItem('usuarioDatos')!);

  if (datosLogin && datosLogin.token) {
    return true;
  } else {
    router.navigate(['/inicio']);
    return false;
  }
};

