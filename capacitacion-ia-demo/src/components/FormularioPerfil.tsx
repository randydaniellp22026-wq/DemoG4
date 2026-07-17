import { useState } from 'react'
import { User, Building2, Briefcase, Target, TrendingUp, Layers, ChevronRight } from 'lucide-react'

interface FormularioPerfilProps {
  onSubmit: (perfil: any) => void;
}

const AVAILABLE_GAPS = [
  'Liderazgo de equipo',
  'Manejo de indicadores',
  'Seguridad ocupacional',
  'Comunicación asertiva',
  'Manejo de conflictos',
  'Uso de software interno'
]

export function FormularioPerfil({ onSubmit }: FormularioPerfilProps) {
  const [nombre, setNombre] = useState('Kevin Araya')
  const [empresa, setEmpresa] = useState('Rutas Andinas Logística')
  const [puestoActual, setPuestoActual] = useState('Operario de bodega')
  const [puestoMeta, setPuestoMeta] = useState('Supervisor de turno')
  const [objetivoEmpresa, setObjetivoEmpresa] = useState(
    'Optimizar la distribución del equipo en los distintos turnos de bodega para reducir el tiempo promedio de despacho de pedidos en un 15% y disminuir errores de inventario.'
  )
  const [selectedGaps, setSelectedGaps] = useState<string[]>([
    'Liderazgo de equipo',
    'Comunicación asertiva'
  ])

  const toggleGap = (gap: string) => {
    setSelectedGaps((prev) =>
      prev.includes(gap) ? prev.filter((g) => g !== gap) : [...prev, gap]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      nombre,
      empresa,
      puestoActual,
      puestoMeta,
      objetivoEmpresa,
      gaps: selectedGaps.join(', ')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step Header */}
      <div className="space-y-2 border-b border-border/50 pb-5 relative">
        <span className="text-[10px] uppercase font-mono tracking-widest text-gold block font-semibold">
          SYS.INITIALIZE_PROFILE_MATRIX
        </span>
        <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
          <Layers className="w-6 h-6 text-gold" />
          <span>Perfil del Colaborador</span>
        </h2>
        <p className="text-textMuted text-xs leading-relaxed max-w-2xl">
          Ingresa los parámetros profesionales del colaborador. El núcleo cognitivo sintetizará un plan de capacitación alineado a sus brechas y las metas del negocio.
        </p>
        {/* Decorative corner mark */}
        <div className="absolute right-0 bottom-0 text-[10px] font-mono text-border/80 uppercase">
          SECURE_CON_v1.0
        </div>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nombre */}
        <div className="flex flex-col space-y-1.5 relative group">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase font-mono tracking-widest text-textMuted flex items-center gap-1.5 font-semibold">
              <User className="w-3.5 h-3.5 text-gold" />
              Nombre Completo
            </label>
            <span className="text-[8px] font-mono text-border">CHAR.STRING</span>
          </div>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Ej. Randy Daniel"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-navyLight border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 shadow-inner"
            />
            {/* Input highlight indicator */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/20" />
          </div>
        </div>

        {/* Empresa */}
        <div className="flex flex-col space-y-1.5 relative group">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase font-mono tracking-widest text-textMuted flex items-center gap-1.5 font-semibold">
              <Building2 className="w-3.5 h-3.5 text-gold" />
              Empresa
            </label>
            <span className="text-[8px] font-mono text-border">SYS.CORP</span>
          </div>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Ej. InnovaTech Solutions"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="w-full bg-navyLight border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 shadow-inner"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/20" />
          </div>
        </div>

        {/* Puesto Actual */}
        <div className="flex flex-col space-y-1.5 relative group">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase font-mono tracking-widest text-textMuted flex items-center gap-1.5 font-semibold">
              <Briefcase className="w-3.5 h-3.5 text-gold" />
              Puesto Actual
            </label>
            <span className="text-[8px] font-mono text-border">ROLE.CURRENT</span>
          </div>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Ej. Desarrollador Junior"
              value={puestoActual}
              onChange={(e) => setPuestoActual(e.target.value)}
              className="w-full bg-navyLight border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 shadow-inner"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/20" />
          </div>
        </div>

        {/* Puesto Meta */}
        <div className="flex flex-col space-y-1.5 relative group">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase font-mono tracking-widest text-textMuted flex items-center gap-1.5 font-semibold">
              <Target className="w-3.5 h-3.5 text-gold" />
              Puesto Meta / Objetivo
            </label>
            <span className="text-[8px] font-mono text-border">ROLE.TARGET</span>
          </div>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Ej. Desarrollador Lead"
              value={puestoMeta}
              onChange={(e) => setPuestoMeta(e.target.value)}
              className="w-full bg-navyLight border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 shadow-inner"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/20" />
          </div>
        </div>
      </div>

      {/* Objetivo Estratégico */}
      <div className="flex flex-col space-y-1.5 relative">
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase font-mono tracking-widest text-textMuted flex items-center gap-1.5 font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-gold" />
            Objetivo Estratégico de la Empresa
          </label>
          <span className="text-[8px] font-mono text-border">GOAL.STRATEGY</span>
        </div>
        <textarea
          required
          rows={3}
          placeholder="Describe las metas de negocio de la empresa que se buscan apoyar con esta capacitación..."
          value={objetivoEmpresa}
          onChange={(e) => setObjetivoEmpresa(e.target.value)}
          className="bg-navyLight border border-border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 resize-none shadow-inner leading-relaxed"
        />
      </div>

      {/* Selector de Chips de Gaps */}
      <div className="flex flex-col space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-border/20 pb-1.5">
          <label className="text-[10px] uppercase font-mono tracking-widest text-textMuted flex items-center gap-1.5 font-semibold">
            <Layers className="w-3.5 h-3.5 text-teal" />
            Brechas / Gaps Detectados (Selección Múltiple)
          </label>
          <span className="text-[8px] font-mono text-teal">ARRAY.GAPS</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {AVAILABLE_GAPS.map((gap) => {
            const isSelected = selectedGaps.includes(gap);
            return (
              <button
                key={gap}
                type="button"
                onClick={() => toggleGap(gap)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium border transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'border-teal text-teal bg-teal/10 shadow-[0_0_10px_rgba(34,211,184,0.18)]'
                    : 'border-border text-steel hover:border-steel/80 hover:text-white hover:bg-navyLight'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isSelected ? 'bg-teal animate-pulse' : 'bg-textMuted/40'}`} />
                {gap}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-5 border-t border-border/50">
        <button
          type="submit"
          disabled={!nombre || !empresa || !puestoActual || !puestoMeta || selectedGaps.length === 0}
          className="px-6 py-3 bg-gold text-navyDeep font-bold rounded-lg text-sm hover:bg-gold/90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_4px_14px_rgba(232,163,61,0.25)] hover:shadow-[0_4px_20px_rgba(232,163,61,0.4)] active:scale-95 cursor-pointer font-mono"
        >
          <span>SINTETIZAR PLAN CURATORIAL</span>
          <ChevronRight className="w-4 h-4 text-navyDeep stroke-[2.5px]" />
        </button>
      </div>
    </form>
  )
}
