import cors from 'cors';
import express, { urlencoded } from 'express';

import client from './src/common/db.js';
import routes from './src/pelicula/routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.all('/', (req, res) => { 
    let message = 'Bienvenido al cine Iplacex!';
    return res.status(200).send(message);
});

app.use('/api', routes);

async function startServer() {
    try {
        await client.connect();
        console.log('Conectado a clúster');

        app.listen(PORT, () => { 
            console.log(`Servidor corriendo en el puerto ${PORT}`); 
        });
    } catch (e) {
        console.error('Error al conectar a la base de datos:', e);
    }
}

// Iniciar el servidor
startServer();

app.use('/api', routes);

