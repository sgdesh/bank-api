const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Create a new bank account for a customer
router.post('/', async (req, res) => {
    try {
        const { customerId } = req.body;

        // Check if the customer with the given ID exists
        const existingCustomer = await prisma.customer.findUnique({
            where: {
                id: customerId,
            },
        });

        if (!existingCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Create a new bank account for the customer with initial balance set to zero
        const bankAccount = await prisma.bankAccount.create({
            data: {
                balance: 0, // Initial balance set to zero
                customerId,
            },
        });

        res.json(bankAccount);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Get all bank accounts for a customer
router.get('/:customerId', async (req, res) => {
    try {
        const customerId = parseInt(req.params.customerId);

        const bankAccounts = await prisma.bankAccount.findMany({
            where: {
                customerId,
            },
        });

        res.json(bankAccounts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Get a specific bank account by ID
router.get('/account/:accountId', async (req, res) => {
    try {
        const accountId = parseInt(req.params.accountId);

        const bankAccount = await prisma.bankAccount.findUnique({
            where: {
                id: accountId,
            },
        });

        if (!bankAccount) {
            return res.status(404).json({ error: 'Bank account not found' });
        }

        res.json(bankAccount);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Update a bank account's balance
router.put('/:accountId', async (req, res) => {
    try {
        const accountId = parseInt(req.params.accountId);
        const { balance } = req.body;

        const updatedBankAccount = await prisma.bankAccount.update({
            where: {
                id: accountId,
            },
            data: {
                balance,
            },
        });

        res.json(updatedBankAccount);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a bank account by ID
router.delete('/:accountId', async (req, res) => {
    try {
        const accountId = parseInt(req.params.accountId);

        await prisma.bankAccount.delete({
            where: {
                id: accountId,
            },
        });

        res.json({ message: 'Bank account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;



/**
 * @swagger
 * /bank-accounts:
 *   post:
 *     summary: Create a new bank account for a customer
 *     tags: [BankAccounts]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Bank account created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               balance: 0
 *               customerId: 123
 *       400:
 *         description: Invalid request body or customer ID
 */

/**
 * @swagger
 * /bank-accounts/{customerId}:
 *   get:
 *     summary: Get all bank accounts for a customer
 *     tags: [BankAccounts]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the customer
 *     responses:
 *       200:
 *         description: List of bank accounts for the customer
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 balance: 0
 *                 customerId: 123
 *       404:
 *         description: Customer not found

 /**
 * @swagger
 * /bank-accounts/account/{accountId}:
 *   get:
 *     summary: Get a specific bank account by ID
 *     tags: [BankAccounts]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the bank account
 *     responses:
 *       200:
 *         description: Bank account details
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               balance: 0
 *               customerId: 123
 *       404:
 *         description: Bank account not found
 */
