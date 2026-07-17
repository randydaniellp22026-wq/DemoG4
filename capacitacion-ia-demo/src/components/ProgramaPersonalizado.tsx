import { useState, useEffect } from 'react'
import { Terminal, Brain, Clock, Sparkles, ArrowLeft, Activity, CheckCircle2, Zap, AlertTriangle } from 'lucide-react'

interface SemanaDetalle {
  semana_numero: number;
  titulo: string;
  resumen: string;
  temas: string[];
}

interface Modulo {
  titulo: string;
  duracion: string;
  objetivo: string;
  por_que_personalizado: string;
  habilidades_reforzadas?: string[];
  semanas?: SemanaDetalle[];
}

interface ProgramData {
  programa_nombre: string;
  modulos: Modulo[];
  comparativa_generica: string;
  diferencia_clave: string;
}

interface ProgramaPersonalizadoProps {
  perfil: any;
  onActivateCoaching: (programa: ProgramData, initialMessage: string) => void;
  onBack: () => void;
}

export function ProgramaPersonalizado({ perfil, onActivateCoaching, onBack }: ProgramaPersonalizadoProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [program, setProgram] = useState<ProgramData | null>(null)
  
  // Weekly breakdown accordion state
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({})

  const toggleModuleExpand = (idx: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }

  const getSemanas = (modulo: Modulo) => {
    if (modulo.semanas && modulo.semanas.length > 0) {
      return modulo.semanas;
    }
    const numSemanas = parseInt(modulo.duracion) || 2;
    const autoSemanas: SemanaDetalle[] = [];
    for (let i = 1; i <= numSemanas; i++) {
      autoSemanas.push({
        semana_numero: i,
        titulo: `Profundización de contenidos (Fase ${i})`,
        resumen: `Estudio práctico y aplicación de: ${modulo.objetivo}`,
        temas: [
          `Fundamentos esenciales del módulo`,
          `Métricas de control y aplicación de campo`,
          `Revisión operativa y evaluación final`
        ]
      });
    }
    return autoSemanas;
  };

  const getHabilidades = (modulo: Modulo) => {
    if (modulo.habilidades_reforzadas && modulo.habilidades_reforzadas.length > 0) {
      return modulo.habilidades_reforzadas;
    }
    return [
      `Competencia en ${modulo.titulo.split(' ')[0] || 'materia'}`,
      "Resolución de problemas",
      "Eficiencia operativa"
    ];
  };
  
  // Real-time terminal log simulator
  const [terminalLogs, setTerminalLogs] = useState<string[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const stepsToPrint = [
    `>> [INIT] Estableciendo conexión con el motor cognitivo Llama-3.3...`,
    `>> [SYS] Analizando perfil del colaborador: ${perfil?.nombre || 'Kevin Araya'}...`,
    `>> [SYS] Evaluando brechas: [${perfil?.gaps || 'Liderazgo, Comunicación'}]...`,
    `>> [ALIGN] Mapeando objetivo corporativo en "${perfil?.empresa || 'Rutas Andinas'}"...`,
    `>> [SYNTH] Sintetizando módulos de aprendizaje adaptativo y KPI...`,
    `>> [OK] Módulos estructurados correctamente. Desplegando interfaz curada...`
  ]

  useEffect(() => {
    if (!loading) return
    if (currentStepIndex < stepsToPrint.length) {
      const timer = setTimeout(() => {
        setTerminalLogs(prev => [...prev, stepsToPrint[currentStepIndex]])
        setCurrentStepIndex(idx => idx + 1)
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [currentStepIndex, loading])

  const fetchProgram = async (useFallback = false) => {
    setLoading(true)
    setError(null)
    setTerminalLogs([])
    setCurrentStepIndex(0)

    if (useFallback) {
      const mockProgram: ProgramData = {
        programa_nombre: `Plan de Desarrollo: Supervisor de Turno - ${perfil?.nombre || 'Kevin Araya'}`,
        modulos: [
          {
            titulo: "Liderazgo de Equipos de Operaciones y Bodega",
            duracion: "3 semanas",
            objetivo: "Desarrollar habilidades para coordinar turnos, delegar tareas y resolver conflictos en el piso de operaciones.",
            por_que_personalizado: "Se seleccionó para abordar tu gap en 'Liderazgo de equipo', fundamental en tu transición de Operario a Supervisor.",
            habilidades_reforzadas: ["Gestión de equipos", "Delegación operativa", "Resolución de conflictos"],
            semanas: [
              {
                semana_numero: 1,
                titulo: "Transición al rol de liderazgo",
                resumen: "Comprender la diferencia clave entre operar y supervisar un equipo operativo en el piso.",
                temas: ["Mentalidad de supervisor", "Responsabilidad operativa", "Primeros pasos en delegación"]
              },
              {
                semana_numero: 2,
                titulo: "Gestión de turnos y delegación",
                resumen: "Técnicas eficaces para distribuir el personal en los turnos de bodega y supervisar tareas.",
                temas: ["Asignación de roles", "Feedback constructivo", "Seguimiento de cumplimiento"]
              },
              {
                semana_numero: 3,
                titulo: "Manejo de conflictos en planta",
                resumen: "Afrontar y resolver diferencias de opinión y roces en bodega de forma asertiva.",
                temas: ["Escucha activa", "Mediación objetiva", "Protocolos de resolución"]
              }
            ]
          },
          {
            titulo: "Comunicación Asertiva y Reporte Operativo",
            duracion: "2 semanas",
            objetivo: "Implementar técnicas de comunicación clara y asertiva para evitar malentendidos en bodega y coordinar con otras áreas.",
            por_que_personalizado: "Diseñado para cerrar la brecha de 'Comunicación asertiva' y asegurar reportes limpios a gerencia.",
            habilidades_reforzadas: ["Comunicación asertiva", "Reporte corporativo", "Coordinación entre áreas"],
            semanas: [
              {
                semana_numero: 1,
                titulo: "Comunicación clara en bodega",
                resumen: "Evitar malentendidos y ruidos en el traspaso de instrucciones durante el turno.",
                temas: ["Lenguaje asertivo", "Instrucciones de trabajo claras", "Escucha empática"]
              },
              {
                semana_numero: 2,
                titulo: "Reportes gerenciales limpios",
                resumen: "Cómo redactar reportes de novedades e incidentes para la gerencia de operaciones.",
                temas: ["Estructura de minutas", "Indicadores de incidencias", "Herramientas de reporte interno"]
              }
            ]
          },
          {
            titulo: "Gestión del Objetivo Estratégico y Control de Tiempos",
            duracion: "3 semanas",
            objetivo: "Capacitar en la optimización del layout de bodega y distribución de personal para reducir tiempos de despacho en un 15%.",
            por_que_personalizado: `Alineado directamente al objetivo de la empresa: "${perfil?.objetivoEmpresa || 'Reducir tiempos y mermas'}"`,
            habilidades_reforzadas: ["Optimización de layouts", "Control de tiempos de despacho", "Reducción de errores de stock"],
            semanas: [
              {
                semana_numero: 1,
                titulo: "Diagnóstico de tiempos de despacho",
                resumen: "Medir los cuellos de botella actuales en el despacho de pedidos.",
                temas: ["Mapeo del flujo de pedidos", "Detección de tiempos muertos", "Uso de cronómetro de procesos"]
              },
              {
                semana_numero: 2,
                titulo: "Reorganización de layout operativo",
                resumen: "Mejorar la distribución física de productos y personal en los turnos.",
                temas: ["Clasificación ABC de inventario", "Rutas óptimas de picking", "Distribución ergonómica"]
              },
              {
                semana_numero: 3,
                titulo: "Indicadores de mejora (KPI)",
                resumen: "Evaluar el impacto de las mejoras aplicadas comparándolas con el objetivo de reducción de 15%.",
                temas: ["Cálculo del lead time", "Indicador de pedidos perfectos", "Presentación de resultados"]
              }
            ]
          }
        ],
        comparativa_generica: "Un curso estándar enseñaría administración de bodegas general. Este plan se enfoca en que tú dirijas el equipo de Rutas Andinas Logística liderando con asertividad.",
        diferencia_clave: "Enfoque pragmático de transición de rol con aplicación directa a las mermas y despacho de la bodega real."
      }
      setTimeout(() => {
        setProgram(mockProgram)
        setLoading(false)
      }, 2200) // Give time to read logs
      return
    }

    try {
      const response = await fetch('/api/generar-programa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfil)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Fallo al conectar con la API de generación.')
      }

      const data = await response.json()
      // Delay slightly so user can enjoy the cyberpunk loader logs
      setTimeout(() => {
        setProgram(data)
        setLoading(false)
      }, 1000)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Error al conectar con el servidor backend.')
    } finally {
      // Don't close loader immediately on error to show logs
      if (useFallback) setLoading(false)
    }
  };

  useEffect(() => {
    fetchProgram(false)
  }, [])

  const handleActivateCoaching = () => {
    if (!program) return
    const primerMensaje = `¡Hola, ${perfil.nombre}! Soy tu mentor y coach de IA para este programa.

He estructurado y personalizado el programa "${program.programa_nombre}" especialmente para ayudarte en tu transición de "${perfil.puestoActual}" a "${perfil.puestoMeta}" en "${perfil.empresa}".

¿Qué te parece la estructura de los módulos? ¿Tienes alguna duda de cómo este plan se alinea a los objetivos de tu empresa, o te gustaría que profundicemos en alguna de las brechas de aprendizaje como "${perfil.gaps || 'liderazgo'}"?`;

    onActivateCoaching(program, primerMensaje)
  }

  return (
    <div className="space-y-6">
      {/* 1. Loading State (Futuristic Matrix Scanner) */}
      {loading && (
        <div className="cyber-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-gold animate-pulse" />
              <h3 className="font-mono text-sm uppercase tracking-wider text-text font-bold">
                COG.SYNTHESIZER_ACTIVE
              </h3>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
          </div>

          {/* Scanning animation visualizer */}
          <div className="h-28 bg-[#04060d] border border-border/60 rounded-lg relative overflow-hidden flex items-center justify-center">
            {/* Horizontal scan line overlay */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60 animate-[cyber-scan_2.5s_infinite_linear]" style={{
              top: '50%'
            }} />
            <style>{`
              @keyframes scanline-flow {
                0% { top: 0%; }
                100% { top: 100%; }
              }
            `}</style>
            
            {/* Tech waveform grid */}
            <div className="flex space-x-1.5 z-10">
              <div className="wave-bar h-8" />
              <div className="wave-bar h-16" />
              <div className="wave-bar h-24" />
              <div className="wave-bar h-12" />
              <div className="wave-bar h-20" />
            </div>
          </div>

          {/* Terminal Console Logs */}
          <div className="bg-black/90 p-4 rounded-lg border border-border/80 font-mono text-[11px] leading-relaxed space-y-2 h-44 overflow-y-auto scrollbar-thin text-[#00ff99]">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="animate-fadeIn opacity-90">
                {log}
              </div>
            ))}
            <div className="w-2 h-4 bg-[#00ff99] animate-pulse inline-block" />
          </div>

          <p className="text-center font-display text-xs text-textMuted uppercase tracking-widest">
            Sintetizando plan de desarrollo para {perfil?.nombre || 'Kevin Araya'}...
          </p>
        </div>
      )}

      {/* 2. Glitch Error State */}
      {error && !loading && (
        <div className="cyber-card p-6 border-teal/40 bg-tealDim/5 rounded-xl space-y-6 relative overflow-hidden">
          {/* Tech glitch corner red accent */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-teal/10 border-b border-l border-teal/30 rotate-45 translate-x-8 -translate-y-8" />
          
          <div className="flex items-center space-x-3 border-b border-border/40 pb-4">
            <AlertTriangle className="w-6 h-6 text-teal" />
            <h3 className="font-bold text-base text-teal font-mono uppercase tracking-wider">
              [WARNING] DISRUPCIÓN EN RED COGNITIVA
            </h3>
          </div>
          
          <div className="space-y-3">
            <p className="text-xs text-textMuted font-mono">
              El motor de síntesis de IA no pudo retornar la estructura curricular requerida.
            </p>
            <div className="p-3 bg-black/50 border border-border/80 rounded font-mono text-[10px] text-teal/90">
              API_DIAGNOSTIC_ERR: {error}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3 border-t border-border/30">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-border text-textMuted rounded-lg text-xs font-mono tracking-wide hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              MODIFICAR DATOS
            </button>
            <button
              type="button"
              onClick={() => fetchProgram(true)}
              className="px-5 py-2.5 bg-gold text-bg font-bold font-mono tracking-wide rounded-lg text-xs hover:bg-gold/90 transition-all duration-300 shadow-[0_2px_10px_rgba(0,240,255,0.25)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-bg fill-current" />
              FORZAR SÍNTESIS SIMULADA
            </button>
          </div>
        </div>
      )}

      {/* 3. Program Content Dashboard */}
      {!loading && !error && program && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="border-b border-border/50 pb-5 relative">
            <span className="text-[10px] uppercase font-mono tracking-widest text-teal block font-semibold">
              CURATED_PLAN_METRICS.LOG
            </span>
            <h2 className="text-2xl font-bold font-display text-text mt-1 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gold" />
              <span>Programa de Capacitación AI</span>
            </h2>
            <div className="absolute right-0 bottom-1 flex items-center gap-1.5 font-mono text-[9px] text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
              <Sparkles className="w-2.5 h-2.5" />
              <span>DISEÑO COMPONENTES IA</span>
            </div>
          </div>

          {/* Comparison Panels (Legacy vs AI) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Legacy Catalog */}
            <div className="bg-surface/30 border border-border/40 rounded-xl p-5 space-y-3 relative opacity-60 hover:opacity-85 transition-opacity">
              <span className="text-[8px] uppercase font-mono tracking-wider text-textMuted/60 block">
                [LEGACY_CATALOG.DB]
              </span>
              <h4 className="text-sm font-bold text-textMuted uppercase font-mono">Curso Estándar de la Industria</h4>
              <p className="text-xs text-textMuted leading-relaxed font-sans">
                {program.comparativa_generica}
              </p>
              {/* Crossed sign overlay */}
              <div className="absolute top-4 right-4 text-[9px] font-mono text-textMuted/40 border border-textMuted/30 px-1.5 py-0.5 rounded uppercase">
                Estático
              </div>
            </div>

            {/* Right: AI Synthesis Custom Program */}
            <div className="bg-surface2/50 border border-gold/40 rounded-xl p-5 space-y-3 shadow-[0_0_15px_rgba(0,240,255,0.06)] hover:border-gold/60 transition-all duration-300 relative">
              {/* Small glowing cyan corner light */}
              <span className="absolute top-0 right-0 w-2 h-2 bg-gold rounded-full animate-pulse shadow-[0_0_8px_#00f0ff]" />
              
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase font-mono tracking-wider text-gold block font-bold">
                  [COG.SYNTHESIZED_v2]
                </span>
                <span className="text-[9px] font-mono text-gold bg-gold/15 px-2 py-0.5 rounded uppercase font-semibold">
                  Personalizado
                </span>
              </div>
              <h4 className="text-sm font-bold font-display text-text leading-tight">
                {program.programa_nombre}
              </h4>
              <p className="text-xs text-textMuted leading-relaxed">
                Estructurado específicamente para el tránsito de <strong className="text-text font-semibold">{perfil?.puestoActual}</strong> a <strong className="text-text font-semibold">{perfil?.puestoMeta}</strong>.
              </p>
            </div>
          </div>

          {/* Modules Timeline */}
          <div className="space-y-5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-textMuted font-mono border-b border-border/20 pb-2">
              CRONOGRAMA DE EJECUCIÓN DEL PLAN
            </h3>

            {/* Timeline Loop */}
            <div className="relative pl-7 border-l border-gold/30 space-y-6 ml-3">
              {program.modulos && program.modulos.map((modulo, idx) => (
                <div 
                  key={idx} 
                  className="relative group bg-surface2/40 hover:bg-surface2/60 p-4 border border-border/30 hover:border-gold/30 rounded-xl transition-all duration-300 space-y-3"
                >
                  
                  {/* Timeline Dot (Electric Node) */}
                  <div className="absolute -left-[35px] top-4 w-3.5 h-3.5 rounded-md bg-[#05070f] border-2 border-gold flex items-center justify-center shadow-[0_0_6px_rgba(0,240,255,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <span className="w-1.5 h-1.5 rounded-sm bg-gold" />
                  </div>

                  {/* Header Title and Duration */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-border/10 pb-2">
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold font-display text-text group-hover:text-gold transition-colors leading-tight">
                        {idx + 1}. {modulo.titulo}
                      </h4>
                      {/* Reinforced Skills Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {getHabilidades(modulo).map((skill, sIdx) => (
                          <span key={sIdx} className="text-[9px] font-mono text-gold border border-gold/35 bg-gold/5 px-2 py-0.5 rounded-full flex items-center gap-1">
                            🎯 {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-teal font-mono text-[10px] font-bold whitespace-nowrap bg-teal/10 border border-teal/20 px-2.5 py-0.5 rounded flex items-center gap-1.5 self-start">
                      <Clock className="w-3 h-3 text-teal" />
                      {modulo.duracion}
                    </span>
                  </div>

                  {/* Objective & Custom Explanation */}
                  <div className="space-y-2 text-xs leading-relaxed">
                    <p className="text-textMuted">{modulo.objetivo}</p>
                    
                    {/* Custom explanation logic with neural background */}
                    <div className="p-2.5 bg-[#04060d] border-l-2 border-teal rounded-r font-mono text-[11px] text-teal/95 flex items-start gap-2">
                      <Zap className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-textMuted uppercase font-semibold text-[9px] block">Racional Adaptativo:</strong>
                        {modulo.por_que_personalizado}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Weekly breakdown trigger */}
                  <div className="pt-2.5 border-t border-border/20 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-textMuted/60 uppercase text-[9px]">DIAGNÓSTICO CURRICULAR</span>
                    <button
                      type="button"
                      onClick={() => toggleModuleExpand(idx)}
                      className="text-teal hover:text-teal/80 transition-colors font-bold cursor-pointer hover:underline flex items-center gap-1"
                    >
                      {expandedModules[idx] ? '[- OCULTAR TEMARIO]' : '[+ VER DESGLOSE SEMANAL Y TEMAS]'}
                    </button>
                  </div>

                  {/* Expanded Weekly Content Panel */}
                  {expandedModules[idx] && (
                    <div className="mt-3 bg-[#04060d]/70 border border-border/50 rounded-lg p-3.5 space-y-3.5 animate-fadeIn">
                      <span className="text-[8px] font-mono text-teal/60 uppercase block tracking-wider">
                        // MATRIX_CURRICULUM_LOG :: DEPLOYING_WEEKS
                      </span>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {getSemanas(modulo).map((semana, semIdx) => (
                          <div key={semIdx} className="space-y-1.5 border-b border-border/15 pb-2.5 last:border-b-0 last:pb-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono font-bold text-teal bg-teal/10 px-1.5 py-0.5 rounded border border-teal/10">
                                Semana {semana.semana_numero}
                              </span>
                              <span className="text-[11px] font-display font-bold text-text">
                                {semana.titulo}
                              </span>
                            </div>
                            
                            <p className="text-[11px] text-textMuted pl-1 leading-relaxed">
                              {semana.resumen}
                            </p>
                            
                            {semana.temas && semana.temas.length > 0 && (
                              <div className="pl-2.5 pt-0.5 space-y-1">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                  {semana.temas.map((tema, tIdx) => (
                                    <div key={tIdx} className="text-[10px] font-mono text-text/80 flex items-center gap-1.5">
                                      <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                                      <span>{tema}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Difference highlights */}
          <div className="bg-goldDim/10 border border-goldDim/35 rounded-xl p-5 relative overflow-hidden flex items-start gap-4">
            <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-mono tracking-widest text-gold block font-semibold">
                DIFERENCIAL CLAVE EN EL NEGOCIO
              </span>
              <p className="text-xs text-text font-medium leading-relaxed font-mono">
                {program.diferencia_clave}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-5 border-t border-border/50">
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 border border-border text-textMuted rounded-lg text-xs font-mono tracking-wide hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              MODIFICAR PERFIL
            </button>
            <button
              type="button"
              onClick={handleActivateCoaching}
              className="px-6 py-3.5 bg-teal text-bg font-bold font-mono tracking-wider rounded-lg text-xs hover:bg-teal/90 transition-all duration-300 shadow-[0_4px_14px_rgba(255,0,127,0.25)] hover:shadow-[0_4px_20px_rgba(255,0,127,0.4)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-bg" />
              ACTIVAR MENTOR COGNITIVO (COACH IA)
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
