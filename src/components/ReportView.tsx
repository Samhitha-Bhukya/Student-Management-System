import React from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  Trophy, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Users 
} from 'lucide-react';
import { Student } from '../types/student';

interface ReportViewProps {
  students: Student[];
  onViewStudent: (student: Student) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  students,
  onViewStudent,
}) => {
  const total = students.length;
  const averageMarks = total > 0 
    ? Math.round((students.reduce((acc, s) => acc + s.marks, 0) / total) * 10) / 10 
    : 0;

  const passedCount = students.filter(s => s.marks >= 50).length;
  const failedCount = students.filter(s => s.marks < 50).length;
  const passRate = total > 0 ? Math.round((passedCount / total) * 1000) / 10 : 0;

  // Sorted by merit (highest marks first)
  const rankedStudents = [...students].sort((a, b) => b.marks - a.marks);
  const highestScore = rankedStudents.length > 0 ? rankedStudents[0].marks : 0;
  const lowestScore = rankedStudents.length > 0 ? rankedStudents[rankedStudents.length - 1].marks : 0;

  // Grade Counts
  const gradeDistribution = {
    'A+': students.filter(s => s.grade === 'A+').length,
    'A': students.filter(s => s.grade === 'A').length,
    'B': students.filter(s => s.grade === 'B').length,
    'C': students.filter(s => s.grade === 'C').length,
    'D': students.filter(s => s.grade === 'D').length,
    'F': students.filter(s => s.grade === 'F').length,
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-blue-800" />
            Comprehensive Student Performance Report
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Institutional merit rankings, cohort benchmarks, and academic grade evaluations
          </p>
        </div>
        <div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-sm transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print Official Report
          </button>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cohort Size</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{total}</div>
          <span className="text-[11px] text-slate-400">Total students tested</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class Average</span>
          <div className="text-2xl font-extrabold text-blue-900 mt-1">{averageMarks}<span className="text-sm text-slate-400 font-normal">/100</span></div>
          <span className="text-[11px] text-slate-400">Mean class achievement</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Pass Rate</span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">{passRate}%</div>
          <span className="text-[11px] text-emerald-800 font-medium">{passedCount} of {total} passed</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">High / Low Score</span>
          <div className="text-2xl font-extrabold text-indigo-900 mt-1">
            {highestScore} <span className="text-xs text-slate-400 font-normal">/ {lowestScore}</span>
          </div>
          <span className="text-[11px] text-slate-400">Score spread range</span>
        </div>
      </div>

      {/* Top 3 Rank Holders Podium */}
      {rankedStudents.length >= 3 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">Merit Honor Roll (Top 3 Rank Holders)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Rank 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between order-2 sm:order-1 text-center relative">
              <div className="text-2xl mb-1">🥈</div>
              <span className="text-xs font-bold uppercase text-slate-500">Rank #2</span>
              <div className="font-bold text-slate-900 text-sm mt-1">{rankedStudents[1].fullName}</div>
              <div className="text-xs font-mono text-blue-800 font-semibold">{rankedStudents[1].studentId}</div>
              <div className="text-xs text-slate-500 mt-1">{rankedStudents[1].branch}</div>
              <div className="mt-3 pt-2 border-t border-slate-200 font-extrabold text-xl text-slate-800">
                {rankedStudents[1].marks} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
            </div>

            {/* Rank 1 (Podium Center) */}
            <div className="p-5 rounded-xl bg-gradient-to-b from-amber-50/80 to-yellow-50/40 border-2 border-amber-300 flex flex-col justify-between order-1 sm:order-2 text-center shadow-sm relative -translate-y-1">
              <div className="text-3xl mb-1">🥇</div>
              <span className="text-xs font-extrabold uppercase text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full mx-auto">
                First Class Rank #1
              </span>
              <div className="font-extrabold text-slate-900 text-base mt-2">{rankedStudents[0].fullName}</div>
              <div className="text-xs font-mono text-blue-800 font-bold">{rankedStudents[0].studentId}</div>
              <div className="text-xs text-slate-600 mt-1">{rankedStudents[0].branch}</div>
              <div className="mt-3 pt-2 border-t border-amber-200 font-extrabold text-2xl text-amber-900">
                {rankedStudents[0].marks} <span className="text-xs font-normal text-slate-500">/ 100</span>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between order-3 sm:order-3 text-center relative">
              <div className="text-2xl mb-1">🥉</div>
              <span className="text-xs font-bold uppercase text-slate-500">Rank #3</span>
              <div className="font-bold text-slate-900 text-sm mt-1">{rankedStudents[2].fullName}</div>
              <div className="text-xs font-mono text-blue-800 font-semibold">{rankedStudents[2].studentId}</div>
              <div className="text-xs text-slate-500 mt-1">{rankedStudents[2].branch}</div>
              <div className="mt-3 pt-2 border-t border-slate-200 font-extrabold text-xl text-slate-800">
                {rankedStudents[2].marks} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Grading Standard Summary Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900">Institutional Grade Scale &amp; Frequency Table</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-blue-50/70 text-blue-950 font-semibold border-b border-blue-100 uppercase">
              <tr>
                <th className="px-4 py-2.5">Grade</th>
                <th className="px-4 py-2.5">Marks Range</th>
                <th className="px-4 py-2.5">Academic Standing</th>
                <th className="px-4 py-2.5">Count in Class</th>
                <th className="px-4 py-2.5">Percentage of Cohort</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-900">A+</span></td>
                <td className="px-4 py-2.5 font-medium">90 &ndash; 100</td>
                <td className="px-4 py-2.5">Outstanding Mastery</td>
                <td className="px-4 py-2.5 font-bold">{gradeDistribution['A+']}</td>
                <td className="px-4 py-2.5">{total > 0 ? Math.round((gradeDistribution['A+'] / total) * 100) : 0}%</td>
                <td className="px-4 py-2.5 text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded font-bold bg-indigo-100 text-indigo-900">A</span></td>
                <td className="px-4 py-2.5 font-medium">80 &ndash; 89</td>
                <td className="px-4 py-2.5">Excellent</td>
                <td className="px-4 py-2.5 font-bold">{gradeDistribution['A']}</td>
                <td className="px-4 py-2.5">{total > 0 ? Math.round((gradeDistribution['A'] / total) * 100) : 0}%</td>
                <td className="px-4 py-2.5 text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-900">B</span></td>
                <td className="px-4 py-2.5 font-medium">70 &ndash; 79</td>
                <td className="px-4 py-2.5">Good</td>
                <td className="px-4 py-2.5 font-bold">{gradeDistribution['B']}</td>
                <td className="px-4 py-2.5">{total > 0 ? Math.round((gradeDistribution['B'] / total) * 100) : 0}%</td>
                <td className="px-4 py-2.5 text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-900">C</span></td>
                <td className="px-4 py-2.5 font-medium">60 &ndash; 69</td>
                <td className="px-4 py-2.5">Satisfactory</td>
                <td className="px-4 py-2.5 font-bold">{gradeDistribution['C']}</td>
                <td className="px-4 py-2.5">{total > 0 ? Math.round((gradeDistribution['C'] / total) * 100) : 0}%</td>
                <td className="px-4 py-2.5 text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded font-bold bg-orange-100 text-orange-900">D</span></td>
                <td className="px-4 py-2.5 font-medium">50 &ndash; 59</td>
                <td className="px-4 py-2.5">Pass (Minimum Requirement)</td>
                <td className="px-4 py-2.5 font-bold">{gradeDistribution['D']}</td>
                <td className="px-4 py-2.5">{total > 0 ? Math.round((gradeDistribution['D'] / total) * 100) : 0}%</td>
                <td className="px-4 py-2.5 text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-900">F</span></td>
                <td className="px-4 py-2.5 font-medium">0 &ndash; 49</td>
                <td className="px-4 py-2.5">Fail (Needs Remedial)</td>
                <td className="px-4 py-2.5 font-bold text-rose-700">{gradeDistribution['F']}</td>
                <td className="px-4 py-2.5">{total > 0 ? Math.round((gradeDistribution['F'] / total) * 100) : 0}%</td>
                <td className="px-4 py-2.5 text-rose-700 font-semibold">Failed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Class Merit List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Student Merit Ranking (Sorted by Score Descending)
          </h2>
          <span className="text-xs text-slate-500">{rankedStudents.length} Students Evaluated</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-50/70 text-blue-950 font-semibold border-b border-blue-100 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Student ID</th>
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Score / 100</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rankedStudents.map((s, index) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-xs">
                    {index === 0 && <span className="text-base mr-1">🥇</span>}
                    {index === 1 && <span className="text-base mr-1">🥈</span>}
                    {index === 2 && <span className="text-base mr-1">🥉</span>}
                    <span className="text-slate-700">#{index + 1}</span>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-blue-800">{s.studentId}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    <button
                      onClick={() => onViewStudent(s)}
                      className="hover:text-blue-700 hover:underline"
                    >
                      {s.fullName}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{s.branch}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{s.yearOfStudy}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{s.marks}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                      s.grade === 'A+' ? 'bg-blue-100 text-blue-900' :
                      s.grade === 'A' ? 'bg-indigo-100 text-indigo-900' :
                      s.grade === 'B' ? 'bg-emerald-100 text-emerald-900' :
                      s.grade === 'C' ? 'bg-amber-100 text-amber-900' :
                      s.grade === 'D' ? 'bg-orange-100 text-orange-900' :
                      'bg-rose-100 text-rose-900'
                    }`}>
                      {s.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className={s.status === 'Passed' ? 'text-emerald-700 font-semibold' : 'text-rose-600 font-semibold'}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
