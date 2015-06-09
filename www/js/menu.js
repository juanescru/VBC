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

    //Inscripciones
    //
    $('#btnContinuar').click(function() {
        //Capturo el valor de los campos a través de su id
        var lenguaje = $('#lenguaje').val();
        var numPatrocinador = $('#lblNumeroPatrocinador').text();
        var nombrePatrocinador = $('#lblNombrePatrocinador').text();
        //Se crea una variable para almacenar cadena para el array
        var cadena = "";
        //Se guarda toda la cadena
        //Se agrega "," para utilizarlo de escape al convertirlo en array
        cadena += lenguaje + "\",";
        cadena += "\"" + numPatrocinador + "\",";
        cadena += "\"" + nombrePatrocinador;
        //Se almacena localmente el valor del array en una variable local
        localStorage.setItem('susc1Local' , cadena);
    });

    $('#btnSiguiente2').click(function() {
        //Capturo el valor de los campos a través de su id
        var rfc = $('#txtRFC').val();
        var curp = $('#txtCURP').val();
        var nombre = $('#txtNombre').val();
        var apePat = $('#txtApePat').val();
        var apeMat = $('#txtApeMat').val();
        var dia = $('#dia').val();
        var mes = $('#mes').val();
        var ano = $('#ano').val();
        var lugarNacimiento = $('#txtLugarNacimiento').val();
        var sexo = $('#sexo').val();
        var telefono = $('#txtTelefono').val();
        var email = $('#txtEmail').val();
        var kit = $('#kit').val();
        var codigoAutorizacion = $('#txtCodigo').val();
        var metodoEnvio = $('#metodoEnvio').val();
        var centroAutorizado = $('#centroAutorizado').val();
        var paqueteria = $('#paqueteria').val();
        var metodoPago = $('#metodoPago').val();
        //Se crea una variable para almacenar cadena para el array
        var cadena = "";
        //Se guarda toda la cadena
        //Se agrega "," para utilizarlo de escape al convertirlo en array
        cadena += rfc + "\",";
        cadena += "\"" + curp + "\",";
        cadena += "\"" + nombre + "\",";
        cadena += "\"" + apePat + "\",";
        cadena += "\"" + apeMat + "\",";
        cadena += "\"" + dia + "\",";
        cadena += "\"" + mes + "\",";
        cadena += "\"" + ano + "\",";
        cadena += "\"" + lugarNacimiento + "\",";
        cadena += "\"" + sexo + "\",";
        cadena += "\"" + telefono + "\",";
        cadena += "\"" + email + "\",";
        cadena += "\"" + kit + "\",";
        if(kit == 'PAQ1000MX' || kit == 'PAQ1001MX' || kit == 'PAQ1002MX' || kit == 'PAQ1003MX' || kit == 'PAQ1004MX'){
            cadena += "\"" + codigoAutorizacion + "\",";
        }    
        cadena += "\"" + metodoEnvio + "\",";
        if(metodoEnvio == 1){
            cadena += "\"" + centroAutorizado + "\",";
        }else if(metodoEnvio == 2){ 
            cadena += "\"" + paqueteria + "\",";
        }       
        cadena += "\"" + metodoPago;
        //Se almacena localmente el valor del array en una variable local
        localStorage.setItem('susc2Local' ,cadena);
    });

    $('#btnSiguiente3').click(function() {
        var flag = 0;
        //Capturo el valor de los campos a través de su id
        var pais = $('#pais').val();
        var calle = $('#txtCalle').val();
        var num = $('#txtNum').val();
        var colonia = $('#txtColonia').val();
        var ciudad = $('#txtCiudad').val();
        var estado = $('#estado').val();
        var cp = $('#txtCP').val();
        var cbMismaDir = document.getElementById('cbMismaDir');     
        //Se crea una variable para almacenar cadena para el array
        var cadena = "";
        //Se guarda toda la cadena
        //Se agrega "," para utilizarlo de escape al convertirlo en array
        cadena += pais + "\",";
        cadena += "\"" + calle + "\",";
        cadena += "\"" + num + "\",";
        cadena += "\"" + colonia + "\",";
        cadena += "\"" + ciudad + "\",";
        cadena += "\"" + estado + "\",";
        cadena += "\"" + cp + "\",";
        if(cbMismaDir.checked){
            flag = 1;
        }else{
            flag = 0;
        }
        cadena += "\"" + flag;
        //Se almacena localmente el valor del array en una variable local
        localStorage.setItem('susc3Local' ,cadena);
    });

    $('#btnSiguiente4').click(function() {
        //Capturo el valor de los campos a través de su id
        var alias = $('#txtAlias').val();
        var password = $('#txtPassword').val();  
        //Se crea una variable para almacenar cadena para el array
        var cadena = "";
        //Se guarda toda la cadena
        //Se agrega "," para utilizarlo de escape al convertirlo en array
        cadena += alias + "\",";
        cadena += "\"" + password;
        //Se almacena localmente el valor del array en una variable local
        localStorage.setItem('susc4Local' ,cadena);
    });

    //Carga los datos locales de los campos de cada formulario hasta que termine la inscripción
    if(menu.checkRelativeRoot() == "suscriptores.html"){
        if(localStorage.getItem('susc1Local')){
            //Extraemos los datos almacenados y los convertimos en Array
            var extraer = localStorage.getItem('susc1Local');
            var ResArray = extraer.split('","');

            $('#lenguaje').val(ResArray[0]);
            $("td#tdLenguaje span").text($('#lenguaje option:selected').text());
        }
    }

    if(menu.checkRelativeRoot() == "suscriptores2.html"){
        if(localStorage.getItem('susc2Local')){
            //Extraemos los datos almacenados y los convertimos en Array
            var extraer = localStorage.getItem('susc2Local');
            var ResArray = extraer.split('","');

            $('#txtRFC').val(ResArray[0]);
            $('#txtCURP').val(ResArray[1]);
            $('#txtNombre').val(ResArray[2]);
            $('#txtApePat').val(ResArray[3]);
            $('#txtApeMat').val(ResArray[4]);

            $('#dia').val(ResArray[5]);
            $('td#tdFechaNacimiento div:nth-child(1) div span').text($('#dia option:selected').text());

            $('#mes').val(ResArray[6]);
            $('td#tdFechaNacimiento div:nth-child(2) div span').text($('#mes option:selected').text());

            $('#ano').val(ResArray[7]);
            $('td#tdFechaNacimiento div:nth-child(3) div span').text($('#ano option:selected').text());

            $('#txtLugarNacimiento').val(ResArray[8]);

            $('#sexo').val(ResArray[9]);
            $('td#tdSexo span').text($('#sexo option:selected').text());

            $('#txtTelefono').val(ResArray[10]);
            $('#txtEmail').val(ResArray[11]);

            $('#kit').val(ResArray[12]);
            $("td#tdKit span").text($('#kit option:selected').text());
            if($('#kit').val() == 'PAQ1000MX' || $('#kit').val() == 'PAQ1001MX' || $('#kit').val() == 'PAQ1002MX' ||
             $('#kit').val() == 'PAQ1003MX' || $('#kit').val() == 'PAQ1004MX'){

                $('tr#codigoAutorizacion').show(200);

                $('#txtCodigo').val(ResArray[13]);

                $('#metodoEnvio').val(ResArray[14]);
                $("td#tdMetodoEnvio span").text($('#metodoEnvio option:selected').text());

                if($('#metodoEnvio').val() == 1){
                    $('tr#centroAutorizadoTr').show(200);
                    $('#centroAutorizado').val(ResArray[15]);
                    $("td#tdCentroAutorizado span").text($('#centroAutorizado option:selected').text());
                }else{
                    $('tr#paqueteriaTr').show(200);
                    $('#paqueteria').val(ResArray[15]);
                    $("td#tdPaqueteria span").text($('#paqueteria option:selected').text());
                }

                $('#metodoPago').val(ResArray[16]);
                $("td#tdMetodoPago span").text($('#metodoPago option:selected').text());
                                
            }else{

                $('#metodoEnvio').val(ResArray[13]);
                $("td#tdMetodoEnvio span").text($('#metodoEnvio option:selected').text());

                if($('#metodoEnvio').val() == 1){
                    $('tr#centroAutorizadoTr').show(200);
                    $('#centroAutorizado').val(ResArray[14]);
                    $("td#tdCentroAutorizado span").text($('#centroAutorizado option:selected').text());
                }else{
                    $('tr#paqueteriaTr').show(200);
                    $('#paqueteria').val(ResArray[14]);
                    $("td#tdPaqueteria span").text($('#paqueteria option:selected').text());
                }

                $('#metodoPago').val(ResArray[15]);
                $("td#tdMetodoPago span").text($('#metodoPago option:selected').text());
            }

        }
    }

    if(menu.checkRelativeRoot() == "suscriptores3.html"){
        if(localStorage.getItem('susc3Local')){
            //Extraemos los datos almacenados y los convertimos en Array
            var extraer = localStorage.getItem('susc3Local');
            var ResArray = extraer.split('","');

            $('#pais').val(ResArray[0]);
            $('td#tdPais span').text($('#pais option:selected').text());

            $('#txtCalle').val(ResArray[1]);
            $('#txtNum').val(ResArray[2]);
            $('#txtColonia').val(ResArray[3]);
            $('#txtCiudad').val(ResArray[4]);

            $('#estado').val(ResArray[5]);
            $('td#tdEstado span').text($('#estado option:selected').text());

            $('#txtCP').val(ResArray[6]);

            if(ResArray[7] == 1){
                document.getElementById("cbMismaDir").checked = true;
            }
        }
    }

    if(menu.checkRelativeRoot() == "suscriptores4.html"){
        if(localStorage.getItem('susc4Local')){
            //Extraemos los datos almacenados y los convertimos en Array
            var extraer = localStorage.getItem('susc4Local');
            var ResArray = extraer.split('","');

            $('#txtAlias').val(ResArray[0]);
            $('#txtPassword').val(ResArray[1]);
        }
    }

    if(menu.checkRelativeRoot() == "suscriptores5.html"){
        if(localStorage.getItem("susc1Local") && localStorage.getItem('susc2Local') && localStorage.getItem('susc3Local')){
            //Extraemos los datos almacenados y los convertimos en Array
            var extraer1 = localStorage.getItem("susc2Local");
            var ResArray1 = extraer1.split('","');


            var extraer2 = localStorage.getItem('susc3Local');
            var ResArray2 = extraer2.split('","');

            var extraer3 = localStorage.getItem('susc1Local');
            var ResArray3 = extraer3.split('","');

            $('#lblNombre').text(ResArray1[2]+ ", " +ResArray1[3]+ " " +ResArray1[4]);
            $('#lblTelefono').text(ResArray1[10]);
            $('#lblEmail').text(ResArray1[11]);
            $('#lblCalle').text(ResArray2[1]+ " " +ResArray2[2]+ "-");
            $('#lblColonia').text(ResArray2[3]+ " " +ResArray2[4]);
            $('#estado').val(ResArray2[5]);
            $('#tdEstado span').text($('#estado option:selected').text());
            $('#lblCP').text(ResArray2[6]);
            $('#lblPatrocinador').text(ResArray3[1]+ ", " +ResArray3[2]);
            $('#lblColocacion').text(ResArray3[1]+ ", " +ResArray3[2]);
        }
    }


    //Termina Inscripciones
    //

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

        //Metodo de envío
        $('#metodo-envio').change(function() {
            var option = $(this).val();
            if (option == 2) {
                $('#trSucursal').hide(0);
                $('#trPaqueteria').show(300);
            }
            else if (option == 1){
                $('#trPaqueteria').hide(0);
                $('#trSucursal').show(300);
            }
        });

        

        $('.levantar-siguiente').click(function() {
            var formaPago = $('#forma-pago').val();
            if (formaPago == "0") {
                app.showNotificactionVBC("Seleccione una forma de pago y oprima siguiente");
            }
            else {
                //Guardar datos
                var datos = "";
                var metodoEnvio = $('#metodo-envio').val();
                var sucursal = $('#sucursal').val();
                var paqueteria = $('#paqueteria').val();
                datos = metodoEnvio + "\",\"";
                if (metodoEnvio == 2) {
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
        if(opcion == 'PAQ1000MX' || opcion == 'PAQ1001MX' || opcion == 'PAQ1002MX' || opcion == 'PAQ1003MX' || opcion == 'PAQ1004MX'){
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
        $(this).prop('Counter',0.0).animate({
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