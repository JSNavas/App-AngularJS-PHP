<?php 
	include 'conexion.php';

	// se recibe el arreglo

	if(isset($_POST)){
		$usuario = $_POST['usuario'];
		$mensaje = $_POST['mensaje'];
		
		$con = mysqli_connect($host, $admin, $pass, $db);
		$insertar = "INSERT INTO chat(usuario, mensaje) VALUES ('$usuario', '$mensaje')";
		$consulta = mysqli_query($con, $insertar);

		if ($consulta){
			echo "mensaje enviado";
		}else{
			echo "no enviado";
		}
	}







 ?>