using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades
{
    public class vVIGENCIAS
    {
        public string YEAR_VIG { get; set; }
        public System.DateTime FEC_INI_VIG { get; set; }
        public Nullable<System.DateTime> FEC_FIN_VIG { get; set; }
        public short POR_ADI_VIG { get; set; }
        public string EST_VIG { get; set; }
        public string RAD_AUT { get; set; }

        public string VIG_COD { get; set; }
        public System.DateTime VIG_FINI { get; set; }
        public Nullable<System.DateTime> VIG_FFIN { get; set; }
        public string VIG_EST { get; set; }
        public string VIG_USAP { get; set; }
        public string VIG_USBD { get; set; }
        public Nullable<System.DateTime> VIG_FREG { get; set; }
        public Nullable<System.DateTime> VIG_FNOV { get; set; }
    }
}
