using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using BLL;
using Entidades.Vistas;

namespace webSignusL.Servicios
{
    /// <summary>
    /// Descripción breve de wsSignusFacade
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsSignusFacade : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public DateTime GetCalcularFechaVencimiento(DateTime FechaSuscripcion)
        {
            SignusFacade osig = new SignusFacade();
            return osig.CalcularFechaVencimiento(FechaSuscripcion);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vSL_LIQESTAMPILLAS GetLiquidacionTotal(DateTime FechaVen, string Username, decimal VAL_BAS)
        {
            BLL.SignusFacade.ParametrosLiq o = new SignusFacade.ParametrosLiq();
            o.Fecha_Lim = FechaVen;
            o.UserName = Username;
            o.Val_Base = VAL_BAS;

            SignusFacade osig = new SignusFacade();
            vSL_LIQESTAMPILLAS liq = osig.Liquidacion(o);

            return liq;
        }
    }
}
