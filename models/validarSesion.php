<?php 
	include "conexion.php";

	if(isset($_POST)){
		$id_usuario = $_POST['id_usuario'];
		$con = mysqli_connect($host, $admin, $pass, $db);

		// OBTENER HORA DE CONEXION
		$hora_cn = "SELECT hora_conexion FROM conectados WHERE id_usuario='$id_usuario'";
		$consultar_cn = mysqli_query($con, $hora_cn);
		$hora_cn = mysqli_fetch_array($consultar_cn);

		foreach ($hora_cn as $valor) {
			$hora_cn = $valor;
		}

		$select = "SELECT * FROM conectados WHERE id_usuario='$id_usuario' AND hora_conexion != '$hora_cn'";
		$consulta = mysqli_query($con, $select);
		$row = mysqli_num_rows($consulta);

		if($row > 0){
			$delete = "DELETE FROM conectados WHERE id_usuario='$id_usuario' AND hora_conexion != '$hora_cn'";
			$consulta = mysqli_query($con, $delete);

			echo "sesion existente";
		}else{
			echo "ninguna sesion";
		}

	}

	
 ?>