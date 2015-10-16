var objregistro = (function () {
    var activarValidar = true;
    var msgPpal = "#LbMsg";
    var Titulo = "Liquidación de Estampillas";
    var lConsulta;
    var Consulta;

    var _addHandlers = function () {
        $("#cboPeriodo").change(function () {
            if ($(this).val().length == 1) _realizarConsulta();
            else alert("Solo puede seleccionar un periodo");
        });
        $("#btnIrLiquidadas").click(function () {
            window.location.href = "/Estampillas/gLiquidacion/gLiquidacion.aspx?Per=" + $("#cboPeriodo").val();;
        });
        $("#btnIrPagadas").click(function () {
            window.location.href = "/Estampillas/gLiquidacion/gPagadas.aspx?Per=" + $("#cboPeriodo").val();;
        });
    };
    var _crearElements = function () {
        var now = new Date();
        var strNow = "" + byaPage.FechaShortX(now) + "";       
        var dt = strNow.split("-");
        $("#cboPeriodo").val(dt[1]);
        _realizarConsulta();
    };
    var _realizarConsulta = function () {
        var per = $("#cboPeriodo").val();
        var vig = byaSite.getVigencia();
        var user = byaSite.getUsuario();
        SL_LIQESTAMPILLAS_DAO.ConsultaLE(per, vig, user, function (result) {
            Consulta = byaPage.convertOBJ(result);
            lConsulta = Consulta.CONSULTA;
            $("#InfoConsulta").msgBox({ titulo: "", mensaje: "<strong>Fecha de vencimiento: </strong>" + byaPage.converJSONDate(Consulta.FECHA_VENCIMIENTO) + "   <strong>Estado: </strong>" + Consulta.ESTADO, tipo: "info" });
            crearTablaConsulta();
        });
    };
    var tblConsulta;
    var crearTablaConsulta = function () {
        var config = {
            Id: '#tblConsulta',
            Source: lConsulta,
            fn_Editar: null,
            fn_Seleccionar: null,
            lEliminar: false,
            lEditar: false,
            lSeleccionar: false,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: false,
            fnFormatItem: function (item, index) {
                var colomnBound = '<td><strong>' + item.NOM_IMP + "</strong></td><td class='text-right'>" + byaPage.formatNumber.new(item.TOTAL_LIQUIDADO, "$") + "</td><td class='text-right'>" + byaPage.formatNumber.new(item.TOTAL_PAGADO, "$") + "</td>";
                return colomnBound;
            }
        };
        tblConsulta = new byaTablaG();
        tblConsulta.init(config);
        tblConsulta.setEnabled(false);
    };
    return {
        formulario: '#form1',
        disabled: true,
        config: {
            theme: null,
            oper: null
        },
        init: function () {
            _addHandlers();
            _crearElements();
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
    byaSite.SetModuloP({ TituloForm: "Liquidaciones", Modulo: "Gestión", urlToPanelModulo: "ConsultaLE.aspx", Cod_Mod: "ADMIN", Rol: "ADM_TERC" });
    objregistro.init();
});
