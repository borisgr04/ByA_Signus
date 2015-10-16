using AutoMapper;
using ByA;
using DAL;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class mSL_PAGOS
    {
        Entities ctx;
        public mSL_PAGOS()
        {
            Mapper.CreateMap<SL_PAGOS, vSL_PAGOS>();
            Mapper.CreateMap<vSL_PAGOS, SL_PAGOS>();  
        }
        public ByARpt Insert(vSL_PAGOS Reg)
        {
            cmdInsert o = new cmdInsert();
            o.oDto = Reg;
            return o.Enviar();
        }
        public ByARpt CancelarPago(decimal ID_LIQ)
        {
            using (ctx = new Entities())
            {
                try
                {
                    ByARpt res = new ByARpt();
                    SL_LIQESTAMPILLAS liquidacion = ctx.SL_LIQESTAMPILLAS.Where(t => t.ID == ID_LIQ).FirstOrDefault();
                    if (liquidacion != null)
                    {
                        liquidacion.ESTADO = "LI";

                        SL_PAGOS Pago = ctx.SL_PAGOS.Where(t => t.ID_LIQ == ID_LIQ && t.ESTADO == "AC").OrderByDescending(t => t.FEC_REG).FirstOrDefault();
                        Pago.ESTADO = "IN";

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
        class cmdInsert : absTemplate
        {
            private SL_PAGOS ep = null;
            public vSL_PAGOS oDto { get; set; }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                SL_LIQESTAMPILLAS Liq = ctx.SL_LIQESTAMPILLAS.Where(t => t.ID == oDto.ID_LIQ).FirstOrDefault();
                if (Liq != null)
                {
                    string VIG_PAG = oDto.FEC_PAGO.Value.Year.ToString();
                    string PER_PAG = oDto.FEC_PAGO.Value.Month.ToString();
                    if (PER_PAG.Length == 1) PER_PAG = "0" + PER_PAG;

                    BASES_LIQ BaseOld = ctx.BASES_LIQ.Where(t => t.BALI_NIT == Liq.AGE_REC && t.BALI_PERI == PER_PAG && t.BALI_AÑO == VIG_PAG && t.BALI_EST == "AC").FirstOrDefault();
                    if (BaseOld == null) return true;
                    else
                    {
                        byaRpt.Mensaje = String.Format(" El pago no se puede registrar porque el periodo {0} ya fue reportado. Escoja otra fecha de pago ", PER_PAG);
                        return false;
                    }
                }
                else
                {
                    byaRpt.Mensaje = "Error en la liquidación!!!";
                    return false;
                }                
            }

            protected internal override void Antes()
            {
                decimal ultId = 0;
                try
                {
                    ultId = ctx.SL_PAGOS.Max(t => t.ID);
                }
                catch { }                
                ultId++;

                ep = new SL_PAGOS();
                Mapper.Map(oDto, ep);
                ep.ID = (int)ultId;
                ep.FEC_REG = DateTime.Now;
                ep.ESTADO = "AC";
                ctx.SL_PAGOS.Add(ep);
                CambiarEstadoLiquidacion();
                byaRpt.id = ep.ID.ToString();
            }
            private void CambiarEstadoLiquidacion()
            {
                SL_LIQESTAMPILLAS Liquidacion = ctx.SL_LIQESTAMPILLAS.Where(t => t.ID == oDto.ID_LIQ).FirstOrDefault();
                Liquidacion.ESTADO = "PA";
                Liquidacion.VIG_PAG = ep.FEC_PAGO.Value.Year.ToString();
                Liquidacion.PER_PAG = ep.FEC_PAGO.Value.Month.ToString();
                if (Liquidacion.PER_PAG.Length == 1) Liquidacion.PER_PAG = "0" + Liquidacion.PER_PAG;
                
            }
            #endregion
        }
    }
}
