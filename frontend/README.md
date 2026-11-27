# Bolos da Glaci · Frontend

App mobile de encomendas de bolos, feito com Ionic React, TypeScript e Capacitor (Android).
Fluxo do cliente: Home → Catálogo → Encomenda → Confirmação.
Fluxo da confeiteira: Login → Pedidos ⇄ Produtos.

O contrato com a API está em [`../API_CONTRACT.md`](../API_CONTRACT.md).

## Requisitos

- Node.js LTS e npm
- Android Studio (só para gerar e testar o app Android)

Todos os comandos abaixo rodam **dentro de `frontend/`**, nunca na raiz do repositório.

## Primeira execução

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
ionic serve
```

O app abre em `http://localhost:5173`. Para ver como no celular, use o modo responsivo do navegador (F12 → ícone de celular).

## Variáveis de ambiente (`.env.local`)

| Variável | Para que serve |
|---|---|
| `VITE_API_BASE_URL` | Endereço da API, por exemplo `http://localhost:3000/api` |
| `VITE_USE_MOCKS` | `true` usa dados falsos locais; `false` chama a API real |
| `VITE_CONTACT_PHONE` | Telefone exibido no rodapé |
| `VITE_SOCIAL_HANDLE` | Rede social exibida no rodapé |

- O `.env.local` não vai para o Git; o `.env.example` é o modelo versionado.
- Nunca coloque senhas ou chaves aqui: tudo que começa com `VITE_` fica visível no app.
- Depois de mudar o `.env.local`, reinicie o `ionic serve`.

## Modo mock

Com `VITE_USE_MOCKS=true`, o app funciona inteiro sem backend, com dados de `src/services/mocks/`.

- Login do admin: `admin@bolosdaglaci.com` / `admin123`
- Os dados vivem na memória: alterações somem ao atualizar a página (F5).
- O código de teste nos services fica entre os comentários `// ~~ mock` e `// ~~ fim`.

## Scripts

| Comando | O que faz |
|---|---|
| `ionic serve` ou `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Confere os tipos e gera a versão final em `dist/` |
| `npm run lint` | ESLint + Prettier (verificação) |
| `npm run lint:fix` | Corrige o que for automático |
| `npm run test:unit` | Testes unitários (Vitest) |
| `npm run test:e2e` | Testes de ponta a ponta (Playwright). Na primeira vez: `npx playwright install chromium` |

## Android

```powershell
npm run build
npx cap sync
npx cap open android
```

O Android Studio abre o projeto; rode num emulador ou celular conectado. Repita `build` e `sync` a cada mudança no código.

## Estrutura de `src/`

| Pasta | Conteúdo |
|---|---|
| `pages/` | Telas (cliente na raiz, confeiteira em `admin/`) |
| `components/` | Peças reutilizáveis (botões, cards, campos, estados de carregamento) |
| `hooks/` | Ligam as telas aos dados: carregando, erro e envio |
| `services/` | Chamadas à API (ou aos mocks) |
| `models/` | Tipos do contrato de dados |
| `config/` | Configuração, rotas, menus e **todos os textos da interface** (`labels.ts`) |
| `utils/` | Funções puras: datas, preços, validações, WhatsApp |
| `theme/` | Tokens de design (`variables.css`) |

Caminho de um dado: tela → hook → service → `httpClient` → API.

## Convenções

- Nomes de código em inglês; textos para o usuário em português, sempre em `config/labels.ts`.
- Componentes não usam cor, tamanho ou fonte soltos: só os tokens de `theme/variables.css`.
- Um `.css` por componente ou tela, com classes no padrão `bloco__elemento--variacao`.
- Caminhos de telas em `config/appRoutes.ts`; endereços da API em `config/apiRoutes.ts`.
- Antes de commitar: `npm run lint` e `npm run build` sem erros.

O fluxo de branches e commits do time está no README da raiz do repositório.
