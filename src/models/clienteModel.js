const { sql, getConnection } = require("../config/db")

const clienteModel = {

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

    buscarUm: async (idCliente) => {

        try {
            const pool = await getConnection();

            const querySQL = `
            SELECT * FROM CLientes
            WHERE idCliente = @idCliente
          `;

            const result = await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)

            return result.recordset;

        } catch (error) {

            console.error("Erro ao buscar cliente", error);
            throw error;

        }

    }
}

module.exports = { clienteModel };