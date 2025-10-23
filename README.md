# 🧠 String Analyzer Service — HNG Backend Wizards Stage 1

Welcome to my **HNG Stage 1 Backend Task**! 🚀  
This project implements a **String Analyzer RESTful API** built using **NestJS**, **PostgreSQL**, **TypeORM**, and **Docker**, powered by **pnpm**.

It analyzes strings, computes properties like palindrome status, word count, SHA256 hash, and stores them persistently.

---

## 🎯 Task Objective

For each analyzed string, the API should:
- Compute and store:
  - `length`
  - `is_palindrome`
  - `unique_characters`
  - `word_count`
  - `sha256_hash`
  - `character_frequency_map`
- Persist results in PostgreSQL
- Allow filtering and retrieval through multiple endpoints

---

## 🧱 Tech Stack

| Tool | Purpose |
|------|----------|
| **NestJS** | Backend Framework |
| **PostgreSQL** | Database |
| **TypeORM** | ORM (Object Relational Mapper) |
| **pnpm** | Package Manager |
| **Docker & Docker Compose** | Containerization |

---

## ⚙️ Endpoints Summary

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/strings` | Analyze & store a string |
| `GET` | `/strings/:string_value` | Get details of a specific string |
| `GET` | `/strings` | Get all strings (with filtering) |
| `GET` | `/strings/filter-by-natural-language` | Filter strings via natural language |
| `DELETE` | `/strings/:string_value` | Delete a stored string |

---

## 🧩 Features Implemented

✅ Compute all required string properties  
✅ Store analyzed strings in PostgreSQL  
✅ Prevent duplicate submissions via `sha256_hash`  
✅ Retrieve or delete specific strings  
✅ Apply filters via query params  
✅ Natural language query support  
✅ Fully containerized with Docker  
✅ Uses pnpm for efficient installs  

---

## 🔧 Setup Instructions

### 🪣 1. Clone Repository

```bash
git clone https://github.com/Ceeylla-Favv/string-analyzer.git
cd hng-stage1

---

### 📦 2. Create Environment File

Create a `.env` file in the root directory:

```bash
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=
PORT=
```

---

### 🐳 3. Run with Docker (Recommended)

> ⚠️ Make sure Docker Desktop or Docker Engine is running.

```bash
docker compose up --build
```

This will:

* Build your NestJS app with pnpm
* Spin up a PostgreSQL container
* Automatically run migrations

Your API will be available at 👉 `http://localhost:3000`

---

### 💻 4. Run Locally Without Docker (Optional)

If you prefer to run outside Docker:

```bash
pnpm install
pnpm run start:dev
```

Ensure PostgreSQL is running locally and update your `.env` with your local DB credentials.

---

## 🧪 Testing the API

### Example Request:

```bash
POST http://localhost:3000/strings
Content-Type: application/json

{
  "value": "madam"
}
```

### Example Response:

```json
{
  "id": "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
  "value": "madam",
  "properties": {
    "length": 5,
    "is_palindrome": true,
    "unique_characters": 3,
    "word_count": 1,
    "sha256_hash": "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
    "character_frequency_map": {
      "m": 2,
      "a": 2,
      "d": 1
    }
  },
  "created_at": "2025-10-22T10:00:00Z"
}
```

---

## 🧭 Query Filters Supported

| Filter               | Type    | Example |
| -------------------- | ------- | ------- |
| `is_palindrome`      | boolean | `true`  |
| `min_length`         | integer | `5`     |
| `max_length`         | integer | `20`    |
| `word_count`         | integer | `2`     |
| `contains_character` | string  | `a`     |

Example:

```
GET /strings?is_palindrome=true&min_length=3&contains_character=a
```

---

## 🧠 Natural Language Filtering

Endpoint:

```
GET /strings/filter-by-natural-language?query=all single word palindromic strings
```

Interprets:

```json
{
  "word_count": 1,
  "is_palindrome": true
}
```

---

## 🧰 Commands

| Command                     | Description                |
| --------------------------- | -------------------------- |
| `pnpm run start:dev`        | Start development server   |
| `pnpm run build`            | Build production-ready app |
| `pnpm run start:prod`       | Run production build       |
| `docker compose up --build` | Run in Docker              |
| `docker compose down`       | Stop containers            |
| `pnpm run lint`             | Lint codebase              |
| `pnpm run test`             | Run tests                  |
