import { useState, useEffect } from 'react'

interface Modulo {
  titulo: string;
  duracion: string;
  objetivo: string;
  por_que_personalizado: string;
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

  const fetchProgram = async (useFallback = false) => {
    setLoading(true)
    setError(null)

    if (useFallback) {
      // Mock program aligned with Kevin's transition
      const mockProgram: ProgramData = {
        programa_nombre: `Plan de Desarrollo: Supervisor de Turno - ${perfil?.nombre || 'Kevin Araya'}`,
        modulos: [
          {
            titulo: "Liderazgo de Equipos de Operaciones y Bodega",
            duracion: "3 semanas",
            objetivo: "Desarrollar habilidades para coordinar turnos, delegar tareas y resolver conflictos en el piso de operaciones.",
            por_que_personalizado: "Se seleccionó para abordar tu gap en 'Liderazgo de equipo', fundamental en tu transición de Operario a Supervisor."
          },
          {
            titulo: "Comunicación Asertiva y Reporte Operativo",
            duracion: "2 semanas",
            objetivo: "Implementar técnicas de comunicación clara y asertiva para evitar malentendidos en bodega y coordinar con otras áreas.",
            por_que_personalizado: "Diseñado para cerrar la brecha de 'Comunicación asertiva' y asegurar reportes limpios a gerencia."
          },
          {
            titulo: "Gestión del Objetivo Estratégico y Control de Tiempos",
            duracion: "3 semanas",
            objetivo: "Capacitar en la optimización del layout de bodega y distribución de personal para reducir tiempos de despacho en un 15%.",
            por_que_personalizado: `Alineado directamente al objetivo de la empresa: "${perfil?.objetivoEmpresa || 'Reducir tiempos y mermas'}"`
          }
        ],
        comparativa_generica: "Un curso estándar enseñaría administración de bodegas general. Este plan se enfoca en que tú dirijas el equipo de Rutas Andinas Logística liderando con asertividad.",
        diferencia_clave: "Enfoque pragmático de transición de rol con aplicación directa a las mermas y despacho de la bodega real."
      }
      setTimeout(() => {
        setProgram(mockProgram)
        setLoading(false)
      }, 1200)
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
      setProgram(data)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Error al conectar con el servidor backend.')
    } finally {
      setLoading(false)
    }
  }

  // Load program automatically upon mounting
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
    <div className="space-y-8">
      {/* 1. Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm font-semibold text-text font-display">
            Generando programa a medida para {perfil?.nombre || 'Kevin Araya'}...
          </p>
        </div>
      )}

      {/* 2. Error State with fallback to mock */}
      {error && !loading && (
        <div className="p-6 bg-goldDim/10 border border-goldDim/30 rounded-xl space-y-4 text-center">
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-gold font-display">No se pudo generar el programa</h3>
            <p className="text-sm text-textMuted max-w-lg mx-auto">
              Detalle del error: <span className="font-mono text-xs">{error}</span>
            </p>
          </div>
          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-border text-textMuted rounded-lg text-sm hover:border-gold hover:text-gold transition-colors"
            >
              ← Modificar Perfil
            </button>
            <button
              type="button"
              onClick={() => fetchProgram(true)}
              className="px-6 py-2 bg-gold text-bg font-semibold rounded-lg text-sm hover:bg-gold/90 transition-colors"
            >
              Cargar Programa Simulado (Demo)
            </button>
          </div>
        </div>
      )}

      {/* 3. Program Content */}
      {!loading && !error && program && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="border-b border-border pb-4">
            <span className="text-xs uppercase font-mono tracking-widest text-teal">Plan Curado por IA</span>
            <h2 className="text-2xl font-bold font-display text-gold mt-1">
              Programa de Capacitación Personalizado
            </h2>
          </div>

          {/* Comparative Block: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Generic Course (catalogo masivo) */}
            <div className="bg-surface2/40 border border-border/30 rounded-xl p-5 space-y-2 opacity-60">
              <span className="text-[10px] uppercase font-mono tracking-wider text-textMuted block">
                Curso Genérico (Catálogo Masivo)
              </span>
              <p className="text-sm text-textMuted leading-relaxed">
                {program.comparativa_generica}
              </p>
            </div>

            {/* Right: Custom Program */}
            <div className="bg-surface2 border border-gold/40 rounded-xl p-5 space-y-2 shadow-[0_0_12px_rgba(232,163,61,0.05)]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gold block font-semibold">
                Programa Generado para {perfil?.nombre || 'Kevin Araya'}
              </span>
              <h4 className="text-base font-bold font-display text-text">
                {program.programa_nombre}
              </h4>
              <p className="text-xs text-textMuted leading-relaxed">
                Diseñado exclusivamente para la transición de <strong className="text-text">{perfil?.puestoActual}</strong> a <strong className="text-text">{perfil?.puestoMeta}</strong>.
              </p>
            </div>
          </div>

          {/* Modules: Vertical Timeline */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-textMuted font-mono">
              Estructura Cronológica del Plan
            </h3>

            {/* Timeline Wrapper */}
            <div className="relative pl-6 border-l-2 border-gold/40 space-y-8 ml-3">
              {program.modulos && program.modulos.map((modulo, idx) => (
                <div key={idx} className="relative space-y-2">
                  
                  {/* Timeline Dot (Gold) */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-gold border-2 border-bg shadow-[0_0_6px_rgba(232,163,61,0.4)]" />

                  {/* Header Title and Duration */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold font-display text-text">
                      {modulo.titulo}
                    </h4>
                    <span className="text-teal font-mono text-xs font-semibold whitespace-nowrap">
                      ⚡ {modulo.duracion}
                    </span>
                  </div>

                  {/* Objective & Rationale */}
                  <div className="space-y-1 text-sm leading-relaxed">
                    <p className="text-textMuted">{modulo.objetivo}</p>
                    <p className="text-xs italic text-teal/90 font-medium">
                      Por qué es personalizado: {modulo.por_que_personalizado}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Banner with Diferencia Clave (Gold Dim/10 background) */}
          <div className="bg-goldDim/10 border border-goldDim/20 rounded-xl p-6 space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gold block font-semibold">
              Diferencia Clave y Valor para el Negocio
            </span>
            <p className="text-sm text-text font-medium leading-relaxed">
              {program.diferencia_clave}
            </p>
          </div>

          {/* Navigation Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-border/50">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-border text-textMuted rounded-lg text-sm hover:border-gold hover:text-gold transition-colors"
            >
              ← Modificar Perfil
            </button>
            <button
              type="button"
              onClick={handleActivateCoaching}
              className="px-6 py-2.5 bg-gold text-bg font-semibold rounded-lg text-sm hover:bg-gold/90 transition-colors shadow-[0_4px_12px_rgba(232,163,61,0.2)]"
            >
              Activar Agente de Coaching →
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
