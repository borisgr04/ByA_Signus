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
    var _addHandlers = function () {
        $("#btnLimpiar").click(function () {
            _crearElements();
            $("#pesLiquidacion").removeAttr("href");
            $("#pesLiquidacion").removeAttr("data-toggle");
            $(".limpiar").val("");
            $(".habilitar").byaSetHabilitar(true);
        });
        $('.currency').byaSetDecimal(0);
        $('.currency').blur(function () {
            $('.currency').formatCurrency();
        });
        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });
        $("#txtTER_NIT").blur(function () {
            $(".limpiarLiq").val("");
            $('.currency').byaSetDecimal(0);
            _traerLiquidacionTotal();

            $("#pesLiquidacion").removeAttr("href");
            $("#pesLiquidacion").removeAttr("data-toggle");
            _traerSl_Tercero($(this).val());
        });
        $("#cboTER_RGM").change(function () {            
            var Regimen = $(this).val();
            if(Regimen == "RS") $("#txtVAL_BAS").byaSetHabilitar(false);
            else $("#txtVAL_BAS").byaSetHabilitar(true);
        });
        $("#guardarButton").click(function(){
            GuardarContratista();
        });
        $("#txtTER_NOM").blur(function () {
            $("#txtNombreContratistaToLiquidacion").val($(this).val());
        });
        $("#txtTER_NOM").change(function () {
            $("#txtNombreContratistaToLiquidacion").val($(this).val());
        });
        $("#txtFEC_SUS").change(function () {
            CalcularFechaVencimiento($(this).val());
        });
        $("#txtVAL_CTO").blur(function () {
            $("#txtVAL_BAS").byaSetDecimal($(this).byaGetDecimal());
            _traerLiquidacionTotal();
        });
        $("#txtVAL_BAS").blur(function () {
            var ValBas = $(this).byaGetDecimal();
            var ValCTO = $("#txtVAL_CTO").byaGetDecimal();
            if (ValBas > ValCTO) {
                alert("El valor sin IVA no puede ser mayor al valor del contrato. Por favor corríjalo");
                $(this).byaSetDecimal(ValCTO);
                $(this).focus();
            } else {
                _traerLiquidacionTotal();
            }
        });
        $("#btnGuardarLiq").click(function () {
            GuardarLiquidacion();
        });
        $("#btnImprimirLiq").click(function () {
            ImprimirLiquidacion();
        });
    };
    var _esValido = function () {
        var error = false;
        var errorValoresEstimados = false;
        var _ValidarEmpty = function (Tipo, Control) {
            if ($("#" + Tipo + Control).val() == "") {
                $("#dvd" + Control).addClass("has-error");
                error = true;
            }
            else {
                $("#dvd" + Control).removeClass("has-error");
            }
        };

        var _MensajeFinalValidacion = function () {
            var mensaje;
            if (error) {
                mensaje = "Por favor diligencie los datos resaltos en Rojo. Son Obligatorios... ";
                $("#secInfo").msgBox({ titulo: Titulo, mensaje: mensaje, tipo: false });
                byaPage.irInicio();
            } else {
                $("#secInfo").html("");
            }
        };

        var _traerCamposValidar = function () {
            var e = new Array();
            $(".validar").each(function (index) {
                var id = "" + $(this).attr("id") + "";
                e.push(id);
            });
            return e;
        };

        if (activarValidar) {
            var campos = _traerCamposValidar();
            $.each(campos, function (index, item) {
                var id = "" + item + "";
                _ValidarEmpty(id.substr(0, 3), id.substr(3, id.length));
            });
            _MensajeFinalValidacion();
        }
        return !error;
    };
    var _esValidoLiq = function () {
        var error = false;
        var errorValoresEstimados = false;
        var _ValidarEmpty = function (Tipo, Control) {
            if ($("#" + Tipo + Control).val() == "") {
                $("#dvd" + Control).addClass("has-error");
                byaPage.irInicio();
                error = true;
            }
            else {
                $("#dvd" + Control).removeClass("has-error");
            }
        };

        var _MensajeFinalValidacion = function () {
            var mensaje;
            if (error) {
                mensaje = "Por favor diligencie los datos resaltos en Rojo. Son Obligatorios... ";
                $("#secInfoLiq").msgBox({ titulo: Titulo, mensaje: mensaje, tipo: false });
            } else {
                $("#secInfoLiq").html("");
            }
        };

        var _traerCamposValidar = function () {
            var e = new Array();
            $(".validarliq").each(function (index) {
                var id = "" + $(this).attr("id") + "";
                e.push(id);
            });
            return e;
        };

        if (activarValidar) {
            var campos = _traerCamposValidar();
            $.each(campos, function (index, item) {
                var id = "" + item + "";
                _ValidarEmpty(id.substr(0, 3), id.substr(3, id.length));
            });
            _MensajeFinalValidacion();
        }
        return !error;
    };
    var _crearElements = function () {
        llenarCamposLiq();
        _traerTercero();
        $("#txtVIG_LIQ").val(byaSite.getVigencia());
        var now = new Date();

        var mes = "" + (now.getMonth() + 1) + "";
        if (mes.length == 1) mes = "0" + mes;

        $("#cboPER_LIQ").val(mes);

        $("#txtFEC_LIQ").val(byaPage.FechaShortX(now));
        $("#txtFEC_SUS").val(byaPage.FechaShortX(now));

        $('.currency').formatCurrency();


        CalcularFechaVencimiento($("#txtFEC_SUS").val());

        
    };
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

    var _traerTercero = function () {
        Tercero = byaPage.getSource(urlToTercero, { IDE_TER: "'" + byaSite.getUsuario() + "'" });
        $("#txtNomRecaudador").html(Tercero.TER_NOM);

        var sourceTiposDocumentos = byaPage.getSource(urlToTiposDocumentos);
        $("#cboTER_TDOC").byaCombo({ DataSource: sourceTiposDocumentos, Value: "TDOC_COD", Display: "TDOC_NOM" });

        var sourceTiposPersona = byaPage.getSource(urlToTiposPersona);
        $("#cboTER_PER").byaCombo({ DataSource: sourceTiposPersona, Value: "COD_TIP", Display: "NOM_TIP" });

        var sourceTiposRegimen = byaPage.getSource(urlToTiposRegimen);
        $("#cboTER_RGM").byaCombo({ DataSource: sourceTiposRegimen, Value: "COD_TIP", Display: "NOM_TIP" });

        var sourceCiudades = byaPage.getSource(urlToCiudadesDepartamento, {ID_DEP : "'" + 20 + "'"});
        $("#cboTER_MPIO").byaCombo({ DataSource: sourceCiudades, Value: "MUN_COD", Display: "MUN_NOM" });

        $("#secInfo").msgBox({ titulo: "", mensaje: "<strong>Ayuda:</strong> Digite el documento, complete la información y guarde", tipo: 'info' });
    };
    var _traerSl_Tercero = function (IDE_TER_SL) {        
        SL_TERCEROS_DAO.Get(IDE_TER_SL, function (result) {
                $(".habilitar").byaSetHabilitar(true);
                sl_tercero = byaPage.convertOBJ(result);
                if (sl_tercero != null) {
                    byaPage._setDatosCampos("datos_sl_tercero", sl_tercero);
                    $("#txtNombreContratistaToLiquidacion").val(sl_tercero.TER_NOM);

                    var Regimen = sl_tercero.TER_RGM;
                    if (Regimen == "RS") $("#txtVAL_BAS").byaSetHabilitar(false);
                    else $("#txtVAL_BAS").byaSetHabilitar(true);

                    $("#secInfo").msgBox({ titulo: "", mensaje: "<strong>Se cargó la información actualícela y guarde</strong>", tipo: "info" });
                } else {
                    $(".limpiar").val("");
                    $("#secInfo").msgBox({ titulo: "", mensaje: "<strong>No se encuentra este documento, complete la información y guarde</strong>", tipo: "warning" });
                }
            });
    };
    var GuardarContratista = function () {
        if (_esValido()) {
            SL_TERCEROS_DAO.InsertOrUpdate(byaPage._getDatosCampos("datos_sl_tercero"), function (result) {
                var Respuesta = byaPage.convertOBJ(result);
                if (Respuesta.Error == true) $("#secInfo").msgBox({ titulo: "", mensaje: Respuesta.Mensaje, tipo: false });
                else {
                    $(".habilitarliq").byaSetHabilitar(true);
                    var Regimen = $("#cboTER_RGM").val();
                    if (Regimen == "RS") $("#txtVAL_BAS").byaSetHabilitar(false);
                    else $("#txtVAL_BAS").byaSetHabilitar(true);

                    $("#btnImprimirLiq").byaSetHabilitar(false);

                    $(".habilitar").byaSetHabilitar(false);
                    $("#pesLiquidacion").attr("href", "#tabContrato");
                    $("#pesLiquidacion").attr("data-toggle", "tab");
                    $("#secInfo").msgBox({ titulo: "", mensaje: "<strong>Información guardada, ahora puede ir a la pestaña de liquidación</strong>", tipo: true });
                }
            });
        }
    };
    var CalcularFechaVencimiento = function (FechaSus) {
        SIGNUS_FACADE_DAO.GetCalcularFechaVencimiento(FechaSus, function (result) {
            var Fecha = "" + byaPage.convertOBJ(result) + "";
            $("#txtFEC_VEN").val(byaPage.converJSONDate(Fecha));
            _traerLiquidacionTotal();
        });
    };
    var _traerLiquidacionTotal = function () {
        SIGNUS_FACADE_DAO.GetLiquidacionTotal($("#txtFEC_VEN").val(), byaSite.getUsuario(), $("#txtVAL_BAS").byaGetDecimal(), function (result) {
            Liq = byaPage.convertOBJ(result);
            lDETLIQ = Liq.lDetallesLiquidacion;
            crearTablaDetallesLiquidacion();

            $("#tblDETLIQ tbody").append("<tr style='border:none;'><td colspan='2' style='border:none;background-color:white'></td><td class='text-right'><strong>Subtotal: </strong></td><td class='text-right'>" + byaPage.formatNumber.new(Liq.SUB_TOT, "$") + "</td></tr>");
            $("#tblDETLIQ tbody").append("<tr><td colspan='2' style='border:none;background-color:white'></td><td class='text-right'><strong>Intereses: </strong></td><td class='text-right'>" + byaPage.formatNumber.new(Liq.INTERES, "$") + "</td></tr>");
            $("#tblDETLIQ tbody").append("<tr><td colspan='2' style='border:none;background-color:white'></td><td class='text-right'><strong>Descuento: </strong></td><td class='text-right'>" + byaPage.formatNumber.new(Liq.DECUENT, "$") + "</td></tr>");
            $("#tblDETLIQ tbody").append("<tr><td colspan='2' style='border:none;background-color:white'></td><td class='text-right'><strong>Sanción: </strong></td><td class='text-right'>" + byaPage.formatNumber.new(Liq.SANCION, "$") + "</td></tr>");
            $("#tblDETLIQ tbody").append("<tr><td colspan='2' style='border:none;background-color:white'></td><td class='text-right'><strong>Total: </strong></td><td class='text-right'>" + byaPage.formatNumber.new(Liq.TOTAL, "$") + "</td></tr>");
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

    var GuardarLiquidacion = function () {
        if (_esValidoLiq()) {

            var e = byaPage._getDatosCampos("datosliq");
            e.VAL_BAS = $("#txtVAL_BAS").byaGetDecimal();
            e.VAL_CTO = $("#txtVAL_CTO").byaGetDecimal();
            e.AGE_REC = byaSite.getUsuario();
            e.TER_NIT = $("#txtTER_NIT").val();
            e.ESTADO = "LI";
            e.lDetallesLiquidacion = tblDETLIQ.getSource();
            e.SUB_TOT = Liq.SUB_TOT;
            e.INTERES = Liq.INTERES;
            e.SANCION = Liq.SANCION;
            e.DECUENT = Liq.DECUENT;
            e.TOTAL = Liq.TOTAL;

            SL_LIQESTAMPILLAS_DAO.Insert(e, function (result) {
                var res = byaPage.convertOBJ(result);
                IdLiqGuar = res.id;
                $("#secInfoLiq").msgBox({ titulo: "Liquidación de estampillas", mensaje: res.Mensaje, tipo: !res.Error });
                if (!res.Error) {
                    $("#btnImprimirLiq").byaSetHabilitar(true);
                    $(".habilitarliq").byaSetHabilitar(false);
                    $("#txtVAL_BAS").byaSetHabilitar(false);                  
                }
                byaPage.irInicio();
            });
        }
    };
    var ImprimirLiquidacion = function () {   
        SL_LIQESTAMPILLAS_DAO.Get(IdLiqGuar, function (result) {
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
    byaSite.SetModuloP({ TituloForm: "Liquidación de Estampillas", Modulo: "Gestión", urlToPanelModulo: "Liquidacion.aspx", Cod_Mod: "SLQES", Rol: "SLQESLiqidacion" });
    objregistro.init();
});
