/*
    Author: Rolando Caldas Sanchez
    Blog: http://rolandocaldas.com/
    Google+: https://plus.google.com/+RolandoCaldasSanchez
    Linkedin: http://www.linkedin.com/in/rolandocaldas
    Twitter: https://twitter.com/rolando_caldas

    This file is part of an article:
    http://rolandocaldas.com/html5/carga-asincrona-de-javascript 
*/
function addEvent(element, event, fn) {
    if (element.addEventListener) {
        element.addEventListener(event, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, fn);
    }
}

function loadScript(src, callback) {
    var s,
        r,
        t,
        scripts,
        write;
    if (Array.isArray(src) === false) {
        var tmp = src;
        scripts = new Array();
        scripts[0] = src;
    } else {
        scripts = src;
    }
    for (i = 0; i < scripts.length; i++) {
        write = scripts[i].split("/");
        document.getElementById('contenido').innerHTML = 'Cargando ... ' + write[(write.length - 1)] + ' ... ';
        
        r = false;
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = scripts[i];
        if (i == scripts.length - 1) {
            s.onload = s.onreadystatechange = function() {
                if (!r && (!this.readyState || this.readyState == 'complete')) {
                    r = true;
                    if (callback !== undefined) {
                        callback();
                    }

                }
            };
        }
        t = document.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(s, t);
    }
}
addEvent(window, 'load', function() {
    loadScript('lib/jquery/jquery-3.1.1.min.js', function() {
        loadScript('lib/nprogress/nprogress.js', function(){
            // se inicia el nprogress
            NProgress.start();

            loadScript('lib/bootstrap/js/bootstrap.min.js', function() {
                loadScript('lib/angularjs/angular-1.5.8/angular.min.js', function() {
                    loadScript(new Array('lib/angularjs/angular-1.5.8/angular-route.min.js', 'lib/angularjs/angular-1.5.8/angular-cookies.min.js'), function() {
                        
                        loadScript('app.js', function() {
                            loadScript(new Array('controllers/appCtrl.js', 'controllers/indexCtrl.js', 'controllers/loginCtrl.js', 'controllers/signupCtrl.js', 'controllers/activateCtrl.js', 'controllers/onboardingCtrl.js', 'controllers/homeCtrl.js', 'controllers/chatCtrl.js'), function() {
                               
                               loadScript(new Array('scripts/search.js', 'scripts/scroll.js'), function(){

                                    alert('cargo!');
                                    // se muestra la pagina cargada completamente
                                    $("#preloader").fadeOut('slow');
                                    NProgress.done(); 
                                    $("#page").show(); 
                               })



                            })
                        });

                    })
                });


            })

        })

    });
});
