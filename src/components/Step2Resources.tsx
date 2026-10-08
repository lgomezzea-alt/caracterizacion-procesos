import React, { useState } from 'react';
import { 
  Cpu, 
  BookOpen, 
  Users, 
  FileSpreadsheet, 
  Building, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Scale,
  Compass,
  CheckCircle2,
  Briefcase,
  FileText
} from 'lucide-react';
import { ProcessCharacterization, OrgContext, JobPosition } from '../types/process';

interface Step2ResourcesProps {
  process: ProcessCharacterization;
  orgContext?: OrgContext;
  jobPositions?: JobPosition[];
  onChange: (updated: Partial<ProcessCharacterization>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Resources: React.FC<Step2ResourcesProps> = ({
  process,
  orgContext,
  jobPositions = [],
  onChange,
  onNext,
  onPrev
}) => {
  const [newNorm, setNewNorm] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newInfo, setNewInfo] = useState('');
  const [newHuman, setNewHuman] = useState('');
  const [newFormat, setNewFormat] = useState('');
  const [newInfra, setNewInfra] = useState('');
  const [newEnv, setNewEnv] = useState('');

  // Helper generic add
  const handleAddItem = (
    key: keyof Pick<
      ProcessCharacterization,
      | 'legalAndTechnicalNorms'
      | 'technologicalResources'
      | 'informationResources'
      | 'humanResources'
      | 'requiredFormats'
      | 'infrastructureAndEquipment'
      | 'workEnvironment'
    >,
    val: string,
    resetFn: (v: string) => void
  ) => {
    if (!val.trim()) return;
    const currentList = (process[key] as string[]) || [];
    onChange({ [key]: [...currentList, val.trim()] });
    resetFn('');
  };

  const handleRemoveItem = (
    key: keyof Pick<
      ProcessCharacterization,
      | 'legalAndTechnicalNorms'
      | 'technologicalResources'
      | 'informationResources'
      | 'humanResources'
      | 'requiredFormats'
      | 'infrastructureAndEquipment'
      | 'workEnvironment'
    >,
    index: number
  ) => {
    const currentList = (process[key] as string[]) || [];
    onChange({ [key]: currentList.filter((_, i) => i !== index) });
  };

  // Normas orientadas según la IDENTIFICACIÓN del proceso (Categoría y Tipo)
  const categoryNormsMap: Record<string, { norm: string; rationale: string }[]> = {
    'Estratégico': [
      { 
        norm: 'ISO 9001:2015 Numerales 4, 5 y 6 (Contexto de la organización, Liderazgo, Planificación y Gestión del Riesgo)', 
        rationale: 'Rige las directrices de la alta dirección, visión estratégica y política de calidad.' 
      },
      { 
        norm: 'ISO 31000:2018 Sistemas de Gestión del Riesgo (Principios y Directrices)', 
        rationale: 'Establece el marco de referencia para identificar y tratar riesgos estratégicos.' 
      },
      { 
        norm: 'ISO 37001:2016 Sistemas de Gestión Antisoborno y Cumplimiento Ético', 
        rationale: 'Asegura transparencia corporativa y prevención de corrupción en la dirección.' 
      },
      { 
        norm: 'Lineamientos de Gobierno Corporativo y Rendición de Cuentas Directivas', 
        rationale: 'Define la estructura de toma de decisiones y reporte a la junta/socios.' 
      }
    ],
    'Misional': [
      { 
        norm: 'ISO 9001:2015 Numeral 8 (Operación, Control de la Producción, Trazabilidad y Salidas No Conformes)', 
        rationale: 'Eje central de la cadena de valor: asegura conformidad del producto/servicio.' 
      },
      { 
        norm: 'ISO 14001:2015 Sistemas de Gestión Ambiental (Control Operacional de Impactos)', 
        rationale: 'Mitiga impactos ambientales directos derivados del proceso productivo/operativo.' 
      },
      { 
        norm: 'ISO 45001:2018 Seguridad y Salud en el Trabajo (Control Operacional de Riesgos Laborales)', 
        rationale: 'Protege a los trabajadores en la ejecución directa de la operación.' 
      },
      { 
        norm: 'Normas Técnicas Sectoriales y Buenas Prácticas de Manufactura/Operación (BPM / NTC aplicables)', 
        rationale: 'Regulan especificaciones técnicas obligatorias del producto o servicio entregado.' 
      }
    ],
    'Apoyo': [
      { 
        norm: 'ISO 9001:2015 Numeral 7 (Apoyo: Recursos, Competencia 7.2, Toma de Conciencia 7.3 e Información Documentada 7.5)', 
        rationale: 'Define la provisión y mantenimiento de recursos para soportar la operación.' 
      },
      { 
        norm: 'ISO 27001:2022 Seguridad de la Información, Ciberseguridad y Protección de la Privacidad', 
        rationale: 'Protege la confidencialidad, integridad y disponibilidad de datos e infraestructura TI.' 
      },
      { 
        norm: 'Ley Estatutaria 1581 de 2012 de Protección de Datos Personales (Habeas Data)', 
        rationale: 'Obligatoria para la administración de datos de personal, proveedores y clientes.' 
      },
      { 
        norm: 'ISO 55001:2014 Gestión de Activos e Infraestructura Física y Tecnológica', 
        rationale: 'Asegura la disponibilidad y mantenimiento preventivo de equipos e instalaciones.' 
      }
    ],
    'Evaluación y Control': [
      { 
        norm: 'ISO 9001:2015 Numerales 9 y 10 (Evaluación del Desempeño, Auditoría Interna 9.2, Revisión Directiva 9.3 y Mejora 10)', 
        rationale: 'Exige el seguimiento metódico de indicadores y cierre eficaz de no conformidades.' 
      },
      { 
        norm: 'ISO 19011:2018 Directrices para la Auditoría de los Sistemas de Gestión', 
        rationale: 'Guía metodológica para planear, ejecutar y documentar auditorías de calidad.' 
      },
      { 
        norm: 'Marco Integrado de Control Interno (Modelo COSO / MECI)', 
        rationale: 'Estructura el ambiente de control, valoración de riesgos y supervisión interna.' 
      },
      { 
        norm: 'Estatuto de Auditoría y Normas de Independencia y Objetividad Profesional', 
        rationale: 'Garantiza la imparcialidad en la evaluación de la conformidad de los procesos.' 
      }
    ]
  };

  const currentCategoryNorms = categoryNormsMap[process.category] || categoryNormsMap['Misional'];

  const handleAddCategoryNorm = (normText: string) => {
    const existing = new Set(process.legalAndTechnicalNorms || []);
    if (!existing.has(normText)) {
      onChange({
        legalAndTechnicalNorms: [...(process.legalAndTechnicalNorms || []), normText]
      });
    }
  };

  const handleAddAllCategoryNorms = () => {
    const existing = new Set(process.legalAndTechnicalNorms || []);
    const merged = [...(process.legalAndTechnicalNorms || [])];
    currentCategoryNorms.forEach(item => {
      if (!existing.has(item.norm)) {
        merged.push(item.norm);
      }
    });
    onChange({ legalAndTechnicalNorms: merged });
  };

  const handleImportJobCompetencies = () => {
    // Import job competencies from related jobs
    const related = jobPositions.find(j => 
      j.title.toLowerCase() === process.leaderRole?.toLowerCase() ||
      j.associatedProcessCategory === process.category
    ) || jobPositions[0];

    if (!related) return;

    const existingHuman = new Set(process.humanResources || []);
    const additions: string[] = [];
    
    const roleItem = `Líder: ${related.title} (Educación: ${related.education || 'Profesional'} | Exp: ${related.experience || '2 años'})`;
    if (!existingHuman.has(roleItem)) additions.push(roleItem);

    (related.competencies || []).forEach(comp => {
      const cItem = `Competencia clave: ${comp}`;
      if (!existingHuman.has(cItem)) additions.push(cItem);
    });

    if (additions.length > 0) {
      onChange({
        humanResources: [...(process.humanResources || []), ...additions]
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Guidance Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              Paso 2 de 6 • Marco Normativo y Recursos Requeridos
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Normas Técnicas/Legales, Recursos, Infraestructura y Ambiente
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              La ISO 9001:2015 (numerales 7.1 y 7.5) exige determinar los recursos necesarios para el funcionamiento y control del proceso: personas, infraestructura, ambiente para la operación, recursos tecnológicos y formatos de soporte.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={handleAddAllCategoryNorms}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-xs transition"
              title={`Añadir normas técnicas recomendadas para la categoría ${process.category}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Añadir Normas para Proceso {process.category}</span>
            </button>
          </div>
        </div>
      </div>

      {/* APORTE DE IDENTIFICACIÓN: Orientación Normativa Específica */}
      <div className="bg-gradient-to-r from-indigo-50/70 via-blue-50/50 to-slate-50 rounded-2xl border border-indigo-200 p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-200/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
                <span>Orientación Normativa derivada de la Identificación</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-extrabold">
                  Categoría: {process.category}
                </span>
              </h3>
              <p className="text-[11px] text-slate-600">
                La categoría y alcance definidos en el Paso 1 orientan qué marco legal y técnico aplica a <strong>{process.name || 'este proceso'}</strong>.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddAllCategoryNorms}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition shrink-0"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Vincular Todas ({currentCategoryNorms.length})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {currentCategoryNorms.map((item, idx) => {
            const isAlreadyAdded = (process.legalAndTechnicalNorms || []).some(n => n.includes(item.norm.slice(0, 30)));
            return (
              <div 
                key={idx}
                className={`p-3 rounded-xl border text-xs transition flex flex-col justify-between gap-2 ${
                  isAlreadyAdded 
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-[11px] text-slate-900 leading-tight">
                      {item.norm}
                    </span>
                    {isAlreadyAdded && (
                      <span className="shrink-0 text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold">
                        Vinculada
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {item.rationale}
                  </p>
                </div>

                {!isAlreadyAdded && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => handleAddCategoryNorm(item.norm)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-[10px] font-bold transition"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Agregar a Normas del Proceso</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Normas Técnicas y Legales */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Normas Técnicas y Legales que Orientan el Proceso ({process.legalAndTechnicalNorms?.length || 0})
              </h3>
              <p className="text-xs text-slate-500">
                Leyes, decretos, resoluciones, normas ISO o técnicas aplicables que regulan este proceso.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(process.legalAndTechnicalNorms || []).map((norm, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-xl text-xs font-medium"
            >
              <span>{norm}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem('legalAndTechnicalNorms', idx)}
                className="text-indigo-400 hover:text-red-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {(!process.legalAndTechnicalNorms || process.legalAndTechnicalNorms.length === 0) && (
            <span className="text-xs text-slate-400 italic">No se han registrado normas todavía.</span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newNorm}
            onChange={(e) => setNewNorm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddItem('legalAndTechnicalNorms', newNorm, setNewNorm);
              }
            }}
            placeholder="Ej: ISO 9001:2015 Numeral 8.4 - Control de procesos suministrados externamente"
            className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => handleAddItem('legalAndTechnicalNorms', newNorm, setNewNorm)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Norma</span>
          </button>
        </div>
      </div>

      {/* Grid: 4 Recursos Requeridos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recursos Tecnológicos */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>Recursos Tecnológicos ({process.technologicalResources?.length || 0})</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Sistemas informáticos, ERP, software especializado, equipos de computación y conectividad.
          </p>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {(process.technologicalResources || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="text-slate-800">{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem('technologicalResources', idx)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('technologicalResources', newTech, setNewTech); }}}
              placeholder="Ej: Software ERP / Módulo de Compras"
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
            />
            <button
              type="button"
              onClick={() => handleAddItem('technologicalResources', newTech, setNewTech)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recursos de Información */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Recursos de Información ({process.informationResources?.length || 0})</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Fichas técnicas, catálogos, directivas, bases de datos históricas, manuales de procedimiento.
          </p>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {(process.informationResources || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="text-slate-800">{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem('informationResources', idx)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newInfo}
              onChange={(e) => setNewInfo(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('informationResources', newInfo, setNewInfo); }}}
              placeholder="Ej: Catálogo de especificaciones técnicas"
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
            />
            <button
              type="button"
              onClick={() => handleAddItem('informationResources', newInfo, setNewInfo)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recursos Humanos Requeridos */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Recursos Humanos y Perfiles Requeridos ({process.humanResources?.length || 0})</span>
            </div>
            {jobPositions.length > 0 && (
              <button
                type="button"
                onClick={handleImportJobCompetencies}
                className="inline-flex items-center gap-1 text-[11px] text-purple-700 hover:text-purple-900 font-semibold bg-purple-50 hover:bg-purple-100 px-2 py-0.5 rounded-md border border-purple-200 transition"
                title="Vincular requisitos y competencias del cargo del manual"
              >
                <Briefcase className="w-3 h-3" />
                <span>Importar del Manual</span>
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            Perfiles de competencia requeridos (educación, formación, habilidades y experiencia).
          </p>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {(process.humanResources || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="text-slate-800">{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem('humanResources', idx)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newHuman}
              onChange={(e) => setNewHuman(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('humanResources', newHuman, setNewHuman); }}}
              placeholder="Ej: Profesional en Ingeniería con experiencia mínima de 2 años"
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
            />
            <button
              type="button"
              onClick={() => handleAddItem('humanResources', newHuman, setNewHuman)}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Formatos Requeridos */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
            <FileSpreadsheet className="w-4 h-4 text-amber-600" />
            <span>Formatos y Registros Requeridos ({process.requiredFormats?.length || 0})</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Formatos del SGI donde se documenta la evidencia de la operación y el control.
          </p>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {(process.requiredFormats || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="text-slate-800 font-mono text-[11px]">{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem('requiredFormats', idx)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newFormat}
              onChange={(e) => setNewFormat(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('requiredFormats', newFormat, setNewFormat); }}}
              placeholder="Ej: FOR-AB-01 Requisición de Compras"
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
            />
            <button
              type="button"
              onClick={() => handleAddItem('requiredFormats', newFormat, setNewFormat)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Bloque Superior de la Imagen Oficial: Infraestructura y Dotación + Ambiente de Trabajo */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Condiciones de Infraestructura y Ambiente de Trabajo (Directo en Formato Oficial)
          </h3>
          <p className="text-xs text-slate-500">
            Estos dos campos corresponden a las columnas centrales de la cabecera en el formato de caracterización.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Infraestructura y Dotación */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wide">
              <Building className="w-4 h-4 text-blue-600" />
              <span>Infraestructura y Dotación ({process.infrastructureAndEquipment?.length || 0})</span>
            </div>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {(process.infrastructureAndEquipment || []).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <span className="text-slate-800">1) {item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('infrastructureAndEquipment', idx)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newInfra}
                onChange={(e) => setNewInfra(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('infrastructureAndEquipment', newInfra, setNewInfra); }}}
                placeholder="Ej: Zona de cargue y descargue techada con báscula calibrada"
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={() => handleAddItem('infrastructureAndEquipment', newInfra, setNewInfra)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Ambiente de Trabajo */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>Ambiente de Trabajo ({process.workEnvironment?.length || 0})</span>
            </div>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {(process.workEnvironment || []).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <span className="text-slate-800">1) {item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('workEnvironment', idx)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newEnv}
                onChange={(e) => setNewEnv(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('workEnvironment', newEnv, setNewEnv); }}}
                placeholder="Ej: Iluminación mínima de 500 lux, uso de EPP y ruido < 65 dB"
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={() => handleAddItem('workEnvironment', newEnv, setNewEnv)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
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
          <span>Volver al Paso 1</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition active:scale-95"
        >
          <span>Continuar a Flujograma de Trabajo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
