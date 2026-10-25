package com.codectechnologies.sms.controller;

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

/**
 * Controller handling Student CRUD, search, and performance reporting.
 */
@Controller
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * View all students with optional search query by Student ID or Name.
     */
    @GetMapping("/students")
    public String listStudents(@RequestParam(value = "keyword", required = false) String keyword,
                               @RequestParam(value = "branch", required = false) String branch,
                               Model model) {
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

    /**
     * Show form to Add a new Student.
     */
    @GetMapping("/students/new")
    public String showAddStudentForm(Model model) {
        StudentDto studentDto = new StudentDto();
        model.addAttribute("student", studentDto);
        model.addAttribute("activePage", "add-student");
        return "add-student";
    }

    /**
     * Handle Add Student submission with server-side validation & duplicate checks.
     */
    @PostMapping("/students")
    public String saveStudent(@Valid @ModelAttribute("student") StudentDto studentDto,
                              BindingResult result,
                              RedirectAttributes redirectAttributes,
                              Model model) {

        // Validate duplicate Student ID
        if (studentService.isStudentIdDuplicate(studentDto.getStudentId(), null)) {
            result.rejectValue("studentId", "duplicate.studentId", 
                    "Student ID '" + studentDto.getStudentId() + "' already exists! Please use a unique ID.");
        }

        // Validate duplicate Email
        if (studentService.isEmailDuplicate(studentDto.getEmail(), null)) {
            result.rejectValue("email", "duplicate.email", 
                    "Email address '" + studentDto.getEmail() + "' is already registered to another student.");
        }

        if (result.hasErrors()) {
            model.addAttribute("activePage", "add-student");
            return "add-student";
        }

        try {
            studentService.saveStudent(studentDto);
            redirectAttributes.addFlashAttribute("successMessage", 
                    "Student '" + studentDto.getFullName() + "' (" + studentDto.getStudentId() + ") registered successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error saving student: " + e.getMessage());
        }

        return "redirect:/students";
    }

    /**
     * Show form to Edit an existing Student.
     */
    @GetMapping("/students/edit/{id}")
    public String showEditStudentForm(@PathVariable("id") Long id, Model model, RedirectAttributes redirectAttributes) {
        try {
            Student student = studentService.getStudentById(id);
            StudentDto studentDto = studentService.convertToDto(student);
            model.addAttribute("student", studentDto);
            model.addAttribute("studentEntity", student);
            model.addAttribute("activePage", "students");
            return "edit-student";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Student not found with ID: " + id);
            return "redirect:/students";
        }
    }

    /**
     * Handle Update Student submission with validation & collision checks.
     */
    @PostMapping("/students/{id}")
    public String updateStudent(@PathVariable("id") Long id,
                                @Valid @ModelAttribute("student") StudentDto studentDto,
                                BindingResult result,
                                RedirectAttributes redirectAttributes,
                                Model model) {

        // Check if student ID belongs to someone else
        if (studentService.isStudentIdDuplicate(studentDto.getStudentId(), id)) {
            result.rejectValue("studentId", "duplicate.studentId", 
                    "Student ID '" + studentDto.getStudentId() + "' is already in use by another student.");
        }

        // Check if email belongs to someone else
        if (studentService.isEmailDuplicate(studentDto.getEmail(), id)) {
            result.rejectValue("email", "duplicate.email", 
                    "Email address '" + studentDto.getEmail() + "' is already in use by another student.");
        }

        if (result.hasErrors()) {
            model.addAttribute("studentEntity", studentService.getStudentById(id));
            model.addAttribute("activePage", "students");
            return "edit-student";
        }

        try {
            studentService.updateStudent(id, studentDto);
            redirectAttributes.addFlashAttribute("successMessage", 
                    "Student details for '" + studentDto.getFullName() + "' updated successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error updating student: " + e.getMessage());
        }

        return "redirect:/students";
    }

    /**
     * View detailed student profile / performance card.
     */
    @GetMapping("/students/{id}")
    public String viewStudentDetails(@PathVariable("id") Long id, Model model, RedirectAttributes redirectAttributes) {
        try {
            Student student = studentService.getStudentById(id);
            model.addAttribute("student", student);
            model.addAttribute("activePage", "students");
            return "student-details";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Student not found with ID: " + id);
            return "redirect:/students";
        }
    }

    /**
     * Delete student by ID with confirmation handling.
     */
    @GetMapping("/students/delete/{id}")
    public String deleteStudent(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        try {
            Student student = studentService.getStudentById(id);
            String name = student.getFullName();
            String studentId = student.getStudentId();
            studentService.deleteStudent(id);
            redirectAttributes.addFlashAttribute("successMessage", 
                    "Student '" + name + "' (" + studentId + ") was deleted successfully.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error deleting student: " + e.getMessage());
        }
        return "redirect:/students";
    }

    /**
     * Student Performance Report & Class Analytics.
     */
    @GetMapping("/report")
    public String viewPerformanceReport(Model model) {
        long totalStudents = studentService.getTotalStudentsCount();
        Double avgMarks = studentService.getAverageMarks();
        long passedCount = studentService.getPassedStudentsCount();
        long failedCount = studentService.getFailedStudentsCount();
        double passPercentage = totalStudents > 0 ? ((double) passedCount / totalStudents) * 100.0 : 0.0;

        List<Student> rankedStudents = studentService.getPerformanceRankings();

        model.addAttribute("totalStudents", totalStudents);
        model.addAttribute("averageMarks", avgMarks);
        model.addAttribute("passedCount", passedCount);
        model.addAttribute("failedCount", failedCount);
        model.addAttribute("passPercentage", Math.round(passPercentage * 10.0) / 10.0);
        model.addAttribute("gradeDistribution", studentService.getGradeDistribution());
        model.addAttribute("branchDistribution", studentService.getBranchDistribution());
        model.addAttribute("students", rankedStudents);
        model.addAttribute("activePage", "report");

        return "report";
    }
}
