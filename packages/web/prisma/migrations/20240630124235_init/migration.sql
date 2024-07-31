-- CreateTable
CREATE TABLE "Album" (
    "albumId" TEXT NOT NULL PRIMARY KEY,
    "albumCid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "artistes" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Song" (
    "songId" TEXT NOT NULL PRIMARY KEY,
    "songCid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "artistes" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("albumId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_albumCid_key" ON "Album"("albumCid");

-- CreateIndex
CREATE UNIQUE INDEX "Song_songCid_key" ON "Song"("songCid");
