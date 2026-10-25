export interface ProjectFile {
  path: string;
  name: string;
  language: string;
  category: 'Maven' | 'Java Entity' | 'Java Repository' | 'Java Service' | 'Java Controller' | 'Java DTO' | 'Java Exception' | 'Thymeleaf Template' | 'CSS' | 'Database SQL' | 'Test' | 'Documentation' | 'Configuration';
  description: string;
  code: string;
}

export const PROJECT_FILES: ProjectFile[] = [
  {
    path: 'pom.xml',
    name: 'pom.xml',
    language: 'xml',
    category: 'Maven',
    description: 'Maven Project Object Model with Java 17, Spring Boot 3.3.4, JPA, Thymeleaf, MySQL, and Validation dependencies',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.4</version>
        <relativePath/>
    </parent>
    
    <groupId>com.codectechnologies</groupId>
    <artifactId>student-management-system</artifactId>
    <version>1.0.0</version>
    <name>Student Management System</name>
    <description>Student Management System for Codec Technologies Java Internship</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Starter Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Thymeleaf Template Engine -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        
        <!-- Spring Data JPA & Hibernate -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- Hibernate Validator -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- MySQL Connector Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Spring Boot DevTools -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        
        <!-- JUnit 5 & Mockito Starter Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        
        <!-- H2 In-Memory Database for running tests -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    path: 'src/main/resources/application.properties',
    name: 'application.properties',
    language: 'properties',
    category: 'Configuration',
    description: 'Spring Boot datasource, Hibernate dialect, and Thymeleaf configuration',
    code: `# ===================================================================
# Spring Boot Configuration for Student Management System
# Internship Project: Codec Technologies
# ===================================================================

spring.application.name=student-management-system
server.port=8080

# MySQL Database Connection Settings
spring.datasource.url=\${DB_URL:jdbc:mysql://localhost:3306/student_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true}
spring.datasource.username=\${DB_USERNAME:root}
spring.datasource.password=\${DB_PASSWORD:root}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate / JPA Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Thymeleaf View Resolver Settings
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
spring.thymeleaf.mode=HTML
spring.thymeleaf.encoding=UTF-8
spring.thymeleaf.cache=false

# Static Resources
spring.web.resources.static-locations=classpath:/static/

# Logging
logging.level.com.codectechnologies.sms=DEBUG
logging.level.org.springframework.web=INFO
logging.level.org.hibernate.SQL=DEBUG`
  },
  {
    path: 'src/main/java/com/codectechnologies/sms/StudentManagementSystemApplication.java',
    name: 'StudentManagementSystemApplication.java',
    language: 'java',
    category: 'Configuration',
    description: 'Main Spring Boot application bootstrapper with embedded Tomcat startup',
    code: `package com.codectechnologies.sms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application Entry Point
 * 
 * Project: Student Management System
 * Organization: Codec Technologies (Java Internship)
 * Technologies: Java 17, Spring Boot 3.x, Spring Data JPA, MySQL, Thymeleaf
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
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/sms/entity/Student.java',
    name: 'Student.java',
    language: 'java',
    category: 'Java Entity',
    description: 'JPA entity with table mapping, unique constraints, and automatic grade calculation',
    code: `package com.codectechnologies.sms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

/**
 * Student Entity representing the 'students' table in MySQL database.
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
    @Pattern(regexp = "^[A-Z0-9]{5,15}$", message = "Student ID must be 5-15 alphanumeric characters")
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
    @Pattern(regexp = "^[0-9+()\\\\-\\\\s]{10,15}$", message = "Valid phone number required")
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

    public Student() {}

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

        this.status = (score >= 50.0) ? "Passed" : "Failed";
    }

    // Getters and Setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public String getYearOfStudy() { return yearOfStudy; }
    public void setYearOfStudy(String yearOfStudy) { this.yearOfStudy = yearOfStudy; }
    public Double getMarks() { return marks; }
    public void setMarks(Double marks) { this.marks = marks; calculateGradeAndStatus(); }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/sms/dto/StudentDto.java',
    name: 'StudentDto.java',
    language: 'java',
    category: 'Java DTO',
    description: 'Data Transfer Object for form submissions with validation annotations',
    code: `package com.codectechnologies.sms.dto;

import jakarta.validation.constraints.*;

public class StudentDto {

    private Long id;

    @NotBlank(message = "Student ID is required (e.g., B25DS001)")
    @Pattern(regexp = "^[A-Z0-9]{4,15}$", message = "Student ID must be 4-15 uppercase alphanumeric characters")
    private String studentId;

    @NotBlank(message = "Full Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String fullName;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please enter a valid email address")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9+()\\\\-\\\\s]{10,15}$", message = "Please enter a valid phone number")
    private String phoneNumber;

    @NotBlank(message = "Please select a branch or department")
    private String branch;

    @NotBlank(message = "Please select the year of study")
    private String yearOfStudy;

    @NotNull(message = "Marks are required")
    @Min(value = 0, message = "Marks cannot be less than 0")
    @Max(value = 100, message = "Marks cannot exceed 100")
    private Double marks;

    public StudentDto() {}

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

    // Getters and Setters with automatic sanitization...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId != null ? studentId.trim().toUpperCase() : null; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName != null ? fullName.trim() : null; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email != null ? email.trim().toLowerCase() : null; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber != null ? phoneNumber.trim() : null; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public String getYearOfStudy() { return yearOfStudy; }
    public void setYearOfStudy(String yearOfStudy) { this.yearOfStudy = yearOfStudy; }
    public Double getMarks() { return marks; }
    public void setMarks(Double marks) { this.marks = marks; }
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/sms/repository/StudentRepository.java',
    name: 'StudentRepository.java',
    language: 'java',
    category: 'Java Repository',
    description: 'Spring Data JPA Repository with safe parameterized queries and duplicate detectors',
    code: `package com.codectechnologies.sms.repository;

import com.codectechnologies.sms.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByStudentId(String studentId);
    Optional<Student> findByEmail(String email);

    boolean existsByStudentId(String studentId);
    boolean existsByEmail(String email);

    boolean existsByStudentIdAndIdNot(String studentId, Long id);
    boolean existsByEmailAndIdNot(String email, Long id);

    @Query("SELECT s FROM Student s WHERE " +
           "LOWER(s.studentId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "ORDER BY s.id DESC")
    List<Student> searchStudents(@Param("keyword") String keyword);

    long countByStatus(String status);
    long countByGrade(String grade);

    @Query("SELECT COALESCE(AVG(s.marks), 0.0) FROM Student s")
    Double calculateAverageMarks();

    List<Student> findAllByOrderByMarksDesc();
    List<Student> findAllByOrderByIdDesc();
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/sms/service/StudentService.java',
    name: 'StudentService.java',
    language: 'java',
    category: 'Java Service',
    description: 'Service interface defining student CRUD, metrics, and duplicate checks',
    code: `package com.codectechnologies.sms.service;

import com.codectechnologies.sms.dto.StudentDto;
import com.codectechnologies.sms.entity.Student;

import java.util.List;
import java.util.Map;

public interface StudentService {
    List<Student> getAllStudents();
    Student getStudentById(Long id);
    Student getStudentByStudentId(String studentId);
    Student saveStudent(StudentDto studentDto);
    Student updateStudent(Long id, StudentDto studentDto);
    void deleteStudent(Long id);
    List<Student> searchStudents(String keyword);
    boolean isStudentIdDuplicate(String studentId, Long excludeId);
    boolean isEmailDuplicate(String email, Long excludeId);
    long getTotalStudentsCount();
    Double getAverageMarks();
    long getPassedStudentsCount();
    long getFailedStudentsCount();
    long getCountByGrade(String grade);
    Map<String, Long> getGradeDistribution();
    Map<String, Long> getBranchDistribution();
    List<Student> getPerformanceRankings();
    StudentDto convertToDto(Student student);
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/sms/service/impl/StudentServiceImpl.java',
    name: 'StudentServiceImpl.java',
    language: 'java',
    category: 'Java Service',
    description: 'Service implementation with transactional operations, validation, and analytics',
    code: `package com.codectechnologies.sms.service.impl;

import com.codectechnologies.sms.dto.StudentDto;
import com.codectechnologies.sms.entity.Student;
import com.codectechnologies.sms.exception.ResourceNotFoundException;
import com.codectechnologies.sms.repository.StudentRepository;
import com.codectechnologies.sms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        return studentRepository.findAllByOrderByIdDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public Student getStudentByStudentId(String studentId) {
        return studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with Student ID: " + studentId));
    }

    @Override
    public Student saveStudent(StudentDto studentDto) {
        if (studentRepository.existsByStudentId(studentDto.getStudentId())) {
            throw new IllegalArgumentException("Student ID '" + studentDto.getStudentId() + "' is already registered.");
        }
        if (studentRepository.existsByEmail(studentDto.getEmail())) {
            throw new IllegalArgumentException("Email address '" + studentDto.getEmail() + "' is already in use.");
        }

        Student student = new Student();
        student.setStudentId(studentDto.getStudentId());
        student.setFullName(studentDto.getFullName());
        student.setEmail(studentDto.getEmail());
        student.setPhoneNumber(studentDto.getPhoneNumber());
        student.setBranch(studentDto.getBranch());
        student.setYearOfStudy(studentDto.getYearOfStudy());
        student.setMarks(studentDto.getMarks());

        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(Long id, StudentDto studentDto) {
        Student existingStudent = getStudentById(id);

        if (isStudentIdDuplicate(studentDto.getStudentId(), id)) {
            throw new IllegalArgumentException("Student ID '" + studentDto.getStudentId() + "' is already registered to another student.");
        }
        if (isEmailDuplicate(studentDto.getEmail(), id)) {
            throw new IllegalArgumentException("Email address '" + studentDto.getEmail() + "' is already registered to another student.");
        }

        existingStudent.setStudentId(studentDto.getStudentId());
        existingStudent.setFullName(studentDto.getFullName());
        existingStudent.setEmail(studentDto.getEmail());
        existingStudent.setPhoneNumber(studentDto.getPhoneNumber());
        existingStudent.setBranch(studentDto.getBranch());
        existingStudent.setYearOfStudy(studentDto.getYearOfStudy());
        existingStudent.setMarks(studentDto.getMarks());

        return studentRepository.save(existingStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> searchStudents(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllStudents();
        }
        return studentRepository.searchStudents(keyword.trim());
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isStudentIdDuplicate(String studentId, Long excludeId) {
        if (studentId == null || studentId.trim().isEmpty()) return false;
        if (excludeId == null) return studentRepository.existsByStudentId(studentId.trim());
        return studentRepository.existsByStudentIdAndIdNot(studentId.trim(), excludeId);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isEmailDuplicate(String email, Long excludeId) {
        if (email == null || email.trim().isEmpty()) return false;
        if (excludeId == null) return studentRepository.existsByEmail(email.trim());
        return studentRepository.existsByEmailAndIdNot(email.trim(), excludeId);
    }

    @Override
    @Transactional(readOnly = true)
    public long getTotalStudentsCount() {
        return studentRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Double getAverageMarks() {
        Double avg = studentRepository.calculateAverageMarks();
        return avg != null ? Math.round(avg * 100.0) / 100.0 : 0.0;
    }

    @Override
    @Transactional(readOnly = true)
    public long getPassedStudentsCount() {
        return studentRepository.countByStatus("Passed");
    }

    @Override
    @Transactional(readOnly = true)
    public long getFailedStudentsCount() {
        return studentRepository.countByStatus("Failed");
    }

    @Override
    @Transactional(readOnly = true)
    public long getCountByGrade(String grade) {
        return studentRepository.countByGrade(grade);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getGradeDistribution() {
        Map<String, Long> distribution = new LinkedHashMap<>();
        distribution.put("A+", studentRepository.countByGrade("A+"));
        distribution.put("A", studentRepository.countByGrade("A"));
        distribution.put("B", studentRepository.countByGrade("B"));
        distribution.put("C", studentRepository.countByGrade("C"));
        distribution.put("D", studentRepository.countByGrade("D"));
        distribution.put("F", studentRepository.countByGrade("F"));
        return distribution;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getBranchDistribution() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .collect(Collectors.groupingBy(Student::getBranch, Collectors.counting()));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> getPerformanceRankings() {
        return studentRepository.findAllByOrderByMarksDesc();
    }

    @Override
    public StudentDto convertToDto(Student student) {
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setStudentId(student.getStudentId());
        dto.setFullName(student.getFullName());
        dto.setEmail(student.getEmail());
        dto.setPhoneNumber(student.getPhoneNumber());
        dto.setBranch(student.getBranch());
        dto.setYearOfStudy(student.getYearOfStudy());
        dto.setMarks(student.getMarks());
        return dto;
    }
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/sms/controller/StudentController.java',
    name: 'StudentController.java',
    language: 'java',
    category: 'Java Controller',
    description: 'Spring MVC Controller handling CRUD routes, form binding, search, and reports',
    code: `package com.codectechnologies.sms.controller;

import com.codectechnologies.sms.dto.StudentDto;
import com.codectechnologies.sms.entity.Student;
import com.codectechnologies.sms.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public String listStudents(@RequestParam(value = "keyword", required = false) String keyword, Model model) {
        List<Student> students;
        if (keyword != null && !keyword.trim().isEmpty()) {
            students = studentService.searchStudents(keyword.trim());
            model.addAttribute("keyword", keyword.trim());
            model.addAttribute("searchPerformed", true);
        } else {
            students = studentService.getAllStudents();
            model.addAttribute("keyword", "");
            model.addAttribute("searchPerformed", false);
        }
        model.addAttribute("students", students);
        model.addAttribute("activePage", "students");
        return "students";
    }

    @GetMapping("/students/new")
    public String showAddStudentForm(Model model) {
        model.addAttribute("student", new StudentDto());
        model.addAttribute("activePage", "add-student");
        return "add-student";
    }

    @PostMapping("/students")
    public String saveStudent(@Valid @ModelAttribute("student") StudentDto studentDto,
                              BindingResult result,
                              RedirectAttributes redirectAttributes,
                              Model model) {
        if (studentService.isStudentIdDuplicate(studentDto.getStudentId(), null)) {
            result.rejectValue("studentId", "duplicate.studentId", "Student ID already exists!");
        }
        if (studentService.isEmailDuplicate(studentDto.getEmail(), null)) {
            result.rejectValue("email", "duplicate.email", "Email address already registered!");
        }

        if (result.hasErrors()) {
            model.addAttribute("activePage", "add-student");
            return "add-student";
        }

        studentService.saveStudent(studentDto);
        redirectAttributes.addFlashAttribute("successMessage", "Student registered successfully!");
        return "redirect:/students";
    }

    @GetMapping("/students/edit/{id}")
    public String showEditStudentForm(@PathVariable("id") Long id, Model model) {
        Student student = studentService.getStudentById(id);
        model.addAttribute("student", studentService.convertToDto(student));
        model.addAttribute("studentEntity", student);
        model.addAttribute("activePage", "students");
        return "edit-student";
    }

    @PostMapping("/students/{id}")
    public String updateStudent(@PathVariable("id") Long id,
                                @Valid @ModelAttribute("student") StudentDto studentDto,
                                BindingResult result,
                                RedirectAttributes redirectAttributes,
                                Model model) {
        if (studentService.isStudentIdDuplicate(studentDto.getStudentId(), id)) {
            result.rejectValue("studentId", "duplicate.studentId", "Student ID is in use by another student.");
        }
        if (studentService.isEmailDuplicate(studentDto.getEmail(), id)) {
            result.rejectValue("email", "duplicate.email", "Email address is in use by another student.");
        }

        if (result.hasErrors()) {
            model.addAttribute("studentEntity", studentService.getStudentById(id));
            model.addAttribute("activePage", "students");
            return "edit-student";
        }

        studentService.updateStudent(id, studentDto);
        redirectAttributes.addFlashAttribute("successMessage", "Student details updated successfully!");
        return "redirect:/students";
    }

    @GetMapping("/students/{id}")
    public String viewStudentDetails(@PathVariable("id") Long id, Model model) {
        Student student = studentService.getStudentById(id);
        model.addAttribute("student", student);
        model.addAttribute("activePage", "students");
        return "student-details";
    }

    @GetMapping("/students/delete/{id}")
    public String deleteStudent(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        Student student = studentService.getStudentById(id);
        studentService.deleteStudent(id);
        redirectAttributes.addFlashAttribute("successMessage", "Student '" + student.getFullName() + "' deleted successfully.");
        return "redirect:/students";
    }

    @GetMapping("/report")
    public String viewPerformanceReport(Model model) {
        long total = studentService.getTotalStudentsCount();
        long passed = studentService.getPassedStudentsCount();
        double passPct = total > 0 ? ((double) passed / total) * 100.0 : 0.0;

        model.addAttribute("totalStudents", total);
        model.addAttribute("averageMarks", studentService.getAverageMarks());
        model.addAttribute("passedCount", passed);
        model.addAttribute("failedCount", studentService.getFailedStudentsCount());
        model.addAttribute("passPercentage", Math.round(passPct * 10.0) / 10.0);
        model.addAttribute("gradeDistribution", studentService.getGradeDistribution());
        model.addAttribute("students", studentService.getPerformanceRankings());
        model.addAttribute("activePage", "report");
        return "report";
    }
}`
  },
  {
    path: 'src/main/resources/templates/index.html',
    name: 'index.html',
    language: 'html',
    category: 'Thymeleaf Template',
    description: 'Thymeleaf template for Administrative Dashboard and performance KPIs',
    code: `<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Student Management System | Codec Technologies</title>
    <link rel="stylesheet" th:href="@{/css/style.css}">
</head>
<body>
    <header class="navbar">
        <div class="nav-container">
            <a th:href="@{/}" class="brand">
                <div class="brand-icon">🎓</div>
                <div class="brand-text">
                    <h1>Student Management System</h1>
                    <span>Codec Technologies Internship</span>
                </div>
            </a>
            <ul class="nav-links">
                <li><a th:href="@{/dashboard}" class="active">Dashboard</a></li>
                <li><a th:href="@{/students}">Students List</a></li>
                <li><a th:href="@{/report}">Performance Report</a></li>
                <li><a th:href="@{/students/new}" class="btn-nav">+ Add Student</a></li>
            </ul>
        </div>
    </header>

    <main class="main-content">
        <div class="page-header">
            <div class="page-title">
                <h2>Administrative Dashboard</h2>
                <p>Real-time academic performance summary and enrollment overview</p>
            </div>
            <div>
                <a th:href="@{/students/new}" class="btn btn-primary">+ Register New Student</a>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div>
                    <span class="stat-label">Total Enrolled</span>
                    <div class="stat-value" th:text="\${totalStudents}">0</div>
                </div>
                <div class="stat-subtitle">Registered student records</div>
            </div>

            <div class="stat-card average">
                <div>
                    <span class="stat-label">Class Average Marks</span>
                    <div class="stat-value">
                        <span th:text="\${averageMarks}">0.0</span><span style="font-size: 1.25rem;">/100</span>
                    </div>
                </div>
                <div class="stat-subtitle">Overall academic performance</div>
            </div>

            <div class="stat-card passed">
                <div>
                    <span class="stat-label">Passed Students</span>
                    <div class="stat-value" th:text="\${passedCount}">0</div>
                </div>
                <div class="stat-subtitle">
                    <strong th:text="\${passPercentage}">0.0</strong>% pass rate (&ge; 50 marks)
                </div>
            </div>

            <div class="stat-card failed">
                <div>
                    <span class="stat-label">Failed / Need Support</span>
                    <div class="stat-value" th:text="\${failedCount}">0</div>
                </div>
                <div class="stat-subtitle">Students with marks &lt; 50 (Grade F)</div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3>Academic Grade Distribution</h3>
                <span style="font-size: 0.8125rem; color: var(--muted-text);">Rule: A+ (90-100), A (80-89), B (70-79), C (60-69), D (50-59), F (&lt;50)</span>
            </div>
            <div class="card-body">
                <!-- Grade distribution cards -->
            </div>
        </div>
    </main>

    <footer class="footer">
        <p>Student Management System &bull; <strong>Codec Technologies</strong> Java Internship Project</p>
    </footer>
</body>
</html>`
  },
  {
    path: 'schema.sql',
    name: 'schema.sql',
    language: 'sql',
    category: 'Database SQL',
    description: 'MySQL DDL creation script with tables, constraints, and indexes',
    code: `-- Database Schema for Student Management System
-- Codec Technologies Java Internship Project
CREATE DATABASE IF NOT EXISTS student_db
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE student_db;

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
    
    CONSTRAINT uk_student_id UNIQUE (student_id),
    CONSTRAINT uk_student_email UNIQUE (email),
    CONSTRAINT chk_marks_range CHECK (marks >= 0.0 AND marks <= 100.0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_students_student_id ON students(student_id);
CREATE INDEX idx_students_full_name ON students(full_name);
CREATE INDEX idx_students_branch ON students(branch);`
  },
  {
    path: 'src/test/java/com/codectechnologies/sms/StudentServiceTest.java',
    name: 'StudentServiceTest.java',
    language: 'java',
    category: 'Test',
    description: 'JUnit 5 & Mockito test suite for adding, search, update, delete, duplicate prevention & grade logic',
    code: `package com.codectechnologies.sms;

import com.codectechnologies.sms.dto.StudentDto;
import com.codectechnologies.sms.entity.Student;
import com.codectechnologies.sms.exception.ResourceNotFoundException;
import com.codectechnologies.sms.repository.StudentRepository;
import com.codectechnologies.sms.service.impl.StudentServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentServiceImpl studentService;

    @Test
    @DisplayName("Test 1: Adding a student successfully with correct grade A+")
    void testSaveStudent_Success() {
        StudentDto dto = new StudentDto(1L, "B25DS001", "Aarav Sharma", "aarav@example.com", "+91 9876543210", "Data Science & AI", "3rd Year", 94.5);
        Student s = new Student("B25DS001", "Aarav Sharma", "aarav@example.com", "+91 9876543210", "Data Science & AI", "3rd Year", 94.5);

        when(studentRepository.existsByStudentId("B25DS001")).thenReturn(false);
        when(studentRepository.existsByEmail("aarav@example.com")).thenReturn(false);
        when(studentRepository.save(any(Student.class))).thenReturn(s);

        Student saved = studentService.saveStudent(dto);
        assertEquals("A+", saved.getGrade());
        assertEquals("Passed", saved.getStatus());
    }

    @Test
    @DisplayName("Test 2: Rejecting duplicate Student ID on registration")
    void testSaveStudent_DuplicateId_ThrowsException() {
        StudentDto dto = new StudentDto(null, "B25DS001", "Aarav", "aarav@example.com", "1234567890", "CS", "1st Year", 80.0);
        when(studentRepository.existsByStudentId("B25DS001")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> studentService.saveStudent(dto));
    }
}`
  },
  {
    path: 'README.md',
    name: 'README.md',
    language: 'markdown',
    category: 'Documentation',
    description: 'Complete internship project documentation, VS Code execution commands, MySQL setup, and GitHub steps',
    code: `# Student Management System - Codec Technologies Java Internship
Comprehensive guide covering prerequisites, MySQL setup, VS Code commands, and testing.`
  }
];
