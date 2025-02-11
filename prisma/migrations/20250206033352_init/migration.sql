-- CreateTable
CREATE TABLE "Empresa" (
    "emp_id" SERIAL NOT NULL,
    "emp_nombre" VARCHAR(255) NOT NULL,
    "emp_correo" VARCHAR(255) NOT NULL,
    "emp_direccion" VARCHAR(255) NOT NULL,
    "emp_telefono" VARCHAR(10) NOT NULL,
    "emp_ruc" VARCHAR(13) NOT NULL,
    "provincia_id" INTEGER,
    "canton_id" INTEGER,
    "tipo_empresa_id" INTEGER,
    "usua_admin_id" INTEGER NOT NULL,
    "creado_por" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

    CONSTRAINT "Canton_pkey" PRIMARY KEY ("can_id")
);

-- CreateTable
CREATE TABLE "Tipo_Empresa" (
    "te_id" SERIAL NOT NULL,
    "te_nombre" VARCHAR(255) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tipo_Empresa_pkey" PRIMARY KEY ("te_id")
);

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_provincia_id_fkey" FOREIGN KEY ("provincia_id") REFERENCES "Provincia"("prov_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_canton_id_fkey" FOREIGN KEY ("canton_id") REFERENCES "Canton"("can_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_tipo_empresa_id_fkey" FOREIGN KEY ("tipo_empresa_id") REFERENCES "Tipo_Empresa"("te_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Canton" ADD CONSTRAINT "Canton_provincia_id_fkey" FOREIGN KEY ("provincia_id") REFERENCES "Provincia"("prov_id") ON DELETE RESTRICT ON UPDATE CASCADE;
