// transactionController.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Get all transactions for a bank account
router.get('/:bankAccountId', async (req, res) => {
    try {
        const bankAccountId = parseInt(req.params.bankAccountId);

        const transactions = await prisma.transaction.findMany({
            where: {
                bankAccountId,
            },
        });

        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Create a new debit or credit transaction
router.post('/', async (req, res) => {
    try {
        const { bankAccountId, amount, description, transactionType } = req.body;

        // Check if the bank account with the given ID exists
        const existingBankAccount = await prisma.bankAccount.findUnique({
            where: {
                id: bankAccountId,
            },
        });

        if (!existingBankAccount) {
            return res.status(404).json({ error: 'Bank account not found' });
        }

        // Perform debit or credit based on transaction type
        const updatedBalance =
            transactionType === 'CREDIT'
                ? existingBankAccount.balance + amount
                : existingBankAccount.balance - amount;

        // Fail the transaction if the updatedBalance is negative for debit transactions
        if (transactionType === 'DEBIT' && updatedBalance < 0) {
            const failedTransaction = await prisma.transaction.create({
                data: {
                    amount,
                    description,
                    transactionType,
                    status: 'FAILED',
                    bankAccountId,
                },
            });

            return res.json(failedTransaction);
        }

        // Create a new transaction
        const transaction = await prisma.transaction.create({
            data: {
                amount,
                description,
                transactionType,
                status: 'SUCCESSFUL', // Assume successful by default
                bankAccountId,
            },
        });

        // Update transaction status to SUCCESSFUL
        await prisma.transaction.update({
            where: {
                id: transaction.id,
            },
            data: {
                status: 'SUCCESSFUL',
            },
        }).then(async () => {
            // Update the bank account balance
            await prisma.bankAccount.update({
                where: {
                    id: bankAccountId,
                },
                data: {
                    balance: updatedBalance,
                },
            });
        }).catch((error) => {
            console.error(error);
            // Update transaction status to FAILED if account update fails
            prisma.transaction.update({
                where: {
                    id: transaction.id,
                },
                data: {
                    status: 'FAILED',
                },
            });
        });

        res.json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Bank transaction management
 */

/**
 * @swagger
 * /transactions/{bankAccountId}:
 *   get:
 *     summary: Get all transactions for a bank account
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: bankAccountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the bank account
 *     responses:
 *       200:
 *         description: List of transactions for the bank account
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 amount: 100.00
 *                 description: 'Credit transaction'
 *                 transactionType: 'CREDIT'
 *                 bankAccountId: 123
 *               - id: 2
 *                 amount: 50.00
 *                 description: 'Debit transaction'
 *                 transactionType: 'DEBIT'
 *                 bankAccountId: 123
 *       404:
 *         description: Bank account not found
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new debit or credit transaction
 *     tags: [Transactions]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bankAccountId:
 *                 type: integer
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               transactionType:
 *                 type: string
 *                 enum: ['CREDIT', 'DEBIT']
 *     responses:
 *       200:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               amount: 25.00
 *               description: 'Credit transaction'
 *               transactionType: 'CREDIT'
 *               bankAccountId: 123
 *       400:
 *         description: Invalid request body or bank account ID
 *       404:
 *         description: Bank account not found
 *       500:
 *         description: Internal Server Error
 */
