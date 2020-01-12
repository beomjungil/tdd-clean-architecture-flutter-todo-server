import Express from 'express';
import initDB from './db';
import todoRouter from './routes/todo';

(async () => {
    initDB();
    const app = Express();
    const port = process.env.PORT || 3000;

    app.use(Express.urlencoded({ extended: true }));
    app.use(Express.json());

    app.use("/todo", todoRouter);

    app.listen(port, () => {
        console.log(`Server stared with ${port} port.`);
    });
})()