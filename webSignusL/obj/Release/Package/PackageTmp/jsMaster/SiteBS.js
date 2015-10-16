var theme;

var masterP = (function ($) {
    var ServicioMenu = "/Servicios/wsMenu.asmx/GetMenu";
    var urlToGetVigencias = "/Servicios/wsDatosBasicos.asmx/GetvVigencias";
    var urlToTercero = "/Servicios/wsTerceros.asmx/Get";
    var idNav = "#MenuIzq";

    var Modulos = [
       { codigo: "SLQES", nombre: "Liquidación", icono: "icon-book" },
       { codigo: "MEDMG", nombre: "Medios Magneticos", icono: "icon-save" },
       { codigo: "ADMSG", nombre: "Administración", icono: "icon-user" }
    ];
    var _addHandlers = function () {       

        $(".classVigencias").click(function () {
            var vig = $(this).prop("id");
            if (byaSite.getVigencia() != vig) {
                byaMsgBox.confirm("¿ Desea cambiar a la Vigencia " + vig + " ? ", function (result) {
                    if (result) {
                        byaSite.setVigencia(vig);
                        $("#mpVigencia").text(vig);
                        window.location.reload();
                    } else {
                        $("#mpVigencia").val(byaSite.getVigencia());
                    }
                });
            }
        });
        $('#BtnFullScreenMaster').click(function () {
            byaSite.launchFullScreen(document.documentElement);
            $(gridCon).jqxGrid({ height: 600 });
        });
        $("#btnMensajeSoporte").click(function () {
            var canvas = document.querySelector("#canvasPan");
            html2canvas(document.querySelector("body"), { canvas: canvas }).then(function (canvas) {
                console.log('Drew on the existing canvas');

                var img = document.getElementById("imgCanvas");
                var canvas = document.getElementById("canvasPan");
                img.src = canvas.toDataURL("image/png");       
            });   
            $("#modalSoporte").modal("show");            
        });
        $("#btnEnviarSoporte").click(function () {
            var Tercero = byaPage.getSource(urlToTercero, { IDE_TER: "'" + byaSite.getUsuario() + "'" });

            var uri = "" + window.location + "";
            var img = document.getElementById("imgCanvas");

            var e = {};
            e.Url = uri;
            e.Asunto = $("#txtAsuntoSoporte").val();
            e.Mensaje = $("#txtMensajeSoporte").val();
            e.Imagen = img.src;
            e.idRemitente = byaSite.getUsuario();
            e.nomRemitente = Tercero.TER_NOM;
            e.nomPrograma = "SIGNUS";
            e.nomEntidad = "GOBERNACIÓN";

            $.ajax({
                type: "POST",
                url: "http://localhost:1499/Servicios/wsSoporte.asmx/MensajeSoporte",
                data: "{'Reg':" + JSON.stringify(e) + "}",
                async: true,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {   
                    if (result.d.Error == false) {
                        $("#infoSoporte").msgBox({ titulo: "", mensaje: "Su mensaje ha sido enviado a soporte satisfactoriamente", tipo: true });
                        $("#txtAsuntoSoporte").val("");
                        $("#txtMensajeSoporte").val("");
                    } else {
                        $("#infoSoporte").msgBox({ titulo: "", mensaje: result.d.Mensaje, tipo: false });
                    }
                },
                error: function () {
                }
            });
            
        });
    };

    var saveCanvas = function() {

        var canvas = document.getElementById('canvasPan');
        var imageData = canvas.toDataURL('image/jpeg', 1);

        $.ajax({
            type: "POST",
            url: "http://localhost:49811/api/pe/FotoTercero/3",
            contentType: false,
            processData: false,
            data: imageData,
            success: function (result) {
                if (result.Error == false) {
                    alert('Archivos subidos correctamente');
                    location.reload();
                }
                else alert('Error: El tamaño de la imagen es muy grande...');
                $("#inputFile").val('');
            }
        });

    }

    var _createWidgets = function () {
        $("#mpVigencia").text(byaSite.getVigencia()); //mostrar vigencia
        $("#mpUserName").text(byaSite.getUsuario());//mostrar usuario
        //$("#mpUserName").text("Boris Arturo González");//mostrar usuario

        var sourceVig = byaPage.getSource(urlToGetVigencias);
        var items = "";
        $.each(sourceVig, function (index, item) {
            items += '<li><a href="#" class="classVigencias" id="' + item.YEAR_VIG + '"><i class=""></i>' + item.YEAR_VIG + '</a></li></ul>';
        });
        $("#mpLstVigencias").append(items);
    };

    var _createMenu = function () {
        var modulo = byaSite.getModulo();
        //$("#HeadModulo").text($("#" + modulo).text());
        var arbol = _cargarTree(modulo);
        //$(idNav).html('');
        $.each(arbol, function (index, item) {
            //var opcion = "<li><a href='" + item.value.url + "' target='" + item.value.target + "' title='" + item.value.descripcion + "'><i class='" + item.value.icono + "'></i>" + item.text + "</a></li>";
            var opcion = "<li><a href='" + item.value.url + "' target='" + item.value.target + "' title='" + item.value.descripcion + "'>";
            opcion += "<i class='" + item.value.icono + "'></i><span class='menu-text'>" + item.text + "</span></a></li>";

            $(idNav).append(opcion);
        });
    };

    var _createMenu2 = function (Modulo) {

        var arbol = _cargarTree(Modulo.codigo);
        var opcion;
        var claseModulo = "";

        //if (!byaSite.ModuloP) {
        claseModulo = Modulo.codigo == byaSite.ModuloP.Cod_Mod ? "active open" : "";
        //}
        opcion = '<li id="' + Modulo.codigo + '" class="' + claseModulo + '"><a href="#" class="dropdown-toggle" >';
        opcion += '<i class="' + Modulo.icono + '"></i>';
        opcion += '<span class="menu-text">' + Modulo.nombre + ' </span>';
        opcion += '<b class="arrow icon-angle-down"></b>';
        opcion += '</a>';
        opcion += '<ul class="submenu">';
        if (arbol != null) {
            $.each(arbol, function (index, item) {
                var icono = "icon-double-angle-right";
                //item.value.icono
                var claseOpcion = "";
                //if (!byaSite.ModuloP) {
                claseOpcion = item.value.roles == byaSite.ModuloP.Rol ? "active" : "";
                //}
                opcion += "<li class='" + claseOpcion + "'><a href='" + item.value.url + "' target='" + item.value.target + "' title='" + item.value.descripcion + "'>";
                opcion += "<i class='" + icono + "'></i><span class='menu-text'>" + item.text + "</span></a></li>";
            });
        }
        opcion += '</ul></li>';
        $(idNav).append(opcion);
    };

    var _cargarTree = function (modulo) {
        var param = "{modulo:'" + modulo + "',usuario:'" + byaSite.getUsuario() + "'}";
        var data = byaPage.postSource(ServicioMenu, param);
        var source =
        {
            datatype: "json",
            datafields: [
                { name: 'id' },
                { name: 'parentid' },
                { name: 'text' },
                { name: 'value' }
            ],
            id: 'id',
            localdata: data
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        dataAdapter.dataBind();
        var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
        return records;
    };

    var _crearNaviagation = function () {
        $(idNav).html('');
        $.each(Modulos, function (index, item) {
            _createMenu2(item);
        });
    };
    var config = {
        selectedIndex: -1
    };
    var _setTituloPagina = function () {
        //if (!byaSite.ModuloP) {
        $("#dvdModulo").html('<a href="' + byaSite.ModuloP.urlToPanelModulo + '">' + byaSite.ModuloP.Modulo + '</a>');
        $("#dvdPagina").html(byaSite.ModuloP.TituloForm);
        /*} else {
            console.log("La pagina actual, no tiene configurado la opción y módulo");
        }*/
    }
    return {
        init: function () {
            _setTituloPagina();
            _createWidgets();
            _addHandlers();
            _crearNaviagation();
        }
    }

}(jQuery));

$(document).ready(function () {
    $.data(document.body, 'theme', byaSite.tema);
    theme = getDemoTheme();
    masterP.init();
    $('.btn').toggleClass('no-border');
    $('.btn').addClass('btn-sm');
    /*
    $(document).ajaxStart(
        function () {
            $.blockUI({
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                },
                 message: '<h1> Espere un Momento...</h1>' 
            })
        });
    $(document).ajaxStop($.unblockUI);
    */
});

