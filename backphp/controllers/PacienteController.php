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
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['mensaje' => 'El cuerpo de la solicitud contiene JSON inválido.']);
                    return;
                }
            }
    
            // Validar campos obligatorios
            $requiredFields = ['Nombres', 'PrimerApellido', 'TipoDocumento', 'NumeroDocumento', 'Telefono', 'Correo', 'Contrasenia'];
            foreach ($requiredFields as $field) {
                if (!isset($params[$field]) || trim($params[$field]) === '') {
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['mensaje' => "El campo $field es obligatorio y no puede estar vacío."]);
                    return;
                }
            }
    
            // Insertar nuevo paciente
            $sql = "INSERT INTO pacientes (Nombres, PrimerApellido, SegundoApellido, TipoDocumento, NumeroDocumento, Telefono, Correo, Contrasenia) 
                    VALUES (:Nombres, :PrimerApellido, :SegundoApellido, :TipoDocumento, :NumeroDocumento, :Telefono, :Correo, :Contrasenia)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':Nombres', $params['Nombres']);
            $stmt->bindValue(':PrimerApellido', $params['PrimerApellido']);
            $stmt->bindValue(':SegundoApellido', $params['SegundoApellido'] ?? null); // Opcional
            $stmt->bindValue(':TipoDocumento', $params['TipoDocumento']);
            $stmt->bindValue(':NumeroDocumento', $params['NumeroDocumento']);
            $stmt->bindValue(':Telefono', $params['Telefono']);
            $stmt->bindValue(':Correo', $params['Correo']);
            $stmt->bindValue(':Contrasenia', password_hash($params['Contrasenia'], PASSWORD_BCRYPT)); // Hasheo de contraseña
            $stmt->execute();
    
            // Respuesta exitosa
            header('HTTP/1.1 201 Created');
            echo json_encode(['mensaje' => 'Paciente creado satisfactoriamente.']);
        } catch (PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['mensaje' => 'Error en la base de datos: ' . $e->getMessage()]);
        } catch (Exception $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['mensaje' => 'Error inesperado: ' . $e->getMessage()]);
        }
    }
    
    

    public function updatePaciente($id, $params) {
        try {
            if (empty($params['Nombres']) || empty($params['PrimerApellido']) || 
                empty($params['TipoDocumento']) || empty($params['NumeroDocumento']) || 
                empty($params['Telefono']) || empty($params['Correo'])) {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['mensaje' => 'Faltan datos obligatorios.']);
                return;
            }

            $sql = "UPDATE pacientes 
                    SET Nombres = :Nombres, PrimerApellido = :PrimerApellido, SegundoApellido = :SegundoApellido, 
                        TipoDocumento = :TipoDocumento, NumeroDocumento = :NumeroDocumento, 
                        Telefono = :Telefono, Correo = :Correo, Contrasenia = :Contrasenia
                    WHERE id = :id";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':Nombres', $params['Nombres']);
            $stmt->bindValue(':PrimerApellido', $params['PrimerApellido']);
            $stmt->bindValue(':SegundoApellido', $params['SegundoApellido'] ?? null);
            $stmt->bindValue(':TipoDocumento', $params['TipoDocumento']);
            $stmt->bindValue(':NumeroDocumento', $params['NumeroDocumento']);
            $stmt->bindValue(':Telefono', $params['Telefono']);
            $stmt->bindValue(':Correo', $params['Correo']);
            $stmt->bindValue(':Contrasenia', password_hash($params['Contrasenia'], PASSWORD_BCRYPT));
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
