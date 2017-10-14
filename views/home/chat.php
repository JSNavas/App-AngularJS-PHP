<style>
    #chat{
        background: #fff;
        margin-bottom: 15px;
        text-align: left;
        overflow: auto;
    }
</style>

<h1 align="center">Chat</h1>

<div class="col-sm-8 col-sm-offset-2 text-center" ng-controller="chatCtrl">
    <div class="form-group">
        <input type="text" placeholder="Buscar un contacto" class="form-control input-lg text-center">
    </div>

    <div id="chat">
    
    </div>

    <form class="form-horizontal">
        <div class="form-group">
            <div class="col-md-10">
                <input type="text" ng-model="mensaje" placeholder="Mensaje" class="form-control input-lg">
            </div>
            
            <div class="col-md-2">
                <button class="btn btn-primary btn-lg" id="enviar" ng-click="enviarMensaje()">Enviar</button>
            </div>
        </div>
    </form>

</div>

