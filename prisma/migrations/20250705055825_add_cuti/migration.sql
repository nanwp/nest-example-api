-- CreateTable
CREATE TABLE "jenis_cuti" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jenis_cuti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_jenis_cuti" (
    "id" TEXT NOT NULL,
    "jenisCutiId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_jenis_cuti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuti" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jenisCutiId" TEXT NOT NULL,
    "subJenisCutiId" TEXT,
    "description" TEXT,
    "fileUrl" VARCHAR(255),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "requestTo" VARCHAR(100),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cuti_pkey" PRIMARY KEY ("id")
);
