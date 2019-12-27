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
    public class StatusrController : Controller
    {
        private RentPropertyContext db = new RentPropertyContext();

        [HttpGet("[action]")]
        public IEnumerable<StatusR> allstatuses()
        {
            return db.StatusR.ToList();
        }

        [HttpGet("[action]")]
        public StatusR getstatusr(int id)
        {
            return db.StatusR.Where(c => c.Id == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        public void newstatusr([FromBody]StatusR status)
        {
            db.StatusR.Add(status);
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> editstatusr([FromBody]StatusR status)
        {
            var cl = getstatusr(status.Id);
            cl.Sname = status.Sname;
            cl.Sdescr = status.Sdescr;

            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> deletestatusr([FromBody]StatusR status)
        {
            StatusR tr = getstatusr(status.Id);
            db.StatusR.Remove(tr);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
