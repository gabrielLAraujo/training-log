class Session {
    token:string;
    date : string;
    exercises:Exercise[] = new Array<Exercise>();
    workout: Workout;
    constructor(token :string, date:string,workout:Workout){
        this.date= date;
        this.token = token;
        this.workout = workout;
    }
  }