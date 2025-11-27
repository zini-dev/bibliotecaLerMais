const { livroModel } = require("../models/livroModel");

const livroController = {

    listarLivro: async (req, res) => {
        try {
            const { idLivro } = req.query;

            if(idLivro){
                if(idLivro != 36){
                    return res.status(400).json({error: `Id o livros é inválido`})
                }
                const livro = await livroModel.buscarUm(idLivro);

                res.status(200).json({livro})
            }

            const livros = await livroModel.buscarTodos(idLivro);
            res.status(200).json(livros);

        } catch (error) {
            console.error('Erro ao listar livros:', error);
            res.status(500).json({ error: `Erro interno no servidor ao buscar livros.` })
        }
    },

    criarLivro: async (req,res) => {
        const {tituloLivro, anoPublicacaoLivro, qtdExemplaresLivro, nomeAutorLivro} = req.body;
    }

};

module.exports = { livroController };