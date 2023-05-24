<?php
include_once 'MetodosSQL.php';

class Entradas extends MetodosSQL{
    public function __construct()
    {
        parent::__construct('inventarios');
    }

    public function getTipoMovimiento(){
        $query = "SELECT * FROM tiposmov WHERE entradasalida = 'E';";
        return $this->select_query($query);
    }

    public function insertEntrada($fecha,$idMovimiento,$idusuario,$observaciones){
        $query = "INSERT INTO entrada (fecha, fechacaptura, idMovimiento, idusuario, observaciones) 
        VALUES (?,?,?,?,?);";
        $data = array($fecha,date("Y-m-d h:i:s"),$idMovimiento,$idusuario,$observaciones);
        return $this->insert_query($query, array($data));
    }

    public function insertEntradaDetalle($idEntrada, $idProducto, $cantidad, $precio){
        $query = "INSERT INTO entradadetalle (idEntrada, idProducto, cantidad, existencia, precio) 
        VALUES (?,?,?,0,?);";
        $data = array($idEntrada, $idProducto, $cantidad, $precio);
        $insercion = $this->insert_query($query, array($data));
        if($insercion > 0){
            $this->execute_stored_procedure('sp_actualizar_existencias_entrada', array($insercion ,$idProducto));
        }

        return $insercion;
    }

    public function consultarEntradaDetalle($idEntrada){
       /*  $query = "
                    SELECT producto.nombre, entradadetalle.cantidad, entradadetalle.precio FROM entradadetalle INNER JOIN producto ON entradadetalle.identrada = ?;";
 */
        $query = "SELECT producto.nombre, entradadetalle.cantidad, entradadetalle.precio FROM producto INNER JOIN entradadetalle ON producto.idproducto = entradadetalle.idproducto AND entradadetalle.identrada = ?;";
        $params = array($idEntrada);
        return $this->select_query($query, $params);
    }

    public function consultarEntrada(){
        $query = "SELECT e.identrada, e.fecha, e.fechacaptura, e.observaciones, t.nombre, u.usuario  FROM entrada AS e
        INNER JOIN tiposmov AS t 
        INNER JOIN usuario AS u ON e.idmovimiento = t.idtipo AND e.idusuario = u.idusuario;";
        return $this->select_query($query);
    }

    public function consultarEntradaPorId($idEntrada){
        $query = "SELECT e.identrada, e.fecha, e.fechacaptura, e.observaciones, t.nombre, u.usuario  FROM entrada AS e
        INNER JOIN tiposmov AS t 
        INNER JOIN usuario AS u ON e.idmovimiento = t.idtipo AND e.idusuario = u.idusuario
        WHERE e.identrada = ?;";
        $params = array($idEntrada);
        return $this->select_query($query, $params);
    }
    
    public function consultarEntradaDetallePorId($idEntrada){
        $query = "SELECT producto.nombre, entradadetalle.cantidad, entradadetalle.precio FROM producto 
        INNER JOIN entradadetalle ON producto.idproducto = entradadetalle.idproducto AND entradadetalle.identrada = ?;";
        $params = array($idEntrada);
        return $this->select_query($query, $params);
    }

}
