app.controller("chatCtrl", function($scope, $cookieStore, $http){
	$scope.mensajes = [];
	$scope.mensaje = "";

	var datos   = $cookieStore.get('_dt');
	var usuario = datos['user'];

	$(document).ready(function(){
		$.ajaxSetup({"cache": false});
		setInterval(function(){cargarMensajes();}, 500);  
	});

	function cargarMensajes(){
		$.ajax({
			url: "models/obtenerMensajes.php",
			type: "POST",
			data:{}
		}).done(function(datos){
			if(datos == "no hay mensajes"){
				$("#chat").html("No hay mensajes!!");
			}else{
				$("#chat").html(datos);
			}
			
		})

	}


	// metodo push para agregar al arreglo comentarios
	$scope.enviarMensaje = function(){	
		if($scope.mensaje == ""){
			alert("El campo de mensaje esta vacio!");
		}else{
			$.ajax({
				url: 'models/enviarMensaje.php',
				data: {mensaje: $scope.mensaje, usuario: usuario},
				type: "POST",
			}).done(function(datos){
				if (datos == "mensaje enviado") {
					console.log('mensaje enviado');
					$scope.mensajes.push($scope.mensaje);
					cargarMensajes();

				}else{
					alert("no se ha podido enviar el mensaje!");
				}
			})
			$scope.mensaje = "";
		}		
	}





	
});