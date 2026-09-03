-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-12-2020 a las 08:47:13
-- Versión del servidor: 5.7.26
-- Versión de PHP: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pruebasdef`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `CODIGOARTICULO` varchar(4) DEFAULT NULL,
  `SECCION` varchar(10) DEFAULT NULL,
  `NOMBREARTICULO` varchar(19) DEFAULT NULL,
  `DESCRIPCION` varchar(10) DEFAULT NULL,
  `PRECIO` varchar(7) DEFAULT NULL,
  `FECHA` varchar(10) DEFAULT NULL,
  `IMPORTADO` varchar(9) DEFAULT NULL,
  `PAISDEORIGEN` varchar(9) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`CODIGOARTICULO`, `SECCION`, `NOMBREARTICULO`, `DESCRIPCION`, `PRECIO`, `FECHA`, `IMPORTADO`, `PAISDEORIGEN`) VALUES
('AR01', 'CERÁMICA', 'DESTORNILLADOR', '', '6 €', '22/10/2000', 'FALSO', 'ESPAÑA'),
('AR02', 'CONFECCIÓN', 'TRAJE CABALLERO', '', '237 €', '11/03/2002', 'VERDADERO', 'ITALIA'),
('AR03', 'JUGUETERÍA', 'COCHE TELEDIRIGIDO', '', '133 €', '26/05/2002', 'VERDADERO', 'MARRUECOS'),
('AR04', 'DEPORTES', 'RAQUETA TENIS', '', '78 €', '20/03/2000', 'VERDADERO', 'USA'),
('AR06', 'DEPORTES', 'MANCUERNAS', '', '50 €', '13/09/2000', 'VERDADERO', 'USA'),
('AR07', 'FERRETERÍA', 'SERRUCHO', '', '25 €', '23/03/2001', 'VERDADERO', 'FRANCIA'),
('AR08', 'JUGUETERÍA', 'CORREPASILLOS', '', '86 €', '11/04/2000', 'VERDADERO', 'JAPÓN'),
('AR09', 'CONFECCIÓN', 'PANTALÓN SEÑORA', '', '145 €', '10/01/2000', 'VERDADERO', 'MARRUECOS'),
('AR10', 'JUGUETERÍA', 'CONSOLA VIDEO', '', '369 €', '24/09/2002', 'VERDADERO', 'USA'),
('AR11', 'FERRETERÍA', 'TUBOS', '', '140 €', '04/02/2000', 'VERDADERO', 'CHINA'),
('AR12', 'FERRETERÍA', 'LLAVE INGLESA', '', '20 €', '23/05/2001', 'VERDADERO', 'USA'),
('AR13', 'CONFECCIÓN', 'CAMISA CABALLERO', '', '56 €', '11/08/2002', 'FALSO', 'ESPAÑA'),
('AR14', 'JUGUETERÍA', 'TREN ELÉCTRICO', '', '1.254 €', '03/07/2001', 'VERDADERO', 'JAPÓN'),
('AR15', 'CERÁMICA', 'PLATO DECORATIVO', '', '45 €', '07/06/2000', 'VERDADERO', 'CHINA'),
('AR16', 'FERRETERÍA', 'ALICATES', '', '6 €', '17/04/2000', 'VERDADERO', 'ITALIA'),
('AR17', 'JUGUETERÍA', 'MUÑECA ANDADORA', '', '88 €', '04/01/2001', 'FALSO', 'ESPAÑA'),
('AR18', 'DEPORTES', 'PISTOLA OLÍMPICA', '', '39 €', '02/02/2001', 'VERDADERO', 'SUECIA'),
('AR19', 'CONFECCIÓN', 'BLUSA SRA.', '', '84 €', '18/03/2000', 'VERDADERO', 'CHINA'),
('AR20', 'CERÁMICA', 'JUEGO DE TE', '', '36 €', '15/01/2001', 'VERDADERO', 'CHINA'),
('AR21', 'CERÁMICA', 'CENICERO', '', '16 €', '02/07/2001', 'VERDADERO', 'JAPÓN'),
('AR22', 'FERRETERÍA', 'MARTILLO', '', '9 €', '04/09/2001', 'FALSO', 'ESPAÑA'),
('AR23', 'CONFECCIÓN', 'CAZADORA PIEL', '', '436 €', '10/07/2001', 'VERDADERO', 'ITALIA'),
('AR24', 'DEPORTES', 'BALÓN RUGBY', '', '93 €', '11/11/2000', 'VERDADERO', 'USA'),
('AR25', 'DEPORTES', 'BALÓN BALONCESTO', '', '63 €', '25/06/2001', 'VERDADERO', 'JAPÓN'),
('AR26', 'JUGUETERÍA', 'FUERTE DE SOLDADOS', '', '120 €', '25/11/2000', 'VERDADERO', 'JAPÓN'),
('AR27', 'CONFECCIÓN', 'ABRIGO CABALLERO', '', '203 €', '05/04/2002', 'VERDADERO', 'ITALIA'),
('AR28', 'DEPORTES', 'BALÓN FÚTBOL', '', '37 €', '04/07/2002', 'FALSO', 'ESPAÑA'),
('AR29', 'CONFECCIÓN', 'ABRIGO SRA', '', '300 €', '03/05/2001', 'VERDADERO', 'MARRUECOS'),
('AR30', 'FERRETERÍA', 'DESTORNILLADOR', '', '8 €', '20/02/2002', 'VERDADERO', 'FRANCIA'),
('AR31', 'JUGUETERÍA', 'PISTOLA CON SONIDOS', '', '48 €', '15/04/2001', 'FALSO', 'ESPAÑA'),
('AR32', 'DEPORTES', 'CRONÓMETRO', '', '366 €', '03/01/2002', 'VERDADERO', 'USA'),
('AR33', 'CERÁMICA', 'MACETA', '', '24 €', '23/02/2000', 'FALSO', 'ESPAÑA'),
('AR34', 'OFICINA', 'PIE DE LÁMPARA', '', '33 €', '27/05/2001', 'VERDADERO', 'TURQUÍA'),
('AR35', 'FERRETERÍA', 'LIMA GRANDE', '', '18 €', '10/08/2002', 'FALSO', 'ESPAÑA'),
('AR36', 'FERRETERÍA', 'JUEGO DE BROCAS', '', '13 €', '04/07/2002', 'VERDADERO', 'TAIWÁN'),
('AR37', 'CONFECCIÓN', 'CINTURÓN DE PIEL', '', '4 €', '12/05/2002', 'FALSO', 'ESPAÑA'),
('AR38', 'DEPORTES', 'CAÑA DE PESCA', '', '225 €', '14/02/2000', 'VERDADERO', 'USA'),
('AR39', 'CERÁMICA', 'JARRA CHINA', '', '106 €', '02/09/2002', 'VERDADERO', 'CHINA'),
('AR40', 'DEPORTES', 'BOTA ALPINISMO', '', '120 €', '05/05/2002', 'FALSO', 'ESPAÑA'),
('AR41', 'DEPORTES', 'PALAS DE PING PONG', '', '18 €', '02/02/2002', 'FALSO', 'ESPAÑA');
COMMIT;

--
-- Estructura de tabla para la tabla `clientespedidos`
--

DROP TABLE IF EXISTS `clientespedidos`;
CREATE TABLE IF NOT EXISTS `clientespedidos` (
  `ID` int(3) NOT NULL,
  `NOMBRE` varchar(30) DEFAULT NULL,
  `NUMERO` varchar(19) DEFAULT NULL,
  `TELEFONO` int(12) DEFAULT NULL,
  `DIRECCION` varchar(100) DEFAULT NULL,
  `CORREO` varchar(40) DEFAULT NULL,
  `CONCEPTO` varchar(30) DEFAULT NULL,
  `DEPARTAMENTO` varchar(20) NOT NULL,
  `CANTIDAD` int(3) NOT NULL,
  `COSTE_UNITARIO` float NOT NULL,
  `COSTE_TOTAL` float NOT NULL,
  `FECHA_PEDIDO` date DEFAULT NULL,
  `REFERENCIA` varchar(20) NOT NULL,
  `ENTREGADO` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientespedidos`
