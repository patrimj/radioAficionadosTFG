const { faker } = require('@faker-js/faker');

genModalidad = async (ctos = 1) => {
    const modalidadGen = [];
    const descripciones = ['genérica', 'puntos', 'letras'];
    for (let i = 0; i < ctos; i++) {
        if (i < descripciones.length) {
            modalidadGen.push({
                descripcion: descripciones[i]
            });
        }
    }
    return modalidadGen;

}

module.exports = {
    genModalidad
}
