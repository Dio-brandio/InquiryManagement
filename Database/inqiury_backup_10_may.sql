-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2023 at 08:58 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `apiKeyAssign` (IN `uid` INT, IN `key_value` VARCHAR(250))   BEGIN
	DECLARE isuser INT;
	
	SET isuser = (SELECT u_id FROM apikeys WHERE u_id = uid);

	IF isuser IS NULL THEN
		INSERT INTO apikeys (value, api_hit_count, u_id)
		VALUES (key_value, 0, uid);
	ELSE
		UPDATE apikeys SET value = key_value WHERE u_id = uid;
	END IF;
	
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `checkApiKeyAndHit` (IN `key_value` VARCHAR(250))   BEGIN
	DECLARE isOk int;
    DECLARE apiLimit int;
    DECLARE apiCount int;
    
    SELECT id, api_limit,api_hit_count INTO isOk, apiLimit,apiCount from apikeys 
    WHERE value=key_value;
    
    IF(isOk is NOT null AND apiCount < apiLimit  ) THEN
    	SELECT * from inquires;
     	UPDATE apikeys set api_hit_count=(api_hit_count+1) where id=isOk;
    ELSE
   	 SELECT 'your api key is exhusted' as message;
     END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllBranchesByBranchId` (IN `branchid` INT)   BEGIN
    IF(branchid IS NULL) THEN
        SELECT * FROM `branch`;
    ELSE
        SELECT * FROM `branch` WHERE `id` =branchid;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllInquiresByBranchId` (IN `branchid` INT, IN `iid` INT)   BEGIN
    IF(branchid IS NULL and iid is null) THEN
       select i.*,b.name as branchname from inquires i
       inner join branch b on b.id=i.branch;
    ELSEIF(branchid IS NULL and iid is NOT null) THEN
      select i.*,b.name as branchname from inquires i 
      inner join branch b on 
      b.id=i.branch 
      where i.id =iid;
    ELSEIF(branchid is not null and iid is null) THEN
      select i.*,b.name as branchname from inquires i
       inner join branch b on b.id=i.branch 
       where b.id = branchid;
    ELSE   
       select i.*,b.name as branchname from inquires i
       inner join branch b on b.id=i.branch 
       where b.id = branchid and i.id=iid;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllUsersBranchId` (IN `branchid` INT, IN `uid` INT)   BEGIN
    IF(branchid IS NULL and uid is null) THEN
       select u.*,u2.fname as createdBy,  b.name as branchname 
       from users u
       join users u2 on u.created_by=u2.id
       INNER join branch b on b.id =u.branchid;
    ELSEif(branchid IS NULL and uid is not null) then
      select u.*,u2.fname as createdBy,b.name as branchname from users u
       join users u2 on u.created_by=u2.id
       inner join branch b on b.id=u.branchid
       where u.id=uid;
    ELSEIF(branchid IS not NULL and uid is null) THEN
    select u.*,u2.fname as createdBy,b.name as branchname from users u
     join users u2 on u.created_by=u2.id
       inner join branch b on b.id=u.branchid
       where u.branchid=branchid;
    ELSE 
    select u.*,u2.fname as createdBy,b.name as branchname from users u
     join users u2 on u.created_by=u2.id
       inner join branch b on b.id=u.branchid
       where u.branchid=branchid and u.id =uid;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `apikeys`
--

CREATE TABLE `apikeys` (
  `id` int(11) NOT NULL,
  `value` varchar(250) NOT NULL,
  `api_hit_count` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `api_limit` int(11) NOT NULL DEFAULT 10
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `apikeys`
--

INSERT INTO `apikeys` (`id`, `value`, `api_hit_count`, `u_id`, `api_limit`) VALUES
(1, '642957bb-2b90-4006-81be-7f41daa4f037', 13, 1, 13);

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `contact` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `name`, `email`, `contact`, `address`, `created_at`) VALUES
(1, 'Nikol', 'branch@nikol', '123456789', 'nikol', '2023-04-07 22:22:27'),
(2, 'odhav', 'branch@odhav', '123465789', 'odhav', '2023-04-07 22:41:01'),
(3, 'Vastral', 'branch@vastral', '123465879', 'vastral , ahmedabad', '2023-04-08 10:41:40'),
(4, 'naroda', 'branch@naroda', '789456123', 'naroda', '2023-04-08 12:37:19');

-- --------------------------------------------------------

--
-- Table structure for table `inquires`
--

CREATE TABLE `inquires` (
  `id` int(11) NOT NULL,
  `fname` varchar(250) NOT NULL,
  `lname` varchar(250) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(250) DEFAULT NULL,
  `refrence` varchar(250) DEFAULT NULL,
  `branch` int(11) NOT NULL,
  `inquiry_date` datetime NOT NULL,
  `upcoming_date` datetime DEFAULT NULL,
  `course` varchar(300) NOT NULL,
  `feedback` text NOT NULL,
  `addedby` int(11) NOT NULL,
  `intrested` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inquires`
