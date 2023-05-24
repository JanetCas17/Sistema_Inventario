<?php

function cors() {
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
}

cors();


include_once 'model/AccesoController.php';
include_once 'model/Productos.php';
include_once 'model/Entradas.php';
include_once 'model/Salidas.php';
include_once 'model/Usuario.php';


$servicios_acceso = new AccesoController();
$servicios_productos = new Productos();
$servicios_entradas = new Entradas();
$servicios_salidas = new Salidas();
$servicios_usuario = new Usuario();


$servicesName = $_GET['servicesName']??'';

switch($servicesName){
    //Usuario:
    case 'existing_user':
        if ( isset($_GET['usuario'], $_GET['contrasena'] ) ){
            echo json_encode($servicios_acceso->existing_user($_GET['usuario'], $_GET['contrasena']));
        } else {
            echo 'Error: missing id.';
        }
        break;
    case 'consultarProductosExistencia':
        if ( isset($_GET['idProducto'])){
            echo json_encode($servicios_productos->consultarProductosExistencia($_GET['idProducto']));
        } else {
            echo 'Error: missing id.';
        }
        break;
    case 'getUser':
        echo json_encode($servicios_usuario->getUser());
        break;

    //Productos
    case 'agregar_productos':
        if ( isset($_POST['nombre'],$_POST['descripcion'],$_POST['minimo'],$_POST['maximo']) ){
            echo json_encode($servicios_productos->agregar_productos($_POST['nombre'],$_POST['descripcion'],$_POST['minimo'],$_POST['maximo']));
        } else {
            echo 'Error: missing id.';
        }
        break;    

    case 'consultarProductos':
        echo json_encode($servicios_productos->consultarProductos());
        break;
    case 'verProductosExistencias':
        echo json_encode($servicios_productos->verProductosExistencias());
        break;
    case 'verProductos':
        echo json_encode($servicios_productos->verProductos());
        break;
        
    //Movimientos
    case 'getTipoMovimiento':
        echo json_encode($servicios_entradas->getTipoMovimiento());
        break;
    case 'getTipoMovimientoSalida':
        echo json_encode($servicios_salidas->getTipoMovimientoSalida());
        break;
    
    
    //Entradas
    case 'insertEntrada':
        if ( isset($_POST['fecha'],$_POST['idMovimiento'],$_POST['idusuario'],$_POST['observaciones']) ){
            echo json_encode($servicios_entradas->insertEntrada($_POST['fecha'],$_POST['idMovimiento'],$_POST['idusuario'],$_POST['observaciones']));
        } else {
            echo 'Error: missing id.';
        }
        break;

    case 'consultarEntrada':
            echo json_encode($servicios_entradas->consultarEntrada());
        break;
    case 'insertEntradaDetalle':
        if ( isset($_POST['idEntrada'],$_POST['idProducto'],$_POST['cantidad'],$_POST['precio']) ){
            echo json_encode($servicios_entradas->insertEntradaDetalle($_POST['idEntrada'],$_POST['idProducto'],$_POST['cantidad'],$_POST['precio']));
        } else {
            echo 'Error: missing id.';
        }
        break;
    case 'consultarEntradaDetalle':
        if(isset($_GET['idEntrada'])){
            echo json_encode($servicios_entradas->consultarEntradaDetalle($_GET['idEntrada']));
        }
        else{
            echo 'Error: missing id.';
        }
        break;
    case 'consultarEntradaPorId':
        if(isset($_GET['idEntrada'])){
            echo json_encode($servicios_entradas->consultarEntradaPorId($_GET['idEntrada']));
        }
        else{
            echo 'Error: missing id.';
        }
        break;
    case 'consultarEntradaDetallePorId':
        if(isset($_GET['idEntrada'])){
            echo json_encode($servicios_entradas->consultarEntradaDetallePorId($_GET['idEntrada']));
        }
        else{
            echo 'Error: missing id.';
        }
        break;
    
    //Salidas
    case 'insertSalida':
        if ( isset($_POST['fecha'],$_POST['idusuarioasigna'],$_POST['idMovimiento'],$_POST['idusuarioregistra'],$_POST['observaciones']) ){
            echo json_encode($servicios_salidas->insertSalida($_POST['fecha'],$_POST['idusuarioasigna'],$_POST['idMovimiento'],$_POST['idusuarioregistra'],$_POST['observaciones']));
        } else {
            echo 'Error: missing id.';
        }
        break;
    

    case 'consultarSalidaDetalle':
        if(isset($_GET['idSalida'])){
            echo json_encode($servicios_salidas->consultarSalidaDetalle($_GET['idSalida']));
        }
        else{
            echo 'Error: missing id.';
        }
        break;
    case 'insertSalidaDetalle':
        if ( isset($_POST['idSalida'],$_POST['idProducto'],$_POST['cantidad']) ){
            echo json_encode($servicios_salidas->insertSalidaDetalle($_POST['idSalida'],$_POST['idProducto'],$_POST['cantidad']));
        } else {
            echo 'Error: missing id.';
        }
        break;
    case 'consultarSalidas':
        echo json_encode($servicios_salidas->consultarSalidas());
        break;
    case 'consultarSalidaDetallePorId':
        if(isset($_GET['idSalida'])){
            echo json_encode($servicios_salidas->consultarSalidaDetallePorId($_GET['idSalida']));
        }
        else{
            echo 'Error: missing id.';
        }
        break;
    

    
            
    default:
        echo 'Error: service not found.';
        break;
}
