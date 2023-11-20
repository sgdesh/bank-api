// loanController.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// API to apply for a loan and approve it randomly
router.post('/apply', async (req, res) => {
    try {
        const { bankAccountId, amount, interest } = req.body;

        // Check if the bank account with the given ID exists
        const existingBankAccount = await prisma.bankAccount.findUnique({
            where: {
                id: bankAccountId,
            },
        });

        if (!existingBankAccount) {
            return res.status(404).json({ error: 'Bank account not found' });
        }

        // Randomly decide whether to approve the loan request
        const isApproved = Math.random() < 0.5;

        // Create a new loan request
        const loanRequest = await prisma.loanRequest.create({
            data: {
                amount,
                interest,
                bankAccountId,
                status: isApproved ? 'APPROVED' : 'REJECTED',
            },
        });

        if (isApproved) {
            // Create a new loan account
            const loanAccount = await prisma.loanAccount.create({
                data: {
                    amount: loanRequest.amount,
                    interest: loanRequest.interest,
                    bankAccountId: loanRequest.bankAccountId,
                },
            });

            res.json({ message: 'Loan approved and account created successfully', loanAccount });
        } else {
            res.json({ message: 'Loan request rejected', loanRequest });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// API to get loan details
router.get('/:loanAccountId', async (req, res) => {
    try {
        const loanAccountId = parseInt(req.params.loanAccountId);

        const loanAccount = await prisma.loanAccount.findUnique({
            where: {
                id: loanAccountId,
            },
        });

        if (!loanAccount) {
            return res.status(404).json({ error: 'Loan account not found' });
        }

        res.json(loanAccount);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// API to pay back a loan
router.post('/payback/:loanAccountId', async (req, res) => {
    try {
        const loanAccountId = parseInt(req.params.loanAccountId);

        // Find the loan account
        const loanAccount = await prisma.loanAccount.findUnique({
            where: {
                id: loanAccountId,
            },
        });

        if (!loanAccount) {
            return res.status(404).json({ error: 'Loan account not found' });
        }

        res.json({ message: 'Loan paid back successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: Loan management
 */

/**
 * @swagger
 * /loans/apply:
 *   post:
 *     summary: Apply for a loan and approve it randomly
 *     tags: [Loans]
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
 *               interest:
 *                 type: number
 *     responses:
 *       200:
 *         description: Loan application processed successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Loan approved and account created successfully'
 *               loanAccount:
 *                 id: 1
 *                 amount: 1000.00
 *                 interest: 0.1
 *                 bankAccountId: 123
 *       404:
 *         description: Bank account not found or loan request rejected
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /loans/{loanAccountId}:
 *   get:
 *     summary: Get loan details by ID
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: loanAccountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the loan account
 *     responses:
 *       200:
 *         description: Loan account details
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               amount: 1000.00
 *               interest: 0.1
 *               bankAccountId: 123
 *       404:
 *         description: Loan account not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /loans/payback/{loanAccountId}:
 *   post:
 *     summary: Pay back a loan
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: loanAccountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the loan account
 *     responses:
 *       200:
 *         description: Loan paid back successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Loan paid back successfully'
 *       404:
 *         description: Loan account not found
 *       500:
 *         description: Internal Server Error
 */
