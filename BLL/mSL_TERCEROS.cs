using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;
using Entidades;
using DAL;
using AutoMapper;
using Entidades.Vistas;

namespace BLL
{
    public class mSL_TERCEROS
    {
        Entities ctx;
        public mSL_TERCEROS()
        {
            Mapper.CreateMap<SL_TERCEROS, vSL_TERCEROS>();
            Mapper.CreateMap<vSL_TERCEROS, SL_TERCEROS>();
        }
        public vSL_TERCEROS Get(string IDE_TER)
        {
            using (ctx = new Entities())
            {            
                vSL_TERCEROS rTer = new vSL_TERCEROS();
                SL_TERCEROS Ter = ctx.SL_TERCEROS.Where(t => t.TER_NIT == IDE_TER).FirstOrDefault();
                if (Ter != null) Mapper.Map(Ter, rTer);
                else return null;
                return rTer;
            }
        }
        public ByARpt InsertOrUpdate(vSL_TERCEROS Reg)
        {
            using (ctx = new Entities())
            {
                SL_TERCEROS Ter = ctx.SL_TERCEROS.Where(t => t.TER_NIT == Reg.TER_NIT).FirstOrDefault();
                if (Ter == null) return Insert(Reg);
                else return Update(Reg);
            }
        }
        public ByARpt Insert(vSL_TERCEROS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vSL_TERCEROS Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private SL_TERCEROS ep = null;
            public vSL_TERCEROS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.SL_TERCEROS.Where(t => t.TER_NIT == oDto.TER_NIT).FirstOrDefault();
                if (ep == null) return true;
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Ya se encuentra un Tercero registrado con esta identificacion";
                    return false;
                }
            }

            protected internal override void Antes()
            {
                decimal ultId = 0;
                try
                {
                    ultId = ctx.SL_TERCEROS.Max(t => t.TER_CONS);
                }
                catch { }
                ultId++;
                
                ep = new SL_TERCEROS();
                Mapper.Map(oDto, ep);
                ep.TER_CONS = (int) ultId;
                ep.FEC_REG = DateTime.Now;
                ctx.SL_TERCEROS.Add(ep);
                byaRpt.id = ep.TER_NIT.ToString();
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vSL_TERCEROS oDto { get; set; }
            public SL_TERCEROS ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.SL_TERCEROS.Where(t => t.TER_NIT == oDto.TER_NIT).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected internal override void Antes()
            {
                Mapper.Map(oDto, ep);
            }
            #endregion
        }
    }
}
