import { OrgContext, ProcessCharacterization, JobPosition } from '../types/process';
import { DEFAULT_ORG_CONTEXT, PROCESS_TEMPLATES, DEFAULT_JOB_POSITIONS } from '../data/templates';

const ORG_STORAGE_KEY = 'gp_org_context_v1';
const PROCESSES_STORAGE_KEY = 'gp_processes_list_v1';
const ACTIVE_PROCESS_ID_KEY = 'gp_active_process_id_v1';
const JOB_POSITIONS_STORAGE_KEY = 'gp_job_positions_v1';

export function getStoredJobPositions(): JobPosition[] {
  try {
    const raw = localStorage.getItem(JOB_POSITIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading job positions from storage', e);
  }
  return DEFAULT_JOB_POSITIONS;
}

export function saveStoredJobPositions(list: JobPosition[]): void {
  try {
    localStorage.setItem(JOB_POSITIONS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving job positions to storage', e);
  }
}

export function getStoredOrgContext(): OrgContext {
  try {
    const raw = localStorage.getItem(ORG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const isLegacyVision = !parsed.vision || 
        parsed.vision.startsWith('Ser reconocidos para el año') || 
        parsed.vision.startsWith('Ser la empresa líder');
      const isLegacyMission = !parsed.mission ||
        parsed.mission.startsWith('Proveer soluciones integrales');

      return {
        ...DEFAULT_ORG_CONTEXT,
        ...parsed,
        mission: isLegacyMission ? DEFAULT_ORG_CONTEXT.mission : parsed.mission,
        vision: isLegacyVision ? DEFAULT_ORG_CONTEXT.vision : parsed.vision,
        missionComponents: {
          ...DEFAULT_ORG_CONTEXT.missionComponents,
          ...(parsed.missionComponents || {})
        },
        visionComponents: {
          ...DEFAULT_ORG_CONTEXT.visionComponents,
          ...(parsed.visionComponents || {})
        }
      };
    }
  } catch (e) {
    console.error('Error loading org context from storage', e);
  }
  return DEFAULT_ORG_CONTEXT;
}

export function saveStoredOrgContext(ctx: OrgContext): void {
  try {
    localStorage.setItem(ORG_STORAGE_KEY, JSON.stringify(ctx));
  } catch (e) {
    console.error('Error saving org context to storage', e);
  }
}

export function getStoredProcesses(): ProcessCharacterization[] {
  try {
    const raw = localStorage.getItem(PROCESSES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading processes from storage', e);
  }
  return PROCESS_TEMPLATES;
}

export function saveStoredProcesses(list: ProcessCharacterization[]): void {
  try {
    localStorage.setItem(PROCESSES_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving processes to storage', e);
  }
}

export function getStoredActiveProcessId(): string {
  try {
    const raw = localStorage.getItem(ACTIVE_PROCESS_ID_KEY);
    if (raw) {
      return raw;
    }
  } catch (e) {
    console.error('Error reading active process id', e);
  }
  return PROCESS_TEMPLATES[0]?.id || '';
}

export function saveStoredActiveProcessId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_PROCESS_ID_KEY, id);
  } catch (e) {
    console.error('Error saving active process id', e);
  }
}

export function createEmptyProcess(name = 'Nuevo Proceso'): ProcessCharacterization {
  const timestamp = Date.now();
  const dateStr = new Date().toISOString().split('T')[0];
  
  return {
    id: `proc-${timestamp}`,
    code: 'PR-XX-001',
    version: '01',
    pageInfo: '1 de 1',
    name,
    category: 'Misional',
    leaderRole: '',
    participants: '',
    objective: '',
    productOrService: '',
    scopeStart: '',
    scopeEnd: '',
    legalAndTechnicalNorms: [
      'ISO 9001:2015 Sistemas de Gestión de la Calidad'
    ],
    technologicalResources: [],
    informationResources: [],
    humanResources: [],
    requiredFormats: [],
    indicators: [
      {
        id: `ind-${timestamp}-1`,
        name: 'Cumplimiento de Objetivos del Proceso',
        formula: '(Actividades realizadas a tiempo / Total actividades programadas) * 100',
        target: '≥ 90%',
        frequency: 'Mensual',
        responsible: 'Líder del Proceso'
      }
    ],
    infrastructureAndEquipment: [],
    workEnvironment: [],
    activities: [
      {
        id: `act-${timestamp}-1`,
        number: 1,
        stage: 'Planear',
        name: 'Planificar recursos, requisitos y cronograma del proceso',
        supplier: 'Dirección Estratégica',
        inputs: 'Objetivos, metas y solicitudes de partes interesadas',
        outputs: 'Plan operativo aprobado',
        customer: 'Equipo de ejecución del proceso',
        responsibleRole: 'Líder del Proceso'
      },
      {
        id: `act-${timestamp}-2`,
        number: 2,
        stage: 'Hacer',
        name: 'Ejecutar las operaciones y actividades principales del proceso',
        supplier: 'Equipo de ejecución',
        inputs: 'Plan operativo y recursos asignados',
        outputs: 'Producto o servicio obtenido y registros operativos',
        customer: 'Cliente interno o externo',
        responsibleRole: 'Equipo Operativo'
      },
      {
        id: `act-${timestamp}-3`,
        number: 3,
        stage: 'Verificar',
        name: 'Verificar resultados, evaluar indicadores e inspeccionar conformidad',
        supplier: 'Equipo Operativo',
        inputs: 'Registros de ejecución y productos generados',
        outputs: 'Informe de seguimiento y medición de indicadores',
        customer: 'Comité de Calidad / Líder del Proceso',
        responsibleRole: 'Líder del Proceso'
      },
      {
        id: `act-${timestamp}-4`,
        number: 4,
        stage: 'Actuar',
        name: 'Implementar mejoras, acciones correctivas y estandarización',
        supplier: 'Comité de Calidad',
        inputs: 'Informe de seguimiento y hallazgos',
        outputs: 'Planes de mejora ejecutados y documentos actualizados',
        customer: 'Todos los involucrados en el proceso',
        responsibleRole: 'Líder del Proceso'
      }
    ],
    measurementPlan: [
      {
        id: `ctrl-${timestamp}-1`,
        activityName: 'Ejecución de actividades principales',
        variableToControl: 'Conformidad con especificaciones y oportunidad',
        specification: '100% de cumplimiento de especificaciones requeridas',
        acceptanceCriteria: 'Aprobación sin no conformidades críticas',
        inspectorRole: 'Líder del Proceso / Inspector',
        inspectionRecord: 'Lista de verificación / Registro de control',
        contingencyAction: 'Revisión técnica, reproceso o acción correctiva inmediata'
      }
    ],
    approvals: {
      elaboratedBy: { name: '', role: 'Líder del Proceso', date: dateStr, signature: '' },
      reviewedBy: { name: '', role: 'Coordinador SGI / Calidad', date: dateStr, signature: '' },
      approvedBy: { name: '', role: 'Gerente General', date: dateStr, signature: '' }
    },
    createdAt: dateStr,
    updatedAt: dateStr
  };
}
