<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ConsultaLE.aspx.cs" Inherits="webSignusL.Estampillas.Consultas.ConsultaLE" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container" style="margin-top:20px">
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">Liquidaciones<span style="margin-left:20px" class="label label-default" id="cdpTip"></span></div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-2">
                                <select multiple="multiple" size="12" class="form-control" id="cboPeriodo">
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
                                </select>
                            </div>
                            <div class="col-xs-8">
                                <table class="table table-bordered table-hover table-striped tablesorter" id="tblConsulta">
                                    <thead>
                                        <tr>
                                            <th>Impuesto <i class="fa fa-sort"></i></th>
                                            <th>Total Liquidado <i class="fa fa-sort"></i></th>
                                            <th>Total Pagado <i class="fa fa-sort"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>                        
        </div>
    </div>
    <script type="text/javascript" src="js/ConsultaLE.js"></script>
    <script type="text/javascript" src="/jqscripts/app.js"></script>

</asp:Content>
