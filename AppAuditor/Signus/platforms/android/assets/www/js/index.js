var Elecc = (function () {
    
    var objLiquidacion;
    var lAgentes = new Array();
    var lrConsultaXAgente = new Array();

    var ControlPages = (function () {
        var lPages = new Array();
        var Navegacion = new Array();
        var _llenarlPages = function () {
            lPages.push("pageHome");
            lPages.push("pageDetallesLiquidacion");
            lPages.push("pageAgentesRecaudadores");
            lPages.push("pageConsultaPorAgentes");
        };
        var _MostrarPage = function (strPage) {
            $.each(lPages, function (index, item) {
                if (item == strPage) {
                    $("#" + item).fadeIn();
                    Navegacion.push(strPage);
                }
                else $("#" + item).fadeOut();
            });
        };
        var _atras = function () {
            if (Navegacion.length > 1) {
                $("#" + Navegacion[Navegacion.length - 2]).fadeIn();
                $("#" + Navegacion[Navegacion.length - 1]).fadeOut();
                delete Navegacion[Navegacion.length - 1];
                Navegacion.splice(Navegacion.length - 1, 1);
            }
        };
        return {
            init: function (pageIni) {                
                _llenarlPages();
                _MostrarPage(pageIni);
            },
            atras: function () {
                _atras();
            },
            MostrarPage: function (strpage) {
                _MostrarPage(strpage);
            }
        };
    }());
    
    
    
    var _addHandlers = function () {
        $("#btnAtras").click(function () {
            ControlPages.atras();
        });
        $("#btnCerrarSesion").click(function () {
            localStorage.removeItem("UsuarioSignus");
            window.location.href = "login.html";
        });
        $("#btnNuevoEvento").click(function () {            
            LeerQr();  
        });
        $("#btnBuscarAgente").click(function () {
            BuscarAgentesRecaudadores();
        });
    };
    var _createElements = function () {
        ControlPages.init("pageHome");
        DATOSBASICOS_DAO.GetsVigencias(function (result) {
            $("#cboVigencias").byaCombo({ DataSource: result, Value: "VIG_COD", Display: "VIG_COD" });
            var now = new Date();
            var year = "" + (now.getFullYear()) + "";
            $("#cboVigencias").val(year);
            $('#cboVigencias').selectmenu('refresh', true);
        });

    };
    var EventoAtras = function () {
    };
    var VerificarSesion = function () {
        var ses = localStorage.getItem("UsuarioSignus");
        if (ses == null) {
            localStorage.removeItem("UsuarioSignus");
            window.location.href = "login.html";
        } else {
            return true;
        }
    };
    var LeerQr = function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (result.text != "") {
                    SL_LIQESTAMPILLAS_DAO.Get(result.text, function (result) {
                        if (result != null) {
                            objLiquidacion = result;
                            MostrarLiquidacion();
                            ControlPages.MostrarPage("pageDetallesLiquidacion");
                        } else alert("El código capturado no corresponde a ninguna liquidación registrada en el sistema");
                    });
                }
            },
            function (error) {
                alert("El escaner fallo : " + error);
            }
        );
    };
    var MostrarLiquidacion = function () {
        var strTablaDetLiq = '<table style="font-size:90%; width:100%">';
        $.each(objLiquidacion.lDetallesLiquidacion, function (index, item) {
            strTablaDetLiq = strTablaDetLiq + '<tr>'+
                                               '<td colspan="4">'+
                                                        '<p><strong>' + item.NOM_IMP + '</strong></p>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>'+
                                                        '<p><strong>Codigo:</strong></p>'+
                                                    '</td>'+
                                                    '<td>'+
                                                        '<p>' + item.COD_IMP + '</p>'+
                                                    '</td> '+
                                                    '<td>'+
                                                        '<p><strong>Tarifa:</strong></p>'+
                                                    '</td>'+
                                                    '<td>'+
                                                        '<p>' + (item.TAR_IMP * 100) + '%</p>'+
                                                    '</td>          '+                                  
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>'+
                                                        '<p><strong>Base:</strong></p>'+
                                                    '</td>'+
                                                    '<td>'+
                                                        '<p>' + byaPage.formatNumber.new(item.VAL_BAS, "$") + '</p>' +
                                                    '</td> '+
                                                     '<td>'+
                                                        '<p><strong>Impuesto:</strong></p>'+
                                                    '</td>'+
                                                    '<td>'+
                                                        '<p>' + byaPage.formatNumber.new(item.VAL_IMP, "$") + '</p>' +
                                                    '</td>                  '+                          
                                                '</tr>' +
                                                '<tr><td colspan="4"><hr /></td></tr>';
        });
        strTablaDetLiq = strTablaDetLiq + '</table> ';

        if (objLiquidacion.ESTADO == "LI") { objLiquidacion.NOM_ESTADO = "LIQUIDADO"; objLiquidacion.FechaPago = "  ---  "; }
        if (objLiquidacion.ESTADO == "PA") { objLiquidacion.NOM_ESTADO = "PAGADO"; objLiquidacion.FechaPago.substring(0, 10); }
        if (objLiquidacion.ESTADO == "IN") { objLiquidacion.NOM_ESTADO = "ANULADO"; objLiquidacion.FechaPago = "  ---  "; }

        if(objLiquidacion.REPLICADO == "SI") objLiquidacion.NOM_REPLICADO = " - REPORTADO";
        else objLiquidacion.NOM_REPLICADO = "";
        
        $("#dvdDetLiqInfo").html('<table style="font-size:95%; width:100%">'+
                                        '<tr>'+
                                            '<td>'+
                                                '<p><strong>Fecha de liquidacion: </strong></p>'+
                                            '</td>'+   
                                            '<td>'+ 
                                                  objLiquidacion.FEC_LIQ.substring(0, 10) +
                                            '</td>  '+                                     
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>'+
                                                '<p><strong>Valor: </strong></p>'+
                                            '</td>'+
                                            '<td>'+
                                                byaPage.formatNumber.new(objLiquidacion.TOTAL, "$")+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>'+
                                                '<p><strong>Fecha de pago: </strong></p>'+
                                            '</td>'+
                                            '<td>'+
                                                 objLiquidacion.FechaPago.substring(0, 10) +
                                            '</td>'+
                                        '</tr>'+
                                        '<tr>'+                                           
                                            '<td>'+
                                                '<p><strong>Estado: </strong></p>'+
                                            '</td>'+
                                            '<td>'+
                                                objLiquidacion.NOM_ESTADO + objLiquidacion.NOM_REPLICADO +
                                            '</td>'+
                                        '</tr> '+
                                        '<tr><td></td></tr>'+
                                        '<tr><td></td></tr>  '+   
                                        '<tr>'+
                                            '<td>'+
                                                '<p><strong>Numero: </strong></p>'+
                                            '</td>     '+
                                            '<td>'+
                                                objLiquidacion.NRO_LIQ +
                                            '</td>'+                                       
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>'+
                                                '<p><strong>Vigencia: </strong></p>'+
                                            '</td>'+
                                            '<td>'+
                                                objLiquidacion.VIG_LIQ +
                                            '</td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>'+
                                                '<p><strong>Periodo: </strong></p>'+
                                            '</td>'+
                                            '<td>'+
                                                byaPage.returnNombreMes(objLiquidacion.PER_LIQ) +
                                            '</td>'+
                                        '</tr>'+
                                        '<tr><td></td></tr>'+
                                        '<tr><td></td></tr>'+
                                        '<tr>'+
                                            '<td>'+
                                               '<p><strong>Recaudador </strong></p>'+
                                            '</td>'+                                                                                      
                                        '</tr>'+
                                        '<tr>'+
                                            '<td colspan="2">'+
                                                objLiquidacion.NOM_AGE +
                                            '</td>'+
                                        '</tr>'+
                                        '<tr><td></td></tr>'+
                                        '<tr><td></td></tr>'+
                                        '<tr>'+
                                            '<td>'+
                                                '<p><strong>Contribuyente: </strong></p>'+
                                            '</td>  '+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td colspan="2">'+
                                                objLiquidacion.NOM_TER +
                                            '</td>'+
                                        '</tr>'+
                                        '<tr>   '+                                         
                                            '<td colspan="2">'+
                                                '<p><strong>Observacion: </strong></p>' +
                                            '</td>                                      '+      
                                        '</tr>    '+
                                        '<tr>'+
                                            '<td colspan="2">'+
                                                '<p style="text-align:justify">' + objLiquidacion.OBS_LIQ + '</p>'+
                                            '</td>'+
                                        '</tr>  '+
                                    '</table> '+
                                    '<h4 style="text-align:center ;-webkit-box-shadow: 0 10px 6px -6px #1a1a1a;-moz-box-shadow: 0 10px 6px -6px #1a1a1a;box-shadow: 0 10px 6px -6px #1a1a1a;">Estampillas</h4>    '+                        
                                    '<div style="background-color:#f3f3f3; font-size: 0.7rem; margin:5px">'+
                                        '<div style="padding:4px">'+
                                            strTablaDetLiq +
                                        '</div>'+
                                    '</div>');

    };
    var BuscarAgentesRecaudadores = function () {
        AGENTES_DAO.GetsFiltro($("#txtAgente").val(), function (result) {
            lAgentes = result;
            if (lAgentes.length > 0) {
                $("#lstAgentes").html("");
                $.each(lAgentes, function (index, item) {
                    $("#lstAgentes").append("<li><a id='" + index + "' onclick='Elecc.ConsultaPorAgentes(id)' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><p>" + item.TER_NOM + "</p></a></li>");
                })
                $("#lstAgentes").trigger('create');
                ControlPages.MostrarPage("pageAgentesRecaudadores");
            } else {
                ControlPages.MostrarPage("pageHome");
                alert("No hay resultados para esta búsqueda");
            }
        });
    };
    var ConsultaPorAgentes = function (index) {
        CONSULTAS_DAO.ConsultaPorAgente(lAgentes[index].TER_NIT, "40", $("#cboVigencias").val(), function (result) {
            ControlPages.MostrarPage("pageConsultaPorAgentes");
            $("#dvdVigencia").html("<strong>Vigencia: </strong>" + $("#cboVigencias").val());
            lrConsultaXAgente = result;
            if (lrConsultaXAgente.length > 0) {
                $("#tblRConsultaPorAgente").html('<tr><td colspan="4"><hr /></td></tr>');
                $.each(lrConsultaXAgente, function (index, item) {
                    if(item.DEC_COD == null) item.DEC_COD = " ---  ";
                    if(item.FECHACARGUE == null) item.FECHACARGUE = " ---  "; else item.FECHACARGUE = item.FECHACARGUE.substring(0,10);
                    if(item.VENCIMIENTO == null) item.VENCIMIENTO = " ---  "; else item.VENCIMIENTO = item.VENCIMIENTO.substring(0,10);
                    if(item.ACCION == null) item.ACCION = " ---  ";
                    if (item.VALOR == null) item.VALOR = " ---  "; else item.VALOR =  byaPage.formatNumber.new(item.VALOR, "$")
                    if(item.FECHAPAGO == null) item.FECHAPAGO = " ---  "; else item.FECHAPAGO = item.FECHAPAGO.substring(0,10);
                    $("#tblRConsultaPorAgente").append('<tr>'+
                                    '<td><strong>Periodo:</strong></td>'+
                                    '<td style="text-align:right">' + byaPage.returnNombreMes(item.PERIODO) + '</td>' +
                                    '<td><strong>Vence:</strong></td>'+
                                    '<td style="text-align:right">' + item.VENCIMIENTO + '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td><strong>Fch. Cargue:</strong></td>'+
                                    '<td style="text-align:right">' + item.FECHACARGUE + '</td>'+
                                    '<td><strong>Declaracion:</strong></td>'+
                                    '<td style="text-align:right">' + item.DEC_COD + '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td><strong>Valor:</strong></td>'+
                                    '<td style="text-align:right">' + item.VALOR + '</td>' +
                                    '<td><strong>Fch. Pago:</strong></td>'+
                                    '<td style="text-align:right">' +item.FECHAPAGO +'</td>'+
                                '</tr>' +
                                '<tr><td colspan="4"><hr /></td></tr>');
                });
            } else {
                $("#tblRConsultaPorAgente").html('<tr><td colspan="4"><hr /></td></tr><tr><td colspan="4">No se encontraron resultados para esta búsqueda</td></tr>');
            }
        });
    };

    return {
        init: function () {
            if (VerificarSesion()) {
                _createElements();
                _addHandlers();
                document.addEventListener("backbutton", EventoAtras, true);
            }
        },
        ConsultaPorAgentes: function (index) {
            ConsultaPorAgentes(index);
        }
    };
}());

$(document).ready(function () {
    FastClick.attach(document.body);
    Elecc.init();
});