app.controller('signupCtrl', function signupCtrl(factories, $scope,$rootScope, $location, $cookieStore){
	// se muestra el header del index
	factories.headerIndex();

	function subirDatosDeSesion(){
	    // se sube el status y el email de la sesion a las cookies
	    $cookieStore.put('_e', $scope.email);
	    $cookieStore.put('c_act', false);

	    // se cierra el modal y se redirige a #/activate
	    factories.cerrarModal();
	    $location.path("/activate");
	}

	$scope.registrar = function(){
		// REGISTRO
		$(document).ready(function(){
	      	// $("#resultado").removeClass("hide");

	      	var usuario_usuario = $scope.usuario;
	      	var email_usuario = $scope.email;
	      	var pass_usuario = $scope.password;

	      	var usuario = $("#usuario").val().length;
	      	var email = $("#email").val().length;
	      	var pass = $("#pass").val().length;

	      	function validarUsuario(usuario_usuario){
	        	var signos = /^([a-zA-Z0-9-_])+$/;
	        	return signos.test(usuario_usuario);
	      	}

	      	function validarEmail(email_usuario){
	        	var signos = /^([a-zA-Z0-9_.-])+\@((([a-zA-Z0-9-]+)\.)+([a-zA-Z0-9]{2,4}))+$/;
	        	return signos.test(email_usuario);
	      	}

	      	if(usuario == 0 || email == 0 || pass == 0){
	      		$("#resultado").removeClass('hide');
	        	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' style='font-size:20px; top:4px;'></span> Los campos no pueden estar vacíos!</div>");
	        
		        if (usuario == 0){
		          	$(".grupo-usuario").addClass('has-warning');

		        }if (email == 0){
		          	$(".grupo-email").addClass('has-warning');
		          	
		        }if (pass == 0){	
		          	$(".grupo-pass").addClass('has-warning');
		        }
	        return false;
	      	}else if(usuario < 4){
	      		$("#resultado").removeClass('hide');
	        	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-info-sign' style='font-size:20px; top:4px;'></span> El usuario debe contener al menos 4 carácteres</div>");
	        	return false;
	      	}else if(validarUsuario(usuario_usuario) == false){
	        	$("#resultado").removeClass('hide');
	        	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-ban-circle' style='font-size:20px; top:4px;'></span> Usuario inválido</div>");
	        	return false;
	      	}else if(validarEmail(email_usuario) == false){
	        	$("#resultado").removeClass('hide');
	        	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-ban-circle' style='font-size:20px; top:4px;'></span> Email inválido</div>");
	        	return false;
	      	}else if(pass < 6){
	      		$("#resultado").removeClass('hide');
	        	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-info-sign' style='font-size:20px; top:4px;'></span> La contraseña debe contener al menos 6 carácteres</div>");
	        	return false;
	      	}else{
		        $.ajax({
		          	url: "models/registro.php",
		          	data: {usuario:usuario_usuario, email:email_usuario, pass:pass_usuario},
		          	type: "POST",
		          	beforeSend: function(){

		          	},
		          	complete: function(datos){

		          	},
		          	success: function(datos){
		            	if(datos == "usuario existente"){
		              		$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-remove' style='font-size:20px; top:4px;'></span> El usuario ya se encuéntra registrado, utilice otro</div>");
		            	}else if(datos == "correo existente"){
		              		$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-remove' style='font-size:20px; top:4px;'></span> El email ya se encuéntra registrado, utilice otro</div>");
		            	}else{
			              	if(datos == "registrado"){
			              	// se rederidige en 3 segundos
			              	setTimeout(subirDatosDeSesion, 3000);	

		              		$("#enviar").attr("disabled", true);
		                	$("#usuario").val('');
		                	$("#email").val('');
		                	$("#pass").val('');
		                	$("#check-user").addClass("hide");
		                	$("#check-email").addClass("hide");
		                	$("#check-pass").addClass("hide");
		                	$("#usuario").attr("disabled",true);
		                	$("#email").attr("disabled",true);
		                	$("#pass").attr("disabled",true);

                	  		$("#resultado").addClass('hide');
                			$("#mensaje").html("<div class='alert alert-success' role='alert'><span class='glyphicon glyphicon-ok-circle' style='font-size:21px; top:4px;'></span> Se ha registrado exitosamente!! <br> Espere mientras creamos su cuenta...</div>");    		
                	  		$("#enviar").val("Registrando...");
                	  		$("#cargando").html('<img src="img/loading.gif" style="width: 10%; background: transparent; bottom: 37px; left: 255px; position: relative;">');
			                		
			              	}else{
			              		console.log("Error: " + datos);
			                 	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon warning-sign' style='font-size:20px; top:4px;'></span> Ha ocurrido un error al procesar su registro, inténtelo de nuevo en otro momento</div>");
			              	}               
		            	}    
		          	}
		        });

	        return false;

	      	}
	    });
	}

  	$("#usuario").keyup(function(){
	    // var usuario_usuario = $("#usuario").val().toLowerCase();
	    // var usuario = usuario_usuario.length;

	    var usuario_usuario = $scope.usuario;
	    var usuario = $("#usuario").val().length;

	    function validarUsuario(usuario_usuario){
	      	var signos = /^([a-zA-Z0-9-_])+$/;
	      	return signos.test(usuario_usuario);
	    }

	    // elimina la clase al volverse a iniciar el modal
	    $(".grupo-usuario").removeClass('has-warning');
	    $(".grupo-email").removeClass('has-warning');
	    $(".grupo-pass").removeClass('has-warning');

	    if(usuario == 0){
	    	$("#check-user").addClass("hide");
	    	$("#resultado").addClass("hide");
	    }
	    else if(usuario < 4){
	    	$("#check-user").addClass("hide");
	    	$("#resultado").removeClass("hide");
	      	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-info-sign' style='font-size:20px; top:4px;'></span> El usuario debe contener al menos 4 carácteress</div>");	      	
	      	return false;
	    }else if(validarUsuario(usuario_usuario) == false){
	    	$("#check-user").addClass("hide");
	    	$("#resultado").removeClass("hide");
	      	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-ban-circle' style='font-size:20px; top:4px;'></span> Usuario inválido</div>");	  	
	      	return false;
	    }else{
		    $.ajax({
		        url: "models/buscarUser.php",
		        data: {usuario:usuario_usuario},
		        type: "POST",
		        success: function(datos){
		          	if(datos == "usuario existente"){
		          		$("#check-user").addClass("hide");
		          		$("#resultado").removeClass("hide");
		          		$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-remove' style='font-size:20px; top:4px;'></span> El usuario ya se encuentra registrado, utilice otro</div>");
		          		
		          		return false;
		          	}else{
		          		$("#resultado").addClass("hide");
		          		$("#check-user").removeClass("hide");
		        		$("#check-user").html("<span class='glyphicon glyphicon-ok' style='font-size:20px; position: absolute; left: 460px; top: 50px; color: #3C763D;'></span>");    	
		            	return false;
		          	}
		        
		        },
		        error: function(datos){
		        	console.log('Error: ' + datos);
		        }

		    });

		} 

    });

    $("#email").keyup(function(){
      	var email_usuario = $scope.email;
      	var email = $("#email").val().length;

      	$(".grupo-usuario").removeClass('has-warning');
    	$(".grupo-email").removeClass('has-warning');
      	$(".grupo-pass").removeClass('has-warning');

      	function validarEmail(email_usuario){
        	var signos = /^([a-zA-Z0-9_.-])+\@((([a-zA-Z0-9-]+)\.)+([a-zA-Z0-9]{2,4}))+$/;
        	return signos.test(email_usuario);
      	}

      	if(email == 0){
      		$("#check-email").addClass('hide');
      		$("#resultado").addClass('hide');
      	}else{
	      	$.ajax({
	        	url: "models/buscarEmail.php",
	        	data: {email:email_usuario},
	        	type: "POST",
		        success: function(datos){
		          	if(datos == "email existente"){
		          		$("#check-email").addClass('hide');
		          		$("#resultado").removeClass("hide");
		            	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-remove' style='font-size:20px; top:4px;'></span> El email ya se encuentra registrado, utilice otro</div>");

		          	}else if(validarEmail(email_usuario) == false){
		          		$("#check-email").addClass("hide");
		            	$("#resultado").removeClass("hide");
		            	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-ban-circle' style='font-size:20px; top:4px;'></span> Email inválido</div>");
		            	
		          	}else{
		            	$("#resultado").addClass("hide");
		            	$("#check-email").removeClass("hide");
		            	$("#check-email").html("<span class='glyphicon glyphicon-ok' style='font-size:20px; position: absolute; left: 460px; top: 135px; color: #3C763D;'></span>");
		         	}
		          
		        }

	      	});
      	}

      	

    });

    $("#pass").keyup(function(){
      	var pass_usuario = $scope.password;
      	var pass = $("#pass").val().length;

      	$(".grupo-usuario").removeClass('has-warning');
      	$(".grupo-email").removeClass('has-warning');
      	$(".grupo-pass").removeClass('has-warning');

      	if(pass == 0){
      		$("#check-pass").addClass("hide");
      		$("#resultado").addClass("hide");
      	}else if(pass < 6){
      		$("#check-pass").addClass("hide");
        	$("#resultado").removeClass("hide");
        	$("#resultado").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-info-sign' style='font-size:20px; top:4px;'></span> La contraseña debe contener al menos 6 carácteres</div>");
        	return false;
      	}else{
      		$("#resultado").addClass("hide");
        	$("#check-pass").removeClass("hide");
        	$("#check-pass").html("<span class='glyphicon glyphicon-ok' style='font-size:20px; position: absolute; left: 460px; top: 220px; color: #3C763D;'></span>");
        	
      	}
      
    });


   	factories.cargarNProgress();

    // script para que el modal comience abierto
	$('#modal').modal({
	    show:true, backdrop: "static", keyboard: true

	});

	$(window).ready(function(){
	    factories.ocultarNProgress();
	});

	// siempre que se cierre el modal se redirige a la raiz
	$('#modal').on('hidden.bs.modal',function(){
	    window.location.href = "#/";
	});

	$('#modal').on('shown.bs.modal', function () { 
	  $('#usuario').focus();
	});
});