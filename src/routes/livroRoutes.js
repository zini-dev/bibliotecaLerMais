const express = require("express");
const router = express.Router();
const {livroController} = require("../controllers/livroController")

router.get("/livros", livroController.listarLivro);

module.exports = {livroRoutes: router};