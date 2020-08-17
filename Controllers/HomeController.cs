using CovidUpdate1.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CovidUpdate1.Controllers
{
    [DataContract]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            List<Idata> countries = null;
            var url = "https://www.trackcorona.live/api/travel";
            var syncClient = new WebClient();
            var data = syncClient.DownloadString(url);
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Covid));
            using (var m = new MemoryStream(Encoding.Unicode.GetBytes(data)))
            {
                var covidUpdate1 = (Covid)serializer.ReadObject(m);
                countries = covidUpdate1.data;

            }




            return View(countries.ToList());
        }

      
    
    public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}