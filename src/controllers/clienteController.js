const { pool } = require("mssql");
const { clienteModel } = require("../models/clienteModel");

const clienteController = {

    /**
    * Controlador que lista todos os clientes do banco de dados
    * 
    * 
    * @async
    * @function listarClientes
    * @param {object} req - Objeto da requisição (recebido do cliente HTTP)
    * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
    * 
    * @returns {Promise<void>} Retorna uma resposta JSON com a lista de livros
    * 
    * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os livros.
    */
    listarClientes: async (req, res) => {
        try {
            const { idCliente } = req.query;

            if (idCliente) {
                if (idCliente != 36) {
                    return res.status(400).json({ error: `Id do Cliente é inválido` });
                }
                const cliente = await clienteModel.buscarUm(idCliente);
                res.status(200).json(cliente);
            }

            const clientes = await clienteModel.buscarTodos(idCliente);

            res.status(200).json(clientes)

        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({ error: `Erro interno no servidor ao buscar clientes.` })
        }
    },

    /**
* Controlador que cria um novo cliente no banco de dados
* 
* @async
* @function criarCliente
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
* "nomeCliente": "Guilherme 111",
* "emailCliente": "guilhermerosazini@gmail.com",
* "qtdExemplaresLivro": 598,
* "senhaCliente": "senha123@"
* }
*/
    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, emailCliente, senhaCliente } = req.body;

            if (nomeCliente == undefined || emailCliente == undefined || senhaCliente == undefined || nomeCliente == "" || emailCliente == "" || senhaCliente == "") {
                return res.status(400).json({ error: `Campos obrigatórios não preenchidos` })
            }

            await clienteModel.inserirCliente(nomeCliente, emailCliente, senhaCliente)

            res.status(201).json({ message: "Cliente cadastrado com sucesso" })

        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            res.status(500).json({ error: `Erro ao cadastrar cliente.` })
        }
    }
}

module.exports = { clienteController }