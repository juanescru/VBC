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

function ValidaCamposVacios(){
	var nombre = $('#txtNombre').val();
	var apePat = $('#txtApePat').val();
	var apeMat = $('#txtApeMat').val();
	var dia = $('#dia').val();
	var mes = $('#mes').val();
	var ano = $('#ano').val();
	var lugarNacimiento = $('#txtLugarNacimiento').val();
	var telefono = $('#txtTelefono').val();
	var codigo = $('#txtCodigo').val();
	var metodoEnvio = $('#metodoEnvio').val();
	var centroAutorizado = $('#centroAutorizado').val();

	if(nombre == "" || apePat == "" || apeMat == "" || dia == "dia" || mes == "mes" || ano == "ano" || 
		lugarNacimiento == "" || telefono == "" || metodoEnvio == ""){
		alert("Campos Vacíos");
		//app.showNotificactionVBC('Campos Vacíos');
	}else{
		window.location.href = "suscriptores3.html";
	}
}