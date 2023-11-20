# Bank API Prototype

The Bank Account Backend is an API-based project that provides functionalities for managing customers, bank accounts, loans, and transactions. The project uses PostgreSQL as the database, Prisma as the ORM (Object-Relational Mapping), and Swagger for API documentation.

## Table of Contents

- [Bank Management System](#bank-management-system)
    - [Table of Contents](#table-of-contents)
    - [Introduction](#introduction)
    - [Features](#features)
    - [Tech Stack](#tech-stack)
    - [Getting Started](#getting-started)
        - [Prerequisites](#prerequisites)
        - [Installation](#installation)
    - [Database Setup](#database-setup)
        - [Prisma Migration](#prisma-migration)
        - [Prisma Studio](#prisma-studio)
    - [Running the Project](#running-the-project)
    - [API Endpoints](#api-endpoints)
    - [Swagger Documentation](#swagger-documentation)
    - [CI/CD](#cicd)

## Introduction

The Bank Management System is designed to handle various aspects of a banking system, including customer management, bank accounts, loans, and transactions. This project provides a set of APIs to interact with these entities, making it a comprehensive solution for basic banking operations.

## Features

- Customer Management: Add, retrieve, update, and delete customer information.
- Bank Account Operations: Create bank accounts, get account details, and perform transactions.
- Loan Management: Apply for loans, get loan details, and pay back loans.
- Transaction Handling: Track transactions for each bank account.

## Tech Stack

- PostgreSQL: Database management system.
- Prisma: ORM (Object-Relational Mapping) for database interactions.
- Swagger: API documentation tool.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- PostgreSQL: [Download and Install PostgreSQL](https://www.postgresql.org/download/)
- Prisma: [Install Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-postgres)
- Prisma Studio: [Install Prisma Studio](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/using-postgres)
- Swagger: [Install Swagger](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sgdesh/bank-api.git

2. Install the depenedencies:

   ```bash
   npm install

3. Create a .env file in the root directory and add the following environment variables:

   ```bash
   DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database-name>?schema=public"
   PORT=3000
   ```
    Replace the values with your database credentials.
4. Run the project:

   ```bash
   npm run dev
   
## Database Setup
### Prisma Migration
Run the following command to create the database tables:
1. Create a migration:

   ```bash
   npx prisma migrate dev --name init

2. Run the migration:

   ```bash
    npx prisma migrate dev

The project will be running on http://localhost:3000.
3. Generate Prisma Client:

   ```bash
   npx prisma generate
   
4. Access Prisma Studio:

   ```bash
   npx prisma studio

### API Endpoints
- /customers: Customer-related APIs.
- /bank-accounts: Bank account-related APIs.
- /loans: Loan-related APIs.
- /transactions: Transaction-related APIs.
Refer to the Swagger documentation or explore the ./docs directory for detailed information on each endpoint.

### API Documentation
Access the Swagger documentation for detailed information about the APIs:
-  [Swagger UI](http://localhost:3000/api-docs)

### CI/CD