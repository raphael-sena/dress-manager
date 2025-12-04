# Criar Item

POST: localhost:8080/itens  
JSON:
{
    "id": 1,
    "descricao": "Vestido de Seda 1",
    "modelo": "Vestido Longo",
    "quantidade": 3,
    "valorVenda": 4300,
    "valorAluguel": 1250
}

# Listar Itens
GET: localhost:8080/itens

# Atualizar Item
PUT: localhost:8080/itens/{id}  
JSON:
{
    "quantidade": 3,
    "valorVenda": 10000,
    "valorAluguel": 1000
}

# Deletar Item
DELETE: localhost:8080/itens/{id}





