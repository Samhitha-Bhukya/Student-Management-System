package com.codectechnologies.sms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application Entry Point
 * 
 * Project: Student Management System
 * Organization: Codec Technologies (Java Internship)
 * Technologies: Java 17, Spring Boot 3.x, Spring Data JPA, MySQL, Thymeleaf
 * 
 * @author Intern - Codec Technologies
 */
@SpringBootApplication
public class StudentManagementSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentManagementSystemApplication.class, args);
        System.out.println("=============================================================");
        System.out.println("  Student Management System is RUNNING successfully!");
        System.out.println("  Open your browser at: http://localhost:8080");
        System.out.println("=============================================================");
    }
}
