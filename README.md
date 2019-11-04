# Teste Backend Appmoove

## Autor: Dennis Felipe Urtubia

### Tecnologias utilizadas:
    - Docker: utiliza Docker Compose para conteinerização do banco de dados (MySQL);
    - Express: servidor HTTP;
    - Knex: querybuilder para SQL;
    - Celebrate e Joi: validação dos campos das requisições funcionando como Middleware das rotas;
    - Jest e Supertest: teste das rotas;
    - Eslint: linter configurado no padrão airbnb;

### Como executar:
1. Faça o clone do projeto:
    ```bash
        $ git clone https://github.com/dennisurtubia/teste_backend_appmoove.git
    ```
2. Inicie o Banco de Dados MySQL utilizando o Docker Compose: 
    -   OBS: foi utilizado uma interface gráfica (MySQL Workbench).
    ```bash
        $ docker-compose -f docker-compose.yml up 
    ```   

3. Abra o diretório do projeto e instale as dependências com:
    ```bash
        $ cd teste_backend_appmoove
        $ yarn
    ```
4. Para iniciar o servidor em modo de desevolvimento execute:
    ```bash
        $ yarn dev 
    ```

### Testes:
    Os testes foram implementados com base em cada uma das funções na qual esta API apresenta. Foram testados casos de SUCESSO e ERRO.
    - O supertest provê uma ótima abstração para testes em rotas HTTP.
    - As configurações de teste são encontradas no arquivo "jest.config.js".

- Para executar os testes basta executar o comando:
 ```bash
    $ yarn test 
```

### Validações
    As validações dos campos das requisições foram implementadas com base no SQL fornecido (tipo, requerido).
    Em forma de Middleware, caso ocorra um erro de validação, é retornado uma mensagem.
    Cada dominio da aplicação possui um respectivo arquivo de validações encontrado em /src/validations.
    O middleware que caputra o erro e retorna o mesmo se encontra em /src/middlewares/validations.js.