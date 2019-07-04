using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Appointment.Entities
{
    public class Appointment
    {
        public int? AppointmentID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime AppointmentDate { get; set; }

    }
}
