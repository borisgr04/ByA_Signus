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
    public class mCONSULTA
    {
        Entities ctx;
        public List<ConsultaXAgenteDto> ConsultaXAgente(string Ter_Ide, string ClDec, string Vigencia)
        {
            using (ctx = new Entities())
            {
                string querystring = " SELECT cal.cal_vig vigencia, cal.cal_per periodo, cal.cal_fven vencimiento, bali_fech fechacargue, d.dec_est estado,";
                querystring += " d.dec_ptot valor, Dec_Fpre FechaPago, ";
                querystring += " Case When bl.Bali_est='AC' and d.dec_est is null Then 'MM' When d.dec_est ='DC' Then 'DC' When d.dec_est ='PR' Then 'PR' Else 'ND' End EstadoFinan,";
                querystring += " Case When bl.Bali_est='AC' and d.dec_est is null Then 'Diligenciar' When d.dec_est ='DC' Then 'Subir Pago' When d.dec_est ='PR' Then '' Else 'Subir Archivo' End Accion,";
                querystring += " d.dec_cod";
                querystring += " FROM calendario cal LEFT JOIN bases_liq bl ON bl.bali_nit = '" + Ter_Ide + "' AND bl.bali_aÑo = cal_vig AND bl.bali_peri = cal_per And bl.Bali_est='AC' AND bl.bali_cdec = cal.cal_cla ";
                querystring += " LEFT JOIN declaracion d ON d.dec_per = cal_per AND d.dec_ano = cal_vig AND dec_nit = '" + Ter_Ide + "' AND d.dec_cdec = cal.cal_cla and d.DEC_EST<>'AN'  WHERE cal.cal_cla = '" + ClDec + "' And cal.cal_vig='" + Vigencia + "' And cal.cal_fven < sysdate";
                querystring += "  Order by Cal_Per desc ";

                List<ConsultaXAgenteDto> c = new List<ConsultaXAgenteDto>();
                c = ctx.Database.SqlQuery<ConsultaXAgenteDto>(querystring).ToList();
                return c;
            }     
        }
    }
}
