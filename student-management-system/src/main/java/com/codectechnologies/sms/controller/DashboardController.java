package com.codectechnologies.sms.controller;

import com.codectechnologies.sms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller handling Dashboard view and high-level KPIs.
 */
@Controller
public class DashboardController {

    private final StudentService studentService;

    @Autowired
    public DashboardController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * Display Dashboard with summary cards:
     * - Total students
     * - Average marks
     * - Students passed / failed
     * - Grade distribution
     */
    @GetMapping({"/", "/dashboard"})
    public String viewDashboard(Model model) {
        long totalStudents = studentService.getTotalStudentsCount();
        Double avgMarks = studentService.getAverageMarks();
        long passedCount = studentService.getPassedStudentsCount();
        long failedCount = studentService.getFailedStudentsCount();
        double passPercentage = totalStudents > 0 ? ((double) passedCount / totalStudents) * 100.0 : 0.0;

        model.addAttribute("totalStudents", totalStudents);
        model.addAttribute("averageMarks", avgMarks);
        model.addAttribute("passedCount", passedCount);
        model.addAttribute("failedCount", failedCount);
        model.addAttribute("passPercentage", Math.round(passPercentage * 10.0) / 10.0);
        model.addAttribute("gradeDistribution", studentService.getGradeDistribution());
        model.addAttribute("recentStudents", studentService.getAllStudents().stream().limit(5).toList());
        model.addAttribute("activePage", "dashboard");

        return "index";
    }
}
