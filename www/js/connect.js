//=====================================================================================//
// EL SIGUIENTE CÓDIGO ES UNA IMPLEMENTACIÓN BÁSICA PARA LLAMAR EL WEBSERVICE VIA SOAP //
//=====================================================================================//
    //Clase auxiliar para generar clases basadas en un modelo OOP
    var Class = function(model){
        // Invoca al método de inicialización
        var instance = function(){this.setup.apply(this, arguments);};  
        // Hereda las propiedades del modelo al prototipo
        for(var method in model){instance.prototype[method] = model[method];};
        // Valída el inicializador
        if (!instance.prototype.setup) instance.prototype.setup = function(){};
        // Regresa la nueva clase creada
        return instance;
    };
    // Generación de Clase cliente SOAP WSCall
    var WSCall = Class({
        // Método de inicialización (constructor) de la nueva clase
        setup:function(soapURL, callBack){
            this.soapEndPoint = soapURL; // Recibe el SOAP endpoint 
            this.callBack = callBack||function(){}; // Recibe la funcion CallBack para ejecutarse al regreso de la llamada
            // Agregamos los nameSapces necesarios
            this.addNameSpace('http://www.w3.org/2001/XMLSchema-instance', 'xsi');
            this.addNameSpace('http://www.w3.org/2001/XMLSchema', 'xsd');
            this.addNameSpace('http://www.w3.org/2003/05/soap-envelope', 'soap');
        },
        // Agrega un elemento al XML de la petición (no aplica para XML complejos)
        addArgument:function(name, value, dataType){this._arguments[name] = {name:name, value:value, type:(dataType||'string')};},
        // Agrega un nameSpace a la petición
        addNameSpace:function(uri, prefix){this._nameSpaces[prefix] = uri;},
        // Agrega un valor de encabezado
        addHeader:function(name, value){this._headers[name] = value;},
        // Construye el XML de la petición SOAP basado en los valores provistos
        buildXML:function(methodName, URI, prefix){
            // Agrega el nameSpace al encabezado
            if(URI && prefix) this.addNameSpace(URI, prefix);
            // Añade los nameSpaces al stream XML
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope';
            for(var nspace in this._nameSpaces){xml += ' xmlns:'+nspace+'="'+this._nameSpaces[nspace]+'"';};
            xml += '>';
            // Añade los datos del encabezado
            xml += '<soap:Header>';
            for(var header in this._headers){xml += '<'+header+'>'+this._headers[header]+'</'+header+'>';};
            xml += '</soap:Header>';
            // Añade el cuerpo de la petición
            xml += '<soap:Body>';
            var mtd = '';
            if(URI && prefix) {mtd = ' xmlns:'+prefix+'="'+URI+'"'};
            if(prefix) prefix = prefix+':';
            mtd = '<'+prefix+methodName+mtd+'>';
            for(var argName in this._arguments){
                var arg = this._arguments[argName];
                mtd += '<'+prefix+arg.name+' xsi:type="xsd:'+arg.type.toLowerCase()+'">'+arg.value+'</'+prefix+arg.name+'>';
            };
            mtd += '</'+prefix+methodName+'>';
            // Cierra el envolvente de la petición SOAP
            xml += mtd+'</soap:Body></soap:Envelope>';
            return xml;
        },
        // Colecciones privadas para los elementos de encabezado argumentos y namespaces
        _arguments:{},_nameSpaces:{},_headers:{},
        // Metodo de invocación del metodo SOAP
        invoke:function(methodName, URI, prefix){
            var This = this;
            // Obtiene el cuerpo de la peticion XML
            var xml = this.buildXML(methodName, URI, prefix);
            // Obtiene una instancia del objeto HTTP
            var http = (function(){if(window.XMLHttpRequest) return new XMLHttpRequest();return new ActiveXObject('Microsoft.XmlHttp');})();
            // Eliminamos los reusltados de alguna petición previa
            delete this.responseXML;
            // Establecemos la peticion HTTP
            http.open('POST', this.soapEndPoint, true);
            // Agregamos un manejador de eventos para monitorear la respuesta del servidor
            http.onreadystatechange = function(){
                //TODO:Agregar manejador de errores
                //TODO: Obtener el fault info respectivo
                if(http.readyState == 4){ // Respueta del server HTTP completada
                    if(http.status = 200){ // El server respondio positivamente (Sin error)
                        var SOAP_REQUEST = 'Request', SOAP_RESPONSE = 'Response', SOAP_REPLY = 'Reply';
                        if(http.responseXML){ // La respuesta viene en formato XML (SOAP válido)
                            var xml = http.responseXML;
                            var methodResp = methodName;
                            // Las siguientes lineas aislan la respuesta SOAP y la asignan a la propiedad responseXML
                            This.responseXML = xml.getElementsByTagName(methodName + SOAP_RESPONSE)[0]; // Primer intento de filtrado
                            if(!This.responseXML){ // El primer intento no fue exitoso, Segundo intento
                    		    var delta = (methodName.length - SOAP_REQUEST.length);
                                if(methodName.lastIndexOf(SOAP_REQUEST) == delta){
                                    var alias = methodName.substr(0, (methodName.length - SOAP_REQUEST.length));
                                    This.responseXML = xml.getElementsByTagName(alias+SOAP_RESPONSE)[0];
                                };
                            };
                            // Tercer intento de resultado
                            if(!This.responseXML) This.responseXML = xml.getElementsByTagName(methodName+SOAP_REPLY)[0];
                            if(!This.responseXML){ // Ultimo intento asumiendo un nodo de respuesta unico
                                This.responseXML = xml.getElementsByTagName('Body')[0];
                                This.responseXML = This.responseXML.childNodes[0];
                            };
                        };
                        // Llamamos a la función de callBack con el texto de la respuesta
                        This.callBack(http.responseText);
                    }else{};
                };
            };
            // Agregamos el encabezado para indicar el tipo de data stream enviado
            http.setRequestHeader('Content-type', 'text/xml');
            // Ejecutamos la peticion HTTP
            http.send(xml);
        }
    });
