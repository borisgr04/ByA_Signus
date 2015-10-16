<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="AplicacionAuditor.aspx.cs" Inherits="webSignusL.DescargaApp.AplicacionAuditor.AplicacionAuditor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="col-xs-6">
            <div class="panel panel-default">
                <div class="panel-heading">Descarga Aplicación Auditor</div>
                <div class="panel-body text-center">
                    <h2 id="txtNombreAplicacion"></h2>
                    <h5 id="txtActualizacion"></h5>
                    <div class="col-xs-12" id="dvdQraplicacion"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="../../jqscripts/jquery.qrcode-0.12.0.min.js"></script>
    <script src="/jqscripts/qrcode.js"></script>
    <script type="text/javascript" src="/jqscripts/app.js"></script>
    <script src="js/AplicacionAuditor.js"></script>
</asp:Content>
