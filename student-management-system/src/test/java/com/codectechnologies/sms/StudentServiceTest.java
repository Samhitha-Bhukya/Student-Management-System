package com.codectechnologies.sms;

import com.codectechnologies.sms.dto.StudentDto;
import com.codectechnologies.sms.entity.Student;
import com.codectechnologies.sms.exception.ResourceNotFoundException;
import com.codectechnologies.sms.repository.StudentRepository;
import com.codectechnologies.sms.service.impl.StudentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit Test Suite for Student Management System
 * Internship: Codec Technologies
 * 
 * Verifies core requirements:
 * 1. Adding a student & automatic grade calculation
 * 2. Viewing all students
 * 3. Searching by Student ID or Name
 * 4. Updating student details
 * 5. Deleting a student
 * 6. Rejecting duplicate Student IDs
 * 7. Rejecting duplicate Emails
 * 8. Handling missing student records
 */
@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentServiceImpl studentService;

    private Student sampleStudent;
    private StudentDto sampleDto;

    @BeforeEach
    void setUp() {
        sampleStudent = new Student(
                "B25DS001",
                "Aarav Sharma",
                "aarav.sharma@example.com",
                "+91 9876543210",
                "Data Science & AI",
                "3rd Year",
                94.5
        );
        sampleStudent.setId(1L);

        sampleDto = new StudentDto(
                1L,
                "B25DS001",
                "Aarav Sharma",
                "aarav.sharma@example.com",
                "+91 9876543210",
                "Data Science & AI",
                "3rd Year",
                94.5
        );
    }

    @Test
    @DisplayName("Test 1: Adding a student successfully with correct grade A+")
    void testSaveStudent_Success() {
        when(studentRepository.existsByStudentId("B25DS001")).thenReturn(false);
        when(studentRepository.existsByEmail("aarav.sharma@example.com")).thenReturn(false);
        when(studentRepository.save(any(Student.class))).thenReturn(sampleStudent);

        Student saved = studentService.saveStudent(sampleDto);

        assertNotNull(saved);
        assertEquals("B25DS001", saved.getStudentId());
        assertEquals("A+", saved.getGrade());
        assertEquals("Passed", saved.getStatus());
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    @DisplayName("Test 2: Rejecting duplicate Student ID on registration")
    void testSaveStudent_DuplicateId_ThrowsException() {
        when(studentRepository.existsByStudentId("B25DS001")).thenReturn(true);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> {
            studentService.saveStudent(sampleDto);
        });

        assertTrue(ex.getMessage().contains("already registered"));
        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    @DisplayName("Test 3: Rejecting duplicate Email on registration")
    void testSaveStudent_DuplicateEmail_ThrowsException() {
        when(studentRepository.existsByStudentId("B25DS001")).thenReturn(false);
        when(studentRepository.existsByEmail("aarav.sharma@example.com")).thenReturn(true);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> {
            studentService.saveStudent(sampleDto);
        });

        assertTrue(ex.getMessage().contains("already in use"));
        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    @DisplayName("Test 4: Retrieving all students list")
    void testGetAllStudents() {
        Student s2 = new Student("B25CS002", "Priya Patel", "priya@example.com", "+91 9876543211", "Computer Science", "4th Year", 45.0);
        when(studentRepository.findAllByOrderByIdDesc()).thenReturn(Arrays.asList(sampleStudent, s2));

        List<Student> list = studentService.getAllStudents();

        assertEquals(2, list.size());
        verify(studentRepository, times(1)).findAllByOrderByIdDesc();
    }

    @Test
    @DisplayName("Test 5: Searching students by ID or Name")
    void testSearchStudents() {
        when(studentRepository.searchStudents("Aarav")).thenReturn(List.of(sampleStudent));

        List<Student> results = studentService.searchStudents("Aarav");

        assertEquals(1, results.size());
        assertEquals("Aarav Sharma", results.get(0).getFullName());
        verify(studentRepository, times(1)).searchStudents("Aarav");
    }

    @Test
    @DisplayName("Test 6: Updating existing student details")
    void testUpdateStudent_Success() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(sampleStudent));
        when(studentRepository.existsByStudentIdAndIdNot("B25DS001", 1L)).thenReturn(false);
        when(studentRepository.existsByEmailAndIdNot("aarav.sharma@example.com", 1L)).thenReturn(false);
        when(studentRepository.save(any(Student.class))).thenReturn(sampleStudent);

        sampleDto.setFullName("Aarav Sharma Updated");
        sampleDto.setMarks(75.0); // Grade B

        Student updated = studentService.updateStudent(1L, sampleDto);

        assertNotNull(updated);
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    @DisplayName("Test 7: Deleting student by ID")
    void testDeleteStudent() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(sampleStudent));
        doNothing().when(studentRepository).delete(sampleStudent);

        studentService.deleteStudent(1L);

        verify(studentRepository, times(1)).delete(sampleStudent);
    }

    @Test
    @DisplayName("Test 8: Handling missing record with ResourceNotFoundException")
    void testGetStudentById_NotFound() {
        when(studentRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            studentService.getStudentById(999L);
        });
    }

    @Test
    @DisplayName("Test 9: Grade calculation logic boundary verification")
    void testGradeCalculationLogic() {
        Student sAplus = new Student("T1", "Test", "t1@ex.com", "123", "CS", "1st", 90.0);
        assertEquals("A+", sAplus.getGrade());
        assertEquals("Passed", sAplus.getStatus());

        Student sA = new Student("T2", "Test", "t2@ex.com", "123", "CS", "1st", 85.0);
        assertEquals("A", sA.getGrade());

        Student sB = new Student("T3", "Test", "t3@ex.com", "123", "CS", "1st", 75.0);
        assertEquals("B", sB.getGrade());

        Student sC = new Student("T4", "Test", "t4@ex.com", "123", "CS", "1st", 65.0);
        assertEquals("C", sC.getGrade());

        Student sD = new Student("T5", "Test", "t5@ex.com", "123", "CS", "1st", 50.0);
        assertEquals("D", sD.getGrade());
        assertEquals("Passed", sD.getStatus());

        Student sF = new Student("T6", "Test", "t6@ex.com", "123", "CS", "1st", 49.9);
        assertEquals("F", sF.getGrade());
        assertEquals("Failed", sF.getStatus());
    }
}
