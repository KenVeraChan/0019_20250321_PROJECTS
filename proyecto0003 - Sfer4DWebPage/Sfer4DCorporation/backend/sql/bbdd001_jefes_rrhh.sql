-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-01-2025 a las 15:09:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/* ESTO RESPETA ACENTOS Y DEMÁS REGLAS ORTOGRAFICAS CON MYSQL */
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_connection = utf8mb4;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
 
-- -----------------------------------------------------------
-- Base de datos: bbdd001_jefes_rrhh
-- Se creara aqui la base de datos y se usara para la generación de las tablas
CREATE DATABASE IF NOT EXISTS `bbdd001_jefes_rrhh` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bbdd001_jefes_rrhh`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla: diagrama_gannt
--

CREATE TABLE `diagrama_gannt` (
  `ID` int(3) NOT NULL,
  `PROYECTO` varchar(30) DEFAULT NULL,
  `DURACION` int(3) DEFAULT NULL,
  `INICIO` date DEFAULT NULL,
  `COSTE` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla: diagrama_gannt
--

INSERT INTO `diagrama_gannt` (`ID`, `PROYECTO`, `DURACION`, `INICIO`, `COSTE`) VALUES
(1, 'Estudio microbiológico', 5, '2024-08-30', 2000),
(4, 'Eentrega de valoración', 1, '2024-10-10', 540),
(5, 'Reunión de laboratorio', 2, '2024-09-10', 500),
(6, 'Reciclaje de residuos', 6, '2024-09-12', 1500),
(7, 'Logísitica de material', 8, '2024-09-20', 5200),
(8, 'Parada de produccion', 10, '2024-08-15', 12000),
(13, 'entregas nuevas', 5, '2024-09-02', 3000),
(20, 'Sintesis de material anómalo', 4, '2024-09-20', -340);

-- --------------------------------------------------------

-- Estructura de tabla para la tabla: gestionpeticiones

CREATE TABLE `gestionpeticiones` (
  `ID` int(4) NOT NULL,
  `TAREA` varchar(30) DEFAULT NULL,
  `DEPARTAMENTO` varchar(20) DEFAULT NULL,
  `TECNICOS` int(3) DEFAULT NULL,
  `COSTES` float DEFAULT NULL,
  `FECHA` date DEFAULT NULL,
  `RESOLUCION` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla: gestionpeticiones
--

INSERT INTO `gestionpeticiones` (`ID`, `TAREA`, `DEPARTAMENTO`, `TECNICOS`, `COSTES`, `FECHA`, `RESOLUCION`) VALUES
(1, 'Reunión con Marketing', 'Marketing', 4, 212, '2024-08-31', 'CANCELADO'),
(6, 'compra material', 'Produccion', 12, -323, '2024-08-30', 'PENDIENTE'),
(7, 'prueba prototipo', 'I+D+I', 4, 3213, '2024-08-17', 'PENDIENTE'),
(8, 'Reunión con innovadores', 'I+D+I', 4, 3213, '2024-08-17', 'PENDIENTE'),
(9, 'Llegada material', 'PRODUCCION', 8, -1113, '2024-08-15', 'PENDIENTE'),
(36, 'Inversiones externas', 'FINANZAS', 2, 23433, '2024-09-05', 'APROBADO'),
(37, 'Inversiones adicionales', 'FINANZAS', 5, 123433, '2024-09-01', 'PENDIENTE'),
(39, 'Contrataciones', 'DIRECTIVO', 2, 2433, '2024-09-03', 'PENDIENTE'),
(41, 'Creación publicidad', 'COMERCIAL', 5, 32112, '2024-08-18', 'PENDIENTE'),
(47, 'Construcciones férreas', 'LOGISTICAS', 1, 555, '2024-08-18', 'PENDIENTE'),
(48, 'Motores para vehículos', 'PRODUCCION', 8, 223344, '2024-09-01', 'PENDIENTE'),
(55, 'Colocacion material', 'LOGISTICAS', 11, 56565, '2024-09-07', 'READMITIDO'),
(57, 'Pedidos de material', 'I+D+I', 5, 2223, '2024-08-25', 'PENDIENTE'),
(59, 'Llegada nuevo material', 'PRODUCCION', 6, 32112, '2024-09-07', 'CANCELADO'),
(62, 'Contrataciones', 'DIRECTIVO', 5, -1113, '2024-09-08', 'DENEGADO'),
(63, 'Llegada transformaciones', 'LOGISTICAS', 5, 2433, '2024-08-25', 'CANCELADO'),
(65, 'Contrataciones practicas', 'RR.HH.', 6, 566, '2024-09-07', 'PENDIENTE'),
(68, 'Auditoria naves', 'ADMINISTRACION', 9, 123433, '2024-09-08', 'PENDIENTE'),
(70, 'Contrataciones Septiembe', 'RR.HH.', 8, 2433, '2024-09-08', 'PENDIENTE'),
(72, 'Contrataciones', 'RR.HH.', 5, 32112, '2024-08-27', 'PENDIENTE'),
(76, 'Supervision Software', 'DIRECTIVO', 1, 1200, '2024-09-08', 'PENDIENTE'),
(77, 'Compras oficina', 'LOGISTICAS', 3, 3213, '2024-09-01', 'APROBADO'),
(78, 'Reunión con innovadores', 'I+D+I', 15, 23433, '2024-09-07', 'PENDIENTE'),
(79, 'Reunión con innovadores', 'I+D+I', 1, 300, '2024-09-06', 'PENDIENTE'),
(80, 'Contrataciones', 'I+D+I', 7, 23433, '2024-09-07', 'PENDIENTE'),
(81, 'Pruebas laboratorio', 'I+D+I', 3, 21212, '2024-09-06', 'APROBADO'),
(82, 'Compras oficina', 'LOGISTICAS', 1, -12, '2024-09-04', 'PENDIENTE'),
(83, 'Llegada material', 'LOGISTICAS', 1, -23, '2024-09-06', 'PENDIENTE'),
(84, 'Llegada personal auditoria', 'DIRECTIVO', 5, -44, '2024-09-07', 'APROBADO'),
(85, 'Verificación material', 'ADMINISTRACION', 4, -323, '2024-09-04', 'PENDIENTE'),
(86, 'Contrataciones prácticas', 'PRODUCCION', 6, -4321, '2024-09-07', 'APROBADO'),
(87, 'Inversiones químicas', 'LOGISTICAS', 5, -4232, '2024-09-01', 'APROBADO'),
(88, 'Publicidad', 'COMERCIAL', 5, -1111, '2024-09-04', 'PENDIENTE'),
(89, 'Llegada material', 'LOGISTICAS', 3, -1212, '2024-09-03', 'PENDIENTE'),
(90, 'Compras oficina', 'LOGISTICAS', 12, -123, '2024-08-25', 'APROBADO'),
(91, 'Compras material laboratorio', 'I+D+I', 6, -2211, '2024-09-04', 'PENDIENTE'),
(92, 'Llegada material', 'LOGISTICAS', 1, -2000, '2024-09-05', 'PENDIENTE'),
(93, 'Llegada biometricas', 'I+D+I', 5, -2000, '2024-08-31', 'PENDIENTE'),
(94, 'Reunión con innovadores', 'I+D+I', 3, -3213, '2024-08-31', 'PENDIENTE'),
(95, 'Inspección técnica de producto', 'DIRECTIVO', 5, -3333, '2024-09-27', 'PENDIENTE'),
(96, 'Pedido Juan Perez no procesado', 'PRODUCCION', 6, 345, '2025-01-13', 'PENDIENTE'),
(97, 'Reponer mas placas solares', 'I+D+I', 7, 300, '2025-01-14', 'APROBADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla: login
--

CREATE TABLE `login` (
  `ID` int(3) NOT NULL,
  `USUARIO` varchar(30) DEFAULT NULL,
  `CONTRASENIA` varchar(30) DEFAULT NULL,
  `ROL` varchar(30) NOT NULL,
  `DEPARTAMENTO` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla: login
--

INSERT INTO `login` (`ID`, `USUARIO`, `CONTRASENIA`, `ROL`, `DEPARTAMENTO`) VALUES
(1, 'Rasselin', 'manzanasdulces', 'JEFE', 'CONSULTOR'),
(2, 'Vitrea', 'bailarinainquieta', 'JEFE', 'PRODUCCION'),
(3, 'Emiliam', 'pianovsviolin', 'JEFE', 'I+D+I'),
(4, 'Verduliz', 'cultivosprosperos', 'RRHH', 'RRHH'),
(7, 'Jill', 'ministerios2025', 'RRHH', 'RRHH'),
(8, 'Jill', 'ministerios2025', 'RRHH', 'RRHH'),
(9, 'Jill', 'ministerios2025', 'RRHH', 'RELACIONES PUBLICAS');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla: diagrama_gannt
--
ALTER TABLE `diagrama_gannt`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla: gestionpeticiones
--
ALTER TABLE `gestionpeticiones`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla: login
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla: diagrama_gannt
--
ALTER TABLE `diagrama_gannt`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla: gestionpeticiones
--
ALTER TABLE `gestionpeticiones`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT de la tabla: login
--
ALTER TABLE `login`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*******************************************************************************************/
/******************   PARA TODAS LAS TABLAS DE LA BASE DE DATOS CREADA  ********************/
/*******************************************************************************************/

ALTER TABLE `diagrama_gannt` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `gestionpeticiones` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `login` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;