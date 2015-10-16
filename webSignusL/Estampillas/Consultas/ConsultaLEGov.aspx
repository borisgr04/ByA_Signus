<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="ConsultaLEGov.aspx.cs" Inherits="webSignusL.Estampillas.Consultas.ConsultaLE" %>
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
                                <div class="row" style="margin:10px">
                                    <label for='TxtIdeFun' class="col-sm-3 control-label text-right">
                                        Agente recaudador
                                    </label>
                                    <div class="col-xs-3">
                                        <input id="txtNitAgenteRecaudador" type="text" class="form-control input-sm" disabled="disabled" />
                                    </div>
                                    <div class="col-xs-1">
                                        <button type="button" value="Nuevo" id="btnBuscarTer" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </button>
                                    </div>
                                    <div class="col-xs-5">
                                        <input id="txtNombreAgenteRecaudador" type="text" class="form-control input-sm " disabled="disabled" />
                                    </div>
                                </div>
                                <div class="row">
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
                                <div class="row">
                                    <div class="col-xs-7"></div>
                                    <div class="col-xs-5">
                                        <button type="button" style="margin-left:8px" class="btn btn-info" id="btnIrLiquidadas">
                                           Ir a Liquidadas  <span class="glyphicon glyphicon-share-alt"></span>
                                        </button>
                                        <button type="button" style="margin-left:20px" class="btn btn-success" id="btnIrPagadas">
                                            Ir a Pagadas  <span class="glyphicon glyphicon-share-alt"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                        
        </div>
    </div>

    <div class="modal fade" id="modalTer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="H5">Consulta de Terceros</h4>
                </div>
                <div class="modal-body">
                    <div id="jqxgridTer">
                            </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

    <script type="text/javascript" src="js/ConsultaLEGov.js"></script>
    <script type="text/javascript" src="/jqscripts/app.js"></script>


</asp:Content>
