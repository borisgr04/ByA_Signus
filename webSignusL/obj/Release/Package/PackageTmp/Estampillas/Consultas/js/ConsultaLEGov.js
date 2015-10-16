var objregistro = (function () {
    var activarValidar = true;
    var msgPpal = "#LbMsg";
    var Titulo = "Liquidación de Estampillas";
    var lConsulta;
    var Consulta;

    var gridCon = '#jqxgridTer';
    var urlToGridCon = "/Servicios/wsTerceros.asmx/GetsAll";
    var TerceroSelect = {};

    var _addHandlers = function () {
        $("#cboPeriodo").change(function () {
            _realizarConsulta();
        });
        $("#btnBuscarTer").click(function () {
            $("#modalTer").modal("show");
        });
        $("#btnIrLiquidadas").click(function () {
            window.location.href = "/Estampillas/gLiquidacion/gLiquidacion.aspx?Per=" + $("#cboPeriodo").val() + "&NGOV=S&AGE=" + $("#txtNitAgenteRecaudador").val(); 
        });
        $("#btnIrPagadas").click(function () {
            window.location.href = "/Estampillas/gLiquidacion/gPagadas.aspx?Per=" + $("#cboPeriodo").val() + "&NGOV=S&AGE=" + $("#txtNitAgenteRecaudador").val();
        });
    };
    var _createGridCon = function () {
        var source = {
            datatype: "xml",
            datafields: [
	                { name: 'TER_NIT', type: 'number' },
                    { name: 'TER_NOM' }
            ],
            async: true,
            record: 'Table',
            url: urlToGridCon
        };
        var cellsrendererNOM = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        }
        var cellsrendererIDE = function (row, column, value) {
            return '<div style="margin-left: 5px;margin-top: 5px; font-size: 11px">' + value + '</div>';
        }
        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        $(gridCon).jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        theme: ModTer.config.theme,
                        localization: byaPage.getLocalization(),
                        height: 350,
                        sortable: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        pageable: true,
                        enabletooltips: true,
                        columns: [
                          { text: 'Identificación', datafield: 'TER_NIT', width: 150, cellsformat: 'd', cellsalign: 'right' },
                          { text: 'Apellidos y Nombre', datafield: 'TER_NOM', cellsrenderer: cellsrendererNOM }
                        ]
                    });

        //rowselect
        $(gridCon).bind('rowdoubleclick', function (event) {
            var selectedRowIndex = event.args.rowindex;
            var datarow = {};
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'TER_NIT');
            $("#txtNitAgenteRecaudador").val(cell.value);
            var cell = $(gridCon).jqxGrid('getcell', selectedRowIndex, 'TER_NOM');
            $("#txtNombreAgenteRecaudador").val(cell.value);
            $("#modalTer").modal("hide");
            _realizarConsulta();
        });
    };
    var _crearElements = function () {
        var now = new Date();
        var strNow = "" + byaPage.FechaShortX(now) + "";
        var dt = strNow.split("-");
        $("#cboPeriodo").val(dt[1]);
        _realizarConsulta();
        _createGridCon();
    };
    var _realizarConsulta = function () {
        var per = $("#cboPeriodo").val();
        var vig = byaSite.getVigencia();
        var user = $("#txtNitAgenteRecaudador").val();
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
                var colomnBound = '<td>' + item.NOM_IMP + "</td><td>" + byaPage.formatNumber.new(item.TOTAL_LIQUIDADO, "$") + "</td><td>" + byaPage.formatNumber.new(item.TOTAL_PAGADO, "$") + "</td>";
                return colomnBound;
            }
        };
        tblDETLIQ = new byaTablaG();
        tblDETLIQ.init(config);
        tblDETLIQ.setEnabled(false);
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
    byaSite.SetModuloP({ TituloForm: "Liquidaciones", Modulo: "Gestión", urlToPanelModulo: "ConsultaLE.aspx", Cod_Mod: "ADMSG", Rol: "ADMSGConsultaGov" });
    objregistro.init();
});
