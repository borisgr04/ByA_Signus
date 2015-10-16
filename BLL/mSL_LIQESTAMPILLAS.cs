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
using BLL;

namespace BLL
{
    public class mSL_LIQESTAMPILLAS
    {
        Entities ctx;
        public mSL_LIQESTAMPILLAS()
        {
            Mapper.CreateMap<SL_LIQESTAMPILLAS, vSL_LIQESTAMPILLAS>()
             .ForMember(dest => dest.lDetallesLiquidacion, obj => obj.MapFrom(scr => scr.SL_DETLIQ.ToList()))
             .ForMember(dest => dest.FechaPago, obj => obj.MapFrom(scr => scr.SL_PAGOS.FirstOrDefault().FEC_PAGO))
             .ForMember(dest => dest.NOM_TER, obj => obj.MapFrom(scr => scr.SL_TERCEROS.TER_NOM));
            Mapper.CreateMap<vSL_LIQESTAMPILLAS, SL_LIQESTAMPILLAS>();  
             
            Mapper.CreateMap<vSL_DETLIQ, SL_DETLIQ>();
            Mapper.CreateMap<SL_DETLIQ, vSL_DETLIQ>()
                .ForMember(dest => dest.VAL_IMP, obj => obj.MapFrom(src => decimal.Parse(((int) (src.VAL_BAS * src.TAR_IMP)).ToString())));
        }
        public vSL_LIQESTAMPILLAS Get(decimal ID)
        {
            using (ctx = new Entities())
            {
                vSL_LIQESTAMPILLAS r = new vSL_LIQESTAMPILLAS();
                SL_LIQESTAMPILLAS o = ctx.SL_LIQESTAMPILLAS.Where(t => t.ID == ID).FirstOrDefault();
                if (o != null)
                {
                    TERCEROS ter = ctx.TERCEROS.Where(t => t.TER_NIT == o.AGE_REC).FirstOrDefault();

                    List<BLL.SignusFacade.ImpuestosTarDto> lImp = new List<BLL.SignusFacade.ImpuestosTarDto>();
                    SignusFacade oSignusFacade = new SignusFacade();
                    lImp = oSignusFacade.GetImpuestos();

                    Mapper.Map(o, r);

                    r.NOM_AGE = ter.TER_NOM;

                    foreach (vSL_DETLIQ item in r.lDetallesLiquidacion)
                    {
                        item.NOM_IMP = lImp.Where(t => t.Cod_Imp == item.COD_IMP).FirstOrDefault().Nom_Imp;
                    }
                    return r;
                }
                else
                {
                    return null;
                }

            }
        }
        public vSL_LIQESTAMPILLAS Get(decimal NRO_LIQ, string VIGENCIA)
        {
            using (ctx = new Entities())
            {
                short Vig = short.Parse(VIGENCIA);

                vSL_LIQESTAMPILLAS r = new vSL_LIQESTAMPILLAS();
                SL_LIQESTAMPILLAS o = ctx.SL_LIQESTAMPILLAS.Where(t => t.NRO_LIQ == NRO_LIQ && t.VIG_LIQ == Vig).FirstOrDefault();

                if (o != null)
                {

                    TERCEROS ter = ctx.TERCEROS.Where(t => t.TER_NIT == o.AGE_REC).FirstOrDefault();

                    List<BLL.SignusFacade.ImpuestosTarDto> lImp = new List<BLL.SignusFacade.ImpuestosTarDto>();
                    SignusFacade oSignusFacade = new SignusFacade();
                    lImp = oSignusFacade.GetImpuestos();

                    Mapper.Map(o, r);

                    r.NOM_AGE = ter.TER_NOM;

                    foreach (vSL_DETLIQ item in r.lDetallesLiquidacion)
                    {
                        item.NOM_IMP = lImp.Where(t => t.Cod_Imp == item.COD_IMP).FirstOrDefault().Nom_Imp;
                    }
                    return r;
                }
                else return null;
            }
        }
        public List<vSL_LIQESTAMPILLAS> Gets(string VIGENCIA, string AGENTE)
        {
            using (ctx = new Entities())
            {
                short Vig = short.Parse(VIGENCIA);

                List<vSL_LIQESTAMPILLAS> r = new List<vSL_LIQESTAMPILLAS>();
                List<SL_LIQESTAMPILLAS> l = ctx.SL_LIQESTAMPILLAS.Where(t => t.VIG_LIQ == Vig && t.AGE_REC == AGENTE).ToList();
                Mapper.Map(l,r);
                return r;
            }
        }
        public List<vSL_LIQESTAMPILLAS> Gets(string VIGENCIA, string AGENTE, string PERIODO)
        {
            using (ctx = new Entities())
            {
                short Vig = short.Parse(VIGENCIA);

                List<vSL_LIQESTAMPILLAS> r = new List<vSL_LIQESTAMPILLAS>();
                List<SL_LIQESTAMPILLAS> l = new List<SL_LIQESTAMPILLAS>();
                if(AGENTE != "") l = ctx.SL_LIQESTAMPILLAS.Where(t => t.VIG_LIQ == Vig && t.AGE_REC == AGENTE && t.PER_LIQ == PERIODO && t.ESTADO == "LI").ToList();
                else l = ctx.SL_LIQESTAMPILLAS.Where(t => t.VIG_LIQ == Vig && t.PER_LIQ == PERIODO && t.ESTADO == "LI").ToList();
                Mapper.Map(l, r);
                return r;
            }
        }
        public List<vSL_LIQESTAMPILLAS> GetsPagadas(string VIGENCIA, string AGENTE, string PERIODO)
        {
            using (ctx = new Entities())
            {
                short Vig = short.Parse(VIGENCIA);

                List<vSL_LIQESTAMPILLAS> r = new List<vSL_LIQESTAMPILLAS>();
                List<SL_LIQESTAMPILLAS> l = new List<SL_LIQESTAMPILLAS>();
                if (AGENTE != "") l = ctx.SL_LIQESTAMPILLAS.Where(t => t.VIG_PAG == VIGENCIA && t.AGE_REC == AGENTE && t.PER_PAG == PERIODO && t.ESTADO == "PA").ToList();
                else l = ctx.SL_LIQESTAMPILLAS.Where(t => t.VIG_PAG == VIGENCIA && t.PER_PAG == PERIODO && t.ESTADO == "PA").ToList();
                Mapper.Map(l, r);
                return r;
            }
        }
        public ByARpt Insert(vSL_LIQESTAMPILLAS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt CancelarLiquidacion(decimal ID_LIQ)
        {
            using (ctx = new Entities())
            {
                try
                {
                    ByARpt res = new ByARpt();
                    SL_LIQESTAMPILLAS liquidacion = ctx.SL_LIQESTAMPILLAS.Where(t => t.ID == ID_LIQ).FirstOrDefault();
                    if (liquidacion != null)
                    {
                        liquidacion.ESTADO = "IN";
                        ctx.SaveChanges();
                        res.Mensaje = "Operación Realizada Satisfactoriamente";
                        res.Error = false;
                        return res;
                    }
                    else
                    {
                        res.Mensaje = "No se encuentra liquidación";
                        res.Error = true;
                        return res;
                    }
                }
                catch
                {
                    ByARpt res = new ByARpt();
                    res.Mensaje = "Ha ocurrido un error...";
                    res.Error = true;
                    return res;
                }
            }
        }
        public vCONSOLTA_COMPLETA ConsultaLE(string Vigencia, string Periodo, string AgenteRecaudador)
        {
            using (ctx = new Entities())
            {
                short Vig = short.Parse(Vigencia);
                List<vCONSULTALE> Consulta = new List<vCONSULTALE>();
                vCONSOLTA_COMPLETA CON_COM = new vCONSOLTA_COMPLETA();

                decimal TotalPagado = 0;
                decimal TotalLiquidado = 0;

                SignusFacade oSignus = new SignusFacade();
                List<BLL.SignusFacade.ImpuestosTarDto> Impuestos = oSignus.GetImpuestos();
                foreach (BLL.SignusFacade.ImpuestosTarDto item in Impuestos)
                {
                    vCONSULTALE oCon = new vCONSULTALE();
                    oCon.COD_IMP = item.Cod_Imp;
                    oCon.NOM_IMP = item.Nom_Imp;
                    oCon.TOTAL_LIQUIDADO = 0;
                    oCon.TOTAL_PAGADO = 0;
                    Consulta.Add(oCon);
                }

                List<SL_LIQESTAMPILLAS> lLiquidacionesAgente = new List<SL_LIQESTAMPILLAS>();

                if (AgenteRecaudador != "") lLiquidacionesAgente = ctx.SL_LIQESTAMPILLAS.Where(t => ((t.VIG_LIQ == Vig && t.PER_LIQ == Periodo) || (t.VIG_PAG == Vigencia && t.PER_PAG == Periodo)) && t.AGE_REC == AgenteRecaudador).ToList();
                else lLiquidacionesAgente = ctx.SL_LIQESTAMPILLAS.Where(t => ((t.VIG_LIQ == Vig && t.PER_LIQ == Periodo) || (t.VIG_PAG == Vigencia && t.PER_PAG == Periodo))).ToList();

                foreach (SL_LIQESTAMPILLAS item2 in lLiquidacionesAgente)
                {
                    foreach (SL_DETLIQ item3 in item2.SL_DETLIQ)
                    {
                        if (item2.ESTADO == "LI")
                        {
                            TotalLiquidado += (decimal)(item3.TAR_IMP * item3.VAL_BAS);
                            Consulta.Where(t => t.COD_IMP == item3.COD_IMP).FirstOrDefault().TOTAL_LIQUIDADO += (decimal)(item3.TAR_IMP * item3.VAL_BAS);
                        }
                        if ((item2.ESTADO == "PA") && (item2.PER_PAG == Periodo))
                        {
                           TotalPagado += (decimal)(item3.TAR_IMP * item3.VAL_BAS);
                           Consulta.Where(t => t.COD_IMP == item3.COD_IMP).FirstOrDefault().TOTAL_PAGADO += (decimal)(item3.TAR_IMP * item3.VAL_BAS);
                        }
                        
                    }
                }

                vCONSULTALE totales = new vCONSULTALE();
                totales.NOM_IMP = "<div class='text-right'>Total</div>";
                totales.TOTAL_PAGADO = TotalPagado;
                totales.TOTAL_LIQUIDADO = TotalLiquidado;
                Consulta.Add(totales);

                CON_COM.CONSULTA = Consulta;

                CON_COM.FECHA_VENCIMIENTO = (DateTime) ctx.CALENDARIO.Where(t => t.CAL_CLA == "40" && t.CAL_VIG == Vigencia && t.CAL_PER == Periodo).FirstOrDefault().CAL_FVEN;
                BASES_LIQ repo = ctx.BASES_LIQ.Where(t => t.BALI_NIT == AgenteRecaudador && t.BALI_PERI == Periodo && t.BALI_CDEC == "40" && t.BALI_AÑO == Vigencia && t.BALI_EST == "AC").FirstOrDefault();
                if (repo == null) CON_COM.ESTADO = "NO REPORTADO";
                else CON_COM.ESTADO = "REPORTADO";

                return CON_COM;
            }
        }
        class cmdInsert : absTemplate
        {
            private SL_LIQESTAMPILLAS ep = null;
            public vSL_LIQESTAMPILLAS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                // Hacer las validaciones necesarias? 
                return true;
            }

            protected internal override void Antes()
            {
                decimal ultId = 0;
                int ultIdVig = 0;
                try
                {
                    ultId = ctx.SL_LIQESTAMPILLAS.Max(t => t.ID);
                }
                catch { }
                try
                {
                    if (ctx.SL_LIQESTAMPILLAS.Where(t => t.VIG_LIQ == oDto.VIG_LIQ).Count()>0)
                    {
                        ultIdVig = (int)ctx.SL_LIQESTAMPILLAS.Where(t => t.VIG_LIQ == oDto.VIG_LIQ).OrderByDescending(t => t.ID).FirstOrDefault().NRO_LIQ;
                    }
                    
                }
                catch { }
                ultId++;
                ultIdVig++;

                ep = new SL_LIQESTAMPILLAS();
                Mapper.Map(oDto, ep);
                ep.ID = (int)ultId;
                ep.NRO_LIQ = ultIdVig;
                ep.FEC_REG = DateTime.Now;
                ctx.SL_LIQESTAMPILLAS.Add(ep);
                InsertDetallesLiquidacion();
                byaRpt.id = ep.ID.ToString();
            }
            protected override void Despues()
            {
                byaRpt.Mensaje = "Se guardó la liquidación con Nro: " + ep.NRO_LIQ + " de " + ep.VIG_LIQ;
            }
            private void InsertDetallesLiquidacion()
            {
                decimal ultId = 0;
                try
                {
                    ultId = ctx.SL_DETLIQ.Max(t => t.ID);
                }
                catch { }
                foreach (vSL_DETLIQ item in oDto.lDetallesLiquidacion)
                {                    
                    ultId++;
                    SL_DETLIQ o = new SL_DETLIQ();
                    Mapper.Map(item, o);
                    o.FEC_REG = DateTime.Now;
                    o.USUARIO = oDto.USUARIO;
                    o.ID = ultId;
                    o.ID_LIQ = ep.ID;
                    ctx.SL_DETLIQ.Add(o);
                }
            }
            #endregion
        }
    }
}
