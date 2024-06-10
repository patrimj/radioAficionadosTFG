
const genUsuarioPrinc = (cantidad = 1) => {
    const contactos = [];

    for (let i = 0; i < cantidad; i++) {
        contactos.push({
            id_usuario: 1,
            id_principal: 1,
            created_at: Date.now(),
            updated_at: Date.now(),
            deleted_at: null,
        });
    }

    return contactos;
};

module.exports = {
    genUsuarioPrinc
};