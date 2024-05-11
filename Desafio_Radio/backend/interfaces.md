- POST
- http://localhost:9090/api/login
- Body:
```json
{
  "email": "ppp@correo.com",
  "password": "contraseña123"
}
```
- Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo2NCwibm9tYnJlIjoiUGF0cmljaWEiLCJlbWFpbCI6InBwcEBjb3JyZW8uY29tIiwiYXBlbGxpZG9fdW5vIjoiTW90YSIsImFwZWxsaWRvX2RvcyI6IkppbWVuZXoiLCJwYXNzd29yZCI6IiQyYiQxMCRzdkRsMDBMMjc1SzRUV3FBdW9zNjJlVTVQeXdJWUF5MlpOb1ZSWUMxbjNtZFdiVndIc3N6VyIsInVybF9mb3RvIjoiaHR0cDovL2VqZW1wbG8uY29tL2ZvdG8uanBnIiwiaWRfZXhhbWVuIjoiMTIzIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMTBUMTY6MTc6NDYuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA1LTEwVDE2OjE3OjQ2LjAwMFoiLCJkZWxldGVkX2F0IjpudWxsLCJyb2xlcyI6W3siaWQiOjMsIm5vbWJyZSI6ImFmaWNpb25hZG8iLCJSb2xBc2lnbmFkbyI6eyJpZF9yb2wiOjMsImlkX3VzdWFyaW8iOjY0fX1dfSwiaWF0IjoxNzE1MzU4MjQxLCJleHAiOjMzMjQxNDAwNjQxfQ.x6NNctCvXKa_u9Vc0hp7M76oc9eT_WNCZNklb-iITx4",
  "usuario": {
    "id": 64,
    "nombre": "Patricia",
    "email": "ppp@correo.com",
    "apellido_uno": "Mota",
    "apellido_dos": "Jimenez",
    "password": "$2b$10$svDl00L275K4TWqAuos62eU5PywIYAy2ZNoVRYC1n3mdWbVwHsszW",
    "url_foto": "http://ejemplo.com/foto.jpg",
    "id_examen": "123",
    "created_at": "2024-05-10T16:17:46.000Z",
    "updated_at": "2024-05-10T16:17:46.000Z",
    "deleted_at": null,
    "roles": [
      {
        "id": 3,
        "nombre": "aficionado",
        "RolAsignado": {
          "id_rol": 3,
          "id_usuario": 64
        }
      }
    ]
  }
}
```
- POST 
- http://localhost:9090/api/registro
- Body:
```json
{
  "email": "ppp@correo.com",
  "password": "contraseña123",
  "nombre": "Patricia",
  "apellido_uno": "Mota",
  "apellido_dos": "Jimenez",
  "url_foto": "http://ejemplo.com/foto.jpg",
  "id_examen": "123"
}
```
- Respuesta:
```json
{
  "message": "Registro exitoso",
  "data": {
    "id": 64,
    "email": "ppp@correo.com",
    "password": "$2b$10$svDl00L275K4TWqAuos62eU5PywIYAy2ZNoVRYC1n3mdWbVwHsszW",
    "nombre": "Patricia",
    "apellido_uno": "Mota",
    "apellido_dos": "Jimenez",
    "url_foto": "http://ejemplo.com/foto.jpg",
    "id_examen": "123",
    "updated_at": "2024-05-10T16:17:46.855Z",
    "created_at": "2024-05-10T16:17:46.855Z"
  }
}
```
