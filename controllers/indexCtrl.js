app.controller("indexCtrl", function(factories, auth){
	var conexion = auth.conexion();

	if(conexion == null){
		factories.headerIndex();
		factories.scrollUp();
	}

    // se cierra el modal en dado caso que este abierto y se llame al index
    factories.cerrarModalSinAnimacion();
});