const { sql, getConnection } = require("../config/db")

const clienteModel = {

/**
* Busca todos os clientes no banco de dados.
* 
* 
* @async
* @function buscarTodos
* @returns {Promise<Array>} Retorna uma lista com todos os clientes.
* @throws Mostra no console e propaga o erro caso a busca falhe.
*/
    buscarTodos: async () => {
        try {
            const pool = await getConnection(); // Estabelece a conexão com o DB

            const querySQL = `
                SELECT * FROM Clientes
            `;

            const result = await pool.request()
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar clientes", error);
            throw error;
        }
    },

/**
* Busca apenas um cliente no banco de dados.
* 
* @async
* @function buscarUm
* @param {string} idCliente - ID do cliente em UUID(ID Universal) no banco de dados.
* @returns {Promise<array>} - Retorna uma lista com um cliente caso encontre no banco de dados.
* @throws Mostra no console e propaga o erro caso a inserção falhe
*/
    buscarUm: async (idCliente) => {

        try {
            const pool = await getConnection();

            const querySQL = `
            SELECT * FROM CLientes
            WHERE idCliente = @idCliente
          `;

            const result = await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .query(querySQL)

            return result.recordset;

        } catch (error) {

            console.error("Erro ao buscar cliente", error);
            throw error;

        }

    },

    /**
     * Insere um novo cliente no banco de dados.
     * 
     * @async
     * @function inserirCliente
     * @param {string} nomeCliente - Nome do cliente a ser cadastrado
     * @param {number} emailCliente - Email do cliente a ser cadastrado
     * @param {number} senhaCliente - Senha do cliente a ser cadastrado
     * @returns {Promise<void>} - Não retorna nada, apenas executa a inserção
     * @throws Mostra no console e propaga o erro caso a inserção falhe
     */
    inserirCliente: async (nomeCliente, emailCliente, senhaCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
            INSERT INTO Clientes (nomeCliente, emailCliente, senhaCliente)
            VALUES (@nomeCliente, @emailCliente, @senhaCliente)
        `;

            await pool.request()
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("emailCliente", sql.VarChar(100), emailCliente)
                .input("senhaCliente", sql.VarChar(100), senhaCliente)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao inserir cliente:", error)
            throw error;
        }
    }
}

module.exports = { clienteModel };