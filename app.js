// Creación del módulo
var app = angular.module('app', ['ngRoute', 'ngCookies']);

// Configuración de las rutas
app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/index/index.html',
            controller  : 'indexCtrl'
        })
        .when('/about', {
            templateUrl : 'views/index/acerca.php',
            controller  : 'indexCtrl'
        })
        .when('/services', {
            templateUrl : 'views/index/services.php',
            controller  : 'indexCtrl'
        })
        .when('/team', {
            templateUrl : 'views/index/team.php',
            controller  : 'indexCtrl'
        })
        .when('/contact', {
            templateUrl : 'views/index/contacto.php',
            controller  : 'indexCtrl'
        })
        .when('/signup', {
            templateUrl : 'views/index/signup.php',
            controller  : 'signupCtrl'
        })
        .when('/login', {
            templateUrl : 'views/index/login.php',
            controller  : 'loginCtrl'
        })
        .when('/activate', {
            templateUrl : 'views/index/activate.html',
            controller  : 'activateCtrl'
        })
        .when('/onboarding', {
            templateUrl : 'views/index/onboarding.html',
            controller  : 'onboardingCtrl'
        })
        .when('/home', {
            templateUrl : 'views/home/home.html',
            controller  : 'homeCtrl'
        })
        .when('/perfil', {
            templateUrl : 'views/home/perfil.html',
            controller  : 'homeCtrl'
        })
        .when('/configuracion', {
            templateUrl : 'views/home/configuracion.html',
            controller  : 'homeCtrl'
        })
        .when('/ayuda', {
            templateUrl : 'views/home/ayuda.html',
            controller  : 'homeCtrl'
        })
        .when('/chat', {
            templateUrl : 'views/home/chat.php',
            controller  : 'homeCtrl'
        })

        .otherwise({
            redirectTo: '/'   //sirve para cuando se intente acceder a cualquier otra ruta no declarada.
                              // y se rediriga a la raiz
        });

});


// se crea un modulo llamado factories
app.factory("factories", function(){
    // se crea un objeto donde se almacenaran todos los factories
    var factories = {};

    factories.scrollUp = function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
    };

    factories.headerIndex = function(){
        $('#header').removeClass('hide');
        $('#header-home').addClass('hide');
    };

    factories.headerHome = function(){
        $('#header-home').removeClass('hide');
        $('#header').addClass('hide');
        $("html, body").scrollTop(0);
    };

    factories.ocultarHeaders = function(){
        $("#header").addClass('hide');
        $("#header-home").addClass('hide');
        $("html, body").scrollTop(0);
    };

    // cierra el modal con animacion de fade
    factories.cerrarModal = function(){
        $('#modal').modal('hide');
        $('#modal2').modal('hide');

        $(".modal-backdrop").remove();
        $("body").removeClass('modal-open');
    };

    factories.cerrarModalSinAnimacion = function(){

        // elimina el div con la clase .modal-backdrop
        $(".modal-backdrop").remove();

        // elimina el padding agregado al body
        $("body").css({paddingRight: ''});

        // elimina la clase modal-open del body
        $("body").removeClass('modal-open');
    };

    factories.cargarNProgress = function(){
        NProgress.start();
    };

    factories.ocultarNProgress = function(){
        setTimeout(function(){
            NProgress.done();
        },500);
    };

    return factories;

})

app.factory("auth", function($cookieStore){
    var auth = {};

    // valida la conexion
    auth.conexion = function(){
        var conexion = $cookieStore.get('_cnx');

        if(conexion){
            return conexion;
        }else{
            return null;
        }

    };

    // conecta al usuario
    auth.conectarUser = function(){
        $cookieStore.put('_cnx',true);
    };

    // desconecta al usuario
    auth.desconectarUser = function(){
        $cookieStore.remove('_cnx');
        $cookieStore.remove('_dt');
    };

    // sube los datos del usuario
    auth.setDatosDeSesion = function(datos){
        $cookieStore.put('_dt', datos);
    };

    // obtine los datos del usuario
    auth.getDatosDeSesion = function(){
        var datos = $cookieStore.get('_dt');

        if(datos){
            return datos;
        }else{
            return null;
        }

    };

    return auth;

})

app.run(function(auth, $rootScope, $location, $cookieStore, factories){
    // angular.element(document).ready(function(){
    // });

    // // se inicia el nprogress
    // if (typeof NProgress != 'undefined') {
    //         factories.cargarNProgress();

    //     $(window).load(function () {  
    //         $("#preloader").fadeOut('slow');

    //         factories.ocultarNProgress();
    //     });
    // }

    // cuando el cambio de ruta empiece
    $rootScope.$on('$routeChangeStart',function(event, next, current){
 
        var conexion = auth.conexion();

        // validaciones en el index
        if(conexion == null){
            if(next.templateUrl == "views/home/home.html" || next.templateUrl == "views/home/perfil.html" || next.templateUrl == "views/home/configuracion.html" || next.templateUrl == "views/home/ayuda.html"){
                $location.path("/");
            }
        }

        if ($cookieStore.get('on') == null){
            if(next.templateUrl ==  "views/index/onboarding.html"){
                $location.path("/");
            }
        }

        if($cookieStore.get('c_act') == null){
            if(next.templateUrl == "views/index/activate.html"){
                $location.path("/");
            }
        }

        // validaciones adentro del home
        if(conexion == true && $cookieStore.get('on') == null){
            // si se ingresa a alguna de estas rutas estando conectado, se redirige a la home
            if(next.templateUrl == "views/index/index.html" || next.templateUrl == "views/index/contacto.php" || next.templateUrl == "views/index/acerca.php" || next.templateUrl == "views/index/services.php" || next.templateUrl == "views/index/team.php" || next.templateUrl == "views/index/signup.php" || next.templateUrl == "views/index/login.php" || next.templateUrl ==  "views/index/activate.html" || next.templateUrl ==  "views/index/onboarding.html"){//conact,team...
                $location.path("/home");
                // validar que sea redirigido a la pagina en la que esta el usuario
            }
        }

        // validaciones en onboarding
        if ($cookieStore.get('on') == true){
            if(next.templateUrl !=  "views/index/onboarding.html"){
                $location.path("/onboarding");
            }
        }

        // validaciones en activate
        if($cookieStore.get('c_act') == false){
            if(next.templateUrl != "views/index/activate.html"){
                $location.path("/activate");
            }
        }

    })
})




