
import { Usuario } from "../pantalla_usuarios/usuarios"


export function esAdmin(usuario: Usuario | null) {
    if (usuario == null) {
        return false;
    }

    let rol = usuario.roles.find((rol: any) => rol.id_rol == 1);

    if (rol == null) {
        return false;
    }

    return true;
}