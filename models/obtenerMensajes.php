<?php 

	include 'conexion.php';

	$con = mysqli_connect($host, $admin, $pass, $db);
	$select = "SELECT usuario, mensaje FROM chat ORDER BY id ASC";
	$consulta = mysqli_query($con, $select);
	$fila = mysqli_num_rows($consulta);

	if($fila > 0){
		while($datos = mysqli_fetch_array($consulta)){
			echo "<p><b>".$datos[0]."</b>: ".$datos[1]."</p>";
		}
		
	}else{
		echo "no hay mensajes";
	}


 ?>