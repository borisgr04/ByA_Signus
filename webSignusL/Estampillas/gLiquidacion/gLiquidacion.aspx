<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="gLiquidacion.aspx.cs" Inherits="webSignusL.Estampillas.Liquidacion.gLiquidacion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="msgResult">
    </div>
    <div class="row">            
        <div class="col-xs-6">
            <div class="btn-toolbar"> 
                    <%--<button type="button" value="Editar" id="btnDetalles" class="btn btn-primary" title="Editar Solicitud Actual">
                        <span class="glyphicon glyphicon-search"></span>Detalles
                    </button>   --%>          
            </div>
        </div>
    </div>
    <div class="row" style="margin-left:20px;margin-bottom:20px;"><h3 id="info"></h3></div>
    <div class="row">
        <div style="margin:15px">
            <table class="table table-bordered table-hover table-striped tablesorter display" style="width:100%" id="tblLiquidaciones">
                <thead>
                    <tr>
                        <th>Liquidación <i class="fa fa-sort"></i></th>
                        <th>Contrato <i class="fa fa-sort"></i></th>
                        <th>Contratista <i class="fa fa-sort"></i></th>
                        <th>Valor Base <i class="fa fa-sort"></i></th>
                        <th>Fecha <i class="fa fa-sort"></i></th>
                        <th><i class="fa fa-sort"></i></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <link href="../../jqscripts/DataTable/css/dataTables.bootstrap.css" rel="stylesheet" />
    <script src="../../jqscripts/DataTable/js/dataTables.bootstrap.js"></script>
    <script src="../../jqscripts/DataTable/js/dataTables.fixedColumns.js"></script>
    <script src="../../jqscripts/DataTable/js/jquery.dataTables.js"></script>
    <script src="../../jqscripts/app.js"></script>
    <script src="js/gLiquidacion.js"></script>    
</asp:Content>
