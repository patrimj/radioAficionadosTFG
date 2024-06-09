
import { Usuario } from "../pantalla_usuarios/usuarios";
import { Noticia } from "../pantalla_inicio/inicio";
import { Actividad } from "../pantalla_actividades/actividades";
import { Concurso } from "../pantalla_concursos/concursos";
import { PrincipalesSecundarias } from "../pantalla_actividades/actividades";

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

export function validarUsuarioAdmin(usuario: Usuario): string {

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!usuario.nombre || !usuario.email || !usuario.apellido_uno || !usuario.apellido_dos || !usuario.id_examen) {
    return 'Por favor, complete todos los campos';
  }

  if (!emailRegex.test(usuario.email)) {
    return 'El email no es válido';
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

export function validarUsuarioPerfil(usuario: Usuario): string {


  if (!usuario.nombre || !usuario.apellido_uno || !usuario.apellido_dos  || !usuario.id_examen) {
    return 'Por favor, complete todos los campos';
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


export function validarNoticias(noticia:Noticia): string {
  if (!noticia.nombre || !noticia.descripcion) {
    return 'Por favor, complete todos los campos';
  }

  if (noticia.nombre === '') {
    return 'Por favor, introduzca un nombre';
  }

  if (noticia.descripcion === '') {
    return 'Por favor, introduzca una descripción';
  }

  return '';
}

export function validarConcurso(concurso: Concurso): string {
  if (!concurso.nombre || !concurso.descripcion || !concurso.solucion) {
    return 'Por favor, complete todos los campos';
  }

  if (concurso.nombre === '') {
    return 'Por favor, introduzca un nombre';
  }

  if (concurso.descripcion === '') {
    return 'Por favor, introduzca una descripción';
  }

  if (concurso.solucion === '') {
    return 'Por favor, introduzca una solución';
  }

  return '';
}

export function validarActividad(actividad: Actividad, principalesSecundarias?: PrincipalesSecundarias): string {
  if (!actividad.nombre || !actividad.localizacion || !actividad.fecha || !actividad.frecuencia || !actividad.banda || !actividad.id_modo || !actividad.id_modalidad) {
    return 'Por favor, complete todos los campos';
  }

  if (actividad.nombre === '') {
    return 'Por favor, introduzca un nombre';
  }

  if (actividad.localizacion === '') {
    return 'Por favor, introduzca una localización';
  }

  if (actividad.fecha === '') {
    return 'Por favor, introduzca una fecha';
  }

  if (actividad.frecuencia === '') {
    return 'Por favor, introduzca una frecuencia';
  }

  if (actividad.banda === '') {
    return 'Por favor, introduzca una banda';
  }

  if (actividad.id_modo === 0) {
    return 'Por favor, introduzca un modo';
  }

  if (actividad.id_modalidad === 0) {
    return 'Por favor, introduzca una modalidad';
  }

  if (principalesSecundarias && principalesSecundarias.id_principal === 0) {
    return 'Por favor, introduzca un concurso';
  }

  if (principalesSecundarias && principalesSecundarias.premio === '') {
    return 'Por favor, introduzca un premio';
  }

  return '';
}
