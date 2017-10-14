<?php
  include "index.html";
?>

<!-- MODAL DE SESION -->

<!-- INICIAR SESION -->
<div id="modal2" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">

			<!-- HEADER -->
			<div class="modal-header">
				<button type="button" ng-click="" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h2 class="modal-title form-signin-heading" id="myModalLabel">Iniciar sesion</h2>
			</div>

			<!-- FORMULARIO DE SESION -->
			<div class="modal-body">
<!-- 			<div id="mensaje">
			  
			</div> -->
				<form id="sesion" class="form-signin">
					<br/>
					<div class="form-group grupo-usuario">
						<div class="input-group">
							<div class="input-group-addon"> <span class="glyphicon glyphicon-user"></span></div>
							<label for="usuario" class="sr-only">Usuario</label>
							<input type="text" ng-model="usuario" class="form-control" id="usuarioSesion" placeholder="Usuario o correo electronico" maxlength="50" required autofocus>
						</div>
					</div>

					<div class="form-group grupo-pass">
						<div class="input-group">
							<div class="input-group-addon"> <span class="glyphicon glyphicon-lock"></span></div>
							<label for="pass" class="sr-only">Contraseña</label>
							<input type="password" ng-model="password" class="form-control" id="passSesion" placeholder="Contraseña" maxlength="50" required>
						</div>
					</div>
					<br/>
					<input type="submit" ng-click="iniciarSesion();" class="btn btn-lg btn-primary btn-block" value="Iniciar sesion" id="iniciarSesion">
					<div id="cargando">
						 
					</div>

					<!-- NOTIFICACION RESULTADO2 -->
					<div class="form-group">
						<div id="resultado2" >
							
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>