<?php

include "conexion.php";

$user = $_POST['usuario'];
$email = $_POST['email'];
$password = $_POST['pass'];

if (isset($user) || isset($email) || isset($password)){
	$user = "@".$_POST['usuario'];

	$con = mysqli_connect($host, $admin, $pass, $db);

	$select_user = "SELECT * FROM registro WHERE user='$user'";
	$select_email = "SELECT * FROM registro WHERE email='$email'";

	$consultar_user = mysqli_query($con,$select_user);
	$consultar_email = mysqli_query($con,$select_email);

	$validar_user = mysqli_num_rows($consultar_user);
	$validar_email = mysqli_num_rows($consultar_email);

	if ($validar_user == true){
		echo "usuario existente";
		exit();
	}else if($validar_email == true){
		echo "correo existente";
		exit();
	}else{
		$cifrado = md5($email);
		$codigo = crypt($cifrado, rand());

		$insertar = "INSERT INTO registro(user, email, password, cod_reg) VALUES ('$user','$email','$password','$codigo')";
		$ejecutar = mysqli_query($con,$insertar);

		if($ejecutar){
			echo "registrado";
		}
		else{
			echo "error";
		}
	}
}


?>