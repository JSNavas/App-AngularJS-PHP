
<!-- script para cambiar el hash de la url -->
<!-- <script>
  hash = "#/nada";
  window.location.hash = hash;

  alert("Valor del hash: " + window.location.hash);
  // $("body").remove('class="modal-backdrop fade in"');
  $('.close').attr('data-dismiss=', 'modal');
</script> -->

<?php
  include "index.html";
?>

<!-- <script src="scripts/scripts.js"></script> -->

<!-- MODAL DE REGISTRO -->

<!-- REGISTRATE -->
<div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      
      <!-- HEADER -->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h2 class="modal-title form-signin-heading" id="myModalLabel">Regístrate!</h2>
      </div>

      <!-- FORMULARIO DE REGISTRO -->
      <div class="modal-body">

        <form id="registro" class="form-signin" >
          <div id="mensaje">
            
          </div>
          
          <div class="form-group grupo-usuario">
          <div id="check-user"></div>

            <label for="usuario">Usuario <p class='as'>*</p></label>
            <div class="input-group">
              <div class="input-group-addon">@</div>
              <input  type="text" ng-model="usuario" id="usuario" class="form-control" placeholder="Nombre de usuario" minlength="4" maxlength="16" required autofocus>
            </div>
          </div>

          <div class="form-group grupo-email">
          <div id="check-email"></div>
          <!-- <a id="btnlogin" title="Inicia sesion"><span class='glyphicon glyphicon-menu-right' style='font-size:50px; cursor: pointer; position: absolute; left: 520px; top: 150px; color: #3C763D;'></span></a> -->

            <label for="email">E-mail <p class='as'>*</p></label>
            <input type="email" ng-model="email" id="email" class="form-control" placeholder="ejemplo@ejemplo.com" maxlength="50" required autofocus="">
          </div>

          <div class="form-group grupo-pass">
          <div id="check-pass"></div>

            <label for="pass">Contraseña <p class='as'>*</p></label>
            <input type="password" ng-model="password" id="pass" class="form-control" placeholder="Contraseña" maxlength="50" required>
          </div>
          <br/>
          <input type="submit" ng-click="registrar();" class="btn btn-lg btn-primary btn-block" value="Registrar" id="enviar">
          <div id="cargando">
             
          </div>
          <!-- NOTIFICACION RESULTADO -->
          <div class="form-group">
            <div id="resultado" >
              
            </div>
          </div>
        </form>
      </div>      
    </div>
  </div>
</div>