--

INSERT INTO `inquires` (`id`, `fname`, `lname`, `contact`, `email`, `refrence`, `branch`, `inquiry_date`, `upcoming_date`, `course`, `feedback`, `addedby`, `intrested`, `created_at`) VALUES
(1, 'sanjay', 'nagar', '70443295329', 'sanjay@sanja', 'me', 1, '2023-04-08 00:00:00', '2023-04-16 00:00:00', 'python', 'nice', 1, 'yes', '2023-04-08 18:35:15'),
(2, 'Mohit', 'Nagar', '192005050', 'mohit@gmail', 'sanjay', 2, '2023-04-13 00:00:00', '2023-04-16 00:00:00', 'Web Designing , Networking', 'This is a nice Company', 1, 'yes', '2023-04-08 19:28:22'),
(3, 'New Inquiry', 'Last Name', '78946132', 'nice@mail', 'sanjay', 3, '2023-04-13 00:00:00', '2023-04-15 00:00:00', 'Nooiice', 'noooice', 1, 'yes', '2023-04-13 10:54:15'),
(7, 'nilkanth', 'tandel', '23165487', 'tandel@gmail.com', 'sdaf', 2, '2023-04-14 00:00:00', '2023-04-15 00:00:00', 'sdaf', 'sdafsaf', 1, 'yes', '2023-04-14 17:03:40'),
(8, 'nilkanth', 'tandel', '23165487', 'tandel@gmail.com', 'sdaf', 2, '2023-04-14 00:00:00', '2023-04-15 00:00:00', 'sdaf', 'sdafsaf', 1, 'yes', '2023-04-14 17:03:58'),
(9, 'test', 'ste', 'ser', 'test@test2', 'sdf', 2, '2023-04-14 00:00:00', '2023-04-17 00:00:00', 'sdfs', 'afsaf', 1, 'no', '2023-04-14 17:05:03'),
(12, 'created by', 'sanjay', '78956546', 's@s', 'sanjay', 4, '2023-04-12 00:00:00', '2023-04-25 00:00:00', 'saf', 'sdafsdafsa', 1, 'yes', '2023-04-24 19:03:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `fname` varchar(250) NOT NULL,
  `lname` varchar(250) NOT NULL,
  `branchid` int(11) DEFAULT NULL,
  `role` varchar(250) NOT NULL,
  `created_by` int(11) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `fname`, `lname`, `branchid`, `role`, `created_by`, `contact`, `created_at`) VALUES
(1, 'admin@gmail.com', '123', 'Sanjay', 'Nagar', NULL, 'admin', 0, '9989898485', '2023-04-07 22:19:21'),
(2, 'mohit@managernikol', '123', 'mohit', 'nagar', 1, 'manager', 1, '4556123', '2023-04-07 22:31:19'),
(3, 'mukesh@employee', '123', 'mukesh', 'ambaani', 1, 'employee', 2, '123456789', '2023-04-07 22:33:33'),
(4, 'manager@naroda', '123', 'Akshay', 'Patil', 4, 'manager', 1, '78956546', '2023-04-08 12:39:48'),
(5, 'chat@gpt4', '123', 'Manav', 'GPT', 3, 'employee', 4, '4556123', '2023-04-08 12:42:27'),
(8, 'nice@nicewithnice', '123', 'nagar', 'sanjay', 2, 'employee', 1, '78956546', '2023-04-24 19:02:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apikeys`
--
ALTER TABLE `apikeys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_key` (`value`),
  ADD KEY `user_api_key` (`u_id`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_branch_email` (`email`);

--
-- Indexes for table `inquires`
--
ALTER TABLE `inquires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inquiry_branch_id` (`branch`),
  ADD KEY `inquiry_user_id` (`addedby`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD KEY `branchid` (`branchid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apikeys`
--
ALTER TABLE `apikeys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `inquires`
--
ALTER TABLE `inquires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `apikeys`
--
ALTER TABLE `apikeys`
  ADD CONSTRAINT `user_api_key` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `inquires`
--
ALTER TABLE `inquires`
  ADD CONSTRAINT `inquiry_branch_id` FOREIGN KEY (`branch`) REFERENCES `branch` (`id`),
  ADD CONSTRAINT `inquiry_user_id` FOREIGN KEY (`addedby`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`branchid`) REFERENCES `branch` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
