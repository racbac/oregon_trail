-- phpMyAdmin SQL Dump
-- version 4.0.10.19
-- https://www.phpmyadmin.net
--
-- Host: studentdb-maria.gl.umbc.edu
-- Generation Time: May 16, 2017 at 08:59 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 5.4.44

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bac2`
--

-- --------------------------------------------------------

--
-- Table structure for table `oregon_top_ten`
--

CREATE TABLE IF NOT EXISTS `oregon_top_ten` (
  `key` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `name` varchar(30) NOT NULL COMMENT 'player''s name',
  `points` smallint(5) unsigned NOT NULL COMMENT 'player''s score',
  `rating` varchar(20) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;


--------------------------------------------------------

--
-- Table structure for table `tombstones`
--

CREATE TABLE IF NOT EXISTS `tombstones` (
  `key` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `name` varchar(20) NOT NULL COMMENT 'name of the dead person',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'date the person died',
  `mile` int(10) unsigned NOT NULL COMMENT 'mile at which tombstone appears',
  `epitaph` tinytext COMMENT 'short message on tombstone',
  PRIMARY KEY (`key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

