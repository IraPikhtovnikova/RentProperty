using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RentProperty.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RentProperty.Controllers
{
    [Route("api/[controller]")]
    public class StatusdController : Controller
    {
        private RentPropertyContext db = new RentPropertyContext();

        [HttpGet("[action]")]
        public IEnumerable<StatusD> allstatusesd()
        {
            return db.StatusD.ToList();
        }

        [HttpGet("[action]")]
        public StatusD getstatusd(int id)
        {
            return db.StatusD.Where(c => c.Id == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        public void newstatusd([FromBody]StatusD status)
        {
            db.StatusD.Add(status);
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> editstatusd([FromBody]StatusD status)
        {
            var cl = getstatusd(status.Id);
            cl.Sname = status.Sname;
            cl.Sdescr = status.Sdescr;

            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> deletestatusr([FromBody]StatusD status)
        {
            StatusD tr = getstatusd(status.Id);
            db.StatusD.Remove(tr);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
