# 🧾 Order Tracking and Inventory System API

## 🚀 Features

- 🔐 Authentication with **JWT (access & refresh tokens)**
- 🗃️ MongoDB with Mongoose ODM
- 👤 Support for local and future OAuth logins
- 🏷️ Category and Product entities 
- 📦 Full CRUD for Category and Products
- ✅ Middleware-based auth (with global typing for `req.user`)
- ✅ Server side pagination support
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

tests/                    # Test cases folder
├── unit/                 # Unit test cases folder (Will add E2E and Integration in the future)
    ├── usecases/         # Unit tests for business logic (use case layer); tests the core application logic in isolation from frameworks or databases.
```

## 🛠️ Tech Stack

| Layer      | Tech                                      |
| ---------- | ----------------------------------------- |
| Runtime    | Node.js + TypeScript                      |
| Framework  | Express                                   |
| Database   | MongoDB (with Mongoose ODM)               |
| Auth       | JWT (access & refresh tokens)             |
| Validation | considering Yup for now                   |
| Deployment | Railway (with GitHub Actions CI/CD)       |
| Dev Tools  | ts-node, nodemon, yarn (v4), dotenv, jest |

---

## 🧪 API Endpoints

### 🧑 Auth

- `POST ${baseURI}/auth/register`
- `POST ${baseURI}/auth/login`

### 🏷️ Categories

- `GET ${baseURI}/categories` - List all categories
- `GET ${baseURI}/categories/{id}` - Get by ID
- `POST ${baseURI}/categories` - Create
- `PUT ${baseURI}/categories/{id}` - Update
- `DELETE ${baseURI}/categories/{id}` - Delete

### 📦 Products

- `GET ${baseURI}/product` - List all products
- `GET ${baseURI}/product/{id}` - Get by ID
- `GET ${baseURI}/category/{id}` - Get by category ID
- `POST ${baseURI}/product` - Create
- `PUT ${baseURI}/product/{id}` - Update
- `DELETE ${baseURI}/product/{id}` - Delete

All category and product endpoints require a valid token.

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
```
