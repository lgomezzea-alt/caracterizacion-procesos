import React from 'react';
import { 
  FolderGit2, 
  X, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Trash2, 
  Copy,
  Layers,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { ProcessCharacterization, ProcessCategory, DemingStage } from '../types/process';
import { PROCESS_CATEGORIES } from '../data/templates';

interface ProcessMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  processes: ProcessCharacterization[];
  activeProcessId: string;
  onSelectProcess: (id: string) => void;
  onNewProcessInCategory: (category: ProcessCategory) => void;
  onDeleteProcess: (id: string) => void;
  onDuplicateProcess: (id: string) => void;
  onOpenJobManual?: () => void;
}

export const ProcessMapModal: React.FC<ProcessMapModalProps> = ({
  isOpen,
  onClose,
  processes,
  activeProcessId,
  onSelectProcess,
  onNewProcessInCategory,
  onDeleteProcess,
  onDuplicateProcess,
  onOpenJobManual
}) => {
  if (!isOpen) return null;

  const getDemingHealth = (proc: ProcessCharacterization) => {
    const acts = proc.activities || [];
    const stages = new Set(acts.map(a => a.stage));
    const count = stages.size; // out of 4 (P, H, V, A)
    return {
      count,
      isComplete: count === 4,
      pCount: acts.filter(a => a.stage === 'Planear').length,
      hCount: acts.filter(a => a.stage === 'Hacer').length,
      vCount: acts.filter(a => a.stage === 'Verificar').length,
      aCount: acts.filter(a => a.stage === 'Actuar').length
    };
  };

  const getCategoryTheme = (cat: ProcessCategory) => {
    switch (cat) {
      case 'Estratégico':
        return {
          border: 'border-blue-300',
          bg: 'bg-blue-50/50',
          badge: 'bg-blue-100 text-blue-800'
        };
      case 'Misional':
        return {
          border: 'border-emerald-300',
          bg: 'bg-emerald-50/50',
          badge: 'bg-emerald-100 text-emerald-800'
        };
      case 'Apoyo':
        return {
          border: 'border-amber-300',
          bg: 'bg-amber-50/50',
          badge: 'bg-amber-100 text-amber-800'
        };
      case 'Evaluación y Control':
        return {
          border: 'border-purple-300',
          bg: 'bg-purple-50/50',
          badge: 'bg-purple-100 text-purple-800'
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <FolderGit2 className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Mapa General de Procesos Organizacionales</h2>
              <p className="text-xs text-indigo-200">
                Visualización integral del sistema de gestión por niveles y estado del Ciclo de Deming (PHVA)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* Explanation Banner with Dual Feeding Sources */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Alimentación del Mapa de Procesos (Doble Vía)</span>
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed max-w-2xl">
                El mapa se alimenta a través del <strong>Manual de Funciones del Cargo</strong> (que define las responsabilidades y competencias que estructuran cada proceso) o mediante la <strong>intervención directa del usuario</strong> (+ Nuevo en categoría).
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenJobManual && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenJobManual();
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                >
                  <Briefcase className="w-3.5 h-3.5 text-blue-200" />
                  <span>Manual de Funciones</span>
                </button>
              )}
              <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1.5 border border-slate-200 rounded-lg">
                {processes.length} Procesos
              </span>
            </div>
          </div>

          {/* Categorized Lanes */}
          <div className="space-y-5">
            {PROCESS_CATEGORIES.map((cat) => {
              const catTheme = getCategoryTheme(cat);
              const procsInCat = processes.filter(p => p.category === cat);

              return (
                <div 
                  key={cat} 
                  className={`border-2 ${catTheme.border} ${catTheme.bg} rounded-2xl p-4 space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg font-extrabold uppercase text-[11px] ${catTheme.badge}`}>
                        Procesos {cat}s
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        ({procsInCat.length} procesos)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNewProcessInCategory(cat)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Nuevo en {cat}</span>
                    </button>
                  </div>

                  {/* Process Cards in Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {procsInCat.map((proc) => {
                      const isActive = proc.id === activeProcessId;
                      const health = getDemingHealth(proc);

                      return (
                        <div
                          key={proc.id}
                          className={`bg-white rounded-xl border p-3.5 space-y-2.5 transition shadow-2xs hover:shadow-sm ${
                            isActive
                              ? 'border-blue-600 ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <span className="font-mono text-[10px] text-slate-400 font-bold">
                                {proc.code || 'S/C'} • v{proc.version || '01'}
                              </span>
                              <h4 className="font-bold text-slate-900 text-xs truncate">
                                {proc.name}
                              </h4>
                            </div>

                            {isActive && (
                              <span className="px-1.5 py-0.5 bg-blue-600 text-white font-bold text-[10px] rounded-md shrink-0">
                                Activo
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-500 line-clamp-2">
                            {proc.objective || 'Sin objetivo redactado aún.'}
                          </p>

                          {/* Deming Cycle Health indicator */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-slate-600">PHVA:</span>
                              <span className={`px-1 py-0.2 rounded font-bold ${health.pCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>P</span>
                              <span className={`px-1 py-0.2 rounded font-bold ${health.hCount > 0 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-400'}`}>H</span>
                              <span className={`px-1 py-0.2 rounded font-bold ${health.vCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-400'}`}>V</span>
                              <span className={`px-1 py-0.2 rounded font-bold ${health.aCount > 0 ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-400'}`}>A</span>
                            </div>

                            <span className="font-medium text-slate-500">
                              {proc.activities?.length || 0} acts.
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-1 gap-1">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => onDuplicateProcess(proc.id)}
                                className="p-1 text-slate-400 hover:text-slate-700"
                                title="Duplicar proceso"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              {processes.length > 1 && (
                                <button
                                  onClick={() => onDeleteProcess(proc.id)}
                                  className="p-1 text-slate-400 hover:text-red-600"
                                  title="Eliminar proceso"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            <button
                              onClick={() => {
                                onSelectProcess(proc.id);
                                onClose();
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-[11px] font-bold transition"
                            >
                              <span>Caracterizar</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {procsInCat.length === 0 && (
                      <div className="col-span-full py-6 text-center text-slate-400 italic bg-white/60 rounded-xl border border-dashed border-slate-300">
                        No hay procesos en esta categoría. Puedes añadir uno con el botón &quot;Nuevo en {cat}&quot;.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
          >
            Cerrar Mapa
          </button>
        </div>

      </div>
    </div>
  );
};
