using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entidades.Vistas;
namespace BLL
{
   public class SignusFacade
    {
       Entities ctx;
      public class ImpuestosTarDto {
           public string Cod_Cla { get; set; }
           public string Cod_Imp { get; set; }
           public string Nom_Imp { get; set; }
           public decimal Tar_Imp { get; set; }
           public bool Tip_Dep { get; set; }
           public decimal Val_Base { get; set; }
           public decimal Val_Imp {
               get {
                   return Val_Base * Tar_Imp;
                   }
               }
       }
      public class Totales
       {
           public string Codigo { get; set; }
           public string Nombre { get; set; }
           public decimal Valor { get; set; }
       }
      public class LiquidacionTotal {
           public List<ImpuestosTarDto> LstImp{get;set;}
           public List<Totales> LstTotales{get;set;}
       }
      public class ParametrosLiq { 
            public string UserName {get; set;}
            public decimal Val_Base { get; set; }
            public DateTime Fecha_Lim { get; set; }
      }
      private List<ImpuestosTarDto> LstImp = new List<ImpuestosTarDto>();
      private List<Totales> LstTotales ;
      private Entities db { get; set; }
       /// <summary>
       /// Construye Impuestos Iniciales
       /// </summary>
       public SignusFacade()
       {
           LstImp.Add(new ImpuestosTarDto { Cod_Imp = "4001", Nom_Imp = "ESTAMPILLAS PRODESARROLLO DEPARTAMENTAL", Cod_Cla = "40", Tip_Dep = true });
           LstImp.Add(new ImpuestosTarDto { Cod_Imp = "4003", Nom_Imp = "ESTAMPILLA PRO-CULTURA", Cod_Cla = "40", Tip_Dep = true });
           LstImp.Add(new ImpuestosTarDto { Cod_Imp = "4004", Nom_Imp = "ESTAMPILLA PARA EL BIENESTAR PARA EL ADULTO MAYOR", Cod_Cla = "40", Tip_Dep = true });
           LstImp.Add(new ImpuestosTarDto { Cod_Imp = "4005", Nom_Imp = "ESTAMPILLAS PRODESARROLLO FRONTERIZO", Cod_Cla = "40", Tip_Dep = false });
           
       }
       public DateTime CalcularFechaVencimiento(DateTime FechaSuscripcion) 
       {
           return FechaSuscripcion.AddDays(30);
       }
       public List<ImpuestosTarDto> GetImpuestos()
       {
           return LstImp;
       }
       public vSL_LIQESTAMPILLAS Liquidacion(ParametrosLiq pl)
       {
           using (db = new Entities())
           {
               LiquidacionTotal lt = new LiquidacionTotal();
               lt.LstImp = GetImpuestosTar(pl.UserName, pl.Val_Base);
               lt.LstTotales = Totalizar(lt.LstImp.Sum(t => t.Val_Imp), pl.Fecha_Lim);


               // mapeo de los detalles de la liquidacion
               List<vSL_DETLIQ> lDetalles = new List<vSL_DETLIQ>();
               foreach (ImpuestosTarDto item in lt.LstImp)
               {
                   vSL_DETLIQ det = new vSL_DETLIQ();
                   det.COD_IMP = item.Cod_Imp;
                   det.NOM_IMP = item.Nom_Imp;
                   det.TAR_IMP = item.Tar_Imp;
                   det.VAL_BAS = Math.Round(item.Val_Base);
                   det.VAL_IMP = Math.Round(item.Val_Imp);
                   lDetalles.Add(det);
               }

               // mapeo de los totales de la liquidacion
               vSL_LIQESTAMPILLAS liq = new vSL_LIQESTAMPILLAS();
               liq.SUB_TOT = Math.Round(lt.LstTotales.Where(t => t.Codigo == "SU").FirstOrDefault().Valor);
               liq.INTERES = Math.Round(lt.LstTotales.Where(t => t.Codigo == "IN").FirstOrDefault().Valor);
               liq.SANCION = Math.Round(lt.LstTotales.Where(t => t.Codigo == "SA").FirstOrDefault().Valor);
               liq.DECUENT = Math.Round(lt.LstTotales.Where(t => t.Codigo == "DE").FirstOrDefault().Valor);
               liq.TOTAL = Math.Round(lt.LstTotales.Where(t => t.Codigo == "TO").FirstOrDefault().Valor);
               liq.lDetallesLiquidacion = lDetalles;

               return liq;
           }
       }

