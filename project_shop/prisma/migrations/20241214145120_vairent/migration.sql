-- CreateTable
CREATE TABLE "ProductVarient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductVarient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVarientItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "productvarientid" INTEGER NOT NULL,

    CONSTRAINT "ProductVarientItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductVarient" ADD CONSTRAINT "ProductVarient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVarientItem" ADD CONSTRAINT "ProductVarientItem_productvarientid_fkey" FOREIGN KEY ("productvarientid") REFERENCES "ProductVarient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
