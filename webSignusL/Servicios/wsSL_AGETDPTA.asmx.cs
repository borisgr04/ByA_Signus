using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using BLL;
using Sircc4.Clases;
using Entidades;
using Entidades.Vistas;
using ByA;

namespace webSignusL.Servicios
{
    /// <summary>
    /// Descripción breve de wsSL_AGETDPTA
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsSL_AGETDPTA : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vSL_AGETDPTA> Gets()
        {
            mSL_AGETDPTA oSL_AGETDPTA = new mSL_AGETDPTA();
            return oSL_AGETDPTA.Gets();
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vSL_AGETDPTA Reg)
        {
            mSL_AGETDPTA oSL_AGETDPTA = new mSL_AGETDPTA();
            return oSL_AGETDPTA.Insert(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Delete(vSL_AGETDPTA Reg)
        {
            mSL_AGETDPTA oSL_AGETDPTA = new mSL_AGETDPTA();
            return oSL_AGETDPTA.Delete(Reg);
        }
    }
}
