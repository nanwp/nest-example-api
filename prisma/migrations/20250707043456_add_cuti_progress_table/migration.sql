-- CreateTable
CREATE TABLE "cuti_progress" (
    "id" TEXT NOT NULL,
    "cutiId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cuti_progress_pkey" PRIMARY KEY ("id")
);
