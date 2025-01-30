class User {
    token:string;
    name:string;
    email:string;
    password:string;
    workouts:Workout[] = new Array<Workout>()
    constructor(token:string,name:string,email:string,password:string){
        this.token = token;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}