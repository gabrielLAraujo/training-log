-- CreateTable
CREATE TABLE "User" (
    "token" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Workout" (
    "token" TEXT NOT NULL,
    "userToken" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Session" (
    "token" TEXT NOT NULL,
    "workoutToken" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "token" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "repetitions" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userToken_fkey" FOREIGN KEY ("userToken") REFERENCES "User"("token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_workoutToken_fkey" FOREIGN KEY ("workoutToken") REFERENCES "Workout"("token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_sessionToken_fkey" FOREIGN KEY ("sessionToken") REFERENCES "Session"("token") ON DELETE RESTRICT ON UPDATE CASCADE;
