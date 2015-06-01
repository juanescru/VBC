function eliminarCredenciales() {

    var idUsuarioLocal = localStorage.getItem("idUsuarioLocal");
    var regIdLocal = localStorage.getItem("regIdLocal");

	
    $.ajax({
       dataType: "text json",
       type: "POST",
       url: "http://192.168.1.66:50223/WS_funciones.asmx/eliminarRegId",
       data: {"idUsuario": idUsuarioLocal, "regId": regIdLocal},
       error: function()
       {
         //
       },
       success: function(data){
            localStorage.removeItem("usernameLocal");
            localStorage.removeItem("passwordLocal");
            localStorage.removeItem("regIdLocal");
            localStorage.removeItem("idUsuarioLocal");            
            localStorage.removeItem("menuStatus");

            location.href = "login.html";            
       }
    }); //Termina envio por ajax

    
}