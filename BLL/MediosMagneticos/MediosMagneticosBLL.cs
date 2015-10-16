using AutoMapper;
using ByA;
using DAL;
using Entidades;
using Entidades.Vistas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.MediosMagneticos
{
    public class MediosMagneticosBLL
    {
        Entities ctx;
        public MediosMagneticosBLL()
        {
            Mapper.CreateMap<BASES_LIQ, vBASES_LIQ>()
             .ForMember(dest => dest.FM_BASESLIQ01, obj => obj.MapFrom(scr => scr.FM_BASESLIQ01.ToList()));
            Mapper.CreateMap<vBASES_LIQ, BASES_LIQ>();

            Mapper.CreateMap<FM_BASESLIQ01, vFM_BASESLIQ01>();
            Mapper.CreateMap<vFM_BASESLIQ01, FM_BASESLIQ01>();
        }
        private void InicializarUsuario(string Usuario)
       {
           string strFuncion = String.Format("FnInicializar_Usuario('{0}')", Usuario);
           string sentencia = "Select " + strFuncion + " from dual";
           ctx.Database.SqlQuery<string>("Select " + strFuncion + " from dual").FirstOrDefault();
           
       }
       
        public ByARpt Insert(string Periodo, string Vigencia, string AgenteRecaudador)
        {
            using (ctx = new Entities())
            {
                InicializarUsuario(AgenteRecaudador);
                cmdTrasaldarLiquidaciones o = new cmdTrasaldarLiquidaciones(Periodo, Vigencia,  AgenteRecaudador);
                return o.Enviar();
            }
        }

        class cmdTrasaldarLiquidaciones : absTemplate
        {
            private BASES_LIQ ep = null;
            public vBASES_LIQ oDto { get; set; }
            private string Periodo{get; set;}
            private string Vigencia { get; set; }
            private string AgenteRecaudador { get; set; }
            private List<SL_LIQESTAMPILLAS> lLiquidaciones { get; set; }
            private bool ErrorDetalles { get; set; }

            public cmdTrasaldarLiquidaciones(string Periodo, string Vigencia, string AgenteRecaudador)
            {
                this.AgenteRecaudador = AgenteRecaudador;
                this.Periodo = Periodo;
                this.Vigencia = Vigencia;
                this.ErrorDetalles = false;
            }

            #region ImplementaciónMetodosAbstractos

            protected internal override bool esValido()
            {
                BASES_LIQ BaseOld = ctx.BASES_LIQ.Where(t => t.BALI_NIT == AgenteRecaudador && t.BALI_PERI == Periodo && t.BALI_CDEC == "40" && t.BALI_AÑO == Vigencia && t.BALI_EST == "AC").FirstOrDefault();
                if (BaseOld == null)
                {
                    vBASES_LIQ BaseL = new vBASES_LIQ();
                    lLiquidaciones = ctx.SL_LIQESTAMPILLAS.Where(t => t.AGE_REC == AgenteRecaudador && t.ESTADO == "PA" && t.PER_PAG == Periodo && t.VIG_PAG == Vigencia).ToList();
                    if (lLiquidaciones.Count() > 0)
                    {
                        return true;
                    }
                    else
                    {
                        byaRpt.Error = true;
                        byaRpt.Mensaje = "No existen liquidaciones pagas para este periodo!!";
                        return byaRpt;
                    }
                }
                else
                {
                    byaRpt.Error = true;
                    byaRpt.Mensaje = "Ya Existe un archivo para el Año Gravable " + Vigencia + " y periodo Gravable " + Periodo;
                    return false;
                }
            }
            private void ArmarReporte()
            {
                mTerceros oTer = new mTerceros();
                vTerceros TerAge = oTer.GetTercerobyId(AgenteRecaudador);
                short Vig = short.Parse(Vigencia);

                vBASES_LIQ BaseL = new vBASES_LIQ();

                DateTime FechaActual = DateTime.Now;
                BaseL.BALI_NRAD = 0;
                BaseL.BALI_NIT = AgenteRecaudador;
                BaseL.BALI_CDEC = "40";
                BaseL.BALI_AÑO = Vigencia;
                BaseL.BALI_PERI = Periodo;
                BaseL.BALI_ARCH = "2534.txt"; // Que es esto???
                BaseL.BALI_EST = "AC";
                BaseL.BALI_USAP = AgenteRecaudador;
                BaseL.BALI_USBD = "DERWEB";
                BaseL.BALI_FESI = FechaActual;
                BaseL.BALI_FECH = FechaActual;
                BaseL.BALI_FDCO = "4001";
                BaseL.BALI_FREG = FechaActual;
                BaseL.BALI_FNOV = FechaActual;
                BaseL.FM_BASESLIQ01 = new List<vFM_BASESLIQ01>();

                foreach (SL_LIQESTAMPILLAS item in lLiquidaciones)
                {
                    SL_TERCEROS Contr = ctx.SL_TERCEROS.Where(t => t.TER_NIT == item.TER_NIT).FirstOrDefault();

                    foreach (SL_DETLIQ item2 in item.SL_DETLIQ)
                    {
                        vFM_BASESLIQ01 FmBase = new vFM_BASESLIQ01();
                        FmBase.NIT_AR = long.Parse(AgenteRecaudador);
                        FmBase.DV_AR = short.Parse(TerAge.TER_DVER);
                        FmBase.CDEC = "40";
                        FmBase.IMPTO = item2.COD_IMP;
                        FmBase.AGRAVABLE = Vigencia;
                        FmBase.PGRAVABLE = Periodo;
                        FmBase.NDOC = long.Parse(item.NRO_LIQ.ToString());
                        FmBase.FOPER = (DateTime)item.SL_PAGOS.Where(t => t.ESTADO == "AC").FirstOrDefault().FEC_PAGO;
                        FmBase.TIDE = item2.SL_LIQESTAMPILLAS.SL_TERCEROS.TER_TDOC;
                        FmBase.NIDE = long.Parse(item2.SL_LIQESTAMPILLAS.SL_TERCEROS.TER_NIT);
                        if (Contr.TER_DVER != null) FmBase.DV = short.Parse(Contr.TER_DVER); else FmBase.DV = short.Parse("4");
                        FmBase.RAZSOC = item2.SL_LIQESTAMPILLAS.SL_TERCEROS.TER_NOM;
                        FmBase.CONCEPTO = "CONTRATO " + item.NUM_CTO;
                        FmBase.VALORBASE = (decimal)item2.VAL_BAS;
                        FmBase.TARIFA = (decimal)item2.TAR_IMP;
                        FmBase.VALORIMPTO = FmBase.VALORBASE * FmBase.TARIFA;
                        FmBase.NRO_RAD = 0;
                        FmBase.USAP = AgenteRecaudador;
                        //FmBase.USBD = "DERWEB";
                        FmBase.FESI = FechaActual;
                        FmBase.FREG = FechaActual;
                        FmBase.FNOV = FechaActual;
                        FmBase.COD_MPIO = "";

                        BaseL.FM_BASESLIQ01.Add(FmBase);
                    }
                    item.REPLICADO = "SI";
                }
                oDto = BaseL;
            }
            protected internal override void Antes()
            {
                decimal ultId = 0;
                try
                {
                    ultId = ctx.BASES_LIQ.Max(t => t.BALI_NRAD);
                }
                catch { }
                ultId++;

                ArmarReporte();

                ep = new BASES_LIQ();
                Mapper.Map(oDto, ep);
                ep.BALI_NRAD = (int)ultId;
                ep.FM_BASESLIQ01 = null;
                ctx.BASES_LIQ.Add(ep);

                ctx.SaveChanges();  // Se guarda tentativamente

                InsertDetallesMedio();
                byaRpt.id = ep.BALI_NRAD.ToString();
            }
            protected override void Despues()
            {
                if (ErrorDetalles == false) byaRpt.Mensaje = "Operación realizada satisfactoriamente <br/>Se Reportaron los Recaudos N° Registros [" + oDto.FM_BASESLIQ01.Count() + "] ";
                else byaRpt.Mensaje = "Ha ocurrido un error, no se realizó el proceso";
            }
            private void EliminarPorError()
            {
                ctx.BASES_LIQ.Remove(ep);
                ErrorDetalles = true;
            }
            private void InsertDetallesMedio()
            {
                try
                {
                    foreach (vFM_BASESLIQ01 item in oDto.FM_BASESLIQ01)
                    {
                        item.NRO_RAD = ep.BALI_NRAD;
                        string CadenaCon = "Insert into FM_BASESLIQ01" +
                                            "(NIT_AR, DV_AR, CDEC, IMPTO, AGRAVABLE, PGRAVABLE, NDOC, FOPER, TIDE, NIDE, RAZSOC, CONCEPTO, VALORBASE, TARIFA, VALORIMPTO, NRO_RAD, USAP, USBD, FESI, FREG, FNOV) Values" +
                                            "('" + item.NIT_AR + "', '" + item.DV_AR + "', '" + item.CDEC + "', '" + item.IMPTO + "', '" + item.AGRAVABLE + "', '" + item.PGRAVABLE + "', '" + item.NDOC + "', TO_DATE('" + item.FOPER.Month + "/" + item.FOPER.Day + "/" + item.FOPER.Year + "', 'MM/DD/YYYY'), '" + item.TIDE + "', '" + item.NIDE + "', '" + item.RAZSOC + "', '" + item.CONCEPTO + "', to_number('" + item.VALORBASE + "'), to_number('" + item.TARIFA.ToString().Replace(",", ".") + "'), '" + item.VALORIMPTO.ToString().Replace(",", ".") + "', '" + item.NRO_RAD + "', '" + item.USAP + "', '" + item.USBD + "', TO_DATE('" + item.FESI.Month + "/" + item.FESI.Day + "/" + item.FESI.Year + "', 'MM/DD/YYYY'), TO_DATE('" + item.FREG.Value.Month + "/" + item.FREG.Value.Day + "/" + item.FREG.Value.Year + "', 'MM/DD/YYYY'), TO_DATE('" + item.FNOV.Value.Month + "/" + item.FNOV.Value.Day + "/" + item.FNOV.Value.Year + "', 'MM/DD/YYYY'))";

                        int result = ctx.Database.ExecuteSqlCommand(CadenaCon);
                    }
                }
                catch
                {
                    EliminarPorError();
                }
            }
            #endregion
        }
    }
}
