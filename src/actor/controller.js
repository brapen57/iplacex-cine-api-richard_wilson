import { ObjectId } from "mongodb";
import client from "../common/db.js";

// Constante para la colección de actores
const ActorCollection = client.db('cine').collection('actores');

// Función para insertar un nuevo actor
async function handleInsertActorRequest(req, res) {
    let data = req.body;
    let actor = {
        idPelicula: ObjectId.createFromHexString(data.idPelicula),
        nombre: data.nombre,
        edad: data.edad,
        estaRetirado: data.estaRetirado,
        premios: data.premios
    };

    // Validar que la película exista
    const peliculaExistente = await client.db('cine').collection('peliculas').findOne({ _id: actor.idPelicula });
    if (!peliculaExistente) {
        return res.status(400).send("Error: La película especificada no existe.");
    }

    await ActorCollection.insertOne(actor)
        .then((data) => {
            if (data === null) return res.status(400).send('Error al guardar el actor');
            return res.status(201).send(data);
        })
        .catch((e) => {
            return res.status(500).send({ error: e });
        });
}

// Función para obtener todos los actores
async function handleGetActoresRequest(req, res) {
    await ActorCollection.find({}).toArray()
        .then((data) => { return res.status(200).send(data); })
        .catch((e) => { return res.status(500).send({ error: e }); });
}

// Función para obtener un actor por su _id
async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id;

    try {
        let oid = ObjectId.createFromHexString(id);

        await ActorCollection.findOne({ _id: oid })
            .then((data) => {
                if (data === null) return res.status(404).send("Actor no encontrado");
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({ error: e.code });
            });

    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

// Función para obtener todos los actores asociados a una película por el idPelicula
async function handleGetActoresByPeliculaIdRequest(req, res) {
    let idPelicula = req.params.idPelicula;

    try {
        let oid = ObjectId.createFromHexString(idPelicula);

        await ActorCollection.find({ idPelicula: oid }).toArray()
            .then((data) => {
                if (data.length === 0) return res.status(404).send("No se encontraron actores para esta película");
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({ error: e });
            });

    } catch (e) {
        return res.status(400).send('Id de película mal formado');
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};
