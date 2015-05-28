var menu = { 
    cargarMenu:function(){
        $('#menu').load("includeMenu.html");
    },
    welcome:function(){      
        $('#showMenu').trigger('click');
        window.location = "welcome.html";
    },
    carrito:function(){
        window.location = "carrito_compras_catalogo.html";
    },
    suscriptores:function(){
        $('#showMenu').trigger('click');
        window.location = "suscriptores.html";
    },
    volumen_movil:function(){
        $('#showMenu').trigger('click');
        window.location = "volumen_movil.html";
    },
    checkRelativeRoot: function(){
        var rutaAbsoluta = self.location.href;
        var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
        var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
        return rutaRelativa;       
    },
    compararRuta:function(){
        switch(menu.checkRelativeRoot()){
            case "welcome.html":
                $('#active-welcome').addClass('active');
                break;
            case "carrito_compras_catalogo.html":
                $('#active-carrito').addClass('active');
                break;
            case "carrito_compras_detalles.html":
                $('#active-carrito').addClass('active');
                break;
            case "carrito_compras.html":
                $('#active-carrito').addClass('active');
                break;
            case "suscriptores.html":
                $('#active-suscriptores').addClass('active');
                break;
            case "suscriptores2.html":
                $('#active-suscriptores').addClass('active');
                break;
            case "suscriptores3.html":
                $('#active-suscriptores').addClass('active');
                break;
            case "volumen_movil.html":
                $('#active-volumen-movil').addClass('active');
                break;
            case "volumen_movil_detalles.html":
                $('#active-volumen-movil').addClass('active');
                break;
        }
    }, cargarUsuario: function(){
        var usuario = localStorage.getItem('usernameLocal');
        $('#etiquetaUsuario').append(" " + usuario);
    }
};