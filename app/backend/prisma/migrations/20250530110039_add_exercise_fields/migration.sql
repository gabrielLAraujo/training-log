/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Routine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRoutine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoutineExercise" DROP CONSTRAINT "RoutineExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "RoutineExercise" DROP CONSTRAINT "RoutineExercise_routineId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoutine" DROP CONSTRAINT "UserRoutine_routineId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoutine" DROP CONSTRAINT "UserRoutine_userId_fkey";

-- DropForeignKey
ALTER TABLE "_RoutineToUser" DROP CONSTRAINT "_RoutineToUser_A_fkey";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "Routine";

-- DropTable
DROP TABLE "UserRoutine";

-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "force" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "mechanic" TEXT,
    "equipment" TEXT NOT NULL,
    "primaryMuscles" TEXT[],
    "secondaryMuscles" TEXT[],
    "instructions" TEXT[],
    "images" TEXT[],
    "category" TEXT NOT NULL,
    "minRepetitions" INTEGER NOT NULL,
    "maxRepetitions" INTEGER NOT NULL,
    "numberOfSets" INTEGER,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "routines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_routines" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_routines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "routines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_routines" ADD CONSTRAINT "user_routines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_routines" ADD CONSTRAINT "user_routines_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "routines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoutineToUser" ADD CONSTRAINT "_RoutineToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "routines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
