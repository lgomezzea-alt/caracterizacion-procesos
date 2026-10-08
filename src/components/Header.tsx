import React from 'react';
import { 
  Building2, 
  Layers, 
  FileCheck, 
  Plus, 
  Download, 
  Printer, 
  HelpCircle,
  Share2,
  FolderGit2
} from 'lucide-react';
import { OrgContext, ProcessCharacterization } from '../types/process';

interface HeaderProps {
  orgContext: OrgContext;
  processes: ProcessCharacterization[];
  activeProcess: ProcessCharacterization;
  onSelectProcess: (id: string) => void;
  onNewProcess: () => void;
  onOpenOrgModal: () => void;
  onOpenProcessMap: () => void;
  onOpenAssistantHelp: () => void;
  onPrintPreview: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  orgContext,
  processes,
  activeProcess,
  onSelectProcess,
  onNewProcess,
  onOpenOrgModal,
  onOpenProcessMap,
  onOpenAssistantHelp,
  onPrintPreview
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo & Org Name */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onOpenOrgModal}
              title="Click para ver/editar contexto organizacional"
              className="group flex items-center gap-3 p-1.5 -ml-1.5 rounded-xl hover:bg-slate-100 transition text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold text-lg shadow-sm ring-2 ring-blue-500/20 group-hover:ring-blue-600 transition shrink-0">
                {orgContext.logoUrl ? (
                  <img 
                    src={orgContext.logoUrl} 
                    alt="Logo" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <Building2 className="w-6 h-6 text-blue-100" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-slate-900 text-sm sm:text-base leading-tight truncate">
                    {orgContext.name || 'Mi Organización'}
                  </h1>
                  <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded">
                    NIT: {orgContext.nit || 'Sin NIT'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {orgContext.slogan ? orgContext.slogan : 'Sistema de Gestión de Calidad ISO 9001'}
                </p>
              </div>
            </button>
          </div>

          {/* Process Selector & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Process Picker */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
              <Layers className="w-4 h-4 text-slate-500 hidden sm:block" />
              <div className="text-left">
                <span className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider leading-none">
                  Proceso Activo
                </span>
                <select
                  value={activeProcess.id}
                  onChange={(e) => onSelectProcess(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden cursor-pointer max-w-[150px] sm:max-w-[210px] truncate"
                >
                  {processes.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.code || 'S/C'}] {p.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={onNewProcess}
                title="Crear nueva caracterización de proceso"
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Navigation Buttons */}
            <button
              onClick={onOpenProcessMap}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs"
            >
              <FolderGit2 className="w-4 h-4 text-indigo-600" />
              <span>Mapa de Procesos</span>
            </button>

            <button
              onClick={onOpenOrgModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Contexto Org.</span>
            </button>

            <button
              onClick={onOpenAssistantHelp}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition"
              title="Guía metodológica y asistente"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span className="hidden lg:inline">Guía ISO / Deming</span>
            </button>

            <button
              onClick={onPrintPreview}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Ver / Imprimir Ficha</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
