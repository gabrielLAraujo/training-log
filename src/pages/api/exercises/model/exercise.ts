class Exercise {
  token: string;
  date: string;
  workout: Workout;
  name:string
  weight:Number;
  repetitions:Number;
  session:Session;  
  constructor(token: string, date: string, workout: Workout,name:string,weight:Number,repetitions:Number,session:Session) {
    this.date = date;
    this.token = token;
    this.workout = workout;
    this.name = name;
    this.repetitions = repetitions;
    this.weight = weight;
    this.session = session;
  }
}
