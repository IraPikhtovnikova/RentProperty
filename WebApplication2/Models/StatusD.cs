using System;
using System.Collections.Generic;

namespace RentProperty.Models
{
    public partial class StatusD
    {
        public StatusD()
        {
            Deal = new HashSet<Deal>();
        }

        public int Id { get; set; }
        public string Sname { get; set; }
        public string Sdescr { get; set; }

        public ICollection<Deal> Deal { get; set; }
    }
}
