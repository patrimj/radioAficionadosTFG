# DESARROLLO WEB PARA LA ASOCIACIÓN DE RADIOAFICIONADOS CB ALARCOS
---

## ÍNDICE
[1. INTRODUCCIÓN ](#1-introduccion)

[2. DESCRIPCIÓN DE LA APLICACION](#2-descripcion-de-la-aplicacion)

[3. MANUAL DE USO DE LA API](#4-manual-de-uso-de-la-api)


## 1. INTRODUCCIÓN
---

La asociación de Radioaficionados CB Alarcos es una asociación sin ánimo de lucro con sede en Ciudad Real que reúne a aficionados de la radioafición en Ciudad Real y alrededores. Desde su fundación, la asociación se ha convertido en un referente en la comunidad local, promoviendo el interés por la radio y la comunicación a través de la misma.

La asociación CB Alarcos organiza una variedad de eventos a nivel local e incluso nacional para sus miembros, fomentando el intercambio de conocimientos y la pasión por la radioafición. Eventos como charlas, formaciones, concursos o actividades, los cuales serán detallados a continuación.

- Los concursos de radioafición (actividades premiadas con diplomas a varios contactos (1)) representan una forma dinámica y divertida de poner a prueba las habilidades de los radioaficionados y competir con otros entusiastas de la radio.

- Cada concurso está compuesto por un conjunto de actividades (varios contactos) que los participantes deben completar para obtener su diploma correspondiente. Estos concursos pueden variar en dificultad y formato, desde resolver acertijos, completando palabras o frases hasta completar una cantidad de puntos.
- A lo largo del desarrollo de las actividades, los aficionados acumulan puntos o letras de la palabra o frase clave, que les permitirán avanzar hacia la solución final del concurso. Una vez que se completen todas las actividades y se alcance la solución final, los aficionados pueden solicitar su diploma por haber participado en dicho concurso.
- Las actividades individuales (actividades premiadas con diplomas a un único contacto (2)), son actividades que no pertenecen a ningún concurso concretamente y por las que no hay que resolver ningún acertijo ni sumar puntos. Los aficionados deben contactar una única vez con el operador para lograr el diploma, sin necesidad de realizar ninguna otra actividad adicional.
- Las charlas y cursos de formación que ofrece la asociación tienen como objetivo enseñar sobre la radioafición. Estos cursos abarcan temas como el funcionamiento de los equipos de radio, la propagación de las ondas de radio y las reglas y regulaciones que administran el uso de la radioafición.
- Además de organizar eventos, la asociación también mantiene un perfil de Facebook activo, donde regularmente comparte contenido relevante sobre la radioafición y eventos próximos para sus miembros y seguidores.

> [!NOTE]
> (1) “actividades premiadas con diplomas a varios contactos" se refiere a las actividades en las cuales los participantes deben realizar una serie de contactos (llamadas) por radio para completar un concurso.
> 
> (2) “actividades premiadas con diplomas a un único contacto" se refiere a una actividad que no pertenece a ningún concurso y, con la que, con tan solo participar (contactar) ya logras el diploma, sin necesidad de completar ninguna actividad más.


## 2. DESCRIPCIÓN DE LA APLICACIÓN
---

La aplicación se construirá siguiendo una arquitectura basada en API REST, lo que permitirá una comunicación eficiente entre el servidor y el cliente mediante el protocolo HTTP. En el lado del servidor, se utilizará NodeJS, una plataforma de desarrollo de aplicaciones en JavaScript conocida por su escalabilidad y rendimiento. Por otro lado, en el lado del cliente, se implementará Angular, un framework de código abierto, que facilita la creación de aplicaciones web.


Para garantizar una experiencia de usuario atractiva y fácil de usar, se aprovechará la combinación de Bootstrap y PrimeNG. Bootstrap es un popular framework de diseño frontend que proporciona un conjunto de herramientas y estilos para la creación rápida de interfaces de usuario responsivas. PrimeNG, por su parte, es una biblioteca de componentes de interfaz de usuario para Angular, que ofrece una amplia gama de elementos de IU personalizables.

### Manual de ejecución

#### [Backend]

Para ejecutar el backend de la aplicación, primero necesitarás instalar las dependencias necesarias. Puedes hacerlo ejecutando el siguiente comando en la carpeta raíz `/backend`:

```bash
npm install
```

Una vez instaladas las dependencias, puedes iniciar el servidor backend utilizando `nodemon` con el siguiente comando:

```bash
nodemon
```

#### [Frontend]

Para el frontend, también necesitarás instalar las dependencias primero. Al igual que con el backend, puedes hacerlo con el siguiente comando en la carpeta raíz `/frontend`:

```bash
npm install
```

Después de instalar las dependencias, puedes iniciar la aplicación frontend con el siguiente comando:

```bash
ng serve --open
```

Esto abrirá automáticamente la aplicación en tu navegador.


## 3. MANUAL DE USO DE LA API

- `Colecciones de Thunder Client`: para facilitar las pruebas de la API, he preparado una colección en Thunder Client para que la comprobación de las rutas sea más sencilla. Se encuentran en la carpeta [Documentos](./Documentos/) (Funcionan todas).
- `Roles de Usuario y Funcionalidades`
  - En nuestra aplicación, ofrecemos diferentes roles de usuario, cada uno con su propio conjunto de funcionalidades. Los cuales son identificados tras su registro e inicio de sesión en la aplicación. Aquí te presentamos una descripción de cada rol y sus funcionalidades:

  - #### Administrador
  
    - El administrador tiene el nivel más alto de acceso en nuestra aplicación. 
  
    - Funcionalidades:
      - Crear, editar y eliminar usuarios.
      - Crear, editar y eliminar concursos.
      - Crear, editar y eliminar noticias.
     
    - Datos de Inicio de Sesión de un `Administrador`
      ```
      email: administrador@gmail.com
      contraseña: Administrador1@`
      ```

  - ### Operador

    - El operador tiene un nivel de acceso limitado en nuestra aplicación. 

    - Funcionalidades:
      - Crear, editar y eliminar actividades.
      - Registrar contactos.
        
    - Datos de Inicio de Sesión de un `Operador`
      ```
      email: operador@gmail.com
      contraseña: Operador1@`
      ```

  - ### Aficionado

    - El aficionado es un usuario regular de nuestra aplicación. (El administrador y operador son tambien este rol)

    - Funcionalidades:
      - Ver todas las actividades y sus detalles.
      - Ver todas los concursos y sus detalles.
      - Gestionar su propio perfil
      - Conocer a los participantes de las actividades
      - Conseguir diplomas
      - Ver todas las noticias, administradores y operadores
     
    - Datos de Inicio de Sesión de un `Aficionado`
      ```
      email: aficionado@gmail.com
      contraseña: Aficionado1@`
      ```
     
  - ### Usuario no logueado

    - El usuario que no cuente con una cuenta tendrá limitado su acceso en la web.

    - Funcionalidades:
      - Ver todas las actividades y sus detalles.
      - Ver todas los concursos y sus detalles.
      - Conocer a los participantes de las actividades
      - Ver todas las noticias, administradores y operadores


## RUTAS PERFIL

#### Ver actividades de un único contacto
- URL: `/actividades/unicoContacto/aficionado`
- Método: GET
- Datos requeridos:
    - token: Token de autenticación (string)

#### Ver actividades de varios contactos y concurso
- URL: `/actividades/variosContactos/aficionado`
- Método: GET
- Datos requeridos:
    - token: Token de autenticación (string)

#### Ver actividades de un concurso (Modal)
- URL: `/perfil/actividades/:id_principal`
- Método: GET
- Parámetros de ruta:
    - id_principal: ID del concurso (integer, requerido)
- Datos requeridos:
    - token: Token de autenticación (string)

#### Concursos de un usuario 
- URL: `/concursos/aficionado`
- Método: GET
- Datos requeridos:
    - token: Token de autenticación (string)

#### Mostrar perfil
- URL: `/perfil`
- Método: GET
- Datos requeridos:
    - token: Token de autenticación (string)

#### Modificar perfil
- URL: `/usuario/perfil/:id`
- Método: PUT
- Parámetros de ruta:
    - id: ID del usuario (integer, requerido)
- Datos requeridos:
    - token: Token de autenticación (string)

#### Cambiar contraseña
- URL: `/cambiar-password`
- Método: PUT
- Datos requeridos:
    - email: Email del usuario (string, requerido)
    - password: Nueva contraseña del usuario (string, requerido)
    - token: Token de autenticación (string)

#### Crear diploma de la actividad
- URL: `/diploma`
- Método: POST
- Datos requeridos:
    - token: Token de autenticación (string)

#### Crear y pedir diploma de actividad
- URL: `/diploma/enviar`
- Método: POST
- Datos requeridos:
    - token: Token de autenticación (string)


## RUTAS USUARIO

#### Login

- URL: `/login`
- Método: `POST`
- Datos requeridos: Ninguno

#### Registro

- URL: `/registro`
- Método: `POST`
- Datos requeridos:
  - `email`: Email del usuario (string, requerido)
  - `password`: Contraseña del usuario (string, requerido)
  - `nombre`: Nombre del usuario (string, requerido)
  - `apellido_uno`: Primer apellido del usuario (string, requerido)
  - `apellido_dos`: Segundo apellido del usuario (string, requerido)
  - `id_examen`: ID del examen (string, requerido)

#### Recuperar Contraseña

- URL: `/usuarios/recuperar`
- Método: `POST`
- Datos requeridos:
  - `email`: Email del usuario (string, requerido)

#### Buscar Usuario por Nombre

- URL: `/usuario/buscarNombre/:nombre`
- Método: `GET`
- Parámetros de ruta:
  - `nombre`: Nombre del usuario (string, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Buscar Usuario por Indicativo

- URL: `/usuario/buscarIndicativo/:id_examen`
- Método: `GET`
- Parámetros de ruta:
  - `id_examen`: ID del examen (string, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Alta Completa de Usuario

- URL: `/usuario/alta/:id_rol`
- Método: `POST`
- Parámetros de ruta:
  - `id_rol`: ID del rol (integer, requerido)
- Datos requeridos:
  - `nombre`: Nombre del usuario (string, requerido)
  - `email`: Email del usuario (string, requerido)
  - `apellido_uno`: Primer apellido del usuario (string, requerido)
  - `apellido_dos`: Segundo apellido del usuario (string, requerido)
  - `id_examen`: ID del examen (string, requerido)
  - `token`: Token de autenticación (string)

#### Baja de Usuarios

- URL: `/usuario/baja/:id`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID del usuario (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Modificar Usuarios

- URL: `/usuario/modificar/:id`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del usuario (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Asignar Rol

- URL: `/usuario/asignar/:id_rol/:id_usuario`
- Método: `POST`
- Parámetros de ruta:
  - `id_rol`: ID del rol (integer, requerido)
  - `id_usuario`: ID del usuario (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Ver un Usuario con Diploma

- URL: `/usuario/diploma/:email`
- Método: `GET`
- Parámetros de ruta:
  - `email`: Email del usuario (string, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Ver Usuarios con Diploma

- URL: `/usuarios/diploma`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Ver Usuarios

- URL: `/usuarios`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)

## RUTAS CONCURSOS

#### Mostrar Todos los Concursos

- URL: `/concursos`
- Método: `GET`
- Datos requeridos: Ninguno

#### Mostrar Todos los Concursos Terminados

- URL: `/concursos/terminados`
- Método: `GET`
- Datos requeridos: Ninguno

#### Mostrar Todos los Concursos Pendientes

- URL: `/concursos/pendientes`
- Método: `GET`
- Datos requeridos: Ninguno

#### Alta Concurso

- URL: `/concurso/alta`
- Método: `POST`
- Datos requeridos:
  - `nombre`: Nombre del concurso (string, requerido)
  - `descripcion`: Descripción del concurso (string, requerido)
  - `solucion`: Solución del concurso (string, requerido)
  - `token`: Token de autenticación (string)

#### Modificar Concurso

- URL: `/concurso/modificar/:id`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del concurso (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Baja Concurso

- URL: `/concurso/baja/:id`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID del concurso (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Terminar Concurso

- URL: `/concurso/terminar/:id`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del concurso (integer, requerido)

#### Mostrar Concurso por ID

- URL: `/concurso/buscarId/:id`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID del concurso (integer, requerido)

#### Mostrar Concurso por Nombre

- URL: `/concurso/buscarNombre/:nombre`
- Método: `GET`
- Parámetros de ruta:
  - `nombre`: Nombre del concurso (string, requerido)

#### Ver Actividades de un Concurso

- URL: `/concurso/actividades/:id_principal`
- Método: `GET`
- Parámetros de ruta:
  - `id_principal`: ID de la actividad principal (integer, requerido)

#### Ver Participantes de un Concurso

- URL: `/participantesConcurso/:id_principal`
- Método: `GET`
- Parámetros de ruta:
  - `id_principal`: ID de la actividad principal (integer, requerido)

## RUTAS ACTIVIDADES

#### Mostrar Todas las Actividades y sus Concursos

- URL: `/actividades`
- Método: `GET`
- Datos requeridos: Ninguno

#### Mostrar Todas las Actividades Terminadas

- URL: `/actividades/terminadas`
- Método: `GET`
- Datos requeridos: Ninguno

#### Mostrar Todas las Actividades Pendientes

- URL: `/actividades/pendientes`
- Método: `GET`
- Datos requeridos: Ninguno

#### Terminar Actividad

- URL: `/actividad/terminar/:id`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID de la actividad (integer, requerido)

#### Buscar Actividad por ID

- URL: `/actividad/buscarId/:id`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID de la actividad (integer, requerido)

#### Buscar Actividad por Nombre

- URL: `/actividad/buscarNombre/:nombre`
- Método: `GET`
- Parámetros de ruta:
  - `nombre`: Nombre de la actividad (string, requerido)

#### Ver Participantes de una Actividad

- URL: `/participantes/:id`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID de la actividad (integer, requerido)

#### Eliminar Actividad

- URL: `/actividad/baja/:id`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID de la actividad (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Modificar Actividad

- URL: `/actividad/modificar/:id`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID de la actividad (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Alta Actividad de un Único Contacto

- URL: `/actividad/alta/unicoContacto`
- Método: `POST`
- Datos requeridos:
  - `nombre`: Nombre de la actividad (string, requerido)
  - `localizacion`: Localización de la actividad (string, requerido)
  - `fecha`: Fecha de la actividad (string, requerido)
  - `frecuencia`: Frecuencia de la actividad (string, requerido)
  - `banda`: Banda de la actividad (string, requerido)
  - `id_modo`: Modo de la actividad (integer, requerido)
  - `id_modalidad`: Modalidad de la actividad (integer, requerido)
  - `token`: Token de autenticación (string)

#### Alta Actividad de Varios Contactos

- URL: `/actividad/alta/variosContactos`
- Método: `POST`
- Datos requeridos:
  - `nombre`: Nombre de la actividad (string, requerido)
  - `localizacion`: Localización de la actividad (string, requerido)
  - `fecha`: Fecha de la actividad (string, requerido)
  - `frecuencia`: Frecuencia de la actividad (string, requerido)
  - `banda`: Banda de la actividad (string, requerido)
  - `id_modo`: Modo de la actividad (integer, requerido)
  - `id_modalidad`: Modalidad de la actividad (integer, requerido)
  - `premio`: Premio de la actividad (string, requerido)
  - `id_principal`: ID del concurso principal (integer, requerido)
  - `token`: Token de autenticación (string)

#### Mostrar Modalidades

- URL: `/actividades/modalidades`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Mostrar Modos

- URL: `/actividades/modos`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)

## RUTAS REGISTRAR CONTACTO

#### Registrar Contacto

- URL: `/contacto/registrar`
- Método: `POST`
- Datos requeridos:
  - `id_usuario`: ID del usuario (integer, requerido)
  - `id_secundaria`: ID de la actividad secundaria (integer, requerido)
  - `id_principal`: ID de la actividad principal (integer, opcional)
  - `token`: Token de autenticación (string)

#### Listar Usuarios

- URL: `/contacto/usuarios`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Mostrar Todos los Contactos Detallados

- URL: `/contacto/contactos`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Listar Concursos

- URL: `/contacto/concursos`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Mostrar Solución Concurso

- URL: `/contacto/concurso/solucion/:id_principal`
- Método: `GET`
- Parámetros de ruta:
  - `id_principal`: ID de la actividad principal (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Mostrar Actividades que Pertenecen a un Concurso

- URL: `/contacto/concurso/actividades/:id_principal`
- Método: `GET`
- Parámetros de ruta:
  - `id_principal`: ID de la actividad principal (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Mostrar Premio de la Actividad

- URL: `/contacto/actividad/premio/:id_secundaria`
- Método: `GET`
- Parámetros de ruta:
  - `id_secundaria`: ID de la actividad secundaria (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Mostrar los Premios de un Usuario en un Concurso

- URL: `/contacto/usuario/premios/:id_usuario/:id_principal`
- Método: `GET`
- Parámetros de ruta:
  - `id_usuario`: ID del usuario (integer, requerido)
  - `id_principal`: ID de la actividad principal (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Mostrar Todas las Actividades

- URL: `/contacto/actividades`
- Método: `GET`
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Mostrar la Modalidad de la Actividad

- URL: `/contacto/actividad/modalidad/:id_secundaria`
- Método: `GET`
- Parámetros de ruta:
  - `id_secundaria`: ID de la actividad secundaria (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

## RUTAS INICIO

#### Mostrar Noticias

- URL: `/noticias`
- Método: `GET`
- Datos requeridos: Ninguno

#### Eliminar Noticias

- URL: `/noticia/eliminar/:id`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID de la noticia (integer, requerido)
- Datos requeridos:
  - `token`: Token de autenticación (string)

#### Modificar Noticias

- URL: `/noticia/modificar/:id`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID de la noticia (integer, requerido)
- Datos requeridos:
  - `nombre`: Nombre de la noticia (string, requerido)
  - `fecha`: Fecha de la noticia (date, requerido)
  - `descripcion`: Descripción de la noticia (string, requerido)
  - `token`: Token de autenticación (string)

#### Crear Noticias

- URL: `/noticia/crear`
- Método: `POST`
- Datos requeridos:
  - `nombre`: Nombre de la noticia (string, requerido)
  - `fecha`: Fecha de la noticia (date, requerido)
  - `descripcion`: Descripción de la noticia (string, requerido)
  - `token`: Token de autenticación (string)

#### Mostrar Administradores

- URL: `/administradores`
- Método: `GET`
- Datos requeridos: Ninguno

#### Mostrar Operadores

- URL: `/operadores`
- Método: `GET`
- Datos requeridos: Ninguno


