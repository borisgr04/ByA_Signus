using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entidades.Vistas
{
    public class vBASES_LIQ
    {
        public int BALI_NRAD { get; set; }
        public string BALI_NIT { get; set; }
        public string BALI_CDEC { get; set; }
        public string BALI_AÑO { get; set; }
        public string BALI_PERI { get; set; }
        public string BALI_ARCH { get; set; }
        public string BALI_EST { get; set; }
        public string BALI_USAP { get; set; }
        public string BALI_USBD { get; set; }
        public Nullable<System.DateTime> BALI_FESI { get; set; }
        public Nullable<System.DateTime> BALI_FECH { get; set; }
        public string BALI_FDCO { get; set; }
        public Nullable<System.DateTime> BALI_FREG { get; set; }
        public Nullable<System.DateTime> BALI_FNOV { get; set; }

        public virtual List<vFM_BASESLIQ01> FM_BASESLIQ01 { get; set; }
    }
}
