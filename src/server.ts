import Express from 'express';

const app = Express();
const port = process.env.PORT || 3000;

app.use("*", (req, res) =>{res.send("<h1>Testing server</h1>")})

app.listen(port, () => {
    console.log(`Server stared with ${port} port.`);
});