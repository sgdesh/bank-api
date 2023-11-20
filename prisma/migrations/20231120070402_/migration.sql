/*
  Warnings:

  - You are about to drop the column `accountNumber` on the `BankAccount` table. All the data in the column will be lost.
  - Added the required column `transactionType` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEBIT', 'CREDIT');

-- DropIndex
DROP INDEX "BankAccount_accountNumber_key";

-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "accountNumber";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transactionType" "TransactionType" NOT NULL;
