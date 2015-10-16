using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;
using Entidades;
using Entidades;
using DAL;
using AutoMapper;
using Entidades.Vistas;

namespace BLL
{
    public class mDIRECCIONES
    {
        Entities ctx;
        public mDIRECCIONES()
        {
            Mapper.CreateMap<vDIRECCIONES_EXTERNAS, DIRECCIONES_EXTERNAS>();
            Mapper.CreateMap<DIRECCIONES_EXTERNAS, vDIRECCIONES_EXTERNAS>();
        }
        public vDIRECCIONES_EXTERNAS Get(decimal ID)
        {
            using (ctx = new Entities())
            {
                vDIRECCIONES_EXTERNAS r = new vDIRECCIONES_EXTERNAS();
                DIRECCIONES_EXTERNAS o = ctx.DIRECCIONES_EXTERNAS.Where(t => t.ID == ID).FirstOrDefault();
                Mapper.Map(o, r);
                return r;
            }
        }
    }
}
