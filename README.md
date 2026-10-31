# Boilerplate Node.js + TypeScript
Base para projetos backend com Express, Sequelize e PostgreSQL

## Requisitos
- Node.js 20+
- Git

## Como iniciar
```bash
git clone <https://github.com/WolnyJunior/boilerplate-nodejs-TS.git>
cd boilerplate-nodejs-ts
npm install
# copie o arquivo de acordo com seu Sistema Operacional
copy .env.example .env # Para Windows.
cp .env.example .env   # Para Linux/Mac: 
npm run dev
```
A API sobe em `http://localhost:3000`

## Variáveis de ambiente
| Variável |     Descrição     | Padrão |
|  ------  | ----------------- | ------ |
|  `PORT`  | Porta do Servidor | `3000` |

## Endpoints
| Método |    Rota   |          Descrição           |
| ------ | --------- |          ---------           |
|  GET   | `/health` | Verifica se a API está no ar |

## Scripts
- `npm run dev` | Roda em desenvolvimento(reinicia ao salvar)
- `npm run build` | Compila o TypeScript para `dist/`
- `npm start` | Roda o código compilado

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