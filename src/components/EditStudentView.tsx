import React, { useState } from 'react';
import { ArrowLeft, Save, AlertCircle, Calculator } from 'lucide-react';
import { 
  Student, 
  BRANCH_OPTIONS, 
  YEAR_OPTIONS, 
  calculateGrade 
} from '../types/student';

interface EditStudentViewProps {
  student: Student;
  allStudents: Student[];
  onUpdateStudent: (updatedStudent: Student) => void;
  onCancel: () => void;
}

export const EditStudentView: React.FC<EditStudentViewProps> = ({
  student,
  allStudents,
  onUpdateStudent,
  onCancel,
}) => {
  const [studentId, setStudentId] = useState(student.studentId);
  const [fullName, setFullName] = useState(student.fullName);
  const [email, setEmail] = useState(student.email);
  const [phoneNumber, setPhoneNumber] = useState(student.phoneNumber);
  const [branch, setBranch] = useState(student.branch);
  const [yearOfStudy, setYearOfStudy] = useState(student.yearOfStudy);
  const [marks, setMarks] = useState(student.marks.toString());

  const [errors, setErrors] = useState<Record<string, string>>({});

  const marksNum = parseFloat(marks);
  const isValidMarks = !isNaN(marksNum) && marksNum >= 0 && marksNum <= 100;
  const gradePreview = isValidMarks ? calculateGrade(marksNum) : null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const cleanId = studentId.trim().toUpperCase();
    if (!cleanId) {
      newErrors.studentId = 'Student ID is required';
    } else if (allStudents.some(s => s.id !== student.id && s.studentId.toUpperCase() === cleanId)) {
      newErrors.studentId = `Student ID '${cleanId}' is already assigned to another student!`;
    }

    const cleanName = fullName.trim();
    if (!cleanName) {
      newErrors.fullName = 'Full Name is required';
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      newErrors.email = 'Email address is required';
    } else if (allStudents.some(s => s.id !== student.id && s.email.toLowerCase() === cleanEmail)) {
      newErrors.email = `Email '${cleanEmail}' belongs to another student!`;
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!branch) {
      newErrors.branch = 'Please select a branch';
    }

    if (!yearOfStudy) {
      newErrors.yearOfStudy = 'Please select year of study';
    }

    if (marks === '' || isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      newErrors.marks = 'Marks must be a valid number between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const { grade, status } = calculateGrade(marksNum);

    onUpdateStudent({
      ...student,
      studentId: studentId.trim().toUpperCase(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      branch,
      yearOfStudy,
      marks: Math.round(marksNum * 10) / 10,
      grade,
      status,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students List
        </button>
        <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2.5 py-1 rounded border border-slate-200">
          Database ID: #{student.id}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="px-6 py-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <h1 className="text-xl font-bold">Edit Student Details</h1>
          <p className="text-xs text-blue-200 mt-0.5">
            Updating record for {student.fullName} ({student.studentId})
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Student ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2 text-sm font-mono uppercase bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.studentId && (
                <p className="text-xs text-rose-600 font-medium mt-1">{errors.studentId}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-xs text-rose-600 font-medium mt-1">{errors.fullName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-xs text-rose-600 font-medium mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.phoneNumber && (
                <p className="text-xs text-rose-600 font-medium mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Branch / Department <span className="text-rose-500">*</span>
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {BRANCH_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Year of Study <span className="text-rose-500">*</span>
              </label>
              <select
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-blue-700" />
                Academic Marks (Out of 100) <span className="text-rose-500">*</span>
              </label>
              {gradePreview && (
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-blue-200 text-xs">
                  <span className="text-slate-500">Recalculated:</span>
                  <span className="font-extrabold text-blue-900">{gradePreview.grade}</span>
                  <span className={gradePreview.status === 'Passed' ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                    ({gradePreview.status})
                  </span>
                </div>
              )}
            </div>

            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-full px-3.5 py-2.5 text-base font-bold bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.marks && (
              <p className="text-xs text-rose-600 font-medium">{errors.marks}</p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold shadow-sm transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              Update Student Record
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
