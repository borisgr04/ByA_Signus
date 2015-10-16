using BLL;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiMovil.Controllers
{
    [RoutePrefix("api/Consultas")]
    public class ConsultasController : ApiController
    {
        [Route("ConsultaXAgente/{Nit}/{ClaDec}/{Vig}")]
        public List<ConsultaXAgenteDto> Gets(string Nit, string ClaDec, string Vig)
        {
            mCONSULTA o = new mCONSULTA();
            return o.ConsultaXAgente(Nit, ClaDec, Vig);
        }
    }
}
