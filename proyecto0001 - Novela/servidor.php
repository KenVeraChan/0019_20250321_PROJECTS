<?php
//Se comienza con la creación de una clase generica para tramitar todos los datos
class Database{
    private $host = "db";  //nombre del host de la base de datos, en este caso es "db" porque es el nombre del servicio en docker-compose
    private $username = "root";  //usuario de la base de datos
    private $password = "root";  //contraseña de la base de datos
    private $dbname = "HISTORIA";  //nombre de la base de datos

    public function connexion()
    {
        try {
            $dbPath = __DIR__ . "/data/cronologia.db";    //Ahora no se usa mysql sino sqlite, por lo que se define la ruta del archivo de la base de datos sqlite
            $dsn = "sqlite:" . $dbPath;                   //Se define el DSN para sqlite, que es diferente al de mysql
            $conn = new PDO($dsn, $this->username, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch(PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
            return "El error que hubo en la conexion fue: " . $e->getMessage();
        }
    }
    public function getHost(){
        return $this->host;
    }
    public function getUsername(){
        return $this->username;
    }
    public function getPassword(){
        return $this->password;
}   
    public function getDbname(){
        return $this->dbname;
    }
    public function setHost($host){
        $this->host = $host;
    }
    public function setUsername($username){
        $this->username = $username;        
    }
    public function setPassword($password){
        $this->password = $password;
    }
    public function setDbname($dbname){
        $this->dbname = $dbname;
    }
}       