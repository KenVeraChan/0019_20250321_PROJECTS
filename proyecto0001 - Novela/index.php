<?php
require "servidor.php";

try {
    $db = new Database();
    $conn = $db->connexion();

    $sql = file_get_contents("data/datos.sql");
    $conn->exec($sql);

    echo "Base de datos SQLite creada correctamente.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
