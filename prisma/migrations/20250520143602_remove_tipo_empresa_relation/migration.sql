/*
  Warnings:

  - You are about to drop the column `tipo_empresa_id` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the `Tipo_Empresa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_tipo_empresa_id_fkey";

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "tipo_empresa_id",
ADD COLUMN     "emp_tipo_empresa" VARCHAR(255) NOT NULL DEFAULT 'Por definir';

-- DropTable
DROP TABLE "Tipo_Empresa";
