<?php

class PacienteController {
    private $pdo;

    public function __construct() {
        $this->pdo = new Conexion();
    }

    public function getAllPacientes() {
        try {
            $sql = $this->pdo->prepare("SELECT * FROM pacientes");
            $sql->execute();
            $result = $sql->fetchAll(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($result);
        } catch (PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['mensaje' => 'Error al obtener los pacientes: ' . $e->getMessage()]);
        }
    }

    public function getPacienteById($id) {
        try {
            $sql = $this->pdo->prepare("SELECT * FROM pacientes WHERE id = :id");
            $sql->bindValue(':id', $id, PDO::PARAM_INT);
            $sql->execute();
            $result = $sql->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                header("HTTP/1.1 200 OK");
                echo json_encode($result);
            } else {
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['mensaje' => 'Paciente no encontrado.']);
            }
        } catch (PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['mensaje' => 'Error al obtener el paciente: ' . $e->getMessage()]);
        }
    }

    public function createPaciente($params) {
        try {
            // Decodificar JSON si es necesario
            if (is_string($params)) {
                $params = json_decode($params, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    header('Content-Type: application/json');
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['status' => 'error',
                    'error_code' => 'invalid_json',
                    'mensaje' => 'El cuerpo de la solicitud contiene JSON inválido.'
                ]);
                return;
                }
            }
            // Validar campos obligatorios
            $requiredFields = ['nombres', 'primerApellido', 'tipoDocumento', 'numDocumento', 'celular', 'email', 'password'];
            foreach ($requiredFields as $field) {
                if (!isset($params[$field]) || trim($params[$field]) === '') {
                    header('Content-Type: application/json');
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['status' => 'error',
                    'error_code' => 'missing_field',
                    'mensaje' => "El campo $field es obligatorio y no puede estar vacío."
                ]);
                return;
                }
            }
            // Verificar si el correo ya existe en la base de datos
            $sql = "SELECT COUNT(*) FROM pacientes WHERE email = :email";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':email', $params['email']);
            $stmt->execute();
            $emailCount = $stmt->fetchColumn();
            if ($emailCount > 0) {
                // Si el correo ya existe
                header('Content-Type: application/json');
                header('HTTP/1.1 400 Bad Request');
                echo json_encode([
                    'status' => 'email_exists',
                    'message' => 'Correo electrónico registrado, inicie sesión o ingrese otro correo.'
                ]);
                return;
            }
            // Insertar nuevo paciente
            $sql = "INSERT INTO pacientes (nombres, primerApellido, segundoApellido, tipoDocumento, numDocumento, celular, email, password)
                    VALUES (:nombres, :primerApellido, :segundoApellido, :tipoDocumento, :numDocumento, :celular, :email, :password)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':nombres', $params['nombres']);
            $stmt->bindValue(':primerApellido', $params['primerApellido']);
            $stmt->bindValue(':segundoApellido', $params['segundoApellido'] ?? null); // Opcional
            $stmt->bindValue(':tipoDocumento', $params['tipoDocumento']);
            $stmt->bindValue(':numDocumento', $params['numDocumento']);
            $stmt->bindValue(':celular', $params['celular']);
            $stmt->bindValue(':email', $params['email']);
            $stmt->bindValue(':password', password_hash($params['password'], PASSWORD_BCRYPT)); // Hasheo de contraseña
            $stmt->execute();
            // Respuesta exitosa
            header('Content-Type: application/json');
            header('HTTP/1.1 201 Created');
            echo json_encode([
                'status' => 'success',
                'message' => 'Paciente Registrado satisfactoriamente.',
                'data' => [
                    'id' => $this->pdo->lastInsertId(),
                    'nombres' => $params['nombres'],
                    'email' => $params['email']
                ]
            ]);

        } catch (PDOException $e) {
            header('Content-Type: application/json');
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode([
                'status' => 'error',
                'error_code' => 'database_error',
                'mensaje' => 'Error en la base de datos: ' . $e->getMessage()
            ]);
        } catch (Exception $e) {
            header('Content-Type: application/json');
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode([
                'status' => 'error',
                'error_code' => 'unexpected_error',
                'mensaje' => 'Error inesperado: ' . $e->getMessage()
            ]);
        }
    }

    public function updatePaciente($id, $params) {
        try {
            if (empty($params['nombres']) || empty($params['primerApellido']) ||
                empty($params['tipoDocumento']) || empty($params['numDocumento']) ||
                empty($params['celular']) || empty($params['email'])) {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['mensaje' => 'Faltan datos obligatorios.']);
                return;
            }

            $sql = "UPDATE pacientes 
                    SET nombres = :nombres, primerApellido = :primerApellido, segundoApellido = :segundoApellido,
                        tipoDocumento = :tipoDocumento, numDocumento = :numDocumento,
                        celular = :celular, email = :email, password = :password
                    WHERE id = :id";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':nombres', $params['nombres']);
            $stmt->bindValue(':primerApellido', $params['primerApellido']);
            $stmt->bindValue(':segundoApellido', $params['segundoApellido'] ?? null);
            $stmt->bindValue(':tipoDocumento', $params['tipoDocumento']);
            $stmt->bindValue(':numDocumento', $params['numDocumento']);
            $stmt->bindValue(':celular', $params['celular']);
            $stmt->bindValue(':email', $params['email']);
            $stmt->bindValue(':password', password_hash($params['password'], PASSWORD_BCRYPT));
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            header('HTTP/1.1 200 OK');
            echo json_encode(['mensaje' => 'Paciente actualizado satisfactoriamente.']);
        } catch (PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['mensaje' => 'Error al actualizar el paciente: ' . $e->getMessage()]);
        }
    }

    public function deletePaciente($id) {
        try {
            $sql = "DELETE FROM pacientes WHERE id = :id";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                header('HTTP/1.1 200 OK');
                echo json_encode(['mensaje' => 'Paciente eliminado satisfactoriamente.']);
            } else {
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['mensaje' => 'Paciente no encontrado.']);
            }
        } catch (PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['mensaje' => 'Error al eliminar el paciente: ' . $e->getMessage()]);
        }
    }
}
