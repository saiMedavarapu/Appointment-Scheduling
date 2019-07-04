/// <reference path="../home.service.ts" />
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HomeService } from '../home.service'




@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  apptId: number;
  updateForm: FormGroup;
  appointmentDetails: any;
  dataLoad = false;
  showUpdateForm = false;//To show the update form.
  constructor(private fb: FormBuilder, private homeService: HomeService) {

  }

  ngOnInit() {
    this.updateForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      LastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      DateOfBirth: [''],
      AppointmentTime: ['']
    });
  }

  getAppointment() {
    this.homeService.GetAppointment(this.apptId).subscribe(
      res => {
        console.log(res);
        this.appointmentDetails = res;
        this.dataLoad = true;

      }
    )

  }

  //Update appointment
  updateAppointment() {
    this.showUpdateForm = !this.showUpdateForm;
    //Patching th values to the form.
    this.updateForm.patchValue({
      FirstName: this.appointmentDetails.firstName,
      LastName: this.appointmentDetails.lastName,
      DateOfBirth: this.appointmentDetails.dateOfBirth,
      AppointmentTime: this.appointmentDetails.appointmentDate
    });

  }

  //Submit updated changes
  SubmitUpdatedChanges() {
    //Binding to the data variable
    var data = this.updateForm.value;
    //Adding ID to the appointmentID
    if (this.apptId != null) {
      data.appointmentID = this.apptId;
    }
    //Subscrbing to the service
    this.homeService.UpdateAppointment(data).subscribe(
      result => {
        console.log(result);
      }
    )
  }


  //Delete Appointment
  confirmDeleteAppointment() {
    var data = this.updateForm.value;
    if (this.apptId != null) {
      data.appointmentID = this.apptId;
    }

    this.homeService.DeleteAppointment(data).subscribe(
      res => {
        console.log(res);
      }
    )
  }

}
