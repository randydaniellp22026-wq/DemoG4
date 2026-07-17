import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cpu, Search, Award, BookOpen, Clock, Activity, Sparkles } from 'lucide-react'
import { Card } from '../components/Card'

interface ProgramaItem {
  id: string;
  nombre: string;
  colaborador: string;
  empresa: string;
  objetivo: string;
  progreso: number;
  duracion: string;
  modulosCount: number;
  estado: 'Completado' | 'Activo' | 'Inicializando';
  gaps: string[];
}

export function Programas() {
  const [searchTerm, setSearchTerm] = useState('')

  const mockProgramas: ProgramaItem[] = [
    {
      id: '1',
      nombre: 'Plan de Desarrollo: Supervisor de Turno de Bodega',
      colaborador: 'Kevin Araya',
      empresa: 'Rutas Andinas Logística',
      objetivo: 'Optimizar la distribución del equipo en los distintos turnos de bodega para reducir el tiempo promedio de despacho de pedidos en un 15% y disminuir errores de inventario.',
      progreso: 65,
      duracion: '8 semanas',
      modulosCount: 3,
      estado: 'Activo',
      gaps: ['Liderazgo de equipo', 'Comunicación asertiva']
    },
    {
      id: '2',
      nombre: 'Programa de Liderazgo Comercial y Ventas B2B',
      colaborador: 'Sandra Rojas',
      empresa: 'InnovaTech Solutions',
      objetivo: 'Desarrollar habilidades comerciales directas, capacitar en venta de soluciones SaaS complejas y estructurar pipelines de venta de alto impacto.',
      progreso: 100,
      duracion: '4 semanas',
      modulosCount: 2,
      estado: 'Completado',
      gaps: ['Manejo de indicadores', 'Comunicación asertiva']
    },
    {
      id: '3',
      nombre: 'Operación de Grúas Horquilla y Seguridad Operativa',
      colaborador: 'Carlos Gómez',
      empresa: 'Rutas Andinas Logística',
      objetivo: 'Minimizar riesgos de accidentes en el piso de maniobras, mejorar el manejo de cargas pesadas y certificar en normas ISO de seguridad.',
      progreso: 15,
      duracion: '6 semanas',
      modulosCount: 3,
      estado: 'Inicializando',
      gaps: ['Seguridad ocupacional', 'Uso de software interno']
    }
  ]

  const filteredProgramas = mockProgramas.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.colaborador.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusStyle = (estado: ProgramaItem['estado']) => {
    switch (estado) {
      case 'Completado':
        return 'text-green-400 bg-green-500/10 border-green-500/20 shadow-[0_0_8px_rgba(74,222,128,0.15)]';
      case 'Activo':
        return 'text-gold bg-gold/10 border-gold/20 shadow-[0_0_8px_rgba(232,163,61,0.15)]';
      case 'Inicializando':
        return 'text-steel bg-steel/10 border-steel/20 shadow-[0_0_8px_rgba(62,124,177,0.15)]';
      default:
        return 'text-textMuted border-border';
    }
  }

  return (
    <div className="w-full space-y-8 py-6 md:py-10">
      {/* Top dashboard metadata readout */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Stat 1 */}
        <div className="bg-navy/40 border border-border/50 rounded-xl p-4 flex items-center space-x-3.5 backdrop-blur-md">
          <Activity className="w-6 h-6 text-gold shrink-0" />
          <div>
            <span className="text-[9px] font-mono text-textMuted uppercase block">Programas en curso</span>
            <span className="font-display font-bold text-lg text-white">2 Activos</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-navy/40 border border-border/50 rounded-xl p-4 flex items-center space-x-3.5 backdrop-blur-md">
          <Award className="w-6 h-6 text-green-400 shrink-0" />
          <div>
            <span className="text-[9px] font-mono text-textMuted uppercase block">Graduados del mes</span>
            <span className="font-display font-bold text-lg text-white">12 Colaboradores</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-navy/40 border border-border/50 rounded-xl p-4 flex items-center space-x-3.5 backdrop-blur-md">
          <Cpu className="w-6 h-6 text-teal shrink-0" />
          <div>
            <span className="text-[9px] font-mono text-textMuted uppercase block">Eficiencia con IA</span>
            <span className="font-display font-bold text-lg text-white">+85% Ahorro tiempo</span>
          </div>
        </div>
      </div>

      {/* Title & Search bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border/50 pb-5 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white">
            Programas de Capacitación
          </h2>
          <p className="text-[10px] text-textMuted font-mono uppercase tracking-widest mt-1">
            Matriz de Planes de Desarrollo y KPI Corporativos
          </p>
        </div>

        {/* Search input matrix pod */}
        <div className="relative w-full sm:w-72 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel group-focus-within:text-gold transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar colaborador, empresa o plan..."
            className="w-full bg-navyLight border border-border rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder:text-textMuted/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* Grid of active programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProgramas.map((prog) => (
          <Card key={prog.id} className="hover:border-steel/40 transition-all duration-300 relative group flex flex-col justify-between">
            {/* Status indicator tag */}
            <span className={`absolute top-4 right-4 text-[9px] font-mono border px-2 py-0.5 rounded-full uppercase font-semibold ${getStatusStyle(prog.estado)}`}>
              {prog.estado}
            </span>

            <div className="space-y-4">
              {/* Program metadata header */}
              <div className="space-y-1 pr-20">
                <span className="text-[9px] font-mono text-steel uppercase block tracking-wider">
                  {prog.empresa} // COL: {prog.colaborador.toUpperCase()}
                </span>
                <h3 className="font-display font-bold text-sm text-white group-hover:text-gold transition-colors leading-tight">
                  {prog.nombre}
                </h3>
              </div>

              {/* Progress visualizer */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-textMuted">PROGRESO DE APRENDIZAJE:</span>
                  <span className={prog.progreso === 100 ? 'text-green-400 font-bold' : 'text-gold font-bold'}>
                    {prog.progreso}%
                  </span>
                </div>
                <div className="w-full h-[6px] bg-navyLight border border-border rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ease-out ${
                      prog.progreso === 100 
                        ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' 
                        : 'bg-gold shadow-[0_0_8px_#E8A33D]'
                    }`}
                    style={{ width: `${prog.progreso}%` }}
                  />
                </div>
              </div>

              {/* Objective text description */}
              <p className="text-xs text-textMuted leading-relaxed line-clamp-3">
                {prog.objetivo}
              </p>

              {/* Duration and modules stats block */}
              <div className="flex items-center space-x-4 pt-1 font-mono text-[9px] text-textMuted border-t border-border/20">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-steel" />
                  {prog.duracion}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-steel" />
                  {prog.modulosCount} Módulos
                </span>
              </div>
            </div>

            {/* Interaction button pod */}
            <div className="flex justify-end gap-3.5 pt-4 border-t border-border/20 mt-5">
              <Link
                to="/crear-ia"
                className="px-4 py-2 border border-steel text-steel hover:border-gold hover:text-gold rounded-lg text-[10.5px] font-mono tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Ver Programa
              </Link>
              <Link
                to="/crear-ia"
                className="px-4 py-2.5 bg-teal text-navyDeep font-bold rounded-lg text-[10.5px] font-mono tracking-wide hover:bg-teal/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Cpu className="w-3.5 h-3.5 text-navyDeep" />
                Uplink Coach
              </Link>
            </div>
          </Card>
        ))}

        {filteredProgramas.length === 0 && (
          <div className="col-span-full cyber-card p-10 text-center space-y-2 border-dashed">
            <span className="text-sm font-mono text-textMuted">No se encontraron programas que coincidan con la búsqueda.</span>
          </div>
        )}
      </div>

      {/* Synthesize new CTA block */}
      <div className="cyber-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-gold/20 shadow-[0_0_15px_rgba(232,163,61,0.03)] bg-gradient-to-r from-navy via-navyLight/20 to-navy">
        <div className="space-y-1.5 flex-1 text-center md:text-left">
          <span className="text-[9px] uppercase font-mono text-teal tracking-widest flex items-center justify-center md:justify-start gap-1 font-bold">
            <Sparkles className="w-3 h-3 text-teal animate-pulse" />
            NÚCLEO NEURONAL OPERATIVO
          </span>
          <h4 className="text-base font-bold font-display text-white">¿Necesitas capacitar a otro colaborador?</h4>
          <p className="text-xs text-textMuted max-w-xl leading-relaxed">
            Nuestra inteligencia artificial asimilará los gaps y los objetivos de tu negocio para sintetizar un plan de estudio adaptativo con mentoría cognitiva en tiempo real.
          </p>
        </div>
        
        <Link
          to="/crear-ia"
          className="px-6 py-3.5 bg-gold text-navyDeep font-bold font-mono tracking-wide rounded-lg text-xs hover:bg-gold/90 transition-all duration-300 shadow-[0_4px_14px_rgba(232,163,61,0.2)] active:scale-95 flex items-center gap-2 cursor-pointer grow-0 shrink-0"
        >
          <span>SINTETIZAR CON IA</span>
          <Cpu className="w-4 h-4 text-navyDeep" />
        </Link>
      </div>
    </div>
  )
}
