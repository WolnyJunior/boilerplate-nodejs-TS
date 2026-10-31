# Boilerplate Node.js + TypeScript
Base para projetos backend com Express, Sequelize e PostgreSQL

## Requisitos
- Node.js 20+
- Git
- PostgreSQL

## Como iniciar
```bash
git clone <https://github.com/WolnyJunior/boilerplate-nodejs-TS.git>
cd boilerplate-nodejs-ts
npm install
# copie o arquivo de acordo com seu Sistema Operacional
copy .env.example .env # Para Windows.
cp .env.example .env   # Para Linux/Mac:
```
1. Edite o `.env` com os dados do seu banco.
2. Crie o banco no PostgreSQL: `CREATE DATABASE boilerplate_db`
3. Rode as migrations e inicie:
``` bash
npm run db:migrate
npm run dev
```
A API sobe em `http://localhost:3000`

## Scripts
- `npm run dev` | Roda em desenvolvimento(reinicia ao salvar)
- `npm run build` | Compila o TypeScript para `dist/`
- `npm start` | Roda o código compilado
- `npm run db:migrate` | Executa as migrations pendentes
- `npm run db:migrate:undo` | Desfaz a última migration
- `npm run db:migration:create --nome` | Cria nova migration

## Variáveis de ambiente
|    Variável   |      Descrição      |   Padrão    |
|    --------   | -----------------   |   -------   |
| `PORT`        | Porta do Servidor   | `3000`      |
| `DB_HOST`     | Host do PostgreSQL  | `localhost` |
| `DB_PORT`     | Porta do PostgreSQL | `5432`      |
| `DB_NAME`     | Nome do banco       | obrigatória |
| `DB_USER`     | Usuário do banco    | obrigatória |
| `DB_PASSWORD` | Senha do banco      | obrigatória |


## Endpoints
| Método |    Rota   |          Descrição           |
| ------ | --------- |          ---------           |
|  GET   | `/health` | Verifica se a API está no ar |

## Tratamento de erros
Erros esperados são lançados em `AppError(mensagem, statusCode)` e o middleware `errorHandler` responde sempre em JSON:
```
json
{ "error": "Rota não encontrada" }
```
Rotas inexistentes retornam `404` e erros inesperados retornam `500`

## Banco de dados
O projeto usa Sequelize com PostgreSQL. As alterações no banco são feitas por migrations
(`src/database/migrations`, em javaScript por exigência do `sequelize-cli`)
e os models ficam em `src/models`(TypeScript).
Para alterar uma tabela, crie uma nova migration: não edite uma já executada.

## Estrutura de pastas
- `src/controllers`: recebem a requisição e devolvem a resposta
- `src/services`: regras de negócio
- `src/models`: modelos do banco (Sequelize)
- `src/routes`: ligam URLs aos controllers
- `src/middleware`: autenticação, tratamento de erros etc.
- `src/config`: configurações (banco, ambiente)
- `src/database/migrations`: histórico de alterações do banco
- `src/utils`: funções auxiliares
- `src/main.ts`: inicia servidor
- `src/app.td`: configura o Express(JSON e rotas)