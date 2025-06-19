# Proyecto Node.js - API de Usuarios

## Descripción
API REST para gestionar usuarios con Node.js, Express y MySQL.

## Requisitos
- Node.js 20+
- MySQL
- npm

## Instalación

1. Clona el repositorio.

2. Instala las dependencias:

- npm install

3. Crea un archivo .env en la raíz con el siguiente contenido:

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=tu_password
- DB_NAME=tu_base_de_datos
- PORT=3000

- "Asegúrate de tener MySQL corriendo y la base de datos creada."

4. Ejecutar en desarrollo
- npm run dev

************************
- Rutas disponibles
GET /api/users/get - Obtener todos los usuarios

POST /api/users/add - Crear un usuario

PUT /api/users/edit/:id - Actualizar un usuario

DELETE /api/users/delete/:id - Eliminar un usuario
************************
