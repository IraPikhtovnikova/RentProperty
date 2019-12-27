using System;
using System.Collections.Generic;

namespace RentProperty.Models
{
    public partial class Deal
    {
        public int Id { get; set; }
        public int Propobj { get; set; }
        public int Request { get; set; }
        public DateTime Ddate { get; set; }
        public int Status { get; set; }
        public DateTime Startdate { get; set; }
        public DateTime Enddate { get; set; }

        public Propobj PropobjNavigation { get; set; }
        public Request RequestNavigation { get; set; }
        public StatusD StatusNavigation { get; set; }
    }
}
