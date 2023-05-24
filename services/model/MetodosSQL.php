<?php
include_once 'config/configDB.php';

class MetodosSQL extends ConfigDB{
    public function __construct($db) {
        parent::__construct($db);
    }

    protected function select_query ($query, $params = []) {

        

        try {
            $data = array();

            $prepare_consult = $this->Connection()->prepare($query);

            if ($params) {
                $prepare_consult->execute($params);
            } else {
                $prepare_consult->execute();
            }

            if ($prepare_consult->rowCount()) {

                while ($row = $prepare_consult->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $row;
                }
            }

            $prepare_consult = null;
            $this->Disconnect();

            return $data;

        } catch (Error $err) {
            echo 'Error in the method select_query -> '.$err;
            print 'Error in the method select_query -> '.$err;
            return false;
        }

    }
    

    protected function insert_query ($query, $data) {

        try {
            $prepare_query = $this->Connection()->prepare($query);

            foreach ( $data as $row ) {
                $prepare_query->execute($row);
            }

            $id = $this->pdo->lastInsertId();
            error_log("the last insert id: ".$id);

            $prepare_query = null;
            $this->Disconnect();

            return $id;

        } catch (Error $err) {
            echo 'Error in the method insert_query' . $err;
            return false;
        }

    }

    protected function update_delete_query ($query, $data) {
        try {

            $prepare_query = $this->Connection()->prepare($query);

            foreach ($data as $row) {
                $prepare_query->execute($row);
            }

            $rowCount = $prepare_query->rowCount();

            $prepare_query = null;
            $this->Disconnect();

            return $rowCount;

        } catch (Error $err) {
            return false;
        }
    }

    protected function execute_stored_procedure($procedureName, $params = []) {
        try {
            $data = array();

            $query = "CALL " . $procedureName . "(";

            if (!empty($params)) {
                $placeholders = array();
                foreach ($params as $param) {
                    $placeholders[] = '?';
                }
                $query .= implode(',', $placeholders);
            }

            $query .= ")";

            $prepare_statement = $this->Connection()->prepare($query);

            if (!empty($params)) {
                $prepare_statement->execute($params);
            } else {
                $prepare_statement->execute();
            }

            if ($prepare_statement->rowCount()) {
                while ($row = $prepare_statement->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $row;
                }
            }

            $prepare_statement = null;
            $this->Disconnect();

            return $data;
        } catch (Error $err) {
            echo 'Error in the method execute_stored_procedure -> '.$err;
            return false;
        }
    }

}