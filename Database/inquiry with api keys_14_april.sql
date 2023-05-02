-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2023 at 03:31 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `apikeys`
--

CREATE TABLE `apikeys` (
  `id` int(11) NOT NULL,
  `value` varchar(250) NOT NULL,
  `api_limit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `apikeys`
--

INSERT INTO `apikeys` (`id`, `value`, `api_limit`) VALUES
(1, '3010c991-6f77-4d1a-8041-88a6a598190a', 3),
(2, '764b39a7-7b17-41ca-94b5-c5bee0655343', 3),
(3, '8890001d-7194-4045-ac6e-d11ddbeca11b', 3),
(4, 'b02c7a5d-bff1-4d0a-89ba-2c8d703d646e', 3),
(5, 'c37866b7-069a-44b7-9dfa-d0976c611dd9', 3),
(6, 'da445ef5-24c3-4358-bd9b-b0857b1143e9', 3),
(7, '5a9f1bfb-a0f7-4011-a5a7-97968abba172', 3),
(8, '02f91da7-8373-439d-ad0d-aea5bf127126', 3),
(9, '41e7743a-8942-40cf-b545-02a0c254c604', 3),
(10, '39b4cada-a1e7-48c0-9377-d93469f1227a', 3),
(11, '6529ac4e-a2c4-4755-adb8-cb26ed298b50', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apikeys`
--
ALTER TABLE `apikeys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_key` (`value`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apikeys`
--
ALTER TABLE `apikeys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
