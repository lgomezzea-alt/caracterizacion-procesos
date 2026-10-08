import { OrgContext, ProcessCharacterization, ProcessCategory, JobPosition } from '../types/process';

export const DEFAULT_ORG_CONTEXT: OrgContext = {
  name: 'INDUSTRIAS Y SERVICIOS INTEGRALES S.A.S.',
  nit: '901.458.789-2',
  slogan: 'Calidad, eficiencia y mejora continua al servicio de nuestros clientes',
  mission: 'INDUSTRIAS Y SERVICIOS INTEGRALES S.A.S. es una organización dedicada al diseño, fabricación y suministro de soluciones y bienes industriales de alta confiabilidad, orientada a satisfacer las necesidades de empresas de manufactura, infraestructura y logística a nivel regional y nacional, diferenciándonos de la competencia por procesos certificados ISO 9001, entregas justo a tiempo y acompañamiento técnico postventa especializado.',
  vision: 'Para el año 2030, INDUSTRIAS Y SERVICIOS INTEGRALES S.A.S. habrá cumplido la meta de consolidarse como la empresa líder en productividad y excelencia operativa de soluciones industriales en la región, a través de la estandarización de procesos bajo la norma ISO 9001, innovación tecnológica continua y desarrollo del talento humano, generando en los clientes máxima confiabilidad, reducción de costos operativos y total satisfacción en cada entrega.',
  values: [
    'Compromiso con la excelencia',
    'Integridad y transparencia',
    'Orientación al cliente',
    'Innovación y mejora continua',
    'Seguridad y responsabilidad ambiental'
  ],
  policies: [
    'Política Integrada de Calidad: Comprometidos con satisfacer los requerimientos de las partes interesadas mediante el control sistemático de procesos y la mejora continua.',
    'Política de Seguridad y Salud en el Trabajo: Garantizar condiciones de trabajo seguras y saludables para prevenir lesiones y deterioro de la salud.',
    'Política de Uso Eficiente de Recursos: Optimizar el uso de recursos tecnológicos, físicos y energéticos en toda la cadena de valor.'
  ],
  representativeName: 'Dra. Carolina Méndez Silva',
  sector: 'Manufactura y Servicios Empresariales',
  logoUrl: '',
  missionComponents: {
    orgName: 'INDUSTRIAS Y SERVICIOS INTEGRALES S.A.S.',
    activity: 'Diseño, fabricación y suministro de soluciones y bienes industriales de alta confiabilidad',
    targetMarket: 'Empresas de manufactura, infraestructura y logística a nivel regional y nacional',
    differentiator: 'Procesos certificados ISO 9001, entregas justo a tiempo y acompañamiento técnico postventa especializado'
  },
  visionComponents: {
    orgName: 'INDUSTRIAS Y SERVICIOS INTEGRALES S.A.S.',
    targetYear: '2030',
    achievementGoal: 'consolidarnos como la empresa líder en productividad y excelencia operativa de soluciones industriales en la región',
    toolsAndMethods: 'la estandarización de procesos bajo la norma ISO 9001, innovación tecnológica continua y desarrollo del talento humano',
    customerImpact: 'garantizar máxima confiabilidad, reducción de costos operativos y total satisfacción en cada entrega'
  }
};

