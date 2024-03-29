## 1. COMANDOS UTILIZADOS
- Crea el package.json e ``inicializa el proyecto``
```bash
npm init -y 
```
- Instalación de la librería ``express``
```bash
npm install express
```
- Instalación global de ``nodemon``, para que se reinicie el servidor cada vez que se haga un cambio
```bash
npm install -g nodemon 
npm install --save-dev nodemon 
```
- Instalación de la librería dotenv, para crear el archivo ``.env``
```bash
npm install dotenv --save 
```
-  Instalación de todas las dependencias del package.json y la carpeta ``node_modules``
``` bash
npm install 
```
- Instalación de la librería cors, para evitar problemas de ``CORS``
```bash
npm install cors
```
- Instalación de la librería ``mysql2``, para trabajar con la base de datos
```bash
npm install mysql2 
```
- Instalación de la librería ``bcrypt``, para encriptar contraseñas
```bash
npm install bcrypt 
```
- Instalación de la librería ``validator``, para validar campos en las rutas
```bash
npm install validator
npm install express-validator
```
- Instalación de la librería ``jsonwebtoken``, para generar tokens
```bash
npm install jsonwebtoken 
```
- Instalación de la librería ``faker``, para generar datos falsos
```bash
npm i @faker-js/faker 
```
- Instalación de la librería ``sequelize``, para trabajar con la base de datos
```bash
npm install --save sequelize 
npm install sequelize sqlite3 
```
- Para instalar las dependecias de ``migrations``
```bash
npm install --save-dev sequelize-cli

```
- Instalación de ``sequelize-cli``, para trabajar con la base de datos
```bash
npx sequelize-cli init 
```
- Crear ``modelos``
```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string 
```
- Crear y migrar``tablas``
```bash
npx sequelize-cli db:migrate 
npx sequelize-cli db:migrate --to 20240121203206-create-roles.js
npx sequelize-cli db:migrate --to 20240116185326-create-user.js  
npx sequelize-cli db:migrate --to 20240121203217-create-rol-asignado.js
npx sequelize-cli db:migrate --to 20240121203253-create-tarea.js  
npx sequelize-cli db:migrate --to 20240121203310-create-tarea-asignada.js
```
- Hacer un rollback de las ``tablas``
```bash
npx sequelize-cli db:migrate:undo 
```
- Crear ``seeders``
```bash
npx sequelize-cli seed:generate --name userSeeder
npx sequelize-cli seed:generate --name rolSeeder
npx sequelize-cli seed:generate --name rolAsigSeeder
npx sequelize-cli seed:generate --name tareaSeeder
npx sequelize-cli seed:generate --name tareaAsigSeeder
```
- Introducir datos en las ``tablas``
```bash
npx sequelize-cli db:seed --seed 20240121203409-rolSeeder.js
npx sequelize-cli db:seed --seed 20240121203400-userSeeder.js 
npx sequelize-cli db:seed --seed 20240121203419-rolAsigSeeder.js
npx sequelize-cli db:seed --seed 20240121203428-tareaSeeder.js
npx sequelize-cli db:seed --seed 20240121203435-tareaAsigSeeder.js
```
---