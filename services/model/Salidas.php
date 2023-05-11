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
        }/*else{
            $existencia = (int)$existencia - (int)$cantidad;
            $query3 = "UPDATE entradadetalle SET entradadetalle.existencia = ? WHERE entradadetalle.idproducto = ?;";
            $params = array($existencia, $idProducto);
            $this->update_query($query3, array($params));

            $query = " INSERT INTO salidadetalle (idSalida, idProducto, cantidad, precio) 
            VALUES (?,?,?,?);";
            $data = array($idSalida, $idProducto, $cantidad, $costo);
            return $this->insert_query($query, array($data));
        } */

        $query = " INSERT INTO salidadetalle (idSalida, idProducto, cantidad, precio) 
        VALUES (?,?,?,?);";
        $data = array($idSalida, $idProducto, $cantidad, $costo);
        return $this->insert_query($query, array($data));

        /* 
        $query2 = "SELECT entradadetalle.existencia FROM entradadetalle WHERE entradadetalle.idproducto = ?;";
        $params = ($idProducto);
        $existencia = json_encode($this->select_query($query2, array($params)));
        //print('La existencia me consume'.$existencia[0]);
        if((int)$existencia < (int)$cantidad){
            return false;
        }else{
            $existencia = (int)$existencia - (int)$cantidad;
            $query3 = "UPDATE entradadetalle SET entradadetalle.existencia = ? WHERE entradadetalle.idproducto = ?;";
            $params = array($existencia, $idProducto);
            $this->update_query($query3, array($params));

            $query = " INSERT INTO salidadetalle (idSalida, idProducto, cantidad, precio) 
            VALUES (?,?,?,?);";
            $data = array($idSalida, $idProducto, $cantidad, json_encode($costo));
            return $this->insert_query($query, array($data));
            
        } */

       
    
    }

    public function consultarSalidaDetalle($idSalida){
        /*  $query = "
                     SELECT producto.nombre, entradadetalle.cantidad, entradadetalle.precio FROM entradadetalle INNER JOIN producto ON entradadetalle.identrada = ?;";
  */
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