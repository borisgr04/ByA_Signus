var objregistro = (function () {
    var activarValidar = true;
    var msgPpal = "#LbMsg";
    var Titulo = "Liquidación de Estampillas";
    var urlToTercero = "/Servicios/wsTerceros.asmx/Get";
    var urlToTiposDocumentos = "/Servicios/wsDatosBasicos.asmx/GetTiposDocumentos";
    var urlToTiposPersona = "/Servicios/wsDatosBasicos.asmx/GetTiposPersona";
    var urlToTiposRegimen = "/Servicios/wsDatosBasicos.asmx/GetTiposRegimen";
    var urlToCiudadesDepartamento = "/Servicios/wsDatosBasicos.asmx/GetCiudadesDepartamento";
    var lDETLIQ = new Array();

    var Tercero;
    var sl_tercero;
    var Liq;
    var IdLiqGuar;
    var camposLiq;
    var ValorPagar;

    var camposLiq;

    var NLIQ;
    var VIG;
    var PER;


    var llenarCamposLiq = function () {
        camposLiq = new Array();
        camposLiq.push("ID");
        camposLiq.push("AGE_REC");
        camposLiq.push("VIG_LIQ");
        camposLiq.push("NRO_LIQ");
        camposLiq.push("PER_LIQ");
        camposLiq.push("FEC_LIQ");
        camposLiq.push("TER_NIT");
        camposLiq.push("NUM_CTO");
        camposLiq.push("FEC_SUS");
        camposLiq.push("FEC_VEN");
        camposLiq.push("ADI_CTO");
        camposLiq.push("OBJ_CTO");
        camposLiq.push("VAL_CTO");
        camposLiq.push("VAL_BAS");
        camposLiq.push("OBS_LIQ");
        camposLiq.push("FEC_REG");
        camposLiq.push("USUARIO");
        camposLiq.push("SUB_TOT");
        camposLiq.push("INTERES");
        camposLiq.push("SANCION");
        camposLiq.push("DECUENT");
        camposLiq.push("TOTAL");
        camposLiq.push("ESTADO");
        camposLiq.push("NOM_ESTADO");
        camposLiq.push("NOM_TER");
        camposLiq.push("NOM_AGE");
        camposLiq.push("CODIGO_QR");
    };
    var _addHandlers = function () {
        $('.currency').byaSetDecimal(0);
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#btnImprimirLiq").click(function () {
            ImprimirLiquidacion();
        });
    };
    var ImprimirLiquidacion = function () {
        SL_LIQESTAMPILLAS_DAO.Get(Liq.ID, function (result) {
            var objLiquidacionImp = byaPage.convertOBJ(result);
            objLiquidacionImp.VAL_BAS = byaPage.formatNumber.new(objLiquidacionImp.VAL_BAS, "$");
            objLiquidacionImp.SUB_TOT = byaPage.formatNumber.new(objLiquidacionImp.SUB_TOT, "$");
            objLiquidacionImp.INTERES = byaPage.formatNumber.new(objLiquidacionImp.INTERES, "$");
            objLiquidacionImp.SANCION = byaPage.formatNumber.new(objLiquidacionImp.SANCION, "$");
            objLiquidacionImp.DECUENT = byaPage.formatNumber.new(objLiquidacionImp.DECUENT, "$");
            objLiquidacionImp.TOTAL = byaPage.formatNumber.new(objLiquidacionImp.TOTAL, "$");
            objLiquidacionImp.FEC_LIQ = byaPage.converJSONDate(objLiquidacionImp.FEC_LIQ);
            objLiquidacionImp.FEC_SUS = byaPage.converJSONDate(objLiquidacionImp.FEC_SUS);
            objLiquidacionImp.FEC_VEN = byaPage.converJSONDate(objLiquidacionImp.FEC_VEN);
            objLiquidacionImp.PER_LIQ = byaPage.returnNombreMes(objLiquidacionImp.PER_LIQ) + " de " + objLiquidacionImp.VIG_LIQ;

            if (objLiquidacionImp.ESTADO == "LI") { objLiquidacionImp.NOM_ESTADO = "LIQUIDADO"; }
            if (objLiquidacionImp.ESTADO == "PA") { objLiquidacionImp.NOM_ESTADO = "PAGADO"; }
            if (objLiquidacionImp.ESTADO == "IN") { objLiquidacionImp.NOM_ESTADO = "ANULADO"; }

            objLiquidacionImp.CODIGO_QR = update_qrcode("" + objLiquidacionImp.ID + "");

            var htmltbl = "";
            $.each(objLiquidacionImp.lDetallesLiquidacion, function (index, item) {
                if (index != objLiquidacionImp.lDetallesLiquidacion.length - 1) {
                    var tblImp = '<tr>' +
                                '<td style="text-align:left;border:none">' + item.NOM_IMP + '</td>' +
                                '<td style="text-align:center;width:80px;border:none"></td>' +
                                '<td style="text-align:center;width:80px;border:none"></td>' +
                                '<td style="text-align:right;border:none">' + (item.TAR_IMP * 100) + ' %</td>' +
                                '<td style="text-align:right;border:none">' + byaPage.formatNumber.new(item.VAL_BAS, "$") + '</td>' +
                                '<td style="text-align:right;border:none">' + byaPage.formatNumber.new(item.VAL_IMP, "$") + '</td>' +
                            '</tr>';
                } else {
                    var tblImp = '<tr>' +
                                '<td style="text-align:left;border-top:none;border-left:none;border-right:none" colspan="3">' + item.NOM_IMP + '</td>' +
                                '<td style="text-align:right;border-top:none;border-left:none;border-right:none">' + (item.TAR_IMP * 100) + ' %</td>' +
                                '<td style="text-align:right;border-top:none;border-left:none;border-right:none">' + byaPage.formatNumber.new(item.VAL_BAS, "$") + '</td>' +
                                '<td style="text-align:right;border-top:none;border-left:none;border-right:none">' + byaPage.formatNumber.new(item.VAL_IMP, "$") + '</td>' +
                            '</tr>';
                }
                htmltbl = htmltbl + tblImp;
            });
            $.get("/Estampillas/Liquidacion/ImpLiq.html", function (data) {
                $.each(camposLiq, function (index, item) {
                    data = data.split("{" + item + "}").join(objLiquidacionImp[item])
                    //data = data.replace("{" + item + "}", );
                });
                data = data.replace("{SEC_TBL_IMP}", htmltbl);
                var win;
                win = window.open();
                win.document.write(data);
                win.print();
                win.close();
            });
        });
    };
    var _crearElements = function () {
        $(".habilitarcancelar").byaSetHabilitar(false);
        llenarCamposLiq();
        _traerLiquidacion();

    };
    var _traerLiquidacion = function () {
        $("#info").html("");
        SL_LIQESTAMPILLAS_DAO.GetXNroLiq(NLIQ, VIG, function (result) {
            Liq = byaPage.convertOBJ(result);
            lDETLIQ = Liq.lDetallesLiquidacion;

            crearTablaDetallesLiquidacion();
            ValorPagar = "" + Liq.TOTAL + "";
            ValorPagar = ValorPagar.split(".")[0];

            $("#tblDETLIQ tbody").append("<tr style='border:none;'><td colspan='2' style='border:none;background-color:white'></td><td class='text-right'><strong>Subtotal: </strong></td><td class='text-right'>" + byaPage.formatNumber.new(Liq.SUB_TOT, "$") + "</td></tr>");
            $("#tblDETLIQ tbody").append("<tr><td colspan='2' style='border:none;background-color:white'></td><td class='text-right'><strong>Intereses: </strong></td><td class='text-right'>" + byaPage.formatNumber.new(Liq.INTERES, "$") + "</td></tr>");
            $("#tblDETLIQ tbody").append("<tr><td colspan='2' style='border:none;background-color:white'></td><td class='text-right'><strong>Descuento: </strong></td><td class='text-right'>" + byaPage.formatNumber.new(Liq.DECUENT, "$") + "</td></tr>");
            $("#tblDETLIQ tbody").append("<tr><td colspan='2' style='border:none;background-color:white'></td><td class='text-right'><strong>Sanción: </strong></td><td class='text-right'>" + byaPage.formatNumber.new(Liq.SANCION, "$") + "</td></tr>");
            $("#tblDETLIQ tbody").append("<tr><td colspan='2' style='border:none;background-color:white'></td><td class='text-right'><strong>Total: </strong></td><td class='text-right'>" + byaPage.formatNumber.new(Liq.TOTAL, "$") + "</td></tr>");

            Liq.VAL_CTO = byaPage.formatNumber.new(Liq.VAL_CTO, "$");
            Liq.VAL_BAS = byaPage.formatNumber.new(Liq.VAL_BAS, "$");
            Liq.SUB_TOT = byaPage.formatNumber.new(Liq.SUB_TOT, "$");
            Liq.INTERES = byaPage.formatNumber.new(Liq.INTERES, "$");
            Liq.SANCION = byaPage.formatNumber.new(Liq.SANCION, "$");
            Liq.DECUENT = byaPage.formatNumber.new(Liq.DECUENT, "$");
            Liq.TOTAL = byaPage.formatNumber.new(Liq.TOTAL, "$");
            Liq.FEC_LIQ = byaPage.converJSONDate(Liq.FEC_LIQ);
            Liq.FEC_SUS = byaPage.converJSONDate(Liq.FEC_SUS);
            Liq.FEC_VEN = byaPage.converJSONDate(Liq.FEC_VEN);
            Liq.PER_LIQ = byaPage.returnNombreMes(Liq.PER_LIQ) + " de " + Liq.VIG_LIQ;
            if (Liq.ESTADO == "LI") { Liq.NOM_ESTADO = "LIQUIDADO"; $(".habilitarcancelar").byaSetHabilitar(true); }
            if (Liq.ESTADO == "PA") { Liq.NOM_ESTADO = "PAGADO"; $(".habilitarcancelar").byaSetHabilitar(false); }
            if (Liq.ESTADO == "IN") { Liq.NOM_ESTADO = "ANULADO"; $(".habilitarcancelar").byaSetHabilitar(false); }

            var DataFields = [
                    { Titulo: 'Número', Campo: 'NRO_LIQ', Tipo: 'S' },
                    { Titulo: 'Contrato', Campo: 'NUM_CTO', Tipo: 'S' },
                    { Titulo: 'Vigencia', Campo: 'VIG_LIQ', Tipo: 'S' },
                    { Titulo: 'Estado', Campo: 'NOM_ESTADO', Tipo: 'S' },
                    { Titulo: 'Replicado', Campo: 'REPLICADO', Tipo: 'S' },
                    { Titulo: 'Periodo', Campo: 'PER_LIQ', Tipo: 'S' },
                    { Titulo: 'Fecha liquidacion', Campo: 'FEC_LIQ', Tipo: 'S' },
                    { Titulo: 'Nombre', Campo: 'NOM_TER', Tipo: 'S' },
                    { Titulo: 'Agente recaudador', Campo: 'NOM_AGE', Tipo: 'S' },
                    { Titulo: 'Valor', Campo: 'VAL_CTO', Tipo: 'S' },
                    { Titulo: 'Valor base', Campo: 'VAL_BAS', Tipo: 'S' },
                    { Titulo: 'Observacion', Campo: 'OBS_LIQ', Tipo: 'S' }
                    //{ Titulo: 'Sub Total', Campo: 'SUB_TOT', Tipo: 'S' },
                    //{ Titulo: 'Intereses (+)', Campo: 'INTERES', Tipo: 'S' },
                    //{ Titulo: 'Sancion (+)', Campo: 'SANCION', Tipo: 'S' },
                    //{ Titulo: 'Descuentos (-)', Campo: 'DECUENT', Tipo: 'S' },
                    //{ Titulo: 'Total', Campo: 'TOTAL', Tipo: 'S' }

            ];
            var Titulo = null;
            $('#infoLiquidacion').DetailsJSON(Liq, DataFields, Titulo);
        });
    };
    var tblDETLIQ;
    var crearTablaDetallesLiquidacion = function () {
        var config = {
            Id: '#tblDETLIQ',
            Source: lDETLIQ,
            fn_Editar: null,
            fn_Seleccionar: null,
            lEliminar: false,
            lEditar: false,
            lSeleccionar: false,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: false,
            fnFormatItem: function (item, index) {
                var colomnBound = '<td><strong>' + item.NOM_IMP + "</strong></td><td class='text-right'>" + (item.TAR_IMP) * 100 + " %</td><td class='text-right'>" + byaPage.formatNumber.new(item.VAL_BAS, "$") + "</td><td class='text-right'>" + byaPage.formatNumber.new(item.VAL_IMP, "$") + "</td>";
                return colomnBound;

            }
        };
        tblDETLIQ = new byaTablaG();
        tblDETLIQ.init(config);
        tblDETLIQ.setEnabled(false);
    };
    var CancelarLiquidacion = function () {
        SL_LIQESTAMPILLAS_DAO.CancelarLiquidacion(Liq.ID, function (result) {
            var Res = byaPage.convertOBJ(result);
            $("#info").msgBox({ titulo: "Detalles Liquidación", mensaje: Res.Mensaje, tipo: !Res.Error });
            if (Res.Error == false) _traerLiquidacion();
        });
    };
    return {
        formulario: '#form1',
        disabled: true,
        config: {
            theme: null,
            oper: null
        },
        init: function () {
            NLIQ = $.getUrlVar("NLIQ");
            VIG = $.getUrlVar("VIG");
            PER = $.getUrlVar("PER");

            _addHandlers();
            _crearElements();
        },
        DesOrhabilitar: function (value) {
            $(".habilitar").byaSetHabilitar(value);
        },
        Limpiar: function () {
            $(".limpiar").val("");
        },
        Periodo: function(){
            return $.getUrlVar("PER");
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Detalles liquidacion", Modulo: "Gestión", urlToPanelModulo: "gLiquidacion.aspx?Per=" + objregistro.Periodo(), Cod_Mod: "ADMIN", Rol: "ADM_TERC" });
    objregistro.init();
});