using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ByA;
using Entidades;
using DAL;
using Entidades.Security;
using System.Web.Security;


namespace BLL.Security
{
    public class gesUsuarios
    {
        Entities ctx;
        ByARpt byaRpt = new ByARpt();

        //public DateTime GetUsuarios(string usuario)
        //{
        //    DateTime ultAct = ctx.ORA_ASPNET_USERS.Select(t => t.LASTACTIVITYDATE).FirstOrDefault();
        //    return ultAct;
        //}
        public List<USUARIOS_DTO> GetUsuarios(string filtro)
        {
            List<USUARIOS_DTO> lst = new List<USUARIOS_DTO>();
            List<USUARIOS_DTO> lstF = new List<USUARIOS_DTO>();
            ctx = new Entities();
            
                List<ORA_ASPNET_MEMBERSHIP> lstO = ctx.ORA_ASPNET_MEMBERSHIP.ToList();
                Mapper.CreateMap<ORA_ASPNET_MEMBERSHIP, USUARIOS_DTO>();
                Mapper.Map(lstO, lst);
                foreach (ORA_ASPNET_MEMBERSHIP item in lstO)
                {
                    USUARIOS_DTO itemDTO = new USUARIOS_DTO();
                    ORA_ASPNET_USERS user = ctx.ORA_ASPNET_USERS.Where(t => t.USERID == item.USERID).FirstOrDefault();
                    itemDTO.USERNAME = user.USERNAME;
                    itemDTO.LASTACTIVITYDATE = user.LASTACTIVITYDATE;
                    itemDTO.TERCERO = GetTercero(user.USERNAME);
                    if (itemDTO.USERNAME.Contains(filtro) || itemDTO.TERCERO.ToUpper().Contains(filtro.ToUpper()))
                    {
                    Mapper.Map(item, itemDTO);
                    lstF.Add(itemDTO);
                    }
                    
                }
            //lstF=lst.Where(u=>u.USERNAME.Contains(filtro) || u.TERCERO.ToUpper().Contains(filtro.ToUpper())).ToList();
            return lstF.OrderBy(t => t.LASTACTIVITYDATE).ToList();
                
            
        }
        
            
        private string GetTercero(string username)
        {
            string nomter = "";
            TERCEROS t = ctx.TERCEROS.Where(ter => ter.TER_NIT == username).FirstOrDefault();
            if (t != null)
            {
                nomter=(t.TER_NOM).Trim();
            }
            return nomter;
        }

        public List<ModuloRoles> GetRoles(string Modulo,string UserName)
        {
            ctx = new Entities();

            List<ModuloRoles> lm = ctx.MENU.Where(t => t.MODULO == Modulo && t.MENUID!= t.PADREID).OrderBy(t=>t.POSICION)
                .Select(t => new ModuloRoles
                {
                    Modulo = t.MODULO,
                    Roles = t.ROLES,
                  Titulo = t.TITULO
                }).Distinct().ToList();
            foreach (ModuloRoles item in lm)
            {
                item.hasRol = Roles.IsUserInRole(UserName, item.Roles);
            }
            return lm;
        }

        public ByARpt GuardarRoles(List<ModuloRoles> lst, string UserName)
        {
            string msg = "";
            
                foreach (ModuloRoles item in lst)
                {
                    bool hasRoolAnt = Roles.IsUserInRole(UserName, item.Roles);
                    if (item.hasRol != hasRoolAnt)//Si cambio
                    {
                        try { 
                             if (item.hasRol)
                             {
                                Roles.AddUserToRole(UserName, item.Roles);
                                msg += String.Format("Se Asignó el Rol {0} - [ {1} ]</br>", item.Titulo, item.Roles);
                             }
                             else {
                                Roles.RemoveUserFromRole(UserName, item.Roles);
                                msg += String.Format("Se Retiró el Rol {0} - [ {1} ]</br>", item.Titulo, item.Roles);
                              }
                        }
                        catch (Exception ex)
                        {
                            msg = ex.Message;
                            
                        }
                    }
                }
                if (String.IsNullOrEmpty(msg))
                {
                    byaRpt.Mensaje =  "No realizó ningun cambio de Roles al usuario";
                }
                else {
                    byaRpt.Mensaje = msg;
                }
                
                byaRpt.Error = false;
            //GuardarRolesUsuarios
            return byaRpt;
        }

        public List<ListBoxJq> GetRolesLB(string Modulo)
        {
            ctx = new Entities();

            List<ListBoxJq> lm = ctx.MENU.Where(t => t.MODULO == Modulo)
                .Select(t => new ListBoxJq
                { group = t.MODULO,
                    value = t.ROLES,
                  label = t.TITULO,
                  
                }).Distinct().ToList();
            foreach(ListBoxJq item in lm){
                item.hasRol = Roles.IsUserInRole("admin", item.value);
            }
            
            return lm;
        }
        
        public ByARpt ActivarUsuario(USUARIOS_DTO Reg) {
            try
            {
                MembershipUser usr = Membership.GetUser(Reg.USERNAME);
                usr.IsApproved = true;
                Membership.UpdateUser(usr);
                byaRpt.Error = false;
                byaRpt.Mensaje = "Se Activo el usuario";
            }
            catch(Exception ex) {
                byaRpt.Error = true;
                byaRpt.Mensaje = ex.Message;
            }
            return byaRpt;
            
        }

