import React, { useState } from 'react';
import { 
  Workflow, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Edit2,
  Copy,
  Info,
  Briefcase,
  FolderGit2,
  Scale,
  Compass,
  Building2,
  Check
} from 'lucide-react';
import { ProcessCharacterization, ProcessActivity, DemingStage, JobPosition, OrgContext } from '../types/process';
import { DEMING_GUIDES } from '../data/templates';

interface Step3DemingSIPOCProps {
  process: ProcessCharacterization;
  processes?: ProcessCharacterization[];
  jobPositions?: JobPosition[];
  orgContext?: OrgContext;
  onChange: (updated: Partial<ProcessCharacterization>) => void;
  onNext: () => void;
  onPrev: () => void;
  onOpenProcessMap?: () => void;
  onOpenJobManual?: () => void;
}

export const Step3DemingSIPOC: React.FC<Step3DemingSIPOCProps> = ({
  process,
  processes = [],
  jobPositions = [],
  orgContext,
  onChange,
  onNext,
  onPrev,
  onOpenProcessMap,
  onOpenJobManual
}) => {
  const [selectedStageFilter, setSelectedStageFilter] = useState<'All' | DemingStage>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);
  const [showConvergenceCard, setShowConvergenceCard] = useState(true);

  // New activity form state
  const [formData, setFormData] = useState<Partial<ProcessActivity>>({
    stage: 'Planear',
    name: '',
    supplier: '',
    inputs: '',
    outputs: '',
    customer: '',
    responsibleRole: process.leaderRole || ''
  });

  // Cargo del manual asociado al proceso o líder
  const leaderJob = jobPositions.find(j => 
    j.title.toLowerCase() === process.leaderRole?.toLowerCase() ||
    j.associatedProcessName?.toLowerCase() === process.name.toLowerCase()
  );

  const activities = process.activities || [];

  // Importar funciones del cargo del manual como actividades PHVA
  const handleImportJobFunctions = () => {
    if (!leaderJob || !leaderJob.responsibilities || leaderJob.responsibilities.length === 0) return;

    const stagesOrder: DemingStage[] = ['Planear', 'Hacer', 'Verificar', 'Actuar'];
    const currentActs = [...activities];
    const startNum = currentActs.length + 1;
    const additions: ProcessActivity[] = [];

    leaderJob.responsibilities.forEach((resp, idx) => {
      // Evitar duplicados exactos
      if (!currentActs.some(a => a.name.toLowerCase() === resp.toLowerCase())) {
        const stage = stagesOrder[idx % stagesOrder.length];
        additions.push({
          id: `act-${Date.now()}-${idx + 1}`,
          number: startNum + additions.length,
          stage,
          name: resp,
          supplier: leaderJob.department || 'Procesos de Soporte / Dirección',
          inputs: 'Directrices autorizadas, requisitos del cargo e insumos de gestión',
          outputs: 'Resultado o entregable conforme generado bajo el cargo',
          customer: 'Procesos Clientes / Partes Interesadas',
          responsibleRole: leaderJob.title
        });
      }
    });

    if (additions.length > 0) {
      onChange({ activities: [...currentActs, ...additions] });
    }
  };

  // Deming stats
  const demingCounts: Record<DemingStage, number> = {
    Planear: activities.filter(a => a.stage === 'Planear').length,
    Hacer: activities.filter(a => a.stage === 'Hacer').length,
    Verificar: activities.filter(a => a.stage === 'Verificar').length,
    Actuar: activities.filter(a => a.stage === 'Actuar').length
  };

  const isCycleComplete = 
    demingCounts.Planear > 0 &&
    demingCounts.Hacer > 0 &&
    demingCounts.Verificar > 0 &&
    demingCounts.Actuar > 0;

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    if (editingActivityId) {
      // Update
      const updated = activities.map(act => 
        act.id === editingActivityId 
          ? { ...act, ...(formData as ProcessActivity) }
          : act
      );
      onChange({ activities: updated });
      setEditingActivityId(null);
    } else {
      // Add new
      const newAct: ProcessActivity = {
        id: `act-${Date.now()}`,
        number: activities.length + 1,
        stage: formData.stage || 'Planear',
        name: formData.name.trim(),
        supplier: formData.supplier?.trim() || 'Procesos de soporte',
        inputs: formData.inputs?.trim() || 'Requerimientos e información',
        outputs: formData.outputs?.trim() || 'Resultado o entregable',
        customer: formData.customer?.trim() || 'Procesos clientes',
        responsibleRole: formData.responsibleRole?.trim() || process.leaderRole || 'Responsable'
      };
      onChange({ activities: [...activities, newAct] });
    }

    setFormData({
      stage: 'Planear',
      name: '',
      supplier: '',
      inputs: '',
      outputs: '',
      customer: '',
      responsibleRole: process.leaderRole || ''
    });
    setShowAddForm(false);
  };

  const handleEditClick = (act: ProcessActivity) => {
    setEditingActivityId(act.id);
    setFormData({ ...act });
    setShowAddForm(true);
  };

  const handleDeleteActivity = (id: string) => {
    const filtered = activities
      .filter(a => a.id !== id)
      .map((a, idx) => ({ ...a, number: idx + 1 }));
    onChange({ activities: filtered });
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= activities.length) return;
    const reordered = [...activities];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    // Renumber
    const renumbered = reordered.map((a, idx) => ({ ...a, number: idx + 1 }));
    onChange({ activities: renumbered });
  };

  const addQuickStageActivity = (stage: DemingStage) => {
    const stageTemplates: Record<DemingStage, { name: string; supplier: string; inputs: string; outputs: string; customer: string }> = {
      Planear: {
        name: `Planificar actividades, recursos y cronograma para ${process.name}`,
        supplier: 'Dirección Estratégica / Proceso de Planeación',
        inputs: 'Directrices estratégicas, presupuesto y requisitos de clientes',
        outputs: 'Plan operativo y cronograma de trabajo aprobado',
        customer: 'Equipo ejecutor del proceso'
      },
      Hacer: {
        name: `Ejecutar la operación de ${process.productOrService || process.name}`,
        supplier: 'Proveedores / Almacén / Solicitantes',
        inputs: 'Plan operativo, especificaciones técnicas y recursos asignados',
        outputs: 'Producto o servicio elaborado conforme a estándares',
        customer: 'Clientes del proceso'
      },
      Verificar: {
        name: `Realizar seguimiento, medición de indicadores y control de calidad`,
        supplier: 'Equipo operativo del proceso',
        inputs: 'Registros de ejecución y productos generados',
        outputs: 'Informe de gestión, cálculo de KPIs y reporte de conformidades',
        customer: 'Líder del Proceso / Comité de Calidad'
      },
      Actuar: {
        name: `Implementar acciones correctivas y proyectos de mejora continua`,
        supplier: 'Comité de Calidad / Auditorías Internas',
        inputs: 'Informe de desviaciones, quejas o no conformidades',
        outputs: 'Planes de acción ejecutados y procedimientos actualizados',
        customer: 'Todos los procesos de la empresa'
      }
    };

    const template = stageTemplates[stage];
    const newAct: ProcessActivity = {
      id: `act-${Date.now()}`,
      number: activities.length + 1,
      stage,
      name: template.name,
      supplier: template.supplier,
      inputs: template.inputs,
      outputs: template.outputs,
      customer: template.customer,
      responsibleRole: process.leaderRole || 'Líder del Proceso'
    };
    onChange({ activities: [...activities, newAct] });
  };

  const filteredActivities = selectedStageFilter === 'All' 
    ? activities 
    : activities.filter(a => a.stage === selectedStageFilter);

  const getStageColorBadge = (stage: DemingStage) => {
    switch (stage) {
      case 'Planear':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Hacer':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Verificar':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Actuar':
        return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Guidance Card */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
              Paso 4 de 6 • Mapeo de Procesos y Ciclo de Deming
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Mapeo de Actividades con Ciclo PHVA y Matriz SIPOC
            </h2>
            <p className="text-sm text-emerald-200 max-w-2xl leading-relaxed">
              Mapea el flujo de trabajo conectando Proveedores → Entradas → Actividades PHVA → Salidas → Clientes. Para garantizar la mejora continua, el proceso debe contar con actividades en las 4 fases de Deming: Planear, Hacer, Verificar y Actuar.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            {leaderJob && leaderJob.responsibilities && leaderJob.responsibilities.length > 0 && (
              <button
                type="button"
                onClick={handleImportJobFunctions}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold border border-emerald-500/40 shadow-xs transition"
                title={`Alimentar actividades PHVA desde las funciones del cargo de ${leaderJob.title}`}
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-300" />
                <span>Importar Funciones de {leaderJob.title}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setEditingActivityId(null);
                setFormData({
                  stage: 'Planear',
                  name: '',
                  supplier: '',
                  inputs: '',
                  outputs: '',
                  customer: '',
                  responsibleRole: process.leaderRole || ''
                });
                setShowAddForm(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Actividad</span>
            </button>
          </div>
        </div>
      </div>

      {/* APORTE INTEGRAL: CONVERGENCIA DE TODAS LAS ETAPAS PREVIAS AL MAPEO */}
      <div className="bg-gradient-to-r from-teal-50/70 via-emerald-50/50 to-slate-50 rounded-2xl border border-teal-200 p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-200/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-teal-600 text-white rounded-lg shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-teal-950 uppercase tracking-wide flex items-center gap-1.5">
                <span>Convergencia de Etapas Previas en el Mapeo de Procesos</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-teal-100 text-teal-800 font-bold">
                  SIPOC Integrado ISO 9001
                </span>
              </h3>
              <p className="text-[11px] text-slate-600">
                Los Contextos, la Identificación, las Normas, el Mapa de Procesos y el Flujograma consolidan cada fila del Mapeo PHVA.
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
            {onOpenJobManual && (
              <button
                type="button"
                onClick={onOpenJobManual}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg shadow-2xs transition"
              >
                <Briefcase className="w-3 h-3 text-emerald-600" />
                <span>Manual Cargos ({jobPositions.length})</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowConvergenceCard(!showConvergenceCard)}
              className="text-[11px] text-teal-700 hover:underline font-semibold ml-1"
            >
              {showConvergenceCard ? 'Contraer' : 'Expandir'}
            </button>
          </div>
        </div>

        {showConvergenceCard && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 text-xs">
            {/* 1. Contextos y Manual de Funciones */}
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1 text-emerald-700">
                <Briefcase className="w-3 h-3" />
                1. Contextos & Roles
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">
                Dueño del proceso: <strong>{process.leaderRole || 'Sin asignar'}</strong>.
                {leaderJob && (
                  <span className="block text-[10px] text-emerald-600 mt-0.5">
                    ✓ Vinculado al perfil del Manual de Cargos
                  </span>
                )}
              </p>
            </div>

            {/* 2. Identificación y Alcance */}
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1 text-blue-700">
                <Workflow className="w-3 h-3" />
                2. Alcance Delimitado
              </span>
              <p className="text-[11px] text-slate-600 leading-snug truncate" title={process.scopeStart}>
                Inicia: <span className="font-medium">{process.scopeStart || 'Evento disparador'}</span>
              </p>
              <p className="text-[11px] text-slate-600 leading-snug truncate" title={process.scopeEnd}>
                Termina: <span className="font-medium">{process.scopeEnd || 'Entregable final'}</span>
              </p>
            </div>

            {/* 3. Normas Orientadoras */}
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1 text-amber-700">
                <Scale className="w-3 h-3" />
                3. Marco Normativo
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">
                {process.legalAndTechnicalNorms && process.legalAndTechnicalNorms.length > 0 ? (
                  <span><strong>{process.legalAndTechnicalNorms.length}</strong> normas técnicas orientan las actividades.</span>
                ) : (
                  <span className="text-slate-400 italic">Orientado por numerales base ISO 9001.</span>
                )}
              </p>
            </div>

            {/* 4. Mapa de Procesos y Flujograma */}
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1 text-indigo-700">
                <FolderGit2 className="w-3 h-3" />
                4. Red Interprocesos
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">
                <strong>{processes.length}</strong> procesos disponibles para alimentar Proveedores y Clientes.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Deming Cycle Diagnostics Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${isCycleComplete ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {isCycleComplete ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Diagnóstico del Ciclo de Deming (PHVA)
              </h3>
              <p className="text-xs text-slate-500">
                {isCycleComplete 
                  ? '¡Excelente! El proceso cumple con las 4 etapas del ciclo de Deming para control y mejora continua.'
                  : 'Atención: Para cumplir con ISO 9001, debes incluir al menos una actividad en cada fase.'}
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSelectedStageFilter('All')}
              className={`px-2.5 py-1 rounded-lg transition ${selectedStageFilter === 'All' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Todas ({activities.length})
            </button>
            <button
              onClick={() => setSelectedStageFilter('Planear')}
              className={`px-2 py-1 rounded-lg transition ${selectedStageFilter === 'Planear' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              P ({demingCounts.Planear})
            </button>
            <button
              onClick={() => setSelectedStageFilter('Hacer')}
              className={`px-2 py-1 rounded-lg transition ${selectedStageFilter === 'Hacer' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              H ({demingCounts.Hacer})
            </button>
            <button
              onClick={() => setSelectedStageFilter('Verificar')}
              className={`px-2 py-1 rounded-lg transition ${selectedStageFilter === 'Verificar' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              V ({demingCounts.Verificar})
            </button>
            <button
              onClick={() => setSelectedStageFilter('Actuar')}
              className={`px-2 py-1 rounded-lg transition ${selectedStageFilter === 'Actuar' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              A ({demingCounts.Actuar})
            </button>
          </div>
        </div>

        {/* Missing stage alerts with quick fix buttons */}
        {!isCycleComplete && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            {(['Planear', 'Hacer', 'Verificar', 'Actuar'] as DemingStage[]).map(st => {
              const count = demingCounts[st];
              if (count === 0) {
                return (
                  <div key={st} className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-xl">
                    <span className="font-semibold text-amber-900">Falta etapa {st}</span>
                    <button
                      type="button"
                      onClick={() => addQuickStageActivity(st)}
                      className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] shadow-2xs"
                    >
                      + Añadir {st}
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>

      {/* Form modal/accordion for Add / Edit Activity */}
      {showAddForm && (
        <form 
          onSubmit={handleSaveActivity}
          className="bg-slate-50 border-2 border-emerald-500 rounded-2xl p-6 shadow-md space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Workflow className="w-4 h-4 text-emerald-600" />
              <span>{editingActivityId ? 'Editar Actividad' : 'Nueva Actividad del Proceso'}</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Etapa Ciclo Deming *
              </label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value as DemingStage })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Planear">P - Planear (Objetivos, planificación y recursos)</option>
                <option value="Hacer">H - Hacer (Ejecución operativa y transformación)</option>
                <option value="Verificar">V - Verificar (Control, inspección e indicadores)</option>
                <option value="Actuar">A - Actuar (Mejora continua y acciones correctivas)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nombre de la Actividad *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Realizar cotizaciones y cuadro comparativo de ofertas comerciales"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>
          </div>

          {/* SIPOC Fields con Alimentación del Mapa de Procesos y Manual de Funciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Procesos Proveedores *</span>
                <span className="text-[10px] text-indigo-600 font-semibold lowercase">del mapa</span>
              </label>
              <input
                type="text"
                required
                value={formData.supplier || ''}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                placeholder="Ej. Todos los procesos / Dirección Estratégica"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
              />
              {processes.length > 0 && (
                <div className="mt-1 flex items-center gap-1 overflow-x-auto text-[9px] pb-0.5">
                  <span className="text-slate-400 shrink-0">Sugerir:</span>
                  {processes.slice(0, 4).map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, supplier: p.name })}
                      className="px-1.5 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded font-medium truncate max-w-[100px] border border-indigo-100"
                      title={p.name}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Entradas (Insumos / Requisitos) *
              </label>
              <input
                type="text"
                required
                value={formData.inputs || ''}
                onChange={(e) => setFormData({ ...formData, inputs: e.target.value })}
                placeholder="Ej: Requisición autorizada, fichas técnicas"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
              />
              <span className="text-[9px] text-slate-400 block mt-1">Insumo transformado en la actividad</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Resultados - Salidas *
              </label>
              <input
                type="text"
                required
                value={formData.outputs || ''}
                onChange={(e) => setFormData({ ...formData, outputs: e.target.value })}
                placeholder="Ej: Cuadro comparativo con concepto técnico"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
              />
              <span className="text-[9px] text-slate-400 block mt-1">Entregable o producto conforme</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Procesos Clientes *</span>
                <span className="text-[10px] text-emerald-600 font-semibold lowercase">del mapa</span>
              </label>
              <input
                type="text"
                required
                value={formData.customer || ''}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                placeholder="Ej. Clientes externos / Proceso de Operación"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
              />
              {processes.length > 0 && (
                <div className="mt-1 flex items-center gap-1 overflow-x-auto text-[9px] pb-0.5">
                  <span className="text-slate-400 shrink-0">Sugerir:</span>
                  {processes.slice(0, 4).map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, customer: p.name })}
                      className="px-1.5 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded font-medium truncate max-w-[100px] border border-emerald-100"
                      title={p.name}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Responsable de la actividad alimentado del Manual de Funciones */}
          <div className="bg-slate-100/70 p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Cargo Responsable de Ejecutar la Actividad:
              </label>
              <input
                type="text"
                value={formData.responsibleRole || ''}
                onChange={(e) => setFormData({ ...formData, responsibleRole: e.target.value })}
                placeholder="Ej. Líder de Compras / Analista"
                className="w-full max-w-sm px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900"
              />
              {jobPositions.length > 0 && (
                <div className="mt-1 flex items-center gap-1 overflow-x-auto text-[9px]">
                  <span className="text-slate-400 shrink-0">Cargos del Manual:</span>
                  {jobPositions.slice(0, 4).map(j => (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, responsibleRole: j.title })}
                      className="px-1.5 py-0.5 bg-white hover:bg-slate-200 text-slate-700 rounded font-medium truncate max-w-[120px] border border-slate-200"
                    >
                      {j.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                {editingActivityId ? 'Guardar Cambios' : 'Agregar a la Tabla'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Main SIPOC / Deming Table (Matches Format in Image) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Tabla SIPOC / Matriz de Caracterización de Actividades
            </h3>
            <p className="text-xs text-slate-500">
              Estructura oficial del formato: Procesos Proveedores | Entradas | Actividades (#1 a #N) | Salidas | Procesos Clientes
            </p>
          </div>

          <span className="text-xs font-bold px-2.5 py-1 bg-slate-200 text-slate-700 rounded-lg">
            {filteredActivities.length} Actividades
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-3 w-44">Procesos Proveedores</th>
                <th className="py-3 px-3 w-48">Entradas</th>
                <th className="py-3 px-4 min-w-[280px]">Actividades (Ciclo Deming PHVA)</th>
                <th className="py-3 px-3 w-48">Resultados - Salidas</th>
                <th className="py-3 px-3 w-44">Procesos Clientes</th>
                <th className="py-3 px-3 w-24 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    <Workflow className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">No hay actividades en esta vista.</p>
                    <p className="text-xs mt-1">Haz clic en &quot;Nueva Actividad&quot; o utiliza las sugerencias del Ciclo de Deming.</p>
                  </td>
                </tr>
              ) : (
                filteredActivities.map((act, idx) => (
                  <tr key={act.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-bold text-slate-500 text-center">
                      {act.number}
                    </td>

                    <td className="py-3 px-3 text-slate-700">
                      <span className="font-medium">{act.supplier}</span>
                    </td>

                    <td className="py-3 px-3 text-slate-700">
                      <span>{act.inputs}</span>
                    </td>

                    <td className="py-3 px-4 text-slate-900">
                      <div className="flex items-start gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border shrink-0 ${getStageColorBadge(act.stage)}`}>
                          {act.stage}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-900 leading-snug">
                            {act.name}
                          </p>
                          {act.description && (
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {act.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-700">
                      <span>{act.outputs}</span>
                    </td>

                    <td className="py-3 px-3 text-slate-700">
                      <span className="font-medium">{act.customer}</span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMove(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                          title="Subir orden"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMove(idx, 'down')}
                          disabled={idx === filteredActivities.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                          title="Bajar orden"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditClick(act)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Editar actividad"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteActivity(act.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Eliminar actividad"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buttons Prev / Next */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Flujograma</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition active:scale-95"
        >
          <span>Continuar a Seguimiento y Control</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
