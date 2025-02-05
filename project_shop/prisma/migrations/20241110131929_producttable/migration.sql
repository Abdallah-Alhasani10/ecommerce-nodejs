-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "main_image" TEXT NOT NULL,
    "categoryid" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
