app.controller('appCtrl', function(auth, factories, $scope, $cookieStore, $location, $rootScope){
 
    var conexion = auth.conexion();
    var datosUser = auth.getDatosDeSesion();

    // se valida la conexion
    if(conexion == true){
        $scope.usrConectado = {id: datosUser.id, user: datosUser.user, email: datosUser.email, conectado: conexion};
        
        // se inicia el nprogress
        if (typeof NProgress != 'undefined') {
                $("#preloader").hide();
                factories.cargarNProgress();

            $(window).load(function () {  
                
                factories.ocultarNProgress();
            });
        }

        // // se inicia el nprogress
        // if (typeof NProgress != 'undefined') {
        //         $("#preloader").hide();
        //         factories.cargarNProgress();

        //     $(window).load(function () {  
        //         factories.ocultarNProgress();
        //     });
        // }

    }else{
        $scope.usrConectado = {id: "", user: "", email: "", conectado: conexion};
        
        // se inicia el nprogress
        if (typeof NProgress != 'undefined') {
                factories.cargarNProgress();

            $(window).load(function () {  
                $("#preloader").fadeOut('slow');
                factories.ocultarNProgress();
            });
        }
    }

    $scope.cerrarSesion = function(){

        // se redirige al index
        $location.path('/');

        // oculta el nprogress si esta en curso
        NProgress.done();

        // se muestra el header
        factories.headerIndex();

        // se eliminan las variables de las cookies
        auth.desconectarUser();

        $.ajax({
            url: "models/desconectar.php",
            type: "POST",
            data: {id_usuario: $scope.usrConectado.id}
        })

        var conexion = auth.conexion();
        if(conexion == null){
            // se resetea el objeto
            $scope.usrConectado = {id: "", user: "", email: "", conectado: conexion};



        }else{
            alert("¡No hemos podido cerrar su sesion! Inténtelo de nuevo en otro momento");
        }

        



    }
});