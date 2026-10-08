import React from 'react';
import { 
  Building2, 
  FileText, 
  Cpu, 
  Workflow, 
  GitFork, 
  Gauge, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { DemingStage } from '../types/process';

export interface StepItem {
  number: number;
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface StepNavigationProps {
  currentStep: number;
  onSelectStep: (stepNumber: number) => void;
  totalSteps: number;
  isDemingComplete: boolean;
  demingCounts: Record<DemingStage, number>;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  onSelectStep,
  totalSteps,
  isDemingComplete,
  demingCounts
}) => {
  const steps: StepItem[] = [
    {
      number: 1,
      id: 'general',
      title: 'Identificación y Alcance',
      subtitle: 'Objetivo, producto y límites',
      icon: <FileText className="w-4 h-4" />
    },
    {
      number: 2,
      id: 'resources',
      title: 'Normas y Recursos',
      subtitle: 'Tecnología, personal y ambiente',
      icon: <Cpu className="w-4 h-4" />
    },
    {
      number: 3,
      id: 'flowchart',
      title: 'Flujograma del Proceso',
      subtitle: 'Diagrama interactivo de flujo',
      icon: <GitFork className="w-4 h-4" />
    },
    {
      number: 4,
      id: 'activities',
      title: 'Mapeo PHVA / SIPOC',
      subtitle: 'Ciclo Deming y entradas/salidas',
      icon: <Workflow className="w-4 h-4" />
    },
    {
      number: 5,
      id: 'controls',
      title: 'Seguimiento y Control',
      subtitle: 'Medición, inspección y KPIs',
      icon: <Gauge className="w-4 h-4" />
    },
    {
      number: 6,
      id: 'sheet',
      title: 'Ficha Oficial de Calidad',
      subtitle: 'Formato estándar y firmas',
      icon: <CheckCircle2 className="w-4 h-4" />
    }
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-2xs print:hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
        {/* Step Buttons Bar */}
        <div className="flex items-center overflow-x-auto pb-1 md:pb-0 gap-1.5 sm:gap-2 no-scrollbar">
          {steps.map((st) => {
            const isActive = currentStep === st.number;
            const isCompleted = currentStep > st.number;

            return (
              <button
                key={st.id}
                onClick={() => onSelectStep(st.number)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition shrink-0 border ${
                  isActive
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs ring-1 ring-blue-500/30'
                    : isCompleted
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? '✓' : st.number}
                </div>
                
                <div className="hidden sm:block">
                  <div className="text-xs font-bold leading-tight">
                    {st.title}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">
                    {st.subtitle}
                  </div>
                </div>

                <div className="sm:hidden text-xs font-bold">
                  P{st.number}
                </div>
              </button>
            );
          })}
        </div>

        {/* Deming Cycle Health Badge & Stepper Prev/Next Buttons */}
        <div className="flex items-center justify-between md:justify-end gap-2 shrink-0">
          
          {/* PHVA Pills summary */}
          <div className="hidden xl:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl text-[11px]">
            <span className="font-semibold text-slate-500">Ciclo Deming:</span>
            <span className={`px-1.5 py-0.5 rounded font-bold ${demingCounts.Planear > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-400'}`}>
              P: {demingCounts.Planear}
            </span>
            <span className={`px-1.5 py-0.5 rounded font-bold ${demingCounts.Hacer > 0 ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-400'}`}>
              H: {demingCounts.Hacer}
            </span>
            <span className={`px-1.5 py-0.5 rounded font-bold ${demingCounts.Verificar > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-400'}`}>
              V: {demingCounts.Verificar}
            </span>
            <span className={`px-1.5 py-0.5 rounded font-bold ${demingCounts.Actuar > 0 ? 'bg-purple-100 text-purple-800' : 'bg-slate-200 text-slate-400'}`}>
              A: {demingCounts.Actuar}
            </span>
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentStep === 1}
              onClick={() => onSelectStep(Math.max(1, currentStep - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            <button
              disabled={currentStep === totalSteps}
              onClick={() => onSelectStep(Math.min(totalSteps, currentStep + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-2xs"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
