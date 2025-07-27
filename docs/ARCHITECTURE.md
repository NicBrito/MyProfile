# MyProfile - Documento de Arquitetura

Este documento descreve as decisões de arquitetura e as tecnologias escolhidas para o projeto MyProfile.

## 1. Visão Geral

O objetivo é construir uma aplicação multiplataforma (Web, iOS, Android) de gerenciamento de perfis online. A arquitetura deve ser escalável, manutenível e permitir a rápida implementação de novas funcionalidades.

## 2. Escolha da Stack Tecnológica (Proposta Inicial)

A ser discutido e definido.

| Camada              | Tecnologia Proposta     | Justificativa                                                                                                                            |
| ------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Multiplataforma** | React Native            | Permite o desenvolvimento de apps para iOS e Android com uma única base de código em JavaScript/TypeScript. Atinge também a web com `react-native-web`. |
| **Backend** | Node.js com TypeScript  | Ecossistema robusto, alta performance para operações I/O (mensagens, feeds), e a utilização da mesma linguagem (TypeScript) no front e no back simplifica o desenvolvimento. |
| **Banco de Dados** | PostgreSQL              | Banco de dados relacional poderoso e confiável, excelente para dados estruturados como perfis de usuário, posts e relacionamentos.      |
| **API** | GraphQL                 | Permite que os clientes (apps) peçam exatamente os dados que precisam, otimizando o tráfego de rede e simplificando a evolução da API. |
| **Autenticação** | JWT (JSON Web Tokens)   | Padrão de mercado para autenticação em APIs, stateless e seguro.                                                                         |

## 3. Próximos Passos

- [ ] Detalhar o esquema do banco de dados (tabelas de usuários, perfis, publicações, etc.).
- [ ] Definir a estrutura de pastas do projeto (monorepo ou repositórios separados).
- [ ] Configurar o ambiente de desenvolvimento inicial.