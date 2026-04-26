<?php
require "../servidor.php";   //Se requiere el archivo servidor.php para poder usar la clase Database y establecer la conexión a la base de datos
$db = new Database();     //Se crea una instancia de la clase Database
$conn = $db->connexion(); //Se establece la conexión a la base de datos utilizando el método connexion() de la clase Database


$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //Se establece el modo de error de la conexión a la base de datos para que lance excepciones en caso de errores
$sql = "SELECT * FROM cronologia"; //Se define la consulta SQL para seleccionar todos los registros de la tabla "cronologia"
$stmt = $conn->prepare($sql); //Se prepara la consulta SQL utilizando el método prepare() de la conexión a la base de datos
$stmt->execute(); //Se ejecuta la consulta
$cronologia = $stmt->fetchAll(PDO::FETCH_ASSOC); //Se obtienen todos los resultados de la consulta y se almacenan en la variable $cronologia como un array asociativo
// Muy importante: indicar que la respuesta es JSON
header('Content-Type: application/json; charset=utf-8');
// Convertir el array PHP a JSON y enviarlo como respuesta al cliente no se puede poner nada debajo esta 
// línea porque el JSON se corrompe y no se puede leer correctamente en el cliente, por eso es importante que 
// no haya ningún echo ni ningún espacio en blanco después de esta línea
echo json_encode($cronologia);
?>