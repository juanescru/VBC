$(function(){
    //Pulsación de tecla enter
    //
    $(document).keypress(function(e) {
        if (e.which == 13) {
            if (usernameFocus==1) {
                $('#password').focus();
                $('#password').trigger('click');
                cordova.plugins.Keyboard.show();
            }
            else if (passwordFocus==1) {
                $('#saveSettings').focus();
                $('#saveSettings').trigger('click');
            }
        }
    });

    //Comprueba si hay variables locales definidas
    //
    if (window.localStorage.getItem('usernameLocal') && window.localStorage.getItem('passwordLocal') 
        && window.localStorage.getItem('regIdLocal')) {
        //Si existen los datos del usuario almacenados localmente redirecciona a la página de inicio 
        window.setTimeout(function(){ window.location ="welcome.html";},1750);
    }

    //Proceso de logueo remoto
    //
    $("#saveSettings").click(function(){
        if (document.getElementById('regId').value != "") {
            if (document.getElementById('username').value != "" && document.getElementById('password').value != "") {
                //Extrae Id del usuario
                //
                $.getJSON("http://192.168.1.66:50223/WS_funciones.asmx/obtenerUsuario?user=" + document.getElementById('username').value,function(datos) {
                    //variables extraidas del formulario
                    var username = document.getElementById('username').value;
                    var password = md5(document.getElementById('password').value);
                    var regId = document.getElementById('regId').value;
                    //variables extraidas del servidor
                    var idRemoto = 0;
                    var nameRemoto;
                    var passwordRemoto;
                    var idUsuario;
                    //variables otras
                    var url = "http://192.168.1.66:50223/WS_funciones.asmx/registrarRegId"; // El script a dónde se realizará la petición.
                    var acceso = false;
                    //Inicia recorrido del JSON
                    //
                    $.each(datos, function(i, item) {
                        if (item.Name == username) {
                            //Si encontró algun usuario, los carga en las variables
                            //para ser enviadas al servidor posteriormente
                            //
                            document.getElementById('idUsuario').value = item.IdUsuario;
                            nameRemoto = item.Name;
                            passwordRemoto = item.Password;
                            acceso = true;
                            return false;
                        }
                    });
                    //En caso de que el usuario ingresado existe se procede a la validación de credenciales
                    //
                    if (acceso) {
                        //En caso de que las credenciales sean correctas
                        //se procede al registro del regId
                        //
                        
                        if (username == nameRemoto && password == passwordRemoto) {
                            //Envía formulario Vía Ajax en forma serializada
                            $.ajax({
                               type: "POST",
                               url: url,
                               data: $("#formulario").serialize(),
                               success: function(data)
                               {
                                   //Si el servidor responde con Successful  1, inició mas de una vez
                                   //Si el servidor responde con Successful 11, inició por primera vez
                                   // 
                                   if (data == 1 || data == 11) {
                                        //Guarda credenciales segun elección del usuario
                                        //
                                        app.showNotificactionVBC("Iniciaste sesión con éxito y apartir de este momento recibirás nuestras Notificaciones");

                                        if (document.getElementById("save").checked) {    
                                            localStorage.setItem("usernameLocal", username);
                                            localStorage.setItem("passwordLocal", password);
                                            localStorage.setItem("regIdLocal", regId);
                                            localStorage.setItem("idUsuarioLocal", document.getElementById('idUsuario').value);
                                        }
                                        location.href="welcome.html";
                                   } else {
                                        app.showNotificactionVBC('Error en el inicio de sesión, intenta de nuevo');
                                   }
                               }
                            }); //Termina envio por ajax
                        } else {
                            app.showNotificactionVBC('Su contraseña no coincide con el Usuario');
                            //alert('Tus datos de acceso no coindicen con la base de datos');
                        }
                    } else {
                        app.showNotificactionVBC('Usuario desconocido');
                        //alert('El usuario ingresado no existe en la base de datos');
                    }
                }); //Termina getJson
            } else {
                app.showNotificactionVBC('Debes llenar los campos Usuario y Contraseña');
                //alert('Debes llenar los campos Usuario y Contraseña');
            }
        } else {
            app.showNotificactionVBC('Esperando regId de su dispositivo para que pueda recibir Notificaciones VBC')
            //alert('Esperando regId');
        }
    });
});