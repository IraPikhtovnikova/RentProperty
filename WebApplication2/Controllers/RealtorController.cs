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
    public class RealtorController : Controller
    {
        private RentPropertyContext db = new RentPropertyContext();

        [HttpGet("[action]")]
        public IEnumerable<Realtor> allrealtors()
        {
            return db.Realtor.ToList();
        }

        [HttpGet("[action]")]
        public Realtor getrealtor(int id)
        {
            return db.Realtor.Where(r => r.Id == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        public void newrealtor([FromBody]Realtor realtor)
        {
            db.Realtor.Add(realtor);
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> editrealtor([FromBody]Realtor realtor)
        {
            var real = getrealtor(realtor.Id);
            real.Fullname = realtor.Fullname;
            real.Phone = realtor.Phone;
            real.Email = realtor.Email;

            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> deleterealtor([FromBody]Realtor realtor)
        {
            Realtor tr = getrealtor(realtor.Id);
            db.Realtor.Remove(tr);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
