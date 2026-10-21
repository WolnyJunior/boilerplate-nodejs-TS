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
npm run dev
```

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