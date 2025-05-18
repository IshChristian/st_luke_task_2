-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 18, 2025 at 08:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `st_luke`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `phone` int(20) NOT NULL,
  `password` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `phone`, `password`) VALUES
(1, 0, 123);

-- --------------------------------------------------------

--
-- Table structure for table `Appointment`
--

CREATE TABLE `Appointment` (
  `aid` int(11) NOT NULL,
  `pid` int(36) NOT NULL,
  `did` int(36) NOT NULL,
  `appointment_date` datetime NOT NULL,
  `number` int(2) NOT NULL,
  `status` enum('Scheduled','Completed','Cancelled','No-Show') DEFAULT 'Scheduled',
  `reason` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Appointment`
--

INSERT INTO `Appointment` (`aid`, `pid`, `did`, `appointment_date`, `number`, `status`, `reason`, `notes`, `created_at`) VALUES
(1, 1, 1, '2023-06-17 00:00:00', 1, 'Scheduled', 'Allergy consultation', 'Seasonal allergies', '2025-05-15 21:51:25'),
(2, 2, 1, '2023-06-17 00:00:00', 2, 'Scheduled', 'Allergy consultation', 'Seasonal allergies', '2025-05-15 21:51:47'),
(3, 2, 1, '2023-06-18 00:00:00', 1, 'Scheduled', 'Allergy consultation', 'Seasonal allergies', '2025-05-15 21:51:56'),
(4, 3, 1, '2023-06-18 00:00:00', 2, 'Scheduled', 'Allergy consultation', 'Seasonal allergies', '2025-05-15 21:54:19');

-- --------------------------------------------------------

--
-- Table structure for table `Doctor`
--

CREATE TABLE `Doctor` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `specialization` varchar(100) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Patient`
--

CREATE TABLE `Patient` (
  `pid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Patient`
--

INSERT INTO `Patient` (`pid`, `name`, `date_of_birth`, `gender`, `phone`, `password`, `role`, `created_at`) VALUES
(1, 'johnDoe', '2025-01-01', 'Male', '078000000', '123', 'patient', '2025-05-15 11:27:11'),
(2, 'janeDoe', '2025-01-01', 'Female', '078000000', '123', 'patient', '2025-05-15 11:36:13'),
(3, 'janesDoe', '2025-01-01', 'Female', '078000000', '123', 'patient', '2025-05-15 12:55:16'),
(4, 'Ishimwe Christian', '2025-05-15', 'Male', '0781212121', '123', 'patient', '2025-05-15 12:59:30'),
(6, 'Whitney Johns', '2025-05-15', 'Female', '078323235', '123', 'patient', '2025-05-15 13:01:16'),
(7, 'munezero anathole', '2025-05-15', 'Male', '0898888888', '123', 'patient', '2025-05-15 13:02:11'),
(8, 'name', '2025-05-15', 'Male', '07812121212', '123', 'patient', '2025-05-15 13:25:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Appointment`
--
ALTER TABLE `Appointment`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `Doctor`
--
ALTER TABLE `Doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Patient`
--
ALTER TABLE `Patient`
  ADD PRIMARY KEY (`pid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Appointment`
--
ALTER TABLE `Appointment`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Doctor`
--
ALTER TABLE `Doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Patient`
--
ALTER TABLE `Patient`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
