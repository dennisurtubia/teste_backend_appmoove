# Teste Backend Appmoove

## Autor: Dennis Felipe Urtubia

### Tecnologias utilizadas:
    - Docker: Utiliza docker compose para conteinerização do banco de dados (MySQL);
    - Express: Servidor HTTP;
    - Knex: Querybuilder para SQL;
    - Axios: Requisição para a validação do cartão de crédito; 
    - Celebrate e Joi: Validação dos campos das requisições funcionando como Middleware das rotas;
    - Jest e Supertest: Teste das rotas;
    - Eslint: Linter configurado no padrão airbnb;

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
    - O supertest provê uma ótima abstração para testes HTTP.
    - As configurações de teste são encontradas no arquivo "jest.config.js".

- Para executar os testes basta executar o comando:
 ```bash
    $ yarn test 
```