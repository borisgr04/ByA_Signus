<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="DetallesLiquidacion.aspx.cs" Inherits="webSignusL.Estampillas.Liquidacion.DetallesLiquidacion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container" style="margin-top:20px">        
        <div class="row">
            <div class="col-xs-12">
                <div class="col-xs-12" style="margin-top:20px">
                    <div class="panel panel-default">
                        <div class="panel-heading">Detalles Liquidación<span style="margin-left:20px" class="label label-default" id="cdpTip"></span></div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-xs-12 text-left" style="margin-bottom:10px">
                                        <button type="button" value="Nuevo" id="btnImprimirLiq" class="btn btn-info">
                                            <span class="glyphicon glyphicon-print"></span>&nbsp Imprimir
                                        </button>
                                    </div>
                                    <div class="col-xs-12">
                                        <div id="info"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div id="infoLiquidacion"></div>
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
    <script src="../../jqscripts/qrcode.js"></script>
    <script type="text/javascript" src="js/DetallesLiquidacion.js"></script>
    <script type="text/javascript" src="/jqscripts/app.js"></script>
</asp:Content>
