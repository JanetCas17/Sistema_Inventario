<?php
include_once 'MetodosSQL.php';

class Salidas extends MetodosSQL{
    public function __construct()
    {
        parent::__construct('inventarios');
    }

    public function getTipoMovimientoSalida(){
        $query = "SELECT * FROM tiposmov WHERE entradasalida = 'S';";
        return $this->select_query($query);
    }
    public function insertSalida($fecha,$idusuarioasigna,$idMovimiento,$idusuarioregistra,$observaciones){
        $query = "INSERT INTO salida (fecha, fechacaptura,  idusuarioasigna, idMovimiento, idusuarioregistra, observaciones) 
        VALUES (?,?,?,?,?,?);";
        $data = array($fecha,date("Y-m-d h:i:s"),$idusuarioasigna,$idMovimiento,$idusuarioregistra,$observaciones);
        return $this->insert_query($query, array($data));
    }
    public function insertSalidaDetalle($idSalida, $idProducto, $cantidad){

        $query1 = "SELECT AVG(entradadetalle.precio) AS costo FROM entradadetalle WHERE entradadetalle.idproducto = ".$idProducto.";";
        $costo = $this->select_query($query1);
        $costo = $costo[0]['costo'];

        $query2 = "SELECT existencia FROM entradadetalle WHERE iddetalle = (SELECT MAX(iddetalle) FROM entradadetalle WHERE idproducto = ". $idProducto .");";
        $existencia = $this->select_query($query2);
        $existencia = $existencia[0]['existencia'];

        if((int)$existencia < (int)$cantidad){
            return 'No hay suficiente existencia, existencia actual: '.$existencia;
        }

        $query = " INSERT INTO salidadetalle (idSalida, idProducto, cantidad, precio) 
        VALUES (?,?,?,?);";
        $data = array($idSalida, $idProducto, $cantidad, $costo);
        $insercion = $this->insert_query($query, array($data));
        if($insercion > 0){
            $this->execute_stored_procedure('sp_actualizar_existencias_entrada', array($insercion ,$idProducto));
        }
        return $insercion;
    
    }

    public function consultarSalidaDetalle($idSalida){
         $query = "SELECT producto.nombre, salidadetalle.cantidad, salidadetalle.precio FROM producto INNER JOIN salidadetalle ON producto.idproducto = salidadetalle.idproducto AND salidadetalle.idsalida = ?;";
         $params = array($idSalida);
         return $this->select_query($query, $params);
     }
   
     public function consultarSalidas(){
         $query = "SELECT e.idsalida, e.fecha, e.fechacaptura, e.observaciones, t.nombre, u.usuario  FROM salida AS e
        INNER JOIN tiposmov AS t 
        INNER JOIN usuario AS u ON e.idmovimiento = t.idtipo AND e.idusuarioregistra = u.idusuario;";
         return $this->select_query($query);
     }

     public function consultarSalidaDetallePorId($idSalida){
        $query = "SELECT salidadetalle.idsalida, salidadetalle.idproducto, salidadetalle.cantidad, salidadetalle.precio, producto.nombre FROM salidadetalle INNER JOIN producto ON salidadetalle.idproducto = producto.idproducto WHERE salidadetalle.idsalida = ?;";
        $params = array($idSalida);
        return $this->select_query($query, $params);
     }

}