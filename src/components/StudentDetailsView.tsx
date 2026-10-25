import React from 'react';
import { 
  ArrowLeft, 
  Printer, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Mail, 
  Phone, 
  Award, 
  Building, 
  Calendar, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { Student } from '../types/student';

interface StudentDetailsViewProps {
  student: Student;
  onBack: () => void;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

export const StudentDetailsView: React.FC<StudentDetailsViewProps> = ({
  student,
  onBack,
  onEdit,
  onDelete,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const getRemarks = (marks: number) => {
    if (marks >= 90) return 'Outstanding mastery & academic excellence (Grade A+). Eligible for honors commendation.';
    if (marks >= 80) return 'Excellent performance with strong grasp of technical coursework (Grade A).';
    if (marks >= 70) return 'Good academic achievement demonstrating consistent practical competence (Grade B).';
    if (marks >= 60) return 'Satisfactory achievement meeting degree course standards (Grade C).';
    if (marks >= 50) return 'Passing score. Recommended to strengthen core theoretical foundations (Grade D).';
    return 'Remedial academic intervention recommended. Student scored below the 50% passing threshold.';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Bar Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students List
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Marksheet
          </button>
          <button
            onClick={() => onEdit(student)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </button>
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to delete ${student.fullName}?`)) {
                onDelete(student.id);
                onBack();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>

      {/* Marksheet Card (Styled for Screen and Print) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden print:border-none print:shadow-none">
        
        {/* Certificate / Institutional Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-6 sm:p-8 border-b-4 border-amber-400">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">
                <ShieldCheck className="w-4 h-4" />
                Codec Technologies Academic Verification
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Official Student Marksheet &amp; Profile
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                Institutional Performance Record &bull; Spring Boot 3 / Hibernate Verified
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-lg border border-white/20 text-right">
              <div className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">Student ID</div>
              <div className="text-xl font-mono font-extrabold text-amber-300 tracking-wider">
                {student.studentId}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Box: Avatar & Score Pod */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center flex flex-col items-center justify-between">
              <div className="w-full">
                <div className="w-20 h-20 rounded-full bg-blue-700 text-white flex items-center justify-center text-3xl font-bold shadow-md mx-auto mb-3 border-4 border-white">
                  {student.fullName.charAt(0)}
                </div>
                <h2 className="text-lg font-bold text-slate-900">{student.fullName}</h2>
                <span className="font-mono text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  {student.studentId}
                </span>

                <div className="my-5 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Awarded Grade</span>
                  <div className="text-4xl font-extrabold text-blue-900 my-0.5">
                    {student.grade}
                  </div>
                  <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${
                    student.status === 'Passed' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {student.status}
                  </span>
                </div>
              </div>

              <div className="w-full text-left text-xs text-slate-500 space-y-2 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span className="truncate">{student.branch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>{student.yearOfStudy}</span>
                </div>
              </div>
            </div>

            {/* Right 2 Columns: Detailed Academic Breakdown */}
            <div className="md:col-span-2 space-y-5">
              
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-900 mb-3 pb-2 border-b border-slate-200 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-700" />
                  Academic Evaluation Summary
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50/70 p-3.5 rounded-lg border border-blue-100">
                    <span className="text-xs text-slate-500 font-medium">Marks Obtained</span>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">
                      {student.marks} <span className="text-sm text-slate-400 font-normal">/ 100</span>
                    </div>
                  </div>
                  <div className="bg-indigo-50/70 p-3.5 rounded-lg border border-indigo-100">
                    <span className="text-xs text-slate-500 font-medium">Percentage</span>
                    <div className="text-2xl font-extrabold text-indigo-900 mt-1">
                      {student.marks}%
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>Score Progress Gauge</span>
                    <span className="font-bold text-blue-900">{student.marks}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        student.marks >= 50 ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                      style={{ width: `${Math.min(100, student.marks)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Official Remarks */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Mentor / Evaluator Remarks
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  &ldquo;{getRemarks(student.marks)}&rdquo;
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Registered Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-800 font-medium truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-800 font-medium">{student.phoneNumber}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Marksheet Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            System Generated &bull; Codec Technologies Internship Project &bull; Java 17 / Spring Boot 3
          </div>
          <div className="flex items-center gap-1 text-emerald-700 font-semibold">
            <Check className="w-4 h-4" />
            Verified Record #{student.id}
          </div>
        </div>

      </div>

    </div>
  );
};
