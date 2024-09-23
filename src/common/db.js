import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb+srv://ev3_express:jnpsskg40eqIbJdf@cluster-express.qsa0d.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true&appName=cluster-express'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,  
        strict: true,
        deprecationErrors: true
    }
});

export default client;