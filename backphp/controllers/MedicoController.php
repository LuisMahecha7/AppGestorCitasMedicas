<?php

class MedicoController {
    private $pdo;

    public function __construct() {
        $this->pdo = new Conexion();
    }

    public function getAll() {
        try {
            $sql = $this->pdo->prepare("SELECT * FROM medicos");
            $sql->execute();
            $result = $sql->fetchAll(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($result);
        } catch (PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['mensaje' => 'Error al obtener los médicos: ' . $e->getMessage()]);
        }
    }

    public function getById($id) {
        try {
            $sql = $this->pdo->prepare("SELECT * FROM medicos WHERE id = :id");
            $sql->bindValue(':id', $id, PDO::PARAM_INT);
            $sql->execute();
            $result = $sql->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                header("HTTP/1.1 200 OK");
                echo json_encode($result);
            } else {
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['mensaje' => 'Médico no encontrado.']);
            }
        } catch (PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['mensaje' => 'Error al obtener el médico: ' . $e->getMessage()]);
        }
    }

    public function create($params) {
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
            $requiredFields = ['nombres', 'primerApellido', 'segundoApellido', 'especialidad', 'celular', 'direccion', 'email', 'password'];
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
            $sql = "SELECT COUNT(*) FROM medicos WHERE email = :email";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':email', $params['email']);
            $stmt->execute();
            $emailCount = $stmt->fetchColumn();
            if ($emailCount > 0) {
                header('Content-Type: application/json');
                header('HTTP/1.1 400 Bad Request');
                echo json_encode([
                    'status' => 'email_exists',
                    'message' => 'El correo electrónico ya esta registrado, inicie sesión o ingrese otro correo.'
                ]);
                return;
            }
            // Insertar nuevo médico
            $sql = "INSERT INTO medicos (nombres, primerApellido, segundoApellido, especialidad, celular, direccion, email, password)
                    VALUES (:nombres, :primerApellido, :segundoApellido, :especialidad, :celular, :direccion, :email, :password)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':nombres', $params['nombres']);
            $stmt->bindValue(':primerApellido', $params['primerApellido']);
            $stmt->bindValue(':segundoApellido', $params['segundoApellido'] ?? null); // Opcional
            $stmt->bindValue(':especialidad', $params['especialidad']);
            $stmt->bindValue(':celular', $params['celular']);
            $stmt->bindValue(':direccion', $params['direccion']);
            $stmt->bindValue(':email', $params['email']);
            $stmt->bindValue(':password', password_hash($params['password'], PASSWORD_BCRYPT)); // Hasheo de contraseña
            $stmt->execute();
            // Respuesta exitosa
            header('Content-Type: application/json');
            header('HTTP/1.1 201 Created');
            echo json_encode([
                'status' => 'success',
                'message' => 'Médico registrado satisfactoriamente.',
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

    public function update($id, $params) {
        try {
            if (empty($params['nombres']) || empty($params['primerApellido']) ||
                empty($params['especialidad']) || empty($params['celular']) ||
                empty($params['direccion']) || empty($params['email'])) {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['mensaje' => 'Faltan datos obligatorios.']);
                return;
            }

            $sql = "UPDATE medicos 
                    SET nombres = :nombres, primerApellido = :primerApellido, segundoApellido = :segundoApellido,
                        especialidad = :especialidad, celular = :celular, direccion = :direccion, 
                        email = :email, password = :password
                    WHERE id = :id";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':nombres', $params['nombres']);
            $stmt->bindValue(':primerApellido', $params['primerApellido']);
            $stmt->bindValue(':segundoApellido', $params['segundoApellido'] ?? null);
            $stmt->bindValue(':especialidad', $params['especialidad']);
            $stmt->bindValue(':celular', $params['celular']);
            $stmt->bindValue(':direccion', $params['direccion']);
            $stmt->bindValue(':email', $params['email']);
            $stmt->bindValue(':password', password_hash($params['password'], PASSWORD_BCRYPT));
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            header('HTTP/1.1 200 OK');
            echo json_encode(['mensaje' => 'Médico actualizado satisfactoriamente.']);
        } catch (PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['mensaje' => 'Error al actualizar el médico: ' . $e->getMessage()]);
        }
    }

    public function delete($id) {
        try {
            $sql = "DELETE FROM medicos WHERE id = :id";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                header('HTTP/1.1 200 OK');
                echo json_encode(['mensaje' => 'Médico eliminado satisfactoriamente.']);
            } else {
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['mensaje' => 'Médico no encontrado.']);
            }
        } catch (PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['mensaje' => 'Error al eliminar el médico: ' . $e->getMessage()]);
        }
    }
}
