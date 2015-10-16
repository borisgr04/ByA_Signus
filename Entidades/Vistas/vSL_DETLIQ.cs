using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vSL_DETLIQ
    {
        public decimal ID { get; set; }
        public Nullable<decimal> ID_LIQ { get; set; }
        public string COD_IMP { get; set; }
        public string NOM_IMP { get; set; }
        public Nullable<decimal> TAR_IMP { get; set; }
        public Nullable<decimal> VAL_BAS { get; set; }
        public Nullable<decimal> VAL_IMP { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USUARIO { get; set; }
    }
}
