using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vSL_LIQESTAMPILLAS
    {
        public decimal ID { get; set; }
        public string AGE_REC { get; set; }
        public Nullable<short> VIG_LIQ { get; set; }
        public Nullable<int> NRO_LIQ { get; set; }
        public string PER_LIQ { get; set; }
        public Nullable<System.DateTime> FEC_LIQ { get; set; }
        public string TER_NIT { get; set; }
        public string NUM_CTO { get; set; }
        public Nullable<System.DateTime> FEC_SUS { get; set; }
        public Nullable<System.DateTime> FEC_VEN { get; set; }
        public string ADI_CTO { get; set; }
        public string OBJ_CTO { get; set; }
        public Nullable<decimal> VAL_CTO { get; set; }
        public Nullable<decimal> VAL_BAS { get; set; }
        public string OBS_LIQ { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USUARIO { get; set; }
        public Nullable<decimal> SUB_TOT { get; set; }
        public Nullable<decimal> INTERES { get; set; }
        public Nullable<decimal> SANCION { get; set; }
        public Nullable<decimal> DECUENT { get; set; }
        public Nullable<decimal> TOTAL { get; set; }
        public string ESTADO { get; set; }
        public string NOM_ESTADO { get; set; }
        public string REPLICADO { get; set; }

        public DateTime FechaPago { get; set; }
        public string NOM_TER { get; set; }
        public string NOM_AGE { get; set; }

        public List<vSL_DETLIQ> lDetallesLiquidacion { get; set; }
    }
}
