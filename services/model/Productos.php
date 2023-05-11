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
        $query = "SELECT * FROM producto;";
        return $this->select_query($query);
    }

    public function consultarProductosExistencia(){
        $query = "SELECT * FROM producto p INNER JOIN entradadetalle e ON p.idproducto = e.idproducto AND e.existencia > 0 ;";
        //$query = "SELECT * FROM producto p INNER JOIN entradadetalle e ON p.idproducto = e.idproducto AND e.existencia > 0 ;";
        return $this->select_query($query);
    }

    public function verProductos(){
        $query = "SELECT * FROM producto;";
        return $this->select_query($query);
    }
}