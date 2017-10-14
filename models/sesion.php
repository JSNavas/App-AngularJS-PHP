<?php 

include "conexion.php";

// $user = $_POST['usuarioSesion'];
// $password = $_POST['passSesion'];


// devuelve un arreglo con los datos enviado por post
$datos = json_decode(file_get_contents('php://input'), true);

// muestra todo los elemtos en el arreglo "$datos"
// foreach ($datos as $elementos) {
// 	echo $elementos."<br>";
// }

$user = $datos['usuarioSesion'];
$password = $datos['passSesion'];

$con = mysqli_connect($host, $admin, $pass, $db); 															// conexion mediante el servidor, el administrador, la contraseña y la base de datos
$select = "SELECT * FROM registro WHERE user='$user' OR email='$user' AND password='$password'"; 			// se selecciona los registros de la tabla
$consulta = mysqli_query($con,$select); 																	// consulta por medio de la conexion y la seleccion
$fila = mysqli_fetch_array($consulta); 																		// si consigue una fila
																											// $validar = mysqli_num_rows($consulta); retorna 1 si consigue una fila o 0 de lo contrario
if (isset($user) && isset($password)){ 																		// si la variable existe
	if ($fila > 0){ 																					// si se consigue una fila
		if ((strtolower($fila['user']) == strtolower($user) || strtolower($fila['email']) == strtolower($user)) && $fila['password'] == $password){ 	// si el usuario o email y correo estan en la base de datos
			
			$select = "INSERT INTO conectados(id_usuario) VALUES('$fila[id]')";
			$consulta = mysqli_query($con, $select);

			session_start();
			$_SESSION["id"] = $fila['id'];
			$_SESSION["user"] = $fila['user'];
			$_SESSION["email"] = $fila['email'];

			// se envia un objeto con los datos de la sesion CREAR ARRAY ASOCIATIVO
			echo json_encode($_SESSION);							

		}else{
			echo "datos invalidos";
		}
	}else{
		echo "no registrado";
	}
}


?>