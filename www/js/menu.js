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
            //si el resultado fuera mayor a 1, significa que continua navegando, por lo cual
            //no debe redireccionar
            if (fin == 1) {
                location.href=nameHref;
            }
        });
    }
    //
    //Termina volumen móvil


    //Carrito de compras
    //

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
        });
        //se eliminan caracteres sobrantes para tener mayor control del arreglo
        var str = $.space.var1;
        str = str.substring(1, str.length-2);
        str += "";
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
    });
    //
    //Termina Carrito de compras


/*
var listo = 0, cont = 0;
        while(listo == 0) {
            if (window.localStorage.getItem('datosCarrito' + cont)) {
                //se extraen los datos locales
                var extraer = localStorage.getItem('datosCarrito' + cont);
                //se convierte la cadena en array
                var resArray = extraer.split('","');
                //se recorre el array para posteriormente ser separado
                for(var i = 0; i < resArray.length; i++) {
                    console.log(resArray[i]);
                }
            } else {
                listo = 1;
            }
            cont += 1;
        }
        */



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
    $('#clear').html($('#clear').html().replace(/&nbsp;/gi,''));

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