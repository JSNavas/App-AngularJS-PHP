<?php

include "conexion.php";

$user = "@".$_POST['usuario'];

$con = mysqli_connect($host, $admin, $pass, $db);
$select = "SELECT * FROM registro WHERE user='$user'";
$consulta = mysqli_query($con,$select);
$validar = mysqli_num_rows($consulta);

if (isset($user)){
	if ($validar == true){
		echo "usuario existente";
	}else{
		echo "usuario disponible";
	}
}


?>