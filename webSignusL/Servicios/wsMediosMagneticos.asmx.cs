using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using BLL;
using BLL.MediosMagneticos;
using Entidades.Vistas;
using ByA;

namespace webSignusL.Servicios
{
    /// <summary>
    /// Descripción breve de wsMediosMagneticos
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsMediosMagneticos : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(string Periodo, string Vigencia, string AgenteRecaudador)
        {            
            MediosMagneticosBLL oMMG = new MediosMagneticosBLL();

            return oMMG.Insert(Periodo, Vigencia, AgenteRecaudador);
        }
    }
}
