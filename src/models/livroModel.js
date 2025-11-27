const { sql, getConnection } = require("../config/db")

const livroModel = {

    /**
   * Busca todos os livros no banco de dados.
   * 
   * 
   * @async
   * @function buscarTodos
   * @returns {Promise<Array>} Retorna uma lista com todos os livros.
   * @throws Mostra no console e propaga o erro caso a busca falhe.
   */
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

    /**
    * Busca apenas um livro no banco de dados.
    * 
    * @async
    * @function buscarUm
    * @param {string} idLivro - ID do livro em UUID(ID Universal) no banco de dados.
    * @returns {Promise<array>} - Retorna uma lista com um livro caso encontre no banco de dados.
    * @throws Mostra no console e propaga o erro caso a inserção falhe
    */
    buscarUm: async (idLivro) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                SELECT * FROM Livros
                WHERE idLivro=@idLivro
            `;

            const result = await pool.request()
                .input("idLivro", sql.UniqueIdentifier, idLivro)
                .query(querySQL)

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar livro", error);
            throw error;
        }
    },

    /**
    * Insere um novo livro no banco de dados.
    * 
    * @async
    * @function inserirLivro
    * @param {string} tituloLivro - Título do livro a ser cadastrado
    * @param {number} anoPublicacaoLivro - Ano de publicação do livro a ser cadastrado
    * @param {number} qtdExemplaresLivro - Quantidade de exemplares do livro a ser cadastrado
    * @param {string} nomeAutorLivro - Nome do autor do livro a ser cadastrado
    * @returns {Promise<void>} - Não retorna nada, apenas executa a inserção
    * @throws Mostra no console e propaga o erro caso a inserção falhe
    */
    inserirLivro: async (tituloLivro, anoPublicacaoLivro, qtdExemplaresLivro, nomeAutorLivro) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Livros (tituloLivro, anoPublicacaoLivro, qtdExemplaresLivro, nomeAutorLivro)
                VALUES (@tituloLivro, @anoPublicacaoLivro, @qtdExemplaresLivro, @nomeAutorLivro)
            `;

            await pool.request()
                .input("tituloLivro", sql.VarChar(100), tituloLivro)
                .input("anoPublicacaoLivro", sql.Int, anoPublicacaoLivro)
                .input("qtdExemplaresLivro", sql.Int, qtdExemplaresLivro)
                .input("nomeAutorLivro", sql.VarChar(100), nomeAutorLivro)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao inserir livro:", error);
            throw error;
        }
    }
};

module.exports = { livroModel };
