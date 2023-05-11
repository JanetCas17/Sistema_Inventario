<?php
include_once 'MetodosSQL.php';

class Usuario extends MetodosSQL{
    public function __construct()
    {
        parent::__construct('inventarios');
    }

   
    public function getUser() {
        $query = "
            SELECT * 
            FROM usuario 
        ";


        $data = $this->select_query($query);

        if ( count($data) > 0 ) {
            return $data;
        } else {
            return 'Error: user not found.';
        }

    }
}