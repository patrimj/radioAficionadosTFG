import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let peticion = req.clone();

  const param = req.params.get('auth');

  if (param) {
    const token = localStorage.getItem('token');

    if (token) {
      peticion = req.clone({
        headers : req.headers.set('x-token', token)
      })
    }
  }

  return next(peticion) ;
};