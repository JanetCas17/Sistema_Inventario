<?php
include_once 'MetodosSQL.php';

class Productos extends MetodosSQL{
    public function __construct()
    {
        parent::__construct('inventarios');
    }

   
    public function agregar_productos ($nombre, $descripcion, $minimo, $maximo) {
        $query = "INSERT INTO producto (nombre, descripcion, stockminimo, stockmaximo) 
        VALUES (?, ?, ?, ?);";

        $data = array($nombre, $descripcion, $minimo, $maximo);

       return $this->insert_query($query,array( $data));

    }

    public function consultarProductos(){
        $query = "SELECT * FROM producto AS p;";
        return $this->select_query($query);
    }

    public function consultarProductosExistencia($idproducto){
        $query = "SELECT * FROM producto p INNER JOIN entradadetalle ep ON p.idproducto = ep.idproducto WHERE ep.existencia > 0 AND ep.iddetalle = (SELECT MAX(iddetalle) FROM entradadetalle WHERE idproducto = $idproducto);";
        return $this->select_query($query);
    }

    public function verProductos(){
        $query = "SELECT * FROM producto;";
        return $this->select_query($query);
    }

    public function verProductosExistencias(){
        $productos = $this->consultarProductos();

        $arrayP = array();

        foreach ($productos as $row){
            $productos2 = $this->consultarProductosExistencia($row["idproducto"]);
            foreach ($productos2 as $row){
                $arrayP[] = $row;
            }
        }
        return $arrayP;
    }
}