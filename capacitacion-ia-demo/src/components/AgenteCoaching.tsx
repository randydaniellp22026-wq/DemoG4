import { useState, useRef, useEffect } from 'react'
import { Send, Brain, Terminal, ArrowLeft, Wifi, Cpu, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AgenteCoachingProps {
  perfil: any;
  programa: any;
  historialChat: Message[];
  onSendMessage: (messages: Message[]) => void;
  onBack: () => void;
}

export function AgenteCoaching({ perfil, programa, historialChat, onSendMessage, onBack }: AgenteCoachingProps) {
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Quick Action Prompts to make it extremely easy for the client
  const quickActions = [
    {
      label: "⚡ Reducir tiempos",
      prompt: `Según los objetivos de la empresa, ¿cómo puedo optimizar la distribución de personal para reducir el tiempo de despacho en un 15%?`
    },
    {
      label: "🗣️ Comunicación asertiva",
      prompt: `Dame un ejercicio práctico de comunicación asertiva que pueda aplicar con mi equipo en bodega hoy mismo.`
    },
    {
      label: "📈 Planificar módulo 1",
      prompt: `¿Qué pasos concretos debo dar en la semana 1 del Módulo de Liderazgo para iniciar con éxito?`
    }
  ]

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [historialChat, loading])

  const handleSend = async (e?: React.FormEvent, textToSend?: string, forceMock = false) => {
    if (e) e.preventDefault()
    
    const messageContent = textToSend || inputText
    if (!messageContent.trim() || loading) return

    if (forceMock) {
      setLoading(true)
      setError(null)
      setTimeout(() => {
        const mockResponses = [
          `¡Excelente pregunta, ${perfil?.nombre || 'Kevin'}! Con respecto a tu meta de convertirte en "${perfil?.puestoMeta || 'Supervisor'}" y cerrar la brecha en "${perfil?.gaps || 'liderazgo'}", te sugiero empezar por aplicar el Módulo 1. ¿Cómo te ves implementando esto en tu turno actual?`,
          `Entiendo perfectamente el reto. Recuerda que el objetivo de "${perfil?.empresa || 'Rutas Andinas'}" es "${perfil?.objetivoEmpresa || 'optimizar tiempos'}". ¿Cómo crees que el Módulo de Comunicación Asertiva te ayudará a reducir tiempos de despacho?`,
          `Ese es un punto clave. En tu rol de transición, coordinar sin silos es vital. Te recomiendo probar con una pequeña reunión de alineación de 5 minutos al inicio de tu turno en la bodega. ¿Qué opinas de esto?`
        ]
        const randomReply = mockResponses[Math.floor(Math.random() * mockResponses.length)]
        onSendMessage([...historialChat, { role: 'assistant', content: randomReply }])
        setLoading(false)
      }, 1200)
      return
    }

    const userMessage: Message = { role: 'user', content: messageContent.trim() }
    const updatedHistory = [...historialChat, userMessage]
    
    onSendMessage(updatedHistory)
    setInputText('')
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat-coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          perfil,
          programa,
          historial: updatedHistory
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Fallo de conexión al enviar el mensaje.')
      }

      const data = await response.json()
      onSendMessage([...updatedHistory, { role: 'assistant', content: data.reply }])
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Error al conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[580px] space-y-4">
      
      {/* HUD Header */}
      <div className="border-b border-border/50 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative">
        <div className="flex items-center space-x-3">
          {/* Glowing AI Avatar Sphere */}
          <div className="relative w-10 h-10 rounded-lg bg-teal/10 border border-teal flex items-center justify-center shadow-[0_0_12px_rgba(255,0,127,0.25)] shrink-0">
            <Brain className="w-5 h-5 text-teal animate-pulse" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-bg shadow-[0_0_8px_#22c55e]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-teal">
                COG.UPLINK_CONSOLE
              </h2>
              <span className="flex items-center gap-1 text-[8px] font-mono text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
                <Wifi className="w-2 h-2 animate-pulse" />
                ONLINE
              </span>
            </div>
            <p className="text-[10px] text-textMuted font-mono">
              CORE: LLAMA-3.3-70B · MENTOR COGNITIVO
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          {/* Signal waveform inside header */}
          <div className="flex space-x-1 items-end h-4 px-3 opacity-60">
            <span className={`w-0.5 h-1.5 bg-teal rounded-full ${loading ? 'animate-bounce' : 'h-1'}`} />
            <span className={`w-0.5 h-3 bg-teal rounded-full ${loading ? 'animate-bounce' : 'h-2'}`} style={{ animationDelay: '0.15s' }} />
            <span className={`w-0.5 h-4.5 bg-teal rounded-full ${loading ? 'animate-bounce' : 'h-3.5'}`} style={{ animationDelay: '0.3s' }} />
            <span className={`w-0.5 h-2 bg-teal rounded-full ${loading ? 'animate-bounce' : 'h-2'}`} style={{ animationDelay: '0.45s' }} />
          </div>
          
          <button
            type="button"
            onClick={onBack}
            className="text-[10px] font-mono border border-border px-3 py-2 rounded-lg text-textMuted hover:border-gold hover:text-gold hover:shadow-[0_0_8px_rgba(0,240,255,0.15)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            VER PROGRAMA
          </button>
        </div>
      </div>

      {/* Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 scrollbar-thin">
        {historialChat.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] animate-fadeIn ${
                isUser ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              {/* Message Metadata Tag */}
              <div className="flex items-center gap-1 text-[8px] font-mono uppercase tracking-widest text-textMuted px-1.5 mb-1">
                {isUser ? (
                  <>
                    <Cpu className="w-2.5 h-2.5 text-teal" />
                    <span>USER_AUTH::{perfil?.nombre?.split(' ')[0] || 'GUEST'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-2.5 h-2.5 text-gold" />
                    <span>AI_COACH::COG_REPLY</span>
                  </>
                )}
              </div>
              
              {/* Styled Bubble */}
              <div
                className={`rounded-xl px-4 py-3 text-xs leading-relaxed border relative shadow-inner ${
                  isUser
                    ? 'bg-teal/10 border-teal/30 text-text font-sans rounded-tr-none'
                    : 'bg-surface2 border-border/50 text-text font-sans rounded-tl-none'
                }`}
              >
                {/* Tech corner tick inside bubble */}
                <span className={`absolute top-0 w-1.5 h-1.5 ${isUser ? 'right-0 bg-teal' : 'left-0 bg-border'}`} />
                <p className="whitespace-pre-wrap leading-relaxed font-sans">{msg.content}</p>
              </div>
            </div>
          );
        })}

        {/* Neural Wave Loading (Oscilloscope thinking) */}
        {loading && (
          <div className="flex flex-col items-start max-w-[85%] mr-auto space-y-1">
            <div className="flex items-center gap-1 text-[8px] font-mono uppercase tracking-widest text-textMuted px-1.5">
              <Sparkles className="w-2.5 h-2.5 text-gold animate-spin" />
              <span>AI_COACH::PROCESSING</span>
            </div>
            
            <div className="bg-surface2 border border-border/30 rounded-xl rounded-tl-none px-4 py-3.5 flex flex-col space-y-3 w-56 relative shadow-inner">
              <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-border" />
              
              {/* Thinking Oscilloscope */}
              <div className="flex space-x-1 items-center justify-center py-2 h-6 bg-black/60 rounded border border-border/20">
                <div className="wave-bar h-4" />
                <div className="wave-bar h-8" />
                <div className="wave-bar h-12" />
                <div className="wave-bar h-6" />
                <div className="wave-bar h-10" />
                <div className="wave-bar h-4" />
              </div>
              
              <span className="text-[9px] font-mono text-gold text-center animate-pulse tracking-wide font-semibold">
                SINTETIZANDO COGNICIÓN...
              </span>
            </div>
          </div>
        )}

        {/* API Error / Failback Indicator */}
        {error && (
          <div className="cyber-card p-4 border-teal/40 bg-tealDim/5 rounded-xl space-y-3 text-xs text-teal animate-fadeIn">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-teal animate-pulse" />
              <strong className="font-mono uppercase tracking-wider">[CONNECTION_ERROR] API OFFLINE</strong>
            </div>
            <p className="font-mono text-[10px] text-textMuted">
              Detalle: {error}. Puedes simular respuestas completas para el flujo de la demo.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSend(undefined, undefined, true)}
                className="px-4 py-2 bg-gold text-bg font-bold font-mono text-[10px] tracking-wider rounded hover:bg-gold/90 transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,240,255,0.25)]"
              >
                FORZAR RESPUESTA COGNITIVA (DEMO)
              </button>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Ease of use: Quick actions selector chips */}
      {!loading && (
        <div className="space-y-1.5">
          <span className="text-[8px] font-mono uppercase tracking-widest text-textMuted px-1.5 block">
            ACCIONES RÁPIDAS (UN CLICK PARA PREGUNTAR AL COACH):
          </span>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(undefined, action.prompt)}
                className="px-3 py-1.5 bg-surface2/60 border border-border/40 rounded-lg text-[10px] font-mono text-textMuted hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Form Input */}
      <form onSubmit={(e) => handleSend(e)} className="pt-3 border-t border-border/50 flex items-center space-x-3 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gold font-mono text-sm pointer-events-none select-none">
          &gt;
        </div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Formula una pregunta o consulta aquí..."
          disabled={loading}
          className="flex-1 bg-surface2 border border-border rounded-lg pl-8 pr-4 py-3 text-xs text-text placeholder:text-textMuted/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors disabled:opacity-50 font-sans shadow-inner"
        />
        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="px-4 py-3 bg-gold text-bg font-bold rounded-lg text-xs hover:bg-gold/90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-[0_2px_10px_rgba(0,240,255,0.2)] font-mono cursor-pointer"
        >
          <span>ENVIAR</span>
          <Send className="w-3 h-3 text-bg" />
        </button>
      </form>
    </div>
  )
}
