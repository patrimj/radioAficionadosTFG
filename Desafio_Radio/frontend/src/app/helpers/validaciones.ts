//Patricia

import { UsuarioRegistro } from "../interfaces/usuario";
import { Noticias } from "../interfaces/noticias";
import { Principales } from "../interfaces/principales";

export function validarUsuario(usuario: UsuarioRegistro): string {

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{5,}$/;

  if (!usuario.nombre || !usuario.email || !usuario.apellido_uno || !usuario.apellido_dos || !usuario.url_foto || !usuario.id_examen) {
    return 'Por favor, complete todos los campos';
  }

  if (!emailRegex.test(usuario.email)) {
    return 'El email no es válido';
  }

  if (!passwordRegex.test(usuario.password)) {
    return 'La contraseña debe tener al menos 5 caracteres, una mayúscula, una minúscula, un número y un caracter especial';
  }

  if (/[^a-zA-Z ]/.test(usuario.nombre)) {
    return 'El nombre no debe contener números ni caracteres especiales';
  }
  if (/[^a-zA-Z ]/.test(usuario.apellido_uno)) {
    return 'El primer apellido no debe contener números ni caracteres especiales';
  }
  if (/[^a-zA-Z ]/.test(usuario.apellido_dos)) {
    return 'El segundo apellido no debe contener números ni caracteres especiales';
  }

  if (usuario.nombre.length < 3) {
    return 'El nombre debe tener al menos 3 caracteres';
  }

  if (usuario.apellido_uno.length < 3) {
    return 'El primer apellido debe tener al menos 3 caracteres';
  }
  if (usuario.apellido_dos.length < 3) {
    return 'El segundo apellido debe tener al menos 3 caracteres';
  }

  if (usuario.id_examen === '') {
    return 'El ID del examen no puede estar vacío';
  }
  if (!usuario.url_foto) {
    return 'Por favor, introduzca una imágen';
  }

  if (usuario.nombre === '') {
    return 'Por favor, introduzca un nombre';
  }

  if (usuario.apellido_uno === '') {
    return 'Por favor, introduzca un apellido';
  }

  if (usuario.apellido_dos === '') {
    return 'Por favor, introduzca un apellido';
  }

  return '';
}

export function validarDatosRol(email: string): string {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailRegex.test(email)) {
    return 'El email no es válido';
  }

  return '';
}

export function validarPrincipal(principal: Principales): string {
  if (!principal.nombre || !principal.descripcion || !principal.solucion) {
    return 'Por favor, complete todos los campos';
  }
  if (principal.nombre.length < 3) {
    return 'El nombre debe tener al menos 3 caracteres';
  }
  if (principal.descripcion.length < 3) {
    return 'La descripción debe tener al menos 3 caracteres';
  }
  if (principal.solucion.length < 3) {
    return 'La solución debe tener al menos 3 caracteres';
  }

  return '';
}

export function validarNoticias(noticia: Noticias): string {
  if (!noticia.nombre || !noticia.descripcion) {
    return 'Por favor, complete todos los campos';
  }
  if (noticia.nombre.length < 3) {
    return 'El título debe tener al menos 3 caracteres';
  }
  if (noticia.descripcion.length < 3) {
    return 'La descripción debe tener al menos 3 caracteres';
  }
  if (noticia.nombre.length > 20) {
    return 'El título de la noticia no debe exceder los 50 caracteres';
  }
  if (noticia.descripcion.length > 200) {
    return 'La descripción de la noticia no debe exceder los 500 caracteres';
  }
  return '';
}