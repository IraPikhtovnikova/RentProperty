using System;
using System.Collections.Generic;

namespace RentProperty.Models
{
    public partial class District
    {
        public District()
        {
            Propobj = new HashSet<Propobj>();
            Request = new HashSet<Request>();
        }

        public int Id { get; set; }
        public string Dname { get; set; }
        public string Ddescr { get; set; }

        public ICollection<Propobj> Propobj { get; set; }
        public ICollection<Request> Request { get; set; }
    }
}
