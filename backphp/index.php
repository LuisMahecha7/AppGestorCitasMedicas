<?php
include('./conexion.php');
require_once './controllers/PacienteController.php';
require_once './controllers/MedicoController.php';

// Configuración global de CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-APIKEY,Origin,X-Requested-With, Content-Type, Accept,Access-Control-Request-Method,Access-Request-Headers,Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('content-type: application/json; charset=utf-8');

// Manejo de preflight para OPTIONS
$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$json = file_get_contents('php://input');
$params = json_decode($json, true);

// Verifica si el parámetro 'tipoUsuario' está presente
if ($method === 'GET') {
    // En una solicitud GET, verifica si el parámetro viene en la URL
    if (!isset($_GET['tipoUsuario'])) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['mensaje' => 'El parámetro "tipoUsuario" es obligatorio.']);
        exit;
    }
    $tipoUsuario = strtolower($_GET['tipoUsuario']);
} else {
    // En otras solicitudes, verifica si el parámetro está en el cuerpo de la solicitud
    if (!isset($params['tipoUsuario'])) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['mensaje' => 'El parámetro "tipoUsuario" es obligatorio.']);
        exit;
    }
    $tipoUsuario = strtolower($params['tipoUsuario']);
}

// Determinar el controlador basado en el tipo de usuario
if ($tipoUsuario === 'paciente') {
    $controller = new PacienteController();
} elseif ($tipoUsuario === 'medico') {
    $controller = new MedicoController();
} else {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['mensaje' => 'Tipo de usuario no válido.']);
    exit;
}

try {

    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                if ($tipoUsuario === 'paciente') {
                    $controller->getById($_GET['id']);
                } elseif ($tipoUsuario === 'medico') {
                    $controller->getById($_GET['id']);
                }
            } else {
                if ($tipoUsuario === 'paciente') {
                    $controller->getAll();
                } elseif ($tipoUsuario === 'medico') {
                    $controller->getAll();
                }
            }
            break;

        case 'POST':
            if (isset($params['accion']) && $params['accion'] === 'login') {
                $email = $params['email'] ?? null;
                $password = $params['password'] ?? null;

                $controller->login($email, $password);
            } else {
                $controller->create($params);
            }
            break;

        case 'PUT':
            if (isset($_GET['id'])) {
                $controller->update($_GET['id'], $params);
            } else {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['mensaje' => 'ID requerido para actualizar el registro.']);
            }
            break;

        case 'DELETE':
            if (isset($_GET['id'])) {
                $controller->delete($_GET['id']);
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
