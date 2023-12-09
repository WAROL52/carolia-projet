-- CreateTable
CREATE TABLE "Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "folderParentId" INTEGER,
    CONSTRAINT "Folder_folderParentId_fkey" FOREIGN KEY ("folderParentId") REFERENCES "Folder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "folderId" INTEGER NOT NULL,
    CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthday" DATETIME,
    "bornAt" TEXT,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("accountId", "birthday", "bornAt", "createdAt", "firstname", "id", "lastname", "password", "updatedAt") SELECT "accountId", "birthday", "bornAt", "createdAt", "firstname", "id", "lastname", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_accountId_key" ON "User"("accountId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
