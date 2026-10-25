import React, { useState } from 'react';
import { 
  FolderCode, 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Folder, 
  FileText, 
  Database, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { PROJECT_FILES, ProjectFile } from '../data/sourceCodeFiles';

interface ProjectExplorerProps {
  onDownloadZip: () => void;
  isDownloading: boolean;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({
  onDownloadZip,
  isDownloading,
}) => {
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Maven', 'Configuration', 'Java Entity', 'Java Repository', 'Java Service', 'Java Controller', 'Java DTO', 'Thymeleaf Template', 'Database SQL', 'Test'];

  const filteredFiles = selectedCategory === 'All'
    ? PROJECT_FILES
    : PROJECT_FILES.filter(f => f.category === selectedCategory);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-200 tracking-wider mb-1">
            <FolderCode className="w-4 h-4 text-blue-300" />
            Maven Multi-Layer Architecture &bull; Complete Source Code
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Java 17 &amp; Spring Boot 3 Source Code Hub
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl">
            Browse, inspect, and copy complete, compilable Java source code, JPA repositories, Thymeleaf templates, MySQL schemas, and JUnit 5 tests.
          </p>
        </div>

        <div>
          <button
            onClick={onDownloadZip}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Download Complete .ZIP
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-800 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Split Grid: Left File Tree, Right Code Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: File Tree */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-700" />
              Project Files ({filteredFiles.length})
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Maven Root</span>
          </div>

          <div className="p-2 space-y-1 max-h-[600px] overflow-y-auto">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200 text-blue-900 shadow-xs'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold truncate flex items-center gap-2">
                      <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-700' : 'text-slate-400'}`} />
                      {file.name}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-blue-200 text-blue-900' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {file.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 truncate pl-5 font-mono">
                    {file.path}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Viewer */}
        <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800 shadow-md overflow-hidden text-slate-100 flex flex-col">
          
          {/* Code Viewer Header */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400">
                  {selectedFile.path}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 uppercase font-semibold">
                  {selectedFile.language}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {selectedFile.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-300" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Syntax Code Display */}
          <div className="p-4 overflow-x-auto max-h-[550px] overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed bg-slate-900/90 selection:bg-blue-600 selection:text-white">
            <pre>
              <code>{selectedFile.code}</code>
            </pre>
          </div>

          {/* Code Viewer Footer */}
          <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Ready for VS Code / IntelliJ IDEA / Eclipse</span>
            <span>Target: Java 17 + Spring Boot 3.3.4</span>
          </div>

        </div>

      </div>

    </div>
  );
};
