import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    firstName : "NA",
    lastName : "NA",
    email : "NA",
  }

  submitForm(){
    console.log(this.user);
    alert(`Form submitted successfully!\n ${this.user}`);
  }
}