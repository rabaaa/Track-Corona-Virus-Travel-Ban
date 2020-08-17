using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CovidUpdate1.Controllers
{
    public class TravelController : Controller
    {
        // GET: Travel
        WebApiEntities db = new WebApiEntities();
        public ActionResult Index(string searching)
        {
            var travels = from t in db.Travels
                          select t;
            if (!String.IsNullOrEmpty(searching))
            {
                travels = travels.Where(t => t.Location.Contains(searching));
            }
            
            return View(travels.ToList());
        }
    }
}