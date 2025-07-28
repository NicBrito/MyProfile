# MyProfile - Esquema do Banco de Dados

Este documento descreve a estrutura do banco de dados PostgreSQL para a aplicação MyProfile.

## 1. Convenções

-   Nomes de tabelas e colunas são em `snake_case` (ex: `created_at`).
-   Tabelas são nomeadas no plural (ex: `users`, `profiles`).
-   Chaves primárias são do tipo `UUID` e nomeadas `id`.
-   Timestamps de criação e atualização (`created_at`, `updated_at`) são usados em todas as tabelas principais.

## 2. Tabelas

### 2.1. Tabela `users`

Armazena as informações de autenticação e os dados essenciais do usuário.

| Coluna        | Tipo          | Restrições                               | Descrição                                                          |
| :------------ | :------------ | :--------------------------------------- | :----------------------------------------------------------------- |
| `id`          | `UUID`        | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Identificador único universal para o usuário.                      |
| `email`       | `VARCHAR(255)`| `UNIQUE`, `NOT NULL`                     | E-mail do usuário, usado para login.                               |
| `password_hash` | `VARCHAR(255)`| `NOT NULL`                               | Hash da senha do usuário (nunca armazenar a senha em texto plano). |
| `created_at`  | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`              | Data e hora de quando o usuário foi criado.                        |
| `updated_at`  | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`              | Data e hora da última atualização do registro do usuário.          |

### 2.2. Tabela `profiles`

Armazena os dados públicos do perfil de um usuário. Cada perfil está ligado a um único usuário.

| Coluna        | Tipo          | Restrições                               | Descrição                                                          |
| :------------ | :------------ | :--------------------------------------- | :----------------------------------------------------------------- |
| `id`          | `UUID`        | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Identificador único do perfil.                                     |
| `user_id`     | `UUID`        | `UNIQUE`, `NOT NULL`, `FOREIGN KEY (users.id)` | Chave estrangeira que liga o perfil ao seu respectivo usuário.   |
| `username`    | `VARCHAR(30)` | `UNIQUE`, `NOT NULL`                     | Nome de usuário público e único (ex: @nicolas).                    |
| `display_name`| `VARCHAR(50)` |                                          | Nome de exibição do usuário (ex: Nicolas Brito).                   |
| `bio`         | `TEXT`        |                                          | Uma pequena biografia ou descrição do usuário.                     |
| `avatar_url`  | `TEXT`        |                                          | URL para a imagem de perfil do usuário.                            |
| `created_at`  | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`              | Data e hora de quando o perfil foi criado.                         |
| `updated_at`  | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`              | Data e hora da última atualização do perfil.                       |