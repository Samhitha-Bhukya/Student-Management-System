# Student Management System

[![Java Version](https://img.shields.io/badge/Java-17%20LTS-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Database](https://img.shields.io/badge/Database-MySQL%208.x-blue.svg)](https://www.mysql.com/)
[![Template Engine](https://img.shields.io/badge/Template%20Engine-Thymeleaf-teal.svg)](https://www.thymeleaf.org/)
[![License](https://img.shields.io/badge/License-Academic%20Internship-lightgrey.svg)]()

> **Internship Organization:** Codec Technologies  
> **Project Title:** Student Management System (SMS)  
> **Author / Intern:** Student Intern  
> **Academic Session:** 2025 – 2026  

---

## 📌 Project Overview

The **Student Management System** is a robust, full-stack Java enterprise web application engineered to streamline the registration, academic tracking, performance reporting, and administrative record management for collegiate institutions.

Built with **Java 17 LTS**, **Spring Boot 3.x**, **Spring Data JPA / Hibernate**, **MySQL**, and server-side **Thymeleaf**, the application adheres to strict Object-Oriented Programming (OOP) principles, Model-View-Controller (MVC) architectural separation, and defensive data validation.

---

## ✨ Features

1. **Administrative KPI Dashboard:**
   - Real-time aggregate count of enrolled students.
   - Dynamic class average calculation out of 100.
   - Counter for passed students (marks $\ge$ 50) and failed students (marks $<$ 50).
   - Cohort pass percentage rate.
   - Visual breakdown across all academic grade brackets (A+, A, B, C, D, F).
   - Quick preview of recent 5 enrollments.

2. **Add Student (Enrollment):**
   - Inputs: Institutional Student ID (e.g. `B25DS001`), Full Name, Email Address, Contact Phone Number, Branch/Department, Academic Year, and Marks out of 100.
   - Enforces unique constraints preventing duplicate Student IDs or Emails.
   - Server-side validation with instant inline error feedback.

3. **View & Search Students:**
   - Responsive tabular view displaying Student ID, Full Name, Contact Email, Department, Year, Marks, Grade Badge, and Status.
   - Case-insensitive search filter by Student ID or Student Name.
   - Informative empty-state feedback when no records match.

4. **Update Student Details:**
   - Pre-populated form to update student contact details, branch, academic year, and marks.
   - Automatic recalculation of grade and pass/fail status upon submission.
   - Conflict-checking ensures updated ID or email does not collide with other students.

5. **Delete Student:**
   - Interactive modal confirmation before executing permanent deletion.

6. **Academic Performance Report & Grading Engine:**
   - Institutional merit rank listing ordered by highest marks.
   - Top 3 ranker podium badges (🥇 #1, 🥈 #2, 🥉 #3).
   - Built-in browser print-ready stylesheet for generating hardcopy grade reports.
   - **Grading Scale Standard:**
     - `90 – 100`: **A+** (Outstanding Excellence)
     - `80 – 89`:  **A**  (Excellent)
     - `70 – 79`:  **B**  (Good)
     - `60 – 69`:  **C**  (Satisfactory)
     - `50 – 59`:  **D**  (Minimum Passing Grade)
     - `0 – 49`:   **F**  (Remedial / Failed)

---

## 🛠️ Technologies Used

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Language** | Java (JDK) | 17 LTS | Core programming language |
| **Framework** | Spring Boot | 3.3.4 | Application framework & embedded Tomcat |
| **Persistence** | Spring Data JPA / Hibernate | 3.3.x | Object-Relational Mapping (ORM) & queries |
| **Database** | MySQL Server | 8.x | Relational persistent database storage |
| **Validation** | Jakarta Bean Validation (Hibernate Validator) | 3.0.x | Server-side form field validation |
| **Template Engine** | Thymeleaf | 3.1.x | Server-side HTML5 UI rendering |
| **Styling** | Custom CSS3 | Modern CSS | Responsive Blue & White institutional theme |
| **Build Tool** | Apache Maven | 3.8+ | Dependency management & project lifecycle |
| **Testing** | JUnit 5 & Mockito | 5.x | Unit and service integration test cases |

---

## 📋 Prerequisites

Before running the application, make sure you have the following installed on your computer:

1. **Java Development Kit (JDK 17 or higher)**
   - Verify installation:
     ```bash
     java -version
     ```
2. **Apache Maven (3.8 or higher)**
   - Verify installation:
     ```bash
     mvn -version
     ```
3. **MySQL Server (8.0 or higher)**
   - Download from: [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
4. **Visual Studio Code (VS Code)**
   - Recommended Extensions:
     - *Extension Pack for Java* (Microsoft)
     - *Spring Boot Extension Pack* (VMware)
     - *MySQL* or *Database Client* (optional)

---

## 🗄️ MySQL Database Setup Instructions

1. Open **MySQL Workbench** or your terminal/command prompt and connect to MySQL:
   ```bash
   mysql -u root -p
   ```
   *(Enter your MySQL root password when prompted)*

2. Create the `student_db` database:
   ```sql
   CREATE DATABASE IF NOT EXISTS student_db 
       CHARACTER SET utf8mb4 
       COLLATE utf8mb4_unicode_ci;
   ```

3. (Optional) Run the provided `schema.sql` and `data.sql` scripts located in the project root:
   ```bash
   mysql -u root -p student_db < schema.sql
   mysql -u root -p student_db < data.sql
   ```
   *Note: Because `spring.jpa.hibernate.ddl-auto=update` is enabled in `application.properties`, Hibernate will automatically create and update the tables for you on startup!*

---

## ⚙️ Configuration Instructions

Open `src/main/resources/application.properties` and verify your MySQL credentials:

```properties
# MySQL Database Connection Settings
spring.datasource.url=jdbc:mysql://localhost:3306/student_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD_HERE
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate DDL Auto Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Server Port
server.port=8080
```

> **Security Tip:** You can also pass credentials using environment variables without modifying the file:
> ```bash
> export DB_USERNAME=root
> export DB_PASSWORD=your_secure_password
> ```

---

## 🚀 Exact Commands to Run the Project in VS Code

### Step 1: Open the Project
1. Launch **Visual Studio Code**.
2. Click **File** > **Open Folder...** and select the `student-management-system` folder.
3. Allow the Java Language Server to finish loading dependencies (check the status bar in the bottom right).

### Step 2: Open Integrated Terminal
Open the terminal in VS Code using `Ctrl + \`` (or `Terminal` > `New Terminal`).

### Step 3: Clean and Build the Project
```bash
mvn clean compile
```

### Step 4: Run the Application
Execute the Spring Boot Maven command:
```bash
mvn spring-boot:run
```

Alternatively, open `src/main/java/com/codectechnologies/sms/StudentManagementSystemApplication.java` in VS Code and click the **Run** button directly above the `main` method.

### Step 5: Access the Application
Open your web browser (Google Chrome, Edge, Firefox) and navigate to:
```
http://localhost:8080
```

---

## 🧪 Testing Instructions

This project includes a comprehensive JUnit 5 and Mockito test suite in `src/test/java/com/codectechnologies/sms/StudentServiceTest.java`.

### Run Tests via Maven
```bash
mvn test
```

### Test Cases Covered:
1. **Adding a Student:** Verifies saving a valid student record and validates that Grade `A+` is computed for marks 94.5.
2. **Viewing All Students:** Asserts list retrieval ordered by ID descending.
3. **Searching by ID or Name:** Validates parameterized case-insensitive search queries.
4. **Updating Student Details:** Validates modification of existing record attributes without generating duplicate key collisions.
5. **Deleting a Student:** Confirms entity deletion from repository.
6. **Rejecting Duplicate IDs:** Asserts `IllegalArgumentException` when attempting to register an existing Student ID.
7. **Rejecting Duplicate Emails:** Asserts `IllegalArgumentException` when attempting to register an existing Email address.
8. **Handling Missing Records:** Confirms `ResourceNotFoundException` when looking up a non-existent database ID.
9. **Grade Calculation Boundaries:** Confirms precise grade boundaries:
   - $90 - 100 \rightarrow$ `A+` (Passed)
   - $80 - 89.9 \rightarrow$ `A` (Passed)
   - $70 - 79.9 \rightarrow$ `B` (Passed)
   - $60 - 69.9 \rightarrow$ `C` (Passed)
   - $50 - 59.9 \rightarrow$ `D` (Passed)
   - $0 - 49.9 \rightarrow$ `F` (Failed)
10. **Data Persistence Verification:** Records saved to MySQL remain intact and accessible across application restarts.

---

## 📸 Screenshots

*(Replace the placeholders below with actual screenshots of your application during testing)*

### 1. Administrative Dashboard
![Dashboard Placeholder](screenshots/dashboard.png)
*Description: Overview of total students, class average, pass/fail counts, and grade distribution.*

### 2. Student Records Table
![Students List Placeholder](screenshots/students_list.png)
*Description: Responsive data table displaying student records, marks, badges, and action buttons.*

### 3. Add New Student Form
![Add Student Placeholder](screenshots/add_student.png)
*Description: Clean input form with server-side validation feedback and duplicate prevention.*

### 4. Edit Student Details
![Edit Student Placeholder](screenshots/edit_student.png)
*Description: Updating student record with real-time field validation.*

### 5. Individual Marksheet & Profile
![Student Details Placeholder](screenshots/student_details.png)
*Description: Printable student marksheet with calculated grade, remarks, and credentials.*

### 6. Academic Performance Report
![Performance Report Placeholder](screenshots/performance_report.png)
*Description: Cohort rank list, top rank holders, and institutional grade statistics.*

---

## 🐙 GitHub Publishing Instructions

To publish your project to GitHub for your internship portfolio submission:

1. Create a new repository on [GitHub](https://github.com/new) named `student-management-system`.
   *(Do NOT initialize with a README, .gitignore, or license since they are already included)*

2. Open the terminal inside your project directory and execute:
   ```bash
   # 1. Initialize git repository
   git init

   # 2. Add all files to staging
   git add .

   # 3. Commit the codebase
   git commit -m "feat: complete student management system for Codec Technologies Java internship"

   # 4. Set the main branch
   git branch -M main

   # 5. Link to your remote GitHub repository
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/student-management-system.git

   # 6. Push the source code to GitHub
   git push -u origin main
   ```

---

## 🎓 Internship Evaluation / Viva Questions Guide

Prepare for your project presentation at Codec Technologies with these key concepts:

1. **What is Spring Boot and why was it chosen?**  
   *Answer:* Spring Boot provides opinionated starter dependencies, auto-configuration, and an embedded Tomcat servlet container, reducing boilerplate and accelerating production-grade development.

2. **How does Hibernate / Spring Data JPA prevent SQL injection?**  
   *Answer:* Spring Data JPA uses parameterized `PreparedStatement` under the hood. All parameters in custom `@Query` definitions (like `:keyword`) are safely escaped by the JDBC driver.

3. **How does Thymeleaf render HTML?**  
   *Answer:* Thymeleaf is a server-side Java template engine that processes standard HTML5 templates populated with model attributes (`${student.fullName}`) before serving the final HTML to the client browser.

4. **How are duplicate Student IDs and Emails prevented?**  
   *Answer:* A multi-layer defense: database unique constraints (`UNIQUE KEY`), JPA entity annotations (`@UniqueConstraint`), and service-level pre-checks (`existsByStudentId`, `existsByEmail`).

---

## 📜 License & Acknowledgments

Developed as part of the **Java Development Internship Program** at **Codec Technologies**.  
Academic and training use permitted.
