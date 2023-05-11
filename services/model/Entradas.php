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
        //Query extra, tratando de meter un trigger sin trigger
        //$query2 = "SELECT SUM(entradadetalle.cantidad) - SUM(salidadetalle.cantidad) FROM entradadetalle INNER JOIN salidadetalle WHERE entradadetalle.idproducto=?;";
        /* $query2 = "SELECT 
        (SELECT SUM(cantidad) FROM entradadetalle WHERE idproducto=?) - (SELECT SUM(cantidad) FROM salidadetalle WHERE idproducto=?) AS resultado;";
        return $this->select_query2($query2, array($idProducto, $idProducto)); */

            /* $query = "INSERT INTO entradadetalle (idEntrada, idProducto, cantidad, existencia, precio) 
            VALUES (?,?,?,0,?);";
            $data = array($idEntrada, $idProducto, $cantidad, $precio);
            $this->insert_query($query, array($data));
            return $existencia;
 */
        $query1 = "SELECT SUM(cantidad) AS existencia FROM entradadetalle WHERE idproducto=?;";
        $existenciaentrada = $this->select_query($query1, array($idProducto));
        $existenciaentrada = $existenciaentrada[0]['existencia'];

        $query3 = "SELECT SUM(cantidad) AS existencia FROM salidadetalle WHERE idproducto=?;";
        $existenciasalida = $this->select_query($query3, array($idProducto));
        $existenciasalida = $existenciasalida[0]['existencia'];

        if($existenciasalida == null){
            $existencia = (int)$existenciaentrada;
        }else{
            $existencia = (int)$existenciaentrada - (int)$existenciasalida;
        }
        


        //ESto esta bien lo demas es experimento
        $query = "INSERT INTO entradadetalle (idEntrada, idProducto, cantidad, existencia, precio) 
        VALUES (?,?,?,".$existencia.",?);";
        $data = array($idEntrada, $idProducto, $cantidad, $precio);
        $insercion = $this->insert_query($query, array($data));

        $query1 = "SELECT SUM(cantidad) AS existencia FROM entradadetalle WHERE idproducto=?;";
        $existenciaentrada = $this->select_query($query1, array($idProducto));
        $existenciaentrada = $existenciaentrada[0]['existencia'];

        $query3 = "SELECT SUM(cantidad) AS existencia FROM salidadetalle WHERE idproducto=?;";
        $existenciasalida = $this->select_query($query3, array($idProducto));
        $existenciasalida = $existenciasalida[0]['existencia'];

        if($existenciasalida == null){
            $existencia = (int)$existenciaentrada;
        }else{
            $existencia = (int)$existenciaentrada - (int)$existenciasalida;
        }
        
        $query2 = "UPDATE entradadetalle SET existencia = ".$existencia." WHERE identrada = ? AND idproducto = ?;";
        $data2 = array($idEntrada, $idProducto);
        $this->insert_query($query2, array($data2));
        

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
