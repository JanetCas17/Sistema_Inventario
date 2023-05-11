<?php

class ConfigDB{
    private string $host;
    private string $user;
    private string $password;
    private string $db;
    private string $charset = 'utf8mb4';

    protected $pdo;


    public function __construct($db){
        $file = 'configuration.ini';
        if(!$file = parse_ini_file($file, TRUE)){
            echo "No se puede abrir el archivo '$file'.";
        } 

        $this->host = $file["database_inventarios"]["host"];
        $this->user = $file["database_inventarios"]["usuario"];
        $this->password = $file["database_inventarios"]["password"];
        $this->db = $db;
    }

    protected function Connection () {
        try {
            $cnx = "mysql:host=".$this->host.";dbname=".$this->db;
            $this->pdo = new PDO($cnx, $this->user, $this->password);
            return $this->pdo;
 
        } catch (PDOException $err) {
            print "Error DB!: " . $err->getMessage() . "<br/>";
            die();
        }
     }
 
     protected function Disconnect() {
         try {
             $this->pdo = null;
             return $this->pdo;
         } catch (PDOException $err){
             die();
         }
     }

}