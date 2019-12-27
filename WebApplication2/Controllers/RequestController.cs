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
    public class RequestController : Controller
    {
        private RentPropertyContext db = new RentPropertyContext();

        [HttpGet("[action]")]
        public IEnumerable<Request> allreques()
        {
            return db.Request
                .Include(d => d.DistrictNavigation)
                .Include(c => c.ClientNavigation)
                .Include(t => t.TyppeNavigation)
                .Include(r => r.RealtorNavigation)
                .Include(s => s.StatusNavigation).ToList();
        }

        [HttpGet("[action]")]
        public Request getrequest(int id)
        {
            return db.Request
                .Include(d => d.DistrictNavigation)
                .Include(c => c.ClientNavigation)
                .Include(t => t.TyppeNavigation)
                .Include(r => r.RealtorNavigation)
                .Include(s => s.StatusNavigation).Where(c => c.Id == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        public void newrequest([FromBody]Request request)
        {
            db.Request.Add(request);
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> editrequest([FromBody]Request request)
        {
            var cl = getrequest(request.Id);
            cl.Pricemin = request.Pricemin;
            cl.Pricemax = request.Pricemax;
            cl.Areamax = request.Areamax;
            cl.Areamin = request.Areamin;
            cl.Roomscountmax = request.Roomscountmax;
            cl.Roomscountmin = request.Roomscountmin;
            cl.Floormax = request.Floormax;
            cl.Floormin = request.Floormin;
            cl.Floorscountmax = request.Floorscountmax;
            cl.Floorscountmin = request.Floorscountmin;
            cl.Status = request.Status;
            cl.Client = request.Client;
            cl.District = request.District;
            cl.Realtor = request.Realtor;
            cl.Typpe = request.Typpe;

            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> deleterequest([FromBody]Request request)
        {
            Request tr = getrequest(request.Id);
            db.Request.Remove(tr);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
