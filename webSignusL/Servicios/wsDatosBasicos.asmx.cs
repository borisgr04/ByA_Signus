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

namespace Sircc4.Servicios
{
    /// <summary>
    /// Summary description for wsDatosBasicos
    /// </summary>
    [WebService(Namespace = "http://www.byasystems.com.co/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class wsDatosBasicos : System.Web.Services.WebService
    {
        DatosBasicosBLL ep = new DatosBasicosBLL();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IList<vVIGENCIAS> GetvVigencias()
        {
            return ep.GetvVIGENCIAS();
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vTDOC_IDE> GetTiposDocumentos()
        {
            DatosBasicosBLL oDB = new DatosBasicosBLL();
            return oDB.GetTiposDocumentos();
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vSL_TIPOPER> GetTiposPersona()
        {
            DatosBasicosBLL oDB = new DatosBasicosBLL();
            return oDB.GetTiposPersona();
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vSL_TIPORGM> GetTiposRegimen()
        {
            DatosBasicosBLL oDB = new DatosBasicosBLL();
            return oDB.GetTiposRegimen();
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vMUNICIPIOS> GetCiudadesDepartamento(string ID_DEP)
        {
            DatosBasicosBLL oDB = new DatosBasicosBLL();
            return oDB.GetCiudadesDepartamento(ID_DEP);
        }
    }
}
