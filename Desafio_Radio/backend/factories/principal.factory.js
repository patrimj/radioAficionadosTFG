
const genPrincipales = (cantidad = 1) => {
    const actividades = [];

    for (let i = 0; i < cantidad; i++) {
        actividades.push({
            nombre: "Prueba generada",
            descripcion: "Descripcion prueba generada",
            url_foto: "",
            completada: false,
            solucion: "hola",
            created_at: new Date(),
            updated_at: new Date (),
            deleted_at: null,
        });
    }

    return actividades;
};

module.exports = {
    genPrincipales
};