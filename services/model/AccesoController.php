<?php
include_once 'MetodosSQL.php';

class AccesoController extends MetodosSQL{
    public function __construct()
    {
        parent::__construct('inventarios');
    }

   
    public function existing_user ($usuario, $contrasena) {
        $query = "
            SELECT U.idusuario, U.usuario, U.contrasena 
            FROM usuario U
            WHERE U.usuario = ? 
            AND U.contrasena = ? 
            AND U.activo = 1;
        ";

        $params = array($usuario, $contrasena);

        $data = $this->select_query($query, $params);

        if ( count($data) > 0 ) {
            return $data;
        } else {
            return 'Error: user not found.';
        }

    }
}