const request = require('supertest');
const express = require('express');
const routes = require('../routes/usuarioRoutes');

const app = express();
app.use(express.json());
app.use('/', routes);

/// ------------- TESTEO DE RUTAS NOTICIAS -------------

describe('Pruebas de solicitud GET', () => {
  it('GET /noticias debería retornar un código 200', async () => {
    const response = await request(app).get('/noticias');
    expect(response.statusCode).toBe(200);
  });
});

describe('Pruebas de solicitud POST', () => {
  it('POST /noticia/crear debería retornar un código 200', async () => {
    const nuevaNoticia = {
      nombre: "Noticia de prueba",
      fecha: new Date(),
      descripcion: "Esta es una noticia de prueba"
    }
    const response = await request(app).post('/noticia/crear').send(nuevaNoticia);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Noticia insertada');
    expect(response.body.data).toContainEqual(nuevaNoticia);
  });
});


describe('Pruebas de solicitud PUT', () => {
  it('PUT /noticia/modificar/:id debería retornar un código 200', async () => {
    const noticiaActualizada = {
      nombre: "Noticia de prueba",
      fecha: new Date(),
      descripcion: "Esta es una noticia de prueba"
    }
    const response = await request(app).put('/noticia/modificar/1').send(noticiaActualizada);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Noticia modificada');
    expect(response.body.data).toContainEqual(noticiaActualizada);
  });
});

describe('Pruebas de solicitud DELETE', () => {
  it('DELETE /noticia/eliminar/:id debería retornar un código 200', async () => {
    const response = await request(app).delete('/noticia/eliminar/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Noticia eliminada');
  });
});


