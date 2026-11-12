# Bolos da Glaci

App mobile para divulgação e encomenda de bolos artesanais, com área administrativa para a confeiteira.
Projeto Integrador – Sistema Mobile (Unisinos).

## Equipe
- Bárbara Mór da Mata: Front-end (Ionic + React)
- Igor Haag Rodrigues: UI/UX (Figma)
- Tainná Andryelli Ribeiro: Back-end (Node.js + Express)

## Estrutura
- `frontend/`: app Ionic React
- `backend/`: API Node.js

## Como rodar o front-end
Pré-requisitos: Node.js LTS e Git.

```bash
cd frontend
npm install
ionic serve
```

Se não tiver o Ionic CLI: `npm install -g @ionic/cli`.

## Fluxo de trabalho (Git)
- `main`: versão estável
- `dev`: integração
- Funcionalidades em branches `feat/nome` criadas a partir da `dev`
- Commits com prefixo: `feat:`, `fix:`, `chore:`