# Bank Management System

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
    - [Contributing](#contributing)
    - [License](#license)
    - [Acknowledgments](#acknowledgments)

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

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

Prisma Studio
Use Prisma Studio to interactively explore your database:

bash
Copy code
npx prisma studio
Running the Project
Start the project:

bash
Copy code
npm start
The project will be running on http://localhost:3000.

API Endpoints
/customers: Customer-related APIs.
/bank-accounts: Bank account-related APIs.
/loans: Loan-related APIs.
/transactions: Transaction-related APIs.
Refer to the Swagger documentation or explore the ./docs directory for detailed information on each endpoint.

Swagger Documentation
Access the Swagger documentation for detailed information about the APIs:

Swagger Documentation

Contributing
Feel free to contribute to this project. Check the Contributing Guidelines for more details.

License
This project is licensed under the MIT License.

Acknowledgments
The Prisma team for providing a powerful ORM solution.
The Swagger team for simplifying API documentation.