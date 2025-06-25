# 🏡 Library Management API

## 📌 Introduction

The **Library Management API** is a modern web API server that is built with the **Express.js, TypeScript, and Mongooes** that allows users to upload books, and borrow books.

## 📜 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)

---

## 🚀 Live Demo

🔗 **[Live Website URL](#)** ( "url")

---

## 🌟 Features

✅ Any user can deposit books for borrowing other users.
✅ Any user can borrow books until the book are available.
✅ User can create, get all/single, update and delete books.
✅ User can filter, sort and limit the books according their need.

### Features to be implemented:

    -**User account creation**: In future there will be system for creating account.
    -**Role-based access**: There will be role-based access where the access will be limited according the their role.
    -**Payment System**: There will be a donation system since this will be totally free for the book readers to borrow books.
    -**Personal info**: Under personal account user will be able to check their borrowed books,due date, and donation details.
    -**Notification**: User will get notification about the returing date before the due date.
    -**Security**: JWT will be used for securing the apis.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ODM:** Mongooes

---

## ⚙️ Installation

To set up the project locally, follow these steps:

1️⃣ **Clone the repository:**

```bash
git clone https://github.com/Md-Azad/library-managment-api
cd library-management-api

```

2️⃣ Install dependencies:

# Server-side

npm install
npm i ts-node-dev
**Add this line in the script in the package.json file**:
-"dev": "ts-node-dev --respawn --transpile-only src/server.ts",
3️⃣ Run the development servers:
npm run dev

## 📦 Dependencies

This project uses the following dependencies:  
 "cors"
"dotenv"
"express"
"mongoose"
**Dev dependencies**:
"@types/cors": "^2.8.19",
"@types/express": "^5.0.3",
"ts-node-dev": "^2.0.0"
