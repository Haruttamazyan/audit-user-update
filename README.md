
# 🚀 User Management App

This project provides both a **CLI** and an **API** to manage users using PostgreSQL and Node.js.

---

## 🛠️ How to Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
```

> Make sure to update your `.env` file with the correct database URL and any other environment variables.

### 3. Run Database Schema

```bash
npm run db:run
```

> This will run the SQL schema file to create the necessary tables.

---

## ▶️ Run the App

### 4.1 Run via CLI

```bash
node update-user.js <userId> '<jsonData>' <adminId>
```

- Example:
  ```bash
  node update-user.js 1 '{"phone":"37477304035","email":"new@example.com"}' 99
  ```

### 4.2 Run via API Server

```bash
npm start
```

---

## 🌐 API Endpoints

### Get All Users

```http
GET http://localhost:3000/users
```

### Update a User

```http
PATCH http://localhost:3000/user/:userId/:adminId
```

**Request Body:**

```json
{
  "phone": "37477304035",
  "email": "new@example.com"
}
```

---

## 📦 Stack

- Node.js
- Express
- PostgreSQL
- `pg` for DB connection

---