export const PROCESS_TEMPLATES: ProcessCharacterization[] = [
  {
    id: 'proc-compras-01',
    code: 'PR-AB-001',
    version: '03',
    pageInfo: '1 de 2',
    name: 'Gestión de Compras y Abastecimiento',
    category: 'Apoyo',
    leaderRole: 'Jefe de Compras y Suministros',
    participants: 'Auxiliar de Compras, Analista de Almacén, Comité de Compras, Proveedores',
    objective: 'Garantizar el suministro oportuno de bienes y servicios requeridos por la organización, cumpliendo los criterios de calidad, costo, especificaciones técnicas y tiempos de entrega acordados.',
    productOrService: 'Bienes, insumos, materias primas y servicios contratados disponibles y verificados para la operación.',
    scopeStart: 'Recepción de la requisición o necesidad de compra debidamente autorizada',
    scopeEnd: 'Entrega conforme de los bienes o servicios al área solicitante e ingreso al sistema de inventarios',
    
    legalAndTechnicalNorms: [
      'ISO 9001:2015 - Numeral 8.4 (Control de los procesos, productos y servicios suministrados externamente)',
      'Estatuto Tributario (Facturación electrónica y requisitos de compra)',
      'Norma Técnica Colombiana NTC-ISO 14001:2015 (Criterios de compras sostenibles)',
      'Código de Comercio vigente en materia de contratos mercantiles'
    ],
    
    technologicalResources: [
      'Software ERP institucional / Módulo de Compras e Inventarios',
      'Plataforma de facturación y portal de proveedores en la nube',
      'Equipos de cómputo con conexión a internet segura y correo corporativo'
    ],
    informationResources: [
      'Catálogo de proveedores homologados y evaluados',
      'Fichas técnicas y especificaciones de materiales',
      'Histórico de cotizaciones, precios de referencia y órdenes de compra'
    ],
    humanResources: [
      'Profesional en Negocios / Administración / Ingeniería Industrial con experiencia en compras',
      'Auxiliar logístico con formación en manejo de inventarios y control de calidad de recepción'
    ],
    requiredFormats: [
      'FOR-AB-01 Requisición de Compras',
      'FOR-AB-02 Cuadro Comparativo de Ofertas',
      'FOR-AB-03 Orden de Compra y Servicio',
      'FOR-AB-04 Evaluación y Reevaluación de Proveedores',
      'FOR-AB-05 Acta de Recepción Técnica'
    ],
    
    indicators: [
      {
        id: 'ind-1',
        name: 'Oportunidad de Entrega de Proveedores (OTD)',
        formula: '(Órdenes de compra entregadas a tiempo / Total órdenes de compra recibidas) * 100',
        target: '≥ 95%',
        frequency: 'Mensual',
        responsible: 'Jefe de Compras'
      },
      {
        id: 'ind-2',
        name: 'Nivel de Conformidad de Compras',
        formula: '(Ítems recibidos sin rechazo / Total de ítems recibidos) * 100',
        target: '≥ 98%',
        frequency: 'Mensual',
        responsible: 'Analista de Almacén'
      },
      {
        id: 'ind-3',
        name: 'Tiempo Medio de Ciclo de Compra',
        formula: 'Promedio de días desde la requisición aprobada hasta la emisión de la orden de compra',
        target: '≤ 3 días hábiles',
        frequency: 'Bimestral',
        responsible: 'Jefe de Compras'
      }
    ],
    
    infrastructureAndEquipment: [
      'Oficina administrativa con mobiliario ergonómico e iluminación adecuada',
      'Zona techada de descargue, inspección y recepción técnica de mercancía',
      'Estanterías industriales y equipos de pesaje / calibración para verificación'
    ],
    
    workEnvironment: [
      'Ambiente climatizado en área administrativa (21°C - 24°C)',
      'Niveles de ruido inferiores a 65 dB en áreas de negociación',
      'Uso obligatorio de Elementos de Protección Personal (EPP: botas de seguridad, casco, chaleco) en zona de recepción y bodegas'
    ],
    
    activities: [
      {
        id: 'act-1',
        number: 1,
        stage: 'Planear',
        name: 'Consolidar y planificar el plan anual y mensual de compras y evaluar proveedores.',
        description: 'Revisar las necesidades presupuestadas y las listas de proveedores calificados para el período.',
        supplier: 'Todos los procesos organizacionales / Dirección Financiera',
        inputs: 'Requisiciones de compras autorizadas, Plan de presupuesto anual, Fichas técnicas',
        outputs: 'Plan maestro de compras aprobado y directorio de proveedores calificados',
        customer: 'Área de Compras y Suministros / Tesorería',
        responsibleRole: 'Jefe de Compras'
      },
      {
        id: 'act-2',
        number: 2,
        stage: 'Hacer',
        name: 'Solicitar cotizaciones y elaborar cuadro comparativo de ofertas.',
        description: 'Contactar un mínimo de tres proveedores homologados para solicitar propuestas técnico-económicas.',
        supplier: 'Proveedores externos seleccionados',
        inputs: 'Especificaciones técnicas detalladas y solicitudes de cotización emitidas',
        outputs: 'Cuadro comparativo de ofertas con concepto técnico y económico',
        customer: 'Comité de Compras / Jefe de Área solicitante',
        responsibleRole: 'Auxiliar de Compras'
      },
      {
        id: 'act-3',
        number: 3,
        stage: 'Hacer',
        name: 'Emitir y notificar la Orden de Compra o Contrato al proveedor adjudicado.',
        description: 'Formalizar el pedido en el ERP con condiciones de pago, fechas de entrega y garantías.',
        supplier: 'Comité de Compras / Aprobador Financiero',
        inputs: 'Cuadro comparativo aprobado y disponibilidad presupuestal',
        outputs: 'Orden de Compra oficial enviada y confirmada con acuse de recibo',
        customer: 'Proveedor adjudicado y Proceso Contable',
        responsibleRole: 'Jefe de Compras'
      },
      {
        id: 'act-4',
        number: 4,
        stage: 'Hacer',
        name: 'Efectuar la recepción física y técnica de los insumos o servicios.',
        description: 'Inspeccionar contra la orden de compra y ficha técnica las cantidades y calidad de lo entregado.',
        supplier: 'Proveedor externo / Transportador',
        inputs: 'Bienes entregados, factura comercial / remisión, Orden de Compra física/digital',
        outputs: 'Acta de recepción a satisfacción y registro de ingreso a bodega en ERP',
        customer: 'Área solicitante / Proceso de Almacén / Contabilidad',
        responsibleRole: 'Analista de Almacén'
      },
      {
        id: 'act-5',
        number: 5,
        stage: 'Verificar',
        name: 'Auditar el cumplimiento de tiempos, calidad y cálculo de indicadores de gestión.',
        description: 'Monitorear periódicamente los indicadores OTD, rechazos y evaluar el desempeño de proveedores.',
        supplier: 'Proceso de Almacén e Inventarios / Usuarios solicitantes',
        inputs: 'Remisiones cumplidas, facturas, registros de no conformidades de entrega',
        outputs: 'Informe mensual de gestión de compras y reporte de evaluación de proveedores',
        customer: 'Comité de Calidad / Gerencia General',
        responsibleRole: 'Jefe de Compras'
      },
      {
        id: 'act-6',
        number: 6,
        stage: 'Actuar',
        name: 'Formular e implementar planes de acción correctiva y retroalimentación a proveedores.',
        description: 'Definir acciones de mejora ante desvíos en entregas o defectos y actualizar el catálogo de proveedores.',
        supplier: 'Comité de Calidad / Auditorías Internas',
        inputs: 'Resultados de auditoría, quejas del solicitante, indicadores fuera de meta',
        outputs: 'Planes de acción correctiva ejecutados, lecciones aprendidas y renegociación de condiciones',
        customer: 'Todos los procesos de la empresa / Proveedores',
        responsibleRole: 'Líder del Proceso de Compras'
      }
    ],
    
    measurementPlan: [
      {
        id: 'ctrl-1',
        activityName: 'Recepción técnica de insumos',
        variableToControl: 'Conformidad física y dimensional de especificaciones de compra',
        specification: '100% de coincidencia con la ficha técnica y orden de compra',
        acceptanceCriteria: 'Cero daños visibles, empaque sellado, lote y fecha vigentes',
        inspectorRole: 'Analista de Almacén y Control de Calidad',
        inspectionRecord: 'FOR-AB-05 Acta de Recepción Técnica de Materiales',
        contingencyAction: 'Rechazar entrega, generar reporte de no conformidad e iniciar reposición inmediata con el proveedor'
      },
      {
        id: 'ctrl-2',
        activityName: 'Emisión de Orden de Compra',
        variableToControl: 'Aprobación presupuestal y firmas autorizadas',
        specification: 'Monto dentro del presupuesto autorizado y cotización seleccionada',
        acceptanceCriteria: 'Firma electrónica o física del Director Financiero en el ERP',
        inspectorRole: 'Jefe de Compras',
        inspectionRecord: 'FOR-AB-03 Orden de Compra emitida en ERP',
        contingencyAction: 'Detener trámite y solicitar reajuste presupuestal o justificación a la gerencia'
      },
      {
        id: 'ctrl-3',
        activityName: 'Evaluación periódica de proveedores',
        variableToControl: 'Puntaje global de desempeño del proveedor',
        specification: 'Calificación acumulada mínima de 80 sobre 100 puntos',
        acceptanceCriteria: 'Puntaje ≥ 80 pts: Proveedor Confiable',
        inspectorRole: 'Líder de Compras y SGI',
        inspectionRecord: 'FOR-AB-04 Matriz de Evaluación de Proveedores',
        contingencyAction: 'Suspender del catálogo o solicitar plan de contingencia con plazo perentorio de 15 días'
      }
    ],
    
    approvals: {
      elaboratedBy: {
        name: 'Ing. Carlos Alberto Rivas',
        role: 'Líder de Gestión de Compras',
        date: '2026-03-15',
        signature: 'Carlos A. Rivas'
      },
      reviewedBy: {
        name: 'Dra. Marcela Gómez Peña',
        role: 'Directora de Aseguramiento de la Calidad (SGI)',
        date: '2026-03-18',
        signature: 'Marcela Gómez P.'
      },
      approvedBy: {
        name: 'Dra. Carolina Méndez Silva',
        role: 'Gerente General',
        date: '2026-03-20',
        signature: 'Carolina Méndez S.'
      }
    },
    
    createdAt: '2026-03-15',
    updatedAt: '2026-10-01'
  },
  {
    id: 'proc-talento-02',
    code: 'PR-TH-001',
    version: '02',
    pageInfo: '1 de 2',
    name: 'Gestión del Talento Humano',
    category: 'Apoyo',
    leaderRole: 'Director de Talento Humano',
    participants: 'Psicólogo de Selección, Coordinador de SST, Analista de Nómina, Jefes de Área',
    objective: 'Atraer, desarrollar, retener y motivar el personal idóneo para la organización, garantizando un ambiente laboral seguro y el cumplimiento de las competencias requeridas por los procesos.',
    productOrService: 'Personal competente, motivado, capacitado y vinculado formalmente a la organización.',
    scopeStart: 'Identificación de la vacante o necesidad de capacitación del personal',
    scopeEnd: 'Evaluación del desempeño, bienestar continuo y desvinculación formal del colaborador',
    legalAndTechnicalNorms: [
      'ISO 9001:2015 - Numeral 7.1.2 (Personas) y Numeral 7.2 (Competencia)',
      'Código Sustantivo del Trabajo y legislación laboral vigente',
      'Resolución 0312 de 2019 / Estándares Mínimos del SG-SST',
      'Ley 1581 de 2012 (Protección de datos personales de empleados)'
    ],
    technologicalResources: [
      'Software de gestión de nómina y talento humano',
      'Plataforma e-learning para capacitaciones virtuales',
      'Bolsas de empleo digitales y pruebas psicométricas online'
    ],
    informationResources: [
      'Manual de funciones y perfiles de cargo',
      'Hojas de vida y expedientes laborales de los trabajadores',
      'Plan anual de capacitación y bienestar laboral'
    ],
    humanResources: [
      'Profesional en Psicología Organizacional / Administración de Empresas',
      'Especialista en Seguridad y Salud en el Trabajo'
    ],
    requiredFormats: [
      'FOR-TH-01 Perfil y Descripción de Cargo',
      'FOR-TH-02 Requisición de Personal',
      'FOR-TH-03 Plan de Inducción y Entrenamiento',
      'FOR-TH-04 Evaluación de Desempeño',
      'FOR-TH-05 Registro de Asistencia y Eficacia de Capacitación'
    ],
    indicators: [
      {
        id: 'ind-th-1',
        name: 'Eficacia de las Capacitaciones',
        formula: '(Colaboradores con evaluación aprobada post-capacitación / Total capacitados) * 100',
        target: '≥ 90%',
        frequency: 'Trimestral',
        responsible: 'Director de Talento Humano'
      },
      {
        id: 'ind-th-2',
        name: 'Índice de Rotación de Personal',
        formula: '((Bajas voluntarias e involuntarias / Promedio total de colaboradores)) * 100',
        target: '≤ 3% mensual',
        frequency: 'Mensual',
        responsible: 'Director de Talento Humano'
      }
    ],
    infrastructureAndEquipment: [
      'Sala de entrevistas y pruebas psicotécnicas',
      'Aula de capacitación dotada con proyector y sonido',
      'Archivador seguro para historias laborales'
    ],
    workEnvironment: [
      'Espacio con privacidad acústica para entrevistas y evaluaciones',
      'Iluminación natural adecuada y ventilación en áreas de trabajo',
      'Programa de pausas activas y control de riesgo psicosocial'
    ],
    activities: [
      {
        id: 'act-th-1',
        number: 1,
        stage: 'Planear',
        name: 'Planificar las necesidades de personal y el plan anual de capacitación y bienestar.',
        description: 'Diagnosticar brechas de competencias y planear presupuesto de talento humano.',
        supplier: 'Dirección General / Todas las áreas',
        inputs: 'Estructura organizacional, evaluaciones de desempeño previas, presupuesto',
        outputs: 'Plan anual de capacitación, plan de bienestar y cronograma de SST aprobados',
        customer: 'Toda la organización',
        responsibleRole: 'Director de Talento Humano'
      },
      {
        id: 'act-th-2',
        number: 2,
        stage: 'Hacer',
        name: 'Reclutar, seleccionar, contratar e inducir al personal idóneo.',
        description: 'Aplicar pruebas, verificar referencias, exámenes médicos de ingreso y formalizar contrato.',
        supplier: 'Candidatos / Proveedores de exámenes médicos',
        inputs: 'Requisición de personal, hoja de vida, perfil de cargo',
        outputs: 'Contrato firmado, afiliaciones a seguridad social y personal inducido en el puesto',
        customer: 'Área solicitante',
        responsibleRole: 'Psicólogo de Selección'
      },
      {
        id: 'act-th-3',
        number: 3,
        stage: 'Verificar',
        name: 'Evaluar el desempeño laboral y medir la eficacia de los entrenamientos.',
        description: 'Aplicar instrumentos de evaluación periódica y seguimiento a metas individuales.',
        supplier: 'Jefes inmediatos / Colaboradores',
        inputs: 'Formatos de evaluación de desempeño diligenciados, listas de asistencia',
        outputs: 'Resultados consolidados de desempeño y matrices de eficacia de formación',
        customer: 'Comité de Dirección / Trabajadores',
        responsibleRole: 'Director de Talento Humano'
      },
      {
        id: 'act-th-4',
        number: 4,
        stage: 'Actuar',
        name: 'Ejecutar planes de desarrollo individual, promociones y ajustes al clima organizacional.',
        description: 'Establecer planes de mejora para colaboradores con brechas y fortalecer retención.',
        supplier: 'Comité de Talento Humano',
        inputs: 'Informes de clima laboral y brechas de desempeño',
        outputs: 'Planes de carrera implementados y ajustes a perfiles de cargo',
        customer: 'Colaboradores y Organización',
        responsibleRole: 'Director de Talento Humano'
      }
    ],
    measurementPlan: [
      {
        id: 'ctrl-th-1',
        activityName: 'Contratación y Afiliaciones',
        variableToControl: 'Oportunidad de afiliación al Sistema de Seguridad Social Integral',
        specification: '100% de afiliaciones activas antes del primer día laboral',
        acceptanceCriteria: 'Soporte de radicación EPS, ARL, Pensión y Caja de Compensación vigente',
        inspectorRole: 'Analista de Nómina y Talento Humano',
        inspectionRecord: 'Expediente digital del colaborador con certificados de afiliación',
        contingencyAction: 'No permitir el ingreso a las instalaciones hasta constancia formal de afiliación ARL y EPS'
      }
    ],
    approvals: {
      elaboratedBy: { name: 'Dra. Andrea Morales', role: 'Líder de Talento Humano', date: '2026-02-10', signature: 'Andrea Morales' },
      reviewedBy: { name: 'Dra. Marcela Gómez Peña', role: 'Directora SGI', date: '2026-02-12', signature: 'Marcela Gómez P.' },
      approvedBy: { name: 'Dra. Carolina Méndez Silva', role: 'Gerente General', date: '2026-02-15', signature: 'Carolina Méndez S.' }
    },
    createdAt: '2026-02-10',
    updatedAt: '2026-09-20'
  },
  {
    id: 'proc-operaciones-03',
    code: 'PR-OP-001',
    version: '04',
    pageInfo: '1 de 2',
    name: 'Producción y Prestación del Servicio',
    category: 'Misional',
    leaderRole: 'Director de Operaciones / Jefe de Planta',
    participants: 'Supervisores de Línea, Operadores Técnicos, Inspectores de Calidad, Mantenimiento',
    objective: 'Transformar materias primas y recursos en productos/servicios terminados conformes con las especificaciones técnicas de los clientes, asegurando eficiencia de costos, seguridad y cero defectos.',
    productOrService: 'Productos terminados o servicios técnicos ejecutados y certificados para entrega al cliente final.',
    scopeStart: 'Recepción de la orden de producción/servicio y materiales en planta',
    scopeEnd: 'Liberación de calidad y entrega del producto terminado al almacén de despacho',
    legalAndTechnicalNorms: [
      'ISO 9001:2015 - Numeral 8.5 (Producción y provisión del servicio)',
      'Buenas Prácticas de Manufactura (BPM) / Normas técnicas sectoriales',
      'Norma de Seguridad y Salud en Máquinas y Equipos (OSHA / ISO 45001)'
    ],
    technologicalResources: [
      'Líneas de producción automatizadas / Maquinaria con control PLC',
      'Sistema MES / SCADA para monitoreo de tiempos y paradas en tiempo real',
      'Instrumentos de medición calibrados (calibradores, micrómetros, sensores)'
    ],
    informationResources: [
      'Órdenes de producción, recetas técnicas y planos de fabricación',
      'Hojas de instrucción de trabajo estándar (SOP)',
      'Histórico de mantenimientos preventivos y bitácoras de turno'
    ],
    humanResources: [
      'Ingeniero de Producción / Jefe de Planta',
      'Técnicos operadores certificados en maquinaria',
      'Inspector de Calidad en línea'
    ],
    requiredFormats: [
      'FOR-OP-01 Orden de Producción y Hoja de Ruta',
      'FOR-OP-02 Lista de Chequeo de Arranque de Máquina',
      'FOR-OP-03 Registro de Control en Proceso (Variables Críticas)',
      'FOR-OP-04 Reporte de Producto No Conforme y Paradas'
    ],
    indicators: [
      {
        id: 'ind-op-1',
        name: 'Eficiencia Global de los Equipos (OEE)',
        formula: 'Disponibilidad * Rendimiento * Calidad * 100',
        target: '≥ 85%',
        frequency: 'Semanal / Mensual',
        responsible: 'Director de Operaciones'
      },
      {
        id: 'ind-op-2',
        name: 'Porcentaje de Scrap / Desperdicio',
        formula: '(Kilos o unidades defectuosas / Total procesado) * 100',
        target: '≤ 1.5%',
        frequency: 'Diario / Mensual',
        responsible: 'Supervisor de Planta'
      }
    ],
    infrastructureAndEquipment: [
      'Nave industrial con demarcación de senderos peatonales y zonas de trabajo',
      'Sistema de aire comprimido, subestación eléctrica regulada y extracción de polvos',
      'Mesas de ensamblaje con diseño ergonómico y luminarias LED 500 lux'
    ],
    workEnvironment: [
      'Control de temperatura ambiente y ventilación mecánica forzada',
      'Protección auditiva en zonas con más de 80 dB y señalización de seguridad',
      'Pisos antideslizantes y orden y aseo 5S garantizado'
    ],
    activities: [
      {
        id: 'act-op-1',
        number: 1,
        stage: 'Planear',
        name: 'Programar la producción y alistar insumos y maquinaria.',
        description: 'Planificar el plan maestro de producción semanal con base en los pedidos comerciales.',
        supplier: 'Proceso Comercial y Ventas / Gestión de Compras',
        inputs: 'Pronóstico de ventas, órdenes de pedido, disponibilidad de insumos en bodega',
        outputs: 'Programa maestro de producción publicado y órdenes de trabajo generadas',
        customer: 'Supervisores de Planta y Mantenimiento',
        responsibleRole: 'Planificador de Producción'
      },
      {
        id: 'act-op-2',
        number: 2,
        stage: 'Hacer',
        name: 'Ejecutar las operaciones de transformación y ensamble según las hojas estándar.',
        description: 'Procesar los materiales respetando parámetros de velocidad, presión y temperatura.',
        supplier: 'Almacén de materias primas',
        inputs: 'Materias primas verificadas, hojas de proceso y maquinaria puesta a punto',
        outputs: 'Lotes de productos manufacturados en proceso y registros de lote',
        customer: 'Área de Control de Calidad / Empaque',
        responsibleRole: 'Operadores Técnicos'
      },
      {
        id: 'act-op-3',
        number: 3,
        stage: 'Verificar',
        name: 'Efectuar controles de calidad en línea y verificación final del lote.',
        description: 'Muestreo estadístico de variables críticas de producto terminado.',
        supplier: 'Línea de producción activa',
        inputs: 'Muestras de producto terminado, especificación técnica de calidad',
        outputs: 'Certificado de liberación de lote o reporte de producto no conforme',
        customer: 'Almacén de Producto Terminado / Despachos',
        responsibleRole: 'Inspector de Calidad'
      },
      {
        id: 'act-op-4',
        number: 4,
        stage: 'Actuar',
        name: 'Analizar fallas, implementar acciones de mantenimiento autónomo y mejora continua.',
        description: 'Reuniones Kaizen breves de turno para eliminar causas raíz de desperdicios.',
        supplier: 'Equipo de Operaciones / Calidad',
        inputs: 'Registros de paradas, causas de scrap, desviaciones de OEE',
        outputs: 'Acciones de mejora ejecutadas, ajustes a parámetros de máquina y actualización de SOPs',
        customer: 'Proceso Operativo y Gerencia',
        responsibleRole: 'Jefe de Planta'
      }
    ],
    measurementPlan: [
      {
        id: 'ctrl-op-1',
        activityName: 'Control dimensional y de peso en línea',
        variableToControl: 'Tolerancias dimensionales (±0.2mm) y peso neto',
        specification: 'Dentro de los límites de control superior e inferior del plano técnico',
        acceptanceCriteria: '100% de las muestras dentro de especificación Cp/Cpk ≥ 1.33',
        inspectorRole: 'Inspector de Calidad',
        inspectionRecord: 'FOR-OP-03 Registro de Control Estadístico de Proceso',
        contingencyAction: 'Detener línea inmediatamente, cuarentenar lote sospechoso y calibrar herramental'
      }
    ],
    approvals: {
      elaboratedBy: { name: 'Ing. Fernando Soto', role: 'Jefe de Planta', date: '2026-01-20', signature: 'Fernando Soto' },
      reviewedBy: { name: 'Dra. Marcela Gómez Peña', role: 'Directora SGI', date: '2026-01-25', signature: 'Marcela Gómez P.' },
      approvedBy: { name: 'Dra. Carolina Méndez Silva', role: 'Gerente General', date: '2026-01-28', signature: 'Carolina Méndez S.' }
    },
    createdAt: '2026-01-20',
    updatedAt: '2026-10-02'
  }
];

