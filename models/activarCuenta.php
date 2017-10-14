<?php  
	
	include 'conexion.php';

	$datos = json_decode(file_get_contents('php://input'), true);

	if($datos){
		$codigo = $datos['codigo'];

		$con = mysqli_connect($host, $admin, $pass, $db);
		$select = "SELECT * FROM registro WHERE cod_reg='$codigo'";
		$consulta = mysqli_query($con, $select);
		$fila = mysqli_fetch_array($consulta);

		if($fila > 0){
			// se actualiza el estado del registro
			$update = "UPDATE registro SET cod_reg='true' WHERE cod_reg='$codigo'";
			$consulta = mysqli_query($con,$update);
			if($consulta){
				session_start();
				$_SESSION["id"] = $fila['id'];
				$_SESSION["user"] = $fila['user'];
				$_SESSION["email"] = $fila['email'];

				// se envia un objeto con los datos de la sesion
				echo json_encode($_SESSION);
			}	
		}
		else{
			echo "codigo invalido";
		}
	}else {
		echo "campos vacios";
	}




?>