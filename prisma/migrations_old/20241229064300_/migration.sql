/*
  Warnings:

  - You are about to drop the column `boardId` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `boardId` on the `message` table. All the data in the column will be lost.
  - Added the required column `cardId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImageUrl` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_boardId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_boardId_fkey`;

-- DropIndex
DROP INDEX `File_boardId_fkey` ON `file`;

-- DropIndex
DROP INDEX `Message_boardId_fkey` ON `message`;

-- AlterTable
ALTER TABLE `auditlog` MODIFY `action` ENUM('CREATE', 'UPDATE', 'DELETE', 'SEND') NOT NULL,
    MODIFY `entityType` ENUM('BOARD', 'LIST', 'CARD', 'MESSAGE') NOT NULL;

-- AlterTable
ALTER TABLE `board` ADD COLUMN `adminEmail` VARCHAR(191) NOT NULL DEFAULT 'bagasimam01@gmail.com';

-- AlterTable
ALTER TABLE `file` DROP COLUMN `boardId`,
    ADD COLUMN `cardId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `boardId`,
    ADD COLUMN `cardId` VARCHAR(191) NOT NULL,
    ADD COLUMN `isReadAdmin` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `profileImageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `sender` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` VARCHAR(191) NOT NULL,
    `userReadId` TEXT NOT NULL,
    `messageId` VARCHAR(191) NOT NULL,
    `cardId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Notifications_messageId_key`(`messageId`),
    INDEX `Notifications_messageId_idx`(`messageId`),
    INDEX `Notifications_cardId_idx`(`cardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `File_cardId_idx` ON `File`(`cardId`);

-- CreateIndex
CREATE INDEX `Message_cardId_idx` ON `Message`(`cardId`);

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
