/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Trackings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trackings_codigo_key" ON "Trackings"("codigo");
