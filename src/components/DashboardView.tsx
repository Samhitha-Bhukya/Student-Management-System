import React from 'react';
import { 
  Users, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  TrendingUp, 
  Eye, 
  Edit3, 
  GraduationCap, 
  Sparkles 
} from 'lucide-react';
import { Student } from '../types/student';

interface DashboardViewProps {
  students: Student[];
  onNavigate: (tab: string) => void;
  onViewStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  onNavigate,
  onViewStudent,
  onEditStudent,
}) => {
  const total = students.length;
  const averageMarks = total > 0 
    ? Math.round((students.reduce((acc, s) => acc + s.marks, 0) / total) * 10) / 10 
    : 0;
  
  const passedStudents = students.filter(s => s.marks >= 50);
  const failedStudents = students.filter(s => s.marks < 50);
  const passRate = total > 0 ? Math.round((passedStudents.length / total) * 1000) / 10 : 0;

  // Grade Counts
  const gradeCounts = {
    'A+': students.filter(s => s.grade === 'A+').length,
    'A': students.filter(s => s.grade === 'A').length,
    'B': students.filter(s => s.grade === 'B').length,
    'C': students.filter(s => s.grade === 'C').length,
    'D': students.filter(s => s.grade === 'D').length,
    'F': students.filter(s => s.grade === 'F').length,
  };

  // Branch breakdown
  const branchCounts: Record<string, number> = {};
  students.forEach(s => {
    branchCounts[s.branch] = (branchCounts[s.branch] || 0) + 1;
  });

  const recentStudents = [...students].slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Codec Technologies Academic Portal &bull; Spring Boot 3 &amp; MySQL
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Administrative Academic Dashboard
          </h1>
          <p className="text-sm text-blue-100/90 mt-1 max-w-2xl">
            Real-time tracking of student enrollments, departmental score distribution, and automated grade calculations according to Codec Technologies standards.
          </p>
        </div>
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => onNavigate('add-student')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-blue-900 font-semibold text-sm hover:bg-slate-100 shadow transition-all active:scale-95"
          >
            + Enroll Student
          </button>
          <button
            onClick={() => onNavigate('report')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-700/80 hover:bg-blue-600 text-white font-medium text-sm border border-blue-400/40 transition-all"
          >
            View Full Report
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Students */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enrolled</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900">{total}</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              Active student records in MySQL
            </div>
          </div>
        </div>

        {/* Class Average Marks */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-indigo-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class Average</span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900">
              {averageMarks}<span className="text-lg text-slate-400 font-semibold">/100</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Institutional mean academic score
            </div>
          </div>
        </div>

        {/* Passed Students */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Passed Students</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-emerald-700">{passedStudents.length}</div>
            <div className="text-xs font-semibold text-emerald-800 mt-1 flex items-center gap-1">
              <span>{passRate}%</span>
              <span className="font-normal text-slate-500">pass rate (&ge; 50 marks)</span>
            </div>
          </div>
        </div>

        {/* Failed Students */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-rose-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Failed / Remedial</span>
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-rose-700">{failedStudents.length}</div>
            <div className="text-xs text-slate-500 mt-1">
              Needs academic intervention (&lt; 50 marks)
            </div>
          </div>
        </div>

      </div>

      {/* Grade Scale Distribution Cards */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-700" />
              Academic Grade Distribution Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Evaluated strictly via rules: A+ (90-100), A (80-89), B (70-79), C (60-69), D (50-59), F (0-49)
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-100 text-blue-800 border border-blue-200">
            {total} Total Evaluations
          </span>
        </div>

        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
              Grade A+
            </span>
            <div className="text-3xl font-extrabold text-blue-900 my-1">{gradeCounts['A+']}</div>
            <div className="text-[11px] text-blue-700 font-medium">90 &ndash; 100 Marks</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Outstanding</div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
              Grade A
            </span>
            <div className="text-3xl font-extrabold text-indigo-900 my-1">{gradeCounts['A']}</div>
            <div className="text-[11px] text-indigo-700 font-medium">80 &ndash; 89 Marks</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Excellent</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Grade B
            </span>
            <div className="text-3xl font-extrabold text-emerald-900 my-1">{gradeCounts['B']}</div>
            <div className="text-[11px] text-emerald-700 font-medium">70 &ndash; 79 Marks</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Good</div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
              Grade C
            </span>
            <div className="text-3xl font-extrabold text-amber-900 my-1">{gradeCounts['C']}</div>
            <div className="text-[11px] text-amber-700 font-medium">60 &ndash; 69 Marks</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Satisfactory</div>
          </div>

          <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-300">
              Grade D
            </span>
            <div className="text-3xl font-extrabold text-orange-900 my-1">{gradeCounts['D']}</div>
            <div className="text-[11px] text-orange-700 font-medium">50 &ndash; 59 Marks</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Minimum Pass</div>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
              Grade F
            </span>
            <div className="text-3xl font-extrabold text-rose-900 my-1">{gradeCounts['F']}</div>
            <div className="text-[11px] text-rose-700 font-medium">0 &ndash; 49 Marks</div>
            <div className="text-[10px] text-rose-600 font-medium mt-0.5">Remedial Fail</div>
          </div>

        </div>
      </div>

      {/* Two Column Section: Department Breakdown & Recent Enrollments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department / Branch Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-700" />
            Branch Enrollment Summary
          </h3>
          <div className="space-y-3">
            {Object.entries(branchCounts).map(([branch, count]) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={branch}>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span className="truncate pr-2">{branch}</span>
                    <span className="font-bold text-blue-900">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate('students')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center justify-between w-full"
            >
              <span>View all enrolled student records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Student Registrations Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-700" />
                Recent Student Registrations
              </h3>
              <button
                onClick={() => onNavigate('students')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                View Table <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-blue-50/60 text-blue-950 font-semibold border-b border-blue-100">
                  <tr>
                    <th className="px-4 py-2.5">Student ID</th>
                    <th className="px-4 py-2.5">Full Name</th>
                    <th className="px-4 py-2.5">Branch</th>
                    <th className="px-4 py-2.5">Marks</th>
                    <th className="px-4 py-2.5">Grade</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th className="px-4 py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {recentStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-blue-800">{s.studentId}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-900">{s.fullName}</td>
                      <td className="px-4 py-2.5 text-slate-600 truncate max-w-[140px]">{s.branch}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-900">{s.marks}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] ${
                          s.grade === 'A+' ? 'bg-blue-100 text-blue-800' :
                          s.grade === 'A' ? 'bg-indigo-100 text-indigo-800' :
                          s.grade === 'B' ? 'bg-emerald-100 text-emerald-800' :
                          s.grade === 'C' ? 'bg-amber-100 text-amber-800' :
                          s.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {s.grade}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`font-semibold ${s.status === 'Passed' ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onViewStudent(s)}
                            className="p-1 rounded text-slate-500 hover:text-blue-700 hover:bg-blue-50"
                            title="View Scorecard"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onEditStudent(s)}
                            className="p-1 rounded text-slate-500 hover:text-indigo-700 hover:bg-indigo-50"
                            title="Edit Record"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing top 5 latest students</span>
            <button
              onClick={() => onNavigate('add-student')}
              className="font-semibold text-blue-700 hover:underline"
            >
              + Add another student
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
