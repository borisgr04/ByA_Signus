using AutoMapper;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;
using Entidades;

namespace BLL
{
    public class VigenciasBLL
    {
        Entities ctx;
        public VigenciasBLL()
        {
            Mapper.CreateMap<VIGENCIA, vVIGENCIAS>();
            Mapper.CreateMap<vVIGENCIAS, VIGENCIA>();
        }
        public List<vVIGENCIAS> Gets()
        {
            using (ctx = new Entities())
            {
                List<vVIGENCIAS> r = new List<vVIGENCIAS>();
                List<VIGENCIA> b = ctx.VIGENCIA.OrderByDescending(t=> t.VIG_COD).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
        public vVIGENCIAS Get(string ID)
        {
            using (ctx = new Entities())
            {
                vVIGENCIAS r = new vVIGENCIAS();
                VIGENCIA b = ctx.VIGENCIA.Where(t => t.VIG_COD == ID).FirstOrDefault();
                Mapper.Map(b, r);
                return r;
            }
        }
        public ByARpt Insert(vVIGENCIAS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt Update(vVIGENCIAS Reg)
        {
            cmdUpdate o = new cmdUpdate();
            o.oDto = Reg;
            return o.Enviar();
        }
        class cmdInsert : absTemplate
        {
            private VIGENCIA ep = null;
            public vVIGENCIAS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.VIGENCIA.Where(t => t.VIG_COD == oDto.YEAR_VIG).FirstOrDefault();
                if (ep == null) return true;
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Ya se encuentra una Vigencia registrada para este año";
                    return false;
                }
            }

            protected internal override void Antes()
            {
                ep = new VIGENCIA();
                Mapper.Map(oDto, ep);
                ctx.VIGENCIA.Add(ep);
                byaRpt.id = ep.VIG_COD;
            }
            #endregion
        }
        class cmdUpdate : absTemplate
        {
            public vVIGENCIAS oDto { get; set; }
            public VIGENCIA ep { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                ep = ctx.VIGENCIA.Where(t => t.VIG_COD == oDto.YEAR_VIG).FirstOrDefault();
                if (ep == null) return false;
                else return true;
            }
            protected internal override void Antes()
            {
                Mapper.Map(oDto, ep);
            }
            #endregion
        }
        public List<vVIGENCIAS> GetsAbiertas()
        {
            using (ctx = new Entities())
            {
                List<vVIGENCIAS> r = new List<vVIGENCIAS>();
                List<VIGENCIA> b = ctx.VIGENCIA.Where(t=> t.VIG_EST == "AC").OrderByDescending(t => t.VIG_COD).ToList();
                Mapper.Map(b, r);
                return r;
            }
        }
    }
}
