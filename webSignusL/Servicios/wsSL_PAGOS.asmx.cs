using BLL;
using ByA;
using Entidades.Vistas;
using Sircc4.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace webSignusL.Servicios
{
    /// <summary>
    /// Descripción breve de wsSL_PAGOS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsSL_PAGOS : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vSL_PAGOS Reg)
        {
            Reg.USUARIO = Usuario.UserName;
            mSL_PAGOS oSL = new mSL_PAGOS();
            return oSL.Insert(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public ByARpt CancelarPago(decimal ID_LIQ)
        {
            mSL_PAGOS oSL = new mSL_PAGOS();
            return oSL.CancelarPago(ID_LIQ);
        }
    }
}
