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

Crie um arquivo .env na raiz da pasta backend com as variáveis:

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

## 🖥️ Frontend

### 📍 Caminho: `/front-end/app-todo`

#### 1. Instale as dependências:

```bash
cd front-end/app-todo
npm install
```

#### 2. Inicie a aplicação Angular:

```bash
ng serve -o
```

Este comando irá automaticamente abrir o app no navegador, mas caso não aconteça:

🖼️ Acesse o app em: http://localhost:4200

## Desafio proposto

### Pergunta: E se você precisar disponibilizar essa aplicação na AWS? Descreva brevemente como o faria.

### Resposta:

Encapsularia tanto o backend quanto o frontend em containers Docker. Subiria esses containers para um repositório no Amazon ECR. Em seguida, utilizaria o Amazon ECS (com Fargate) para orquestrar os containers. Para o banco de dados, usaria o Amazon RDS com PostgreSQL. Para o frontend, poderia usar também o Amazon S3 + CloudFront, se optasse por servir a aplicação como um app estático. Toda a infraestrutura seria gerenciada com Terraform pois assim teriamos um controle maior de toda a infraestrutura.
