# Appointment-Scheduling [![](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/saiMedavarapu/WeatherForecast/blob/master/LICENSE)
Full stack application built using ASP.NET Core, EF Core, SSMS and Angular. This lets the user schedule an appointment and Perform CRUD on it.
* Click :star:if you like the project. Pull Request are highly appreciated.
# Running guide
Download the zip. Open Appointment.sln and run IIS Express.
# Project description :
Appointment scheduling lets Admin(For now) to schedule the appointment for a particular date and time. The admin can later update and delete the appointment on demand.
## Patterns used:
* Dependency Injection Pattern
* Singleton pattern
* PUBSUB Pattern
## Angular features:
* Reactive forms
* Components
* services
* Pipes
* Angular routing
* Dependency Injection
* Observables from rxjs
# Documentation:

## Client Side using Angular.
Following is the customer model. 

``` typescript
    
export interface customerModel {
  appointmentDate: string;
  appointmentID: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
}
```
* Reactive form for the customer details. Createthe following form in the ngoninit.
``` typescript
 this.customerForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      LastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      DateOfBirth: [''],
      AppointmentTime: ['']
    });
```
* Service is created to make the calls to the API which returns an observable which can be subscribed to when needed.
``` typescript
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
  ```
  
  * Subscribing to the service in the type script file: When the service is created, it can be injected into the component using **dependency injection**. Which can be subsrcbed by using .subsrcibe method by using **PUBSUB pattern** .
  ``` typescript
   onSubmit(): void {
    console.log(this.customerForm.value);
    var data = this.customerForm.value;
    this.homeService.CreateAppointment(data).subscribe(
      result => {
        console.log(result);
      }
    )
   ```
   * Similarly, code can be found inside the ClientApp folder for deleting and updating the appointments. 
   
   ## Web API using .NET core, EF core, C#, LINQ:
   
   
   ``` C#
    [HttpPost("[action]")]
        public async Task<ActionResult<int>> CreateAppointment([FromBody] Entities.Appointment item)
        {
            try
            {
                _context.Appointments.Add(item);
                var result = await _context.SaveChangesAsync();

                //Sending email

                var message = new MimeMessage();
                //From Address
                message.From.Add(new MailboxAddress("sai vaibhav medavarapu", "vaibhav.medavarapu@gmail.com"));

                //To address
                message.To.Add(new MailboxAddress("S Medavarapu", "saivaibhav90@gmail.com"));
                //Subject
                message.Subject = "Appointment confirmed";
                //Body
                message.Body = new TextPart("plain")
                {
                    Text = "Appointment confirmed"
                };


                //Configure and send the email

                using (var client = new SmtpClient())
                {
                    // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                    client.Connect("smtp.gmail.com", 587, false);

                    // Note: only needed if the SMTP server requires authentication
                    client.Authenticate("Your Username", "your password");

                    client.Send(message);
                    client.Disconnect(true);
                }
                return item.AppointmentID;
            }
            catch (Exception ex)
            {

            }
            return null;
        }
   ```
   For delete operation
   ``` C#
        public async Task<ActionResult<Entities.Appointment>> DeleteAppointment([FromBody]Entities.Appointment item)
        {
            try
            {

                var student = await _context.Appointments.FirstOrDefaultAsync(b => b.AppointmentID == item.AppointmentID);
                _context.Appointments.Remove(student);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {

            }
            return null;
        }
    ```
