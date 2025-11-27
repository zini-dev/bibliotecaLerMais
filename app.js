const express = require("express");
const app = express();
const PORT = 8081;
const {clienteRoutes} = require("./src/routes/clienteRoutes");
const {livroRoutes} = require("./src/routes/livroRoutes");

app.use(express.json()); // MIDDLEWARE

app.use('/', clienteRoutes);
app.use('/', livroRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor da biblioteca Ler Mais está rodando em http://localhost:${PORT}`)
});