# 📝 To-Do App

Um aplicativo fullstack de tarefas simples, com autenticação de usuário, criação e conclusão de tarefas. Construído com:

- 🔧 **Backend**: Node.js, Express, Prisma, JWT
- 🎨 **Frontend**: Angular 17 (standalone), Angular Material
- 🛡️ Autenticação via token JWT
- 🌐 API documentada com Swagger

## 🚀 Como Rodar o Projeto

### 🔧 Pré-requisitos

- Node.js 18+
- Angular CLI 17+
- SQLite rodando localmente
- NPM instalado

## 🖥️ Backend

### 📍 Caminho: `/backend`

#### 1. Instale as dependências:

```bash
cd backend
npm install
```

#### 2. Configure o banco de dados:

```bash
DATABASE_URL="file:./dev.db"

JWT_SECRET=sua_chave_secreta (exemplo: U72jwZ$e!8n39kP@mfDbCzN6#rXsV4LtQhGdM0Av)
```

#### 3. Rode as migrations e o Prisma:

```bash
npx prisma migrate dev
```

#### 4. Inicie o servidor:

```bash
npm run dev
```

---

#### 🧪 Acesse a API em: http://localhost:3333

#### 📚 Documentação Swagger: http://localhost:3333/api/v1/docs
