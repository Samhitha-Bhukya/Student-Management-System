package com.codectechnologies.sms.service.impl;

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

/**
 * Service Implementation class containing business logic
 * for Student Management System.
 */
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
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with database ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public Student getStudentByStudentId(String studentId) {
        return studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with Student ID: " + studentId));
    }

    @Override
    public Student saveStudent(StudentDto studentDto) {
        // Enforce uniqueness validation
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
        // Grade & Status are automatically calculated in entity @PrePersist / helper

        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(Long id, StudentDto studentDto) {
        Student existingStudent = getStudentById(id);

        // Check for collisions with other students
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
        // Grade and status will be updated via calculateGradeAndStatus()

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
        if (studentId == null || studentId.trim().isEmpty()) {
            return false;
        }
        if (excludeId == null) {
            return studentRepository.existsByStudentId(studentId.trim());
        }
        return studentRepository.existsByStudentIdAndIdNot(studentId.trim(), excludeId);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isEmailDuplicate(String email, Long excludeId) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        if (excludeId == null) {
            return studentRepository.existsByEmail(email.trim());
        }
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
}
