import { useState } from 'react'

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
  // Preload form with example data as requested
  const [nombre, setNombre] = useState('Kevin Araya')
  const [empresa, setEmpresa] = useState('Rutas Andinas Logística')
  const [puestoActual, setPuestoActual] = useState('Operario de bodega')
  const [puestoMeta, setPuestoMeta] = useState('Supervisor de turno')
  const [objetivoEmpresa, setObjetivoEmpresa] = useState(
    'Optimizar la distribución del equipo en los distintos turnos de bodega para reducir el tiempo promedio de despacho de pedidos en un 15% y disminuir errores de inventario.'
  )
  // Pre-select some gaps aligned with the supervisor position
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
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display text-gold">Perfil del Colaborador</h2>
        <p className="text-textMuted text-sm">
          Completa los datos del profesional para diseñar su programa de capacitación personalizado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs uppercase font-mono tracking-wider text-textMuted">Nombre Completo</label>
          <input
            type="text"
            required
            placeholder="Ej. Randy Daniel"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="bg-surface2 border border-border rounded-lg px-4 py-2 text-sm text-text focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Empresa */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs uppercase font-mono tracking-wider text-textMuted">Empresa</label>
          <input
            type="text"
            required
            placeholder="Ej. InnovaTech Solutions"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="bg-surface2 border border-border rounded-lg px-4 py-2 text-sm text-text focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Puesto Actual */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs uppercase font-mono tracking-wider text-textMuted">Puesto Actual</label>
          <input
            type="text"
            required
            placeholder="Ej. Desarrollador Junior"
            value={puestoActual}
            onChange={(e) => setPuestoActual(e.target.value)}
            className="bg-surface2 border border-border rounded-lg px-4 py-2 text-sm text-text focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Puesto Meta */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs uppercase font-mono tracking-wider text-textMuted">Puesto Meta / Objetivo</label>
          <input
            type="text"
            required
            placeholder="Ej. Desarrollador Lead"
            value={puestoMeta}
            onChange={(e) => setPuestoMeta(e.target.value)}
            className="bg-surface2 border border-border rounded-lg px-4 py-2 text-sm text-text focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      {/* Objetivo Estratégico (Textarea) */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs uppercase font-mono tracking-wider text-textMuted">Objetivo Estratégico de la Empresa</label>
        <textarea
          required
          rows={3}
          placeholder="Describe las metas de negocio de la empresa que se buscan apoyar con esta capacitación..."
          value={objetivoEmpresa}
          onChange={(e) => setObjetivoEmpresa(e.target.value)}
          className="bg-surface2 border border-border rounded-lg px-4 py-2 text-sm text-text focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>

      {/* Selector de Chips Múltiples para Gaps */}
      <div className="flex flex-col space-y-3">
        <label className="text-xs uppercase font-mono tracking-wider text-textMuted">Brechas / Gaps detectados (Selecciona múltiples)</label>
        <div className="flex flex-wrap gap-2.5">
          {AVAILABLE_GAPS.map((gap) => {
            const isSelected = selectedGaps.includes(gap);
            return (
              <button
                key={gap}
                type="button"
                onClick={() => toggleGap(gap)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-teal text-teal bg-teal/5 shadow-[0_0_8px_rgba(34,211,184,0.15)]'
                    : 'border-border text-textMuted hover:border-textMuted/50 hover:text-text'
                }`}
              >
                {gap}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-border/50">
        <button
          type="submit"
          disabled={!nombre || !empresa || !puestoActual || !puestoMeta || selectedGaps.length === 0}
          className="px-6 py-2.5 bg-gold text-bg font-semibold rounded-lg text-sm hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          <span>Siguiente: Generar Programa</span>
        </button>
      </div>
    </form>
  )
}
