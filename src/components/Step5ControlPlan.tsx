import React, { useState } from 'react';
import { 
  Gauge, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckSquare, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Edit2
} from 'lucide-react';
import { ProcessCharacterization, MeasurementControl, ManagementIndicator } from '../types/process';

interface Step5ControlPlanProps {
  process: ProcessCharacterization;
  onChange: (updated: Partial<ProcessCharacterization>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step5ControlPlan: React.FC<Step5ControlPlanProps> = ({
  process,
  onChange,
  onNext,
  onPrev
}) => {
  // Modal / Form state for Measurement Plan
  const [showControlForm, setShowControlForm] = useState(false);
  const [editingControlId, setEditingControlId] = useState<string | null>(null);
  const [controlFormData, setControlFormData] = useState<Partial<MeasurementControl>>({
    activityName: '',
    variableToControl: '',
    specification: '',
    acceptanceCriteria: '',
    inspectorRole: '',
    inspectionRecord: '',
    contingencyAction: ''
  });

  // Modal / Form state for Indicator
  const [showIndicatorForm, setShowIndicatorForm] = useState(false);
  const [editingIndicatorId, setEditingIndicatorId] = useState<string | null>(null);
  const [indicatorFormData, setIndicatorFormData] = useState<Partial<ManagementIndicator>>({
    name: '',
    formula: '',
    target: '≥ 95%',
    frequency: 'Mensual',
    responsible: process.leaderRole || ''
  });

  const controls = process.measurementPlan || [];
  const indicators = process.indicators || [];

  // Handlers for Control Plan
  const handleSaveControl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!controlFormData.variableToControl?.trim()) return;

    if (editingControlId) {
      const updated = controls.map(c => 
        c.id === editingControlId 
          ? { ...c, ...(controlFormData as MeasurementControl) }
          : c
      );
      onChange({ measurementPlan: updated });
      setEditingControlId(null);
    } else {
      const newControl: MeasurementControl = {
        id: `ctrl-${Date.now()}`,
        activityName: controlFormData.activityName?.trim() || 'Actividad Operativa',
        variableToControl: controlFormData.variableToControl.trim(),
        specification: controlFormData.specification?.trim() || '100% conforme',
        acceptanceCriteria: controlFormData.acceptanceCriteria?.trim() || 'Sin desviaciones',
        inspectorRole: controlFormData.inspectorRole?.trim() || process.leaderRole || 'Inspector de Calidad',
        inspectionRecord: controlFormData.inspectionRecord?.trim() || 'Lista de chequeo / Registro',
        contingencyAction: controlFormData.contingencyAction?.trim() || 'Rechazar y aplicar corrección'
      };
      onChange({ measurementPlan: [...controls, newControl] });
    }

    setControlFormData({
      activityName: '',
      variableToControl: '',
      specification: '',
      acceptanceCriteria: '',
      inspectorRole: '',
      inspectionRecord: '',
      contingencyAction: ''
    });
    setShowControlForm(false);
  };

  const handleEditControl = (ctrl: MeasurementControl) => {
    setEditingControlId(ctrl.id);
    setControlFormData({ ...ctrl });
    setShowControlForm(true);
  };

  const handleDeleteControl = (id: string) => {
    onChange({ measurementPlan: controls.filter(c => c.id !== id) });
  };

  // Handlers for Indicators
  const handleOpenAddIndicator = () => {
    setEditingIndicatorId(null);
    setIndicatorFormData({
      name: '',
      formula: '',
      target: '≥ 95%',
      frequency: 'Mensual',
      responsible: process.leaderRole || 'Líder del Proceso'
    });
    setShowIndicatorForm(true);
  };

  const handleEditIndicator = (ind: ManagementIndicator) => {
    setEditingIndicatorId(ind.id);
    setIndicatorFormData({ ...ind });
    setShowIndicatorForm(true);
  };

