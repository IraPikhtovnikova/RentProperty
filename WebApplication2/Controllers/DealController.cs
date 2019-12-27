using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentProperty.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RentProperty.Controllers
{
    [Route("api/[controller]")]
    public class DealController : Controller
    {
        private RentPropertyContext db = new RentPropertyContext();

        [HttpGet("[action]")]
        public IEnumerable<Deal> alldeals()
        {
            return db.Deal
                .Include(d => d.PropobjNavigation)
                .Include(c => c.RequestNavigation)
                .Include(t => t.StatusNavigation).ToList();
        }

        [HttpGet("[action]")]
        public Deal getdeal(int id)
        {
            return db.Deal
                .Include(d => d.PropobjNavigation)
                .Include(c => c.RequestNavigation)
                .Include(t => t.StatusNavigation).Where(c => c.Id == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        public void newdeal([FromBody]Deal deal)
        {
            db.Deal.Add(deal);
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> editdeal([FromBody]Deal deal)
        {
            var cl = getdeal(deal.Id);
            cl.Ddate = deal.Ddate;
            //cl.Startdate = deal.Startdate;
            //cl.Enddate = deal.Enddate;
            //cl.Propobj = deal.Propobj;
            //cl.Request = deal.Request;
            cl.Status = deal.Status;

            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> deletedeal([FromBody]Deal deal)
        {
            Deal tr = getdeal(deal.Id);
            db.Deal.Remove(tr);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
