using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RentProperty.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    public class DistrictController : Controller
    {
        private RentPropertyContext db = new RentPropertyContext();

        [HttpGet("[action]")]
        public IEnumerable<District> alldistricts()
        {
            return db.District.ToList();
        }

        [HttpGet("[action]")]
        public District getdistrict(int id)
        {
            return db.District.Where(d => d.Id == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        public void newdistrict([FromBody]District district)
        {
            db.District.Add(district);
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> editdistrict([FromBody]District district)
        {
            var dist = getdistrict(district.Id);
            dist.Dname = district.Dname;
            dist.Ddescr = district.Ddescr;

            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> deletedistrict([FromBody]District district)
        {
            District tr = getdistrict(district.Id);
            db.District.Remove(tr);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
