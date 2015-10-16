<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="Pagos.aspx.cs" Inherits="webSignusL.Estampillas.Pagos.Pagos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container" style="margin-top:20px">        
        <div class="row">
            <div class="col-lg-12">
                <div class="col-lg-12" style="margin-top:20px">
                    <div class="panel panel-default">
                        <div class="panel-heading">Pagos<span style="margin-left:20px" class="label label-default" id="cdpTip"></span></div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div id="infoPago"></div>
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom:10px">
                                    <div class="col-lg-6">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <label>Nro. Liquidacion</label>
                                                <input type="text" class="form-control snumero" id="txtBsqNumeroLiquidacion" data-toggle="tooltip" data-placement="top" title="Debe digitar un número de liquidación"/>
                                            </div>
                                            <div class="col-lg-4">
                                                <label>Vigencia</label>
                                                <input type="text" class="form-control" id="txtBsqVigenciaLiquidacion" disabled="disabled"/>
                                            </div>
                                            <div class="col-lg-4">
                                                <button type="button" value="Nuevo" id="btnBuscarLiquidacion" class="btn btn-info" style="margin-top:24px" title="Registrar Nueva Solicitud de Contratación.">
                                                    <span class="glyphicon glyphicon-search"></span>Buscar
                                                </button>
                                            </div>
                                        </div>
                                        <div class="row" style="margin-top:10px">
                                            <div class="col-lg-4">
                                                <label>Fecha de pago</label>
                                                <input type="date" class="form-control habilitarpago" id="txtFechaPago" />
                                            </div>
                                            <div class="col-lg-4">
                                                <label>Valor</label>
                                                <div class="input-group">
                                                   <input type="text" class="form-control currency habilitarpago tip" id="txtValorPago" data-toggle="tooltip" data-placement="top" title="Puede pulsar el lápiz para traer el valor a pagar" />
                                                    <div class="input-group-btn ">
                                                        <button type="button" id="btnTraerValorPago" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                                            <span class="glyphicon glyphicon-pencil"></span>                        
                                                        </button>                   
                                                    </div>
                                                </div>
                                        
                                            </div>
                                            <div class="col-lg-4">
                                                <button type="button" value="Nuevo" id="btnPagar" class="btn btn-success habilitarpago" style="margin-top:24px" title="Registrar Nueva Solicitud de Contratación.">
                                                    <span class="glyphicon glyphicon-save"></span>Pagar
                                                </button>
                                            </div>
                                        </div>
                                    </div>                                    
                                    <div class="col-lg-6">
                                        <div id="secInfo"></div>
                                    </div>            
                                </div> 
                                <div class="row">
                                    <div class="col-lg-12">
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
                                        <div class="col-lg-12 text-right" >
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
    <script type="text/javascript" src="js/Pagos.js"></script>
    <script src="/jqscripts/app.js"></script>
</asp:Content>
