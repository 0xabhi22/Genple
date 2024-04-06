-- CreateTable
CREATE TABLE "MagicRecaps" (
    "id" TEXT NOT NULL,
    "recordingId" TEXT NOT NULL,
    "publicId" TEXT,
    "text" TEXT NOT NULL,

    CONSTRAINT "MagicRecaps_pkey" PRIMARY KEY ("id")
);
