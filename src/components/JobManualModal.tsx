import React, { useState } from 'react';
import { 
  Briefcase, 
  X, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  Sparkles, 
  Search, 
  ArrowRight, 
  FileText, 
  Building2, 
  GraduationCap, 
  Award, 
  Layers, 
  Download, 
  Printer, 
  UserCheck,
  FolderGit2
} from 'lucide-react';
import { JobPosition, ProcessCategory, ProcessCharacterization } from '../types/process';
import { PROCESS_CATEGORIES } from '../data/templates';

interface JobManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobPositions: JobPosition[];
  onSaveJobPositions: (updated: JobPosition[]) => void;
  activeProcess: ProcessCharacterization;
  onFeedProcessFromJob: (job: JobPosition, mode: 'create_new' | 'update_active') => void;
}

export const JobManualModal: React.FC<JobManualModalProps> = ({
  isOpen,
  onClose,
  jobPositions,
  onSaveJobPositions,
  activeProcess,
  onFeedProcessFromJob
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'All' | ProcessCategory>('All');
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [feedNotification, setFeedNotification] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<JobPosition>>({
    code: '',
    title: '',
    department: '',
    reportsTo: '',
    associatedProcessCategory: 'Apoyo',
    associatedProcessName: '',
    roleType: 'Líder de Proceso',
    objective: '',
    education: '',
    experience: '',
    responsibilities: [],
    competencies: []
  });

  const [newResp, setNewResp] = useState('');
  const [newComp, setNewComp] = useState('');

  if (!isOpen) return null;

  const handleOpenAddForm = () => {
    setEditingJobId(null);
    setFormData({
      code: `CAR-${Math.floor(100 + Math.random() * 900)}`,
      title: '',
      department: '',
      reportsTo: 'Gerencia General',
      associatedProcessCategory: activeProcess.category || 'Misional',
      associatedProcessName: activeProcess.name || '',
      roleType: 'Líder de Proceso',
      objective: '',
      education: '',
      experience: '',
      responsibilities: [],
      competencies: []
    });
    setShowForm(true);
  };

  const handleOpenEditForm = (job: JobPosition) => {
    setEditingJobId(job.id);
    setFormData({ ...job });
    setShowForm(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    if (editingJobId) {
      const updated = jobPositions.map(j => 
        j.id === editingJobId ? ({ ...j, ...formData } as JobPosition) : j
      );
      onSaveJobPositions(updated);
    } else {
      const newJob: JobPosition = {
        id: `cargo-${Date.now()}`,
        code: formData.code?.trim() || `CAR-${jobPositions.length + 1}`,
        title: formData.title.trim(),
        department: formData.department?.trim() || 'Operaciones',
        reportsTo: formData.reportsTo?.trim() || 'Gerencia General',
        associatedProcessCategory: formData.associatedProcessCategory || 'Misional',
        associatedProcessName: formData.associatedProcessName?.trim() || 'Proceso Operativo',
        roleType: formData.roleType || 'Líder de Proceso',
        objective: formData.objective?.trim() || '',
        education: formData.education?.trim() || 'Profesional universitario',
        experience: formData.experience?.trim() || 'Mínimo 2 años',
        responsibilities: formData.responsibilities || [],
        competencies: formData.competencies || []
      };
      onSaveJobPositions([...jobPositions, newJob]);
    }

    setShowForm(false);
  };

  const handleDeleteJob = (id: string) => {
    onSaveJobPositions(jobPositions.filter(j => j.id !== id));
  };

  const handleAddResponsibility = () => {
    if (!newResp.trim()) return;
    setFormData(prev => ({
      ...prev,
      responsibilities: [...(prev.responsibilities || []), newResp.trim()]
    }));
    setNewResp('');
  };

  const handleRemoveResponsibility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: (prev.responsibilities || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddCompetency = () => {
    if (!newComp.trim()) return;
    setFormData(prev => ({
      ...prev,
      competencies: [...(prev.competencies || []), newComp.trim()]
    }));
    setNewComp('');
  };

  const handleRemoveCompetency = (index: number) => {
    setFormData(prev => ({
      ...prev,
      competencies: (prev.competencies || []).filter((_, i) => i !== index)
    }));
  };

  const triggerFeed = (job: JobPosition, mode: 'create_new' | 'update_active') => {
    onFeedProcessFromJob(job, mode);
    setFeedNotification(
      mode === 'create_new'
        ? `¡Nuevo proceso "${job.associatedProcessName || job.title}" generado y añadido al Mapa de Procesos!`
        : `¡Proceso activo alimentado con el cargo "${job.title}" y sus responsabilidades!`
    );
    setTimeout(() => {
      setFeedNotification(null);
    }, 4000);
  };

  // Filtered list
  const filteredJobs = jobPositions.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.associatedProcessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategoryFilter === 'All' || job.associatedProcessCategory === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 text-blue-300 rounded-xl">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Manual de Funciones y Perfiles del Cargo</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  Fuente de Alimentación de Procesos
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Alimenta el Mapa de Procesos definiendo roles, responsabilidades clave y competencias (o interviene de forma directa)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAddForm}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Cargo</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert if process was fed */}
        {feedNotification && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-900 font-semibold flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{feedNotification}</span>
            </div>
            <button onClick={() => setFeedNotification(null)} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Search, Filters and Explanatory Toolbar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por cargo, área o proceso asociado..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 bg-white p-0.5 border border-slate-200 rounded-lg">
              <button
                onClick={() => setSelectedCategoryFilter('All')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                  selectedCategoryFilter === 'All' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos ({jobPositions.length})
              </button>
              {PROCESS_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                    selectedCategoryFilter === cat ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Haz clic en <strong>Alimentar</strong> para transferir las funciones al proceso.</span>
          </div>

        </div>

        {/* Content Body: Form OR Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {showForm ? (
            /* Create / Edit Form */
            <form onSubmit={handleSaveForm} className="bg-slate-50 border border-slate-300 rounded-2xl p-5 space-y-5 text-xs animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>{editingJobId ? 'Editar Perfil y Funciones del Cargo' : 'Registrar Nuevo Perfil de Cargo'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Cancelar
                </button>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Código del Cargo *</label>
                  <input
                    type="text"
                    required
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Ej: CAR-AB-001"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Nombre / Título del Cargo *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ej: Jefe de Compras y Suministros"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Tipo de Rol en el Proceso</label>
                  <select
                    value={formData.roleType}
                    onChange={(e) => setFormData({ ...formData, roleType: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Líder de Proceso">Líder de Proceso (Dueño)</option>
                    <option value="Participante / Operativo">Participante / Operativo</option>
                    <option value="Auditor / Control">Auditor / Control</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Área o Departamento *</label>
                  <input
                    type="text"
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Ej: Abastecimiento y Logística"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Reporta Directamente a</label>
                  <input
                    type="text"
                    value={formData.reportsTo || ''}
                    onChange={(e) => setFormData({ ...formData, reportsTo: e.target.value })}
                    placeholder="Ej: Dirección Financiera / Gerencia"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Categoría del Proceso Asociado</label>
                  <select
                    value={formData.associatedProcessCategory}
                    onChange={(e) => setFormData({ ...formData, associatedProcessCategory: e.target.value as ProcessCategory })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    {PROCESS_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>Proceso {cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Nombre del Proceso Asociado *</label>
                  <input
                    type="text"
                    value={formData.associatedProcessName || ''}
                    onChange={(e) => setFormData({ ...formData, associatedProcessName: e.target.value })}
                    placeholder="Ej: Gestión de Compras y Abastecimiento"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Propósito del cargo */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Propósito / Misión Principal del Cargo</label>
                <textarea
                  rows={2}
                  value={formData.objective || ''}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  placeholder="¿Cuál es el fin esencial del cargo en la organización?"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>

              {/* Perfil: Educación y Experiencia */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                    <span>Educación y Formación Académica Requerida</span>
                  </label>
                  <input
                    type="text"
                    value={formData.education || ''}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="Ej: Profesional en Ingeniería Industrial o Administración"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Experiencia Laboral Requerida</span>
                  </label>
                  <input
                    type="text"
                    value={formData.experience || ''}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Ej: Mínimo 3 años en compras industriales y negociación"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Funciones y Responsabilidades (Alimentan las actividades del proceso) */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-slate-800 uppercase">
                    Funciones y Responsabilidades Clave ({formData.responsibilities?.length || 0})
                  </label>
                  <span className="text-[10px] text-blue-600 font-semibold">
                    * Estas funciones se convierten directamente en actividades del proceso
                  </span>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {(formData.responsibilities || []).map((resp, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded text-xs">
                      <span className="text-slate-800">#{idx + 1} {resp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResponsibility(idx)}
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
                    value={newResp}
                    onChange={(e) => setNewResp(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddResponsibility(); }}}
                    placeholder="Escribir función (Ej: Elaborar cuadro comparativo de ofertas y evaluar cotizaciones)"
                    className="flex-1 px-2.5 py-1 border border-slate-300 rounded text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddResponsibility}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                  >
                    + Agregar Función
                  </button>
                </div>
              </div>

              {/* Competencias */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                <label className="block text-[11px] font-bold text-slate-800 uppercase">
                  Competencias Laborales y Técnicas ({formData.competencies?.length || 0})
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.competencies || []).map((comp, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[11px] text-slate-800">
                      {comp}
                      <button type="button" onClick={() => handleRemoveCompetency(idx)} className="text-slate-400 hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComp}
                    onChange={(e) => setNewComp(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCompetency(); }}}
                    placeholder="Agregar competencia (Ej: Negociación, Pensamiento estratégico)"
                    className="flex-1 px-2.5 py-1 border border-slate-300 rounded text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddCompetency}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold"
                  >
                    + Agregar
                  </button>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold"
                >
                  {editingJobId ? 'Guardar Cambios del Cargo' : 'Registrar Cargo en el Manual'}
                </button>
              </div>
            </form>
          ) : (
            /* Positions Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 hover:border-blue-400 transition shadow-2xs flex flex-col justify-between"
                >
                  {/* Top Header of Card */}
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            {job.code}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                            {job.department}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                            {job.associatedProcessCategory}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">
                          {job.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditForm(job)}
                          className="p-1 text-slate-400 hover:text-blue-600"
                          title="Editar perfil del cargo"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-1 text-slate-400 hover:text-red-600"
                          title="Eliminar cargo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {job.objective || 'Sin propósito especificado.'}
                    </p>

                    <div className="text-[11px] text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div>
                        <strong className="text-slate-700">Proceso Vinculado:</strong> {job.associatedProcessName}
                      </div>
                      <div>
                        <strong className="text-slate-700">Formación:</strong> {job.education}
                      </div>
                      <div>
                        <strong className="text-slate-700">Funciones Clave ({job.responsibilities?.length || 0}):</strong>
                        <ul className="list-disc list-inside text-[10px] text-slate-600 mt-0.5 space-y-0.5">
                          {job.responsibilities?.slice(0, 2).map((r, i) => (
                            <li key={i} className="truncate">{r}</li>
                          ))}
                          {(job.responsibilities?.length || 0) > 2 && (
                            <li className="text-blue-600 font-semibold list-none text-[9px]">
                              + {job.responsibilities.length - 2} funciones más en el manual
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions for feeding Process Map */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => triggerFeed(job, 'update_active')}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-lg text-[11px] font-bold transition"
                      title="Alimentar el proceso activo con el rol de líder, perfiles y actividades de este cargo"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Alimentar Proceso Activo</span>
                    </button>

                    <button
                      onClick={() => triggerFeed(job, 'create_new')}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-bold transition shadow-2xs"
                      title="Generar un nuevo proceso en el Mapa a partir de este cargo"
                    >
                      <FolderGit2 className="w-3.5 h-3.5 text-indigo-300" />
                      <span>Generar en Mapa</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-400 italic">
                  <Briefcase className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="font-semibold">No se encontraron cargos con el criterio de búsqueda.</p>
                  <p className="text-xs mt-1">Haz clic en &quot;Nuevo Cargo&quot; para registrar un perfil de funciones.</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <div className="text-slate-500 text-[11px]">
            Total Cargos en el Manual: <strong>{jobPositions.length}</strong> • Intervención directa del usuario habilitada
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
          >
            Cerrar Manual
          </button>
        </div>

      </div>
    </div>
  );
};
