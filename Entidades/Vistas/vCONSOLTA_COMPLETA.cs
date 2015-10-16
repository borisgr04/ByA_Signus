using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vCONSOLTA_COMPLETA
    {
        public DateTime FECHA_VENCIMIENTO { get; set; }
        public string ESTADO { get; set; }
        public List<vCONSULTALE> CONSULTA { get; set; }
    }
}
