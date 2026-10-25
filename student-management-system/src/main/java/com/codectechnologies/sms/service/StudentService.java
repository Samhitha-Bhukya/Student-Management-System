package com.codectechnologies.sms.service;

import com.codectechnologies.sms.dto.StudentDto;
import com.codectechnologies.sms.entity.Student;

import java.util.List;
import java.util.Map;

/**
 * Service interface defining business logic operations for Student Management.
 */
public interface StudentService {

    // Retrieve all students
    List<Student> getAllStudents();

    // Retrieve single student by database ID
    Student getStudentById(Long id);

    // Retrieve single student by Student ID (e.g., B25DS001)
    Student getStudentByStudentId(String studentId);

    // Save a new student record
    Student saveStudent(StudentDto studentDto);

    // Update existing student record
    Student updateStudent(Long id, StudentDto studentDto);

    // Delete a student record by ID
    void deleteStudent(Long id);

    // Search students by ID or Name
    List<Student> searchStudents(String keyword);

    // Check duplicate student ID
    boolean isStudentIdDuplicate(String studentId, Long excludeId);

    // Check duplicate email
    boolean isEmailDuplicate(String email, Long excludeId);

    // Dashboard metrics
    long getTotalStudentsCount();
    Double getAverageMarks();
    long getPassedStudentsCount();
    long getFailedStudentsCount();
    long getCountByGrade(String grade);
    Map<String, Long> getGradeDistribution();
    Map<String, Long> getBranchDistribution();
    List<Student> getPerformanceRankings();

    // Helper conversion
    StudentDto convertToDto(Student student);
}
