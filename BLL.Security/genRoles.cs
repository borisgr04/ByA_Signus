﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ByA;
using DAL;
using Entidades;
using System.Web.Security;

namespace BLL.Security
{
    public class genRoles
    {
     
        public static string _ADMIN = "admin";
        public string GenerarRoles()
        {
            using (Entities ctx = new Entities())
            {
                string strrole = "";
                List<MENU> lm = ctx.MENU.OrderBy(t=> t.POSICION).OrderBy(t=> t.MENUID) .ToList();
                foreach (MENU im in lm)
                {
                    string rol = im.ROLES;
                    if (!String.IsNullOrEmpty(rol) && (!Roles.RoleExists(rol)))
                    {
                        Roles.CreateRole(rol);
                        Roles.AddUserToRole(_ADMIN, rol);
                        strrole = strrole + rol + "<br>";
                    }
                    else if (!String.IsNullOrEmpty(rol) && (Roles.RoleExists(rol)) && (!Roles.IsUserInRole(_ADMIN, rol)))
                    {
                        Roles.AddUserToRole(_ADMIN, rol);
                        strrole = strrole + rol + "<br>";
                    }
                }
                return strrole;
            }

        }

    }
}
