using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class ConsultaXAgenteDto
    {
        public string VIGENCIA { get; set; }
        public string PERIODO { get; set; }
        public Nullable<DateTime> VENCIMIENTO { get; set; }
        public Nullable<DateTime> FECHACARGUE { get; set; }
        public string ESTADO { get; set; }
        public Nullable<decimal> VALOR { get; set; }
        public Nullable<DateTime> FECHAPAGO { get; set; }
        public string ESTADOFINAN { get; set; }
        public string ACCION { get; set; }
        public string DEC_COD { get; set; }
    }
}
