using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using FastMember;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using RentProperty.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    public class PropobjController : Controller
    {
        private RentPropertyContext db = new RentPropertyContext();

        [HttpGet("[action]")]
        public IEnumerable<Propobj> allobjec()
        {
            return db.Propobj
                .Include(d => d.DistrictNavigation)
                .Include(t => t.TyppeNavigation)
                .Include(c => c.ClientNavigation)
                .Include(r => r.RealtorNavigation)
                .ToList();
        }

        [HttpPost("[action]")]
        public void newpropobj([FromBody]Propobj propobj)
        {
            db.Propobj.Add(propobj);
            db.SaveChanges();
        }

        [HttpGet("[action]")]
        public Propobj getpropobj(int id)
        {
            return db.Propobj.Include(d => d.DistrictNavigation)
                .Include(t => t.TyppeNavigation)
                .Include(c => c.ClientNavigation)
                .Include(r => r.RealtorNavigation).Where(c => c.Id == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> editpropobj([FromBody]Propobj propobj)
        {
            var po = getpropobj(propobj.Id);
            po.Apartment = propobj.Apartment;
            po.Area = propobj.Area;
            po.Client = propobj.Client;
            po.District = propobj.District;
            po.Floor = propobj.Floor;
            po.Floorscount = propobj.Floorscount;
            po.House = propobj.House;
            po.Pdescr = propobj.Pdescr;
            po.Price = propobj.Price;
            po.Realtor = propobj.Realtor;
            po.Roomscount = propobj.Roomscount;
            po.Street = propobj.Street;
            po.Typpe = propobj.Typpe;

            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> deletepropobj([FromBody]Propobj propobj)
        {
            Propobj tr = getpropobj(propobj.Id);
            db.Propobj.Remove(tr);
            await db.SaveChangesAsync();
            return Ok();
        }

        public class Export
        {
            public int id { get; set; }
            public string street { get; set; }
            public string house { get; set; }
            public int? apartment { get; set; }
            public int? roomscount { get; set; }
            public decimal area { get; set; }
            public int floorscount { get; set; }
            public decimal price { get; set; }
            public string pdescr { get; set; }
            public string district { get; set; }
            public string type { get; set; }
            public string client { get; set; }
            public string realtor { get; set; }
        }

        [HttpGet("[action]")]
        public IActionResult ExportExcel()
        {
            //var state = JObject.Parse(contracts);
            var propobjs = allobjec();


            DataTable dt = new DataTable();
            using (var reader = ObjectReader.Create(propobjs))
            {
                dt.Load(reader);
            }

            DataTable dt_res = new DataTable();
            dt_res.Columns.Add("№");
            dt_res.Columns.Add("Тип");
            dt_res.Columns.Add("Район");
            dt_res.Columns.Add("Улица");
            dt_res.Columns.Add("Дом");
            dt_res.Columns.Add("Квартира");
            dt_res.Columns.Add("Кол-во комнат");
            dt_res.Columns.Add("Этаж");
            dt_res.Columns.Add("Площадь");
            dt_res.Columns.Add("Кол-во этажей");
            dt_res.Columns.Add("Стоимость (мес.)");
            dt_res.Columns.Add("Описание");              
            dt_res.Columns.Add("Владелец");
            dt_res.Columns.Add("Риэлтор");
            for(int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow dr = dt.Rows[i];
                DataRow row = dt_res.NewRow();

                Client cl = (Client)dr[3];
                District dis = (District)dr[6];
                Realtor real = (Realtor)dr[14];
                Typpe tp = (Typpe)dr[18];

                row["№"] = dr["id"];                
                row["Тип"] = tp.Tname;
                row["Район"] = dis.Dname;
                row["Улица"] = dr["street"];
                row["Дом"] = dr["house"];
                row["Квартира"] = dr["apartment"];
                row["Кол-во комнат"] = dr["roomscount"];
                row["Этаж"] = dr["floor"];
                row["Площадь"] = dr["area"];
                row["Кол-во этажей"] = dr["floorscount"];
                row["Стоимость (мес.)"] = dr["price"];
                row["Описание"] = dr["pdescr"];
                row["Владелец"] = cl.Fullname;
                row["Риэлтор"] = real.Fullname;

                dt_res.Rows.Add(row);
            }
      

            byte[] fileContents;
            using (var package = new ExcelPackage())
            {
                var workSheet = package.Workbook.Worksheets.Add("Объекты");
                workSheet.Cells["A1"].LoadFromDataTable(dt_res, true);
                workSheet.Cells[1, 1, 20, 20].AutoFitColumns();
                workSheet.Cells[1, 1, 1, 20].Style.Font.Bold = true;
                fileContents = package.GetAsByteArray();
            }
            if (fileContents == null || fileContents.Length == 0)
            {
                return null;
            }
            return File(
                fileContents: fileContents,
                contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileDownloadName: "Objects.xlsx"
                );
        }

    }
}
