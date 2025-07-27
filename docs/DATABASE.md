# MyProfile - Esquema do Banco de Dados

Este documento descreve a estrutura do banco de dados PostgreSQL para a aplicação MyProfile.

## 1. Convenções

-   Nomes de tabelas e colunas são em `snake_case` (ex: `created_at`).
-   Tabelas são nomeadas no plural (ex: `users`).
-   Chaves primárias são do tipo `UUID` e nomeadas `id`.
-   Timestamps de criação e atualização (`created_at`, `updated_at`) são usados em todas as tabelas principais.

## 2. Tabelas

### 2.1. Tabela `users`

Armazena as informações de autenticação e os dados essenciais do usuário. É o ponto de partida para tudo.

| Coluna        | Tipo          | Restrições                               | Descrição                                                          |
| :------------ | :------------ | :--------------------------------------- | :----------------------------------------------------------------- |
| `id`          | `UUID`        | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Identificador único universal para o usuário.                      |
| `email`       | `VARCHAR(255)`| `UNIQUE`, `NOT NULL`                     | E-mail do usuário, usado para login.                               |
| `password_hash` | `VARCHAR(255)`| `NOT NULL`                               | Hash da senha do usuário (nunca armazenar a senha em texto plano). |
| `created_at`  | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`              | Data e hora de quando o usuário foi criado.                        |
| `updated_at`  | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`              | Data e hora da última atualização do registro do usuário.          |

---
*Este é um design inicial. As tabelas `profiles` e `posts` serão detalhadas a seguir.*