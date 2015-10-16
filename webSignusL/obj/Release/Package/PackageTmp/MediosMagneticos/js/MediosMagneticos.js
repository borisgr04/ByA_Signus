var objregistro = (function () {
    var activarValidar = true;
    var msgPpal = "#LbMsg";
    var Titulo = "Medios Magneticos";
    var urlToTercero = "/Servicios/wsTerceros.asmx/Get";
    var urlToTiposDocumentos = "/Servicios/wsDatosBasicos.asmx/GetTiposDocumentos";
    var urlToTiposPersona = "/Servicios/wsDatosBasicos.asmx/GetTiposPersona";
    var urlToTiposRegimen = "/Servicios/wsDatosBasicos.asmx/GetTiposRegimen";
    var urlToCiudadesDepartamento = "/Servicios/wsDatosBasicos.asmx/GetCiudadesDepartamento";
    var lDETLIQ = new Array();

    var Consulta;

    var Tercero;
    var sl_tercero;
    var Liq;
    var IdLiqGuar;
    var camposLiq;
    var ValorPagar;



    var _addHandlers = function () {
        $("#btnRealizar").click(function () {
            RealizarMedioMagnetico();
        });
        $("#cboPeriodos").change(function () {
            _realizarConsulta();
        });
    };
    var _crearElements = function () {
        $("#txtVigenciaMedioMagnetico").val(byaSite.getVigencia());

        var now = new Date();
        var strNow = "" + byaPage.FechaShortX(now) + "";
        var dt = strNow.split("-");
        $("#cboPeriodos").val(dt[1]);
        _realizarConsulta();
    };
    var RealizarMedioMagnetico = function () {
        var Agente = byaSite.getUsuario();
        var Periodo = $("#cboPeriodos").val();
        var Vigencia = byaSite.getVigencia();
        MEDIOS_MAGNETICOS_DAO.Insert(Vigencia, Periodo, Agente, function (result) {
            var Res = byaPage.convertOBJ(result);
            $("#LbMsg").msgBox({ titulo: "Medios Magneticos", mensaje: Res.Mensaje, tipo: !Res.Error });
        });
    };

    var _realizarConsulta = function () {
        var per = $("#cboPeriodos").val();
        var vig = byaSite.getVigencia();
        var user = byaSite.getUsuario();
        SL_LIQESTAMPILLAS_DAO.ConsultaLE(per, vig, user, function (result) {
            Consulta = byaPage.convertOBJ(result);
            lConsulta = Consulta.CONSULTA;
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
                var colomnBound = '<td><strong>' + item.NOM_IMP + "</strong></td><td class='text-right'>" + byaPage.formatNumber.new(item.TOTAL_PAGADO, "$") + "</td>";
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
    byaSite.SetModuloP({ TituloForm: "Cancelar Pago", Modulo: "Gestión", urlToPanelModulo: "Pagos.aspx", Cod_Mod: "MEDMG", Rol: "MEDMG" });
    objregistro.init();
});
