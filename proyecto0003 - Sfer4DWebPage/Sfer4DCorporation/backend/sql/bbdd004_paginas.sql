-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-01-2025 a las 15:09:13
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
-- Base de datos: `bbdd004_paginas`
-- Se creara aqui la base de datos y se usara para la generación de las tablas
CREATE DATABASE IF NOT EXISTS `bbdd004_paginas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bbdd004_paginas`;
-- ------------------------------------------------------------
-- Base de datos: `bbdd004_paginas` con las tablas siguientes
-- ------------------------------------------------------------
-- Tabla `fondosimagenes`
-- ------------------------------------------------------------

CREATE TABLE `fondosimagenes` (
  `ID` int(3) NOT NULL,
  `NOMBRE` varchar(100) DEFAULT NULL,
  `RUTA` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `fondosimagenes` (`ID`, `NOMBRE`, `RUTA`) VALUES
(1, 'EDIFICIOS.png', 'assets/010_imagenesfondos/EDIFICIOS.png');

ALTER TABLE `fondosimagenes`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `fondosimagenes`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


/*******************************************************************************************/
/******************   PARA TODAS LAS TABLAS DE LA BASE DE DATOS CREADA  ********************/
/*******************************************************************************************/

ALTER TABLE `fondosimagenes` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;