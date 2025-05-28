-- CreateTable
CREATE TABLE "Empresa" (
    "emp_id" SERIAL NOT NULL,
    "emp_nombre" VARCHAR(255) NOT NULL,
    "emp_correo" VARCHAR(255) NOT NULL,
    "emp_direccion" VARCHAR(255) NOT NULL,
    "emp_telefono" VARCHAR(10) NOT NULL,
    "emp_ruc" VARCHAR(13) NOT NULL,
    "emp_tipo_empresa" VARCHAR(255) NOT NULL,
    "provincia_id" INTEGER,
    "canton_id" INTEGER,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("emp_id")
);

-- CreateTable
CREATE TABLE "Provincia" (
    "prov_id" SERIAL NOT NULL,
    "prov_nombre" VARCHAR(50) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("prov_id")
);

-- CreateTable
CREATE TABLE "Canton" (
    "can_id" SERIAL NOT NULL,
    "can_nombre" VARCHAR(255) NOT NULL,
    "provincia_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,

    CONSTRAINT "Canton_pkey" PRIMARY KEY ("can_id")
);

-- CreateTable
CREATE TABLE "EmpresaUsuario" (
    "id" SERIAL NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmpresaUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_emp_correo_key" ON "Empresa"("emp_correo");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_emp_ruc_key" ON "Empresa"("emp_ruc");

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_provincia_id_fkey" FOREIGN KEY ("provincia_id") REFERENCES "Provincia"("prov_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_canton_id_fkey" FOREIGN KEY ("canton_id") REFERENCES "Canton"("can_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Canton" ADD CONSTRAINT "Canton_provincia_id_fkey" FOREIGN KEY ("provincia_id") REFERENCES "Provincia"("prov_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpresaUsuario" ADD CONSTRAINT "EmpresaUsuario_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
