var Elecc = (function () {  
    var _addHandlers = function () {
        $("#btnLogin").click(function () {
            VerLogin();
        });
    };
    var _createElements = function () {
        
    };
    var EventoAtras = function () {
    };

    var VerLogin = function () {
        var usua = {};
        usua.USERNAME = $("#txtUsuario").val();
        usua.PASSWORD = $("#txtPassword").val();
        SEGURIDAD_DAO.Login(usua, function (result) {
            if (result) {
                localStorage.setItem("UsuarioSignus", $("#txtUsuario").val());
                window.location.href = "index.html";
            } else {
                alert("Datos incorrectos intente nuevamente");
                $("#txtUsuario").val("");
                $("#txtPassword").val("");
            }
        });
    };

    var VerificarSesion = function () {
        var ses = localStorage.getItem("UsuarioSignus");
        if (ses != null) {
            window.location.href = "index.html";
        } else {
            return true;
        }
    }

    return {
        init: function () {
            if (VerificarSesion()) {
                _createElements();
                _addHandlers();
                document.addEventListener("backbutton", EventoAtras, true);
            }
        }
    };
}());

$(document).ready(function () {
    Elecc.init();
});