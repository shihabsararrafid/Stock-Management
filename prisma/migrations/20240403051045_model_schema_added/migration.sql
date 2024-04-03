-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "stock" BIGINT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "borrowList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "borrowList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_id_idx" ON "product"("id");

-- CreateIndex
CREATE INDEX "borrowList_id_userId_idx" ON "borrowList"("id", "userId");

-- AddForeignKey
ALTER TABLE "borrowList" ADD CONSTRAINT "borrowList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowList" ADD CONSTRAINT "borrowList_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
