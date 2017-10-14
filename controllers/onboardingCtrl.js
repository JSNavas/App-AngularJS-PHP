app.controller("onboardingCtrl", function onboardingCtrl(factories,$scope,$rootScope, $cookieStore,$location){
	// se oculta el header del index
	// factories.ocultarHeaders();

	$scope.saltarForm = function(){
		// se elimina la cookie onboarding
		$cookieStore.remove('on');

		// se redirigue a home
		$location.path("/home");
	}

});