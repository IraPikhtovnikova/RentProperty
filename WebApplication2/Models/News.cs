using System;
using System.Collections.Generic;

namespace RentProperty.Models
{
    public partial class News
    {
        public int Id { get; set; }
        public string Nhead { get; set; }
        public string Nshort { get; set; }
        public string Ndescr { get; set; }
        public DateTime Ndate { get; set; }
        public string Nimg { get; set; }
    }
}
