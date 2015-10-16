var objgestion = (function () {
    "use strict";
    var TituloForm = "LIQUIDACION";
    var gridCon = '#jqxgridSol';
    var urlToGridCon = "/Servicios/wsSL_LIQESPAMPILLAS.asmx/Gets";
    var urlToNueva = "DetallesLiquidacion.aspx";
    var lLiquidaciones = new Array();

    var Periodo;
    var Vigencia;
    var Agente;

    var _addHandlers = function () {
        $('#btnDetalles').click(function () {
            var objPAA = objgestion.getRecord();
            if (objPAA != null) window.location.href = urlToNueva + "?NLIQ=" + objPAA.NRO_LIQ + "&VIG=" + objPAA.VIG_LIQ;
            else $("#LbMsg").msgBox({ titulo: "Liquidaciones", mensaje: "Debe seleccionar un registro de la tabla", tipo: false });
        });
    };
    var _createElements = function () {
        $("#TituloForm").html(TituloForm);
        $("#info").html("Liquidaciones del mes de " + byaPage.returnNombreMes(Periodo));
        _traerLiquidaciones();
    };
    var _traerLiquidaciones = function () {
        SL_LIQESTAMPILLAS_DAO.GetsXPeriodo(Periodo, Vigencia, Agente, function (result) {
            lLiquidaciones = byaPage.convertOBJ(result);
            crearTablaLiquidaciones();
        });
    };
    var tblLiquidaciones;
    var crearTablaLiquidaciones = function () {
        var config = {
            Id: '#tblLiquidaciones',
            Source: lLiquidaciones,
            fn_Editar: null,
            fn_Seleccionar: function (item) {
                window.location.href = urlToNueva + "?NLIQ=" + item.NRO_LIQ + "&VIG=" + item.VIG_LIQ + "&PER=" + Periodo;
            },
            lEliminar: false,
            lEditar: false,
            lSeleccionar: true,
            Display: 'NRO_CDP',
            Value: 'NRO_CDP',
            Enabled: false,
            fnFormatItem: function (item, index) {
                if (item.ESTADO == "LI") { item.NOM_ESTADO = "LIQUIDADO"; }
                if (item.ESTADO == "PA") { item.NOM_ESTADO = "PAGADO"; }
                if (item.ESTADO == "IN") { item.NOM_ESTADO = "ANULADO"; }

                var Consultar = '<span class="glyphicon glyphicon-search clsstblLiquidacionesSelect" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';

                var colomnBound = '<td><strong>' + item.NRO_LIQ + "</strong></td><td>" + item.NUM_CTO + "</td><td>" + item.NOM_TER + "</td><td class='text-right'>" + byaPage.formatNumber.new(item.VAL_BAS, "$") + "</td><td>" + byaPage.converJSONDate(item.FEC_LIQ) + "</td><td>" + Consultar + "</td>";
                return colomnBound;

            }
        };
        tblLiquidaciones = new byaTablaG();
        tblLiquidaciones.init(config);
        tblLiquidaciones.setEnabled(false);
        createFiltrosTabla();
    };
    var table;
    var createFiltrosTabla = function () {
        table = $('#tblLiquidaciones').DataTable({
            "language": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "<button type='button' class='btn btn-success btn-xs'><span class='glyphicon glyphicon-fast-backward' aria-hidden='true'></span>  Primero</button>",
                    "sLast": "<button type='button' class='btn btn-success btn-xs'>Último  <span class='glyphicon glyphicon-fast-forward' aria-hidden='true'></span></button>",
                    "sNext": "<button type='button' class='btn btn-success btn-xs'>Siguiente  <span class='glyphicon glyphicon-forward' aria-hidden='true'></span></button>",
                    "sPrevious": "<button type='button' class='btn btn-success btn-xs'><span class='glyphicon glyphicon-backward' aria-hidden='true'></span>  Anterior</button>"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            }
        });
    };
    return {
        editedRows: null,
        config: {
            dragArea: null,
            theme: null
        },
        init: function () {
            Periodo = $.getUrlVar("Per");
            if (Periodo == null) Periodo = "01";
            Vigencia = byaSite.getVigencia();

            var TipCon = $.getUrlVar("NGOV");
            if (TipCon == null) Agente = byaSite.getUsuario();
            else Agente = $.getUrlVar("AGE");

            _createElements();
            _addHandlers();
        }
    };
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Liquidaciones", Modulo: "Gestion", urlToPanelModulo: "gLiquidacion.aspx", Cod_Mod: "SOLI4", Rol: "PR_RECEP" });
    objgestion.config.theme = byaSite.tema
    objgestion.init();
});