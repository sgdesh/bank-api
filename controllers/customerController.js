// customerController.js
const express = require('express');


const { PrismaClient, PrismaClientKnownRequestError } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();


// Create a new customer
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber } = req.body;
        const isMobileNumberValid = /^\d{10}$/.test(mobileNumber);

        if (!isMobileNumberValid) {
            return res.status(400).json({ error: 'Invalid mobile number format. It should be a 10-digit numeric value.' });
        }

        const customer = await prisma.customer.create({
            data: {
                firstName,
                lastName,
                email,
                mobileNumber,
            },
        });
        res.json(customer);
    } catch (error) {
        console.error(error);

        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
            // Unique constraint violation
            return res.status(409).json({ error: 'Email address or mobile number already exists' });
        }

        res.status(500).send('Internal Server Error');
    }
});

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await prisma.customer.findMany();
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Get a customer by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await prisma.customer.findUnique({
            where: { id },
        });
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Update a customer by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, mobileNumber } = req.body;
        const updatedCustomer = await prisma.customer.update({
            where: { id },
            data: {
                firstName,
                lastName,
                email,
                mobileNumber,
            },
        });
        res.json(updatedCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.customer.delete({
            where: { id },
        });
        res.send('Customer deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *                 pattern: '^[0-9]{10}$'
 *     responses:
 *       200:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 123
 *               firstName: John
 *               lastName: Doe
 *               email: john.doe@example.com
 *               mobileNumber: 1234567890
 *       400:
 *         description: Invalid request body or mobile number format
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of customers
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 firstName: John
 *                 lastName: Doe
 *                 email: john.doe@example.com
 *                 mobileNumber: 1234567890
 *               - id: 2
 *                 firstName: Jane
 *                 lastName: Doe
 *                 email: jane.doe@example.com
 *                 mobileNumber: 9876543210
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the customer
 *     responses:
 *       200:
 *         description: Customer details
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               firstName: John
 *               lastName: Doe
 *               email: john.doe@example.com
 *               mobileNumber: 1234567890
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the customer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *                 pattern: '^[0-9]{10}$'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               firstName: UpdatedJohn
 *               lastName: UpdatedDoe
 *               email: updated.john.doe@example.com
 *               mobileNumber: 1234567890
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the customer
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal Server Error
 */

