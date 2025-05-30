/*
  Warnings:

  - You are about to drop the `_RoutineToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exercises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `routines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_routines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoutineExercise" DROP CONSTRAINT "RoutineExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "RoutineExercise" DROP CONSTRAINT "RoutineExercise_routineId_fkey";

-- DropForeignKey
ALTER TABLE "_RoutineToUser" DROP CONSTRAINT "_RoutineToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoutineToUser" DROP CONSTRAINT "_RoutineToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "user_routines" DROP CONSTRAINT "user_routines_routineId_fkey";

-- DropForeignKey
ALTER TABLE "user_routines" DROP CONSTRAINT "user_routines_userId_fkey";

-- AlterTable
ALTER TABLE "RoutineExercise" ADD COLUMN     "order" INTEGER,
ALTER COLUMN "minRepetitions" DROP NOT NULL,
ALTER COLUMN "maxRepetitions" DROP NOT NULL,
ALTER COLUMN "numberOfSets" DROP NOT NULL;

-- DropTable
DROP TABLE "_RoutineToUser";

-- DropTable
DROP TABLE "exercises";

-- DropTable
DROP TABLE "routines";

-- DropTable
DROP TABLE "user_routines";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "force" TEXT,
    "level" TEXT NOT NULL,
    "mechanic" TEXT,
    "equipment" TEXT,
    "primaryMuscles" TEXT[],
    "secondaryMuscles" TEXT[],
    "instructions" TEXT[],
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "category" TEXT NOT NULL,
    "minRepetitions" INTEGER,
    "maxRepetitions" INTEGER,
    "numberOfSets" INTEGER,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseExecution" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "repetitions" INTEGER,
    "weight" DOUBLE PRECISION,
    "durationSecs" INTEGER,
    "notes" TEXT,

    CONSTRAINT "ExerciseExecution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseExecution" ADD CONSTRAINT "ExerciseExecution_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "WorkoutSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseExecution" ADD CONSTRAINT "ExerciseExecution_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
