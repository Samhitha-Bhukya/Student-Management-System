import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { StudentsListView } from './components/StudentsListView';
import { AddStudentView } from './components/AddStudentView';
import { EditStudentView } from './components/EditStudentView';
import { StudentDetailsView } from './components/StudentDetailsView';
import { ReportView } from './components/ReportView';
import { ProjectExplorer } from './components/ProjectExplorer';
import { MentorGuide } from './components/MentorGuide';
import { Student } from './types/student';
import { INITIAL_STUDENTS } from './data/initialStudents';
import { downloadMavenProjectZip } from './utils/zipGenerator';
import { CheckCircle2, AlertCircle, X, Code2, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'codec_sms_students_data_v1';

export default function App() {
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_STUDENTS;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showThymeleafBadge, setShowThymeleafBadge] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Add Student Handler
  const handleAddStudent = (newStudentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newStudent: Student = {
      ...newStudentData,
      id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setStudents(prev => [newStudent, ...prev]);
    showToast(`Student '${newStudent.fullName}' (${newStudent.studentId}) registered successfully!`);
    setActiveTab('students');
  };

  // Update Student Handler
  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    showToast(`Student details for '${updatedStudent.fullName}' updated successfully!`);
    setActiveTab('students');
  };

  // Delete Student Handler
  const handleDeleteStudent = (id: number) => {
    const target = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    showToast(`Student '${target?.fullName || 'record'}' was deleted from the database.`);
  };

  // View Student Handler
  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setActiveTab('student-details');
  };

  // Edit Student Handler
  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setActiveTab('edit-student');
  };

  // Download ZIP Handler
  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await downloadMavenProjectZip();
      showToast('Maven project student-management-system.zip downloaded successfully!');
    } catch (err: any) {
      showToast('Error downloading project archive: ' + err.message, 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  // Determine current active Thymeleaf template name
  const getThymeleafTemplateName = () => {
    switch (activeTab) {
      case 'dashboard': return 'templates/index.html';
      case 'students': return 'templates/students.html';
      case 'add-student': return 'templates/add-student.html';
      case 'edit-student': return 'templates/edit-student.html';
      case 'student-details': return 'templates/student-details.html';
      case 'report': return 'templates/report.html';
      case 'source-code': return 'Project Codebase Explorer';
      case 'mentor-guide': return 'Internship Setup Manual';
      default: return 'templates/index.html';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddStudentClick={() => setActiveTab('add-student')}
        onDownloadZip={handleDownloadZip}
        isDownloading={isDownloading}
      />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 max-w-md animate-in slide-in-from-top duration-200">
          <div className={`p-4 rounded-xl shadow-lg border flex items-center justify-between gap-3 ${
            toast.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}>
            <div className="flex items-center gap-2">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        
        {/* Thymeleaf Template Indicator Bar */}
        {showThymeleafBadge && (
          <div className="mb-4 bg-blue-50 border border-blue-200/80 rounded-lg px-4 py-2 flex items-center justify-between text-xs text-blue-900 shadow-2xs">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-700" />
              <span>Thymeleaf View: <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-blue-300">{getThymeleafTemplateName()}</code></span>
              <span className="hidden sm:inline text-blue-600/80">&bull; Spring MVC Model attributes rendered on server</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('source-code')}
                className="font-bold underline text-blue-800 hover:text-blue-950"
              >
                Inspect Java Code
              </button>
              <button
                onClick={() => setShowThymeleafBadge(false)}
                className="text-blue-400 hover:text-blue-700 ml-2"
                title="Dismiss hint"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* View Routing */}
        {activeTab === 'dashboard' && (
          <DashboardView
            students={students}
            onNavigate={setActiveTab}
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditStudent}
          />
        )}

        {activeTab === 'students' && (
          <StudentsListView
            students={students}
            onNavigate={setActiveTab}
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        )}

        {activeTab === 'add-student' && (
          <AddStudentView
            students={students}
            onAddStudent={handleAddStudent}
            onCancel={() => setActiveTab('students')}
          />
        )}

        {activeTab === 'edit-student' && selectedStudent && (
          <EditStudentView
            student={selectedStudent}
            allStudents={students}
            onUpdateStudent={handleUpdateStudent}
            onCancel={() => setActiveTab('students')}
          />
        )}

        {activeTab === 'student-details' && selectedStudent && (
          <StudentDetailsView
            student={selectedStudent}
            onBack={() => setActiveTab('students')}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
          />
        )}

        {activeTab === 'report' && (
          <ReportView
            students={students}
            onViewStudent={handleViewStudent}
          />
        )}

        {activeTab === 'source-code' && (
          <ProjectExplorer
            onDownloadZip={handleDownloadZip}
            isDownloading={isDownloading}
          />
        )}

        {activeTab === 'mentor-guide' && (
          <MentorGuide />
        )}

      </main>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>Student Management System &bull; <strong>Codec Technologies</strong> Java Internship Project</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Java 17 LTS</span>
            <span>&bull;</span>
            <span>Spring Boot 3.3.4</span>
            <span>&bull;</span>
            <span>MySQL 8.x</span>
            <span>&bull;</span>
            <span>Thymeleaf</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