export const PROCESS_CATEGORIES: ProcessCategory[] = [
  'Estratégico',
  'Misional',
  'Apoyo',
  'Evaluación y Control'
];

export const DEMING_GUIDES = {
  Planear: {
    title: 'Planear (P - Plan)',
    description: 'Establecer los objetivos del proceso, recursos necesarios, planes de trabajo y especificaciones para lograr los resultados previstos.',
    examples: [
      'Elaborar el plan anual o mensual del proceso.',
      'Definir metas, cronogramas y presupuestos operativos.',
      'Identificar requisitos del cliente y especificaciones técnicas.',
      'Analizar riesgos y oportunidades del proceso.',
      'Seleccionar y calificar proveedores o recursos.'
    ],
    color: 'emerald'
  },
  Hacer: {
    title: 'Hacer (D - Do)',
    description: 'Ejecutar lo planificado, transformar insumos mediante actividades operativas, registrar datos y generar los productos o servicios.',
    examples: [
      'Ejecutar las órdenes de compra o producción.',
      'Prestar el servicio o fabricar los productos según instrucciones estándar.',
      'Atender solicitudes o requerimientos de los clientes.',
      'Realizar capacitaciones, inducciones o mantenimientos.',
      'Registrar las evidencias en los formatos establecidos.'
    ],
    color: 'blue'
  },
  Verificar: {
    title: 'Verificar (C - Check)',
    description: 'Realizar el seguimiento, medición y auditoría de los procesos y productos respecto a las políticas, objetivos, metas y requisitos.',
    examples: [
      'Medir los indicadores de gestión (KPIs) y comparar con las metas.',
      'Inspeccionar productos o servicios recibidos y terminados.',
      'Realizar auditorías internas del proceso.',
      'Monitorear tiempos de entrega y nivel de satisfacción del cliente.',
      'Identificar desviaciones o productos no conformes.'
    ],
    color: 'amber'
  },
  Actuar: {
    title: 'Actuar (A - Act)',
    description: 'Tomar acciones para mejorar continuamente el desempeño de los procesos, corregir causas de no conformidades y estandarizar buenas prácticas.',
    examples: [
      'Implementar planes de acción correctiva ante desvíos.',
      'Actualizar manuales, procedimientos e instructivos de trabajo.',
      'Estandarizar soluciones y lecciones aprendidas.',
      'Revisar asignación de recursos y capacitar en mejoras.',
      'Presentar informe de mejora continua a la Alta Dirección.'
    ],
    color: 'purple'
  }
};

