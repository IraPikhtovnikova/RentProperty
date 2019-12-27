using System;
using System.Collections.Generic;

namespace RentProperty.Models
{
    public partial class Typpe
    {
        public Typpe()
        {
            Propobj = new HashSet<Propobj>();
            Request = new HashSet<Request>();
        }

        public int Id { get; set; }
        public string Tname { get; set; }
        public string Tdescr { get; set; }

        public ICollection<Propobj> Propobj { get; set; }
        public ICollection<Request> Request { get; set; }
    }
}
