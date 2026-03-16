<?php
require "servidor.php";

$db = new Database();
$conn = $db->connexion();

$stmt = $conn->query("SELECT name FROM sqlite_master WHERE type='table'");
$tablas = $stmt->fetchAll(PDO::FETCH_ASSOC);

var_dump($tablas);
