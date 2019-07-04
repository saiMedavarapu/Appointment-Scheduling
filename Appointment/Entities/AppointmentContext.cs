using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Appointment.Entities
{
    public class AppointmentContext : IdentityDbContext
    {
        public AppointmentContext(DbContextOptions<AppointmentContext> options)
              : base(options)
        { }

        public DbSet<Appointment> Appointments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
    }
}
