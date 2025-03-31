# SAEP - SENAI

Este projeto tem como objetivo a construção de um sistema de gerenciamento de tarefas (Kanban) para o SENAI.

## Tecnologias Utilizadas

- **Backend:**
  - **Spring Boot**: Framework utilizado para criar a API RESTful.
  - **JPA / Hibernate**: Utilizado para mapear as entidades do banco de dados.
  - **MySQL**: Banco de dados relacional utilizado para persistência de dados.
  
- **Frontend:**
  - **React**: Biblioteca JavaScript para construção da interface de usuário.
  - **JavaScript**: Linguagem utilizada para implementação da lógica de interação no frontend.

## Funcionalidades

O SAEP implementa um sistema Kanban para gerenciamento de tarefas, onde é possível:

- Criar e editar tarefas.
- Atribuir responsáveis (usuários) para cada tarefa.
- Organizar as tarefas em diferentes colunas de status: *A Fazer*, *Fazendo* e *Pronto*.
- Visualizar todas as tarefas em uma interface interativa.

## Como Rodar o Projeto

### Backend (Spring Boot)
1. Clone o repositório:
   ```bash
   git clone [https://github.com/usuario/saep.git](https://github.com/MariaEDuarda005/saep)
   ```

2. Vá para a pasta do backend:
   ```bash
   cd kanban
   ```

3. A API estará rodando no endereço: `http://localhost:8080`.

### Frontend (React)
1. Vá para a pasta do frontend:
   ```bash
   cd front
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute a aplicação:
   ```bash
   npm start
   ```

4. O frontend estará acessível em: `http://localhost:3000`.
