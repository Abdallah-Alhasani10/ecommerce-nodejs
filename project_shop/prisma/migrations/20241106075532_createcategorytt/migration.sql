/*
  Warnings:

  - You are about to drop the `Categroy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Categroy";

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);
