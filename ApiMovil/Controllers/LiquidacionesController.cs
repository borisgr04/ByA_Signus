using BLL;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace ApiMovil.Controllers
{
    [RoutePrefix("api/Liquidaciones")]
    public class LiquidacionesController : ApiController
    {
        [Route("Entero")]
        public List<ConsultaXAgenteDto> Get()
        {
            mCONSULTA o = new mCONSULTA();
            return o.ConsultaXAgente("824001624", "40", "2015");
        }

        [Route("{ID}")]
        public vSL_LIQESTAMPILLAS GetLiquidacion(decimal ID)
        {
            mSL_LIQESTAMPILLAS oSL = new mSL_LIQESTAMPILLAS();
            return oSL.Get(ID);
        }
    }
}
