//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class SL_DETLIQ
    {
        public decimal ID { get; set; }
        public Nullable<decimal> ID_LIQ { get; set; }
        public string COD_IMP { get; set; }
        public Nullable<decimal> TAR_IMP { get; set; }
        public Nullable<decimal> VAL_BAS { get; set; }
        public Nullable<System.DateTime> FEC_REG { get; set; }
        public string USUARIO { get; set; }
    
        public virtual SL_LIQESTAMPILLAS SL_LIQESTAMPILLAS { get; set; }
    }
}
