import React from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  FileSpreadsheet, 
  FolderCode, 
  BookOpenCheck, 
  Download, 
  UserPlus 
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddStudentClick: () => void;
  onDownloadZip: () => void;
  isDownloading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onAddStudentClick,
  onDownloadZip,
  isDownloading,
}) => {
  return (
    <header className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-700 border border-blue-500/40 flex items-center justify-center text-white shadow-inner group-hover:bg-blue-600 transition-colors">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-lg leading-tight tracking-tight text-white flex items-center gap-2">
                Student Management System
                <span className="hidden md:inline-block text-[11px] font-semibold bg-blue-600 text-blue-100 px-2 py-0.5 rounded-full border border-blue-400/30">
                  Java 17 &bull; Spring Boot 3
                </span>
              </div>
              <div className="text-xs text-blue-200 tracking-wider uppercase font-medium">
                Codec Technologies Java Internship
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-900/80 text-white shadow-sm border border-blue-600/50'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'students'
                  ? 'bg-blue-900/80 text-white shadow-sm border border-blue-600/50'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Students List
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'report'
                  ? 'bg-blue-900/80 text-white shadow-sm border border-blue-600/50'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Performance Report
            </button>

            <button
              onClick={() => setActiveTab('source-code')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'source-code'
                  ? 'bg-blue-900/80 text-white shadow-sm border border-blue-600/50'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <FolderCode className="w-4 h-4" />
              Project Files
            </button>

            <button
              onClick={() => setActiveTab('mentor-guide')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'mentor-guide'
                  ? 'bg-blue-900/80 text-white shadow-sm border border-blue-600/50'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <BookOpenCheck className="w-4 h-4" />
              Internship Guide
            </button>
          </nav>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onDownloadZip}
              disabled={isDownloading}
              title="Download entire Maven Spring Boot project as .ZIP file"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-700 hover:bg-blue-600 text-white border border-blue-500/50 shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span> Maven .ZIP
            </button>

            <button
              onClick={onAddStudentClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md bg-white hover:bg-slate-100 text-blue-900 shadow-sm transition-all active:scale-95"
            >
              <UserPlus className="w-4 h-4 text-blue-700" />
              <span>+ Add Student</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-2 border-t border-blue-700 text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-white text-blue-900 font-bold' : 'text-blue-100'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${activeTab === 'students' ? 'bg-white text-blue-900 font-bold' : 'text-blue-100'}`}
          >
            Students List
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${activeTab === 'report' ? 'bg-white text-blue-900 font-bold' : 'text-blue-100'}`}
          >
            Report
          </button>
          <button
            onClick={() => setActiveTab('source-code')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${activeTab === 'source-code' ? 'bg-white text-blue-900 font-bold' : 'text-blue-100'}`}
          >
            Java Code Explorer
          </button>
          <button
            onClick={() => setActiveTab('mentor-guide')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${activeTab === 'mentor-guide' ? 'bg-white text-blue-900 font-bold' : 'text-blue-100'}`}
          >
            Setup &amp; Viva
          </button>
        </div>
      </div>
    </header>
  );
};