//=====================================================================================//
//                  FIN DEL CÓDIGO PARA LA CREACIÓN DEL CLIENTE SOAP                   //
//=====================================================================================//

//=====================================================================================//
// Las siguientes lineas hacen uso de la clase WSCall() para obtener el dataSet        //
//=====================================================================================//
    //function queryData(){
    function queryData(storedProcedure, parameters, method){
        // Se crea la instancia del componente WSCAll, se proporciona el SOAP EndPoint 
        // y una funcion de CallBack que será ejecutada al regresar la respuesta del servidor
        //var soap = new WSCall('http://movil.vbc-for-mlm.com/rs_app_endpoint.asp', function(text){
        var soap = new WSCall('http://mexrednatura.vbc-for-mlm.com/rs_app_endpoint.asp', function(text){
            // En este punto, el servidor ha regresado su respuesta y si esta fue exitosa
            // existirá una proppiedad llamada responseXML que contendra la respuesta SOAP
            // Obtenemos el dataSet JSON de la respuesta
            if(soap.responseXML){
                // Evaluamos el valor de /response/@code
                var resp = soap.responseXML.getElementsByTagName('response')[0];
                if(resp.getAttribute('code') == '0'){// Si /response/@code es 0 (cero) la operación fue exitosa
                    // Convertimos el stream json a una variable javascript 
                    var json = eval('('+soap.responseXML.getElementsByTagName('dataSet')[0].childNodes[0].nodeValue+')');
                    //TODO:Implementar el codigo propio de la aplicación
                    method(json.dataSet);
                } else {
                    //TODO:Implementar el codigo propio de la aplicación
                    alert(resp.getAttribute('message'));
                }
                //TODO:Implementar el codigo propio de la aplicación
            } else alert('Fallo en la ejecución del método');
        });
        // Agregamos el namespace base
        // Agregamos las credenciales de acceso
        soap.addHeader('appId', 'VBCVO');
        soap.addHeader('apiKey', 'uZyA9ICJVVEYtOCI');
        // Llamada SQL con sus argumentos (argName, argValue, dataType)
        soap.addArgument('sql', storedProcedure);
        var cont = 0;
        for (var i = 0; i < parameters.length; i++) {
            soap.addArgument('arg'+cont,  parameters[i+1], parameters[i]);
            console.log('arg'+cont+', '+ parameters[i+1]+', '+parameters[i]);
            i+=1;cont+=1;
       }
        //soap.addArgument('arg0',  0, 'integer');
        // Invokamos el metodo con su namespace respectivo
        //showWaitLoader(); //Mostramos la animacion de espera....
        soap.invoke('dataRequest', 'http://api.ramosoft.com/namespace/', 'rs');
    }/*

function showWaitLoader(){
    var div = document.getElementById('divResult');
    div.innerHTML = '<img src="data:image/gif;base64,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">';
}*/