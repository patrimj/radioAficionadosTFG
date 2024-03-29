
const genUsuarioSec = (cantidad = 1) => {
    const contactos = [];
    const palabra = "hola";
    
    for (let i = 0; i < palabra.length - 1; i++) {
        contactos.push({
            id_usuario: 1,
            id_secundaria: 1,
            premio: palabra[i],
            created_at: Date.now(),
            updated_at: Date.now(),
            deleted_at: null,
        });
    }

    return contactos;
};

module.exports = {
    genUsuarioSec
};