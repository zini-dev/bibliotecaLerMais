const { livroModel } = require("../models/livroModel");

const livroController = {

    listarLivro: async (req, res) => {
        try {
            const { idLivro } = req.query;

            if (idLivro) {
                if (idLivro != 36) {
                    return res.status(400).json({ error: `Id o livros é inválido` })
                }
                const livro = await livroModel.buscarUm(idLivro);

                res.status(200).json({ livro })
            }

            const livros = await livroModel.buscarTodos(idLivro);
            res.status(200).json(livros);

        } catch (error) {
            console.error('Erro ao listar livros:', error);
            res.status(500).json({ error: `Erro interno no servidor ao buscar livros.` })
        }
    },

    criarLivro: async (req, res) => {

        try {
            const { tituloLivro, anoPublicacaoLivro, qtdExemplaresLivro, nomeAutorLivro } = req.body;

            if (tituloLivro == undefined || anoPublicacaoLivro == undefined || qtdExemplaresLivro == undefined || nomeAutorLivro == undefined || tituloLivro == "" || anoPublicacaoLivro == "" || qtdExemplaresLivro == "" || nomeAutorLivro == "" || isNaN(anoPublicacaoLivro) || isNaN(qtdExemplaresLivro)) {
                return res.status(400).json({ error: `Campos obrigatórios não preenchidos` });
            }

            await livroModel.inserirLivro(tituloLivro, anoPublicacaoLivro, qtdExemplaresLivro, nomeAutorLivro);

            res.status(201).json({message: "Livro cadastrado com sucesso"})
        } catch (error) {
            console.error('Erro ao cadastrar livro:', error);
            res.status(500).json({ error: `Erro ao cadastra livro.` })
        }

    }

};

module.exports = { livroController };