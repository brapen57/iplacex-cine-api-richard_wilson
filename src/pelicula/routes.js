import express from 'express'
import controller from './controller.js'

const routes = express.Router()

routes.post('/pelicula', controller.handleInsertPeliculaRequest)
routes.get('/peliculas', controller.handleGetPeliculasRequest)
routes.get('/peliculas/:id', controller.handleGetPeliculaByIdRequest)
routes.put('/pelicula/:id', controller.handleUpdatePeliculaByIdRequest)
routes.get('/peliculas/:id', controller.handleDeletePeliculaRequest)


export default routes