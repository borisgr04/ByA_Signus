<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Liquidacion.aspx.cs" Inherits="wfSircc.Liquidacion.Liquidacion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">            
                <div class="form-horizontal">
                    <h3 id="txtNomRecaudador"></h3>
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#tabContratista" data-toggle="tab">1. Contratista</a></li>
                        <li><a id="pesLiquidacion">2. Liquidación</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="tabContratista" class="tab-pane in active">    
                            <div class="form-group row">                                     
                                <div class="col-xs-8">
                                    <div id="secInfo"></div>
                                </div>
                                <div class="col-xs-4 text-right" style="margin-top:30px">
                                    <button type="button" class="btn btn-info" id="btnLimpiar">
                                        <span class="glyphicon glyphicon-remove"></span>Limpiar
                                    </button>
                                    <button type="button" class="btn btn-success" id="guardarButton">
                                        <span class="glyphicon glyphicon-floppy-saved"></span>Guardar
                                    </button>                              
                                </div>
                            </div>  
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group row">
                                        <div class="col-xs-3">
                                            <label>Tipo identificación</label>
                                            <div id="dvdTER_TDOC"><select class="form-control datos_sl_tercero validar limpiar habilitar" id="cboTER_TDOC"></select></div>
                                        </div>
                                        <div class="col-xs-2">
                                            <label>Nro. identificación</label>
                                            <div id="dvdTER_NIT"><input type="text" class="form-control datos_sl_tercero validar" id="txtTER_NIT"/></div>
                                        </div>
                                        <div class="col-xs-1">
                                            <label>DV</label>
                                            <div id="dvdTER_DVER"><input type="text" maxlength="1" class="form-control datos_sl_tercero limpiar habilitar" id="txtTER_DVER"/></div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label>Nombre completo o razón social</label>
                                            <div id="dvdTER_NOM"><input type="text" class="form-control datos_sl_tercero validar limpiar habilitar" id="txtTER_NOM" /></div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-xs-3">
                                            <label>Tipo persona</label>
                                            <div id="dvdTER_PER"><select class="form-control datos_sl_tercero validar limpiar habilitar" id="cboTER_PER"></select></div>
                                        </div>
                                        <div class="col-xs-3">
                                            <label>Régimen</label>
                                            <div id="dvdTER_RGM"><select class="form-control datos_sl_tercero validar limpiar habilitar" id="cboTER_RGM"></select></div>
                                        </div>
                                        <div class="col-xs-3">
                                            <label>Departamento</label>
                                            <select class="form-control validar" disabled="disabled">
                                                <option selected="selected" value="20">Cesar</option>
                                            </select>
                                        </div>
                                        <div class="col-xs-3">
                                            <label>Ciudad</label>
                                            <div id="dvdTER_MPIO"><select class="form-control datos_sl_tercero validar limpiar habilitar" id="cboTER_MPIO"></select></div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-xs-3">
                                            <label>Dirección de notificación</label>
                                            <div id="dvdTER_DIR"><input type="text" class="form-control datos_sl_tercero validar limpiar habilitar" id="txtTER_DIR" /></div>
                                        </div>
                                        <div class="col-xs-3">
                                            <label>Teléfono - Celular</label>
                                            <div id="dvdTER_TEL"><input type="text" class="form-control datos_sl_tercero validar limpiar habilitar" id="txtTER_TEL" /></div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label>Correo electrónico</label>
                                            <div id="dvdTER_EMAI"><input type="text" class="form-control datos_sl_tercero validar limpiar habilitar" id="txtTER_EMAI" /></div>
                                        </div>
                                    </div>                                    
                                </div>                               
                            </div>                       
                        </div>
                        <div id="tabContrato" class="tab-pane in">
                            <div class="form-group row">
                                <div class="col-xs-8">
                                    <div id="secInfoLiq"></div>
                                </div>
                                <%--<div class="col-xs-4 text-right" style="margin-top:30px">
                                                                    
                                </div>--%>
                            </div>
                            <div id="secLiquidacion">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <div class="form-group row">
                                            <div class="col-xs-12">
                                                <label>Contratista</label>
                                                <input type="text" class="form-control" id="txtNombreContratistaToLiquidacion" disabled="disabled"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-xs-6">
                                                <label>Fecha liquidacion</label>
                                                <div id="dvdFEC_LIQ"><input type="date" class="form-control datosliq validarliq" id="txtFEC_LIQ" disabled="disabled" /></div>
                                            </div>
                                            <div class="col-xs-6">
                                                <label>Fecha vencimiento</label>
                                                <div id="dvdFEC_VEN"><input type="date" class="form-control datosliq validarliq" id="txtFEC_VEN" disabled="disabled" /></div>
                                            </div>
                                        </div>
                                        <div class="form-group row" style="margin-top:7px">
                                            <div class="col-xs-6">
                                                <label>Vigencia</label>
                                                <div id="dvdVIG_LIQ"><input type="text" class="form-control datosliq validarliq" id="txtVIG_LIQ" disabled="disabled" /></div>
                                            </div>
                                            <div class="col-xs-6">
                                                <label>Periodo</label>
                                                <div id="dvdPER_LIQ"><select class="form-control datosliq validarliq" id="cboPER_LIQ" disabled="disabled">
                                                    <option value="01">Enero</option>
                                                    <option value="02">Febrero</option>
                                                    <option value="03">Marzo</option>
                                                    <option value="04">Abril</option>
                                                    <option value="05">Mayo</option>
                                                    <option value="06">Junio</option>
                                                    <option value="07">Julio</option>
                                                    <option value="08">Agosto</option>
                                                    <option value="09">Septiembre</option>
                                                    <option value="10">Octubre</option>
                                                    <option value="11">Noviembre</option>
                                                    <option value="12">Diciembre</option>
                                                </select></div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-xs-12">
                                                <label>Observación</label>
                                                <div id="dvdOBS_LIQ"><textarea class="form-control datosliq limpiarLiq habilitarliq" id="txtOBS_LIQ"></textarea></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="form-group row">
                                            <div class="col-xs-6">
                                                <label>Fecha de suscripción</label>
                                                <div id="dvdFEC_SUS"><input type="date" class="form-control datosliq validarliq habilitarliq" id="txtFEC_SUS" /></div>
                                            </div>
                                            <div class="col-xs-3">
                                                <label>Nro. Contrato</label>
                                                <div id="dvdNUM_CTO"><input type="text" class="form-control limpiarLiq datosliq validarliq habilitarliq" maxlength="10" id="txtNUM_CTO" /></div>
                                            </div>
                                            <div class="col-xs-3">
                                                <label>Adición</label>
                                                <div id="dvdADI_CTO"><select class="form-control limpiarLiq datosliq validarliq habilitarliq" id="cboADI_CTO">
                                                    <option value="N">No</option>
                                                    <option value="S">Si</option>
                                                </select></div>
                                            </div>
                                        </div>  
                                        <div class="form-group row">
                                            <div class="col-xs-6">
                                                <label>Valor del contrato</label>
                                                <div id="dvdVAL_CTO"><input type="text" class="form-control currency limpiarLiq datosliq validarliq habilitarliq" id="txtVAL_CTO"/></div>
                                            </div>
                                            <div class="col-xs-6">
                                                <label>Valor sin IVA</label>
                                                <div id="dvdVAL_BAS"><input type="text" class="form-control currency limpiarLiq datosliq validarliq" id="txtVAL_BAS" /></div>
                                            </div>
                                        </div>  
                                        <div class="form-group row">
                                            <div class="col-xs-12">
                                                <label>Objeto</label>
                                                <div id="dvdOBJ_CTO"><textarea class="form-control limpiarLiq datosliq validarliq habilitarliq" id="txtOBJ_CTO"></textarea></div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-xs-12 text-right" style="margin-top:10px">
                                                <button type="button" class="btn btn-success habilitarliq" id="btnGuardarLiq">
                                                    <span class="glyphicon glyphicon-floppy-saved"></span>Guardar
                                                </button>  
                                                <button type="button" value="Nuevo" id="btnImprimirLiq" class="btn btn-info">
                                                    <span class="glyphicon glyphicon-print"></span>&nbsp Imprimir
                                                </button>  
                                            </div>
                                        </div>
                                    </div>
                                </div>     
                                <div class="form-group row">
                                    <div class="col-xs-12">
                                        <table class="table table-bordered table-hover table-striped tablesorter display" id="tblDETLIQ">
                                            <thead>
                                                <tr>
                                                    <th>Impuesto <i class="fa fa-sort"></i></th>
                                                    <th>Tarifa <i class="fa fa-sort"></i></th>
                                                    <th>Valor base <i class="fa fa-sort"></i></th>
                                                    <th>Valor impuesto <i class="fa fa-sort"></i></th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-xs-8 text-right" >
                                        <div id="txtSubtotal"></div>
                                        <div id="txtIntereses"></div>
                                        <div id="txtSancion"></div>
                                        <div id="txtDescuento"></div>
                                        <div id="txtTotal"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    </div>   
    <script src="../../jqscripts/qrcode.js"></script>
    <script type="text/javascript" src="/jqscripts/app.js"></script>
    <script type="text/javascript" src="js/Liquidacion.js"></script>
</asp:Content>