       private List<Totales> Totalizar(decimal SubTotal, DateTime FechaLim) {
           decimal sancion=SancionExtemporaneidad(SubTotal,FechaLim) ;
           decimal interes=InteresMoraC(SubTotal, FechaLim) ;
           decimal descuento = 0;
           LstTotales = new List<Totales>();
           LstTotales.Add(new Totales { Codigo = "SU", Nombre = "SubTotal ", Valor = SubTotal });
           LstTotales.Add(new Totales { Codigo = "SA", Nombre = "Sanciones(+)", Valor = sancion});
           LstTotales.Add(new Totales { Codigo = "IN", Nombre = "Intereses (+) ", Valor = interes});
           LstTotales.Add(new Totales { Codigo = "DE", Nombre = "Descuento (-) ", Valor = descuento });
           LstTotales.Add(new Totales { Codigo = "TO", Nombre = "Total (=) ", Valor = SubTotal + sancion + interes - descuento });
           return LstTotales;
       }
       /// <summary>
       /// Consulta en Signus-Gobernación la Sanción de Extemporaneidad Vigente
       /// </summary>
       /// <param name="Deuda">Valor del Impuesto-SubTotal</param>
       /// <param name="FechaLim"></param>
       /// <returns>Valor de la Sanción de Exporaneidad</returns>
       private decimal SancionExtemporaneidad(decimal SubTotal, DateTime FechaLim) {
               string strFuncion = String.Format("SANCION_EXTEMPORANEIDAD(to_number('{0}'),sysdate,to_date('{1}','dd/mm/yyyy'),0)", Math.Round(SubTotal), FechaLim.ToShortDateString());
               string sentencia = "Select " + strFuncion + " from dual";
               decimal sancion = db.Database.SqlQuery<decimal>(sentencia).FirstOrDefault();
               return sancion;
           
       }
       /// <summary>
       /// Sanción Minima Gobernación
       /// </summary>
       /// <returns>Retorna la Sanción Mínima a Aplicar Vigente.</returns>
       private decimal SancionMinima()
       {
           
               decimal sancion = db.Database.SqlQuery<decimal>("Select SANCIONMINIMA(Sysdate) from dual").FirstOrDefault();
               return sancion;
           
       }
       /// <summary>
       /// Se Calcula el Valor de Interes a la Fecha
       /// </summary>
       /// <param name="SubTotal">SubTotal </param>
       /// <param name="FechaLim">FEcha Vencimiento</param>
       /// <returns>Valor de Interes a la Fecha de Corte</returns>
       private decimal InteresMoraC(decimal SubTotal, DateTime FechaLim)
       {
           string strFuncion = String.Format("Redondear(INTERESMORA(to_number('{0}'),to_date('{1}','dd/mm/yyyy'),sysdate-20))",Math.Round(SubTotal), FechaLim.ToShortDateString());
           string sentencia = "Select " + strFuncion + " from dual";
           decimal interes = db.Database.SqlQuery<decimal>("Select " + strFuncion + " from dual").FirstOrDefault();
           return interes;
       }
       
       /// <summary>
       /// Se Retorna El Lista de Impuestos a Liquidar, de acuerdo al Tipo de Agente
       /// </summary>
       /// <param name="UserName">Debe enviarle la Cédula del Usuario Actual</param>
       /// <returns>Valor del Impuesto</returns>
       public List<ImpuestosTarDto> GetImpuestosTar(string UserName, decimal Val_Base)
       {
          string TipAge = GetTipoAgente(UserName);
          //LstImp = TipAge == "D" ? LstImp.Where(t => t.Tip_Dep == true).ToList() : LstImp;
          foreach (var item in LstImp) {
                   string sentencia=String.Format("Select Fn_Ejecutar_Tarifa({1},tarifas_parametros({2},'00',{0})) Tar_Imp  from dual",item.Cod_Imp,item.Cod_Imp,item.Cod_Cla);
                   item.Tar_Imp = db.Database.SqlQuery<decimal>(sentencia).FirstOrDefault();
                   
                   if (TipAge == "O") {
                       if (item.Tip_Dep == true) item.Val_Base = 0;
                       else item.Val_Base = Val_Base; 
                   }
                   if (TipAge == "D")
                   {
                       item.Val_Base = Val_Base; 
                   }
                   
          }
          return LstImp;
       }
       //Obtiene el Tipo de Agente
       private string GetTipoAgente(string UserName)
       {
           using (ctx = new Entities())
           {
               SL_AGETDPTA Dep = ctx.SL_AGETDPTA.Where(t => t.TER_NIT == UserName).FirstOrDefault();
               if (Dep == null) return "O";
               else return "D";
           }
       }
    }
}
