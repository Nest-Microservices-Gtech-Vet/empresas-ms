/*
  Warnings:

  - A unique constraint covering the columns `[usua_admin_id,emp_id]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Empresa_usua_admin_id_emp_id_key" ON "Empresa"("usua_admin_id", "emp_id");
