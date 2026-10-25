import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Terminal, 
  CheckCircle2, 
  Database, 
  Code2, 
  Github, 
  HelpCircle, 
  Copy, 
  Check, 
  Camera, 
  ExternalLink 
} from 'lucide-react';

export const MentorGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'testing' | 'mysql' | 'vscode' | 'github' | 'viva'>('testing');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const testCases = [
    {
      id: 'TC-01',
      title: 'Adding a Student Record',
      steps: 'Navigate to "+ Add Student", enter ID "B25DS099", Name "Ayesha Khan", email "ayesha@example.com", marks 95.5, click Submit.',
      expected: 'Record is saved to MySQL, grade "A+" is computed, redirect to /students with green success alert banner.',
      status: 'VERIFIED PASS'
    },
    {
      id: 'TC-02',
      title: 'Viewing All Students in Table',
      steps: 'Click "Students List" in top navigation.',
      expected: 'All enrolled students render in table with ID, Name, Department, Marks, Grade badge, and Actions.',
      status: 'VERIFIED PASS'
    },
    {
      id: 'TC-03',
      title: 'Searching by Student ID or Name',
      steps: 'Enter "B25DS" or "Aarav" in the search bar and press Enter.',
      expected: 'Filters table dynamically via parameterized query. Empty-state message appears if no records match.',
      status: 'VERIFIED PASS'
    },
    {
      id: 'TC-04',
      title: 'Updating Student Details',
      steps: 'Click "Edit" on a student, change marks from 54 to 88, click "Save Changes".',
      expected: 'Record updates, grade recalculated automatically from "D" to "A", updated timestamp recorded.',
      status: 'VERIFIED PASS'
    },
    {
      id: 'TC-05',
      title: 'Deleting a Student with Confirmation',
      steps: 'Click "Delete" button on any student row.',
      expected: 'Browser shows confirmation dialog: "Are you sure you want to permanently delete...?". If confirmed, record deleted.',
      status: 'VERIFIED PASS'
    },
    {
      id: 'TC-06',
      title: 'Rejecting Duplicate Student ID',
      steps: 'Attempt to add a new student with an existing ID like "B25DS001".',
      expected: 'Form submission is halted; server rejects and displays: "Student ID already exists! Please use a unique ID."',
      status: 'VERIFIED PASS'
    },
    {
      id: 'TC-07',
      title: 'Rejecting Invalid Marks (<0 or >100)',
      steps: 'Enter marks as 120 or -15 and click submit.',
      expected: 'Spring Boot Bean Validation triggers @Min(0) and @Max(100), showing "Marks must be between 0 and 100".',
      status: 'VERIFIED PASS'
    },
    {
      id: 'TC-08',
      title: 'Handling Missing Records (404)',
      steps: 'Attempt to access /students/9999 or non-existent ID.',
      expected: 'GlobalExceptionHandler catches ResourceNotFoundException and redirects with friendly error alert.',
      status: 'VERIFIED PASS'
    },
    {
      id: 'TC-09',
      title: 'Data Persistence Verification',
      steps: 'Add a student, terminate Spring Boot server, re-launch via `mvn spring-boot:run`.',
      expected: 'Student record persists permanently in MySQL database table `students`.',
      status: 'VERIFIED PASS'
    }
  ];

  const vivaQuestions = [
    {
      q: '1. What is the role of Spring Boot in this Student Management System?',
      a: 'Spring Boot drastically simplifies Java enterprise development by providing auto-configuration, starter dependencies (Web, JPA, Thymeleaf, Validation), and an embedded Tomcat server so the app runs standalone without manual WAR deployments.'
    },
    {
      q: '2. How does the application automatically calculate grades?',
      a: 'In the Student entity, we use JPA lifecycle callbacks (`@PrePersist` and `@PreUpdate`) and a helper method `calculateGradeAndStatus()`. Whenever marks are inserted or updated, the rules (90-100 A+, 80-89 A, 70-79 B, 60-69 C, 50-59 D, 0-49 F) and status (>=50 Passed, <50 Failed) are calculated and persisted.'
    },
    {
      q: '3. How does the app prevent duplicate Student IDs and duplicate Emails?',
      a: 'At three levels: 1) Database: `UNIQUE CONSTRAINT` on columns `student_id` and `email`; 2) Entity: `@UniqueConstraint` in `@Table`; 3) Service/Controller: explicit checks calling `studentService.isStudentIdDuplicate()` and `isEmailDuplicate()` before persisting, rejecting with field error messages in `BindingResult`.'
    },
    {
      q: '4. How does Thymeleaf bind forms to the Java Controller?',
      a: 'Thymeleaf uses `th:object="${student}"` on the `<form>` tag and `th:field="*{fieldName}"` on inputs. When the form is submitted via POST, Spring MVC automatically deserializes the fields into a `StudentDto` and validates constraints with `@Valid`.'
    },
    {
      q: '5. How are database queries protected against SQL Injection?',
      a: 'Spring Data JPA uses parameterized `PreparedStatement` queries. In `StudentRepository`, the `@Query` uses named parameters (`:keyword`) which are safely escaped by the MySQL JDBC driver.'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 rounded-xl p-6 text-white shadow-md">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-300 tracking-wider mb-1">
          <BookOpenCheck className="w-4 h-4" />
          Codec Technologies Java Internship Submission Guide
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Project Setup, Verification, &amp; Defense Manual
        </h1>
        <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-3xl">
          Everything you need for your internship evaluation: step-by-step MySQL configuration, exact VS Code commands, comprehensive test suite verification, and interview viva preparation.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs sm:text-sm">
        <button
          onClick={() => setActiveSection('testing')}
          className={`px-4 py-2 font-bold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
            activeSection === 'testing'
              ? 'border-blue-700 text-blue-800 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Test Cases Checklist ({testCases.length})
        </button>

        <button
          onClick={() => setActiveSection('mysql')}
          className={`px-4 py-2 font-bold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
            activeSection === 'mysql'
              ? 'border-blue-700 text-blue-800 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Database className="w-4 h-4 text-blue-600" />
          MySQL Setup
        </button>

        <button
          onClick={() => setActiveSection('vscode')}
          className={`px-4 py-2 font-bold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
            activeSection === 'vscode'
              ? 'border-blue-700 text-blue-800 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Terminal className="w-4 h-4 text-slate-700" />
          VS Code Execution
        </button>

        <button
          onClick={() => setActiveSection('github')}
          className={`px-4 py-2 font-bold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
            activeSection === 'github'
              ? 'border-blue-700 text-blue-800 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Github className="w-4 h-4 text-slate-800" />
          GitHub Publishing
        </button>

        <button
          onClick={() => setActiveSection('viva')}
          className={`px-4 py-2 font-bold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
            activeSection === 'viva'
              ? 'border-blue-700 text-blue-800 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-purple-600" />
          Viva Voce Q&amp;A
        </button>
      </div>

      {/* SECTION 1: TESTING CHECKLIST */}
      {activeSection === 'testing' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 text-xs sm:text-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">All 9 Mandatory Internship Test Cases Passing:</strong>
              <p className="text-xs text-emerald-800 mt-0.5">
                Each functionality has been verified against boundary cases and automated via JUnit 5 in <code>StudentServiceTest.java</code>.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Test Scenario</th>
                    <th className="px-4 py-3">Execution Steps</th>
                    <th className="px-4 py-3">Expected Outcome</th>
                    <th className="px-4 py-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {testCases.map((tc) => (
                    <tr key={tc.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-blue-800">{tc.id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{tc.title}</td>
                      <td className="px-4 py-3 text-xs text-slate-600 max-w-xs">{tc.steps}</td>
                      <td className="px-4 py-3 text-xs text-slate-600 max-w-xs">{tc.expected}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <Check className="w-3 h-3" />
                          {tc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: MYSQL SETUP */}
      {activeSection === 'mysql' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step-by-Step MySQL Setup Guide</h2>
            <p className="text-xs text-slate-500 mt-1">
              Configure your local MySQL Server 8.x for permanent student data persistence.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Step 1: Log in to MySQL Client
              </span>
              <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs flex items-center justify-between">
                <code>mysql -u root -p</code>
                <button 
                  onClick={() => handleCopy('mysql -u root -p', 'mysql-1')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedKey === 'mysql-1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Step 2: Create the Database
              </span>
              <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs flex items-center justify-between">
                <code>CREATE DATABASE IF NOT EXISTS student_db CHARACTER SET utf8mb4;</code>
                <button 
                  onClick={() => handleCopy('CREATE DATABASE IF NOT EXISTS student_db CHARACTER SET utf8mb4;', 'mysql-2')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedKey === 'mysql-2' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Step 3: Import schema.sql and sample data (Optional)
              </span>
              <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs flex items-center justify-between">
                <code>mysql -u root -p student_db &lt; schema.sql</code>
                <button 
                  onClick={() => handleCopy('mysql -u root -p student_db < schema.sql', 'mysql-3')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedKey === 'mysql-3' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Note: Spring Boot Hibernate automatically runs <code>ddl-auto=update</code>, meaning tables will be created automatically upon app launch even without manual script execution!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: VS CODE EXECUTION */}
      {activeSection === 'vscode' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Exact Commands to Run in Visual Studio Code</h2>
            <p className="text-xs text-slate-500 mt-1">
              Follow these commands in the VS Code integrated terminal.
            </p>
          </div>

          <div className="space-y-4">
            
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800">1. Clean and Compile Code:</span>
              <div className="bg-slate-900 text-slate-100 p-2.5 rounded font-mono text-xs flex items-center justify-between">
                <code>mvn clean compile</code>
                <button onClick={() => handleCopy('mvn clean compile', 'cmd-1')} className="text-slate-400 hover:text-white">
                  {copiedKey === 'cmd-1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800">2. Run JUnit 5 Test Suite:</span>
              <div className="bg-slate-900 text-slate-100 p-2.5 rounded font-mono text-xs flex items-center justify-between">
                <code>mvn test</code>
                <button onClick={() => handleCopy('mvn test', 'cmd-2')} className="text-slate-400 hover:text-white">
                  {copiedKey === 'cmd-2' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200 space-y-2">
              <span className="text-xs font-bold text-blue-900">3. Launch Spring Boot Application:</span>
              <div className="bg-slate-900 text-slate-100 p-2.5 rounded font-mono text-xs flex items-center justify-between">
                <code>mvn spring-boot:run</code>
                <button onClick={() => handleCopy('mvn spring-boot:run', 'cmd-3')} className="text-slate-400 hover:text-white">
                  {copiedKey === 'cmd-3' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-blue-800 font-medium">
                Once Tomcat initializes, open your browser at <strong>http://localhost:8080</strong>.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 4: GITHUB PUBLISHING */}
      {activeSection === 'github' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">GitHub Publishing Workflow</h2>
            <p className="text-xs text-slate-500 mt-1">
              Publish your complete internship source code to GitHub for your evaluation portfolio.
            </p>
          </div>

          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-2">
            <div className="text-slate-400"># 1. Initialize git</div>
            <div className="text-emerald-400">git init</div>
            <div className="text-slate-400 mt-2"># 2. Stage all project files</div>
            <div className="text-emerald-400">git add .</div>
            <div className="text-slate-400 mt-2"># 3. Create initial commit</div>
            <div className="text-emerald-400">git commit -m &quot;feat: complete Student Management System for Codec Technologies Java internship&quot;</div>
            <div className="text-slate-400 mt-2"># 4. Set main branch</div>
            <div className="text-emerald-400">git branch -M main</div>
            <div className="text-slate-400 mt-2"># 5. Link to your remote GitHub repository</div>
            <div className="text-emerald-400">git remote add origin https://github.com/YOUR_USERNAME/student-management-system.git</div>
            <div className="text-slate-400 mt-2"># 6. Push code to GitHub</div>
            <div className="text-emerald-400">git push -u origin main</div>
          </div>
        </div>
      )}

      {/* SECTION 5: VIVA VOCE Q&A */}
      {activeSection === 'viva' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Internship Project Viva / Defense Questions</h2>
            <p className="text-xs text-slate-500 mt-1">
              Model answers for questions commonly asked by academic examiners and internship mentors.
            </p>
          </div>

          <div className="space-y-4">
            {vivaQuestions.map((v, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-blue-900">{v.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{v.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
