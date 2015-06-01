function ValidaRfc(rfcStr) {
	var strCorrecta;
	strCorrecta = rfcStr;	
	if (rfcStr.length == 12){
	var valid = '^(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
	}else{
	var valid = '^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
	}
	var validRfc=new RegExp(valid);
	var matchArray=strCorrecta.match(validRfc);
	if (matchArray==null) {
		app.showNotificactionVBC('Su RFC es inválido, debe contener al menos 10 caracteres');

		return false;
	}
	else
	{

		return true;
	}
	
}

function ValidaCurp(curpStr) {
	var strCorrecta;
	strCorrecta = curpStr;	
	
	var valid = '[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$';
	
	var validCurp=new RegExp(valid);
	var matchArray=strCorrecta.match(validCurp);
	if (matchArray==null) {
		app.showNotificactionVBC('Su CURP es inválida, debe contener 18 caracteres');

		return false;
	}
	else
	{
		return true;
	}
	
}

function ValidaTelefono(telefonoStr){
	var strCorrecta;
	strCorrecta = telefonoStr;

	var valid = /^\d{10}$/;

	var validTelefono = new RegExp(valid);
	var matchArray = strCorrecta.match(validTelefono);
	if(matchArray == null){
		app.showNotificactionVBC("El número de teléfono debe contener 10 dífitos");
		//alert("mal");
		return false;
	}else{
		return true;
	}
}

function ValidaEmail(emailStr) {
	var strCorrecta;
	strCorrecta = emailStr;	
	
	var valid = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
	var validEmail=new RegExp(valid);
	var matchArray=strCorrecta.match(validEmail);
	if (matchArray==null) {
		app.showNotificactionVBC('Su Correo Electrónico es inválido, debe contener un @ y un punto');

		return false;
	}
	else
	{
		return true;
	}
	
}

function ValidaEmails(email2){
	var emailUno = $('#txtEmail').val();

	if(email2 != emailUno){
		//alert("no coinciden");
		app.showNotificactionVBC('Su Correo Electrónico no coincide con la confirmación');

		return false;
	}else{
		return true;
	}
}

function ValidaAlias(aliasStr){
	var strCorrecta;
	strCorrecta = aliasStr;

	var valid = "^[A-Za-z0-9]{0,10}$";
	var validAlias = new RegExp(valid);
	var matchArray = strCorrecta.match(validAlias);
	if(matchArray == null){
		app.showNotificactionVBC("Su Alias es muy largo o contiene caracteres no válidos");
		//alert("mal");
		return false;
	}else{
		return true;
	}
}

function ValidaContraseña(passwordStr){
	var strCorrecta;
	strCorrecta = passwordStr;

	var valid = "^[A-Za-z0-9]{8,12}$";
	var validPassword = new RegExp(valid);
	var matchArray = strCorrecta.match(validPassword);
	if(matchArray == null){
		app.showNotificactionVBC("La contraseña solo puede contener números y letras y no debe ser menor que 8 ni mayor que 12 caracteres");
		//	alert("mal");
		return false;
	}else{
		return true;
	}
}

function ValidaContraseña2(password2){
	var passwordUno = $('#txtPassword').val();

	if(password2 != passwordUno){
		//alert("no coinciden");
		app.showNotificactionVBC('Su Contraseña no coincide con la confirmación');

		return false;
	}else{
		return true;
	}
}

function ValidaCamposVacios(){
	var rfc = $('#txtRFC').val();
	var curp = $('#txtCURP').val();
	var nombre = $('#txtNombre').val();
	var apePat = $('#txtApePat').val();
	var apeMat = $('#txtApeMat').val();
	var dia = $('#dia').val();
	var mes = $('#mes').val();
	var ano = $('#ano').val();
	var lugarNacimiento = $('#txtLugarNacimiento').val();
	var telefono = $('#txtTelefono').val();
	var email = $('#txtEmail').val();
	var emailConfirm = $('#txtConfirmEmail').val();
	var codigo = $('#txtCodigo').val();
	var metodoEnvio = $('#metodoEnvio').val();
	var centroAutorizado = $('#centroAutorizado').val();

	if(nombre == "" || apePat == "" || apeMat == "" || dia == "dia" || mes == "mes" || ano == "ano" || 
		lugarNacimiento == "" || telefono == "" || metodoEnvio == "" || rfc == "" || curp == "" || email == "" || 
		emailConfirm == ""){
		//alert("Campos Vacíos");
		app.showNotificactionVBC('Campos Vacíos');
	}else{
		window.location.href = "suscriptores3.html";
	}
}

function ValidaCamposVacios2(){
	var calle = $('#txtCalle').val();
	var num = $('#txtNum').val();
	var colonia = $('#txtColonia').val();
	var ciudad = $('#txtCiudad').val();
	var cp = $('#txtCP').val();

	if(calle == "" || num == "" || colonia == "" || ciudad == "" || cp == ""){
		//alert("Campos Vacíos");
		app.showNotificactionVBC('Campos Vacíos');
	}else{
		window.location.href = "suscriptores4.html";
	}
}



function ValidaCamposVacios3(){
	var alias = $('#txtAlias').val();
	var password = $('#txtPassword').val();
	var passwordConfirm = $('#txtPasswordConfirm').val();

	if(alias == "" || password == "" || passwordConfirm == ""){
		//alert("Campos Vacíos");
		app.showNotificactionVBC('Campos Vacíos');
	}else{
		window.location.href = "suscriptores5.html";
	}
}