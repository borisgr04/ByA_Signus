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
    /// Descripción breve de wsTerceros
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsTerceros : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vTerceros Get(string IDE_TER)
        {
            if (IDE_TER == "admin")
            {
                vTerceros t = new vTerceros();
                t.TER_NIT = "admin";
                t.TER_NOM = "ADMINISTRADOR";
                return t;
            }
            else
            {
                mTerceros oTerceros = new mTerceros();
                return oTerceros.GetTercerobyId(IDE_TER);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
        public string GetsAll()
        {
            mTerceros o = new mTerceros();
            return ByAUtil.convertListToXML(o.GetsAll());
        }
    }
}
