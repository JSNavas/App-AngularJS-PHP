app.controller("homeCtrl", function(factories, auth, $location, $scope, $cookieStore){

	var conexion = auth.conexion();

	if(conexion == true && $cookieStore.get('on') == null){
		factories.headerHome();
		factories.scrollUp();
	}

	
});
