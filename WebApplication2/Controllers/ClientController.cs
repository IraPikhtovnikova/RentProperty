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
    public class ClientController : Controller
    {
        private RentPropertyContext db = new RentPropertyContext();

        [HttpGet("[action]")]
        public IEnumerable<Client> allclients()
        {
            return db.Client.ToList();
        }

        [HttpGet("[action]")]
        public Client getclient(int id)
        {
            return db.Client.Where(c => c.Id == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        public void newclient([FromBody]Client client)
        {
            db.Client.Add(client);
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> editclient([FromBody]Client client)
        {
            var cl = db.Client
                .Where(x => x.Id == client.Id)
                .FirstOrDefault();
            cl.Fullname = client.Fullname;
            cl.Passport = client.Passport;
            cl.Phone = client.Phone;
            cl.Email = client.Email;

            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> deleteclient([FromBody]Client client)
        {
            Client tr = getclient(client.Id);
            db.Client.Remove(tr);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
