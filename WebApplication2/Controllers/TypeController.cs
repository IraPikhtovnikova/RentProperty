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
    public class TypeController : Controller
    {
        private RentPropertyContext db = new RentPropertyContext();

        [HttpGet("[action]")]
        public IEnumerable<Typpe> alltypes()
        {
            return db.Typpe.ToList();
        }

        [HttpGet("[action]")]
        public Typpe gettype(int id)
        {
            return db.Typpe.Where(t => t.Id == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        public void newtype([FromBody]Typpe typpe)
        {
            db.Typpe.Add(typpe);
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> edittype([FromBody]Typpe typpe)
        {
            var tp = gettype(typpe.Id);
            tp.Tname = typpe.Tname;
            tp.Tdescr = typpe.Tdescr;

            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> deletetype([FromBody]Typpe typpe)
        {
            Typpe tr = gettype(typpe.Id);
            db.Typpe.Remove(tr);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
