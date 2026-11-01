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
- `npm run db:seed` | Popula o banco (admin inicial e usuarios de exemplo)
- `npm run db:seed:undo` | Remove do dados criados pelos seeders
- `npm run db:seed:create -- nome` | Cria um novo seeder

## Variáveis de ambiente
|    Variável          |      Descrição                      |   Padrão       |
|    --------          | -----------------                   |   -------      |
| `PORT`               | Porta do Servidor                   | `3000`         |
| `DB_HOST`            | Host do PostgreSQL                  | `localhost`    |
| `DB_PORT`            | Porta do PostgreSQL                 | `5432`         |
| `DB_NAME`            | Nome do banco                       | obrigatória    |
| `DB_USER`            | Usuário do banco                    | obrigatória    |
| `DB_PASSWORD`        | Senha do banco                      | obrigatória    |
| `JWT_SECRET`         | Chave do Token JWT                  | obrigatória    |
| `JWT_EXPIRES_IN`     | Validade do Token                   | `1d`           |
| `SEED_ADMIN_EMAIL`   | E-mail do admin, criado pelo seeder | Só para o seed |
| `SEED_ADMIN_PASSWORD`| Senha do admin(min 8 caracteres)    | Só para o seed |

Para gerar uma `JWT_SECRET`
``` bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Endpoints
| Método |    Rota        |          Descrição            |
| ------ | -------------- |          ---------            |
|  GET   | `/health`      | Verifica se a API está no ar  |
|  POST  | `/usuarios`    | Cadastra novo usuário         |
|  POST  | `/login`       | Autentica e retorna token JWT |
|  GET   | `/usuarios/me` | Dados do usuário logado       |
|  GET   | `/usuarios`    | Lista de usuários             |
| DELETE | `/usuarios/:id`| Remove um usuário pelo id     |

## Tratamento de erros
Erros esperados são lançados em `AppError(mensagem, statusCode)` e o middleware `errorHandler` responde sempre em JSON:
```
json
{ "error": "Rota não encontrada" }
```
Rotas inexistentes retornam `404` e erros inesperados retornam `500`

## Autenticação
O login devolve um JWT. Nas rotas protegidas, envie-o no cabeçalho:
```
- `auth`: valida o token e identifica o usuário(`401` se ausente ou inválido)
- `isAdmin`: deve vir depois do `auth` e restringe a rota a administradores(`403` se não for `admin`)
```
O perfil fica gravado dentro do token, então, uma mudança de perfil só vale a partir do novo login.

### Primeiro `admin`
O Cadastro sempre cria com perfil `usuário`. Para criar o primeiro admin, cadastre o usuário e promova-o direto no banco de dados:
```bash
npm run db:seed
```
O comando também cria 5 usuários de exemplo (senha = `12345678`), que **NÃO rodam em produção
```bash
npx sequelize-cli db:seed --seed <arquivo-admin-inicial>.js
```
Os seeder podem se executados mais de uma vez sem duplicar registros.

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