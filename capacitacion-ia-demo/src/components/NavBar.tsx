import { Link, useLocation } from 'react-router-dom'

export function NavBar() {
  const location = useLocation()
  
  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Programas', path: '/' },
    { name: 'Guías', path: '#' },
    { name: 'Blog', path: '#' },
    { name: 'Grupos', path: '#' },
  ]

  return (
    <nav className="w-full bg-navyDeep/80 backdrop-blur-md border-b border-border sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
      {/* Left circular logo GE */}
      <div className="flex items-center space-x-3.5">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 rounded-full border border-gold flex items-center justify-center bg-navyLight/30 font-display font-bold text-sm text-gold shadow-[0_0_10px_rgba(232,163,61,0.15)] group-hover:shadow-[0_0_15px_rgba(232,163,61,0.35)] transition-all duration-300">
            GE
          </div>
          <span className="font-display font-bold text-white text-xs tracking-wider uppercase hidden sm:inline-block">
            GE CORPORATE
          </span>
        </Link>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map((link, idx) => {
          const isActive = location.pathname === link.path && link.path !== '#';
          return (
            <Link
              key={idx}
              to={link.path}
              className={`text-xs font-mono tracking-wider transition-colors duration-300 ${
                isActive 
                  ? 'text-gold font-bold' 
                  : 'text-textMuted hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          )
        })}

        {/* Special link "Crear con IA" */}
        <Link
          to="/crear-ia"
          className="text-xs font-mono font-bold tracking-wider text-teal hover:text-teal/80 transition-all flex items-center gap-1.5 px-3 py-1 bg-teal/5 border border-teal/20 rounded-full shadow-[0_0_8px_rgba(34,211,184,0.08)] hover:shadow-[0_0_12px_rgba(34,211,184,0.2)]"
        >
          <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
          <span>Crear con IA</span>
        </Link>
      </div>

      {/* Mobile Indicator + Entrar button */}
      <div className="flex items-center space-x-4">
        {/* Special link for small screens */}
        <Link
          to="/crear-ia"
          className="md:hidden text-[10px] font-mono font-bold tracking-wider text-teal hover:text-teal/80 transition-all flex items-center gap-1 px-2.5 py-1 bg-teal/5 border border-teal/20 rounded-full"
        >
          <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
          <span>Crear con IA</span>
        </Link>

        {/* Outline login button */}
        <button
          type="button"
          className="px-4 py-1.5 border border-steel text-steel hover:border-gold hover:text-gold rounded-lg text-xs font-mono tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
        >
          Entrar
        </button>
      </div>
    </nav>
  )
}
