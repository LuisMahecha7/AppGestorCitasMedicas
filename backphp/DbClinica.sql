-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-11-2024 a las 16:00:38
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
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `primerApellido` varchar(100) NOT NULL,
  `segundoApellido` varchar(100) NOT NULL,
  `especialidad` enum('cardiologia','nefrologia','endocrinologia','gastroenterologia','hematologia','pulmonologia','reumatologia','neonatologia','pediatria_general','ginecologia','obstetricia','cirugia_general','cirugia_vascular','cirugia_toracica','neurocirugia','ortopedia','urologia','otorrinolaringologia','oftalmologia','plastica','anestesiologia','radiologia','patologia','psiquiatria','neurologia','dermatologia','medicina_familiar','medicina_del_trabajo') NOT NULL,
  `celular` varchar(50) NOT NULL,
  `direccion` varchar(80) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nombres` varchar(70) NOT NULL,
  `primerApellido` varchar(70) NOT NULL,
  `segundoApellido` varchar(70) NOT NULL,
  `tipoDocumento` enum('Tarjeta de Identidad','Cedula de Ciudadania','Pasaporte','Cedula de Extranjeria','Permiso Especial de Permanencia','Carnet Diplomatico') NOT NULL,
  `numDocumento` varchar(30) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `nombres`, `primerApellido`, `segundoApellido`, `tipoDocumento`, `numDocumento`, `celular`, `email`, `password`) VALUES
(44, 'Sofia', 'Marin', 'Lopez', 'Cedula de Ciudadania', '4354535', '3118904567', 'sofia@gmail.com', '$2y$10$OkkeVap2xCFYvjozsOVFy.4dRd1iZL81/XBn3HOnz9hTvW1WrG8h6'),
(45, 'Julietha', 'Maria', 'Orduz', 'Cedula de Ciudadania', '4354535', '3118904567', 'Julietha@gmail.com', '$2y$10$prwRCsr4nS0PLkXMGFRMkOwePul4pyrDJLDxdC5MICkVDz7dTy876'),
(46, 'Ximena', 'Solorzano', 'Maritnez', 'Cedula de Ciudadania', '10456743456', '3124345677', 'ximenasolorza@gmail.com', '$2y$10$AmZNgDlpkub1UWdzT1Y6Auuzpqzq3wwstfPMLHUsQfOKelFpOhtei'),
(47, 'clara Marcela', 'lordes', 'maria', 'Cedula de Extranjeria', '10435434', '3243423411', 'calramarce@hotmail.com', '$2y$10$bKLCJ41SRRB3QsNTvFVUFuN7NCEdITa/V1ooKhvzKUmjui758zmkK'),
(48, 'Laura Marcela', 'JImenez', 'Arango', 'Tarjeta de Identidad', '10567899', '3119078654', 'lauramarce@hotmail.com', '$2y$10$mfnF2EhPGjwTlPwpnYatUuCTg6q0/e3I3e7SnTe1YYFCBUN/C4Wb.'),
(49, 'Monica Daniela', 'Salazar', 'Salazar', 'Pasaporte', '34534534', '3124567890', 'salazarmonica@gmail.com', '$2y$10$BWFRZXRx65NTTrh6doqOWOWVs6wRZe95f/NHj.IffhWesQSVqJzZq'),
(50, 'Julian Daniel', 'Niño', 'Telles', 'Permiso Especial de Permanencia', '89787435435', '3107894523', 'julisanino@gmail.com', '$2y$10$gnYou1VrWgRK.Bi/Ks8U7eBkzqzLcJVvhyELqnVTqCHzQ4vnMFcl2'),
(51, 'Cesar Davi', 'Suarez', 'Suarez', 'Pasaporte', '64535223', '3105634572', 'cesarsuarez@gmail.com', '$2y$10$MCBitQx6PwjkYaCD.OaTKeTziZP6JUYPldxrdlSKsauU.Om9DpdjS'),
(52, 'Mariana', 'Rincon', 'Rincon', 'Cedula de Ciudadania', '342342342', '3112343321', 'marianitha@gmail.com', '$2y$10$vKr4P3DuiXu8vITwEjZcMebQiB//VkESobnGBanrcte/Hzxws8whO'),
(53, 'Pilar Daniela', 'Moreno', 'Moreno', 'Permiso Especial de Permanencia', '2433455353', '3198056743', 'pilardani@gmail.com', '$2y$10$Pv8P45h.4VHMvaS0kwfhxO4BZbRwsviDaLphVXz1VpJK0Z4rOntua'),
(54, 'Laura ximena', 'valentina', 'valentina', 'Tarjeta de Identidad', '4324324', '3195678907', 'lairaximen@gmail.com', '$2y$10$yRqJGduJoiEZjMiDLXIXW.ufW8hsSC6CY2Kziu9vNval3y4ES0JNm'),
(55, 'Danilo', 'danilo', 'danilo', 'Cedula de Ciudadania', '342423522', '3196548723', 'danilo@gmail.com', '$2y$10$Yi/fUegMh3JT2uc9mWv1Pufn7BXNq1iVSwb2uuz/7kECm41CpLJMy'),
(56, 'Mario', 'Mario', 'Mario', 'Tarjeta de Identidad', '345235324', '3123456789', 'mariomario@gmail.com', '$2y$10$efoH9Brq4tf4e/bGA47Wn.C5w.rcFEM/kr0jKyXyZgBwVmUE.R7gK'),
(57, 'Dalila', 'Dalila', 'Dalila', 'Tarjeta de Identidad', '43534534', '3124567765', 'dalila34@gmail.com', '$2y$10$mkGD.6iShBR1PBgSLCi9gukzbq2eXKPTckp6Tft1uxdNc6.zOqy0S'),
(58, 'Mariana Brigith', 'Rincón', 'Viancha', 'Tarjeta de Identidad', '521213132', '3123456789', 'marianamor@gmail.com', '$2y$10$Uvk6H0UuDhXOgj6BV80UA.glVml0rgpQf8A8bg3PcS5rADsGmEiui'),
(59, 'Camila Alejandra', 'Camila', 'Camila', 'Cedula de Ciudadania', '45353453', '3167890456', 'camilaalejandra@gmail.com', '$2y$10$yV8KxkrqKPjYKxjJUGq8FObfNk9pOuqYnH3TuxzBRX8Ww7kEtmPOa'),
(60, 'Susana', 'SUsana', 'susana', 'Cedula de Ciudadania', '4543545345', '3178905678', 'camilaalejandra34@gmail.com', '$2y$10$XokYw4E7rGoqHlvjgsbtQe3GM0PP4TWCJFzyK6SQ1QvBE5lCc0E8O');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