  const handleSaveIndicator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!indicatorFormData.name?.trim()) return;

    if (editingIndicatorId) {
      const updated = indicators.map(ind => 
        ind.id === editingIndicatorId 
          ? ({ ...ind, ...indicatorFormData, id: editingIndicatorId } as ManagementIndicator)
          : ind
      );
      onChange({ indicators: updated });
      setEditingIndicatorId(null);
    } else {
      const newInd: ManagementIndicator = {
        id: `ind-${Date.now()}`,
        name: indicatorFormData.name.trim(),
        formula: indicatorFormData.formula?.trim() || '(Efectivos / Totales) * 100',
        target: indicatorFormData.target?.trim() || '≥ 90%',
        frequency: indicatorFormData.frequency?.trim() || 'Mensual',
        responsible: indicatorFormData.responsible?.trim() || process.leaderRole || 'Líder del Proceso'
      };
      onChange({ indicators: [...indicators, newInd] });
    }

    setIndicatorFormData({
      name: '',
      formula: '',
      target: '≥ 95%',
      frequency: 'Mensual',
      responsible: process.leaderRole || ''
    });
    setShowIndicatorForm(false);
  };

  const handleDeleteIndicator = (id: string) => {
    onChange({ indicators: indicators.filter(i => i.id !== id) });
  };

  // Generar controles automáticamente basados en las actividades del proceso (Paso 3 y 4)
  const handleGenerateControlsFromActivities = () => {
    const existingActs = new Set(controls.map(c => c.activityName.trim().toLowerCase()));
    const newControls: MeasurementControl[] = [...controls];
    const acts = process.activities || [];
    const defaultFormat = process.requiredFormats?.[0] || 'FOR-01 Registro de Control y Verificación';

    let addedCount = 0;
    acts.forEach((act) => {
      if (!existingActs.has(act.name.trim().toLowerCase())) {
        let variable = 'Conformidad técnica y oportunidad de la entrega';
        let spec = '100% de cumplimiento con las especificaciones del cliente y normativas';
        let accept = 'Aprobación del registro de verificación sin no conformidades mayores';
        let conting = 'Suspender entrega, emitir no conformidad e implementar acción correctiva inmediata';

        if (act.stage === 'Planear') {
          variable = 'Oportunidad y completitud del plan operativo y asignación de recursos';
          spec = 'Aprobación de la planificación previa al inicio de operaciones';
          accept = 'Plan formalmente aprobado y recursos garantizados';
          conting = 'Reprogramar actividades y solicitar asignación prioritaria de recursos';
        } else if (act.stage === 'Verificar') {
          variable = 'Evaluación de conformidad de indicadores y auditoría interna';
          spec = 'Meta de eficacia ≥ 95% y cero desviaciones críticas';
          accept = 'Resultado conforme al indicador establecido';
          conting = 'Apertura inmediata de informe de desviación y plan de acción de choque';
        } else if (act.stage === 'Actuar') {
          variable = 'Cierre efectivo de acciones de mejora y lecciones aprendidas';
          spec = '100% de acciones de mejora cerradas dentro del plazo';
          accept = 'Verificación de eficacia aprobada por el responsable';
          conting = 'Revisar causa raíz y actualizar procedimiento operativo';
        }

        newControls.push({
          id: `ctrl-${Date.now()}-${act.number}`,
          activityId: act.id,
          activityName: act.name,
          variableToControl: variable,
          specification: spec,
          acceptanceCriteria: accept,
          inspectorRole: act.responsibleRole || process.leaderRole || 'Líder del Proceso',
          inspectionRecord: defaultFormat,
          contingencyAction: conting
        });
        existingActs.add(act.name.trim().toLowerCase());
        addedCount++;
      }
    });

    if (addedCount > 0) {
      onChange({ measurementPlan: newControls });
    }
  };

  // Quick suggestion of typical controls
  const addSuggestedControl = () => {
    const sampleAct = process.activities?.[0]?.name || 'Operación principal del proceso';
    const newControl: MeasurementControl = {
      id: `ctrl-${Date.now()}`,
      activityName: sampleAct,
      variableToControl: 'Cumplimiento de especificaciones y tiempos de entrega',
      specification: 'Entregables conformes con el 100% de los requisitos del cliente',
      acceptanceCriteria: 'Aprobación del formato de verificación sin no conformidades mayores',
      inspectorRole: process.leaderRole || 'Líder del Proceso',
      inspectionRecord: process.requiredFormats?.[0] || 'FOR-01 Registro de Control de Calidad',
      contingencyAction: 'Detener actividad, emitir reporte de no conformidad e iniciar plan de contingencia'
    };
    onChange({ measurementPlan: [...controls, newControl] });
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Guidance Card */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/30 text-amber-200 border border-amber-400/30">
              Paso 5 de 6 • Control Operativo y Medición
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Plan de Seguimiento y Medición (Control del Proceso) e Indicadores
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              El problema clave de baja productividad surge de la falta de control en las actividades. Esta sección establece qué variables críticas controlar, tolerancias de aceptación o rechazo, registros de inspección y qué hacer ante incumplimientos.
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={addSuggestedControl}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600/40 hover:bg-amber-600/60 text-amber-100 rounded-xl text-xs font-bold border border-amber-400/30 transition"
              title="Añadir punto de control típico"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sugerir Control Típico</span>
            </button>
          </div>
        </div>
      </div>

      {/* BLOQUE 1: INDICADORES DE GESTIÓN (Aparece en la cabecera superior del formato) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-600" />
              <span>Indicadores de Gestión del Proceso ({indicators.length})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Métricas para evaluar la eficacia y eficiencia del proceso (Columna 1 en la cabecera del formato oficial).
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddIndicator}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Indicador</span>
          </button>
        </div>

        {/* Form to add indicator */}
        {showIndicatorForm && (
          <form onSubmit={handleSaveIndicator} className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3 text-xs animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900">
                {editingIndicatorId ? 'Editar Indicador de Gestión' : 'Agregar Indicador de Gestión'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowIndicatorForm(false);
                  setEditingIndicatorId(null);
                }}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Cerrar
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="lg:col-span-2">
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Nombre del Indicador *</label>
                <input
                  type="text"
                  required
                  value={indicatorFormData.name || ''}
                  onChange={(e) => setIndicatorFormData({ ...indicatorFormData, name: e.target.value })}
                  placeholder="Ej: Oportunidad de Entrega (OTD)"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Fórmula de Cálculo *</label>
                <input
                  type="text"
                  required
                  value={indicatorFormData.formula || ''}
                  onChange={(e) => setIndicatorFormData({ ...indicatorFormData, formula: e.target.value })}
                  placeholder="Ej: (Entregas a tiempo / Total entregas) * 100"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Meta Deseada</label>
                <input
                  type="text"
                  value={indicatorFormData.target || ''}
                  onChange={(e) => setIndicatorFormData({ ...indicatorFormData, target: e.target.value })}
                  placeholder="Ej: ≥ 95%"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Frecuencia</label>
                <input
                  type="text"
                  value={indicatorFormData.frequency || ''}
                  onChange={(e) => setIndicatorFormData({ ...indicatorFormData, frequency: e.target.value })}
                  placeholder="Ej: Mensual / Trimestral"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Responsable de Medición</label>
                <input
                  type="text"
                  value={indicatorFormData.responsible || ''}
                  onChange={(e) => setIndicatorFormData({ ...indicatorFormData, responsible: e.target.value })}
                  placeholder="Ej: Jefe de Compras"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowIndicatorForm(false);
                  setEditingIndicatorId(null);
                }}
                className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold"
              >
                {editingIndicatorId ? 'Actualizar Indicador' : 'Guardar Indicador'}
              </button>
            </div>
          </form>
        )}

        {/* Indicators List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {indicators.map((ind, idx) => (
            <div key={ind.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs relative group">
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-slate-900 leading-snug">
                  {idx + 1}) {ind.name}
                </span>
                <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition shrink-0">
                  <button
                    onClick={() => handleEditIndicator(ind)}
                    className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                    title="Editar indicador"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteIndicator(ind.id)}
                    className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition"
                    title="Eliminar indicador"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-[11px] font-mono text-slate-600 bg-white p-1 rounded border border-slate-200 truncate">
                {ind.formula}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Meta: <strong className="text-emerald-700">{ind.target}</strong></span>
                <span>Frec: {ind.frequency}</span>
              </div>
            </div>
          ))}
          {indicators.length === 0 && (
            <div className="col-span-full py-4 text-center text-xs text-slate-400 italic">
              No hay indicadores configurados. Haz clic en &quot;Nuevo Indicador&quot;.
            </div>
          )}
        </div>
      </div>

      {/* BLOQUE 2: TABLA PLAN DE SEGUIMIENTO Y MEDICIÓN (Exacto al formato de la imagen) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-0">
        <div className="p-5 bg-gradient-to-r from-slate-100 to-amber-50/50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>PLAN DE SEGUIMIENTO Y MEDICIÓN (Control del Proceso)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Estructura oficial: Actividad | Variable a Controlar | Especificación | Criterios Aceptación/Rechazo | Quién Inspecciona | Registro | ¿Qué hago si no cumple?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {process.activities && process.activities.length > 0 && (
              <button
                type="button"
                onClick={handleGenerateControlsFromActivities}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition shadow-2xs"
                title="Generar puntos de control a partir de las actividades del proceso (Paso 3 y 4)"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Autogenerar desde Actividades</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setEditingControlId(null);
                setControlFormData({
                  activityName: process.activities?.[0]?.name || '',
                  variableToControl: '',
                  specification: '',
                  acceptanceCriteria: '',
                  inspectorRole: process.leaderRole || '',
                  inspectionRecord: '',
                  contingencyAction: ''
                });
                setShowControlForm(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Control</span>
            </button>
          </div>
        </div>

        {/* Modal / Inline form to add/edit control */}
        {showControlForm && (
          <form onSubmit={handleSaveControl} className="p-6 bg-amber-50/70 border-b-2 border-amber-300 space-y-4 text-xs animate-in fade-in">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-950 text-sm">
                {editingControlId ? 'Editar Parámetro de Control' : 'Nuevo Parámetro de Seguimiento y Medición'}
              </h4>
              <button
                type="button"
                onClick={() => setShowControlForm(false)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Cancelar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Actividad Vinculada *</label>
                <select
                  value={controlFormData.activityName}
                  onChange={(e) => setControlFormData({ ...controlFormData, activityName: e.target.value })}
                  className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                >
                  <option value="">-- Seleccionar o escribir actividad --</option>
                  {(process.activities || []).map(a => (
                    <option key={a.id} value={a.name}>
                      Act #{a.number} ({a.stage}): {a.name}
                    </option>
                  ))}
                  <option value="General / Global del Proceso">General / Global del Proceso</option>
                </select>
                <input
                  type="text"
                  placeholder="O ingresar nombre personalizado de la actividad"
                  value={controlFormData.activityName || ''}
                  onChange={(e) => setControlFormData({ ...controlFormData, activityName: e.target.value })}
                  className="w-full px-2.5 py-1.5 mt-1 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Variable a Controlar *</label>
                <input
                  type="text"
                  required
                  value={controlFormData.variableToControl || ''}
                  onChange={(e) => setControlFormData({ ...controlFormData, variableToControl: e.target.value })}
                  placeholder="Ej: Conformidad técnica, tiempo de entrega, temperatura"
                  className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Especificación del Control *</label>
                <input
                  type="text"
                  required
                  value={controlFormData.specification || ''}
                  onChange={(e) => setControlFormData({ ...controlFormData, specification: e.target.value })}
                  placeholder="Ej: Tolerancia ±0.5 mm, 100% de coincidencia con orden"
                  className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Criterios de Aceptación o Rechazo *</label>
                <input
                  type="text"
                  required
                  value={controlFormData.acceptanceCriteria || ''}
                  onChange={(e) => setControlFormData({ ...controlFormData, acceptanceCriteria: e.target.value })}
                  placeholder="Ej: Aprobado sin daños visibles y empaque íntegro"
                  className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Quién Inspecciona (Cargo) *</label>
                <input
                  type="text"
                  required
                  value={controlFormData.inspectorRole || ''}
                  onChange={(e) => setControlFormData({ ...controlFormData, inspectorRole: e.target.value })}
                  placeholder="Ej: Analista de Calidad / Jefe de Almacén"
                  className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Registro de Inspección (Formato) *</label>
                <input
                  type="text"
                  required
                  value={controlFormData.inspectionRecord || ''}
                  onChange={(e) => setControlFormData({ ...controlFormData, inspectionRecord: e.target.value })}
                  placeholder="Ej: FOR-AB-05 Acta de Recepción Técnica"
                  className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  ¿Qué hago si no cumple? (Acción Correctiva / Contingencia) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={controlFormData.contingencyAction || ''}
                  onChange={(e) => setControlFormData({ ...controlFormData, contingencyAction: e.target.value })}
                  placeholder="Ej: Rechazar entrega, aislar lote no conforme, generar reporte de no conformidad y solicitar reposición inmediata en un plazo máximo de 24 horas."
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowControlForm(false)}
                className="px-4 py-1.5 border border-slate-300 rounded-lg text-xs font-medium bg-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
              >
                {editingControlId ? 'Guardar Cambios' : 'Guardar Control'}
              </button>
            </div>
          </form>
        )}

        {/* Table representation matching image */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3 w-40">Actividad</th>
                <th className="py-3 px-3 w-44">Variable a Controlar</th>
                <th className="py-3 px-3 w-44">Especificación del Control</th>
                <th className="py-3 px-3 w-48">Criterios de Aceptación o Rechazo</th>
                <th className="py-3 px-3 w-36">Quién Inspecciona</th>
                <th className="py-3 px-3 w-40">Registro de Inspección</th>
                <th className="py-3 px-4 min-w-[220px]">¿Qué hago si no cumple?</th>
                <th className="py-3 px-2 w-16 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {controls.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    <ShieldCheck className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">No se han registrado parámetros de control aún.</p>
                    <p className="text-xs mt-1">Haz clic en &quot;Agregar Control&quot; o &quot;Sugerir Control Típico&quot;.</p>
                  </td>
                </tr>
              ) : (
                controls.map((ctrl) => (
                  <tr key={ctrl.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {ctrl.activityName}
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      <span className="font-medium text-slate-900">{ctrl.variableToControl}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      {ctrl.specification}
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      {ctrl.acceptanceCriteria}
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      <span className="inline-block px-1.5 py-0.5 bg-slate-100 rounded text-[11px] font-medium">
                        {ctrl.inspectorRole}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-mono text-[11px]">
                      {ctrl.inspectionRecord}
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      <p className="text-[11px] leading-relaxed text-red-950 bg-red-50/70 p-1.5 rounded border border-red-100">
                        {ctrl.contingencyAction}
                      </p>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleEditControl(ctrl)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteControl(ctrl.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Eliminar"
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
          <span>Volver a Mapeo PHVA</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition active:scale-95"
        >
          <span>Generar Ficha Oficial de Calidad</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
