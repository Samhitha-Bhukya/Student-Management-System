package com.codectechnologies.sms.repository;

import com.codectechnologies.sms.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA Repository for Student Entity.
 * 
 * Provides built-in CRUD operations and custom parameterized queries
 * to safely interact with the MySQL database without SQL injection vulnerabilities.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Find student by unique student ID (e.g., B25DS001)
    Optional<Student> findByStudentId(String studentId);

    // Find student by email
    Optional<Student> findByEmail(String email);

    // Check if student ID already exists (for duplicate validation on Add)
    boolean existsByStudentId(String studentId);

    // Check if email already exists (for duplicate validation on Add)
    boolean existsByEmail(String email);

    // Check if student ID exists for another record (for duplicate validation on Edit)
    boolean existsByStudentIdAndIdNot(String studentId, Long id);

    // Check if email exists for another record (for duplicate validation on Edit)
    boolean existsByEmailAndIdNot(String email, Long id);

    /**
     * Search students by Student ID or Full Name (case-insensitive parameterized query).
     */
    @Query("SELECT s FROM Student s WHERE " +
           "LOWER(s.studentId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "ORDER BY s.id DESC")
    List<Student> searchStudents(@Param("keyword") String keyword);

    // Filter by Branch
    List<Student> findByBranchIgnoreCaseOrderByIdDesc(String branch);

    // Count students by Pass/Fail status
    long countByStatus(String status);

    // Count students by Grade (A+, A, B, C, D, F)
    long countByGrade(String grade);

    // Calculate average marks across all students in the database
    @Query("SELECT COALESCE(AVG(s.marks), 0.0) FROM Student s")
    Double calculateAverageMarks();

    // Find top performing students ordered by marks descending
    List<Student> findAllByOrderByMarksDesc();

    // Order by ID descending (newest first)
    List<Student> findAllByOrderByIdDesc();
}
