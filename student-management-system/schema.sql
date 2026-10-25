-- =====================================================================
-- Database Schema for Student Management System
-- Codec Technologies Java Internship Project
-- Target Database: MySQL 8.x
-- =====================================================================

-- 1. Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS student_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- 2. Switch to student_db database
USE student_db;

-- 3. Create the 'students' table matching JPA entity annotations
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    branch VARCHAR(50) NOT NULL,
    year_of_study VARCHAR(20) NOT NULL,
    marks DOUBLE NOT NULL,
    grade VARCHAR(5) NOT NULL,
    status VARCHAR(10) NOT NULL,
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    
    -- Unique Constraints to prevent duplicate Student IDs and Emails
    CONSTRAINT uk_student_id UNIQUE (student_id),
    CONSTRAINT uk_student_email UNIQUE (email),
    
    -- Check Constraint for Marks between 0 and 100
    CONSTRAINT chk_marks_range CHECK (marks >= 0.0 AND marks <= 100.0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Create Indexes for fast searching by ID, name, branch and grade
CREATE INDEX idx_students_student_id ON students(student_id);
CREATE INDEX idx_students_full_name ON students(full_name);
CREATE INDEX idx_students_branch ON students(branch);
CREATE INDEX idx_students_grade ON students(grade);
CREATE INDEX idx_students_marks ON students(marks);
