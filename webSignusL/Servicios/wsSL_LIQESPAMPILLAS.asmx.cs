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
    /// Descripción breve de wsSL_LIQESPAMPILLAS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsSL_LIQESPAMPILLAS : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vSL_LIQESTAMPILLAS Get(decimal ID)
        {
            mSL_LIQESTAMPILLAS oSL = new mSL_LIQESTAMPILLAS();
            return oSL.Get(ID);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vSL_LIQESTAMPILLAS> Gets(string VIGENCIA, string AGENTE, string PERIODO)
        {
            mSL_LIQESTAMPILLAS o = new mSL_LIQESTAMPILLAS();
            return o.Gets(VIGENCIA, AGENTE, PERIODO);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<vSL_LIQESTAMPILLAS> GetsPagadas(string VIGENCIA, string AGENTE, string PERIODO)
        {
            mSL_LIQESTAMPILLAS o = new mSL_LIQESTAMPILLAS();
            return o.GetsPagadas(VIGENCIA, AGENTE, PERIODO);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vSL_LIQESTAMPILLAS Get2(decimal NRO_LIQ, string VIGENCIA)
        {
            mSL_LIQESTAMPILLAS oSL = new mSL_LIQESTAMPILLAS();
            return oSL.Get(NRO_LIQ, VIGENCIA);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ByARpt Insert(vSL_LIQESTAMPILLAS Reg)
        {
            Reg.USUARIO = Usuario.UserName;
            mSL_LIQESTAMPILLAS oSL = new mSL_LIQESTAMPILLAS();
            return oSL.Insert(Reg);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public ByARpt CancelarLiquidacion(decimal ID_LIQ)
        {
            mSL_LIQESTAMPILLAS oSL = new mSL_LIQESTAMPILLAS();
            return oSL.CancelarLiquidacion(ID_LIQ);
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public vCONSOLTA_COMPLETA ConsultaLE(string Vigencia, string Periodo, string AgenteRecaudador)
        {
            mSL_LIQESTAMPILLAS osl = new mSL_LIQESTAMPILLAS();
            return osl.ConsultaLE(Vigencia, Periodo, AgenteRecaudador);
        }

    }
}
