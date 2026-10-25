import React, { useState } from 'react';
import { 
  ArrowLeft, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  Calculator, 
  Sparkles 
} from 'lucide-react';
import { 
  Student, 
  BRANCH_OPTIONS, 
  YEAR_OPTIONS, 
  calculateGrade 
} from '../types/student';

interface AddStudentViewProps {
  students: Student[];
  onAddStudent: (newStudent: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const AddStudentView: React.FC<AddStudentViewProps> = ({
  students,
  onAddStudent,
  onCancel,
}) => {
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [marks, setMarks] = useState('');

  // Validation errors map
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Grade Preview
  const marksNum = parseFloat(marks);
  const isValidMarks = !isNaN(marksNum) && marksNum >= 0 && marksNum <= 100;
  const gradePreview = isValidMarks ? calculateGrade(marksNum) : null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Student ID
    const cleanId = studentId.trim().toUpperCase();
    if (!cleanId) {
      newErrors.studentId = 'Student ID is required (e.g., B25DS001)';
    } else if (!/^[A-Z0-9]{4,15}$/.test(cleanId)) {
      newErrors.studentId = 'Student ID must be 4-15 alphanumeric characters (e.g., B25DS001)';
    } else if (students.some(s => s.studentId.toUpperCase() === cleanId)) {
      newErrors.studentId = `Student ID '${cleanId}' is already registered in the system! Duplicate IDs are not allowed.`;
    }

    // 2. Full Name
    const cleanName = fullName.trim();
    if (!cleanName) {
      newErrors.fullName = 'Full Name is required';
    } else if (cleanName.length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters';
    }

    // 3. Email Address
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = 'Please provide a valid email format (e.g. name@example.com)';
    } else if (students.some(s => s.email.toLowerCase() === cleanEmail)) {
      newErrors.email = `Email '${cleanEmail}' is already registered to another student! Duplicate emails are rejected.`;
    }

    // 4. Phone Number
    const cleanPhone = phoneNumber.trim();
    if (!cleanPhone) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+()\-\s]{10,15}$/.test(cleanPhone)) {
      newErrors.phoneNumber = 'Please enter a valid 10-15 digit phone number';
    }

    // 5. Branch
    if (!branch) {
      newErrors.branch = 'Please select a branch or department';
    }

    // 6. Year of Study
    if (!yearOfStudy) {
      newErrors.yearOfStudy = 'Please select the academic year of study';
    }

    // 7. Marks
    if (marks === '') {
      newErrors.marks = 'Marks are required (0 to 100)';
    } else if (isNaN(marksNum)) {
      newErrors.marks = 'Marks must be a valid numeric score';
    } else if (marksNum < 0 || marksNum > 100) {
      newErrors.marks = 'Marks must be strictly between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const { grade, status } = calculateGrade(marksNum);

    onAddStudent({
      studentId: studentId.trim().toUpperCase(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      branch,
      yearOfStudy,
      marks: Math.round(marksNum * 10) / 10,
      grade,
      status,
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Top Breadcrumb & Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students List
        </button>
        <span className="text-xs bg-blue-100 text-blue-900 font-semibold px-2.5 py-1 rounded-full border border-blue-200">
          Codec Technologies Enrollment Form
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/20">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Register New Student</h1>
              <p className="text-xs text-blue-200 mt-0.5">
                Inputs will be validated via Spring Boot validation rules with unique ID and email guarantees.
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Student ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Student ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value.toUpperCase());
                  if (errors.studentId) setErrors(prev => ({ ...prev, studentId: '' }));
                }}
                placeholder="e.g. B25DS001"
                className={`w-full px-3.5 py-2 text-sm font-mono uppercase bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.studentId ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30' : 'border-slate-200 focus:ring-blue-500'
                }`}
              />
              <p className="text-[11px] text-slate-500 mt-1">Unique institutional alphanumeric ID</p>
              {errors.studentId && (
                <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.studentId}
                </p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                }}
                placeholder="e.g. Jane Doe"
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.fullName ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30' : 'border-slate-200 focus:ring-blue-500'
                }`}
              />
              <p className="text-[11px] text-slate-500 mt-1">First and last name as per records</p>
              {errors.fullName && (
                <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.fullName}
                </p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }}
                placeholder="e.g. student@codectechnologies.com"
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.email ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30' : 'border-slate-200 focus:ring-blue-500'
                }`}
              />
              <p className="text-[11px] text-slate-500 mt-1">Must be unique across all students</p>
              {errors.email && (
                <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                }}
                placeholder="e.g. +91 9876543210"
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.phoneNumber ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30' : 'border-slate-200 focus:ring-blue-500'
                }`}
              />
              <p className="text-[11px] text-slate-500 mt-1">Include country code if applicable</p>
              {errors.phoneNumber && (
                <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Branch */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Branch / Department <span className="text-rose-500">*</span>
              </label>
              <select
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                  if (errors.branch) setErrors(prev => ({ ...prev, branch: '' }));
                }}
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.branch ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30' : 'border-slate-200 focus:ring-blue-500'
                }`}
              >
                <option value="">-- Select Department --</option>
                {BRANCH_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {errors.branch && (
                <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.branch}
                </p>
              )}
            </div>

            {/* Year of Study */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Year of Study <span className="text-rose-500">*</span>
              </label>
              <select
                value={yearOfStudy}
                onChange={(e) => {
                  setYearOfStudy(e.target.value);
                  if (errors.yearOfStudy) setErrors(prev => ({ ...prev, yearOfStudy: '' }));
                }}
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.yearOfStudy ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30' : 'border-slate-200 focus:ring-blue-500'
                }`}
              >
                <option value="">-- Select Year --</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {errors.yearOfStudy && (
                <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.yearOfStudy}
                </p>
              )}
            </div>

          </div>

          {/* Marks and Live Grade Calculator */}
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-blue-700" />
                Academic Marks (0 &ndash; 100) <span className="text-rose-500">*</span>
              </label>
              
              {/* Dynamic Live Grade Preview Badge */}
              {gradePreview && (
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-blue-200 shadow-xs">
                  <span className="text-[11px] text-slate-500 font-medium">Automatic Grade:</span>
                  <span className="font-extrabold text-blue-800 text-xs px-2 py-0.5 rounded bg-blue-100">
                    {gradePreview.grade}
                  </span>
                  <span className={`text-[11px] font-bold ${gradePreview.status === 'Passed' ? 'text-emerald-700' : 'text-rose-600'}`}>
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
              onChange={(e) => {
                setMarks(e.target.value);
                if (errors.marks) setErrors(prev => ({ ...prev, marks: '' }));
              }}
              placeholder="e.g. 88.5"
              className={`w-full px-3.5 py-2.5 text-base font-bold bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.marks ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30' : 'border-blue-200 focus:ring-blue-500 text-blue-950'
              }`}
            />

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
              <span>90–100: <strong className="text-blue-900">A+</strong></span>
              <span>&bull; 80–89: <strong className="text-indigo-900">A</strong></span>
              <span>&bull; 70–79: <strong className="text-emerald-900">B</strong></span>
              <span>&bull; 60–69: <strong className="text-amber-900">C</strong></span>
              <span>&bull; 50–59: <strong className="text-orange-900">D</strong></span>
              <span>&bull; 0–49: <strong className="text-rose-900">F</strong></span>
            </div>

            {errors.marks && (
              <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.marks}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save &amp; Enroll Student
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
