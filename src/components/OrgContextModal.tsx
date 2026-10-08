import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  X, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check, 
  FileText, 
  ShieldCheck, 
  Target, 
  Compass, 
  Lightbulb, 
  Image as ImageIcon 
} from 'lucide-react';
import { OrgContext } from '../types/process';

interface OrgContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgContext: OrgContext;
  onSave: (updated: OrgContext) => void;
}

export const OrgContextModal: React.FC<OrgContextModalProps> = ({
  isOpen,
  onClose,
  orgContext,
  onSave
}) => {
  const [formData, setFormData] = useState<OrgContext>({ ...orgContext });
  const [missionComponents, setMissionComponents] = useState({
    orgName: orgContext.missionComponents?.orgName || orgContext.name || '',
    activity: orgContext.missionComponents?.activity || 'proveer soluciones y productos industriales de alta calidad',
    targetMarket: orgContext.missionComponents?.targetMarket || 'empresas y clientes de sectores productivos e institucionales',
    differentiator: orgContext.missionComponents?.differentiator || 'procesos estandarizados, cumplimiento normativo y mejora continua'
  });
  const [visionComponents, setVisionComponents] = useState({
    orgName: orgContext.visionComponents?.orgName || orgContext.name || '',
    targetYear: orgContext.visionComponents?.targetYear || '2030',
    achievementGoal: orgContext.visionComponents?.achievementGoal || 'consolidarse como la empresa líder en productividad y excelencia operativa de soluciones industriales en la región',
    toolsAndMethods: orgContext.visionComponents?.toolsAndMethods || 'la estandarización rigurosa de procesos bajo la norma ISO 9001, innovación tecnológica continua y desarrollo del talento humano',
    customerImpact: orgContext.visionComponents?.customerImpact || 'máxima confiabilidad, reducción de costos operativos y total satisfacción en cada entrega'
  });
  const [newValue, setNewValue] = useState('');
  const [newPolicy, setNewPolicy] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const composeMission = (comp: {
    orgName?: string;
    activity?: string;
    targetMarket?: string;
    differentiator?: string;
  }) => {
    const name = comp.orgName?.trim() || formData.name?.trim() || 'Nuestra empresa';
    let act = comp.activity?.trim() || 'proveer soluciones y productos industriales de alta calidad';
    let market = comp.targetMarket?.trim() || 'empresas y clientes de sectores productivos e institucionales';
    let diff = comp.differentiator?.trim() || 'procesos estandarizados bajo normas de calidad ISO 9001, entregas justo a tiempo y acompañamiento postventa';

    if (act.match(/^(es una organización dedicada a|dedicada a|dedicados a)\s+/i)) {
      act = act.replace(/^(es una organización dedicada a|dedicada a|dedicados a)\s+/i, '');
    }
    if (market.match(/^(orientada a satisfacer las necesidades de|orientada a|orientados a|dirigida a|dirigidos a)\s+/i)) {
      market = market.replace(/^(orientada a satisfacer las necesidades de|orientada a|orientados a|dirigida a|dirigidos a)\s+/i, '');
    }
    if (diff.match(/^(diferenciándonos de la competencia por|diferenciándonos en el mercado por|diferenciados por|diferenciándonos por)\s+/i)) {
      diff = diff.replace(/^(diferenciándonos de la competencia por|diferenciándonos en el mercado por|diferenciados por|diferenciándonos por)\s+/i, '');
    }

    return `${name} es una organización dedicada a ${act}, orientada a satisfacer las necesidades de ${market}, diferenciándonos de la competencia por ${diff}.`;
  };

  const composeVision = (comp: {
    orgName?: string;
    targetYear?: string;
    achievementGoal?: string;
    toolsAndMethods?: string;
    customerImpact?: string;
  }) => {
    const name = comp.orgName?.trim() || formData.name?.trim() || 'Nuestra organización';
    const year = comp.targetYear?.trim() || '2030';
    let goal = comp.achievementGoal?.trim() || 'consolidarse como la empresa líder en productividad y excelencia operativa de soluciones industriales en la región';
    let tools = comp.toolsAndMethods?.trim() || 'la estandarización rigurosa de procesos bajo la norma ISO 9001, innovación tecnológica continua y desarrollo del talento humano';
    let impact = comp.customerImpact?.trim() || 'máxima confiabilidad, reducción de costos operativos y total satisfacción en cada entrega';

    if (goal.match(/^(habrá cumplido la meta de|alcanzado la meta de|la meta de|cumplir la meta de)\s+/i)) {
      goal = goal.replace(/^(habrá cumplido la meta de|alcanzado la meta de|la meta de|cumplir la meta de)\s+/i, '');
    }
    if (tools.match(/^(a través de|mediante|con|utilizando)\s+/i)) {
      tools = tools.replace(/^(a través de|mediante|con|utilizando)\s+/i, '');
    }
    if (impact.match(/^(generando en los clientes|generando|logrando en los clientes|logrando)\s+/i)) {
      impact = impact.replace(/^(generando en los clientes|generando|logrando en los clientes|logrando)\s+/i, '');
    }

    return `Para el año ${year}, ${name} habrá cumplido la meta de ${goal}, la cual se llevará a buen término a través de ${tools}, generando en los clientes ${impact}.`;
  };

  useEffect(() => {
    if (isOpen) {
      const vComp = {
        orgName: orgContext.visionComponents?.orgName || orgContext.name || '',
        targetYear: orgContext.visionComponents?.targetYear || '2030',
        achievementGoal: orgContext.visionComponents?.achievementGoal || 'consolidarse como la empresa líder en productividad y excelencia operativa de soluciones industriales en la región',
        toolsAndMethods: orgContext.visionComponents?.toolsAndMethods || 'la estandarización rigurosa de procesos bajo la norma ISO 9001, innovación tecnológica continua y desarrollo del talento humano',
        customerImpact: orgContext.visionComponents?.customerImpact || 'máxima confiabilidad, reducción de costos operativos y total satisfacción en cada entrega'
      };
      const mComp = {
        orgName: orgContext.missionComponents?.orgName || orgContext.name || '',
        activity: orgContext.missionComponents?.activity || 'proveer soluciones y productos industriales de alta calidad',
        targetMarket: orgContext.missionComponents?.targetMarket || 'empresas y clientes de sectores productivos e institucionales',
        differentiator: orgContext.missionComponents?.differentiator || 'procesos estandarizados, cumplimiento normativo y mejora continua'
      };
      setMissionComponents(mComp);
      setVisionComponents(vComp);

      const isLegacyVision = !orgContext.vision || 
        orgContext.vision.startsWith('Ser reconocidos para el año') || 
        orgContext.vision.startsWith('Ser la empresa líder');
      const isLegacyMission = !orgContext.mission ||
        orgContext.mission.startsWith('Proveer soluciones integrales');

      const initialMission = isLegacyMission ? composeMission(mComp) : orgContext.mission;
      const initialVision = isLegacyVision ? composeVision(vComp) : orgContext.vision;

      setFormData({
        ...orgContext,
        missionComponents: mComp,
        visionComponents: vComp,
        mission: initialMission,
        vision: initialVision
      });
    }
  }, [isOpen, orgContext]);

  const handleUpdateComponent = (
    field: 'orgName' | 'activity' | 'targetMarket' | 'differentiator',
    val: string
  ) => {
    const nextComp = { ...missionComponents, [field]: val };
    setMissionComponents(nextComp);
    const autoMission = composeMission(nextComp);
    setFormData(prev => ({
      ...prev,
      mission: autoMission,
      missionComponents: nextComp
    }));
  };

  const handleUpdateVisionComponent = (
    field: 'orgName' | 'targetYear' | 'achievementGoal' | 'toolsAndMethods' | 'customerImpact',
    val: string
  ) => {
    const nextComp = { ...visionComponents, [field]: val };
    setVisionComponents(nextComp);
    const autoVision = composeVision(nextComp);
    setFormData(prev => ({
      ...prev,
      vision: autoVision,
      visionComponents: nextComp
    }));
  };

  const handleAddValue = () => {
    if (!newValue.trim()) return;
    setFormData(prev => ({
      ...prev,
      values: [...prev.values, newValue.trim()]
    }));
    setNewValue('');
  };

  const handleRemoveValue = (index: number) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const handleAddPolicy = () => {
    if (!newPolicy.trim()) return;
    setFormData(prev => ({
      ...prev,
      policies: [...prev.policies, newPolicy.trim()]
    }));
    setNewPolicy('');
  };

  const handleRemovePolicy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      policies: prev.policies.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleNameChange = (val: string) => {
    const prevName = formData.name;
    const shouldUpdateMissionName = !missionComponents.orgName || missionComponents.orgName === prevName;
    const shouldUpdateVisionName = !visionComponents.orgName || visionComponents.orgName === prevName;

    const nextMission = shouldUpdateMissionName ? { ...missionComponents, orgName: val } : missionComponents;
    const nextVision = shouldUpdateVisionName ? { ...visionComponents, orgName: val } : visionComponents;

    if (shouldUpdateMissionName) setMissionComponents(nextMission);
    if (shouldUpdateVisionName) setVisionComponents(nextVision);

    setFormData(prev => ({
      ...prev,
      name: val,
      mission: shouldUpdateMissionName ? composeMission(nextMission) : prev.mission,
      missionComponents: nextMission,
      vision: shouldUpdateVisionName ? composeVision(nextVision) : prev.vision,
      visionComponents: nextVision
    }));
  };

  const loadExampleContext = () => {
    const exampleComponents = {
      orgName: 'SERVICIOS Y SOLUCIONES EMPRESARIALES DE COLOMBIA S.A.S.',
      activity: 'diseñar y suministrar servicios de consultoría técnica y manufactura ligera de alta precisión',
      targetMarket: 'empresas del sector productivo e industrial que buscan maximizar su productividad y estándares de calidad',
      differentiator: 'procesos certificados bajo normas internacionales ISO 9001, entregas puntuales y acompañamiento técnico personalizado'
    };
    const exampleMission = composeMission(exampleComponents);

    const exampleVisionComponents = {
      orgName: 'SERVICIOS Y SOLUCIONES EMPRESARIALES DE COLOMBIA S.A.S.',
      targetYear: '2030',
      achievementGoal: 'consolidarse como referente regional líder en gestión integral por procesos, productividad y excelencia operativa',
      toolsAndMethods: 'la estandarización rigurosa bajo normas ISO 9001:2015, la transformación digital operativa y el fortalecimiento continuo del talento humano',
      customerImpact: 'entregas con cero no conformidades, trazabilidad en tiempo real y la más alta confiabilidad en cada servicio prestado'
    };
    const exampleVision = composeVision(exampleVisionComponents);
    
    setMissionComponents(exampleComponents);
    setVisionComponents(exampleVisionComponents);
    setFormData({
      name: exampleComponents.orgName,
      nit: '900.852.147-1',
      slogan: 'Transformamos procesos con calidad, agilidad y visión de futuro',
      mission: exampleMission,
      missionComponents: exampleComponents,
      vision: exampleVision,
      visionComponents: exampleVisionComponents,
      values: [
        'Excelencia y Orientación a Resultados',
        'Ética, Transparencia e Integridad',
        'Cultura de Calidad y Mejora Continua',
        'Trabajo en Equipo y Comunicación Asertiva',
        'Sostenibilidad y Responsabilidad Social'
      ],
      policies: [
        'Política de Gestión de Calidad: Satisfacer oportunamente los requisitos de los clientes mediante procesos estandarizados, control de variables críticas y auditorías periódicas.',
        'Política de Seguridad y Salud en el Trabajo: Proveer entornos laborales seguros que prevengan accidentes laborales y enfermedades profesionales.',
        'Política de Gestión Ambiental: Minimizar la huella ecológica a través del uso responsable de materias primas y correcta disposición de residuos.',
        'Política de Confidencialidad y Protección de Datos: Salvaguardar la privacidad de la información de clientes, colaboradores y proveedores.'
      ],
      representativeName: 'Ing. Alejandro Restrepo Morales',
      sector: 'Servicios de Consultoría, Tecnología y Manufactura Ligera',
      logoUrl: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Building2 className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Contexto de la Organización</h2>
              <p className="text-xs text-blue-200">
                Punto de partida del Sistema de Gestión: Identidad, Misión, Visión, Valores y Políticas
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadExampleContext}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white/10 hover:bg-white/20 text-blue-100 rounded-lg transition"
              title="Cargar ejemplo completo"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ejemplo Guiado</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          
          {/* Identificación Básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nombre o Razón Social de la Empresa *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ej. INDUSTRIAS DEL PACÍFICO S.A.S."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Identificación Tributaria / NIT *
              </label>
              <input
                type="text"
                required
                value={formData.nit}
                onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
                placeholder="Ej. 901.458.789-2"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-slate-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Eslogan Organizacional *
              </label>
              <input
                type="text"
                value={formData.slogan}
                onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                placeholder="Ej. Pasión por la calidad y compromiso con la mejora continua"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Representante Legal / Gerencia
              </label>
              <input
                type="text"
                value={formData.representativeName || ''}
                onChange={(e) => setFormData({ ...formData, representativeName: e.target.value })}
                placeholder="Ej. Dr. Carlos Mario Restrepo"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Sector Económico / Actividad Principal
              </label>
              <input
                type="text"
                value={formData.sector || ''}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                placeholder="Ej. Manufactura de Alimentos, Consultoría, etc."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Misión y Visión */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wide">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Misión Organizacional (Estructurada en 4 Componentes Estratégicos) *</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  Metodología de Calidad y Planeación
                </span>
              </div>

              {/* Los 4 Componentes de la Misión Solicitados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Componente 1: Nombre de la organización (razón social) */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-1">
                    1) Razón Social de la Empresa *
                  </label>
                  <input
                    type="text"
                    value={missionComponents.orgName}
                    onChange={(e) => handleUpdateComponent('orgName', e.target.value)}
                    placeholder="Ej. INDUSTRIAS DEL PACÍFICO S.A.S."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Identidad formal de la organización</span>
                </div>

                {/* Componente 2: ¿A qué se dedica la organización? (cómo genera recursos) */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-1">
                    2) ¿A qué se dedica? (Cómo genera recursos) *
                  </label>
                  <input
                    type="text"
                    value={missionComponents.activity}
                    onChange={(e) => handleUpdateComponent('activity', e.target.value)}
                    placeholder="Ej. Diseño, fabricación y suministro de bienes industriales / servicios de consultoría..."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Actividad económica y generación de valor</span>
                </div>

                {/* Componente 3: ¿A qué cliente estoy orientado? (mercado objetivo o nicho) */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-1">
                    3) ¿A qué cliente está orientado? (Mercado objetivo) *
                  </label>
                  <input
                    type="text"
                    value={missionComponents.targetMarket}
                    onChange={(e) => handleUpdateComponent('targetMarket', e.target.value)}
                    placeholder="Ej. Empresas del sector manufactura, infraestructura y logística..."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Nicho de mercado y clientes atendidos</span>
                </div>

                {/* Componente 4: ¿En qué me diferencio de la competencia? */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-1">
                    4) ¿En qué se diferencia de la competencia? *
                  </label>
                  <input
                    type="text"
                    value={missionComponents.differentiator}
                    onChange={(e) => handleUpdateComponent('differentiator', e.target.value)}
                    placeholder="Ej. Procesos certificados ISO 9001, entregas puntuales y soporte técnico postventa..."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Factor diferenciador y propuesta de valor única</span>
                </div>

              </div>

              {/* Redacción Consolidada de la Misión (Textarea enfocada) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                      Redacción Consolidada de la Misión (Síntesis de los 4 Componentes) *
                    </label>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Consolidado automático
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const auto = composeMission(missionComponents);
                      setFormData(prev => ({ ...prev, mission: auto }));
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Regenerar desde los 4 Componentes</span>
                  </button>
                </div>

                <textarea
                  required
                  rows={3}
                  value={formData.mission}
                  onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                  placeholder="Redacción consolidada generada automáticamente a partir de los 4 componentes de la misión..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none text-xs leading-relaxed"
                />

                <p className="text-[10px] text-slate-500">
                  Esta redacción es el <strong>consolidado directo</strong> de los 4 componentes: <strong>[1. Razón Social]</strong> + <strong>[2. Actividad económica / generación de recursos]</strong> + <strong>[3. Mercado objetivo / nicho]</strong> + <strong>[4. Diferenciación de la competencia]</strong>. Al modificar cualquiera de los 4 componentes superiores, esta redacción se actualiza automáticamente.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wide">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  <span>Visión Organizacional (Estructurada en 5 Componentes Estratégicos) *</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  Metodología de Proyección y Metas Futuras
                </span>
              </div>

              {/* Los 5 Componentes de la Visión Solicitados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                
                {/* Componente 1: Nombre de la organización */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1">
                    1) Nombre de la Organización *
                  </label>
                  <input
                    type="text"
                    value={visionComponents.orgName}
                    onChange={(e) => handleUpdateVisionComponent('orgName', e.target.value)}
                    placeholder="Ej. INDUSTRIAS DEL PACÍFICO S.A.S."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Identidad formal de la empresa</span>
                </div>

                {/* Componente 2: ¿En qué año se verá consolidada la visión? */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1">
                    2) ¿En qué año se consolidará la visión? *
                  </label>
                  <input
                    type="text"
                    value={visionComponents.targetYear}
                    onChange={(e) => handleUpdateVisionComponent('targetYear', e.target.value)}
                    placeholder="Ej. 2030"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 font-bold text-indigo-700"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Horizonte temporal o año meta proyectado</span>
                </div>

                {/* Componente 3: ¿Cuál será la meta cumplida de la organización en ese año? */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 sm:col-span-2 lg:col-span-1">
                  <label className="block text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1">
                    3) ¿Cuál será la meta cumplida en ese año? *
                  </label>
                  <input
                    type="text"
                    value={visionComponents.achievementGoal}
                    onChange={(e) => handleUpdateVisionComponent('achievementGoal', e.target.value)}
                    placeholder="Ej. Ser el referente líder nacional en productividad y excelencia operativa..."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Hito cumbre o gran objetivo de la empresa</span>
                </div>

                {/* Componente 4: ¿Esta meta cumplida a través de qué herramientas se llevará a buen término? */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 sm:col-span-2 lg:col-span-2">
                  <label className="block text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1">
                    4) ¿A través de qué herramientas se llevará a buen término? *
                  </label>
                  <input
                    type="text"
                    value={visionComponents.toolsAndMethods}
                    onChange={(e) => handleUpdateVisionComponent('toolsAndMethods', e.target.value)}
                    placeholder="Ej. La estandarización bajo normas ISO 9001, innovación tecnológica continua y desarrollo del talento humano..."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Herramientas, metodologías, tecnología y recursos clave</span>
                </div>

                {/* Componente 5: ¿Qué efecto tendrá en los clientes? */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 sm:col-span-2 lg:col-span-1">
                  <label className="block text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1">
                    5) ¿Qué efecto tendrá en los clientes? *
                  </label>
                  <input
                    type="text"
                    value={visionComponents.customerImpact}
                    onChange={(e) => handleUpdateVisionComponent('customerImpact', e.target.value)}
                    placeholder="Ej. Confiabilidad absoluta, entregas justo a tiempo y total satisfacción..."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Impacto, beneficio tangible y percepción de valor</span>
                </div>

              </div>

              {/* Redacción Consolidada de la Visión (Textarea con síntesis automática) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                      Redacción Consolidada de la Visión (Síntesis de los 5 Componentes) *
                    </label>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Consolidado automático
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const auto = composeVision(visionComponents);
                      setFormData(prev => ({ ...prev, vision: auto }));
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Regenerar desde los 5 Componentes</span>
                  </button>
                </div>

                <textarea
                  required
                  rows={3}
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  placeholder="Redacción consolidada generada automáticamente a partir de los 5 componentes de la visión..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-800 resize-none text-xs leading-relaxed"
                />

                <p className="text-[10px] text-slate-500">
                  Esta redacción es el <strong>consolidado directo</strong> de los 5 componentes: <strong>[1. Nombre de la organización]</strong> + <strong>[2. Año de consolidación]</strong> + <strong>[3. Meta cumplida]</strong> + <strong>[4. Herramientas a buen término]</strong> + <strong>[5. Efecto en los clientes]</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Valores Corporativos */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Valores Organizacionales ({formData.values.length})</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {formData.values.map((val, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {val}
                  <button
                    type="button"
                    onClick={() => handleRemoveValue(idx)}
                    className="text-slate-400 hover:text-red-600 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {formData.values.length === 0 && (
                <span className="text-xs text-slate-400 italic">No hay valores registrados todavía.</span>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddValue(); } }}
                placeholder="Agregar nuevo valor (Ej: Respeto, Orientación al cliente)"
                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddValue}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar</span>
              </button>
            </div>
          </div>

          {/* Políticas Organizacionales */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Políticas Organizacionales ({formData.policies.length})</span>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              {formData.policies.map((pol, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                >
                  <span className="font-semibold text-blue-600 shrink-0">#{idx + 1}</span>
                  <p className="flex-1 text-slate-700 leading-relaxed">{pol}</p>
                  <button
                    type="button"
                    onClick={() => handleRemovePolicy(idx)}
                    className="text-slate-400 hover:text-red-600 shrink-0"
                    title="Eliminar política"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <textarea
                rows={2}
                value={newPolicy}
                onChange={(e) => setNewPolicy(e.target.value)}
                placeholder="Redactar política (Ej: Política de Calidad: Comprometidos con satisfacer los requerimientos...)"
                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddPolicy}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 self-end"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar</span>
              </button>
            </div>
          </div>

          {/* Logo URL */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
              <ImageIcon className="w-4 h-4 text-indigo-600" />
              <span>URL o Logotipo Institucional</span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={formData.logoUrl || ''}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                placeholder="Pegar enlace de imagen del logo (opcional)"
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
              />
              {formData.logoUrl && (
                <div className="w-10 h-10 border border-slate-300 rounded-lg overflow-hidden shrink-0 bg-white p-1">
                  <img src={formData.logoUrl} alt="Vista previa" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Este logo aparecerá en el encabezado oficial de la ficha de caracterización en la esquina superior izquierda.
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Todos los cambios se aplican automáticamente a todas las fichas de caracterización.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 font-semibold text-xs transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Guardado</span>
                  </>
                ) : (
                  <span>Guardar Contexto</span>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
