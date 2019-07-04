import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }


  CreateAppointment(data: string): Observable<any> {
    return this.http.post("https://localhost:44396/api/SampleData/CreateAppointment", data);
  }


  GetAppointment(appointmentId: any): Observable<any> {
    return this.http.get("https://localhost:44396/api/SampleData/" + appointmentId );
  }

  UpdateAppointment(data: string): Observable<any> {
    return this.http.post("https://localhost:44396/api/SampleData/UpdateTodoItem", data);
  }


  DeleteAppointment(data: string): Observable<any> {
    console.log("reached delete appointment");
    return this.http.post("https://localhost:44396/api/SampleData/DeleteAppointment", data);
  }
  }
