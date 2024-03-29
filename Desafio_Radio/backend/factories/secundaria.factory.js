
const genSecundarias = (cantidad = 1) => {
    const actividades = [];
    
    for (let i = 0; i < cantidad; i++) {
        actividades.push({
            nombre: "Prueba generada",
            url_foto: "",
            localizacion: "Puertollano",
            fecha: Date.now(),
            frecuencia: "1000",
            banda: "40",
            id_modo: 1,
            id_modalidad: 1,
            created_at: Date.now(),
            updated_at: Date.now(),
            deleted_at: null,
        });
    }

    return actividades;
};

module.exports = {
    genSecundarias
};