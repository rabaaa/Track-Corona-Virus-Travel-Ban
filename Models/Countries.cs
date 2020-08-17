using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace CovidUpdate1.Models
{
    public class Idata
    {
    

        [DataMember]
        public string location { get; set; }
        
        [DataMember]
        public string data { get; set; }

    }
}