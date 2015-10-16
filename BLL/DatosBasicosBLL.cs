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
   public class DatosBasicosBLL
   {
       public DatosBasicosBLL()
       {
           Mapper.CreateMap<TDOC_IDE, vTDOC_IDE>();
           Mapper.CreateMap<SL_TIPOPER, vSL_TIPOPER>();
           Mapper.CreateMap<SL_TIPORGM, vSL_TIPORGM>();
           Mapper.CreateMap<MUNICIPIOS, vMUNICIPIOS>();
       }
        public Entities ctx { get; set; }
        public ByARpt byaRpt { get; set; }
        public vVIGENCIAS GetVigenciaActual() {
            VIGENCIA vig;
            vVIGENCIAS oVig= new vVIGENCIAS();
            Mapper.CreateMap<VIGENCIA, vVIGENCIAS>()
                .ForMember(dest=> dest.YEAR_VIG, opt=> opt.MapFrom(scr=> scr.VIG_COD));
            using (ctx = new Entities())
            {
                vig = ctx.VIGENCIA.Where(t => t.VIG_EST == "AC").OrderBy(t => t.VIG_COD).FirstOrDefault();
                Mapper.Map(vig, oVig);
                return oVig;
            }
            
        } 
        public IList<vVIGENCIAS> GetvVIGENCIAS()
        {
            using (ctx = new Entities())
            {
                var lst = ctx.VIGENCIA.Select(t => new vVIGENCIAS { YEAR_VIG = t.VIG_COD }).OrderByDescending(t => t.YEAR_VIG);
                return lst.ToList();
            }
        }
        public List<vTDOC_IDE> GetTiposDocumentos()
        {
            using (ctx = new Entities())
            {
                List<vTDOC_IDE> lr = new List<vTDOC_IDE>();
                List<TDOC_IDE> l = ctx.TDOC_IDE.OrderBy(t=>t.TDOC_COD).ToList();
                Mapper.Map(l, lr);
                return lr;
            }
        }
        public List<vSL_TIPOPER> GetTiposPersona()
        {
            using (ctx = new Entities())
            {
                List<vSL_TIPOPER> lr = new List<vSL_TIPOPER>();
                List<SL_TIPOPER> l = ctx.SL_TIPOPER.ToList();
                Mapper.Map(l, lr);
                return lr;
            }
        }
        public List<vSL_TIPORGM> GetTiposRegimen()
        {
            using (ctx = new Entities())
            {
                List<vSL_TIPORGM> lr = new List<vSL_TIPORGM>();
                List<SL_TIPORGM> l = ctx.SL_TIPORGM.ToList();
                Mapper.Map(l, lr);
                return lr;
            }
        }
        public List<vMUNICIPIOS> GetCiudadesDepartamento(string ID_DEP)
        {
            using (ctx = new Entities())
            {
                List<vMUNICIPIOS> lr = new List<vMUNICIPIOS>();
                List<MUNICIPIOS> l = ctx.MUNICIPIOS.Where(t => t.MUN_DPCO == ID_DEP).OrderBy(t=> t.MUN_NOM).ToList();
                Mapper.Map(l, lr);
                return lr;
            }
        }
   }
}
