-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2023 at 06:58 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inqiury`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllBranchesByBranchId` (IN `branchid` INT)   BEGIN
    IF(branchid IS NULL) THEN
        SELECT * FROM `branch`;
    ELSE
        SELECT * FROM `branch` WHERE `id` =branchid;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllInquiresByBranchId` (IN `branchid` INT)   BEGIN
    IF(branchid IS NULL) THEN
       select i.*,b.name as branchname from inquires i
       inner join branch b on b.id=i.branch;
    ELSE
      select i.*,b.name as branchname from inquires i 
      inner join branch b on 
      b.id=i.branch where branch=branchid;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllUsersBranchId` (IN `branchid` INT, IN `uid` INT)   BEGIN
    IF(branchid IS NULL and uid is null) THEN
       select u.id,u.fname,u.lname,u.email,u.branchid,
       u.role,u.contact,u.created_at,
       b.name as branchname from users u
       inner join branch b on b.id=u.branchid;
    ELSEif(branchid IS NULL and uid is not null) then
      select u.id,u.fname,u.lname,u.email,u.branchid,
       u.role,u.contact,u.created_at,b.name as branchname from users u
       inner join branch b on b.id=u.branchid
       where u.id=uid;
    ELSEIF(branchid IS not NULL and uid is null) THEN
    select u.id,u.fname,u.lname,u.email,u.branchid,
       u.role,u.contact,u.created_at,b.name as branchname from users u
       inner join branch b on b.id=u.branchid
       where u.branchid=branchid;
    ELSE 
    select u.id,u.fname,u.lname,u.email,u.branchid,
       u.role,u.contact,u.created_at,b.name as branchname from users u
       inner join branch b on b.id=u.branchid
       where u.branchid=branchid and u.id =uid;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--
-- Error reading structure for table inqiury.branch: #1932 - Table &#039;inqiury.branch&#039; doesn&#039;t exist in engine
-- Error reading data for table inqiury.branch: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `inqiury`.`branch`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `inquires`
--
-- Error reading structure for table inqiury.inquires: #1932 - Table &#039;inqiury.inquires&#039; doesn&#039;t exist in engine
-- Error reading data for table inqiury.inquires: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `inqiury`.`inquires`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- Error reading structure for table inqiury.users: #1932 - Table &#039;inqiury.users&#039; doesn&#039;t exist in engine
-- Error reading data for table inqiury.users: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `inqiury`.`users`&#039; at line 1
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
