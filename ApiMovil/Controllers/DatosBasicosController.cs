using BLL;
using Entidades;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiMovil.Controllers
{
    [RoutePrefix("api/DatosBasicos")]
    public class DatosBasicosController : ApiController
    {
        [Route("Vigencias")]
        public List<vVIGENCIAS> GetS()
        {
            VigenciasBLL o = new VigenciasBLL();
            return o.Gets();
        }
    }
}
