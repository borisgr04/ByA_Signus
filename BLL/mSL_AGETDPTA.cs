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
    public class mSL_AGETDPTA
    {
        Entities ctx;
        public mSL_AGETDPTA()
        {
            Mapper.CreateMap<SL_AGETDPTA, vSL_AGETDPTA>();
            Mapper.CreateMap<vSL_AGETDPTA, SL_AGETDPTA>();
        }
        public List<vSL_AGETDPTA> Gets()
        {
            using (ctx = new Entities())
            {
                List<vSL_AGETDPTA> r = new List<vSL_AGETDPTA>();
                List<SL_AGETDPTA> b = ctx.SL_AGETDPTA.OrderByDescending(t => t.TER_NIT).ToList();
                Mapper.Map(b, r);

                foreach (vSL_AGETDPTA item in r)
                {
                    TERCEROS ter = ctx.TERCEROS.Where(t => t.TER_NIT == item.TER_NIT).FirstOrDefault();
                    if (ter != null)
                    {
                        item.TER_NOM = ter.TER_NOM;
                    }
                }

                return r;
            }
        }
        public ByARpt Insert(vSL_AGETDPTA Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Delete(vSL_AGETDPTA Reg)
        {
            cmdDelete o = new cmdDelete();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private SL_AGETDPTA ep = null;
            public vSL_AGETDPTA oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.SL_AGETDPTA.Where(t => t.TER_NIT == oDto.TER_NIT).FirstOrDefault();
                if (ep == null) return true;
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Ya se encuentra este Tercero registrado";
                    return false;
                }
            }

            protected internal override void Antes()
            {
                ep = new SL_AGETDPTA();
                Mapper.Map(oDto, ep);
                ctx.SL_AGETDPTA.Add(ep);
                byaRpt.id = ep.TER_NIT;
            }
            #endregion
        }
        class cmdDelete : absTemplate
        {
            private SL_AGETDPTA ep = null;
            public vSL_AGETDPTA oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.SL_AGETDPTA.Where(t => t.TER_NIT == oDto.TER_NIT).FirstOrDefault();
                if (ep != null) return true;
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "No se encuentra este Tercero registrado";
                    return false;
                }
            }

            protected internal override void Antes()
            {
                ctx.SL_AGETDPTA.Remove(ep);
                byaRpt.id = ep.TER_NIT;
            }
            #endregion
        }
    }
}
