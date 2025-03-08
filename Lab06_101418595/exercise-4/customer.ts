export class Customer {
    private firstName: string;
    private lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    greeter() {
        console.log(`Hello, ${this.firstName} ${this.lastName}`);
    }
}
