-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2021 at 01:39 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meh`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed-clients`
--

CREATE TABLE `failed-clients` (
  `CPUKey` varchar(32) DEFAULT NULL,
  `IP` varchar(32) DEFAULT NULL,
  `KeyVault` blob DEFAULT NULL,
  `Num` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guestmode`
--

CREATE TABLE `guestmode` (
  `Username` varchar(32) DEFAULT NULL,
  `Email` varchar(32) DEFAULT NULL,
  `CPUKey` varchar(32) DEFAULT NULL,
  `Salt` varchar(32) DEFAULT NULL,
  `IP` varchar(15) DEFAULT NULL,
  `ExpireDate` datetime DEFAULT '0001-01-01 00:00:00',
  `TitleID` text DEFAULT NULL,
  `Enabled` tinyint(1) DEFAULT NULL,
  `BannedUser` int(11) NOT NULL,
  `KeYVault` blob DEFAULT NULL,
  `uid` int(11) NOT NULL,
  `AddedBy` varchar(255) NOT NULL,
  `DaysLeft` int(31) NOT NULL,
  `KVDays` int(11) NOT NULL DEFAULT 0,
  `KVTime` time NOT NULL DEFAULT '00:00:00',
  `KVHash` varchar(255) DEFAULT NULL,
  `EditedBy` varchar(255) NOT NULL,
  `discord` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guestmode`
--

INSERT INTO `guestmode` (`Username`, `Email`, `CPUKey`, `Salt`, `IP`, `ExpireDate`, `TitleID`, `Enabled`, `BannedUser`, `KeYVault`, `uid`, `AddedBy`, `DaysLeft`, `KVDays`, `KVTime`, `KVHash`, `EditedBy`, `discord`) VALUES
('Cykotic', 'email@email', '1234ABCD5678EFGH9012IJKL34546MNO', '0000000', '1.1.1.1', '2035-08-14 16:45:22', '000000000', 1, 1, 0x31, 6599, '0000', 0, 0, '00:00:00', '66666', '554564', '253986575682109441');

-- --------------------------------------------------------

--
-- Table structure for table `modulesettings`
--

CREATE TABLE `modulesettings` (
  `Username` varchar(255) NOT NULL,
  `Freemode` int(1) NOT NULL DEFAULT 0,
  `ModuleCheck` int(1) NOT NULL DEFAULT 1,
  `UserCount` int(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `modulesettings`
--

INSERT INTO `modulesettings` (`Username`, `Freemode`, `ModuleCheck`, `UserCount`) VALUES
('', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `panel-users`
--

CREATE TABLE `panel-users` (
  `userID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `server-keyvaults`
--

CREATE TABLE `server-keyvaults` (
  `Index` int(11) NOT NULL,
  `SerialNumber` varchar(255) NOT NULL,
  `ConsoleID` varchar(255) NOT NULL,
  `KVHash` varchar(255) NOT NULL,
  `FirstOnline` datetime NOT NULL,
  `KVTime` time NOT NULL,
  `KVDays` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `servertokens`
--

CREATE TABLE `servertokens` (
  `TokenID` int(11) NOT NULL,
  `Token` varchar(255) NOT NULL,
  `TokenTime` int(255) NOT NULL,
  `GeneratedBy` varchar(255) NOT NULL,
  `GeneratedTime` varchar(255) NOT NULL,
  `Status` int(11) NOT NULL,
  `UsedBy` varchar(32) NOT NULL,
  `UsedTime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guestmode`
--
ALTER TABLE `guestmode`
  ADD UNIQUE KEY `id` (`uid`);

--
-- Indexes for table `panel-users`
--
ALTER TABLE `panel-users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `servertokens`
--
ALTER TABLE `servertokens`
  ADD PRIMARY KEY (`TokenID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `guestmode`
--
ALTER TABLE `guestmode`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6600;

--
-- AUTO_INCREMENT for table `panel-users`
--
ALTER TABLE `panel-users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `servertokens`
--
ALTER TABLE `servertokens`
  MODIFY `TokenID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
