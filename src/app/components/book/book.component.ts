import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  emailsList: string[] = ['a@mgmail.com', 'b@gmail.com', 'c@gmail.com'];
  phoneNumbersList: number[] = [3652147890, 3215648790];
  firstNameInput: string = '';
  lastNameInput: string = '';
  phone: string = 'Phone';
  email: string = 'Email';
  toggle1: boolean = true;
  toggle: boolean = false;
  textBoxValue: string = ''

  constructor() {}

  ngOnInit(): void {}

  changeToggle1(): void {
    this.toggle1 = !this.toggle1;
  }

  changeToggle(): void {
    this.toggle = !this.toggle;
    this.textBoxValue=" "
    
  }

  addEmail(newEmail: string): void {
    this.emailsList = [newEmail, ...this.emailsList];
  }

  removeEmail(newEmail: string): void {
    const newEmailList = this.emailsList.filter((email) => email !== newEmail);
    this.emailsList = [...newEmailList];
  }

  addPhone(newPhone: number): void {
    this.phoneNumbersList = [newPhone, ...this.phoneNumbersList];
  }

  removePhone(newPhone: number): void {
    const newPhoneNumbersList = this.phoneNumbersList.filter(
      (phone) => phone !== newPhone
    );
    this.phoneNumbersList = [...newPhoneNumbersList];
  }

  onChildSubmit(eventArgs: any): void {
    if (eventArgs['type'] === 'Email' && eventArgs['action'] === 'add') {
      this.addEmail(eventArgs.value);
    } else if (
      eventArgs['type'] === 'Email' &&
      eventArgs['action'] === 'remove'
    ) {
      this.removeEmail(eventArgs.value);
    } else if (eventArgs['type'] === 'Phone' && eventArgs['action'] === 'add') {
      this.addPhone(eventArgs.value);
    } else if (
      eventArgs['type'] === 'Phone' &&
      eventArgs['action'] === 'remove'
    ) {
      this.removePhone(eventArgs.value);
    }
  }

  onSubmit(values: any) {
    console.log(values);
    let firstName: string = values.form.controls['firstName'].value;
    let lastName: string = values.form.controls['lastName'].value;

    if (!localStorage.getItem('phoneBook')) {
      localStorage.setItem('phoneBook', JSON.stringify({}));
    }

    const newEntry = {
      firstName: firstName,
      lastName: lastName,
      emailList: this.emailsList,
      phoneList: this.phoneNumbersList,
    };

    let newPhoneBook: any = JSON.parse(
      localStorage.getItem('phoneBook') || '{}'
    );

    newPhoneBook[firstName + lastName] = { ...newEntry };
    localStorage.setItem('phoneBook', JSON.stringify(newPhoneBook));
    this.changeToggle1();
    setTimeout(this.changeToggle1, 2000);
  }

  resetUserForm(f: NgForm) {
    f.resetForm();
    this.changeToggle()
  }
}
