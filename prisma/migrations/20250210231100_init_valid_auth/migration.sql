/*
  Warnings:

  - You are about to drop the column `creado_por` on the `Empresa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Canton" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "creado_por",
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "Provincia" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "Tipo_Empresa" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "updatedBy" INTEGER;
