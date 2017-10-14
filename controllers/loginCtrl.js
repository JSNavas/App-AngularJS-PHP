app.controller('loginCtrl', function loginCtrl(auth, $scope, $location, $http, $cookieStore, factories){
    // se muestra el header del index
    factories.headerIndex();

    function subirDatosDeSesion(datos){

        // $.ajax({
        //     url:"models/validarSesion.php",
        //     type: "POST",
        //     data: {id_usuario: datos.id}
        // })
        // .done(function(datos){
        //     alert(datos);

        // });

        // almaceno los datos en las variables del controlador padre que es AppCtrl
        $scope.usrConectado.conectado = true;
        $scope.usrConectado.id = datos.id;
        $scope.usrConectado.user = datos.user;
        $scope.usrConectado.email = datos.email;

        // se suben la conexion y los datos de la sesion a las cookies
        auth.conectarUser();
        auth.setDatosDeSesion(datos);

        // se cierra el modal
        factories.cerrarModalSinAnimacion();
        $location.path("/home");
    }

    $scope.iniciarSesion = function(){

        var usuario_usuario = $scope.usuario;
        var pass_usuario = $scope.password;

        var usuario = $("#usuarioSesion").val().length;
        var pass = $("#passSesion").val().length;

        // INICIO DE SESION
        $(document).ready(function(){
            if(usuario == 0 || pass == 0){
                $("#resultado2").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' style='font-size:20px; top:4px;'></span> Los campos están vacíos!</div>");

                if (usuario == 0){
                    $(".grupo-usuario").addClass('has-warning');
                }

                if (pass == 0){
                    $(".grupo-pass").addClass('has-warning');
                }

            return false;
            }else{
                $http.post('models/sesion.php', {usuarioSesion:usuario_usuario,passSesion:pass_usuario})
                    .success(function(datos) {
                        if(datos == "datos invalidos" || datos == "no registrado"){
                            $("#resultado2").html('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-remove" style="font-size:20px; top:4px;"></span> El usuario o contraseña son incorrectos (Asegúrate de agregar el "@" antes de tu nombre de usuario)</div>');
                            $("#iniciarSesion").val("Iniciar sesion");

                        }else{
                            // $("#mensaje").html("<div class='alert alert-success' style='text-align: center;' role='alert'><span style='font-size:21px; top:4px; text-align: center;'></span>Iniciando sesion...</div>");
                            $("#iniciarSesion").val("Iniciando sesion...");
                            $("#cargando").html('<img src="img/loading.gif" style="width: 10%; background: transparent; bottom: 37px; left: 255px; position: relative;">');
                            subirDatosDeSesion(datos);
                            // se oculta el boton de cerrar modal
                            $(".close").addClass("hide");
                            $("#resultado2").html("");
                            $("#preloader").show();

                            if (typeof NProgress != 'undefined') {
                                    factories.cargarNProgress();

                                $("#home").ready(function () {  
                                    $("#preloader").fadeOut('slow');
                                    factories.ocultarNProgress();
                                });
                            }
                        }
                    })
                    .error(function(datos) {
                        console.log('Error: ' + datos);
                    });

            return false;
            }
        });
    };

    // sript para detectar cuando se esta escribiendo en el id del input usuario
    $("#usuarioSesion").keyup(function(){
        $(".grupo-usuario").removeClass('has-warning');
        $(".grupo-pass").removeClass('has-warning');
        $("#resultado2").html("");

    });

    // sript para detectar cuando se esta escribiendo en el id del input contraseña
    $("#passSesion").keyup(function(){
        $(".grupo-usuario").removeClass('has-warning');
        $(".grupo-pass").removeClass('has-warning');
        $("#resultado2").html("");

    });


    factories.cargarNProgress();

    // script para que el modal comience abierto
    $('#modal2').modal({
        show:true, backdrop: "static", keyboard: true
    });

    $(window).ready(function(){
        factories.ocultarNProgress();
    });

    // siempre que se cierre el modal se redirige a la raiz
    $('#modal2').on('hidden.bs.modal',function(){
        window.location.href = "#/";
    })

    $('#modal2').on('shown.bs.modal', function () {
      $('#usuarioSesion').focus();
    })

});