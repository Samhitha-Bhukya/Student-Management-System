import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Eye, 
  UserPlus, 
  RotateCcw, 
  ArrowUpDown, 
  AlertTriangle 
} from 'lucide-react';
import { Student, BRANCH_OPTIONS } from '../types/student';

interface StudentsListViewProps {
  students: Student[];
  onNavigate: (tab: string) => void;
  onViewStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (id: number) => void;
}

export const StudentsListView: React.FC<StudentsListViewProps> = ({
  students,
  onNavigate,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'id' | 'marks' | 'name'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Delete modal state
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  // Filter & Search Logic
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const query = searchTerm.toLowerCase().trim();
        const matchesQuery = 
          !query || 
          s.studentId.toLowerCase().includes(query) || 
          s.fullName.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query);

        const matchesBranch = selectedBranch === 'All' || s.branch === selectedBranch;
        const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;

        return matchesQuery && matchesBranch && matchesStatus;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'id') comparison = a.id - b.id;
        else if (sortBy === 'marks') comparison = a.marks - b.marks;
        else if (sortBy === 'name') comparison = a.fullName.localeCompare(b.fullName);
        return sortOrder === 'desc' ? -comparison : comparison;
      });
  }, [students, searchTerm, selectedBranch, selectedStatus, sortBy, sortOrder]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedBranch('All');
    setSelectedStatus('All');
    setSortBy('id');
    setSortOrder('desc');
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      onDeleteStudent(studentToDelete.id);
      setStudentToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Records</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage enrolled students, academic scores, and calculated grades
          </p>
        </div>
        <div>
          <button
            onClick={() => onNavigate('add-student')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-sm transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            + Register New Student
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          
          {/* Search by ID or Name */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Student ID (e.g. B25DS001) or Name..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded px-1.5 py-0.5"
              >
                Clear
              </button>
            )}
          </div>

          {/* Branch Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="All">All Branches / Depts</option>
              {BRANCH_OPTIONS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Passed">Passed (&ge; 50)</option>
              <option value="Failed">Failed (&lt; 50)</option>
            </select>
          </div>

          {/* Sort selector */}
          <div className="sm:col-span-2 flex items-center gap-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-2.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="id">Sort by Recent</option>
              <option value="marks">Sort by Marks</option>
              <option value="name">Sort by Name</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              title={`Sorting: ${sortOrder.toUpperCase()}`}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Active Filters Summary */}
        {(searchTerm || selectedBranch !== 'All' || selectedStatus !== 'All') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-700">Active Filters:</span>
              {searchTerm && (
                <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                  Keyword: &quot;{searchTerm}&quot;
                </span>
              )}
              {selectedBranch !== 'All' && (
                <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                  Branch: {selectedBranch}
                </span>
              )}
              {selectedStatus !== 'All' && (
                <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                  Status: {selectedStatus}
                </span>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Displaying <span className="text-blue-900 font-extrabold">{filteredStudents.length}</span> of {students.length} Total Records
          </div>
          <span className="text-xs text-slate-500">
            Click <strong>View</strong> to inspect full marksheet
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-50/70 text-blue-950 font-semibold border-b border-blue-100 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Student ID</th>
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Email Address</th>
                <th className="px-4 py-3">Branch / Department</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Marks</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-slate-500">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                        <Search className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-800">No Student Records Found</h3>
                      <p className="text-xs text-slate-500">
                        {searchTerm 
                          ? `No student matching "${searchTerm}" was found in the database. Please verify the Student ID or spelling.`
                          : 'There are no students matching the selected filter criteria.'}
                      </p>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <button
                          onClick={handleResetFilters}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium hover:bg-slate-50"
                        >
                          Reset Filters
                        </button>
                        <button
                          onClick={() => onNavigate('add-student')}
                          className="px-3 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800"
                        >
                          + Add New Student
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s, index) => (
                  <tr key={s.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 text-xs text-slate-400 font-mono">{index + 1}</td>
                    <td className="px-4 py-3 font-mono font-bold text-blue-800">
                      {s.studentId}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      <button
                        onClick={() => onViewStudent(s)}
                        className="hover:text-blue-700 hover:underline text-left"
                      >
                        {s.fullName}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{s.email}</td>
                    <td className="px-4 py-3 text-xs text-slate-700">{s.branch}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{s.yearOfStudy}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {s.marks} <span className="text-xs font-normal text-slate-400">/100</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold border ${
                        s.grade === 'A+' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                        s.grade === 'A' ? 'bg-indigo-100 text-indigo-900 border-indigo-300' :
                        s.grade === 'B' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                        s.grade === 'C' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                        s.grade === 'D' ? 'bg-orange-100 text-orange-900 border-orange-300' :
                        'bg-rose-100 text-rose-900 border-rose-300'
                      }`}>
                        {s.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className={`font-semibold ${s.status === 'Passed' ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewStudent(s)}
                          className="px-2.5 py-1 rounded text-xs font-medium text-slate-700 bg-slate-100 hover:bg-blue-100 hover:text-blue-800 transition-colors"
                          title="View Marksheet"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onEditStudent(s)}
                          className="px-2.5 py-1 rounded text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                          title="Edit Details"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setStudentToDelete(s)}
                          className="px-2.5 py-1 rounded text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors"
                          title="Delete Record"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            Spring Data JPA Repository: <code className="bg-slate-200 px-1 py-0.5 rounded text-blue-900 font-mono">searchStudents(:keyword)</code>
          </div>
          <div>
            Standardized grading applied across all departments
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal Dialog */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Confirm Record Deletion</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4">
              Are you sure you want to permanently delete student record for{' '}
              <strong className="text-slate-900">{studentToDelete.fullName}</strong> (ID:{' '}
              <span className="font-mono text-blue-800 font-bold">{studentToDelete.studentId}</span>) from the database?
            </p>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1 mb-5">
              <div><strong>Department:</strong> {studentToDelete.branch}</div>
              <div><strong>Academic Marks:</strong> {studentToDelete.marks} / 100 ({studentToDelete.grade})</div>
              <div><strong>Email:</strong> {studentToDelete.email}</div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setStudentToDelete(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-sm"
              >
                Yes, Delete Student
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
