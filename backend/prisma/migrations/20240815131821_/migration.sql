/*
  Warnings:

  - You are about to drop the `LikeReply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikeReply" DROP CONSTRAINT "LikeReply_replyId_fkey";

-- DropTable
DROP TABLE "LikeReply";
