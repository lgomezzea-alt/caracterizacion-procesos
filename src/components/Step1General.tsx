import React, { useState } from 'react';
import { 
  FileText, 
  Target, 
  Package, 
  Maximize2, 
  Users, 
  Tag, 
  Sparkles, 
  HelpCircle, 
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Building2,
  Briefcase,
  ExternalLink,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { ProcessCharacterization, ProcessCategory, OrgContext, JobPosition } from '../types/process';
import { PROCESS_CATEGORIES } from '../data/templates';

interface Step1GeneralProps {
  process: ProcessCharacterization;
  orgContext?: OrgContext;
  jobPositions?: JobPosition[];
  onChange: (updated: Partial<ProcessCharacterization>) => void;
  onNext: () => void;
  onApplyTemplate: (templateIndex: number) => void;
  onOpenJobManual?: () => void;
  onOpenOrgModal?: () => void;
}

export const Step1General: React.FC<Step1GeneralProps> = ({
  process,
  orgContext,
  jobPositions = [],
  onChange,
  onNext,
  onApplyTemplate,
  onOpenJobManual,
  onOpenOrgModal
}) => {
  const [showHelper, setShowHelper] = useState(false);
  const [showContextFeeder, setShowContextFeeder] = useState(true);

  // Cargos del manual que coinciden o son líderes
  const relatedJobs = jobPositions.filter(j => 
    j.associatedProcessCategory === process.category ||
    j.associatedProcessName?.toLowerCase().includes(process.name.toLowerCase()) ||
    j.roleType === 'Líder de Proceso'
  );

  const suggestObjective = (type: string) => {
    const orgName = orgContext?.name || 'la organización';
    switch (type) {
      case 'calidad':
        onChange({
          objective: `Garantizar la calidad y conformidad técnica de los productos y servicios entregados por el proceso de ${process.name || 'operación'}, cumpliendo con los requisitos legales, las directrices de ${orgName} y las expectativas del cliente.`
        });
        break;
      case 'eficiencia':
        onChange({
          objective: `Optimizar la utilización de recursos y los tiempos de respuesta en las actividades de ${process.name || 'este proceso'}, eliminando desperdicios y maximizando la productividad operativa de ${orgName}.`
        });
        break;
      case 'servicio':
        onChange({
          objective: `Asegurar la plena satisfacción de los clientes internos y externos mediante la entrega oportuna, confiable y estandarizada de ${process.productOrService || 'los entregables del proceso'} de ${orgName}.`
        });
        break;
      case 'estrategico_mision':
        if (process.category === 'Estratégico') {
          onChange({
            objective: `Direccionar las directrices estratégicas, políticas y toma de decisiones en ${orgName}, asegurando el logro de la visión corporativa y la sostenibilidad institucional.`
          });
        } else if (process.category === 'Misional') {
          onChange({
            objective: `Desarrollar y entregar ${process.productOrService || 'soluciones de alta confiabilidad'} en estricto cumplimiento de la misión de ${orgName}, generando valor agregado para los clientes objetivo y diferenciación en el mercado.`
          });
        } else if (process.category === 'Apoyo') {
          onChange({
            objective: `Suministrar oportunamente los recursos humanos, tecnológicos, infraestructura e insumos requeridos por los procesos misionales de ${orgName}, garantizando eficiencia y continuidad operativa.`
          });
        } else {
          onChange({
            objective: `Evaluar el desempeño del sistema de gestión por procesos en ${orgName}, detectando desviaciones, asegurando el cumplimiento normativo e impulsando acciones de mejora continua.`
          });
        }
        break;
    }
  };

  const handleSelectJobAsLeader = (job: JobPosition) => {
    const updates: Partial<ProcessCharacterization> = {
      leaderRole: job.title
    };
    if (!process.objective || process.objective.trim().length < 15) {
      if (job.objective) {
        updates.objective = job.objective;
      }
    }
    if (!process.participants && job.department) {
      updates.participants = `Equipo de trabajo de ${job.department}, Analistas, Auditores`;
    }
    onChange(updates);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Guidance Card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30">
              Paso 1 de 6 • Inicio de la Caracterización
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Identificación General, Objetivos y Alcance del Proceso
            </h2>
            <p className="text-sm text-blue-200 max-w-2xl leading-relaxed">
              Define las bases del proceso: a qué categoría pertenece dentro del mapa de procesos, quién es el responsable, qué producto genera y cuáles son sus límites claros (desde dónde inicia hasta dónde finaliza).
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowHelper(!showHelper)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
            >
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>{showHelper ? 'Ocultar Guía ISO' : 'Ver Guía Metodológica'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Helper Box */}
        {showHelper && (
          <div className="mt-4 pt-4 border-t border-white/15 text-xs text-blue-100 grid grid-cols-1 md:grid-cols-3 gap-3 bg-white/5 p-3 rounded-xl animate-in fade-in">
            <div className="space-y-1">
              <strong className="text-white block font-semibold">1. Regla de Oro del Objetivo:</strong>
              <p>Redactar siempre iniciando con un verbo en infinitivo (Garantizar, Desarrollar, Producir) + Qué hace + Para qué lo hace.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block font-semibold">2. Delimitación del Alcance:</strong>
              <p>El alcance evita vacíos y traslapes: especifica con claridad el evento disparador (dónde inicia) y el entregable final (dónde termina).</p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block font-semibold">3. Dueño del Proceso:</strong>
              <p>Debe ser un cargo específico con autoridad para tomar decisiones y liderar la mejora continua (no personas con nombres propios).</p>
            </div>
          </div>
        )}
      </div>

      {/* APORTE DE LOS CONTEXTOS A LA IDENTIFICACIÓN (Contexto Institucional y Manual de Funciones) */}
      <div className="bg-gradient-to-r from-slate-50 via-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-200/80 p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-600 text-white rounded-lg shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-blue-950 uppercase tracking-wide flex items-center gap-1.5">
                <span>Aporte de Contextos a la Identificación del Proceso</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800 font-bold">
                  Cadena de Valor ISO 9001
                </span>
              </h3>
              <p className="text-[11px] text-slate-600">
                El Contexto Organizacional y el Manual de Funciones nutren la orientación, objetivo y liderazgo de este proceso.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onOpenOrgModal && (
              <button
                type="button"
                onClick={onOpenOrgModal}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg shadow-2xs transition"
              >
                <Building2 className="w-3 h-3 text-blue-600" />
                <span>Ver Misión/Visión</span>
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
              onClick={() => setShowContextFeeder(!showContextFeeder)}
              className="text-[11px] text-blue-700 hover:underline font-semibold ml-1"
            >
              {showContextFeeder ? 'Contraer' : 'Expandir'}
            </button>
          </div>
        </div>

        {showContextFeeder && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1 text-xs">
            {/* Contexto Organizacional: Misión y Políticas */}
            <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  Misión y Enfoque Institucional
                </span>
                <span className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                  {orgContext?.name || 'Empresa'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-2 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                "{orgContext?.mission || 'Misión institucional orientada a la satisfacción de clientes y la excelencia...'}"
              </p>
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <span className="text-[10px] text-slate-500">
                  Sector: {orgContext?.sector || 'Industrial y Servicios'}
                </span>
                <button
                  type="button"
                  onClick={() => suggestObjective('estrategico_mision')}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[10px] shadow-2xs transition flex items-center gap-1"
                  title="Alinear automáticamente el objetivo del proceso a la misión y visión institucional"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Alinear Objetivo a Misión/Visión</span>
                </button>
              </div>
            </div>

            {/* Manual de Funciones del Cargo */}
            <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  Manual de Cargos ({jobPositions.length} disponibles)
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Alimentación de Rol
                </span>
              </div>
              
              {jobPositions.length > 0 ? (
                <div className="space-y-1.5">
                  <p className="text-[11px] text-slate-600">
                    Cargos sugeridos para liderar o alimentar este proceso:
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                    {jobPositions.slice(0, 6).map((job) => {
                      const isSelected = process.leaderRole?.toLowerCase() === job.title.toLowerCase();
                      return (
                        <button
                          key={job.id}
                          type="button"
                          onClick={() => handleSelectJobAsLeader(job)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition border flex items-center gap-1 ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
                          }`}
                          title={`Asignar ${job.title} como dueño y vincular sus funciones`}
                        >
                          <CheckCircle className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                          <span className="truncate max-w-[130px]">{job.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-[11px] text-slate-500 py-1">
                  Puedes registrar perfiles en el Manual de Funciones para vincular responsabilidades directamente.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        {/* Row 1: Nombre, Código, Versión, Categoría */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nombre del Proceso *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={process.name}
                onChange={(e) => onChange({ name: e.target.value })}
                placeholder="Ej. Gestión de Compras y Suministros"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
              />
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Código Documental
            </label>
            <div className="relative">
              <input
                type="text"
                value={process.code}
                onChange={(e) => onChange({ code: e.target.value })}
                placeholder="Ej. PR-AB-001"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-slate-900"
              />
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Versión
            </label>
            <input
              type="text"
              value={process.version}
              onChange={(e) => onChange({ version: e.target.value })}
              placeholder="Ej. 01"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-center text-slate-900"
            />
          </div>
        </div>

        {/* Row 2: Categoría y Líderes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tipo / Categoría de Proceso *
            </label>
            <select
              value={process.category}
              onChange={(e) => onChange({ category: e.target.value as ProcessCategory })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 bg-white"
            >
              {PROCESS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  Proceso {cat}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              {process.category === 'Estratégico' && 'Define el rumbo, directrices y políticas institucionales.'}
              {process.category === 'Misional' && 'Directamente ligado a la razón de ser, cadena de valor y clientes.'}
              {process.category === 'Apoyo' && 'Provee recursos para que los procesos misionales operen con éxito.'}
              {process.category === 'Evaluación y Control' && 'Mide el desempeño, auditorías y cumplimiento del sistema.'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Responsable / Dueño del Proceso *</span>
              {jobPositions.length > 0 && (
                <span className="text-[10px] text-emerald-700 font-semibold lowercase">
                  (vincular desde manual)
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                value={process.leaderRole}
                onChange={(e) => onChange({ leaderRole: e.target.value })}
                placeholder="Ej. Jefe de Compras y Suministros"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
              <Users className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            {jobPositions.length > 0 ? (
              <div className="mt-1 flex items-center gap-1 overflow-x-auto text-[10px]">
                <span className="text-slate-400 shrink-0">Cargos:</span>
                {jobPositions.slice(0, 3).map(j => (
                  <button
                    key={j.id}
                    type="button"
                    onClick={() => handleSelectJobAsLeader(j)}
                    className="px-1.5 py-0.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded font-medium truncate max-w-[120px] transition"
                    title={`Asignar ${j.title}`}
                  >
                    {j.title}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">Cargo principal que lidera y rinde cuentas.</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Participantes / Cargos Involucrados
            </label>
            <input
              type="text"
              value={process.participants}
              onChange={(e) => onChange({ participants: e.target.value })}
              placeholder="Ej. Auxiliar de compras, Analista de almacén, Proveedores"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
            <p className="text-[11px] text-slate-500 mt-1">Roles que intervienen en la ejecución de actividades.</p>
          </div>
        </div>

        {/* Row 3: Objetivo del Proceso */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Objetivo(s) del Proceso *</span>
            </label>
            
            {/* Quick helper buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">Alinear según:</span>
              <button
                type="button"
                onClick={() => suggestObjective('estrategico_mision')}
                className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md font-bold text-[11px] border border-indigo-200 flex items-center gap-1"
                title="Alinear con la Misión y Visión institucional"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Misión/Visión</span>
              </button>
              <button
                type="button"
                onClick={() => suggestObjective('calidad')}
                className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md font-medium text-[11px] border border-blue-200"
              >
                + Calidad
              </button>
              <button
                type="button"
                onClick={() => suggestObjective('eficiencia')}
                className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md font-medium text-[11px] border border-emerald-200"
              >
                + Productividad
              </button>
              <button
                type="button"
                onClick={() => suggestObjective('servicio')}
                className="px-2 py-0.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md font-medium text-[11px] border border-purple-200"
              >
                + Satisfacción Cliente
              </button>
            </div>
          </div>

          <textarea
            required
            rows={3}
            value={process.objective}
            onChange={(e) => onChange({ objective: e.target.value })}
            placeholder="Ej. Garantizar el suministro oportuno de bienes y servicios requeridos por la organización, cumpliendo los criterios de calidad, costo, especificaciones técnicas y tiempos de entrega acordados."
            className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-800 leading-relaxed"
          />
        </div>

        {/* Row 4: Producto del Proceso */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-emerald-600" />
            <span>Producto del Proceso (o Servicio Entregable) *</span>
          </label>
          <input
            type="text"
            required
            value={process.productOrService}
            onChange={(e) => onChange({ productOrService: e.target.value })}
            placeholder="Ej. Bienes, materias primas, insumos y servicios contratados, verificados y disponibles para la operación."
            className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            ¿Cuál es el resultado tangible o intangible que este proceso entrega a sus clientes?
          </p>
        </div>

        {/* Row 5: Alcance (Inicio y Fin) */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wide">
            <Maximize2 className="w-4 h-4 text-blue-600" />
            <span>Alcance del Proceso (Límites de Entrada y Salida)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-semibold text-slate-600 mb-1">
                Desde (Inicio / Evento Disparador):
              </span>
              <input
                type="text"
                value={process.scopeStart}
                onChange={(e) => onChange({ scopeStart: e.target.value })}
                placeholder="Ej. Recepción de la requisición o necesidad de compra debidamente autorizada."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs text-slate-800"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-600 mb-1">
                Hasta (Fin / Cierre del Proceso):
              </span>
              <input
                type="text"
                value={process.scopeEnd}
                onChange={(e) => onChange({ scopeEnd: e.target.value })}
                placeholder="Ej. Entrega conforme de los bienes/servicios al área solicitante e ingreso al sistema de inventarios."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs text-slate-800"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-500">
          Los datos ingresados se actualizan de forma continua en la ficha oficial.
        </div>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition active:scale-95"
        >
          <span>Continuar a Normas y Recursos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
