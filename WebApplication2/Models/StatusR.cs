using System;
using System.Collections.Generic;

namespace RentProperty.Models
{
    public partial class StatusR
    {
        public StatusR()
        {
            Request = new HashSet<Request>();
        }

        public int Id { get; set; }
        public string Sname { get; set; }
        public string Sdescr { get; set; }

        public ICollection<Request> Request { get; set; }
    }
}
