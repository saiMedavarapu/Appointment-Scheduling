/// <reference path="customermodel.ts" />
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HomeService } from '../home.service'
import { Observable } from 'rxjs/Observable';
import { customerModel } from './customerModel'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  customerForm: FormGroup;
  updateForm: FormGroup;
  someTest: any = [];
  appointmentDetails: any;
  dataLoad = false;
  apptId: number;
  
  constructor(private fb: FormBuilder, private homeService: HomeService) {

  }
  ngOnInit() {
    this.customerForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      LastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      DateOfBirth: [''],
      AppointmentTime: ['']
    });
  }

  onSubmit(): void {
    console.log(this.customerForm.value);
    var data = this.customerForm.value;
    this.homeService.CreateAppointment(data).subscribe(
      result => {
        console.log(result);
      }
    )

  }
}

