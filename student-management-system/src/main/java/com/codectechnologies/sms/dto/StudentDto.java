package com.codectechnologies.sms.dto;

import jakarta.validation.constraints.*;

/**
 * Data Transfer Object (DTO) for handling form submissions
 * in Thymeleaf with validation constraints.
 */
public class StudentDto {

    private Long id;

    @NotBlank(message = "Student ID is required (e.g., B25DS001)")
    @Pattern(regexp = "^[A-Z0-9]{4,15}$", message = "Student ID must be 4-15 uppercase alphanumeric characters (e.g., B25DS001)")
    private String studentId;

    @NotBlank(message = "Full Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String fullName;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please enter a valid email address (e.g., student@example.com)")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9+()\\-\\s]{10,15}$", message = "Please enter a valid phone number (10 to 15 digits)")
    private String phoneNumber;

    @NotBlank(message = "Please select a branch or department")
    private String branch;

    @NotBlank(message = "Please select the year of study")
    private String yearOfStudy;

    @NotNull(message = "Marks are required")
    @Min(value = 0, message = "Marks cannot be less than 0")
    @Max(value = 100, message = "Marks cannot exceed 100")
    private Double marks;

    public StudentDto() {
    }

    public StudentDto(Long id, String studentId, String fullName, String email, 
                      String phoneNumber, String branch, String yearOfStudy, Double marks) {
        this.id = id;
        this.studentId = studentId;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.branch = branch;
        this.yearOfStudy = yearOfStudy;
        this.marks = marks;
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
        this.studentId = studentId != null ? studentId.trim().toUpperCase() : null;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName != null ? fullName.trim() : null;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email != null ? email.trim().toLowerCase() : null;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber != null ? phoneNumber.trim() : null;
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
    }
}
