import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { PROJECT_FILES } from '../data/sourceCodeFiles';

export async function downloadMavenProjectZip(): Promise<void> {
  const zip = new JSZip();
  const rootFolder = zip.folder('student-management-system') || zip;

  // Add all files
  for (const file of PROJECT_FILES) {
    rootFolder.file(file.path, file.code);
  }

  // Add a sample test data SQL
  rootFolder.file('data.sql', `-- Seed Data for Student Management System
USE student_db;

INSERT INTO students (student_id, full_name, email, phone_number, branch, year_of_study, marks, grade, status, created_at, updated_at)
VALUES 
('B25DS001', 'Aarav Sharma', 'aarav.sharma@example.com', '+91 9876543210', 'Data Science & AI', '3rd Year', 94.5, 'A+', 'Passed', NOW(), NOW()),
('B25CS002', 'Priya Patel', 'priya.patel@example.com', '+91 9876543211', 'Computer Science & Engineering', '4th Year', 86.0, 'A', 'Passed', NOW(), NOW()),
('B25IT003', 'Rohan Verma', 'rohan.verma@example.com', '+91 9876543212', 'Information Technology', '2nd Year', 76.5, 'B', 'Passed', NOW(), NOW()),
('B25EC004', 'Ananya Iyer', 'ananya.iyer@example.com', '+91 9876543213', 'Electronics & Communication', '3rd Year', 68.0, 'C', 'Passed', NOW(), NOW()),
('B25ME005', 'Vikram Singh', 'vikram.singh@example.com', '+91 9876543214', 'Mechanical Engineering', '1st Year', 54.0, 'D', 'Passed', NOW(), NOW()),
('B25CS006', 'Sneha Kulkarni', 'sneha.kulkarni@example.com', '+91 9876543215', 'Computer Science & Engineering', '2nd Year', 91.0, 'A+', 'Passed', NOW(), NOW()),
('B25EE007', 'Rahul Nair', 'rahul.nair@example.com', '+91 9876543216', 'Electrical Engineering', '1st Year', 42.5, 'F', 'Failed', NOW(), NOW()),
('B25DS008', 'Meera Reddy', 'meera.reddy@example.com', '+91 9876543217', 'Data Science & AI', '4th Year', 82.0, 'A', 'Passed', NOW(), NOW());
`);

  // Add static CSS
  rootFolder.file('src/main/resources/static/css/style.css', `/* Blue & White Institutional CSS for Student Management System */
:root {
  --primary-blue: #1e40af;
  --primary-hover: #1d4ed8;
  --primary-light: #eff6ff;
  --dark-text: #0f172a;
  --light-bg: #f8fafc;
}
body { font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; }
.navbar { background: #1e40af; color: white; padding: 1rem 2rem; }
`);

  // Add Thymeleaf templates
  rootFolder.file('src/main/resources/templates/students.html', `<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>All Students - Codec Technologies</title>
    <link rel="stylesheet" th:href="@{/css/style.css}">
</head>
<body>
    <h1>Student Records</h1>
</body>
</html>`);

  rootFolder.file('src/main/resources/templates/add-student.html', `<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Register Student - Codec Technologies</title>
    <link rel="stylesheet" th:href="@{/css/style.css}">
</head>
<body>
    <h1>Register New Student</h1>
</body>
</html>`);

  rootFolder.file('src/main/resources/templates/report.html', `<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Academic Report - Codec Technologies</title>
    <link rel="stylesheet" th:href="@{/css/style.css}">
</head>
<body>
    <h1>Academic Performance Report</h1>
</body>
</html>`);

  rootFolder.file('.gitignore', `target/\n*.class\n.idea/\n*.iml\n.vscode/\n.DS_Store\n`);

  // Generate blob and trigger browser download
  const blob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = 'student-management-system-codec-technologies.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);

  // Trigger celebration confetti
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  } catch {
    // ignore
  }
}
