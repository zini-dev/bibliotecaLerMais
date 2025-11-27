const express = require("express");
const router = express.Router();
const {livroController} = require("../controllers/livroController")

router.get("/livros", livroController.listarLivro);
router.post("/livros", livroController.criarLivro);

module.exports = {livroRoutes: router};