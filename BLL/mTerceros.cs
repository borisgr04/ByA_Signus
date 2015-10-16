using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ByA;
using Entidades;
using DAL;
using AutoMapper;
using System.Data;
using System.Data.Entity;


namespace BLL
{
   public class mTerceros: absBLL
    {


        public mTerceros(){
            Mapper.CreateMap<vTerceros, TERCEROS>();
            Mapper.CreateMap<TERCEROS, vTerceros>();
        }

       public List<vTerceros> GetsAll(){
           using (ctx = new Entities())
           {
               List<vTerceros> lrTercero = new List<vTerceros>();
               List<TERCEROS> lTerceros = ctx.TERCEROS.ToList();
               Mapper.Map(lTerceros, lrTercero);
               return lrTercero;
           }
       }
       public List<vTerceros> GetFiltroContain(string Filtro)
       {
           using (ctx = new Entities())
           {
               List<vTerceros> lrTerceros = new List<vTerceros>();
               List<TERCEROS> lTerceros = ctx.TERCEROS.Where(t => (t.TER_NOM.ToUpper().Contains(Filtro.ToUpper()) || t.TER_NIT.ToUpper().Contains(Filtro.ToUpper())) && t.TER_TUS == "AR").OrderBy(t => t.TER_NOM).ToList();
               Mapper.Map(lTerceros, lrTerceros);
               return lrTerceros;
           }
       }

        public List<vTerceros> GetsFiltro(string Filtro, string Valor)
        {
            using (ctx = new Entities())
            {
                List<vTerceros> lrTerceros = new List<vTerceros>();
                List<TERCEROS> lTerceros;
                if (Filtro == "") lTerceros = ctx.TERCEROS.ToList();
                else
                {
                    if (Filtro == "IDE_TER") lTerceros = ctx.TERCEROS.Where(t => t.TER_NIT == Valor).ToList();
                    else lTerceros = ctx.TERCEROS.SqlQuery("select * from terceros where upper(ape1_ter) like upper('%" + Valor + "%')  or upper(ape2_ter) like upper('%" + Valor + "%')  or upper(nom1_ter) like upper('%" + Valor + "%') or upper(nom2_ter) like upper('%" + Valor + "%')").ToList();
                } 
                Mapper.Map(lTerceros, lrTerceros);
                return lrTerceros;
            }
        } 

       public static string buildNomTer(TERCEROS t)
        {
            if (t != null)
            {
                return t.TER_NOM;
            }
            return "";
        }

       public static string builAPNOMBRE(TERCEROS t)
       {
           if (t != null)
            {
                return (t.TER_NOM).Trim();
            }
            return "";
       }

       public static string builNOMBRE(TERCEROS t)
       {
           if (t != null)
           {
               return (t.TER_NOM).Trim();
           }
           return "";
       }

    
        public string buildTercero(string IdeTer)
        {
            return mTerceros.buildNomTer(ctx.TERCEROS.Where(t => t.TER_NIT == IdeTer).FirstOrDefault());
        }

        
        public vTerceros GetTercerobyId(string Ideter) {
           
           using (ctx = new Entities())
           {
               vTerceros ter = (from t in ctx.TERCEROS
                                where t.TER_NIT.Equals(Ideter)
                                select (new vTerceros
                                {
                                    TER_CONS = t.TER_CONS,
                                    TER_TDOC = t.TER_TDOC,
                                    TER_NIT  = t.TER_NIT,
                                    TER_DVER  = t.TER_DVER,
                                    TER_NOM  = t.TER_NOM,
                                    TER_TIP  = t.TER_TIP,
                                    TER_MPIO  = t.TER_MPIO,
                                    TER_EMAI  = t.TER_EMAI,
                                    TER_TEL  = t.TER_TEL,
                                    TER_DIR  = t.TER_DIR,
                                    TER_CED  = t.TER_CED,
                                    TER_REP  = t.TER_REP,
                                    TER_USU  = t.TER_USU,
                                    TER_TUS  = t.TER_TUS,
                                    TER_FREG  = t.TER_FREG,
                                    TER_FNOV  = t.TER_FNOV,
                                    TER_FFIN  = t.TER_FFIN,
                                    TER_EST  = t.TER_EST,
                                    TER_OBS  = t.TER_OBS,
                                    TER_USAP  = t.TER_USAP,
                                    TER_USBD  = t.TER_USBD,
                                    TER_REP_TD  = t.TER_REP_TD,
                                    TER_REP_EXP  = t.TER_REP_EXP
                                                                    
                                })).FirstOrDefault();
               return ter;
           }
           
        }


