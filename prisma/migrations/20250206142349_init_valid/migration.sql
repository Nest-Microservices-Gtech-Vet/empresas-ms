/*
  Warnings:

  - A unique constraint covering the columns `[emp_correo]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emp_ruc]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Empresa_emp_correo_key" ON "Empresa"("emp_correo");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_emp_ruc_key" ON "Empresa"("emp_ruc");
