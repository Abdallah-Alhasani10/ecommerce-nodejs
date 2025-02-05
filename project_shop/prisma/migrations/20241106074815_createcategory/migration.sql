-- CreateTable
CREATE TABLE "Categroy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Categroy_pkey" PRIMARY KEY ("id")
);
