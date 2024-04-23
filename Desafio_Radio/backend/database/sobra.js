verSecundariasUsuarioPrincipal = async (idUsuario) => {
    try {

        const usuarioSecundarias = await models.Usuario_secundarias.findAll({
            where: { id_usuario: idUsuario },
            attributes: ['id_secundaria']
        });

        // No es lo eficiente hacerlo de esta forma, ya que consulto dos veces los contactos,
        // pero es la más sencilla. Probando con una asociación más grande no ha sido posible.
        const secundariasIds = usuarioSecundarias.map(usuarioSec => usuarioSec.id_secundaria);

        const principales = await models.ActividadPrincipal.findAll({
            where: { completada: false },
            include: [
                {
                    model: models.ActividadSecundaria,
                    as: 'act_secundarias',
                    attributes: ['id', 'nombre', 'url_foto', 'localizacion', 'fecha'],
                    through: { attributes: [] },
                    where: {
                        id: secundariasIds,
                        completada: false
                    },
                    include: [
                        {
                            model: models.Modalidad,
                            as: 'modalidad'
                        },
                        {
                            model: models.Usuario_secundarias,
                            as: 'act_secundarias_usuario',
                            where: { id_usuario: idUsuario }
                        }
                    ]
                },
            ]
        });

        // principales.forEach(principal => {
        //     const solucion = principal.solucion;
        //     if (!isNaN(solucion)) {
        //         const solucionNum = Number(solucion);
        //
        //         let suma = 0;
        //         let secundarias = principal.act_secundarias;
        //
        //         for (let i = 0; i < secundarias; i++) {
        //             suma += Number(secundarias[i].premio);
        //         }
        //     }
        // })

        return principales;
    } catch (e) {
        console.error(e.message)
        return false
    }
}
