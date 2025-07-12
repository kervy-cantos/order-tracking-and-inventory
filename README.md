# 🧾 Order Tracking and Inventory System API


## 🚀 Features

- 🔐 Authentication with **JWT (access & refresh tokens)**
- 🗃️ MongoDB with Mongoose ODM
- 👤 Support for local and future OAuth logins
- 🏷️ Category and Product entities (modular domain-driven design)
- 📦 Full CRUD for Category (extendable to Products and Orders)
- ✅ Middleware-based auth (with global typing for `req.user`)
- ⚙️ CI/CD using **GitHub Actions** and **Railway**

## 📁 Project Structure
```
src/
├── domain/               # Core entities and repository interfaces
├── usecases/             # Business logic (e.g. loginUser, registerUser, addCategory)
├── frameworks/           # External tools & framework implementations
│   ├── express/          # Express app, route wiring, server config
│   ├── mongoose/         # Mongoose models and MongoDB repository implementations
│   └── jwt/              # JWT logic (signing, verifying, etc.)
├── interfaces/
│   └── http/             # HTTP Layer (entry point for requests)
│       ├── controllers/  # Route handlers (calls use cases)
│       ├── helpers/      # Helper functions (e.g. response formatters, sanitizers)
│       ├── dto/          # Data Transfer Objects (request validation schemas)
│       ├── middlewares/  # Express middlewares (e.g. auth, error handling)
│       ├── routes/       # Route definitions and mounting
│       └── types/        # HTTP-specific TypeScript types
├── types/                # Global TypeScript types and extensions (e.g. Express `Request`)
└── index.ts              # Application bootstrap (DB connection, server start)
```

## 🛠️ Tech Stack

| Layer          | Tech                                       |
|----------------|--------------------------------------------|
| Runtime        | Node.js + TypeScript                       |
| Framework      | Express                                    |
| Database       | MongoDB (with Mongoose ODM)                |
| Auth           | JWT (access & refresh tokens)              |
| Validation     | considering Yup for now                    |
| Deployment     | Railway (with GitHub Actions CI/CD)        |
| Dev Tools      | ts-node, nodemon, yarn (v4), dotenv        |

---

## 🧪 API Endpoints

### 🧑 Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### 🏷️ Categories
- `GET /api/category/all` - List all categories
- `GET /api/category/{id}` - Get by ID
- `POST /api/category` - Create
- `PUT /api/category/{id}` - Update 
- `DELETE /api/category/:id` - Delete

All category endpoints require a valid token.

---

## 🔐 Authentication

JWT-based access and refresh tokens:

- Access token (`exp: 1d`)
- Refresh token (`exp: 7d`)

## 🧰 Setup

### Prerequisites
- Node.js 18+
- Yarn 4+ (`corepack enable`)
- MongoDB URI

### Run locally

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev
