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
    /// Descripción breve de wsSL_TERCEROS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsSL_TERCEROS : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vSL_TERCEROS Get(string IDE_TER)
        {
            mSL_TERCEROS oSL_TERCEROS = new mSL_TERCEROS();
            return oSL_TERCEROS.Get(IDE_TER);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt InsertOrUpdate(vSL_TERCEROS Reg)
        {
            Reg.USUARIO = Usuario.UserName;
            mSL_TERCEROS oSL_TERCEROS = new mSL_TERCEROS();
            return oSL_TERCEROS.InsertOrUpdate(Reg);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public int EnvioImagen(byte[] img)
        {
            return img.Count();
        }
    }
}