export const DEFAULT_JOB_POSITIONS: JobPosition[] = [
  {
    id: 'cargo-1',
    code: 'CAR-GG-001',
    title: 'Gerente General',
    department: 'Dirección General',
    reportsTo: 'Junta Directiva / Accionistas',
    associatedProcessCategory: 'Estratégico',
    associatedProcessName: 'Direccionamiento Estratégico y Calidad',
    roleType: 'Líder de Proceso',
    objective: 'Definir el rumbo estratégico, políticas institucionales y asignar los recursos necesarios para asegurar la sostenibilidad, rentabilidad y mejora continua del sistema de gestión.',
    education: 'Profesional en Administración, Economía o Ingeniería, con posgrado en Alta Gerencia o Dirección de Operaciones.',
    experience: 'Mínimo 5 años en cargos directivos y liderazgo de sistemas de gestión.',
    responsibilities: [
      'Aprobar la política de calidad, misión, visión y directrices estratégicas de la organización.',
      'Asegurar la disponibilidad de recursos financieros, tecnológicos y humanos para todos los procesos.',
      'Liderar las revisiones por la dirección y evaluar el cumplimiento de los objetivos estratégicos.',
      'Representar legalmente a la empresa y autorizar planes de contingencia e inversión.'
    ],
    competencies: [
      'Liderazgo transformacional',
      'Pensamiento estratégico y toma de decisiones',
      'Negociación de alto nivel',
      'Orientación a resultados y rentabilidad'
    ]
  },
  {
    id: 'cargo-2',
    code: 'CAR-AB-001',
    title: 'Jefe de Compras y Suministros',
    department: 'Abastecimiento y Logística',
    reportsTo: 'Dirección Financiera / Gerencia',
    associatedProcessCategory: 'Apoyo',
    associatedProcessName: 'Gestión de Compras y Abastecimiento',
    roleType: 'Líder de Proceso',
    objective: 'Garantizar el abastecimiento continuo, confiable y oportuno de materias primas, insumos y servicios de terceros bajo los mejores estándares de calidad, costo y cumplimiento normativo.',
    education: 'Profesional en Ingeniería Industrial, Administración de Empresas o Comercio Internacional.',
    experience: 'Mínimo 3 años en negociación con proveedores y compras industriales.',
    responsibilities: [
      'Planificar el plan anual de adquisiciones y cotizaciones de insumos.',
      'Homologar, evaluar y reevaluar periódicamente la confiabilidad de los proveedores.',
      'Emitir órdenes de compra y supervisar la recepción técnica en almacén.',
      'Negociar términos de pago, garantías y acuerdos de nivel de servicio (SLA).'
    ],
    competencies: [
      'Negociación comercial',
      'Control de costos y presupuestos',
      'Gestión de relaciones con proveedores',
      'Dominio de software ERP y compras sostenibles'
    ]
  },
  {
    id: 'cargo-3',
    code: 'CAR-TH-001',
    title: 'Director de Talento Humano',
    department: 'Gestión del Talento Humano',
    reportsTo: 'Gerencia General',
    associatedProcessCategory: 'Apoyo',
    associatedProcessName: 'Gestión del Talento Humano',
    roleType: 'Líder de Proceso',
    objective: 'Atraer, capacitar, evaluar y motivar al talento humano idóneo, fomentando una cultura de alto desempeño, seguridad y salud laboral y clima organizacional positivo.',
    education: 'Profesional en Psicología, Administración o Ingeniería Industrial, con especialización en Gestión Humana o SG-SST.',
    experience: 'Mínimo 3 años en selección, compensación y bienestar laboral.',
    responsibilities: [
      'Administrar los procesos de reclutamiento, selección por competencias y contratación.',
      'Diseñar y ejecutar el plan anual de inducción, entrenamiento y capacitación.',
      'Coordinar las evaluaciones semestrales y anuales de desempeño laboral.',
      'Supervisar el cumplimiento normativo de la legislación laboral y el SG-SST.'
    ],
    competencies: [
      'Comunicación asertiva y empatía',
      'Gestión del cambio organizacional',
      'Manejo de resolución de conflictos',
      'Conocimiento de la legislación laboral vigente'
    ]
  },
  {
    id: 'cargo-4',
    code: 'CAR-OP-001',
    title: 'Jefe de Planta / Operaciones',
    department: 'Producción y Operaciones',
    reportsTo: 'Gerencia General',
    associatedProcessCategory: 'Misional',
    associatedProcessName: 'Producción y Prestación del Servicio',
    roleType: 'Líder de Proceso',
    objective: 'Dirigir y controlar la fabricación y entrega de productos y servicios terminados, cumpliendo estrictamente con especificaciones técnicas, tiempos de entrega acordados y costos operativos.',
    education: 'Ingeniero Industrial, Mecánico, Químico o afines.',
    experience: 'Mínimo 4 años liderando líneas de manufactura o prestación de servicios técnicos.',
    responsibilities: [
      'Programar la producción semanal y balancear las cargas de trabajo de máquinas y personal.',
      'Controlar los parámetros críticos en línea (velocidad, tolerancias, mermas y OEE).',
      'Garantizar el mantenimiento preventivo oportuno de la infraestructura y maquinaria.',
      'Liderar reuniones diarias de inicio de turno e implementar metodologías 5S y Kaizen.'
    ],
    competencies: [
      'Control estadístico de procesos',
      'Liderazgo operativo en planta',
      'Metodología Lean / Mejora continua',
      'Manejo de indicadores de productividad (OEE)'
    ]
  },
  {
    id: 'cargo-5',
    code: 'CAR-SGI-001',
    title: 'Coordinador de Calidad y SGI',
    department: 'Aseguramiento de Calidad',
    reportsTo: 'Gerencia General',
    associatedProcessCategory: 'Evaluación y Control',
    associatedProcessName: 'Evaluación, Auditorías y Mejora Continua',
    roleType: 'Líder de Proceso',
    objective: 'Monitorear la conformidad del Sistema de Gestión Integrado (ISO 9001/14001/45001), coordinando auditorías internas, control documental y planes de acción correctiva ante no conformidades.',
    education: 'Ingeniero o Profesional con certificación de Auditor Interno ISO 9001:2015.',
    experience: 'Mínimo 2 años en implementación o auditoría de sistemas de gestión.',
    responsibilities: [
      'Custodiar el mapa de procesos, fichas de caracterización y control documental.',
      'Programar y ejecutar el plan anual de auditorías internas de calidad.',
      'Monitorear el cierre eficaz de acciones correctivas y preventivas.',
      'Calcular y consolidar el tablero de indicadores globales de la compañía.'
    ],
    competencies: [
      'Análisis de causa raíz (Ishikawa, 5 Porqués)',
      'Auditoría y control de no conformidades',
      'Rigor metodológico ISO 9001:2015',
      'Capacidad analítica de datos'
    ]
  },
  {
    id: 'cargo-6',
    code: 'CAR-AL-002',
    title: 'Analista de Almacén e Inventarios',
    department: 'Logística y Almacén',
    reportsTo: 'Jefe de Compras y Suministros',
    associatedProcessCategory: 'Apoyo',
    associatedProcessName: 'Gestión de Compras y Abastecimiento',
    roleType: 'Participante / Operativo',
    objective: 'Efectuar la recepción técnica, custodia, almacenamiento seguro y despacho de mercancías, insumos y herramientas, asegurando la exactitud de inventarios.',
    education: 'Tecnólogo o Profesional en Logística, Administración o carreras afines.',
    experience: 'Mínimo 1 año en bodegas industriales y manejo de ERP de inventarios.',
    responsibilities: [
      'Inspeccionar físicamente las cantidades y empaques de los bienes recibidos según la orden de compra.',
      'Diligenciar el acta de recepción técnica y registrar el ingreso en el sistema de inventarios.',
      'Preservar las condiciones de almacenamiento, rotación FIFO y control de vencimientos.',
      'Entregar insumos a las áreas operativas con las solicitudes correspondientes.'
    ],
    competencies: [
      'Orden y atención al detalle',
      'Manejo de sistemas de inventarios (ERP)',
      'Seguridad en manipulación de cargas',
      'Control de mermas'
    ]
  }
];

