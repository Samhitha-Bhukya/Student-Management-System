-- =====================================================================
-- Seed Data for Student Management System
-- Codec Technologies Java Internship Project
-- =====================================================================

USE student_db;

INSERT INTO students (student_id, full_name, email, phone_number, branch, year_of_study, marks, grade, status, created_at, updated_at)
VALUES 
('B25DS001', 'Aarav Sharma', 'aarav.sharma@example.com', '+91 9876543210', 'Data Science & AI', '3rd Year', 94.5, 'A+', 'Passed', NOW(), NOW()),
('B25CS002', 'Priya Patel', 'priya.patel@example.com', '+91 9876543211', 'Computer Science & Engineering', '4th Year', 86.0, 'A', 'Passed', NOW(), NOW()),
('B25IT003', 'Rohan Verma', 'rohan.verma@example.com', '+91 9876543212', 'Information Technology', '2nd Year', 76.5, 'B', 'Passed', NOW(), NOW()),
('B25EC004', 'Ananya Iyer', 'ananya.iyer@example.com', '+91 9876543213', 'Electronics & Communication', '3rd Year', 68.0, 'C', 'Passed', NOW(), NOW()),
('B25ME005', 'Vikram Singh', 'vikram.singh@example.com', '+91 9876543214', 'Mechanical Engineering', '1st Year', 54.0, 'D', 'Passed', NOW(), NOW()),
('B25CS006', 'Sneha Kulkarni', 'sneha.kulkarni@example.com', '+91 9876543215', 'Computer Science & Engineering', '2nd Year', 91.0, 'A+', 'Passed', NOW(), NOW()),
('B25EE007', 'Rahul Nair', 'rahul.nair@example.com', '+91 9876543216', 'Electrical Engineering', '1st Year', 42.5, 'F', 'Failed', NOW(), NOW()),
('B25DS008', 'Meera Reddy', 'meera.reddy@example.com', '+91 9876543217', 'Data Science & AI', '4th Year', 82.0, 'A', 'Passed', NOW(), NOW());
