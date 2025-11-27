const { sql, getConnection } = require("../config/db")

const livroModel = {
    buscarTodos: async () => {

        try {
            const pool = await getConnection();

            const querySQL = `
            SELECT * FROM Livros
        `;

            const result = await pool.request()
                .query(querySQL);

            return result.recordset;
        } catch (error) {

            console.error("Erro ao buscar livros", error);
            throw error;
        }

    },

    buscarUm: async (idLivro) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                SELECT * FROM Livros
                WHERE idLivro=@idLivro
            `;

            const result = await pool.request()
                .input("idLivro", sql.UniqueIdentifier, idLivro)

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar livro", error);
            throw error;
        }
    }
};

module.exports = { livroModel };
