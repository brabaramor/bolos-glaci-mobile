# Bolos da Glaci

App mobile para divulgação e encomenda de bolos artesanais, com área administrativa para a confeiteira.
Projeto Integrador – Sistema Mobile (Unisinos).

## Equipe
- Bárbara Mór da Mata: Front-end (Ionic + React)
- Igor Haag Rodrigues: UI/UX (Figma)
- Tainná Andryelli Ribeiro: Back-end (Node.js + Express)

## Estrutura
- `frontend/`: app Ionic React (mais detalhes em [`frontend/README.md`](frontend/README.md))
- `backend/`: API Node.js (TypeScript, Prisma e PostgreSQL)
- `API_CONTRACT.md`: contrato entre o app e a API

## Como rodar o front-end
Pré-requisitos: Node.js 22 ou superior e Git.

```bash
cd frontend
npm install
cp .env.example .env.local   # no PowerShell: Copy-Item .env.example .env.local
ionic serve
```

Com `VITE_USE_MOCKS=true` (padrão do `.env.example`), o app roda sem back-end.
Se não tiver o Ionic CLI: `npm install -g @ionic/cli`.

## Como preparar o banco do back-end
Pré-requisitos: Node.js 22 ou superior e PostgreSQL.

```bash
cd backend
npm install
cp .env.example .env   # editar a senha na DATABASE_URL
npx prisma migrate deploy
npx prisma generate
```

O servidor da API ainda não foi implementado.

## Fluxo de trabalho (Git)
- `main`: versão estável
- `dev`: branch de desenvolvimento
- Funcionalidades em branches `feat/nome` (ou `fix/`, `chore/`, `docs/`) criadas a partir da `dev`
- Pull requests sempre para a `dev`
- Commits com prefixo: `feat:`, `fix:`, `chore:`, `docs:`
