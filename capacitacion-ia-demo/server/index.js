import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test route to verify the API connection
app.get('/api/hello', (req, res) => {
  res.json({ message: '¡Hola desde el servidor backend de Express!' });
});

// Endpoint to generate training program using Groq (OpenAI-compatible)
app.post('/api/generar-programa', async (req, res) => {
  try {
    const { nombre, empresa, puestoActual, puestoMeta, objetivoEmpresa, gaps } = req.body;

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'La API Key de Groq no está configurada en el servidor (.env).' });
    }

    const systemPrompt = `Eres un motor de personalización de programas de capacitación corporativa. 
Tu objetivo es generar una respuesta estructurada estrictamente en formato JSON válido.
El JSON debe contener la siguiente estructura exacta:
{
  "programa_nombre": "Nombre del programa de capacitación",
  "modulos": [
    {
      "titulo": "Título del módulo",
      "duracion": "Duración estimada (ej: 2 semanas)",
      "objetivo": "Objetivo principal de aprendizaje",
      "por_que_personalizado": "Explicación de por qué este módulo se diseñó a medida según el puesto meta y los gaps indicados"
    }
  ],
  "comparativa_generica": "Una breve descripción de cómo este programa personalizado difiere de un curso genérico",
  "diferencia_clave": "La diferencia y beneficio clave que este plan de aprendizaje aportará al negocio y al colaborador"
}`;

    const userPrompt = `Genera un programa de capacitación personalizado con los siguientes datos:
- Colaborador: ${nombre}
- Empresa: ${empresa}
- Puesto Actual: ${puestoActual}
- Puesto Meta/Meta Profesional: ${puestoMeta}
- Objetivo Estratégico de la Empresa: ${objetivoEmpresa}
- Brechas/Gaps a resolver: ${gaps}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de API de Groq:', errorText);
      return res.status(response.status).json({ 
        error: `Error de la API de Groq (HTTP ${response.status}): ${errorText}` 
      });
    }

    const data = await response.json();
    let text = data.choices[0].message.content.trim();

    // Clean up markdown wrapper just in case
    if (text.startsWith('```json')) {
      text = text.substring(7, text.length - 3).trim();
    } else if (text.startsWith('```')) {
      text = text.substring(3, text.length - 3).trim();
    }

    let parsedProgram;
    try {
      parsedProgram = JSON.parse(text);
    } catch (parseErr) {
      console.error('Error al parsear el JSON retornado por Groq:', text);
      return res.status(500).json({ 
        error: 'El modelo de Groq no retornó un formato JSON válido.', 
        rawText: text 
      });
    }

    res.json(parsedProgram);

  } catch (err) {
    console.error('Error en /api/generar-programa:', err);
    res.status(500).json({ error: `Error interno del servidor: ${err.message}` });
  }
});

// Endpoint for chat coaching using Groq
app.post('/api/chat-coaching', async (req, res) => {
  try {
    const { perfil, programa, historial } = req.body;

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'La API Key de Groq no está configurada en el servidor (.env).' });
    }

    if (!historial || !Array.isArray(historial) || historial.length === 0) {
      return res.status(400).json({ error: 'El historial de chat es requerido y debe ser un arreglo.' });
    }

    const systemPrompt = `Eres un agente de coaching profesional y mentor de capacitación corporativa. 
Tu rol es guiar al usuario en su proceso de aprendizaje y brindarle soporte interactivo.
Conoces el perfil del usuario, su programa de capacitación personalizado y el objetivo estratégico de la empresa.

CONTEXTO DEL USUARIO:
- Perfil: ${JSON.stringify(perfil || {})}
- Programa de Capacitación: ${JSON.stringify(programa || {})}

Instrucciones:
- Sé empático, profesional y desafiante pero constructivo.
- Enfoca tus respuestas y consejos en cómo acortar los gaps del usuario y alinear sus esfuerzos al objetivo estratégico de la empresa.
- Mantén las respuestas de coaching concisas y estructuradas.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...historial.map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
          }))
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de API de Groq (Coaching):', errorText);
      return res.status(response.status).json({ 
        error: `Error de la API de Groq (HTTP ${response.status}): ${errorText}` 
      });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.error('Error en /api/chat-coaching:', err);
    res.status(500).json({ error: `Error interno del servidor: ${err.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
