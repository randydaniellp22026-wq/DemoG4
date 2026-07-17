import { useState } from 'react'
import { Stepper } from './components/Stepper'
import { Card } from './components/Card'
import { FormularioPerfil } from './components/FormularioPerfil'
import { ProgramaPersonalizado } from './components/ProgramaPersonalizado'
import { AgenteCoaching } from './components/AgenteCoaching'
import { Cpu, Terminal, ShieldCheck, Activity } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [step, setStep] = useState(0)
  const [perfil, setPerfil] = useState<any>(null)
  const [programa, setPrograma] = useState<any>(null)
  const [historialChat, setHistorialChat] = useState<Message[]>([])

  const steps = ['Perfil del Colaborador', 'Programa de Síntesis', 'Uplink del Coach']

  const handleProfileSubmit = (newPerfil: any) => {
    setPerfil(newPerfil)
    setPrograma(null) // Reset program for new profile
    setHistorialChat([]) // Reset chat history for new profile
    setStep(1)
  }

  const handleActivateCoaching = (progData: any, initialMessage: string) => {
    setPrograma(progData)
    setHistorialChat([{ role: 'assistant', content: initialMessage }])
    setStep(2)
  }

  return (
    <div className="min-h-screen text-white font-body p-4 md:p-10 flex flex-col items-center justify-start space-y-8 max-w-5xl mx-auto relative z-10">
      
      {/* Cyber scanning bar effect */}
      <div className="scan-bar" />

      {/* Futuristic HUD Header */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-border/50 pb-5 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2.5">
            {/* Pulsing AI Neural Core Indicator */}
            <div className="relative w-3.5 h-3.5 flex items-center justify-center shrink-0">
              <span className="absolute w-full h-full rounded-full bg-gold opacity-50 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_8px_#00f0ff]" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight uppercase glow-text-cyan flex items-center gap-2">
              <span>CAPACITACIÓN IA</span>
            </h1>
          </div>
          <p className="text-[10px] text-textMuted font-mono uppercase tracking-widest leading-none">
            Corporate Development Neural Engine // COGNITIVE CORE v1.0
          </p>
        </div>
        
        {/* Right side diagnostics readings */}
        <div className="flex items-center space-x-4 self-end sm:self-auto font-mono text-[9px] text-textMuted border border-border/40 bg-navy/40 p-2 rounded-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>SYS_LINK: ACTIVE</span>
          </div>
          <div className="h-3 w-[1px] bg-border/40" />
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            <span>ENCRYPT: SECURE</span>
          </div>
          <div className="h-3 w-[1px] bg-border/40" />
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal" />
            <span>SYNC: 98.4%</span>
          </div>
        </div>
      </div>

      {/* Stepper Navigation Grid Container */}
      <div className="w-full bg-navyLight/30 border border-border/40 rounded-xl px-5 py-4 backdrop-blur-md relative overflow-hidden shadow-inner">
        {/* Tech decorative top light highlight */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <Stepper steps={steps} activeStep={step} />
      </div>

      {/* Main Active Step Rendered Inside Cyber Card */}
      <Card className="w-full relative">
        {/* Decorative corner tick decal */}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-transparent to-gold/10 pointer-events-none rounded-br-[11px]" />
        
        {step === 0 && (
          <FormularioPerfil onSubmit={handleProfileSubmit} />
        )}

        {step === 1 && perfil && (
          <ProgramaPersonalizado
            perfil={perfil}
            onBack={() => setStep(0)}
            onActivateCoaching={handleActivateCoaching}
          />
        )}

        {step === 2 && (
          <AgenteCoaching
            perfil={perfil}
            programa={programa}
            historialChat={historialChat}
            onSendMessage={(newHistory) => setHistorialChat(newHistory)}
            onBack={() => setStep(1)}
          />
        )}
      </Card>

      {/* Tech Stack Footer */}
      <footer className="w-full border-t border-border/50 pt-5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-textMuted gap-3 font-mono">
        <div className="flex items-center gap-1">
          <span>DESARROLLADO_CON:</span>
          <span className="text-gold font-bold">VITE</span>
          <span>+</span>
          <span className="text-teal font-bold">REACT_19</span>
          <span>+</span>
          <span className="text-gold font-bold">TAILWIND_v4</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-teal" />
            BACKEND: PORT_3001
          </span>
          <span>//</span>
          <span>MODEL: COGNITIVE_UPLINK</span>
        </div>
      </footer>

    </div>
  )
}

export default App
