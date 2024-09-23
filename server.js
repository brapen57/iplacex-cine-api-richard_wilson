import cors from 'cors';
import express, { urlencoded } from 'express';

import client from './src/common/db.js';
import routes from './src/pelicula/routes.js';

const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.all('/', (req, res) => { 
    let message = 'Bienvenido al cine Iplacex!'

    return res.status(200).send(message)
})

app.use('/api', routes)

await client.connect()
.then(() => {
    console.log('Conectado a clúster')

    app.listen(PORT, () =>{ 
        console.log(`Servidor corriendo en http://localhost:${PORT}`) 
    })
})
.catch((e) => { console.log(e) })

app.use('/api',routes)


