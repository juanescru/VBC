$(document).ready(function() {
    //Volumen Movil
    //
    if(menu.checkRelativeRoot() == "volumen_movil.html") {
        //Ejecuta menú arbol
        $('#drilldown-1').dcDrilldown();
        //Capturo todos los click a enlaces
        $("a").click(function (e) {
            //catprua atributos href y titulo del enlace actual
            var value = $(this).attr("href");
            var name = $(this).attr("title");
            //agrega etiqueta spam con los atributos capturados
            //con la finalidad de saber qué enlace fue cliqueado
            $("#dd-header-0 h3").html("<span class='activo' title='" + value + "'>" + name + "</span>");
        });
        //Capturo el click a la etiqueta span creada anteriormente
        $(document).on('click','.activo',function() {
            //capturo su atributo title el cual contiene el enlace
            var nameHref = $(this).attr("title");
            //cuento el número de etiquetas con la clase activo
            var fin = 0;
            fin = $('.activo').size();
            //si solo hay 1 etiqueta con la clase activo, redirecciona al enlace
            if (fin == 1) {
                location.href=nameHref;
            } else {
                //si el resultado fuera mayor a 1, verifica cual es el tag padre
                var padre = "";
                padre = $(this).parent()[0]; //padre inmediato
                padre = padre.tagName; //Tag del padre
                //Si el tag padre es un H3, redirecciona
                //H3 => Redirecciona; a.link-back => Regresar
                if (padre == 'H3') {
                    location.href=nameHref;
                }
            }
        });
    }
    //
    //Termina volumen móvil


    //Carrito de compras
    //

    //Constantes
    const IVA = 0.16;

    $.space = {
        //namespace para crear el arreglo de datos
        var1 : "",
        var2 : ""
    };
    //captura click del botón comprar
    $(".comprar").click(function() {
        //Capturo id de la fila actual de la tabla
        var trid = $(this).closest('tr').attr('id');
        //Recorre todas las celdas de la fila actual
        $('#' + trid + ' td').each(function() {
            //captura ID de la celda
            var ids = $(this).closest('td').attr('id');
            var text = "";
            //Se crea una variable para almacenar cadena para el array
            var cadena = "";
            //Extrae contenido de la celda
            text = $('#' + ids).text();
            //compara los id con el contenido, si son iguales, lo guarda
            //de esta manera tengo capturado el código del producto.
            if (ids == text) {
                $.space.var2 = text;
            }
            //Si uno de los valores contiene la palabra Comprar., la excluye y reemplaza por el valor del input.text
            //ya que la palabra Comprar. es el nombre del botón
            var bus = text.search("Comprar.");
            if (bus > 1) {
                text = $('#TXT-' + $.space.var2).val();
            }
            //Finalmente se guarda toda la cadena
            //Se agrega "," para utilizarlo de escape al convertirlo en array
            cadena += "\"" + text + "\",";
            $.space.var1 += cadena;
            if (text == "") {
                $.space.var1 = "";
            }
        });
        //se eliminan caracteres sobrantes para tener mayor control del arreglo
        var str = $.space.var1;
        str = str.substring(1, str.length-2);
        //Se procede a guardar los datos en una variable local
        //para que esten disponibles cuando se acceda al carrito en cualquier momento
        //Dado que el carrito puede tener varias compras, se procede a utilizar un while
        var listo = 0, cont = 0;
        while(listo == 0) {
            //Si no existe una compra previa, se procede a guardar en local con el índice 0
            //de lo contrario, el ciclo sigue y se guarda con el índice 1, 2, 3, ...
            if (!window.localStorage.getItem('datosCarrito' + cont)) {
                localStorage.setItem('datosCarrito' + cont ,str);
                //Ya que se guardaron los datos en el índice correspondiente
                //se procede a salir del ciclo.
                listo = 1;
                if (str == "") {
                    listo = 2;
                }
            }
            cont += 1;
        }
        //Se limpian variables para futuras compras
        str = "";
        $.space.var1 = "";
        $.space.var2 = "";
        if (listo == 1) {
            location.href = 'carrito_compras.html';
        }
        else if (listo==2) {
            app.showNotificactionVBC("Captura la cantidad y vuelve a intentalo.");
        }
    });
    
    //Cargar Datos almacenados
    //
    //Dentro del carrito de compras, se verifica si existen pedidos almacenados
    var listo = 0, cont = 0;
    //variables de llenado de tabla
    var total_precio = 0, total_puntos = 0, total_vconsumible = 0, total_peso = 0;
    var llenarTabla  = "";
    while(listo == 0) {
        //Se recorren las variables almacenadas desde el indice 0 hasta ya no encontrar
        //si no encuentra variables almacenadas, sale del ciclo
        if (window.localStorage.getItem('datosCarrito' + cont)) {
            //se extraen los datos locales
            var extraer = localStorage.getItem('datosCarrito' + cont);
            //se convierte la cadena en array y se asignan valores
            var resArray = extraer.split('","');
            var codigo      = resArray[0];
            var articulo    = resArray[1];
            var precio      = resArray[2];
            var puntos      = resArray[3];
            var vconsumible = resArray[4];
            var peso        = resArray[5];
            var cantidad    = resArray[6];
            var total       = (precio.substring(1, precio.length))*cantidad;
            var tpuntos     = (puntos*cantidad);
            var tvconsumible= (vconsumible*cantidad);
            var tpeso       = (peso*cantidad);
            total_precio      += total;
            total_puntos      += tpuntos;
            total_vconsumible += tvconsumible;
            total_peso        += tpeso;
            //se llena la tabla del carrito con los pedidos extraidos
            llenarTabla += "<tr>";
            llenarTabla +=      "<td>" + articulo + "</td>";
            llenarTabla +=      "<td>" + codigo + "</td>";
            llenarTabla +=      "<td>" + cantidad + "</td>";
            llenarTabla +=      "<td>" + precio + "</td>";
            llenarTabla +=      "<td>" + puntos + "</td>";
            llenarTabla +=      "<td>" + vconsumible + "</td>";
            llenarTabla +=      "<td>$" + total + "</td>";//total precio
            llenarTabla +=      "<td>" + tpuntos + "</td>";//total puntos
            llenarTabla +=      "<td>" + tvconsumible + "</td>";//total valor consumible
            llenarTabla +=      "<td>" + Math.round(tpeso*100)/100 + "kg.</td>";
            llenarTabla += "</tr>";
        } else {
            listo = 1;
        }
        cont += 1;
    }
    llenarTabla += "<tr id='sumatoria'>";
    llenarTabla +=      "<td id='subtotal' colspan='6' align='right'><strong>Subtotal</string></td>";
    llenarTabla +=      "<td id='total_precio'>$" + Math.round(total_precio*100) / 100 + "</td>";
    llenarTabla +=      "<td id='total_puntos'>" + total_puntos + "</td>";
    llenarTabla +=      "<td id='total_vconsumible'>" + total_vconsumible + "</td>";
    llenarTabla +=      "<td id='total_peso'>" + Math.round(total_peso*100) / 100 + "kg. </td>";
    llenarTabla += "</tr>";
    $("#datos_carrito").html(llenarTabla);

    //Cancelar pedido
    //
    $('.cancelar').click(function() {
        var listo = 0, cont = 0;
        while(listo == 0) {
            if (window.localStorage.getItem('datosCarrito' + cont)) {
                localStorage.removeItem('datosCarrito' + cont);
            }
            else {
                //Ya que se eliminaron todos los pedidos
                //se procede a salir del ciclo.
                listo = 1;
            }
            cont += 1;
        }
        localStorage.removeItem('carrito_levantar');
        localStorage.removeItem('carrito_subtotales');
        if(menu.checkRelativeRoot() == "carrito_compras.html") {
            $('#datos_carrito').html("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
        } else {
            location.href="carrito_compras.html";
        }
    });

    //Guardar Método de envío;
    if(menu.checkRelativeRoot() == "carrito_compras_levantar.html") {
        if (window.localStorage.getItem('carrito_levantar')) {
            //extrae datos almacenados y los convierte en array
            var extraer = localStorage.getItem('carrito_levantar');
            var resArray = extraer.split('","');

            $('#metodo-envio').val(resArray[0]);
            $("#tdMetodo-envio span").text($('#metodo-envio option:selected').text());
            if (resArray[0] == 0) {
                $('#paqueteria').val(resArray[1]);
                $("#tdPaqueteria span").text($('#paqueteria option:selected').text());
            }
            else {
                $('#sucursal').val(resArray[1]);
                $("#tdSucursal span").text($('#sucursal option:selected').text());
            }
            $('#forma-pago').val(resArray[2]);
            $("#tdForma-pago span").text($('#forma-pago option:selected').text());
        }
        //Metodo de envío
        $('#trSucursal').hide(0);
        $('#metodo-envio').change(function() {
            var option = $(this).val();
            if (option == 0) {
                $('#trSucursal').hide(0);
                $('#trPaqueteria').show(300);
                console.log('mensajería ' + option);
            }
            else if (option == 1){
                $('#trPaqueteria').hide(0);
                $('#trSucursal').show(300);
            }
        });

        var option = $('#metodo-envio').val();
            if (option == 0) {
                $('#trSucursal').hide(0);
                $('#trPaqueteria').show(300);
            }
            else if (option == 1){
                $('#trPaqueteria').hide(0);
                $('#trSucursal').show(300);
            }

        $('.levantar-siguiente').click(function() {
            var formaPago = $('#forma-pago').val();
            if (formaPago == "Seleccione uno") {
                app.showNotificactionVBC("Seleccione una forma de pago y oprima siguiente");
            }
            else {
                //Guardar datos
                var datos = "";
                var metodoEnvio = $('#metodo-envio').val();
                var sucursal = $('#sucursal').val();
                var paqueteria = $('#paqueteria').val();
                datos = metodoEnvio + "\",\"";
                if (metodoEnvio == 0) {
                    datos += paqueteria + "\",\"";
                }
                else {
                    datos += sucursal + "\",\"";
                }
                datos += formaPago;
            
                localStorage.setItem('carrito_levantar', datos);
                location.href='carrito_compras_generar.html';
            }
        });
    }

    if(menu.checkRelativeRoot() == "carrito_compras_generar.html") {
        if (window.localStorage.getItem('carrito_subtotales')) {
            var cadena = localStorage.getItem('carrito_subtotales');
            var resArray = cadena.split('","');
            var total_precio =      resArray[0];
            var total_puntos =      resArray[1];
            var total_vconsumible = resArray[2];
            var cadenaSubtotal = '<div style="padding:3px; border: 1px solid silver; float: left">T. Puntos: ' + total_puntos + '</div>';
            cadenaSubtotal += '<div style="padding:3px; border: 1px solid silver; float: left">T. V. Consumible: ' + total_vconsumible + '</div>';
            cadenaSubtotal += '<div style="padding:3px; float: right">Total: $' + total_precio + '</div>';
            $('#subtotales').html(cadenaSubtotal);
            var cadenaInpuesto = total_precio * IVA;
            cadenaInpuesto = '<div style="text-align: right">$' + Math.round(cadenaInpuesto*100)/100 + '</div>';
            $('#impuesto').html(cadenaInpuesto);

        }
        else {
            app.showNotificactionVBC('Algo salio mal al cargar los datos');
        }
    }

    // Cerrar pedido
    $('.cerrar_pedido').click(function() {
        if (!window.localStorage.getItem('datosCarrito0')) {
            app.showNotificactionVBC('No tienes pedidos que prcesar');
        }
        else {
            var subtotal = $('#total_precio').text();
            subtotal = subtotal.substring(1, subtotal.length);
            var puntos = $('#total_puntos').text();
            var vconsumible = $('#total_vconsumible').text();
            var cadena = subtotal + "\",\"" + puntos + "\",\"" + vconsumible;
            //Guarda los totales
            localStorage.setItem('carrito_subtotales', cadena);
            location.href='carrito_compras_levantar.html';
        }
    });


    //
    //Termina Carrito de compras

    //Inicia validación inscripciones
    //

    $('#kit').change(function() {
        /* Act on the event */
        var opcion = $(this).val();
        if(opcion == 2 || opcion == 4 || opcion == 6 || opcion == 8 || opcion == 10){
            $('#codigoAutorizacion').show(200);
        }else{
            $('#codigoAutorizacion').hide(200);
        }
    });

    $('#metodoEnvio').change(function() {
        /* Act on the event */
        var opcion = $(this).val();
        if(opcion == 1){
            $('#paqueteriaTr').hide(200);
            $('#centroAutorizadoTr').show(200);
        }else if(opcion == 2){
            $('#centroAutorizadoTr').hide(200);
            $('#paqueteriaTr').show(200);
        }else{
            $('#centroAutorizadoTr').hide(200);
            $('#paqueteriaTr').hide(200);
        }
    });

    //
    //Termina validación inscripciones

    //Menú
    //
    var contador = 1;
    $('.menu_bar').click(function(){
        if (contador == 1) {
            $(this).css('position', 'fixed');
            $('#mascara').fadeIn(300);  
            $('nav').animate({
                left: '0'
            });
            contador = 0;
        } else {
            $(this).css('position', 'absolute');
            contador = 1;
            $('#mascara').fadeOut(300);  
            $('nav').animate({
                left: '-100%'
            });
        }
    });
    //
    //Termina menú

    //Limpia elementos &nbsp del código html
    //$('#clear').html($('#clear').html().replace(/&nbsp;/gi,''));

    //Contador animado para números
    $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
});

//Redireccionar
function Href(url) {
    location.href=url;
}
function Debug(element) {
    console.log(element);
}