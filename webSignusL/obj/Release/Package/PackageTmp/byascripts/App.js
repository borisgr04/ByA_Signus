//http://yoavniran.wordpress.com/2009/08/02/creating-a-webservice-proxy-with-jquery/
var MIAPLICACION = MIAPLICACION || {};

//Capa Infraestructura de Acceso a Servicios Externos
//Definicio de Propiedades
ServiceProxy = function (baseUrl) //constructor for the proxy
{
    this._baseURL = baseUrl; 
};
//Definicio de Metodos
ServiceProxy.prototype=
{
    _defaultErrorHandler: function (xhr, status, error) {
        alert("Error:" + JSON.stringify(xhr));
    },
    //POST, PUT
    _doAjax: function (sType, uri, data, fnSuccess, fnError, _async) {
        if (!data) data = {};
        if (!fnError)fnError = this._defaultErrorHandler;
        if (!_async) _async = true;
        $.ajax({
            type: sType,
            url: this._baseURL + uri,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async:_async, 
            success: fnSuccess,
            error: fnError
        });
    },
    //GET
    _getAjax: function (uri, data) {
        var source = {};
        if (!data) data = {};
        var fnError = this._defaultErrorHandler;
        $.ajax({
            type: "GET",
            url: this._baseURL + uri,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                source = result;
            },
            error: fnError
        });
        return source;
    },
    _Ejecutar: function (Url, parametro, fnExito) {
        
        if (!fnExito) {
            var result = this._getAjax(Url, parametro);
            return byaPage.retObj(result.d);
        }
        else {
            var result = this._doAjax("GET", Url, parametro, fnExito);
        }
    }
};
