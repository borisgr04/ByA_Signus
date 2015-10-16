using BLL;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiMovil.Controllers
{
    [RoutePrefix("api/Agentes")]
    public class AgentesRecaudadoresController : ApiController
    {
        [Route("Filtro/{cadena}")]
        public List<vTerceros> GetFiltroContain(string cadena)
        {
            mTerceros o = new mTerceros();
            return o.GetFiltroContain(cadena);
        }
    }
}
