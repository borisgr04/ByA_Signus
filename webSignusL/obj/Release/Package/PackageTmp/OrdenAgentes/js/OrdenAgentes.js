var objregistro = (function () {
    var activarValidar = true;
    var msgPpal = "#LbMsg";
    var Titulo = "Orden Agentes";
    var urlToGridCon = "/Servicios/wsTerceros.asmx/GetsAll";
    var gridCon = '#jqxgridTer';
    var lTerceros = new Array();

    var _addHandlers = function () {
        $("#btnBuscarTer").click(function () {
            $("#modalTer").modal("show");
        });
        $("#btnAgregarBus").click(function () {
            AgregarAgente();
        });
    };
    var _crearElements = function () {
        createFiltrosTabla();
        _traerTerceros();
        _createGridCon();
    };
    var _traerTerceros = function () {
        SL_AGETDPTA_DAO.Gets(function (result) {
            lTerceros = byaPage.convertOBJ(result);
            _crearTablaTerceros();
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
        });
    };
    var tblTerceros;
    var _crearTablaTerceros = function () {
        table.destroy();
        var config = {
            Id: '#tblTerceros',
            Source: lTerceros,
            fn_Editar: EliminarAgente,
            lEditar: true,
            Enabled: true,
            fnFormatItem: function (item, index) {
                var Editar = '<span class="glyphicon glyphicon-remove clsstblTercerosEdit" id="' + index + '" aria-hidden="true" style="text-align:center"></span>';
                var colomnBound = '<td>' + item.TER_NOM + "</td><td>" + item.TER_NIT + "</td>";
                var Botones = '<td>' + Editar + ' </td>';
                return colomnBound + Botones;
            }
        };
        tblTerceros = new byaTablaG();
        tblTerceros.init(config);
        tblTerceros.setEnabled(true);
        createFiltrosTabla();
    };
    var table;
    var EliminarAgente = function (item, index) {
        var con = confirm("Esta seguro que quiere eliminar este agente?");
        if (con) {
            var Par = {};
            Par.TER_NIT = item.TER_NIT;
            SL_AGETDPTA_DAO.Delete(Par, function (result) {
                var res = byaPage.convertOBJ(result);
                $(msgPpal).msgBox({ titulo: Titulo, mensaje: res.Mensaje, tipo: !res.Error });
                if (res.Error == false) _traerTerceros();
            });
        }
    };
    var createFiltrosTabla = function () {
        table = $('#tblTerceros').DataTable({
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
    var AgregarAgente = function () {
        var Par = {};
        Par.TER_NIT = $("#txtNitAgenteRecaudador").val();

        SL_AGETDPTA_DAO.Insert(Par, function (result) {
            var res = byaPage.convertOBJ(result);
            $(msgPpal).msgBox({ titulo: Titulo, mensaje: res.Mensaje, tipo: !res.Error });
            if (res.Error == false) _traerTerceros();
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
            _addHandlers();
            _crearElements();
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Orden Agentes", Modulo: "Gestión", urlToPanelModulo: "OrdenAgentes.aspx", Cod_Mod: "ADMSG", Rol: "ADMSGOrdenAge" });
    objregistro.init();
});