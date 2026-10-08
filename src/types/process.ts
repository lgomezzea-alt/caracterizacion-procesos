export type ProcessCategory = 'Estratégico' | 'Misional' | 'Apoyo' | 'Evaluación y Control';

export type DemingStage = 'Planear' | 'Hacer' | 'Verificar' | 'Actuar';

export interface OrgContext {
  name: string;
  nit: string;
  slogan: string;
  mission: string;
  vision: string;
  values: string[];
  policies: string[];
  logoUrl?: string;
  representativeName?: string;
  sector?: string;
  missionComponents?: {
    orgName?: string;
    activity?: string;
    targetMarket?: string;
    differentiator?: string;
  };
  visionComponents?: {
    orgName?: string;
    targetYear?: string;
    achievementGoal?: string;
    toolsAndMethods?: string;
    customerImpact?: string;
  };
}

export interface ProcessActivity {
  id: string;
  number: number;
  stage: DemingStage;
  name: string;
  description?: string;
  supplier: string; // Proceso Proveedor
  inputs: string;   // Entradas / Insumos
  outputs: string;  // Resultados / Salidas
  customer: string; // Proceso Cliente
  responsibleRole: string; // Responsable de la actividad
}

export interface ManagementIndicator {
  id: string;
  name: string;
  formula: string;
  target: string;
  frequency: string;
  responsible: string;
}

export interface MeasurementControl {
  id: string;
  activityId?: string;
  activityName: string;
  variableToControl: string;
  specification: string;
  acceptanceCriteria: string;
  inspectorRole: string;
  inspectionRecord: string; // Formato / Registro
  contingencyAction: string; // Qué hago si no cumple?
}

export interface ApprovalSignatures {
  elaboratedBy: { name: string; role: string; date: string; signature?: string };
  reviewedBy: { name: string; role: string; date: string; signature?: string };
  approvedBy: { name: string; role: string; date: string; signature?: string };
}

export interface ProcessCharacterization {
  id: string;
  code: string;
  version: string;
  pageInfo: string;
  name: string;
  category: ProcessCategory;
  leaderRole: string;
  participants: string;
  objective: string;
  productOrService: string;
  scopeStart: string;
  scopeEnd: string;
  
  // Normas y Requisitos
  legalAndTechnicalNorms: string[];
  
  // Recursos requeridos
  technologicalResources: string[];
  informationResources: string[];
  humanResources: string[];
  requiredFormats: string[];
  
  // Indicadores de gestión
  indicators: ManagementIndicator[];
  
  // Infraestructura y Dotación
  infrastructureAndEquipment: string[];
  
  // Ambiente de Trabajo
  workEnvironment: string[];
  
  // Actividades SIPOC / Ciclo Deming
  activities: ProcessActivity[];
  
  // Plan de Seguimiento y Medición
  measurementPlan: MeasurementControl[];
  
  // Aprobaciones
  approvals: ApprovalSignatures;
  
  createdAt: string;
  updatedAt: string;
}

export interface JobPosition {
  id: string;
  code: string;
  title: string; // Nombre del cargo
  department: string; // Área o dependencia
  reportsTo: string; // Cargo al que reporta
  associatedProcessCategory: ProcessCategory; // Categoría en el mapa de procesos
  associatedProcessName: string; // Nombre del proceso que lidera o en el que participa
  roleType: 'Líder de Proceso' | 'Participante / Operativo' | 'Auditor / Control';
  objective: string; // Misión / Propósito principal del cargo
  education: string; // Requisitos de educación y formación académica
  experience: string; // Experiencia requerida
  responsibilities: string[]; // Funciones clave del cargo (alimentan las actividades PHVA)
  competencies: string[]; // Competencias organizacionales y técnicas
}

export interface StepDefinition {
  id: number;
  key: string;
  title: string;
  shortDesc: string;
  iconName: string;
}
