import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Building2, 
  PenTool, 
  ShieldCheck, 
  ArrowLeft,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import { OrgContext, ProcessCharacterization, ApprovalSignatures } from '../types/process';

interface Step6OfficialDocProps {
  orgContext: OrgContext;
  process: ProcessCharacterization;
  onChange: (updated: Partial<ProcessCharacterization>) => void;
  onPrev: () => void;
  showSignaturesDrawer?: boolean;
  onToggleSignaturesDrawer?: () => void;
}

export const Step6OfficialDoc: React.FC<Step6OfficialDocProps> = ({
  orgContext,
  process,
  onChange,
  onPrev,
  showSignaturesDrawer,
  onToggleSignaturesDrawer
}) => {
  const [copied, setCopied] = useState(false);
  const [internalEditSignatures, setInternalEditSignatures] = useState(false);

  const editSignatures = showSignaturesDrawer !== undefined ? showSignaturesDrawer : internalEditSignatures;
  const handleToggleSignatures = () => {
    if (onToggleSignaturesDrawer) {
      onToggleSignaturesDrawer();
    } else {
      setInternalEditSignatures(prev => !prev);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = `
CARACTERIZACIÓN DE PROCESO
===========================
Empresa: ${orgContext.name} (NIT: ${orgContext.nit})
Proceso: ${process.name}
Código: ${process.code} | Versión: ${process.version}
Categoría: Proceso ${process.category}
Líder: ${process.leaderRole}
Participantes: ${process.participants}

OBJETIVO:
${process.objective}

PRODUCTO DEL PROCESO:
${process.productOrService}

ALCANCE:
Desde: ${process.scopeStart}
Hasta: ${process.scopeEnd}

INDICADORES DE GESTIÓN:
${process.indicators.map((ind, i) => `${i + 1}. ${ind.name} (Meta: ${ind.target}, Frecuencia: ${ind.frequency})`).join('\n')}

ACTIVIDADES PHVA:
${process.activities.map(a => `${a.number}. [${a.stage}] ${a.name} (Resp: ${a.responsibleRole})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      organization: orgContext,
      process: process,
      exportedAt: new Date().toISOString()
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Caracterizacion_${process.code || 'Proceso'}_${process.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    const escapeCsv = (val: string | undefined | null) => {
      if (!val) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    let csv = '\uFEFF'; // UTF-8 BOM para apertura correcta en Microsoft Excel y Google Sheets
    csv += 'FICHA OFICIAL DE CARACTERIZACIÓN DE PROCESO (ISO 9001:2015)\n';
    csv += `Empresa;${escapeCsv(orgContext.name)};NIT;${escapeCsv(orgContext.nit)}\n`;
    csv += `Proceso;${escapeCsv(process.name)};Código;${escapeCsv(process.code)};Versión;${escapeCsv(process.version)}\n`;
    csv += `Categoría;${escapeCsv(process.category)};Líder del Proceso;${escapeCsv(process.leaderRole)}\n`;
    csv += `Participantes;${escapeCsv(process.participants)}\n`;
    csv += `Objetivo del Proceso;${escapeCsv(process.objective)}\n`;
    csv += `Producto o Servicio;${escapeCsv(process.productOrService)}\n`;
    csv += `Alcance Inicio;${escapeCsv(process.scopeStart)};Alcance Fin;${escapeCsv(process.scopeEnd)}\n\n`;

    csv += 'MATRIZ SIPOC / ACTIVIDADES DEL PROCESO (CICLO PHVA)\n';
    csv += 'No;Etapa PHVA;Actividad;Proceso Proveedor;Entradas / Insumos;Salidas / Entregables;Proceso Cliente;Responsable\n';
    (process.activities || []).forEach((act) => {
      csv += `${act.number};${escapeCsv(act.stage)};${escapeCsv(act.name)};${escapeCsv(act.supplier)};${escapeCsv(act.inputs)};${escapeCsv(act.outputs)};${escapeCsv(act.customer)};${escapeCsv(act.responsibleRole)}\n`;
    });
    csv += '\n';

    csv += 'PLAN DE SEGUIMIENTO Y MEDICIÓN (CONTROL DEL PROCESO)\n';
    csv += 'No;Actividad Vinculada;Variable a Controlar;Especificación del Control;Criterios de Aceptación/Rechazo;Quién Inspecciona;Registro de Inspección;Acción de Contingencia\n';
    (process.measurementPlan || []).forEach((ctrl, idx) => {
      csv += `${idx + 1};${escapeCsv(ctrl.activityName)};${escapeCsv(ctrl.variableToControl)};${escapeCsv(ctrl.specification)};${escapeCsv(ctrl.acceptanceCriteria)};${escapeCsv(ctrl.inspectorRole)};${escapeCsv(ctrl.inspectionRecord)};${escapeCsv(ctrl.contingencyAction)}\n`;
    });
    csv += '\n';

    csv += 'INDICADORES DE GESTIÓN\n';
    csv += 'No;Nombre del Indicador;Fórmula de Cálculo;Meta;Frecuencia;Responsable\n';
    (process.indicators || []).forEach((ind, idx) => {
      csv += `${idx + 1};${escapeCsv(ind.name)};${escapeCsv(ind.formula)};${escapeCsv(ind.target)};${escapeCsv(ind.frequency)};${escapeCsv(ind.responsible)}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', url);
    downloadAnchor.setAttribute('download', `Caracterizacion_${process.code || 'PR'}_${process.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  };

  const handleSignatureChange = (
    roleKey: keyof ApprovalSignatures,
    field: 'name' | 'role' | 'date' | 'signature',
    value: string
  ) => {
    const currentApprovals = process.approvals || {
      elaboratedBy: { name: '', role: '', date: '' },
      reviewedBy: { name: '', role: '', date: '' },
      approvedBy: { name: '', role: '', date: '' }
    };

    onChange({
      approvals: {
        ...currentApprovals,
        [roleKey]: {
          ...currentApprovals[roleKey],
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top action toolbar (hidden in print) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Ficha Oficial de Caracterización del Proceso</span>
          </h2>
          <p className="text-xs text-slate-500">
            Formato oficial estandarizado según la norma técnica ISO 9001:2015.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleToggleSignatures}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <PenTool className="w-4 h-4 text-slate-600" />
            <span>{editSignatures ? 'Ocultar Firmas' : 'Editar Firmas / Aprobaciones'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span>{copied ? 'Copiado' : 'Copiar Resumen'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Exportar JSON</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold transition"
            title="Exportar tablas SIPOC y Plan de Control a Excel / CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Exportar Excel / CSV</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Descargar PDF</span>
          </button>
        </div>
      </div>

      {/* Editor drawer for Signatures (hidden in print) */}
      {editSignatures && (
        <div className="bg-slate-50 border border-slate-300 rounded-2xl p-5 text-xs space-y-4 print:hidden animate-in fade-in">
          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <PenTool className="w-4 h-4 text-blue-600" />
            <span>Control de Documento y Firmas de Aprobación</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Elaborado por */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                Elaborado por:
              </span>
              <div>
                <label className="text-[10px] text-slate-500">Nombre:</label>
                <input
                  type="text"
                  value={process.approvals?.elaboratedBy?.name || ''}
                  onChange={(e) => handleSignatureChange('elaboratedBy', 'name', e.target.value)}
                  placeholder="Nombre del elaborador"
                  className="w-full p-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Cargo:</label>
                <input
                  type="text"
                  value={process.approvals?.elaboratedBy?.role || ''}
                  onChange={(e) => handleSignatureChange('elaboratedBy', 'role', e.target.value)}
                  placeholder="Cargo del elaborador"
                  className="w-full p-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Fecha:</label>
                <input
                  type="date"
                  value={process.approvals?.elaboratedBy?.date || ''}
                  onChange={(e) => handleSignatureChange('elaboratedBy', 'date', e.target.value)}
                  className="w-full p-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            {/* Revisado por */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                Revisado por:
              </span>
              <div>
                <label className="text-[10px] text-slate-500">Nombre:</label>
                <input
                  type="text"
                  value={process.approvals?.reviewedBy?.name || ''}
                  onChange={(e) => handleSignatureChange('reviewedBy', 'name', e.target.value)}
                  placeholder="Nombre del revisor"
                  className="w-full p-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Cargo:</label>
                <input
                  type="text"
                  value={process.approvals?.reviewedBy?.role || ''}
                  onChange={(e) => handleSignatureChange('reviewedBy', 'role', e.target.value)}
                  placeholder="Cargo del revisor"
                  className="w-full p-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Fecha:</label>
                <input
                  type="date"
                  value={process.approvals?.reviewedBy?.date || ''}
                  onChange={(e) => handleSignatureChange('reviewedBy', 'date', e.target.value)}
                  className="w-full p-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            {/* Aprobado por */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                Aprobado por:
              </span>
              <div>
                <label className="text-[10px] text-slate-500">Nombre:</label>
                <input
                  type="text"
                  value={process.approvals?.approvedBy?.name || ''}
                  onChange={(e) => handleSignatureChange('approvedBy', 'name', e.target.value)}
                  placeholder="Nombre de la alta dirección"
                  className="w-full p-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Cargo:</label>
                <input
                  type="text"
                  value={process.approvals?.approvedBy?.role || ''}
                  onChange={(e) => handleSignatureChange('approvedBy', 'role', e.target.value)}
                  placeholder="Gerencia General"
                  className="w-full p-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Fecha:</label>
                <input
                  type="date"
                  value={process.approvals?.approvedBy?.date || ''}
                  onChange={(e) => handleSignatureChange('approvedBy', 'date', e.target.value)}
                  className="w-full p-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TRAZABILIDAD METODOLÓGICA: CÓMO CADA ETAPA APORTÓ AL RESULTADO */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-5 shadow-md print:hidden space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-500 text-slate-950 rounded-lg font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
                Cadena de Aportes Metodológicos Fase a Fase
              </h3>
              <p className="text-xs text-blue-200">
                Auditoría de consistencia: verificación de cómo cada fase aportó a la ficha oficial final.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            ✓ 100% Integrado y Coherente
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px]">
          <div className="bg-white/5 border border-white/10 p-2 rounded-xl space-y-0.5">
            <span className="text-blue-300 font-bold block">1. Contextos</span>
            <p className="text-slate-300 text-[10px]">Misión, visión y manual de cargos alimentaron la identidad y líder.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-2 rounded-xl space-y-0.5">
            <span className="text-blue-300 font-bold block">2. Identificación</span>
            <p className="text-slate-300 text-[10px]">Categoría y alcance delimitaron objetivo y límites del proceso.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-2 rounded-xl space-y-0.5">
            <span className="text-blue-300 font-bold block">3. Normas</span>
            <p className="text-slate-300 text-[10px]">Marco legal y técnico específico orientó requisitos y controles.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-2 rounded-xl space-y-0.5">
            <span className="text-blue-300 font-bold block">4. Flujograma</span>
            <p className="text-slate-300 text-[10px]">Secuencia gráfica PHVA conectada al mapa de procesos.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-2 rounded-xl space-y-0.5">
            <span className="text-blue-300 font-bold block">5. Mapeo SIPOC</span>
            <p className="text-slate-300 text-[10px]">Entradas, salidas y roles detallados en las 4 fases de Deming.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-2 rounded-xl space-y-0.5">
            <span className="text-emerald-300 font-bold block">6. Ficha Oficial</span>
            <p className="text-slate-300 text-[10px]">Consolidación documental estandarizada según ISO 9001:2015.</p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DOCUMENTO OFICIAL DE CARACTERIZACIÓN (REPLICA EXACTA DE LA IMAGEN) */}
      {/* ============================================================== */}
      <div className="bg-white p-4 sm:p-8 rounded-2xl border-2 border-slate-300 shadow-xl print:border-none print:shadow-none print:p-0 max-w-5xl mx-auto space-y-8 font-sans text-slate-900">
        
        {/* ==================== PÁGINA 1: CARACTERIZACIÓN ==================== */}
        <section className="border border-slate-900 overflow-hidden break-after-page">
          
          {/* Encabezado Superior de la Plantilla */}
          <table className="w-full border-collapse border-b border-slate-900 text-xs">
            <tbody>
              <tr>
                {/* Logo Box */}
                <td className="w-40 sm:w-48 p-3 border-r border-slate-900 text-center align-middle bg-slate-50/50">
                  {orgContext.logoUrl ? (
                    <img src={orgContext.logoUrl} alt="Logo" className="max-h-16 mx-auto object-contain" />
                  ) : (
                    <div className="font-extrabold text-blue-900 text-xs tracking-wider">
                      LOGO DE SU<br />EMPRESA
                    </div>
                  )}
                </td>

                {/* Centro: Nombre Empresa y Proceso */}
                <td className="p-3 text-center align-middle border-r border-slate-900">
                  <div className="font-extrabold text-blue-900 text-base sm:text-lg uppercase tracking-wide">
                    {orgContext.name || 'NOMBRE DE SU EMPRESA'}
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-1">
                    Caracterización del Proceso de: <span className="underline">{process.name}</span>
                  </div>
                </td>

                {/* Derecha: Código, Versión, Página */}
                <td className="w-32 sm:w-36 p-2 text-[11px] align-middle font-mono bg-slate-50/50">
                  <div className="border-b border-slate-300 pb-1">
                    <span className="font-bold">Código:</span> {process.code || 'PR-001'}
                  </div>
                  <div className="border-b border-slate-300 py-1">
                    <span className="font-bold">Versión:</span> {process.version || '01'}
                  </div>
                  <div className="pt-1">
                    <span className="font-bold">Página:</span> {process.pageInfo || '1 de 2'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Bloque Metadatos del Proceso */}
          <div className="text-xs border-b border-slate-900 divide-y divide-slate-900">
            <div className="p-2.5 flex flex-col sm:flex-row gap-1">
              <span className="font-bold text-slate-900 sm:w-48 shrink-0">Objetivo(s) del proceso:</span>
              <span className="text-slate-800 leading-relaxed">{process.objective || 'No especificado'}</span>
            </div>

            <div className="p-2.5 flex flex-col sm:flex-row gap-1">
              <span className="font-bold text-slate-900 sm:w-48 shrink-0">Producto del Proceso:</span>
              <span className="text-slate-800">{process.productOrService || 'No especificado'}</span>
            </div>

            <div className="p-2.5 flex flex-col sm:flex-row gap-1">
              <span className="font-bold text-slate-900 sm:w-48 shrink-0">Alcance:</span>
              <span className="text-slate-800">
                <strong>Desde:</strong> {process.scopeStart || 'Inicio'} — <strong>Hasta:</strong> {process.scopeEnd || 'Fin'}
              </span>
            </div>

            <div className="p-2.5 flex flex-col sm:flex-row gap-1">
              <span className="font-bold text-slate-900 sm:w-48 shrink-0">Responsable y Participantes:</span>
              <span className="text-slate-800">
                <strong>Líder:</strong> {process.leaderRole || 'Líder del Proceso'} | <strong>Participantes:</strong> {process.participants || 'Equipo del proceso'}
              </span>
            </div>

            {/* Normas Técnicas y Legales que Orientan el Proceso */}
            <div className="p-2.5 flex flex-col sm:flex-row gap-1 bg-slate-50/40">
              <span className="font-bold text-slate-900 sm:w-48 shrink-0">Normas y Marco Legal Aplicable:</span>
              <div className="text-slate-800 flex-1">
                {process.legalAndTechnicalNorms && process.legalAndTechnicalNorms.length > 0 ? (
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {process.legalAndTechnicalNorms.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-slate-400 italic">Norma técnica ISO 9001:2015 Sistemas de Gestión de Calidad</span>
                )}
              </div>
            </div>

            {/* Recursos Determinados */}
            <div className="p-2.5 flex flex-col sm:flex-row gap-1">
              <span className="font-bold text-slate-900 sm:w-48 shrink-0">Recursos Determinados (7.1):</span>
              <div className="text-slate-800 flex-1 text-[11px] space-y-1">
                <div>
                  <strong>Talento Humano:</strong> {(process.humanResources && process.humanResources.length > 0) ? process.humanResources.join(' • ') : 'Personal competente asignado al cargo'}
                </div>
                <div>
                  <strong>Tecnología:</strong> {(process.technologicalResources && process.technologicalResources.length > 0) ? process.technologicalResources.join(' • ') : 'Equipos de cómputo y sistemas de gestión'}
                </div>
                <div>
                  <strong>Formatos y Registros:</strong> {(process.requiredFormats && process.requiredFormats.length > 0) ? process.requiredFormats.join(' • ') : 'Formatos controlados del sistema'}
                </div>
              </div>
            </div>
          </div>

          {/* Bloque 3 Columnas: Indicadores, Infraestructura y Dotación, Ambiente de Trabajo */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-900 border-b border-slate-900 text-xs">
            
            {/* Columna 1: Indicadores de gestión */}
            <div className="p-3 space-y-2">
              <div className="font-bold text-slate-900 text-center uppercase tracking-wide border-b border-slate-300 pb-1">
                Indicadores de gestión
              </div>
              <ol className="space-y-1.5 text-[11px] list-decimal list-inside text-slate-800">
                {process.indicators.map((ind, i) => (
                  <li key={ind.id} className="leading-snug">
                    <span className="font-semibold">{ind.name}</span> ({ind.target})
                  </li>
                ))}
                {process.indicators.length === 0 && (
                  <li className="text-slate-400 italic list-none">1) Sin indicadores registrados</li>
                )}
              </ol>
            </div>

            {/* Columna 2: Infraestructura y Dotación */}
            <div className="p-3 space-y-2">
              <div className="font-bold text-slate-900 text-center uppercase tracking-wide border-b border-slate-300 pb-1">
                Infraestructura y Dotación
              </div>
              <ol className="space-y-1.5 text-[11px] list-decimal list-inside text-slate-800">
                {(process.infrastructureAndEquipment || []).map((item, i) => (
                  <li key={i} className="leading-snug">{item}</li>
                ))}
                {(!process.infrastructureAndEquipment || process.infrastructureAndEquipment.length === 0) && (
                  <li className="text-slate-400 italic list-none">1) Equipos y dotación estándar</li>
                )}
              </ol>
            </div>

            {/* Columna 3: Ambiente de Trabajo */}
            <div className="p-3 space-y-2">
              <div className="font-bold text-slate-900 text-center uppercase tracking-wide border-b border-slate-300 pb-1">
                Ambiente de Trabajo
              </div>
              <ol className="space-y-1.5 text-[11px] list-decimal list-inside text-slate-800">
                {(process.workEnvironment || []).map((item, i) => (
                  <li key={i} className="leading-snug">{item}</li>
                ))}
                {(!process.workEnvironment || process.workEnvironment.length === 0) && (
                  <li className="text-slate-400 italic list-none">1) Condiciones de ergonomía y seguridad estándar</li>
                )}
              </ol>
            </div>

          </div>

          {/* SÍNTESIS VISUAL DEL FLUJOGRAMA Y CICLO PHVA DEL PROCESO */}
          <div className="border-b border-slate-900 bg-slate-50/80 p-2.5 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <span className="font-extrabold text-slate-900 uppercase tracking-wide text-[10px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                <span>Diagrama de Flujo del Proceso (Secuencia del Ciclo PHVA - ISO 9001:2015)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {process.activities.length} actividades • 4 fases de mejora continua
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
              {/* PLANEAR */}
              <div className="bg-emerald-50 border border-emerald-300 rounded p-1.5 space-y-0.5">
                <div className="flex items-center justify-between font-bold text-emerald-900 text-[10px]">
                  <span>1. PLANEAR</span>
                  <span className="bg-emerald-200 text-emerald-800 px-1 rounded text-[9px] font-mono">
                    {process.activities.filter(a => a.stage === 'Planear').length} acts
                  </span>
                </div>
                <div className="text-slate-700 truncate text-[10px]" title={process.activities.find(a => a.stage === 'Planear')?.name || 'Planificación operativa'}>
                  {process.activities.find(a => a.stage === 'Planear')?.name || 'Planificación de recursos y metas'}
                </div>
              </div>

              {/* HACER */}
              <div className="bg-blue-50 border border-blue-300 rounded p-1.5 space-y-0.5">
                <div className="flex items-center justify-between font-bold text-blue-900 text-[10px]">
                  <span>2. HACER</span>
                  <span className="bg-blue-200 text-blue-800 px-1 rounded text-[9px] font-mono">
                    {process.activities.filter(a => a.stage === 'Hacer').length} acts
                  </span>
                </div>
                <div className="text-slate-700 truncate text-[10px]" title={process.activities.find(a => a.stage === 'Hacer')?.name || 'Ejecución y transformación'}>
                  {process.activities.find(a => a.stage === 'Hacer')?.name || 'Ejecución y prestación del servicio'}
                </div>
              </div>

              {/* VERIFICAR */}
              <div className="bg-amber-50 border border-amber-300 rounded p-1.5 space-y-0.5">
                <div className="flex items-center justify-between font-bold text-amber-900 text-[10px]">
                  <span>3. VERIFICAR</span>
                  <span className="bg-amber-200 text-amber-800 px-1 rounded text-[9px] font-mono">
                    {process.activities.filter(a => a.stage === 'Verificar').length} acts
                  </span>
                </div>
                <div className="text-slate-700 truncate text-[10px]" title={process.activities.find(a => a.stage === 'Verificar')?.name || 'Control y medición'}>
                  {process.activities.find(a => a.stage === 'Verificar')?.name || 'Medición de indicadores y control'}
                </div>
              </div>

              {/* ACTUAR */}
              <div className="bg-purple-50 border border-purple-300 rounded p-1.5 space-y-0.5">
                <div className="flex items-center justify-between font-bold text-purple-900 text-[10px]">
                  <span>4. ACTUAR</span>
                  <span className="bg-purple-200 text-purple-800 px-1 rounded text-[9px] font-mono">
                    {process.activities.filter(a => a.stage === 'Actuar').length} acts
                  </span>
                </div>
                <div className="text-slate-700 truncate text-[10px]" title={process.activities.find(a => a.stage === 'Actuar')?.name || 'Mejora continua'}>
                  {process.activities.find(a => a.stage === 'Actuar')?.name || 'Acciones de mejora y estandarización'}
                </div>
              </div>
            </div>
          </div>

          {/* Tabla SIPOC de Actividades Oficial */}
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-100 font-bold text-slate-900 text-center uppercase tracking-wider">
                <th className="p-2 border-r border-slate-900 w-36">Procesos Proveedores</th>
                <th className="p-2 border-r border-slate-900 w-40">Entradas</th>
                <th className="p-2 border-r border-slate-900">Actividades</th>
                <th className="p-2 border-r border-slate-900 w-40">Resultados - Salidas</th>
                <th className="p-2 w-36">Procesos Clientes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {(process.activities || []).map((act, index) => (
                <tr key={act.id} className="align-top">
                  <td className="p-2 border-r border-slate-900 text-slate-800">
                    {act.supplier}
                  </td>
                  <td className="p-2 border-r border-slate-900 text-slate-800">
                    {act.inputs}
                  </td>
                  <td className="p-2 border-r border-slate-900 text-slate-900">
                    <span className="font-bold">{index + 1}. Actividad #{index + 1} ({act.stage}):</span>{' '}
                    {act.name}
                  </td>
                  <td className="p-2 border-r border-slate-900 text-slate-800">
                    {act.outputs}
                  </td>
                  <td className="p-2 text-slate-800">
                    {act.customer}
                  </td>
                </tr>
              ))}
              {(!process.activities || process.activities.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400 italic">
                    Sin actividades registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </section>

        {/* ==================== PÁGINA 2: PLAN DE SEGUIMIENTO Y MEDICIÓN ==================== */}
        <section className="border border-slate-900 overflow-hidden">
          
          {/* Encabezado Superior de la Página 2 */}
          <table className="w-full border-collapse border-b border-slate-900 text-xs">
            <tbody>
              <tr>
                <td className="w-40 sm:w-48 p-2.5 border-r border-slate-900 text-center align-middle bg-slate-50/50">
                  {orgContext.logoUrl ? (
                    <img src={orgContext.logoUrl} alt="Logo" className="max-h-12 mx-auto object-contain" />
                  ) : (
                    <div className="font-extrabold text-blue-900 text-xs tracking-wider">
                      LOGO DE SU<br />EMPRESA
                    </div>
                  )}
                </td>
                <td className="p-2.5 text-center align-middle border-r border-slate-900">
                  <div className="font-extrabold text-blue-900 text-sm sm:text-base uppercase tracking-wide">
                    {orgContext.name || 'NOMBRE DE SU EMPRESA'}
                  </div>
                </td>
                <td className="w-32 sm:w-36 p-2 text-[11px] align-middle font-mono bg-slate-50/50">
                  <div><span className="font-bold">Código:</span> {process.code || 'PR-001'}</div>
                  <div><span className="font-bold">Versión:</span> {process.version || '01'}</div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Gran Título del Bloque */}
          <div className="bg-blue-900 text-white font-extrabold text-center py-2 px-3 text-xs sm:text-sm uppercase tracking-wider border-b border-slate-900">
            PLAN DE SEGUIMIENTO Y MEDICIÓN
          </div>

          {/* Tabla de Seguimiento y Medición Exacta a la Foto */}
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-100 font-bold text-slate-900 text-center uppercase tracking-wider">
                <th className="p-2 border-r border-slate-900 w-28">Actividad</th>
                <th className="p-2 border-r border-slate-900 w-32">Variable a Controlar</th>
                <th className="p-2 border-r border-slate-900 w-36">Especificación del Control</th>
                <th className="p-2 border-r border-slate-900 w-36">Criterios de Aceptación o Rechazo</th>
                <th className="p-2 border-r border-slate-900 w-28">Quién Inspecciona</th>
                <th className="p-2 border-r border-slate-900 w-32">Registro de Inspección</th>
                <th className="p-2 min-w-[150px]">¿Qué hago si no cumple?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {(process.measurementPlan || []).map((ctrl, idx) => (
                <tr key={ctrl.id} className="align-top">
                  <td className="p-2 border-r border-slate-900 font-semibold text-slate-900">
                    Actividad #{idx + 1}
                    <div className="text-[10px] text-slate-500 font-normal">{ctrl.activityName}</div>
                  </td>
                  <td className="p-2 border-r border-slate-900 text-slate-800">
                    {ctrl.variableToControl}
                  </td>
                  <td className="p-2 border-r border-slate-900 text-slate-800">
                    {ctrl.specification}
                  </td>
                  <td className="p-2 border-r border-slate-900 text-slate-800">
                    {ctrl.acceptanceCriteria}
                  </td>
                  <td className="p-2 border-r border-slate-900 text-slate-800">
                    {ctrl.inspectorRole}
                  </td>
                  <td className="p-2 border-r border-slate-900 text-slate-800 font-mono text-[10px]">
                    {ctrl.inspectionRecord}
                  </td>
                  <td className="p-2 text-slate-800">
                    {ctrl.contingencyAction}
                  </td>
                </tr>
              ))}
              {(!process.measurementPlan || process.measurementPlan.length === 0) && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400 italic">
                    Sin parámetros de control registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Bloque de Firmas y Aprobaciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-900 border-t border-slate-900 text-xs">
            
            {/* Elaborado por */}
            <div className="p-3 space-y-1.5 bg-slate-50/30">
              <div className="font-bold text-slate-900">
                Elaborado por: <span className="font-normal">{process.approvals?.elaboratedBy?.name || '___________________'}</span>
              </div>
              <div className="font-bold text-slate-900">
                Cargo: <span className="font-normal">{process.approvals?.elaboratedBy?.role || process.leaderRole || 'Líder del Proceso'}</span>
              </div>
              <div className="font-bold text-slate-900">
                Fecha de Elaboración: <span className="font-normal font-mono">{process.approvals?.elaboratedBy?.date || '____-__-__'}</span>
              </div>
              <div className="pt-3 font-bold text-slate-900">
                Firma: <span className="font-serif italic font-normal text-blue-950">{process.approvals?.elaboratedBy?.signature || process.approvals?.elaboratedBy?.name || '___________________'}</span>
              </div>
            </div>

            {/* Revisado por */}
            <div className="p-3 space-y-1.5 bg-slate-50/30">
              <div className="font-bold text-slate-900">
                Revisado por: <span className="font-normal">{process.approvals?.reviewedBy?.name || '___________________'}</span>
              </div>
              <div className="font-bold text-slate-900">
                Cargo: <span className="font-normal">{process.approvals?.reviewedBy?.role || 'Director Aseguramiento de Calidad'}</span>
              </div>
              <div className="font-bold text-slate-900">
                Fecha Revisión: <span className="font-normal font-mono">{process.approvals?.reviewedBy?.date || '____-__-__'}</span>
              </div>
              <div className="pt-3 font-bold text-slate-900">
                Firma: <span className="font-serif italic font-normal text-blue-950">{process.approvals?.reviewedBy?.signature || process.approvals?.reviewedBy?.name || '___________________'}</span>
              </div>
            </div>

            {/* Aprobado por */}
            <div className="p-3 space-y-1.5 bg-slate-50/30">
              <div className="font-bold text-slate-900">
                Aprobado por: <span className="font-normal">{process.approvals?.approvedBy?.name || orgContext.representativeName || '___________________'}</span>
              </div>
              <div className="font-bold text-slate-900">
                Cargo: <span className="font-normal">{process.approvals?.approvedBy?.role || 'Gerencia General'}</span>
              </div>
              <div className="font-bold text-slate-900">
                Fecha de Aprobación: <span className="font-normal font-mono">{process.approvals?.approvedBy?.date || '____-__-__'}</span>
              </div>
              <div className="pt-3 font-bold text-slate-900">
                Firma: <span className="font-serif italic font-normal text-blue-950">{process.approvals?.approvedBy?.signature || process.approvals?.approvedBy?.name || '___________________'}</span>
              </div>
            </div>

          </div>

        </section>

      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 print:hidden">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Seguimiento y Control</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Ficha Oficial</span>
        </button>
      </div>

    </div>
  );
};
