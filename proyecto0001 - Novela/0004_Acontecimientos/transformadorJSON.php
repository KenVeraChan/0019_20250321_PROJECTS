<?php
require_once __DIR__ . "/../servidor.php";

header('Content-Type: application/json; charset=utf-8');

$db = new Database();
$conn = $db->connexion();

if (!($conn instanceof PDO)) {
    http_response_code(500);
    echo json_encode(["error" => $conn], JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

try {
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->query("SELECT * FROM cronologia");
    $cronologia = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($cronologia, JSON_INVALID_UTF8_SUBSTITUTE);
} catch (PDOException $e) {
    error_log("Error al leer cronologia.db: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "No se pudieron leer los acontecimientos."], JSON_INVALID_UTF8_SUBSTITUTE);
}
?>
