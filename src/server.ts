import Express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongoServer = new MongoMemoryServer();
mongoose.Promise = Promise;

(async () => {
    const dburi = await mongoServer.getUri();
    const dbPort = await mongoServer.getPort();
    const dbPath = await mongoServer.getDbPath();
    const dbName = await mongoServer.getDbName();

    const app = Express();
    const port = process.env.PORT || 3000;

    const mongooseOpts = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(dburi, mongooseOpts);

    mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
            console.log(e);
            mongoose.connect(dburi, mongooseOpts);
        }
        console.log(e);
    });

    mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${dburi}`);
    });

    app.use("*", (req, res) => { res.send("<h1>Testing server</h1>") })

    app.listen(port, () => {
        console.log(`Server stared with ${port} port.`);
    });
})()