using System;
using System.Collections.Generic;

namespace RentProperty.Models
{
    public partial class Realtor
    {
        public Realtor()
        {
            Propobj = new HashSet<Propobj>();
            Request = new HashSet<Request>();
        }

        public int Id { get; set; }
        public string Fullname { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public ICollection<Propobj> Propobj { get; set; }
        public ICollection<Request> Request { get; set; }
    }
}
