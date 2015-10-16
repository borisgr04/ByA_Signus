//http://yoavniran.wordpress.com/2009/08/02/creating-a-webservice-proxy-with-jquery/
var MIAPLICACION = MIAPLICACION || {};
//var dirBase = "http://190.109.185.138:8036";
var dirBase = "http://localhost:14371";

//Capa Infraestructura de Acceso a Servicios Externos
//Definicion de Propiedades
ServiceProxy = function (baseUrl) //constructor for the proxy
{
    this._baseURL = baseUrl;
};
//Definicion de Metodos
ServiceProxy.prototype =
{
    _defaultErrorHandler: function (xhr, status, error) {
        alert(JSON.stringify(xhr));
    },
    _defaultBefore: function (xhr) {
        byaPage.showLoading("a", "", false, false);
    },
    _defaultComplete: function () {
        byaPage.hideLoading();
    },
    //POST, PUT // GET Sincrono o Asincrono
    _doAjax: function (sType, uri, data, fnSuccess, fnError, _async) {
        $("#dvdLoader").fadeIn();
        if (!data) data = {};
        if (!fnError) fnError = this._defaultErrorHandler;
        if (!_async) _async = true;
        $.ajax({
            type: sType,
            url: this._baseURL + uri,
            contentType: "application/json; charset=utf-8",
            async: _async,
            dataType: "json",
            data: data,
            beforeSend: this._defaultBefore,
            success: fnSuccess,
            complete: this._defaultComplete
        }).fail(fnError);
    }
};

//Capa de Acceso a Datos . DAO
var SL_LIQESTAMPILLAS_DAO = (function () {
    var proxy = new ServiceProxy(dirBase + "/api/Liquidaciones/");
    return {
        Get: function (ID, fCorrecto) {
            var data = null;
            proxy._doAjax("GET", ID, data, fCorrecto, null, true);
        }
    }
}());
var SEGURIDAD_DAO = (function () {
    var proxy = new ServiceProxy(dirBase + "/api/Seguridad/");
    return {
        Login: function (Usua, fCorrecto) {
            proxy._doAjax("POST", "Login", JSON.stringify(Usua), fCorrecto, null, true);
        }
    }
}());
var AGENTES_DAO = (function () {
    var proxy = new ServiceProxy(dirBase + "/api/Agentes/");
    return {
        GetsFiltro: function (cade, fCorrecto) {
            proxy._doAjax("GET", "Filtro/" + cade, null, fCorrecto, null, true);
        }
    }
}());
var CONSULTAS_DAO = (function () {
    var proxy = new ServiceProxy(dirBase + "/api/Consultas/");
    return {
        ConsultaPorAgente: function (Nit, ClaDec, Vig, fCorrecto) {
            proxy._doAjax("GET", "ConsultaXAgente/" + Nit + "/" + ClaDec + "/" + Vig, null, fCorrecto, null, true);
        }
    }
}());
var DATOSBASICOS_DAO = (function () {
    var proxy = new ServiceProxy(dirBase + "/api/DatosBasicos/");
    return {
        GetsVigencias: function (fCorrecto) {
            proxy._doAjax("GET", "Vigencias", null, fCorrecto, null, true);
        }
    }
}());
















