using BLL;
using Entidades;
using Entidades.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace ApiMovil.Controllers
{
    [RoutePrefix("api/Seguridad")]
    public class SeguridadController : ApiController
    {
        [Route("Login")]
        public bool PostLogin(USUARIOS_DTO Usuario)
        {
            mTerceros oter = new mTerceros();
            vTerceros Tercero = oter.GetTercerobyId(Usuario.USERNAME);
            if((Tercero != null) && (Tercero.TER_TUS == "RT")){
                return Membership.ValidateUser(Usuario.USERNAME, Usuario.PASSWORD);
            }else return false;     
        }
    }
}
