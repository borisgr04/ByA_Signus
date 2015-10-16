using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vFM_BASESLIQ01
    {
        public long NIT_AR { get; set; }
        public short DV_AR { get; set; }
        public string CDEC { get; set; }
        public string IMPTO { get; set; }
        public string AGRAVABLE { get; set; }
        public string PGRAVABLE { get; set; }
        public long NDOC { get; set; }
        public System.DateTime FOPER { get; set; }
        public string TIDE { get; set; }
        public long NIDE { get; set; }
        public Nullable<short> DV { get; set; }
        public string RAZSOC { get; set; }
        public string CONCEPTO { get; set; }
        public decimal VALORBASE { get; set; }
        public decimal TARIFA { get; set; }
        public decimal VALORIMPTO { get; set; }
        public int NRO_RAD { get; set; }
        public string USAP { get; set; }
        public string USBD { get; set; }
        public System.DateTime FESI { get; set; }
        public Nullable<System.DateTime> FREG { get; set; }
        public Nullable<System.DateTime> FNOV { get; set; }
        public string COD_MPIO { get; set; }
    }
}
