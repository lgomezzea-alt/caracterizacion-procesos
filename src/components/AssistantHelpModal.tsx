import React from 'react';
import { 
  HelpCircle, 
  X, 
  Target, 
  AlertOctagon, 
  CheckCircle2, 
  Workflow, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Cpu
} from 'lucide-react';
import { DEMING_GUIDES, PROCESS_TEMPLATES } from '../data/templates';
import { ProcessCharacterization } from '../types/process';

interface AssistantHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadTemplate: (template: ProcessCharacterization) => void;
}

export const AssistantHelpModal: React.FC<AssistantHelpModalProps> = ({
  isOpen,
  onClose,
  onLoadTemplate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-amber-950 via-slate-900 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-xl">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Guía Metodológica: Caracterización y Ciclo de Deming</h2>
              <p className="text-xs text-amber-200">
                Fundamentos ISO 9001, resolución de baja productividad y plantillas integrales
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700">
          
          {/* Problema y Objetivo Central */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider">
                <AlertOctagon className="w-4 h-4 text-red-600" />
                <span>Problema Organizacional</span>
              </div>
              <p className="text-slate-800 leading-relaxed font-medium">
                &ldquo;Las empresas presentan baja productividad en los procesos organizacionales, debido al no control y mejora continua de las actividades y los recursos de los procesos.&rdquo;
              </p>
              <p className="text-[11px] text-slate-600">
                Sin una caracterización clara, no hay responsables definidos, se desconocen los requisitos de entrada/salida y se repiten errores operativos sin control.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>Objetivo de la Caracterización</span>
              </div>
              <p className="text-slate-800 leading-relaxed font-medium">
                &ldquo;Planear, ejecutar, controlar y realizar mejora continua a través de la caracterización formal de los procesos, flujograma de trabajo, normas técnicas/legales y recursos.&rdquo;
              </p>
              <p className="text-[11px] text-slate-600">
                Lograr que cada proceso tenga mediciones confiables (KPIs), criterios de aceptación/rechazo y contingencias claras.
              </p>
            </div>

          </div>

          {/* Ciclo de Deming PHVA */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Workflow className="w-5 h-5 text-blue-600" />
              <span>El Ciclo de Deming (PHVA) Aplicado al Proceso</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(DEMING_GUIDES).map(([stage, info]) => (
                <div key={stage} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center justify-between">
                    <span>{info.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {info.description}
                  </p>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Ejemplos típicos:</span>
                    <ul className="text-[10px] text-slate-600 list-disc list-inside space-y-1">
                      {info.examples.slice(0, 2).map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plantillas Completas Pre-configuradas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Plantillas Maestras Disponibles (Cargar en 1 Clic)</span>
              </div>
              <span className="text-[11px] text-slate-500">
                Puedes cargar estas plantillas para ver ejemplos reales o acelerar tu trabajo
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PROCESS_TEMPLATES.map((tmpl) => (
                <div key={tmpl.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2 hover:border-blue-400 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-blue-600">
                      {tmpl.code}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-semibold">
                      {tmpl.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs">
                    {tmpl.name}
                  </h4>

                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {tmpl.objective}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      {tmpl.activities.length} acts • {tmpl.indicators.length} KPIs
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onLoadTemplate(tmpl);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition shadow-2xs"
                    >
                      <span>Cargar Plantilla</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
          >
            Entendido, volver a la caracterización
          </button>
        </div>

      </div>
    </div>
  );
};
