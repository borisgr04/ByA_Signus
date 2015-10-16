//http://yoavniran.wordpress.com/2009/08/02/creating-a-webservice-proxy-with-jquery/
var MIAPLICACION = MIAPLICACION || {};

//Capa Infraestructura de Acceso a Servicios Externos
//Definicion de Propiedades
ServiceProxy = function (baseUrl) //constructor for the proxy
{
    this._baseURL = baseUrl;
};
//Definicion de Metodos
ServiceProxy.prototype =
{
    _defaulfComplete: function () {
        $("#dvdLoader").fadeOut();
    },
    _defaultErrorHandler: function (xhr, status, error) {
        alert(JSON.stringify(xhr));
    },
    _defaultBefore: function (xhr) {
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
            data: data,
            async: _async,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: fnSuccess,
            error: fnError,
            complete: this._defaulfComplete
        });
    }
};

//Capa de Acceso a Datos . DAO
var SL_TERCEROS_DAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsSL_TERCEROS.asmx/");
    return {
        Get: function (IDE_TER, fCorrecto) {
            var Parametro = {
                IDE_TER: "'" + IDE_TER + "'"
            }
            proxy._doAjax("GET", "Get",Parametro, fCorrecto, null, true);
        },
        InsertOrUpdate: function (Reg, fCorrecto) {
            var Parametro = "{'Reg':" + JSON.stringify(Reg) + "}";
            proxy._doAjax("POST", "InsertOrUpdate", Parametro, fCorrecto, null, true);
        }
    }
}());
var SIGNUS_FACADE_DAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsSignusFacade.asmx/");
    return {
        GetCalcularFechaVencimiento: function (Fecha, fCorrecto) {
            var Parametro = {
                FechaSuscripcion: "'" + Fecha + "'"
            }
            proxy._doAjax("GET", "GetCalcularFechaVencimiento", Parametro, fCorrecto, null, true);
        },
        GetLiquidacionTotal: function (FechaVen, Username, VAL_BAS, fCorrecto) {
            var Parametro = {
                FechaVen: "'" + FechaVen + "'",
                Username: "'" + Username + "'",
                VAL_BAS: "'" + VAL_BAS + "'"
            }
            proxy._doAjax("GET", "GetLiquidacionTotal", Parametro, fCorrecto, null, true);
        }
    }
}()); 
var SL_LIQESTAMPILLAS_DAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsSL_LIQESPAMPILLAS.asmx/");
    return {
        Insert: function (Reg, fCorrecto) {
            var Parametro = "{'Reg':" + JSON.stringify(Reg) + "}";
            proxy._doAjax("POST", "Insert", Parametro, fCorrecto, null, true);
        },
        Get: function (ID, fCorrecto) {
            var Parametro = {
                ID: "'" + ID + "'"
            };
            proxy._doAjax("GET", "Get", Parametro, fCorrecto, null, true);
        },
        GetXNroLiq: function (NRO_LIQ, VIGENCIA, fCorrecto) {
            var Parametro = {
                NRO_LIQ: "'" + NRO_LIQ + "'",
                VIGENCIA: "'" + VIGENCIA + "'"
            };
            proxy._doAjax("GET", "Get2", Parametro, fCorrecto, null, true);
        },
        CancelarLiquidacion: function (ID_LIQ, fCorrecto) {
            var Parametro = {
                ID_LIQ: "'" + ID_LIQ + "'"
            };
            proxy._doAjax("GET", "CancelarLiquidacion", Parametro, fCorrecto, null, true);
        },
        ConsultaLE: function (Periodo, Vigencia, Agente, fCorrecto) {            
            var Parametro = {
                Vigencia: "'" + Vigencia + "'",
                Periodo: "'" + Periodo + "'",
                AgenteRecaudador: "'" + Agente + "'"
            };
            proxy._doAjax("GET", "ConsultaLE", Parametro, fCorrecto, null, true);
        },
        GetsXPeriodo: function (Periodo, Vigencia, Agente, fCorrecto) {
            var Parametro = {
                VIGENCIA: "'" + Vigencia + "'",
                AGENTE: "'" + Agente + "'",
                PERIODO: "'" + Periodo + "'"
            };
            proxy._doAjax("GET", "Gets", Parametro, fCorrecto, null, true);
        },
        GetsPagadas: function (Periodo, Vigencia, Agente, fCorrecto) {
            var Parametro = {
                VIGENCIA: "'" + Vigencia + "'",
                AGENTE: "'" + Agente + "'",
                PERIODO: "'" + Periodo + "'"
            };
            proxy._doAjax("GET", "GetsPagadas", Parametro, fCorrecto, null, true);
        }
    }
}());
var SL_PAGOS_DAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsSL_PAGOS.asmx/");
    return {
        Insert: function (Reg, fCorrecto) {
            var Parametro = "{'Reg':" + JSON.stringify(Reg) + "}";
            proxy._doAjax("POST", "Insert", Parametro, fCorrecto, null, true);
        },
        CancelarPago: function (ID_LIQ, fCorrecto) {
            var Parametro = {
                ID_LIQ: "'" + ID_LIQ + "'"
            };
            proxy._doAjax("GET", "CancelarPago", Parametro, fCorrecto, null, true);
        }
    }
}());
var MEDIOS_MAGNETICOS_DAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsMediosMagneticos.asmx/");
    return {
        Insert: function (Vigencia, Periodo, Agente, fCorrecto) {
            var Parametro = {
                    Periodo: "'" + Periodo + "'",
                    Vigencia: "'" + Vigencia + "'",
                    AgenteRecaudador: "'" + Agente + "'"
                }
            proxy._doAjax("GET", "Insert", Parametro, fCorrecto, null, true);
        }
    }
}());
var SL_AGETDPTA_DAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsSL_AGETDPTA.asmx/");
    return {
        Insert: function (Reg, fCorrecto) {
            var Parametro = "{'Reg':" + JSON.stringify(Reg) + "}";
            proxy._doAjax("POST", "Insert", Parametro, fCorrecto, null, true);
        },
        Delete: function (Reg, fCorrecto) {
            var Parametro = "{'Reg':" + JSON.stringify(Reg) + "}";
            proxy._doAjax("POST", "Delete", Parametro, fCorrecto, null, true);
        },
        Gets: function (fCorrecto) {
            var Parametro = {
            };
            proxy._doAjax("GET", "Gets", Parametro, fCorrecto, null, true);
        }
    }
}());
var DIRECCIONES_DAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsDirecciones.asmx/");
    return {
        Get: function (ID,fCorrecto) {
            var Parametro = {
                ID: "'" + ID + "'"
            };
            proxy._doAjax("GET", "Get", Parametro, fCorrecto, null, true);
        }
    }
}());