--

INSERT INTO `clientespedidos` (`ID`, `NOMBRE`, `NUMERO`, `TELEFONO`, `DIRECCION`, `CORREO`, `CONCEPTO`, `DEPARTAMENTO`, `CANTIDAD`, `COSTE_UNITARIO`, `COSTE_TOTAL`, `FECHA_PEDIDO`, `REFERENCIA`, `ENTREGADO`) VALUES
(1, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'SOFTWARE', 'PRODUCTOS', 3, 23.45, 70.35, '2024-11-16', 'JP2352-20241116', 'PENDIENTE'),
(2, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'SOFTWARE', 'PRODUCTOS', 12, 23.45, 281.4, '2024-11-20', 'JP2352-20241120', 'ENTREGADO'),
(3, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'HERRAMIENTAS', 'PRODUCTOS', 1, 45.67, 45.67, '2024-12-01', 'JP2352-20241201', 'PENDIENTE'),
(4, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'HIDROGENO', 'PROYECTOS', 7, 95000, 665000, '2024-12-01', 'JP2352-20241201', 'PENDIENTE'),
(5, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'INSTRUMENTACION', 'PRODUCTOS', 21, 8.25, 173.25, '2024-12-01', 'JP2352-20241201', 'ENTREGADO'),
(6, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'PANEL SOLAR', 'PRODUCTOS', 2, 4560.21, 9120.42, '2024-12-01', 'JP2352-20241201', 'PENDIENTE'),
(7, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'PROCESADOR', 'PRODUCTOS', 9, 110.25, 992.25, '2024-12-01', 'JP2352-20241201', 'PENDIENTE'),
(8, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'ROBOT', 'PRODUCTOS', 17, 201.23, 3420.91, '2024-12-01', 'JP2352-20241201', 'PENDIENTE'),
(9, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'SEGUIMIENTO', 'PROYECTOS', 3, 72000, 216000, '2024-12-01', 'JP2352-20241201', 'PENDIENTE'),
(10, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'SOFTWARE', 'PRODUCTOS', 1, 454, 454, '2024-12-01', 'JP2352-20241201', 'ENTREGADO'),
(11, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRACTOR', 'SERVICIOS', 3, 151.75, 455.25, '2024-12-01', 'JP2352-20241201', 'CANCELADO'),
(12, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRANSPORTE ELECTRICO', 'PRODUCTOS', 3, 50.2, 150.6, '2024-12-01', 'JP2352-20241201', 'PENDIENTE'),
(13, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TUNELADORA', 'SERVICIOS', 2, 201.23, 402.46, '2024-12-01', 'JP2352-20241201', 'PENDIENTE'),
(14, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'CULTIVOS', 'SERVICIOS', 10, 71.75, 717.5, '2024-12-03', 'JP2352-20241203', 'PENDIENTE'),
(15, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'ROBOT', 'PRODUCTOS', 5, 201.23, 1006.15, '2024-12-03', 'JP2352-20241203', 'PENDIENTE'),
(16, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'COLONOS', 'PROYECTOS', 7, 99500, 696500, '2024-12-04', 'JP2352-20241204', 'PENDIENTE'),
(17, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRANSPORTE ELECTRICO', 'PRODUCTOS', 54, 50.2, 2710.8, '2024-12-04', 'JP2352-20241204', 'PENDIENTE'),
(18, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'CULTIVOS', 'SERVICIOS', 10, 71.75, 358.75, '2025-01-09', 'JP2352-20250109', 'PENDIENTE'),
(19, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'INSTRUMENTACION', 'PRODUCTOS', 5, 8.25, 313.5, '2025-01-09', 'JP2352-20250109', 'PENDIENTE'),
(20, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'PANEL SOLAR', 'PRODUCTOS', 6, 4560.21, 27361.3, '2025-01-09', 'JP2352-20250109', 'PENDIENTE'),
(21, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'ROBOT', 'PRODUCTOS', 6, 201.23, 1207.38, '2025-01-09', 'JP2352-20250109', 'PENDIENTE'),
(22, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'CULTIVOS', 'SERVICIOS', 10, 71.75, 358.75, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(23, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'INSTRUMENTACION', 'PRODUCTOS', 5, 8.25, 313.5, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(24, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'PANEL SOLAR', 'PRODUCTOS', 6, 4560.21, 27361.3, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(25, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'ROBOT', 'PRODUCTOS', 6, 201.23, 1207.38, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(26, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'CULTIVOS', 'SERVICIOS', 10, 71.75, 358.75, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(27, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'INSTRUMENTACION', 'PRODUCTOS', 5, 8.25, 313.5, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(28, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'PANEL SOLAR', 'PRODUCTOS', 6, 4560.21, 27361.3, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(29, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'ROBOT', 'PRODUCTOS', 6, 201.23, 1207.38, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(30, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'CULTIVOS', 'SERVICIOS', 10, 71.75, 358.75, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(31, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'INSTRUMENTACION', 'PRODUCTOS', 5, 8.25, 313.5, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(32, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'PANEL SOLAR', 'PRODUCTOS', 6, 4560.21, 27361.3, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(33, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'ROBOT', 'PRODUCTOS', 6, 201.23, 1207.38, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(34, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRANSPORTE ELECTRICO', 'PRODUCTOS', 199, 50.2, 1004, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(35, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRAZADORES', 'SERVICIOS', 300, 225.25, 8109, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(36, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRAZADORES', 'SERVICIOS', 300, 225.25, 8109, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(37, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRAZADORES', 'SERVICIOS', 300, 225.25, 8109, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(38, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRANSPORTE ELECTRICO', 'PRODUCTOS', 100, 50.2, 5020, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(39, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRANSPORTE ELECTRICO', 'PRODUCTOS', 100, 50.2, 5020, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(40, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRANSPORTE ELECTRICO', 'PRODUCTOS', 100, 50.2, 5020, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(41, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRANSPORTE ELECTRICO', 'PRODUCTOS', 100, 50.2, 5020, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(42, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRANSPORTE ELECTRICO', 'PRODUCTOS', 100, 50.2, 5020, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(43, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRANSPORTE ELECTRICO', 'PRODUCTOS', 100, 50.2, 5020, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(44, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'TRANSPORTE ELECTRICO', 'PRODUCTOS', 100, 50.2, 5020, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(45, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'HERRAMIENTAS', 'PRODUCTOS', 1000, 45.67, 45670, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(46, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'INSTRUMENTACION', 'PRODUCTOS', 500, 8.25, 4125, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(47, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'REDES', 'SERVICIOS', 20, 3322.25, 66445, '2025-01-10', 'JP2352-20250110', 'PENDIENTE'),
(48, 'Juan Perez', '3313 2332 3232 3233', 678002352, '11324 ROCKWELL AVENUE', 'juanperez@outlook.com', 'SOFTWARE', 'PRODUCTOS', 200, 454, 90800, '2025-01-11', 'JP2352-20250111', 'PENDIENTE');
COMMIT;

-- EL COMMIT CONFIRMA TODOS LOS INSERT EJECUTADOS


--
-- Estructura de tabla para la tabla `imagenesinterfazweb`
--

DROP TABLE IF EXISTS `imagenesinterfazweb`;
CREATE TABLE IF NOT EXISTS `imagenesinterfazweb` (
  `ID` int(4) NOT NULL,
  `NOMBRE` varchar(150) DEFAULT NULL,
  `TIPO` varchar(15) DEFAULT NULL,
  `TAMANIO` text DEFAULT NULL,
  `DESTINO` varchar(20) DEFAULT NULL,
  `SECTOR` varchar(40) DEFAULT NULL,
  `STOCK` int(4) NOT NULL,
  `COSTE` float NOT NULL,
  `DETALLES` varchar(800) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenesinterfazweb`
--

INSERT INTO `imagenesinterfazweb` (`ID`, `NOMBRE`, `TIPO`, `TAMANIO`, `DESTINO`, `SECTOR`, `STOCK`, `COSTE`, `DETALLES`) VALUES
(1, 'AutumnMeetings.jpg', 'image/jpeg', '120854', 'SLIDER', '', 0, 0, 'Reuniones de otoño'),
(2, 'Cubits.jpg', 'image/jpeg', '153692', 'SLIDER', '', 0, 0, 'Orientación futurista'),
(3, 'FutureUniversity.jpg', 'image/jpeg', '132528', 'SLIDER', '', 0, 0, 'Implicaciones en las universidades'),
(4, 'MettingIT.jpg', 'image/jpeg', '120457', 'SLIDER', '', 0, 0, 'Brainstorming'),
(5, 'OtraTierra.jpg', 'image/jpeg', '24782', 'SLIDER', '', 0, 0, 'La Tierra vista desde la Tierra'),
(6, 'TimeTravel.jpg', 'image/jpeg', '173503', 'SLIDER', '', 0, 0, 'Primeros viajes en el tiempo'),
(7, 'ViajeManpertos.jpg', 'image/jpeg', '85457', 'SLIDER', '', 0, 0, 'Colonización de Manpertos'),
(8, 'NOVEDADES.png', 'image/png', '4812', 'NOVEDADES', '', 0, 0, 'Conseguido el metal con propiedades plásticas. Primera vez que se alcanza la temperatura de: -274ºC. El hidrógeno como combustible provoca mayores lluvias continentales e inundaciones imprevistas.'),
(9, 'NOTICIAS.png', 'image/png', '22206', 'NOVEDADES', '', 0, 0, 'Techeimer se extiende por el continente de Wellis para su revolución industrial en nanotecnología. La empresa Ampergya sube sus impuestos energéticos. La inteligencia artificial recomienda no buscar más formas de vida en el espacio por ver al ser humano una especie débil.'),
(10, 'SERVICIOS.png', 'image/png', '36775', 'NOVEDADES', '', 0, 0, 'Diseño de Software destinado a la Aeronáutica. Desarrollo de agricultura vertical. Servicios de domótica particular y para entidades empresariales. FemtoTecnología para estudiar microorganismos hostiles.'),
(11, 'PRODUCTOS.png', 'image/png', '23924', 'NOVEDADES', '', 0, 0, 'Rotor de antigravedad manual para maqinaria pesada. Mapeador tridimensional de estructuras hasta 10 km de radio. Proyectores de holografía HD sin pantalla física requerida. Perforadores de laser para tuneladoras veloces.'),
(12, 'SERVIDORES.png', 'image/png', '21307', 'NOVEDADES', '', 0, 0, 'Inmensa cantidad de datos digitales. El Estado negocia con Sfer4D para la compra de espacio virtual en la nube. Las investigaciones espaciales ocupan el mayor espacio de almacenamiento.'),
(13, 'DINERO.png', 'image/png', '194365', 'NOVEDADES', '', 0, 0, 'El capital empresarial se ve fortalecido por las inversiones independientes. Los nuevos avances en investigación biomolecular ponen en quiebra las pequeñas empresas. Sfer4D financia a las pequeñas empresas para evitar su cese de actividad.'),
(14, 'INVESTIGACION.png', 'image/png', '15517', 'NOVEDADES', '', 0, 0, 'Se retrasa la investigación molecular por falta de materias primas. Se firman subcontratas para la investigación en paralelo a fin de solventar la carencia de material primario.'),
(15, 'BASURA.png', 'image/png', '18139', 'NOVEDADES', '', 0, 0, 'Se crean nuevos proyectos para la gestión de residuos bioquímicos. Se forja la ley orgánica de no trabajar con productos radiactivos hasta no tener un tratado documentado sobre la gestión de los residuos.'),
(16, 'BARCO.png', 'image/png', '30567', 'NOVEDADES', '', 0, 0, 'Wellis compra 10.000 motores eléctricos para navegación turística. Sfer4D logra la insignia de la PILA por ser el primero en conseguir que un avión completamente eléctrico duplique la velocidad de un caza militar durante un viaje de 12 horas ininterrumpidas.'),
(17, 'ANTENA.png', 'image/png', '42120', 'NOVEDADES', '', 0, 0, 'Las antenas de las instalaciones astronómicas de Sfer4D, ubicadas al norte de Wavdur, informan que la señal recibida del espacio profundo poseía unas coordenadas de origen, además de la petición de auxilio que primeramente se descifró.'),
(18, 'PLANETA.png', 'image/png', '128253', 'NOVEDADES', '', 0, 0, 'Instrumental de Sfer4D instalado en las fosas marinas ubicadas en pleno océano a 14.000 metros de profundidad, detectan nuevos organismos de vida pluricelular emergentes de una mayor profundidad.'),
(19, 'NATURALEZA.png', 'image/png', '42905', 'NOVEDADES', '', 0, 0, 'Sfer4D financia de nuevo el proyecto Greenovatio. Se plantan diversas vegetaciones específicas en todas las autopistas y carreteras del Estado a fin de purificar el aire.'),
(20, 'PIZARRA.png', 'image/png', '20969', 'NOVEDADES', '', 0, 0, 'Sfer4D se implica en la educación tecnológica de los futuros hombres y mujeres profesionales. Se donan hasta 1000B ordenadores portátiles con demos de los programas informáticos para iniciarse en la programación VIS4C de la robótica.'),
(21, 'HIELO.png', 'image/png', '18928', 'NOVEDADES', '', 0, 0, 'Sfer4D alquila las primeras zonas polares de la zona norte para reanudar sus investigaciones sobre el electromagnetismo. Los aliados de la NACION-5Z firman un contrato con Sfer4D para el intercambio de tecnologia por conocimientos del terreno polar.'),
(22, 'EDIFICIO.png', 'image/png', '17935', 'NOVEDADES', '', 0, 0, 'Las acciones de la empresa caen en el sector de la automoción eléctrica. El mundo no esta preparado para el cambio a lo eléctrico debido a las baterías fabricadas.'),
(23, 'ROBOT.png', 'image/png', '17802', 'NOVEDADES', '', 0, 0, 'Varios robots en una planta de producción en Grenzlin toman sus propias decisiones en el diseño de un modelo conocido de vehículo.'),
(24, 'AEROESPACIAL.png', 'image/png', '57672', 'CATEGORIA PRODUCTOS', '', 0, 0, 'Productos de diseño de aeronaves y materiales de alta resistencia y baja densidad para movilidad en espacios hostiles, así como elementos de investigación espacial'),
(25, 'BIOINGENIERIA.png', 'image/png', '22865', 'CATEGORIA PRODUCTOS', '', 0, 0, 'Material de uso en laboratorio, tratamiento de productos químicos y biológicos del peligrosidad de nivel medio'),
(26, 'CONSTRUCCION.png', 'image/png', '19724', 'CATEGORIA PRODUCTOS', '', 0, 0, 'Materiales de construcción: terrestre y espacial, no de obra civil'),
(27, 'INDUSTRIA.png', 'image/png', '14305', 'CATEGORIA PRODUCTOS', '', 0, 0, 'Productos de diseño industrial, programación robótica y automatización de maquinaria de producción'),
(28, 'HERRAMIENTAS.png', 'image/png', '65193', 'PRODUCTOS', 'INDUSTRIA', 500, 45.67, 'Herramientas varias de producción con tratamientos térmicos específicos'),
(29, 'INSTRUMENTACION.png', 'image/png', '19315', 'PRODUCTOS', 'BIOINGENIERIA', 200, 8.25, 'Carga protegida en dislolución'),
(30, 'PANEL SOLAR.png', 'image/png', '20366', 'PRODUCTOS', 'AEROESPACIAL', 100, 4560.21, ''),
(31, 'ROBOT.png', 'image/png', '15660', 'PRODUCTOS', 'INDUSTRIA', 210, 201.23, 'Robot IRB 120. Carga máxima 300 kg y volumen de trabajo 3,5 metros cúbicos'),
(32, 'SOFTWARE.png', 'image/png', '50945', 'PRODUCTOS', 'INDUSTRIA', 800, 454, 'Carga de ficheros'),
(34, 'TUNELADORA.png', 'image/png', '11428', 'SERVICIOS', 'INFRAESTRUCTURAS', 210, 201.23, ''),
(35, 'TRANSPORTE ELECTRICO.png', 'image/png', '287078', 'PRODUCTOS', 'CONSTRUCCION', 0, 50.2, ''),
(36, 'PUENTES.png', 'image/png', '91271', 'SERVICIOS', 'INFRAESTRUCTURAS', 0, 0, ''),
(37, 'PROCESADOR.png', 'image/png', '17120', 'PRODUCTOS', 'INDUSTRIA', 800, 110.25, 'Con el sistema operativo escrito en Vis4C trabaja con octacore'),
(38, 'ASTRONOMIA.png', 'image/png', '98622', 'CATEGORIA SERVICIOS', '', 0, 0, 'Investigación espacial más allá de Manpertos, dentro del sistema solar'),
(39, 'AUTOMATIZACION.png', 'image/png', '139979', 'CATEGORIA SERVICIOS', '', 0, 0, 'Auditorías en automatización y mejoras continuas'),
(40, 'ECOLOGIA.png', 'image/png', '22504', 'CATEGORIA SERVICIOS', '', 0, 0, 'Búsquedas de reemplezamiento ecológico sin interferir en el equilibrio productivo ajeno'),
(41, 'INFRAESTRUCTURAS.png', 'image/png', '72643', 'CATEGORIA SERVICIOS', '', 0, 0, 'Servicios de tratamiento de caminos terrestres y submarinos'),
(42, 'MEDICINA.png', 'image/png', '56008', 'CATEGORIA SERVICIOS', '', 0, 0, 'Servicios de investigación microbiológica de alto nivel'),
(43, 'OCEANOGRAFIA.png', 'image/png', '31565', 'CATEGORIA SERVICIOS', '', 0, 0, 'servicios de investigación submarina y mapeos en suelos oceánicos'),
(44, 'TELECOMUNICACIONES.png', 'image/png', '129533', 'CATEGORIA SERVICIOS', '', 0, 0, 'mejoras en las transmisiones interplanetarias y de larga distancia espacial'),
(45, 'EDUCACION.png', 'image/png', '158168', 'CATEGORIA SERVICIOS', '', 0, 0, 'proveedor de tecnología para el perfeccionamiento de la educación'),
(46, 'MINERIA.png', 'image/png', '139716', 'SERVICIOS', 'ASTRONOMIA', 30, 1233.25, 'Servicios con tecnología punta para minería en terrenos extraterrestres'),
(47, 'MAPEOS.png', 'image/png', '29599', 'SERVICIOS', 'ASTRONOMIA', 22, 336.5, 'Servicio de mapeo superficial y escaneo subterraneos digitalizados'),
(48, 'TRAZADORES.png', 'image/png', '20341', 'SERVICIOS', 'ASTRONOMIA', 382, 225.25, 'Trazadores autónomos para búsqueda de materia orgánica espacial'),
(49, 'SATENEXOS.png', 'image/png', '34485', 'SERVICIOS', 'ASTRONOMIA', 34, 514.5, 'Satélites nexos entre varias redes orbitales sobre planetas en investigación'),
(50, 'NAVES.png', 'image/png', '15640', 'SERVICIOS', 'ASTRONOMIA', 59, 125.75, 'Peritación de vehículos espaciales con escaneos microscópicos'),
(51, 'SENSOR.png', 'image/png', '27090', 'SERVICIOS', 'AUTOMATIZACION', 12763, 103.75, 'Servicio de instalación de sensores en cadenas de producción'),
(52, 'INSTALACIONES.png', 'image/png', '39505', 'SERVICIOS', 'AUTOMATIZACION', 3113, 122.25, 'Servicios de instalación de software embebido en maquinarias industriales'),
(53, 'ORGANIZACIÓN.png', 'image/png', '20301', 'SERVICIOS', 'AUTOMATIZACION', 121, 422.75, 'Servicios de organización de una planta industrial para minimizar los costes de transporte entre naves'),
(54, 'REDES.png', 'image/png', '70530', 'SERVICIOS', 'AUTOMATIZACION', 7, 3322.25, 'Servicio de instalación y diseño de redes industriales para maximizar las comunicaciones dentro y fuera del área corporativo'),
(55, 'ALMACENAJE.png', 'image/png', '69515', 'SERVICIOS', 'AUTOMATIZACION', 74, 111.75, 'Servicio de almacenaje y creación de servidores industriales óptimos para trabajos BIG DATA'),
(56, 'GRUA.png', 'image/png', '16315', 'SERVICIOS', 'AUTOMATIZACION', 18, 14.25, 'Instalación de grúas puente en naves industriales'),
(57, 'CULTIVOS.png', 'image/png', '28928', 'SERVICIOS', 'ECOLOGIA', 18112, 71.75, 'Servicio de aporte tecnológico al sistema agrario vertical y en medios hostiles'),
(58, 'TRACTOR.png', 'image/png', '203727', 'SERVICIOS', 'ECOLOGIA', 36, 151.75, 'Servicios de adaptación de la maquinaria agraria con inteligencia artificial para la automatización de las labores'),
(59, 'GENETICA.png', 'image/png', '30278', 'SERVICIOS', 'MEDICINA', 126, 301.25, 'Servicios de investigación microbiologica para vacunas y medicamentos'),
(60, 'DISOLUCIONES.png', 'image/png', '17824', 'SERVICIOS', 'MEDICINA', 403, 114.25, 'Servicio de tratamiento de disoluciones químicas y análsisi de peligrosidad'),
(61, 'BIENESTAR.png', 'image/png', '19382', 'SERVICIOS', 'MEDICINA', 211, 16.5, 'Productos medicinales para todas las familias'),
(62, 'PROFUNDIDADES.png', 'image/png', '33351', 'SERVICIOS', 'OCEANOGRAFIA', 14, 1112.25, 'Servicio de investigación de terrenos submarinos para detectar posibles movimientos sísmicos moderados'),
(63, 'ESTABILIDAD.png', 'image/png', '23718', 'SERVICIOS', 'OCEANOGRAFIA', 833, 1113.75, 'Servicio de investigación de oleajes digitalizados para levntar viviendas en pleno mar'),
(64, 'CIUDADELAS.png', 'image/png', '18780', 'SERVICIOS', 'OCEANOGRAFIA', 2521, 511.5, 'Estudio del terreno subterraneo para instalar edificaciones de investigación profunda'),
(65, 'PURIFICADORA.png', 'image/png', '14020', 'SERVICIOS', 'OCEANOGRAFIA', 114, 1111.75, 'Servicio de asistencia en la implementación de tecnología de purificación de aguas del mar'),
(66, 'GEOESTACIONARIOS.png', 'image/png', '21119', 'SERVICIOS', 'TELECOMUNICACIONES', 201, 112.25, 'Servicios de programación de satélites orbitales de inertes zonas planetarias'),
(67, 'AERONAVES.png', 'image/png', '22430', 'SERVICIOS', 'TELECOMUNICACIONES', 246, 1112.25, 'Servicios de manejo automatizado de lanzaderas espaciales'),
(69, 'PIZARRAS.png', 'image/png', '66842', 'SERVICIOS', 'EDUCACION', 432, 171.5, 'Pizarras digitales con holografia tridimensional para la enseñanza'),
(70, 'TABLETS.png', 'image/png', '9977', 'SERVICIOS', 'EDUCACION', 72, 44.5, 'Dispositivos electrónicos para el aprendizae con bases de datos simuladas para aprender a programar VIS4C'),
(71, 'PROGRAMACION.png', 'image/png', '16776', 'CATEGORIA PROYECTOS', '', 0, 0, 'Proyecto vigente en el lenguaje VIS4C para automatizar satélites a la escucha de interferencias y armónicos para la recalibración de los instrumentos electrónicos con dichas emisiones indeseadas'),
(72, 'AGRICULTURA.png', 'image/png', '26379', 'CATEGORIA PROYECTOS', '', 0, 0, 'Proyectos vigentes con Medigraria para el alzamiento de agriculturas verticales y en terrenos climáticamente hostiles para probar su productividad en los futuros meses'),
(73, 'COLONIZACION.png', 'image/png', '29643', 'CATEGORIA PROYECTOS', '', 0, 0, 'Proyecto vigente en la producción en masa de plantas modificadas genéticamente para acelerar su proceso fotosintético a fin de generar el doble de oxígeno en la mitad de un determinado tiempo nominal de la planta. Se empleará en futuras colonizaciones planetarias'),
(74, 'SUBMARINISMO.png', 'image/png', '279171', 'CATEGORIA PROYECTOS', '', 0, 0, 'Proyecto vigente para poder llevar al ser humano a profundidades submarinas más considerables para diseñar un sistema de redes de transporte y telecomunicación'),
(75, 'ATMOSFERA.png', 'image/png', '12947', 'CATEGORIA PROYECTOS', '', 0, 0, 'Proyecto vigente en el tratamiento del helio como formato 5x1, levanta 5 kilogramos con un 1 kg de helio'),
(76, 'CARRETERAS.png', 'image/png', '43133', 'CATEGORIA PROYECTOS', '', 0, 0, 'Proyecto vigente con la empresa eléctrica AMPERGYA para ampliar su red de transporte eléctrico por las vías férreas y de carreteras tanto de forma terrestre como en vías de circulación submarinas'),
(77, 'METEORITO.png', 'image/png', '35467', 'CATEGORIA PROYECTOS', '', 0, 0, 'Proyecto en curso sobre el estudio in situ de las características químicas de los cometas que deambulan por el sistema solar, en la búsqueda de material orgánico presente en sus suelos físicos'),
(78, 'PROFUNDIDADES.png', 'image/png', '46965', 'CATEGORIA PROYECTOS', '', 0, 0, 'Proyecto vigente en el estudio de los ecosistemas marinos para el trazado futuro de redes ferroviarias sin obstruir ni cambiar el curso de la vida submarina'),
(79, 'SEMILLAS.png', 'image/png', '31743', 'PROYECTOS', 'AGRICULTURA', 1, 99000, 'Proyecto de investigación basado en la modificación genética de las semillas comunes para acelerar su crecimiento y reforzar sus defensas biológicas en ambientes climáticos hostiles'),
(80, 'VERTICALIDAD.png', 'image/png', '82072', 'PROYECTOS', 'AGRICULTURA', 2, 80000, 'Segunda fase de investigación en la germinación natural modificada de semillas con raíces angulares para la proliferación de su crecimiento en la agricultura vertical'),
(81, 'HIDROGENO.png', 'image/png', '22223', 'PROYECTOS', 'ATMOSFERA', 1, 95000, 'Estudio del hidrógeno como fuente energética y lanazamiento a la estratósfera para su producción teórica de lluvias al reaccionar con el oxígeno'),
(82, 'NUBES.png', 'image/png', '95544', 'PROYECTOS', 'ATMOSFERA', 2, 93000, 'Tratamiento e investigación de atmósferas ácidas del planeta Manpertos para reducir su acidez a la nulidad con la filtración de sulfuros y carburos naturales presentes en su atmósfera'),
(83, 'SEGUIMIENTO.png', 'image/png', '12211', 'PROYECTOS', 'CARRETERAS', 3, 72000, 'estudio de composición férrea de asfaltos para emplazamientos con movimientos sísmicos severos, evitando resquebrajamiento superficial, rotura por fatiga y otorgando flexibilidad al desprenderse el terreno sobre la que se construye la carretera'),
(84, 'COLONOS.png', 'image/png', '37264', 'PROYECTOS', 'COLONIZACION', 4, 99500, 'Proyecto del estudio de atmósferas planetarias para condicionar la vida en sus superficies. '),
(85, 'PIEDRA.png', 'image/png', '137785', 'PROYECTOS', 'COLONIZACION', 12, 30111, 'estudio geológico y geográfico de terrenos planetarios para el asentamiento de bases de investigación y desarrollo. Aplicación en tambien en suelos subterráneos '),
(86, 'ASENTAMIENTO.png', 'image/png', '57952', 'PROYECTOS', 'METEORITO', 2, 99950, 'Investigación del espacio profundo instalando emplazamientos fijos satelitales en los meteoritos más reconocidos del sistema solar'),
(87, 'BIOQUIMICA.png', 'image/png', '19350', 'PROYECTOS', 'METEORITO', 5, 81344, 'Analsis de muestras bioquímicas del suelo de los meteoritos durante su trayectoria más cercana al planeta base de estudio. Sistema de alcance de hasta una semana luz'),
(88, 'HIDRONAVES.png', 'image/png', '32606', 'PROYECTOS', 'SUBMARINISMO', 3, 88810, 'Investigación estructural en el diseño de naves submarinas para alcanzar los 15 kilómetros de profundidad sin sufrir las consecuencias de la presión hidrostática'),
(89, 'PROFUNDO.png', 'image/png', '27079', 'PROYECTOS', 'SUBMARINISMO', 3, 99111, 'Estudio de la instalación de asentamientos fijos a más de 10000 metros de profundidad submarina'),
(90, 'AUTONOMIA.png', 'image/png', '10716', 'PROYECTOS', 'PROGRAMACION', 6, 41333, 'Investigación en inteligencia artificial para la plena autonomía de satélites espaciales en la búsqueda de vida orgánica en el espacio profundo'),
(91, 'CAMINOS.png', 'image/png', '37648', 'PROYECTOS', 'PROFUNDIDADES', 2, 65599, 'Investigación submarina para el trazado de autopistas flotantes qu crucen los océanos con refuerzo estructural para seismos y tsunamis de magnitud moderada, sin afectar al ecosistema marino'),
(92, 'ROBOTIZADO.png', 'image/png', '34183', 'SERVICIOS', 'ECOLOGIA', 30, 141.75, 'Servicios de automatización de las labores del campo con inteligencia artificial para localizar zonas pendientes de procesar');

-- --------------------------------------------------------

--
-- Indices de la tabla `imagenesinterfazweb`
--
ALTER TABLE `imagenesinterfazweb`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de la tabla `clientespedidos`
--
ALTER TABLE `clientespedidos`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

-- --------------------------------------------------------

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
