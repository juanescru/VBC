//Se almacena localmente valor del Combo Centro Aurorizado y se carga abre Cuadro de Dialogo Direciones
$('#btnDireccion').click(function() {
    /* Act on the event */
    var centroAutorizadoVal = $('#centroAutorizado').val();
   localStorage.setItem("centroAutorizadoValLocal", centroAutorizadoVal);

   window.location.href = "cuadroDialogoDireccion.html";
});  

/*Devuelve conjunto de datos y carga SELECT de KITS con los datos obtenidos*/
queryData('USP_VBC_GET_ITEMS_KITS', ['integer', '4'], fillKits);

function fillKits(dataSet){
    var rec = dataSet[0];
    var text = '';

    for(var idx = 0; idx < dataSet.length; idx++){
        rec = dataSet[idx];
        text += '<option value="'+ rec["itemCode"] +'">'+ rec["description"] +'</option>';
    };

    $('#kit').html(text);

    /*if(!localStorage.getItem("susc2Local")){
        $('#tdKit span').text($('#kit option:selected').text());
    }else{
        var extraer = localStorage.getItem("susc2Local");
        var array = extraer.split('","');
        $('#kit').val(array[12]);
        $('#tdKit span').text($('#kit option:selected').text());
    }*/

}          

/*Devuelve conjunto de datos y carga SELECT de METODOS DE ENVÍO con los datos obtenidos*/
queryData('USP_VBC_GET_WAREHOUSE_BY_COUNTRY', ['integer', '4'], fillWarehouses);

function fillWarehouses(dataSet){
    var rec = dataSet[0];
    var text = '';

    for(var idx = 0; idx < dataSet.length; idx++){
        rec = dataSet[idx];
        text += '<option value="'+ rec["warehouseId"] +'">'+ rec["description"] +'</option>';
    };

    $('#centroAutorizado').append(text);               

    /*if(!localStorage.getItem("susc2Local")){
        //$('#tdCentroAutorizado span').text($('#CentroAutorizado option:selected').text());
    }else{
        var extraer = localStorage.getItem("susc2Local");
        var array = extraer.split('","');
        $('#kit').val(array[12]);
        $('#tdKit span').text($('#kit option:selected').text());
    }*/
}

/*Devuelve conjunto de datos y carga SELECT de PAQUETERÍAS con los datos obtenidos*/
queryData('USP_VBC_GET_CARRIERS', ['integer', '4'], fillCarriers);

function fillCarriers(dataSet){
    var rec = dataSet[0];
    var text = '';

    for(var idx = 0; idx < dataSet.length; idx++){
        rec = dataSet[idx];
        text += '<option value="'+ rec["carrierId"] +'">'+ rec["description"] +'</option>';
    };

    $('#paqueteria').html(text);

    /*if(!localStorage.getItem("susc2Local")){
        $('#tdPaqueteria span').text($('#paqueteria option:selected').text());
    }else{
        var extraer = localStorage.getItem("susc2Local");
        var array = extraer.split('","');
        $('#kit').val(array[12]);
        $('#tdKit span').text($('#kit option:selected').text());
    }*/

}

/*Devuelve conjunto de datos y carga SELECT de MÉTODO DE PAGO con los datos obtenidos*/
queryData('USP_VBC_GET_PAY_METHOD', ['integer', '1', 'integer', '4'], fillPayMethod);

function fillPayMethod(dataSet){
    var rec = dataSet[0];
    var text = '';                

    for(var idx = 0; idx < dataSet.length; idx++){
        rec = dataSet[idx];
        text += '<option value="'+ rec["payMethodId"] +'">'+ rec["description"] +'</option>';
    };

    $('#metodoPago').html(text);

    /*if(!localStorage.getItem("susc2Local")){
        $('#tdMetodoPago span').text($('#metodoPago option:selected').text());
    }else{
        var extraer = localStorage.getItem("susc2Local");
        var array = extraer.split('","');
        $('#kit').val(array[12]);
        $('#tdKit span').text($('#kit option:selected').text());
    }*/

}

/*Devuelve conjunto de datos y carga SELECT de METODOS DE ENVÍO con los datos obtenidos*/
queryData('USP_VBC_GET_SHIPMENT_METHODS', ['integer', '', 'integer', '4'], fillShipmentMethods);

function fillShipmentMethods(dataSet){
    var rec = dataSet[0];
    var text = '';

    for(var idx = 0; idx < dataSet.length; idx++){
        rec = dataSet[idx];
        text += '<option value="'+ rec["shipMethodId"] +'">'+ rec["name"] +'</option>';
    };

    $('#metodoEnvio').append(text);

    /*if(!localStorage.getItem("susc2Local")){
        //$('#tdMetodoEnvio span').text($('#metodoEnvio option:selected').text());
    }else{
        var extraer = localStorage.getItem("susc2Local");
        var array = extraer.split('","');
        $('#kit').val(array[12]);
        $('#tdKit span').text($('#kit option:selected').text());
    }*/

}

function fillDay(){
    var text = "";
    for(var cont = 1; cont <= 31; cont++){
        if(cont < 10){
            text += '<option value="0'+ cont +'">0'+ cont +'</option>';
        }else{
            text += '<option value="'+ cont +'">'+ cont +'</option>';
        }
    }
    $('#dia').append(text);
}

function fillMonth(){
    var text = "";
    for(var cont = 1; cont <= 12; cont++){
        if(cont < 10){
            text += '<option value="0'+ cont +'">0'+ cont +'</option>';
        }else{
            text += '<option value="'+ cont +'">'+ cont +'</option>';
        }
    }
    $('#mes').append(text);
}

function fillYear(){
    var text = "";
    for(var cont = 1930; cont <= 2000; cont++){
        text += '<option value="'+ cont +'">'+ cont +'</option>';                    
    }
    $('#ano').append(text);
}