-- CreateEnum
CREATE TYPE "updateType" AS ENUM ('firmware', 'fileSystem');

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "isUpdated" BOOLEAN NOT NULL DEFAULT false,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "binaryFile" (
    "id" SERIAL NOT NULL,
    "updateType" "updateType" NOT NULL,
    "fileLink" TEXT NOT NULL,
    "isLatest" BOOLEAN NOT NULL DEFAULT true,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "binaryFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "project_id_idx" ON "project"("id");

-- CreateIndex
CREATE INDEX "binaryFile_id_idx" ON "binaryFile"("id");

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "binaryFile" ADD CONSTRAINT "binaryFile_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
