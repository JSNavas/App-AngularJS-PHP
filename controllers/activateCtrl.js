
app.controller("activateCtrl", function activateCtrl(factories, auth, $http,$scope, $cookieStore,$location){
	// se oculta el header del index
	factories.ocultarHeaders();
	$("html, body").scrollTop(0);

	$scope.usrRegistrado = {email: $cookieStore.get('_e'), activo: $cookieStore.get('c_act')};

	function activarCuenta(datos){
		// se elimina las cookies de registro
	    $cookieStore.remove('_e');
	    $cookieStore.remove('c_act');
	    $scope.usrRegistrado = {email: "", activo: ""};

	    // se le asigna los valores a las variables del controlador padre "appCtrl"
	    $scope.usrConectado.conectado = true;
	    $scope.usrConectado.id = datos.id;
	    $scope.usrConectado.user = datos.user;
	    $scope.usrConectado.email = datos.email;

	    // se sube la cookie del onboarding
	    $cookieStore.put('on', true);

	    // se cargan los datos del usuario en las cookies despues de activar la cuenta
	    auth.conectarUser();
	    auth.setDatosDeSesion(datos);

	    // se muestra el mensaje y se redirige a onboarding
	    alert("Cuenta activada");
	    $location.path("/onboarding");
	}

	$scope.activar = function($location){
		var codigo = $scope.codigo;

		$http.post("models/activarCuenta.php", {codigo: codigo})
			.success(function(datos){
				if(datos == "codigo invalido" || datos == "campos vacios")
					alert(datos);
				else{
					activarCuenta(datos);
				}	
			}).error(function(datos){
				alert("Error: "+datos)
			})
		
	}

	$scope.reenviarCodigo = function(){
		alert("reenviarCodigo();");
	}
});