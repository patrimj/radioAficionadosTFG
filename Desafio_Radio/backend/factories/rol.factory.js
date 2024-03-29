const genRoles = async (nombres) => {
    const roles = [];
    
    nombres.forEach(nombre => {
        roles.push({
            nombre: nombre
        });
    });

    return roles;
};

module.exports = {
    genRoles
};