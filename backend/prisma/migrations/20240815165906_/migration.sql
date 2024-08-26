/*
  Warnings:

  - You are about to drop the `LikeTweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikeTweet" DROP CONSTRAINT "LikeTweet_tweetId_fkey";

-- DropTable
DROP TABLE "LikeTweet";
