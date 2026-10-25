package com.codectechnologies.sms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

/**
 * Student Entity representing the 'students' table in MySQL database.
 * 
 * Uses JPA (Java Persistence API) annotations for ORM mapping.
 */
@Entity
@Table(name = "students", uniqueConstraints = {
    @UniqueConstraint(columnNames = "student_id", name = "uk_student_id"),
    @UniqueConstraint(columnNames = "email", name = "uk_student_email")
})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Student ID is required (e.g., B25DS001)")
    @Pattern(regexp = "^[A-Z0-9]{5,15}$", message = "Student ID must be 5-15 alphanumeric characters (e.g., B25DS001)")
    @Column(name = "student_id", nullable = false, unique = true, length = 20)
    private String studentId;

    @NotBlank(message = "Full Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address")
    @Column(name = "email", nullable = false, unique = true, length = 120)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9+()\\-\\s]{10,15}$", message = "Phone number must be a valid 10-15 digit number")
    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @NotBlank(message = "Branch/Department is required")
    @Column(name = "branch", nullable = false, length = 50)
    private String branch;

    @NotBlank(message = "Year of study is required")
    @Column(name = "year_of_study", nullable = false, length = 20)
    private String yearOfStudy;

    @NotNull(message = "Marks are required")
    @Min(value = 0, message = "Marks cannot be less than 0")
    @Max(value = 100, message = "Marks cannot exceed 100")
    @Column(name = "marks", nullable = false)
    private Double marks;

    @Column(name = "grade", nullable = false, length = 5)
    private String grade;

    @Column(name = "status", nullable = false, length = 10)
    private String status; // "Passed" or "Failed"

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Default No-Arg Constructor (Required by JPA/Hibernate)
    public Student() {
    }

    // All-Args Parameterized Constructor
    public Student(String studentId, String fullName, String email, String phoneNumber, 
                   String branch, String yearOfStudy, Double marks) {
        this.studentId = studentId;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.branch = branch;
        this.yearOfStudy = yearOfStudy;
        this.marks = marks;
        calculateGradeAndStatus();
    }

    /**
     * Automatically calculate Grade and Status based on marks before inserting or updating.
     * Grade scale:
     *   90–100: A+
     *   80–89:  A
     *   70–79:  B
     *   60–69:  C
     *   50–59:  D
     *   0–49:   F
     */
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        calculateGradeAndStatus();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
        calculateGradeAndStatus();
    }

    public void calculateGradeAndStatus() {
        if (this.marks == null) {
            this.grade = "N/A";
            this.status = "Pending";
            return;
        }

        double score = this.marks;
        if (score >= 90.0) {
            this.grade = "A+";
        } else if (score >= 80.0) {
            this.grade = "A";
        } else if (score >= 70.0) {
            this.grade = "B";
        } else if (score >= 60.0) {
            this.grade = "C";
        } else if (score >= 50.0) {
            this.grade = "D";
        } else {
            this.grade = "F";
        }

        // Passed if 50 or above, otherwise Failed
        this.status = (score >= 50.0) ? "Passed" : "Failed";
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(String yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public Double getMarks() {
        return marks;
    }

    public void setMarks(Double marks) {
        this.marks = marks;
        calculateGradeAndStatus();
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", studentId='" + studentId + '\'' +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", branch='" + branch + '\'' +
                ", yearOfStudy='" + yearOfStudy + '\'' +
                ", marks=" + marks +
                ", grade='" + grade + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
