-- CreateTable
CREATE TABLE "public"."UdyamSubmission" (
    "id" SERIAL NOT NULL,
    "aadhaar" TEXT NOT NULL,
    "aadhaar_name" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UdyamSubmission_pkey" PRIMARY KEY ("id")
);
