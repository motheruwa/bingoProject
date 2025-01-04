/*
  Warnings:

  - Added the required column `playType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `playType` VARCHAR(191) NOT NULL;
