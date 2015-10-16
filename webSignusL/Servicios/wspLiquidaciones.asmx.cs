using BLL;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace webSignusL.Servicios
{
    /// <summary>
    /// Descripción breve de wspLiquidaciones
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wspLiquidaciones : System.Web.Services.WebService
    {
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public vSL_LIQESTAMPILLAS Get(string ID)
        {
            mSL_LIQESTAMPILLAS oSL = new mSL_LIQESTAMPILLAS();
            return oSL.Get(decimal.Parse(ID));
        }
    }
}
