const { clienteModel } = require("../models/clienteModel");

const clienteController = {
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
    }
}

module.exports = { clienteController }