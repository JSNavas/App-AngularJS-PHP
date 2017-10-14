<?php 

include "conexion.php";

$email = $_POST['email'];

$con = mysqli_connect($host, $admin, $pass, $db);
$select = "SELECT * FROM registro WHERE email='$email'";
$consulta = mysqli_query($con,$select);
$validar = mysqli_num_rows($consulta);

if (isset($email)){
	if ($validar == true){
		echo "email existente";
	}else{
		echo "email disponible";
	}
}


?>