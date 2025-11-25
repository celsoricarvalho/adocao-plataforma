📘 Plataforma de Adoção de Animais – README

Uma plataforma completa para adoção de animais, construída com:

Frontend: Next.js (React + TypeScript + App Router + Tailwind)

Backend: NestJS + TypeORM

Banco: MySQL

Autenticação: JWT

Funcionalidades: listagem de animais, reservas, visitas, área do usuário e painel administrativo.

<br>
🚀 1. Tecnologias
Frontend

Next.js 14 (App Router)

React 18

Tailwind CSS

Axios

Backend

NestJS

TypeORM

JWT

Class-validator / Class-transformer

Banco de Dados

MySQL 5.7+ ou MySQL 8

<br>
📦 2. Instalação do Projeto

Clone o repositório:

git clone https://github.com/SEU_USUARIO/adocao-plataforma.git
cd adocao-plataforma

<br>
🐶 3. Configurando o Backend (NestJS)

Acesse a pasta:

cd backend
npm install

3.1. Configure o MySQL

Crie o banco:

CREATE DATABASE adocao;


Edite o arquivo src/app.module.ts com suas credenciais:

TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'senha',
  database: 'adocao',
  autoLoadEntities: true,
  synchronize: true
})


⚠️ Em produção, use synchronize: false e migrações.

3.2. Rodando o backend
npm run start:dev


Servidor ativo em:

👉 http://localhost:3000

<br>
🌐 4. Configurando o Frontend (Next.js)

Acesse:

cd ../frontend
npm install

4.1. Rodando o frontend
npm run dev


Aplicação disponível em:

👉 http://localhost:3001

<br>
🔑 5. Criando o primeiro usuário ADMIN

Como o painel administrativo exige role = 'ADMIN', você deve criar um usuário normal e depois atualizar no MySQL:

Vá em http://localhost:3001/auth/register

Faça o cadastro

No MySQL, execute:

UPDATE users SET role = 'ADMIN' WHERE email = 'seuemail@teste.com';


Agora você pode acessar:

👉 http://localhost:3001/admin/animals

<br>
🐾 6. Funcionalidades Principais
✔ Visitante (sem login)

Ver lista de animais

Ver detalhes de cada animal

✔ Usuário logado

Criar reservas

Criar agendamentos de visita

Ver painel com:

Minhas reservas

Meus agendamentos

✔ Administrador (role = ADMIN)
Painel admin:

/admin/animals

Listar animais

Cadastrar novos

Editar

Excluir

Todos os endpoints admin são protegidos por JWT + Roles Guard.

<br>
📁 7. Estrutura do Projeto
adocao-plataforma/
│
├── backend/                     # API NestJS
│   ├── src/
│   │   ├── animals/             # CRUD de animais
│   │   ├── users/               # Usuários + perfil
│   │   ├── auth/                # Login, register, JWT
│   │   ├── reservations/        # Reservas
│   │   ├── appointments/        # Visitas
│   │   └── main.ts              # App bootstrap
│   │
│   └── package.json
│
├── frontend/                    # Next.js (App Router)
│   ├── app/
│   │   ├── animals/             # Listagem pública
│   │   ├── admin/               # Painel admin
│   │   ├── dashboard/           # Área do usuário
│   │   ├── auth/                # Login / Cadastro
│   │   ├── globals.css
│   │   └── layout.tsx
│   └── package.json
│
└── README.md

<br>
🧪 8. Testando o sistema
Animais (backend):

GET /animals

POST /animals (ADMIN)

PATCH /animals/:id (ADMIN)

DELETE /animals/:id (ADMIN)

Reservas:

POST /reservations

GET /reservations/me

Visitas:

POST /appointments

GET /appointments/me

Use uma ferramenta como Insomnia, Postman, ou o próprio frontend.

<br>
📸 9. Upload de imagens

Atualmente, o cadastro de animais recebe URLs.
Você pode usar:

Imgur

Cloudinary

Bucket S3 da AWS

Arquivos locais usando /public/uploads


<br>
