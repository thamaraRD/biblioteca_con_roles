# Biblioteca Virtual
Aplicación hecha en React/MERN para hacer un CRUD completo bajo el concepto de biblioteca virtual.
## Description
Esta es una aplicación web de información de libros que cuenta con dos roles: ***Administrador***, el cual es el encargado de hacer el registro de los libros a la base de datos,
pudiendo así modificar, crear y eliminar cualquier libro.

***Usuario***, puede observar a través de nuestra tabla la información del libro, como la portada, la cantidad de páginas que tiene, editorial y toda la información relevante que posee la base de datos,
el ***usuario*** también puede realizar comentarios al libro y ver los comentarios escritos por los distintos usuarios, de igual forma darle rating al libro y estos se van ordenando y mostrando de forma descendente según la valoración que posean.
## Installing
- Crear carpeta en donde quieres que esté el proyecto
- Debes clonar el repositorio y usar la version v16.13.0 de Node, puedes usar esta versión instalando un manejador de versiones NVM.
- Deberás crear dos variables de entorno, una `.env` en la carpeta matriz que contenga lo siguiente:
```
SECRET_KEY="la-llave-secreta-que-quieras"
LOCAL_DB_URL="mongodb://localhost/NOMBRE_BASE_DE_DATOS_QUE_QUIERAS"
PORT=NUMERO_DE_PUERTO_QUE_QUIERAS
```

- En la carpeta `client` una variable de entorno `.env.development` que contenta lo siguiente:
```
REACT_APP_API_URL=http://localhost:PORT/api
```
***Nota:*** El `PORT` que utilizarás en la carpeta `client` es el mismo que definiste en la variable `.env`
- En la carpeta Matriz y en la carperta `client` instala todas las dependencias usando
```
npm install
```
## Technologies
- **MongoDB**: Database
- **Express**: Server Framework
- **React**: Web Framework
- **Node**: Server Environment
## Authors
- [Juan Carlos Galué](https://github.com/juancgalueweb)
- [Thamara Ramos Deffitt](https://github.com/thamaraRD)
