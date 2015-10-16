<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="MediosMagneticos.aspx.cs" Inherits="webSignusL.MediosMagneticos.MediosMagneticos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-xs-5">
            <div class="panel panel-default">
                <div class="panel-heading">Medios magneticos<span style="margin-left:20px" class="label label-default" id="cdpTip"></span></div>
                <div class="panel-body">
                    <div class="row">
                        <div class="row form-group" style="margin-left:10px">
                            <div class="col-xs-4">
                                <label>Vigencia:</label>
                            </div>
                            <div class="col-xs-5">
                                <input type="text" id="txtVigenciaMedioMagnetico" class="form-control" disabled="disabled"/>
                            </div>
                        </div>
                        <div class="row form-group" style="margin-left:10px">
                            <div class="col-xs-4">
                                <label>Seleccione el periodo:</label>
                            </div>
                            <div class="col-xs-5">
                                <select class="form-control" id="cboPeriodos">
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
                        </div>
                        <div class="form-group row" style="margin-left:10px">
                            <div class="col-xs-10 text-center">
                                <button type="button" value="Nuevo" id="btnRealizar" class="btn btn-success habilitarcancelar" style="margin-top:24px" title="Reportar a la Gobernación del Cesar">
                                    <span class="glyphicon glyphicon-save"></span>Reportar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div class="col-xs-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Informacion a reportar<span style="margin-left:20px" class="label label-default" id="Span1"></span></div>
                    <div class="panel-body">
                        <table class="table table-bordered table-hover table-striped tablesorter" id="tblConsulta">
                            <thead>
                                <tr>
                                    <th>Impuesto <i class="fa fa-sort"></i></th>
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
    <script type="text/javascript" src="js/MediosMagneticos.js"></script>
    <script src="/jqscripts/app.js"></script>
</asp:Content>
