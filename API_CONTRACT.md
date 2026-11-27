# Contrato da API · Bolos da Glaci

Conexão entre o app (`frontend/`) e a API (`backend/`).

## Convenções gerais

| Item | Regra |
|---|---|
| URL base | `http://localhost:3000/api` em desenvolvimento (no app: `VITE_API_BASE_URL`) |
| Formato | JSON (`Content-Type: application/json`), exceto upload de produto (multipart) |
| Datas | Data: `"2026-12-10"`. Data e hora: ISO 8601 em UTC, `"2026-11-20T10:30:00Z"`. Horário: `"14:00"` |
| Preços | Número em reais, com até 2 casas: `90`, `120.5` |
| Ids | Texto (`string`) |
| Autenticação | Rotas `/admin/*` exigem `Authorization: Bearer <token>` (JWT) |
| CORS | Liberar `http://localhost:5173` (navegador) e `https://localhost` (Android/Capacitor) |

### Erros

Todo erro responde com o corpo abaixo. A `message` é exibida direto ao usuário, em português.

```json
{ "message": "E-mail ou senha incorretos." }
```

| Status | Quando |
|---|---|
| 400 | Dados inválidos (campo faltando, data fora da regra, etc.) |
| 401 | Sem token, token inválido ou expirado; login com credenciais erradas |
| 404 | Recurso não encontrado (ou bolo oculto numa rota pública) |
| 500 | Erro inesperado (mensagem genérica, sem detalhes técnicos) |

## Tipos

```ts
interface CakeCategory { id: string; name: string }
interface CakeSize { id: string; name: string; description: string; sortOrder: number } // "M", "Médio (20cm)"
interface CakeSizePrice { sizeId: string; price: number }

interface Cake {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;  
  categoryId: string;
  isPublished: boolean;      // visível no catálogo
  isFeatured: boolean;       // aparece em "Destaques da Semana"
  sizePrices: CakeSizePrice[]; // um preço para cada tamanho
}

type OrderStatus = 'new' | 'in_production' | 'ready' | 'delivered' | 'cancelled';

interface Customer { name: string; phone: string; email: string }

interface Order {
  id: string;
  orderNumber: number;       
  status: OrderStatus;
  cakeId: string;
  sizeId: string;
  cakeName: string;          // cópia no momento do pedido
  sizeName: string;          /
  price: number;             // cópia no momento do pedido
  deliveryDate: string;      // "2026-12-10"
  preferredTime: string | null; // "14:00"
  customerNotes: string;
  internalNotes: string;
  customer: Customer;
  createdAt: string;         // ISO em UTC
}

interface Paginated<T> { items: T[]; page: number; pageSize: number; totalItems: number }

interface AuthSession { token: string; user: { id: string; name: string; email: string } }
```

## Rotas públicas (cliente)

| Método | Rota | Envia | Resposta |
|---|---|---|---|
| GET | `/cakes?search=&category=&sort=` | Todos opcionais | 200 `Cake[]` (só publicados) |
| GET | `/cakes/:id` | — | 200 `Cake`; 404 se não existe ou está oculto |
| GET | `/sizes` | — | 200 `CakeSize[]`, ordenado por `sortOrder` |
| GET | `/categories` | — | 200 `CakeCategory[]` |
| POST | `/orders` | `CreateOrderInput` | 201 `Order` |

**Parâmetros do catálogo**

- `search`: busca no nome, sem diferenciar maiúsculas, ignorando espaços nas pontas.
- `category`: id da categoria.
- `sort`: `popular` (destaques primeiro), `price_asc` (menor preço entre os tamanhos), `newest` (mais recentes).

**Corpo do `POST /orders`**

```json
{
  "cakeId": "cake-1",
  "sizeId": "size-m",
  "deliveryDate": "2026-12-10",
  "preferredTime": "14:00",
  "customerNotes": "Escrever Feliz Aniversário",
  "customer": { "name": "Maria Silva", "phone": "(51) 9 9999-9999", "email": "maria@email.com" },
  "hasAcceptedPrivacyTerms": true
}
```

Regras validadas no servidor (400 se falhar):

- `cakeId` de um bolo publicado e `sizeId` existente.
- `deliveryDate` com pelo menos **2 dias** de antecedência.
- `customer.name`, `customer.phone` (10 ou 11 dígitos) e `customer.email` (formato válido) obrigatórios.
- `hasAcceptedPrivacyTerms` igual a `true` (LGPD). Guardar a data do aceite.

O servidor define: `id`, `orderNumber` (próximo da sequência), `status: "new"`, `cakeName`, `sizeName`, `price`, `internalNotes: ""` e `createdAt`.

## Autenticação

| Método | Rota | Envia | Resposta |
|---|---|---|---|
| POST | `/auth/login` | `{ "email", "password" }` | 200 `AuthSession`; 401 `{ "message": "E-mail ou senha incorretos." }` |

Senhas guardadas com hash (bcrypt). Só existe o papel de admin; cliente não tem conta.

## Rotas do admin (exigem token)

### Pedidos

| Método | Rota | Envia | Resposta |
|---|---|---|---|
| GET | `/admin/orders?status=` | `status` opcional | 200 `Order[]`, mais recentes primeiro |
| GET | `/admin/orders/:id` | — | 200 `Order` |
| PATCH | `/admin/orders/:id` | `{ "status", "internalNotes" }` | 200 `Order` |

O app não bloqueia transições de status. Se houver alguma regra (por exemplo, não reabrir pedido cancelado), ela fica no servidor.

### Produtos

| Método | Rota | Envia | Resposta |
|---|---|---|---|
| GET | `/admin/cakes?search=&category=&page=` | Todos opcionais; `page` começa em 1 | 200 `Paginated<Cake>` (inclui ocultos) |
| GET | `/admin/cakes/:id` | — | 200 `Cake` (inclui ocultos) |
| POST | `/admin/cakes` | multipart (abaixo) | 201 `Cake` |
| PUT | `/admin/cakes/:id` | multipart (abaixo) | 200 `Cake` |
| PATCH | `/admin/cakes/:id/visibility` | `{ "isPublished": true }` | 200 `Cake` |
| DELETE | `/admin/cakes/:id` | — | 204, sem corpo |

- `pageSize` é definido pelo servidor (sugestão: 10). O app calcula o número de páginas.
- Bolo com pedidos não deve sumir do histórico: os pedidos guardam cópia de nome e preço.

**Multipart do produto (`POST` e `PUT`)**

| Campo | Conteúdo |
|---|---|
| `data` | Texto JSON: `{ "name", "description", "categoryId", "isPublished", "isFeatured", "sizePrices": [{ "sizeId", "price" }] }` |
| `image` | Arquivo de imagem, opcional, até **5 MB**. No `PUT`, sem `image` mantém a imagem atual |

Regras: nome, descrição e categoria obrigatórios; um preço maior que zero para **cada** tamanho cadastrado.