       public ByARpt Insert(vTerceros Reg)
       {
           cmdInsert o = new cmdInsert();
           o.reg = Reg;
           return o.Enviar();
       }

       public ByARpt Update(vTerceros Reg)
       {
           cmdUpdate o = new cmdUpdate();
           o.reg = Reg;
           return o.Enviar();
       }
    }

   class cmdInsert : absTemplate
   {
       public vTerceros reg { get; set; }
       TERCEROS ter { get; set; }

       protected internal override bool esValido()
       {
           return true;
       }

       protected internal override void Antes()
       {
           ter = new TERCEROS();
           Mapper.Map(reg, ter);
           byaRpt.id = reg.TER_NIT;
           //ctx.TERCEROS.Add(r);
           ctx.Entry(ter).State = EntityState.Added;
       }
       //protected override void DespuesInsert();

   }


   class cmdUpdate : absTemplate
   {
       public vTerceros reg { get; set; }
       TERCEROS ter { get; set; }

       protected internal override bool esValido()
       {
            ter = ctx.TERCEROS.Where(t => t.TER_NIT==reg.TER_NIT).FirstOrDefault();
            if (ter != null)
            {
                return true;
            }
            else {
                byaRpt.Mensaje = "No se encontró el tercero";
                byaRpt.Error = true;
                return false;
            }
       }

       protected internal override void Antes()
       {
          /*
           ter.APE1_TER = reg.APE1_TER;
           ter.APE2_TER = reg.APE2_TER;
           ter.NOM1_TER = reg.NOM1_TER;
           ter.NOM2_TER = reg.NOM2_TER;
           ter.TIP_IDE = reg.TIP_IDE;
           ter.CAR_FUN = reg.CAR_FUN;
           ter.DEP_NEC = reg.DEP_NEC;
           ter.DIR_TER = reg.DIR_TER;
           ter.TEL_TER = reg.TEL_TER;
           ter.EMA_TER = reg.EMA_TER;
           ter.RAZ_SOC = reg.RAZ_SOC;
           ter.TIPO = reg.TIPO;
           ter.DV_TER = reg.DV_TER;
           ter.EXP_IDE = reg.EXP_IDE;
           ter.ESTADO = reg.ESTADO;
           ter.FEC_NAC = reg.FEC_NAC;
           ter.TIP_PER = reg.TIP_PER;
           */
           //ter.fec_mod = DateTime.Now;
           //ter.fec_reg=
           byaRpt.id = reg.TER_NIT;
           //ctx.TERCEROS.Add(r);
           ctx.Entry(ter).State = EntityState.Modified;

       }
       //protected override void DespuesInsert();

   }
   class cmdDelete : absTemplate
   {
       public vTerceros reg { get; set; }
       TERCEROS ter { get; set; }

       protected internal override bool esValido()
       {
           ter = ctx.TERCEROS.Where(t => t.TER_NIT == reg.TER_NIT).FirstOrDefault();
           if (ter != null)
           {
               return true;
           }
           else
           {
               byaRpt.Mensaje = "No se encontró el tercero";
               byaRpt.Error = true;
               return false;
           }
       }

       protected internal override void Antes()
       {



           byaRpt.id = reg.TER_NIT;
           //ctx.TERCEROS.Add(r);
           ctx.Entry(ter).State = EntityState.Deleted;

       }
       //protected override void DespuesInsert();

   }
}
