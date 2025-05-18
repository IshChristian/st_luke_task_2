CREATE DATABASE IF NOT EXISTS st_luke_hospital;
USE st_luke_hospital;

-- Create Posts table
CREATE TABLE IF NOT EXISTS posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    post_name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Create Staff table
CREATE TABLE IF NOT EXISTS staff (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    post_id INT,
    salary DECIMAL(10,2),
    department VARCHAR(50),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'hr', 'doctor', 'accountant') NOT NULL,
    employee_id INT UNIQUE,
    FOREIGN KEY (employee_id) REFERENCES staff(employee_id)
);

-- Insert sample posts
INSERT INTO posts (post_name, description) VALUES
('Doctor', 'Medical practitioner'),
('Nurse', 'Nursing staff'),
('Receptionist', 'Front desk staff'),
('Pharmacist', 'Medication specialist');
