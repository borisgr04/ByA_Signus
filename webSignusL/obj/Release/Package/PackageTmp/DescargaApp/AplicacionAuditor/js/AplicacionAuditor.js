var objregistro = (function () {
    var _addHandlers = function () {
        
    };
    var _crearElements = function () {
        _traerUrlAplicacion();
    };
    var _traerUrlAplicacion = function () {
        DIRECCIONES_DAO.Get("1", function (result) {
            var obj = byaPage.convertOBJ(result);
            $("#txtNombreAplicacion").html(obj.NOMBRE);
            $("#txtActualizacion").html(byaPage.converJSONDate(obj.ACTUALIZACION));
            $("#dvdQraplicacion").qrcode({
                "size": 200,
                "color": "#3a3",
                "text": obj.URL
            });
        });
    };
    return {
        formulario: '#form1',
        disabled: true,
        config: {
            theme: null,
            oper: null
        },
        init: function () {
            _addHandlers();
            _crearElements();
        }
    }
}());

$(function () {
    byaSite.SetModuloP({ TituloForm: "Aplicación Auditor ", Modulo: "Gestión", urlToPanelModulo: "AplicacionAuditor.aspx", Cod_Mod: "ADMSG", Rol: "ADMSGDesAuditor" });
    objregistro.init();
});