        public ByARpt Forzar_Cambio_Clave(USUARIOS_DTO Reg)
        {
	        try {
                string rst = Membership.GetUser(Reg.USERNAME).ResetPassword();
                Membership.GetUser(Reg.USERNAME).ChangePassword(rst, Reg.PASSWORD);
                byaRpt.Mensaje = "Se realizó el cambio de contraseña";
                byaRpt.Error = false;
	        } catch (Exception ex) {
                byaRpt.Mensaje = "Error de App:" + ex.Message;
                byaRpt.Error = true;
	        } 

            return byaRpt;
        }

        public ByARpt InactivarUsuario(USUARIOS_DTO Reg) {
            try
            {
                MembershipUser usr = Membership.GetUser(Reg.USERNAME);
                usr.IsApproved = false;
                Membership.UpdateUser(usr);
                byaRpt.Error = false;
                byaRpt.Mensaje = "Se Inactivo el usuario";
            }
            catch (Exception ex)
            {
                byaRpt.Error = true;
                byaRpt.Mensaje = ex.Message;
            }
            return byaRpt;
        }

        public ByARpt DesbloquearUsuario(USUARIOS_DTO Reg) {
            
            try
            {
                Membership.GetUser(Reg.USERNAME).UnlockUser();
                byaRpt.Error = false;
                byaRpt.Mensaje = "Se desbloqueo el usuario";
            }
            catch (Exception ex)
            {
                byaRpt.Error = true;
                byaRpt.Mensaje = ex.Message;
            }
            return byaRpt;
        }

        public List<USUARIOS_DTO> GetUsuariosEnLinea()
        {
            List<USUARIOS_DTO> lst = new List<USUARIOS_DTO>();
            
            ctx = new Entities();

            List<ORA_ASPNET_MEMBERSHIP> lstO = ctx.ORA_ASPNET_MEMBERSHIP.ToList();
            Mapper.CreateMap<ORA_ASPNET_MEMBERSHIP, USUARIOS_DTO>();
                
            foreach(ORA_ASPNET_MEMBERSHIP item in lstO){
                USUARIOS_DTO itemDTO = new USUARIOS_DTO();
                ORA_ASPNET_USERS user = ctx.ORA_ASPNET_USERS.Where(t => t.USERID== item.USERID).FirstOrDefault();
                itemDTO.USERNAME = user.USERNAME;
                itemDTO.LASTACTIVITYDATE = user.LASTACTIVITYDATE;
                itemDTO.TERCERO = GetTercero(user.USERNAME);
                if (Membership.GetUser(itemDTO.USERNAME).IsOnline)
                {
                    Mapper.Map(item, itemDTO);
                    lst.Add(itemDTO);
                }
            }
            return lst.OrderBy(t => t.LASTACTIVITYDATE).ToList();

        }

        public ByARpt InsUsuarios(USUARIOS_DTO Reg) { 
            MembershipCreateStatus status=default(MembershipCreateStatus);
            string Msg="";
            try
            {
                Membership.CreateUser(Reg.USERNAME, Reg.PASSWORD);
                switch (status) {
                        case MembershipCreateStatus.DuplicateEmail:
                                Msg = Msg + "Correo Eléctronico Duplicado";
                                break;
                        case MembershipCreateStatus.DuplicateProviderUserKey:
                                Msg = Msg + "Duplicado User Key";
                                break;
                        case MembershipCreateStatus.DuplicateUserName:
                                Msg = Msg + "Duplicado Nombre de Usuario (Username)";
                                break;
                        case MembershipCreateStatus.InvalidAnswer:
                                Msg = Msg + "Respuesta Inválida";
                                break;
                        case MembershipCreateStatus.InvalidEmail:
                                Msg = Msg + "Correo Electrónico Inválido";
                                break;
                        case MembershipCreateStatus.InvalidPassword:
                                Msg = Msg + "Contraseña Inválida";
                                break;
                        case MembershipCreateStatus.InvalidProviderUserKey:
                                Msg = Msg + "Provider User Key Inválido ";
                                break;
                        case MembershipCreateStatus.InvalidQuestion:
                                Msg = Msg + "Pregunta Iválida";
                                break;
                        case MembershipCreateStatus.InvalidUserName:
                                Msg = Msg + "Nombre de Usuario (Username) Inválido";
                                break;
                        case MembershipCreateStatus.ProviderError:
                                Msg = Msg + "Nombre de Usuario (Username) Inválido";
                                break;
                        case MembershipCreateStatus.Success:
                                byaRpt.Error = false;
                                Msg = "Se creo el Usuario ID [" + Reg.USERNAME + "]";
                                break;
                        case MembershipCreateStatus.UserRejected:
                                Msg = Msg + "Error: UserRejected en el Proveedor";
                                break;
                }
                byaRpt.Mensaje = Msg;                
            }
            catch (Exception ex)
            {
                Msg = ex.Message;
                byaRpt.Error = true;
                byaRpt.Mensaje =Msg;
                return byaRpt;
            }
            return byaRpt;
        }
        

    }

}
