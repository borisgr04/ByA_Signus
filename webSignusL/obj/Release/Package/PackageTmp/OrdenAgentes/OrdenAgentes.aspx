<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="OrdenAgentes.aspx.cs" Inherits="webSignusL.OrdenAgentes.OrdenAgentes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container" style="margin-top:20px">
        <div class="row">
            <div class="col-xs-10">
                <div class="panel panel-default">
                    <div class="panel-heading">Agentes de orden departamental<span style="margin-left:20px" class="label label-default" id="cdpTip"></span></div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="row">
                                        <label for='TxtIdeFun' class="col-sm-2 control-label text-right">
                                            Agente recaudador
                                        </label>
                                        <div class="col-xs-2">
                                            <input id="txtNitAgenteRecaudador" type="text" class="form-control input-sm" disabled="disabled" />
                                        </div>
                                        <div class="col-xs-1">
                                            <button type="button" value="Nuevo" id="btnBuscarTer" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                                                <span class="glyphicon glyphicon-search"></span>
                                            </button>
                                        </div>
                                        <div class="col-xs-4">
                                            <input id="txtNombreAgenteRecaudador" type="text" class="form-control input-sm " disabled="disabled" />
                                        </div>
                                        <div class="col-xs-2">
                                            <button type="button" value="Nuevo" id="btnAgregarBus" class="btn btn-primary btn-xs inputHab" title="Abrir Cuadro de Busqueda">
                                                Agregar  <span class="glyphicon glyphicon-plus"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="row" style="margin:30px">
                                        <table class="table table-bordered table-hover table-striped tablesorter" id="tblTerceros">
                                            <thead>
                                                <tr>
                                                    <th>Nombre <i class="fa fa-sort"></i></th>
                                                    <th>Documento <i class="fa fa-sort"></i></th>
                                                    <th><i class="fa fa-sort"></i></th>
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
    <link href="../jqscripts/DataTable/css/dataTables.bootstrap.css" rel="stylesheet" />
    <script src="../jqscripts/DataTable/js/dataTables.bootstrap.js"></script>
    <script src="../jqscripts/DataTable/js/dataTables.fixedColumns.js"></script>
    <script src="../jqscripts/DataTable/js/jquery.dataTables.js"></script>
    <script src="../jqscripts/app.js"></script>
    <script src="js/OrdenAgentes.js"></script>
</asp:Content>
