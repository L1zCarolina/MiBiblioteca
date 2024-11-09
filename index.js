// CONFIGURAR LO QUE SERIA UN SERVIDOR CON LAS MINIMAS PRESTACIONES PARA CORRER EXPRESS
// Que este escuchando y tengamos una ruta principal "/" en el proyecto

const express = require("express");
const app = express();

app.use(express.json());
// en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera poder utilizarlo
app.use(express.urlencoded({ extended: true }));

// Requerir los routers de todas las tablas
const autoresRouter = require('./routers/autores.router');
const categoriasRouter = require('./routers/categorias.router');
const citasRouter = require('./routers/citas.router');
const comentariosRouter = require('./routers/comentarios.router');
// const editorialesRouter = require('./routers/editoriales.router');
const etiquetasRouter = require('./routers/etiquetas.router');
const favoritosRouter = require('./routers/favoritos.router');
const generosRouter = require('./routers/generos.router');
const historialLecturaRouter = require('./routers/historial_lectura.router');
const librosEtiquetasRouter = require('./routers/libros_etiquetas.router');
//const librosListaRouter = require('./routers/libros_lista.router');
const librosRouter = require('./routers/libros.router');
// const notificacionesRouter = require('./routers/notificaciones.router');
// const reseñasRouter = require('./routers/reseñas.router');
const sagasRouter = require('./routers/sagas.router');
const usuariosRouter = require('./routers/usuarios.router');

// Middleware para interpretar JSON
app.use(express.json());

// Siempre definir los prefijos de las rutas
app.use('/autores', autoresRouter);
app.use('/categorias', categoriasRouter);
app.use('/citas', citasRouter);
app.use('/comentarios', comentariosRouter);
// app.use('/editoriales', editorialesRouter);
app.use('/etiquetas', etiquetasRouter);
app.use('/favoritos', favoritosRouter);
app.use('/generos', generosRouter);
app.use('/historial-lectura', historialLecturaRouter);
app.use('/libros-etiquetas', librosEtiquetasRouter);
//app.use('/libros-lista', librosListaRouter);
app.use('/libros', librosRouter);
//app.use('/notificaciones', notificacionesRouter);
//app.use('/reseñas', reseñasRouter);
app.use('/sagas', sagasRouter);
app.use('/usuarios', usuariosRouter);

app.get("/", (req, res) => {
    res.send("Bienvenido a la Biblioteca Personal");
});

// Esta es la ruta principal del proyecto "/"

const PORT = 3000; 
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));