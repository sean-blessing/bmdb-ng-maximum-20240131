export class User {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;

    constructor(
        id: number = 0,
        email: string = '',
        password: string = '',
        firstname: string = '',
        lastname: string = ''
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}