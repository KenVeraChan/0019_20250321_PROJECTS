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
            $conn = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->username, $this->password);
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