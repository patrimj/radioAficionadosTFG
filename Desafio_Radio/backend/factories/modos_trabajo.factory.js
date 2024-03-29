const { faker } = require('@faker-js/faker');

const genModos_trabajo = async (ctos = 1) => {
    const modos_trabajoGen = [];
    const nombres = ['fonía', 'telegrafía', 'modos digitales'];

    for (let i = 0; i < ctos; i++) {
        if (i < nombres.length) {
            modos_trabajoGen.push({
                nombre: nombres[i],
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
    }
    return modos_trabajoGen;
}

module.exports = {
    genModos_trabajo
}