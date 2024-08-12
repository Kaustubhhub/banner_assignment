-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "link" TEXT,
    "endTime" TEXT,
    "isVisible" BOOLEAN DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Banner_id_key" ON "Banner"("id");
