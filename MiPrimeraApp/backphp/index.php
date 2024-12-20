<?php
include('conexion.php');
require_once './helpers/cors.php';
require_once './controllers/PacienteController.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-APIKEY,Origin,X-Requested-With, Content-Type, Accept,Access-Control-Request-Method,Access-Request-Headers,Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('content-type: application/json; charset=utf-8');
    header('HTTP/1.1 200 OK');
    die();
}

$json = file_get_contents('php://input');
$params = json_decode($json, true);
$controller = new PacienteController();

try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                $controller->getPacienteById($_GET['id']);
            } else {
                $controller->getAllPacientes();
            }
            break;

        case 'POST':
            $controller->createPaciente($params);
            break;

        case 'PUT':
            if (isset($_GET['id'])) {
                $controller->updatePaciente($_GET['id'], $params);
            } else {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['mensaje' => 'ID requerido para actualizar el registro.']);
            }
            break;

        case 'DELETE':
            if (isset($_GET['id'])) {
                $controller->deletePaciente($_GET['id']);
            } else {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['mensaje' => 'ID requerido para eliminar el registro.']);
            }
            break;

        default:
            header('HTTP/1.1 405 Method Not Allowed');
            echo json_encode(['mensaje' => 'Método no permitido.']);
            break;
    }
} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['mensaje' => 'Error en el servidor: ' . $e->getMessage()]);
}
