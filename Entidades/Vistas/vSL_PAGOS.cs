using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vSL_PAGOS
    {
        public decimal ID { get; set; }
        public Nullable<decimal> ID_LIQ { get; set; }
        public Nullable<System.DateTime> FEC_PAGO { get; set; }
        public Nullable<decimal> VAL_PAGO { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USUARIO { get; set; }
        public string ESTADO { get; set; }
    }
}
