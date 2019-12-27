using System;
using System.Collections.Generic;

namespace RentProperty.Models
{
    public partial class Request
    {
        public Request()
        {
            Deal = new HashSet<Deal>();
        }

        public int Id { get; set; }
        public decimal? Pricemin { get; set; }
        public decimal Pricemax { get; set; }
        public decimal? Areamin { get; set; }
        public decimal? Areamax { get; set; }
        public int? Roomscountmin { get; set; }
        public int? Roomscountmax { get; set; }
        public int? Floormin { get; set; }
        public int? Floormax { get; set; }
        public int? Floorscountmin { get; set; }
        public int? Floorscountmax { get; set; }
        public int Status { get; set; }
        public int Realtor { get; set; }
        public int Client { get; set; }
        public int Typpe { get; set; }
        public int? District { get; set; }

        public Client ClientNavigation { get; set; }
        public District DistrictNavigation { get; set; }
        public Realtor RealtorNavigation { get; set; }
        public StatusR StatusNavigation { get; set; }
        public Typpe TyppeNavigation { get; set; }
        public ICollection<Deal> Deal { get; set; }
    }
}
