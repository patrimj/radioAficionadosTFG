const { fakerES  } = require('@faker-js/faker');
const {hash} = require("bcrypt");
const {generarCodigoExamen} = require("../helpers/comun");

const genUsuarios = async (cantidad = 1) => {
    const usuarios = [];
    
    for (let i = 0; i < cantidad; i++) {
        const nombre =  fakerES.person.firstName();
        const nombreEmail = nombre.replace(" ", "").toLowerCase();
        const password = 'daw';
        const apellidos = fakerES.person.lastName().split(' ');
        const idExamen = generarCodigoExamen();

        usuarios.push({
            nombre: nombre,
            email: `${nombreEmail}@gmail.com`,
            password: await hash(password, 8),
            apellido_uno: apellidos[0],
            apellido_dos: apellidos[1],
            id_examen: idExamen,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    return usuarios;
};

module.exports = {
    genUsuarios
};