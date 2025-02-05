-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SHOP';

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "shopId" INTEGER;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
