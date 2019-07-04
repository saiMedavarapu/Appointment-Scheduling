using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace Appointment.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly Entities.AppointmentContext _context;
        public SampleDataController(Entities.AppointmentContext context)
        {
            _context = context;
        }
        //api/PostTodoItem
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
                message.To.Add(new MailboxAddress("Sachin Samrat Medavarapu", "saivaibhav90@gmail.com"));
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
                    client.Authenticate("Sai Vaibhav Medavarapu", "flipkart1!");

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

        // GET api/SampleData/5  
        [HttpGet("{id}")]
        public async Task<ActionResult<Entities.Appointment>> GetDetails(int id)
        {
            try
            {
                var student = await _context.Appointments.FirstOrDefaultAsync(b => b.AppointmentID == id);
                return student;
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        //Updating the details.
        [HttpPost("[action]")]
        public async Task<ActionResult<int>> UpdateTodoItem([FromBody] Entities.Appointment item)
        {
            try
            {
                _context.Appointments.Update(item);
                var result = await _context.SaveChangesAsync();

                return item.AppointmentID;
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        //Deleting the appointment
        [HttpPost("[action]")]
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
    }
}
