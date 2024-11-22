-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 21-11-2024 a las 04:03:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `DbClinica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `Nombres` varchar(70) NOT NULL,
  `PrimerApellido` varchar(70) NOT NULL,
  `SegundoApellido` varchar(70) NOT NULL,
  `TipoDocumento` enum('CC','TI','Pasaporte','CE') NOT NULL,
  `NumeroDocumento` varchar(30) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contrasenia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `Nombres`, `PrimerApellido`, `SegundoApellido`, `TipoDocumento`, `NumeroDocumento`, `Telefono`, `Correo`, `Contrasenia`) VALUES
(1, 'Luis', 'Pérez', 'Gómez', 'CC', '123456789', '3001234567', 'luis.perez@example.com', 'contrasenia1'),
(2, 'María', 'García', 'López', 'TI', '987654321', '3009876543', 'maria.garcia@example.com', 'contrasenia2'),
(3, 'Carlos', 'Rodríguez', 'Martínez', 'CC', '456789123', '3004567891', 'carlos.rodriguez@example.com', 'contrasenia3'),
(4, 'Ana', 'Hernández', 'Suárez', 'CE', '852963741', '3008529637', 'ana.hernandez@example.com', 'contrasenia4'),
(5, 'José', 'Torres', 'Ramírez', 'Pasaporte', '741258963', '3007412589', 'jose.torres@example.com', 'contrasenia5'),
(6, 'Laura', 'Moreno', 'Castro', 'CC', '369852147', '3003698521', 'laura.moreno@example.com', 'contrasenia6'),
(7, 'Diego', 'Vargas', 'Rojas', 'TI', '159753486', '3001597534', 'diego.vargas@example.com', 'contrasenia7'),
(8, 'Sandra', 'Jiménez', 'Ortiz', 'CE', '258963147', '3002589631', 'sandra.jimenez@example.com', 'contrasenia8'),
(9, 'Jorge', 'Cruz', 'Mejía', 'CC', '147852369', '3001478523', 'jorge.cruz@example.com', 'contrasenia9'),
(10, 'Paula', 'Salazar', 'Pineda', 'TI', '753951456', '3007539514', 'paula.salazar@example.com', 'contrasenia10');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NumeroDocumento` (`NumeroDocumento`),
  ADD UNIQUE KEY `Correo` (`Correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
