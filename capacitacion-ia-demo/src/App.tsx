import { useState } from 'react'
import { Stepper } from './components/Stepper'
import { Card } from './components/Card'
import { FormularioPerfil } from './components/FormularioPerfil'
import { ProgramaPersonalizado } from './components/ProgramaPersonalizado'
import { AgenteCoaching } from './components/AgenteCoaching'

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [step, setStep] = useState(0)
  const [perfil, setPerfil] = useState<any>(null)
  const [programa, setPrograma] = useState<any>(null)
  const [historialChat, setHistorialChat] = useState<Message[]>([])

  const steps = ['Perfil', 'Programa', 'Coaching']

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
    <div className="min-h-screen text-text font-body p-6 md:p-12 flex flex-col items-center justify-start space-y-10 max-w-5xl mx-auto">
      
      {/* Brand Header */}
      <div className="w-full flex items-center justify-between border-b border-border/50 pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-display text-gold tracking-tight">
            Capacitación IA
          </h1>
          <p className="text-xs text-textMuted font-mono uppercase tracking-widest">
            Corporate Development Engine
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-teal bg-tealDim/10 border border-tealDim/20 px-3 py-1 rounded-full">
            v1.0.0 Stable
          </span>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="w-full bg-surface/50 border border-border/30 rounded-xl px-6 py-4">
        <Stepper steps={steps} activeStep={step} />
      </div>

      {/* Main Active Step Rendered Inside Card */}
      <Card className="w-full">
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
      <footer className="w-full border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-textMuted gap-4">
        <div>
          Desarrollado con <span className="text-gold">Vite + React + TS + Tailwind v4</span>
        </div>
        <div className="flex space-x-4 font-mono">
          <span>Backend: Express (3001)</span>
          <span>•</span>
          <span>Model: Claude Sonnet 4.6</span>
        </div>
      </footer>

    </div>
  )
}

export default App
