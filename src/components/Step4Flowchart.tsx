import React, { useState } from 'react';
import { 
  GitFork, 
  ArrowRight, 
  ArrowLeft, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  FolderGit2,
  Scale,
  Compass,
  Building2,
  CheckCircle2,
  X
} from 'lucide-react';
import { ProcessCharacterization, ProcessActivity, DemingStage } from '../types/process';

interface Step4FlowchartProps {
  process: ProcessCharacterization;
  processes?: ProcessCharacterization[];
  onChange: (updated: Partial<ProcessCharacterization>) => void;
  onNext: () => void;
  onPrev: () => void;
  onOpenProcessMap?: () => void;
  viewMode?: 'swimlanes' | 'sequential';
  onViewModeChange?: (view: 'swimlanes' | 'sequential') => void;
  zoomLevel?: number;
  onZoomChange?: (zoom: number) => void;
}

export const Step4Flowchart: React.FC<Step4FlowchartProps> = ({
  process,
  processes = [],
  onChange,
  onNext,
  onPrev,
  onOpenProcessMap,
  viewMode,
  onViewModeChange,
  zoomLevel,
  onZoomChange
}) => {
  const [internalView, setInternalView] = useState<'swimlanes' | 'sequential'>('swimlanes');
  const [internalZoom, setInternalZoom] = useState<number>(1);
  const [selectedActivity, setSelectedActivity] = useState<ProcessActivity | null>(null);
  const [showIntegrationsCard, setShowIntegrationsCard] = useState(true);

  const activeView = viewMode !== undefined ? viewMode : internalView;
  const activeZoom = zoomLevel !== undefined ? zoomLevel : internalZoom;

  const handleSetView = (view: 'swimlanes' | 'sequential') => {
    setInternalView(view);
    if (onViewModeChange) onViewModeChange(view);
  };

  const handleSetZoom = (valOrFn: number | ((prev: number) => number)) => {
    const nextVal = typeof valOrFn === 'function' ? valOrFn(activeZoom) : valOrFn;
    setInternalZoom(nextVal);
    if (onZoomChange) onZoomChange(nextVal);
  };

  const activities = process.activities || [];
  const norms = process.legalAndTechnicalNorms || [];

  // Mapeo de normas a fases PHVA
  const stageNormsGuide: Record<DemingStage, { clause: string; desc: string }> = {
    Planear: {
      clause: 'ISO 9001: Cap. 4, 5 y 6',
      desc: 'Contexto, liderazgo, política, objetivos y gestión del riesgo'
    },
    Hacer: {
      clause: 'ISO 9001: Cap. 8',
      desc: 'Operación, control de procesos, trazabilidad y salidas no conformes'
    },
    Verificar: {
      clause: 'ISO 9001: Cap. 9 (9.1 / 9.2)',
      desc: 'Seguimiento, medición, análisis, evaluación y liberación técnica'
    },
    Actuar: {
      clause: 'ISO 9001: Cap. 10',
      desc: 'Mejora continua, corrección y acciones para evitar recurrencia'
    }
  };

  const stageColors: Record<DemingStage, { bg: string; border: string; text: string; header: string; lightBg: string }> = {
    Planear: {
      bg: 'bg-emerald-600',
      border: 'border-emerald-300',
      text: 'text-emerald-900',
      header: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      lightBg: 'bg-emerald-50/60'
    },
    Hacer: {
      bg: 'bg-blue-600',
      border: 'border-blue-300',
      text: 'text-blue-900',
      header: 'bg-blue-100 text-blue-800 border-blue-300',
      lightBg: 'bg-blue-50/60'
    },
    Verificar: {
      bg: 'bg-amber-600',
      border: 'border-amber-300',
      text: 'text-amber-900',
      header: 'bg-amber-100 text-amber-800 border-amber-300',
      lightBg: 'bg-amber-50/60'
    },
    Actuar: {
      bg: 'bg-purple-600',
      border: 'border-purple-300',
      text: 'text-purple-900',
      header: 'bg-purple-100 text-purple-800 border-purple-300',
      lightBg: 'bg-purple-50/60'
    }
  };

  const planActivities = activities.filter(a => a.stage === 'Planear');
  const doActivities = activities.filter(a => a.stage === 'Hacer');
  const checkActivities = activities.filter(a => a.stage === 'Verificar');
  const actActivities = activities.filter(a => a.stage === 'Actuar');

  // Procesos proveedores y clientes derivados del mapa de procesos
  const firstActivitySupplier = activities[0]?.supplier || 'Procesos Proveedores del Mapa';
  const lastActivityCustomer = activities[activities.length - 1]?.customer || 'Procesos Clientes del Mapa';

  return (
    <div className="space-y-6">
      
      {/* Intro Guidance Card */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              Paso 3 de 6 • Flujograma Metodológico
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Flujograma del Proceso basado en el Ciclo de Deming (PHVA)
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Representación visual estandarizada del recorrido de actividades. Integra el inicio desde el alcance, la secuencia por carriles PHVA (Planear, Hacer, Verificar, Actuar) con decisiones de control de calidad, y la entrega final del producto/servicio.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/20 shrink-0">
            <button
              onClick={() => handleSetView('swimlanes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeView === 'swimlanes' ? 'bg-white text-slate-900 shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Carriles PHVA</span>
            </button>
            <button
              onClick={() => handleSetView('sequential')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeView === 'sequential' ? 'bg-white text-slate-900 shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Secuencia Continua</span>
            </button>
          </div>
        </div>
      </div>

      {/* APORTE DE NORMAS Y MAPA DE PROCESOS AL FLUJOGRAMA */}
      <div className="bg-gradient-to-r from-slate-50 via-indigo-50/50 to-blue-50/50 rounded-2xl border border-indigo-200 p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-200/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
                <span>Aportes del Mapa de Procesos y de las Normas al Flujograma</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-bold">
                  Interacción Interprocesos & ISO
                </span>
              </h3>
              <p className="text-[11px] text-slate-600">
                El Flujograma conecta las entradas desde procesos proveedores, aplica controles bajo normas técnicas y entrega resultados a procesos clientes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onOpenProcessMap && (
              <button
                type="button"
                onClick={onOpenProcessMap}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg shadow-2xs transition"
              >
                <FolderGit2 className="w-3 h-3 text-indigo-600" />
                <span>Mapa de Procesos ({processes.length})</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowIntegrationsCard(!showIntegrationsCard)}
              className="text-[11px] text-indigo-700 hover:underline font-semibold ml-1"
            >
              {showIntegrationsCard ? 'Contraer' : 'Expandir'}
            </button>
          </div>
        </div>

        {showIntegrationsCard && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1 text-xs">
            {/* Aporte del Mapa de Procesos */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px]">
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                Interacciones con el Mapa de Procesos
              </span>
              <div className="space-y-1.5 text-[11px]">
                <div className="p-2 bg-blue-50/70 rounded-lg border border-blue-100 flex items-center justify-between">
                  <span className="text-slate-600">Entrada inicial proviene de:</span>
                  <strong className="text-blue-900 font-bold truncate max-w-[170px]">{firstActivitySupplier}</strong>
                </div>
                <div className="p-2 bg-emerald-50/70 rounded-lg border border-emerald-100 flex items-center justify-between">
                  <span className="text-slate-600">Salida final se entrega a:</span>
                  <strong className="text-emerald-900 font-bold truncate max-w-[170px]">{lastActivityCustomer}</strong>
                </div>
              </div>
            </div>

            {/* Aporte de las Normas Técnicas */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px]">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                Marco Normativo del Flujo ({norms.length} normas vinculadas)
              </span>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {norms.length > 0 ? (
                  norms.map((norm, idx) => (
                    <div key={idx} className="p-1.5 bg-slate-50 border border-slate-100 rounded text-[10px] text-slate-700 truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                      <span className="truncate">{norm}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-slate-400 italic">
                    Sin normas registradas en el Paso 2. Se aplican los numerales base de ISO 9001:2015.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Canvas / Diagram Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700 uppercase tracking-wider">
              Leyenda Simbología:
            </span>
            <span className="inline-flex items-center gap-1 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-slate-800"></span> Inicio/Fin
            </span>
            <span className="inline-flex items-center gap-1 text-slate-600">
              <span className="w-3 h-3 rounded-sm bg-blue-600"></span> Actividad
            </span>
            <span className="inline-flex items-center gap-1 text-slate-600">
              <span className="w-3 h-3 transform rotate-45 bg-amber-500"></span> Decisión / Control
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSetZoom((prev: number) => Math.max(0.7, prev - 0.1))}
              className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
              title="Reducir zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-500 text-[11px] w-12 text-center">
              {Math.round(activeZoom * 100)}%
            </span>
            <button
              onClick={() => handleSetZoom((prev: number) => Math.min(1.4, prev + 0.1))}
              className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
              title="Aumentar zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSetZoom(1)}
              className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
              title="Restablecer zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Diagram Area */}
        <div 
          className="overflow-x-auto p-4 bg-slate-50/70 rounded-xl border border-slate-200 min-h-[460px] flex flex-col justify-center transition-all"
          style={{ transform: `scale(${activeZoom})`, transformOrigin: 'top center' }}
        >
          {activities.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <GitFork className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="font-semibold">No hay actividades para graficar.</p>
              <p className="text-xs mt-1">Regresa al Paso 3 para ingresar o sugerir actividades del proceso.</p>
            </div>
          ) : activeView === 'swimlanes' ? (
            /* Swimlanes View */
            <div className="space-y-6 min-w-[760px]">
              
              {/* Node Inicio con Aporte del Mapa de Procesos */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center">
                <div className="px-5 py-2 rounded-full bg-slate-900 text-white font-extrabold text-xs shadow-sm border-2 border-slate-950 flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                  <span>INICIO: {process.scopeStart || 'Detonante del proceso'}</span>
                </div>
                <div className="text-[11px] text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs font-medium flex items-center gap-1.5">
                  <span className="text-blue-600 font-bold">Proveedor (Mapa):</span>
                  <span className="text-slate-800 font-semibold">{firstActivitySupplier}</span>
                </div>
              </div>

              {/* 4 Swimlanes PHVA con Aportes Normativos ISO */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Carril PLANEAR */}
                <div className="bg-white rounded-xl border-2 border-emerald-300 p-3 shadow-2xs space-y-3 flex flex-col">
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-xs flex flex-col gap-0.5 border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <span>1. PLANEAR (P)</span>
                      <span className="text-[10px] bg-emerald-200 px-1.5 py-0.5 rounded-full">{planActivities.length}</span>
                    </div>
                    <span className="text-[10px] font-normal text-emerald-800 opacity-90">{stageNormsGuide.Planear.clause}</span>
                  </div>
                  <div className="space-y-2.5 flex-1">
                    {planActivities.map((act) => (
                      <div
                        key={act.id}
                        onClick={() => setSelectedActivity(act)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer text-xs ${
                          selectedActivity?.id === act.id
                            ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                            : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                          <span className="text-[10px] text-emerald-700">Act #{act.number}</span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[100px]">{act.responsibleRole}</span>
                        </div>
                        <p className="font-medium text-slate-800 leading-snug">{act.name}</p>
                        <div className="mt-2 pt-1 border-t border-slate-200 text-[10px] text-slate-500 truncate flex items-center justify-between">
                          <span>📥 {act.inputs}</span>
                          <span className="text-[9px] text-blue-600 font-medium">De: {act.supplier}</span>
                        </div>
                      </div>
                    ))}
                    {planActivities.length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-400 italic bg-slate-50 rounded-lg">
                        Sin actividades en Planear
                      </div>
                    )}
                  </div>
                </div>

                {/* Carril HACER */}
                <div className="bg-white rounded-xl border-2 border-blue-300 p-3 shadow-2xs space-y-3 flex flex-col">
                  <div className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-900 font-extrabold text-xs flex flex-col gap-0.5 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span>2. HACER (H)</span>
                      <span className="text-[10px] bg-blue-200 px-1.5 py-0.5 rounded-full">{doActivities.length}</span>
                    </div>
                    <span className="text-[10px] font-normal text-blue-800 opacity-90">{stageNormsGuide.Hacer.clause}</span>
                  </div>
                  <div className="space-y-2.5 flex-1">
                    {doActivities.map((act) => (
                      <div
                        key={act.id}
                        onClick={() => setSelectedActivity(act)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer text-xs ${
                          selectedActivity?.id === act.id
                            ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                            : 'bg-slate-50 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                          <span className="text-[10px] text-blue-700">Act #{act.number}</span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[100px]">{act.responsibleRole}</span>
                        </div>
                        <p className="font-medium text-slate-800 leading-snug">{act.name}</p>
                        <div className="mt-2 pt-1 border-t border-slate-200 text-[10px] text-slate-500 truncate flex items-center justify-between">
                          <span>📤 {act.outputs}</span>
                          <span className="text-[9px] text-emerald-600 font-medium">A: {act.customer}</span>
                        </div>
                      </div>
                    ))}
                    {doActivities.length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-400 italic bg-slate-50 rounded-lg">
                        Sin actividades en Hacer
                      </div>
                    )}
                  </div>
                </div>

                {/* Carril VERIFICAR */}
                <div className="bg-white rounded-xl border-2 border-amber-300 p-3 shadow-2xs space-y-3 flex flex-col">
                  <div className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 font-extrabold text-xs flex flex-col gap-0.5 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <span>3. VERIFICAR (V)</span>
                      <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded-full">{checkActivities.length}</span>
                    </div>
                    <span className="text-[10px] font-normal text-amber-800 opacity-90">{stageNormsGuide.Verificar.clause}</span>
                  </div>
                  <div className="space-y-2.5 flex-1">
                    {checkActivities.map((act) => (
                      <div
                        key={act.id}
                        onClick={() => setSelectedActivity(act)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer text-xs ${
                          selectedActivity?.id === act.id
                            ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20'
                            : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                          <span className="text-[10px] text-amber-700">Act #{act.number}</span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[100px]">{act.responsibleRole}</span>
                        </div>
                        <p className="font-medium text-slate-800 leading-snug">{act.name}</p>
                        
                        {/* Decision diamond badge con Criterio de Control */}
                        <div className="mt-2 p-1.5 bg-amber-100/70 border border-amber-300 rounded text-[10px] text-amber-900 font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 transform rotate-45 bg-amber-600 shrink-0"></span>
                          <span>Control Normativo: ¿Conforme a especificación?</span>
                        </div>
                      </div>
                    ))}
                    {checkActivities.length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-400 italic bg-slate-50 rounded-lg">
                        Sin actividades en Verificar
                      </div>
                    )}
                  </div>
                </div>

                {/* Carril ACTUAR */}
                <div className="bg-white rounded-xl border-2 border-purple-300 p-3 shadow-2xs space-y-3 flex flex-col">
                  <div className="px-3 py-1.5 rounded-lg bg-purple-100 text-purple-900 font-extrabold text-xs flex flex-col gap-0.5 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <span>4. ACTUAR (A)</span>
                      <span className="text-[10px] bg-purple-200 px-1.5 py-0.5 rounded-full">{actActivities.length}</span>
                    </div>
                    <span className="text-[10px] font-normal text-purple-800 opacity-90">{stageNormsGuide.Actuar.clause}</span>
                  </div>
                  <div className="space-y-2.5 flex-1">
                    {actActivities.map((act) => (
                      <div
                        key={act.id}
                        onClick={() => setSelectedActivity(act)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer text-xs ${
                          selectedActivity?.id === act.id
                            ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20'
                            : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                          <span className="text-[10px] text-purple-700">Act #{act.number}</span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[100px]">{act.responsibleRole}</span>
                        </div>
                        <p className="font-medium text-slate-800 leading-snug">{act.name}</p>
                        <div className="mt-2 pt-1 border-t border-slate-200 text-[10px] text-slate-500 truncate">
                          🚀 Planes de acción y mejora continua
                        </div>
                      </div>
                    ))}
                    {actActivities.length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-400 italic bg-slate-50 rounded-lg">
                        Sin actividades en Actuar
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Node Fin con Aporte del Mapa de Procesos */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center pt-2">
                <div className="px-5 py-2 rounded-full bg-slate-900 text-white font-extrabold text-xs shadow-sm border-2 border-slate-950 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>FIN: {process.scopeEnd || 'Producto o servicio entregado a satisfacción'}</span>
                </div>
                <div className="text-[11px] text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs font-medium flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">Cliente (Mapa):</span>
                  <span className="text-slate-800 font-semibold">{lastActivityCustomer}</span>
                </div>
              </div>

            </div>
          ) : (
            /* Sequential View */
            <div className="max-w-xl mx-auto space-y-4 py-4">
              
              {/* Inicio */}
              <div className="text-center">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-white font-bold text-xs shadow-sm">
                  INICIO: {process.scopeStart || 'Evento Disparador'}
                </div>
              </div>

              {/* Sequence Nodes */}
              {activities.map((act, idx) => (
                <div key={act.id} className="space-y-3">
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-slate-300"></div>
                  </div>

                  <div
                    onClick={() => setSelectedActivity(act)}
                    className={`p-3 rounded-xl border-2 transition cursor-pointer text-xs ${
                      selectedActivity?.id === act.id
                        ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-300 bg-white hover:border-blue-400 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-slate-800">
                        Paso #{act.number}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${stageColors[act.stage].header}`}>
                        {act.stage}
                      </span>
                    </div>

                    <p className="font-semibold text-slate-900 leading-snug">{act.name}</p>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                      <div>
                        <strong className="text-slate-500 font-semibold">Entradas:</strong> {act.inputs}
                      </div>
                      <div>
                        <strong className="text-slate-500 font-semibold">Salidas:</strong> {act.outputs}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Conector a Fin */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-slate-300"></div>
              </div>

              {/* Fin */}
              <div className="text-center">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow-sm">
                  FIN: {process.scopeEnd || 'Entregable Final Conforme'}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Selected Activity Detail Preview Drawer */}
        {selectedActivity && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                Detalle de Actividad Seleccionada #{selectedActivity.number} ({selectedActivity.stage})
              </span>
              <button
                onClick={() => setSelectedActivity(null)}
                className="text-blue-600 hover:text-blue-900 font-semibold"
              >
                Cerrar
              </button>
            </div>
            <p className="font-semibold text-slate-900 text-sm">{selectedActivity.name}</p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-slate-700 pt-1 text-[11px]">
              <div><strong>Proveedor:</strong> {selectedActivity.supplier}</div>
              <div><strong>Entradas:</strong> {selectedActivity.inputs}</div>
              <div><strong>Salidas:</strong> {selectedActivity.outputs}</div>
              <div><strong>Cliente:</strong> {selectedActivity.customer}</div>
            </div>
          </div>
        )}

      </div>

      {/* Buttons Prev / Next */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Normas y Recursos</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition active:scale-95"
        >
          <span>Continuar a Mapeo PHVA / SIPOC</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
