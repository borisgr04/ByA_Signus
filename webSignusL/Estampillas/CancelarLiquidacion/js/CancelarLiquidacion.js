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
    var posPago = false;



    var _addHandlers = function () {
        $('.currency').byaSetDecimal(0);
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $("#btnBuscarLiquidacion").click(function () {
            var value = $("#txtBsqNumeroLiquidacion").val();
            if ((value != "")&& (!byaPage.TieneLetras(value))) {
                _traerLiquidacion();
                $("#txtBsqNumeroLiquidacion").tooltip("hide");
            } else {
                $("#txtBsqNumeroLiquidacion").attr("title", "Debe digitar un número de liquidación");
                $("#txtBsqNumeroLiquidacion").tooltip("show");
                byaPage.irInicio();
                $("#txtBsqNumeroLiquidacion").focus();
            }
        });
        $("#btnTraerValorPago").click(function () {
            $("#txtValorPago").val(ValorPagar);
            $('.currency').formatCurrency();
        });
        $("#btnCancelarLiquidacion").click(function () {
            CancelarLiquidacion();
        });
        $("#txtBsqNumeroLiquidacion").tooltip({
            'trigger': 'manual'
        });
        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });
        $("#txtBsqNumeroLiquidacion").blur(function () {
            var value = $("#txtBsqNumeroLiquidacion").val();
            if ((value != "")&& (!byaPage.TieneLetras(value))) {
                _traerLiquidacion();
                $("#txtBsqNumeroLiquidacion").tooltip("hide");
            } else {
                $("#txtBsqNumeroLiquidacion").attr("title", "Debe digitar un número de liquidación");
                $("#txtBsqNumeroLiquidacion").tooltip("show");
                byaPage.irInicio();
                $("#txtBsqNumeroLiquidacion").focus();
            }
        });
    };
    var _crearElements = function () {
        $(".habilitarcancelar").byaSetHabilitar(false);
        $("#txtBsqVigenciaLiquidacion").val(byaSite.getVigencia());
        $("#txtBsqNumeroLiquidacion").focus();
    };
    var _traerLiquidacion = function () {
        $("#info").html("");
        SL_LIQESTAMPILLAS_DAO.GetXNroLiq($("#txtBsqNumeroLiquidacion").val(), $("#txtBsqVigenciaLiquidacion").val(), function (result) {
            Liq = byaPage.convertOBJ(result);
            if (Liq != null) {
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
                if (Liq.REPLICADO == "SI") $(".habilitarcancelar").byaSetHabilitar(false);

                $("#linkInfo").html(" + Informacion de la liquidación [Contrato: " + Liq.NUM_CTO + " " + Liq.NOM_TER + "]");

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
                if (!posPago) {
                    if (Liq.ESTADO == "PA") $("#secInfo").msgBox({ titulo: "", mensaje: "Se cargó la liquidación Nro.  " + $("#txtBsqNumeroLiquidacion").val() + " de " + $("#txtBsqVigenciaLiquidacion").val() + ", <strong>esta liquidación ya fue pagada</strong><br/>Pulse en <strong>+ Información de la liquidación</strong> para ver detalles", tipo: 'danger' });
                    else {
                        if (Liq.ESTADO == "IN") $("#secInfo").msgBox({ titulo: "", mensaje: "Se cargó la liquidación Nro.  " + $("#txtBsqNumeroLiquidacion").val() + " de " + $("#txtBsqVigenciaLiquidacion").val() + ", <strong>esta liquidación fue anulada</strong><br/>Pulse en <strong>+ Información de la liquidación</strong> para ver detalles", tipo: 'danger' });
                        else $("#secInfo").msgBox({ titulo: "", mensaje: "Se cargó la liquidación Nro.  " + $("#txtBsqNumeroLiquidacion").val() + " de " + $("#txtBsqVigenciaLiquidacion").val() + "<br/>Pulse en <strong>+ Información de la liquidación</strong> para ver detalles", tipo: 'info' });
                    }
                }
            } else {
                $("#secInfo").msgBox({ titulo: "Error:", mensaje: "El número de liquidación que ha ingresado no existe", tipo: 'danger' });
                posPago = false;
            }
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
            $("#secInfo").msgBox({ titulo: "Cancelar Liquidación", mensaje: Res.Mensaje, tipo: !Res.Error });
            if (Res.Error == false) { posPago = true; _traerLiquidacion() };
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
            if (byaSite.getUsuario() != "admin") {
                _addHandlers();
                _crearElements();
            } else {
                $("#LbMsg").msgBox({ titulo: "Liquidación de estampillas", mensaje: "El Administrados no puede realizar ninguna operación en este formulario", tipo: false });
            }
        },
        DesOrhabilitar: function (value) {
            $(".habilitar").byaSetHabilitar(value);
        },
        Limpiar: function () {
            $(".limpiar").val("");
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Pagos", Modulo: "Gestión", urlToPanelModulo: "Pagos.aspx", Cod_Mod: "SLQES", Rol: "SLQESCanLiq" });
    objregistro.init();
});