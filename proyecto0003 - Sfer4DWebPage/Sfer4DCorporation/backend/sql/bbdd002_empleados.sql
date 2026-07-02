-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-01-2025 a las 15:08:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
-- -----------------------------------------------------------
-- Base de datos: `bbdd002_empleados`
-- Se creara aqui la base de datos y se usara para la generación de las tablas
CREATE DATABASE IF NOT EXISTS `bbdd002_empleados` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bbdd002_empleados`;
-- --------------------------------------------------------
--
-- Base de datos: `bbdd002_empleados`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos_empresa`
--

CREATE TABLE `contactos_empresa` (
  `ID` int(3) NOT NULL,
  `NOMBRE` varchar(30) DEFAULT NULL,
  `APELLIDOS` varchar(50) DEFAULT NULL,
  `DIRECCION` varchar(50) DEFAULT NULL,
  `POBLACION` varchar(20) DEFAULT NULL,
  `PROFESION` varchar(30) DEFAULT NULL,
  `SALAR_ANT` int(6) DEFAULT NULL,
  `CONTRATACION` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contactos_empresa`
--

INSERT INTO `contactos_empresa` (`ID`, `NOMBRE`, `APELLIDOS`, `DIRECCION`, `POBLACION`, `PROFESION`, `SALAR_ANT`, `CONTRATACION`) VALUES
(1, 'Rasselín', 'Wissangel Rousher', 'calle fuente plateada 32', 'Valencia', 'Estudiante', 234000, 'APROBADA'),
(2, 'Vitrea', 'Horiz', 'Calle cirios cruzados 82', 'Barcelona', 'Oficial', 3144, 'DENEGADA'),
(3, 'Emiliam', 'Bastreriz', 'calle musicalizacion 32', 'Northwith', 'Oficial', 30922, 'APROBADA'),
(4, 'Verduliz', 'Sainz', 'Calle Vilnus 12', 'Tarragona', 'Profesor/a', 32312, 'APROBADA'),
(5, 'Veddina', 'Henion', 'calle arbolados 9', 'Northwith', 'Camarero/a', 34021, 'APROBADA'),
(6, 'Samira', 'Savadez', 'Calle Manuel Azaña 64', 'Northwith', 'Recepcionista', 12121, 'APROBADA'),
(7, 'Christal', 'Gedishen', 'nuevos atos', 'Madrid', 'Funcionario/a', 20000, 'APROBADA'),
(8, 'Jill', 'Anherson', 'nuevos ministerios', 'Tarragona', 'Profesor/a', 234000, 'APROBADA'),
(9, 'Shail', 'Matsiz', 'arces 3', 'Barcelona', 'Profesor/a', 120000, 'PENDIENTE'),
(10, 'Ken', 'Horiz', 'Calle Manuel Azaña 64', 'Barcelona', 'Taxista', 12121, 'APROBADA'),
(11, 'Neth', 'Horiz', 'nuevas platas', 'Barcelona', 'Profesor/a', 12121, 'PENDIENTE'),
(13, 'Pedro', 'Calvo Osucro', 'Calle nuevos ministerios 4', 'Madrid', 'Asesor/a fiscal', 34000, 'PENDIENTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados_empresa`
--

CREATE TABLE `empleados_empresa` (
  `ID` int(5) NOT NULL,
  `NOMBRE` varchar(40) NOT NULL,
  `APELLIDOS` varchar(40) NOT NULL,
  `DIRECCION` varchar(60) NOT NULL,
  `OFICIO_ANTERIOR` varchar(40) NOT NULL,
  `FECHA_ASIGNACION` date NOT NULL,
  `ROL` varchar(40) NOT NULL,
  `CONTRATO` varchar(30) NOT NULL,
  `CONTRASENIA` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados_empresa`
--

INSERT INTO `empleados_empresa` (`ID`, `NOMBRE`, `APELLIDOS`, `DIRECCION`, `OFICIO_ANTERIOR`, `FECHA_ASIGNACION`, `ROL`, `CONTRATO`, `CONTRASENIA`) VALUES
(1, 'Ken', 'Horiz', 'Calle Manuel Azaña 64', 'Taxista', '2025-01-17', 'EMPLEADO', 'INDEFINIDO', 'nuevasmetas2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contactos_empresa`
--
ALTER TABLE `contactos_empresa`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `empleados_empresa`
--
ALTER TABLE `empleados_empresa`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contactos_empresa`
--
ALTER TABLE `contactos_empresa`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `empleados_empresa`
--
ALTER TABLE `empleados_empresa`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
