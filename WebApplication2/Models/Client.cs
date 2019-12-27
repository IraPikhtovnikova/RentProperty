using System;
using System.Collections.Generic;

namespace RentProperty.Models
{
    public partial class Client
    {
        public Client()
        {
            Propobj = new HashSet<Propobj>();
            Request = new HashSet<Request>();
        }

        public int Id { get; set; }
        public string Fullname { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Passport { get; set; }

        public ICollection<Propobj> Propobj { get; set; }
        public ICollection<Request> Request { get; set; }
    }
}
