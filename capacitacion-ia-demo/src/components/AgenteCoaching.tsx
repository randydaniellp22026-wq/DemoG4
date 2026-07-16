import { useState, useRef, useEffect } from 'react'

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

  // Scroll to bottom when history changes or when loading starts/ends
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [historialChat, loading])

  const handleSend = async (e: React.FormEvent, forceMock = false) => {
    e.preventDefault()
    
    if (forceMock) {
      if (loading) return
      setLoading(true)
      setError(null)
      setTimeout(() => {
        const mockResponses = [
          `¡Excelente pregunta, ${perfil?.nombre || 'Kevin'}! Considerando tu meta de convertirte en "${perfil?.puestoMeta || 'Supervisor'}" y cerrar la brecha en "${perfil?.gaps || 'liderazgo'}", te sugiero empezar por aplicar el Módulo 1. ¿Cómo te ves implementando esto en tu turno actual?`,
          `Entiendo perfectamente el reto. Recuerda que el objetivo de "${perfil?.empresa || 'tu empresa'}" es "${perfil?.objetivoEmpresa || 'optimizar tiempos'}". ¿Cómo crees que el Módulo de Comunicación Asertiva te ayudará a reducir tiempos de despacho?`,
          `Ese es un punto clave. En tu rol de transición, coordinar sin silos es vital. Te recomiendo probar con una pequeña reunión de alineación al inicio de tu turno. ¿Qué opinas?`
        ]
        const randomReply = mockResponses[Math.floor(Math.random() * mockResponses.length)]
        onSendMessage([...historialChat, { role: 'assistant', content: randomReply }])
        setLoading(false)
      }, 1200)
      return
    }

    if (!inputText.trim() || loading) return

    const userMessage: Message = { role: 'user', content: inputText.trim() }
    const updatedHistory = [...historialChat, userMessage]
    
    // Add user message to history
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
    <div className="flex flex-col h-[520px]">
      
      {/* Header with Online Glowing Dot */}
      <div className="border-b border-border/50 pb-4 mb-4 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            {/* Glowing Teal Dot (indicator) */}
            <span className="w-2.5 h-2.5 rounded-full bg-teal shadow-[0_0_10px_#22D3B8] animate-pulse" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal font-mono">
              Agente de coaching · en línea
            </h2>
          </div>
          <p className="text-xs text-textMuted">
            Mentor cognitivo basado en tu programa personalizado.
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs border border-border px-3 py-1.5 rounded-md text-textMuted hover:border-gold hover:text-gold transition-colors"
        >
          ← Ver Programa
        </button>
      </div>

      {/* Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {historialChat.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col max-w-[85%] ${
              msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            {/* Sender */}
            <span className="text-[10px] uppercase font-mono tracking-widest text-textMuted mb-1 px-1">
              {msg.role === 'user' ? perfil?.nombre || 'Tú' : 'Coach IA'}
            </span>
            
            {/* Message Bubble */}
            <div
              className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed border ${
                msg.role === 'user'
                  ? 'bg-teal/10 border-teal/20 text-teal'
                  : 'bg-surface2 border-border/30 text-text'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {/* 3-Dot Animated Loading Indicator */}
        {loading && (
          <div className="flex flex-col items-start max-w-[85%] mr-auto space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-textMuted px-1">Coach IA</span>
            <div className="bg-surface2 border border-border/30 rounded-xl px-4 py-3 flex items-center space-x-2">
              <div className="w-2 h-2 bg-textMuted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-textMuted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-textMuted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Error / Fallback simulation */}
        {error && (
          <div className="p-4 bg-goldDim/10 border border-goldDim/30 rounded-lg text-xs text-gold space-y-2">
            <div>
              <strong>Error en la API:</strong> {error}
            </div>
            <button
              type="button"
              onClick={(e) => handleSend(e, true)}
              className="px-3.5 py-1.5 bg-gold text-bg font-semibold rounded hover:bg-gold/80 transition-colors"
            >
              Simular Respuesta del Coach (Demo)
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Form (supports clicking and pressing Enter) */}
      <form onSubmit={(e) => handleSend(e, false)} className="mt-4 pt-3 border-t border-border/50 flex space-x-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu consulta y presiona Enter..."
          disabled={loading}
          className="flex-1 bg-surface2 border border-border rounded-lg px-4 py-2.5 text-sm text-text focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="px-5 py-2.5 bg-gold text-bg font-semibold rounded-lg text-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
