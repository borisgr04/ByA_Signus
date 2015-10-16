<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="CancelarLiquidacion.aspx.cs" Inherits="webSignusL.Estampillas.Liquidacion.CancelarLiquidacion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container" style="margin-top:20px">        
        <div class="row">
            <div class="col-xs-12">
                <div class="col-xs-12" style="margin-top:20px">
                    <div class="panel panel-default">
                        <div class="panel-heading">Cancelar Liquidacion<span style="margin-left:20px" class="label label-default" id="cdpTip"></span></div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div id="info"></div>
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom:10px">
                                    <div class="col-xs-2">
                                        <label>Nro. Liquidacion</label>
                                        <input type="text" class="form-control snumero" id="txtBsqNumeroLiquidacion" data-toggle="tooltip" data-placement="top" title="Debe digitar un número de liquidación"/>
                                    </div>
                                    <div class="col-xs-2">
                                        <label>Vigencia</label>
                                        <input type="text" class="form-control" id="txtBsqVigenciaLiquidacion" disabled="disabled"/>
                                    </div>
                                    <div class="col-xs-4">
                                        <button type="button" value="Nuevo" id="btnBuscarLiquidacion" class="btn btn-info" style="margin-top:24px" title="Registrar Nueva Solicitud de Contratación.">
                                            <span class="glyphicon glyphicon-search"></span>Buscar
                                        </button>
                                        <button type="button" value="Nuevo" id="btnCancelarLiquidacion" class="btn btn-success habilitarcancelar" style="margin-top:24px" title="Registrar Nueva Solicitud de Contratación.">
                                            <span class="glyphicon glyphicon-remove"></span>Cancelar Liquidacion
                                        </button>
                                    </div>   
                                    <div class="col-xs-4">
                                        <div id="secInfo"></div>
                                    </div>           
                                </div> 
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="panel-group Separar" id="accordion">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseProc" id="linkInfo"> + Informacion de la liquidación</a>
                                                </div>
                                                <div id="collapseProc" class="panel-collapse collapse out">
                                                    <div class="panel-body">
                                                        <div class="container">
                                                            <div class="row">
                                                                <div id="infoLiquidacion"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        <table class="table table-bordered table-hover table-striped tablesorter" id="tblDETLIQ">
                                            <thead>
                                                <tr>
                                                    <th>Impuesto <i class="fa fa-sort"></i></th>
                                                    <th>Tarifa <i class="fa fa-sort"></i></th>
                                                    <th>Valor base <i class="fa fa-sort"></i></th>
                                                    <th>Valor impuesto <i class="fa fa-sort"></i></th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-xs-12 text-right" >
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
    <script type="text/javascript" src="js/CancelarLiquidacion.js"></script>
    <script type="text/javascript" src="/jqscripts/app.js"></script>
</asp:Content>
