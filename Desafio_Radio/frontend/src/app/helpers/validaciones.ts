//Patricia

import { Usuario } from "../pantalla_usuarios/usuarios";


export function validarUsuario(usuario: Usuario): string {

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

export function validarPasswordUsuario(contraseñaVieja: string, contraseñaNueva: string): string {
  if (contraseñaVieja === contraseñaNueva) {
    return 'La nueva contraseña no puede ser igual a la antigua';
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

