const { livroModel } = require("../models/livroModel");

const livroController = {

    /**
    * Controlador que lista todos os livros do banco de dados
    * 
    * 
    * @async
    * @function listarLivro
    * @param {object} req - Objeto da requisição (recebido do cliente HTTP)
    * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
    * 
    * @returns {Promise<void>} Retorna uma resposta JSON com a lista de livros
    * 
    * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os livros.
    */
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

    /**
    * Controlador que cria um novo livro no banco de dados
    * 
    * @async
    * @function criarLivro
    * @param {object} req - Objeto da requisição (recebido do cliente HTTP)
    * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
    * @returns {Promise<void>} Retorna uma mensagem de sucesso ou erro em formato JSON
    * @throws {400} Se algum campo obrigatório não for preenchido corretamente.
    * @throws {500} Se ocorrer qualquer erro interno no servidor.
    * 
    * @example
    * POST /produtos
    * BODY
    * {
    * 
    * "tituloLivro": "Clean code",
    * "anoPublicacaoLivro": 2009,
    * "qtdExemplaresLivro": 598,
    * "nomeAutorLivro": "Robert C. Martin"
    * }
    */
    criarLivro: async (req, res) => {

        try {
            const { tituloLivro, anoPublicacaoLivro, qtdExemplaresLivro, nomeAutorLivro } = req.body;

            if (tituloLivro == undefined || anoPublicacaoLivro == undefined || qtdExemplaresLivro == undefined || nomeAutorLivro == undefined || tituloLivro == "" || anoPublicacaoLivro == "" || qtdExemplaresLivro == "" || nomeAutorLivro == "" || isNaN(anoPublicacaoLivro) || isNaN(qtdExemplaresLivro)) {
                return res.status(400).json({ error: `Campos obrigatórios não preenchidos` });
            }

            await livroModel.inserirLivro(tituloLivro, anoPublicacaoLivro, qtdExemplaresLivro, nomeAutorLivro);

            res.status(201).json({ message: "Livro cadastrado com sucesso" })
        } catch (error) {
            console.error('Erro ao cadastrar livro:', error);
            res.status(500).json({ error: `Erro ao cadastra livro.` })
        }

    }

};

module.exports = { livroController };