class Customer {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    greeter() {
        console.log(`Hello, ${this.firstName} ${this.lastName}`);
    }
}

let customer = new Customer("Kalp", "Senghani");
customer.greeter();
