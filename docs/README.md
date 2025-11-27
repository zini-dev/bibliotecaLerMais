## API Reference

### Clientes

#### GET /clientes
- **Descrição**: Obtém uma lista de clientes
- **Response**: Array de clientes
- **Parameters**: Busca um unico cliente pelo idCliente
```
/clientes?idCliente=123
```
- **Error Response (400)**: Caso o id não esteja em formato UUID
```
{ 
    erro: "Id do cliente inválido!" 
}
```

#### POST /clientes
- **Descrição**: Cria um novo cliente
- **Body**:
```
{
	"nomeCliente": "Guilherme Zini",
	"emailCliente": "guilherme@gmail.com",
	"senhaCliente": "senha123"
}
```
- **Response**:
```
{
    "mensagem": "Cliente cadastrado com sucesso!"
}
```
- **Error Response (400)**: Caso os campos obrigatórios não estejam preenchidos:
```
{ 
    erro: "Campos Obrigatórios Não preenchidos" 
}
```

### Livros

#### GET /livros
- **Descrição**: Obtém uma lista de livros
- **Response**: Array de livros
- **Parameters**: Busca um unico livro pelo idLivro
```
/livros?idLivro=123
```
- **Error Response (400)**: Caso o id não esteja em formato UUID
```
{ 
    erro: "Id do livro inválido!" 
}
```

#### POST /livros
- **Descrição**: Cria um novo livro
- **Body**:
```
{
	"tituloLivro": "Titulo de um Livro",
	"anoPublicacaoLivro": 2000,
	"qtdExemplaresLivro": 1000,
	"nomeAutorLivro": "Autor C."
}
```
- **Response**:
```
{
    "mensagem": "Livro cadastrado com sucesso!"
}
```
- **Error Response (400)**: Caso os campos obrigatórios não estejam preenchidos:
```
{ 
    erro: "Campos Obrigatórios Não preenchidos" 
}
```