using System;
using System.Collections.Generic;

namespace RentProperty.Models
{
    public partial class Propobj
    {
        public Propobj()
        {
            Deal = new HashSet<Deal>();
        }

        public int Id { get; set; }
        public string Street { get; set; }
        public string House { get; set; }
        public int? Apartment { get; set; }
        public int Roomscount { get; set; }
        public int Floor { get; set; }
        public decimal Area { get; set; }
        public int Floorscount { get; set; }
        public decimal Price { get; set; }
        public string Pdescr { get; set; }
        public int District { get; set; }
        public int Typpe { get; set; }
        public int Client { get; set; }
        public int Realtor { get; set; }

        public Client ClientNavigation { get; set; }
        public District DistrictNavigation { get; set; }
        public Realtor RealtorNavigation { get; set; }
        public Typpe TyppeNavigation { get; set; }
        public ICollection<Deal> Deal { get; set; }
    }
}
