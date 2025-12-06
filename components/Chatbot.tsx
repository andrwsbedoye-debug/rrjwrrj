
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Bot, User, Send, X, Compass, Search as SearchIcon, Globe, Check, CheckCheck, Sparkles, MapPin, AlertCircle, FileText, BrainCircuit } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  sources?: any[];
  status?: 'sent' | 'delivered' | 'read';
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatbotProps {
    onClose: () => void;
    currentPage: string;
}

// --- 1. BASE DE CONOCIMIENTO MAESTRA (CEREBRO MGP - EXPANDIDO) ---
// Esta información contiene TODOS los detalles textuales de la aplicación.
const MGP_KNOWLEDGE_BASE = `
DATOS GENERALES Y CULTURA (Del Módulo 'Cultura y Legado'):
- Nombre: Industrias MGP.
- Sede Principal: Zona Industrial El Papayo, Ibagué, Tolima.
- CEO & Fundador: Carlos Martínez.
- Historia:
  * 2004: "El Comienzo Humilde". Inició en un garaje con una máquina de inyección.
  * 2005: Crisis financiera que casi lleva a la quiebra, superada por la calidad.
  * 2006: Primer cliente global ganado.
  * 2010: Expansión Nacional. Apertura de la primera planta real (de 5 a 50 empleados).
  * 2018: Premio a la Innovación en sostenibilidad y tecnología. Primera línea automatizada.
  * Hoy: Enfoque en mercados internacionales e IA.
- ADN MGP (Valores):
  * Misión: Crear soluciones que redefinan los estándares de la industria.
  * Visión 2030: Ser la planta más sostenible y tecnológica de Latam.
  * Valores: Integridad Radical (hacer lo correcto siempre), Obsesión por la Calidad, Trabajo en Equipo.
- Filosofía: "La jerarquía no está por encima de la buena idea".

CARTA DEL CEO (Del Módulo 'Carta del CEO'):
- Mensaje Clave: "No eres simplemente una nueva contratación; eres una pieza vital".
- Invitación: A desafiar el status quo, preguntar e innovar.
- Cita: "La excelencia no es un acto, sino un hábito".

INDUCCIÓN Y RE-INDUCCIÓN (Del Hub de Ingreso):
- Misiones Semana 1 (Inducción):
  1. Firma contrato digital (Legal, 10 min).
  2. Configura correo corporativo (TI, 15 min).
  3. Tour Virtual de Planta (Cultura, 20 min).
  4. Reunión con Mentor (Social, 30 min).
  5. Objetivos Mes 1 (Estrategia, 15 min).
- Re-Inducción (Actualizaciones):
  * Política de Datos v2.4: Acción requerida urgente (firmar antes del 30 de Octubre).
  * Protocolo LOTO v2.0: Nuevo estándar de seguridad.
  * Código de Ética 2024: Obligatorio anualmente.

SEGURIDAD INDUSTRIAL (SST) Y PLANTA (Del Centro de Seguridad):
- Regla de Oro: "Tu vida vale más que la producción".
- Código de Colores (Señalización):
  * VERDE: Rutas de Evacuación y camillas.
  * ROJO: Peligro / Incendio (Extintores).
  * AMARILLO: Precaución (Desniveles, maquinaria móvil).
  * AZUL: Obligatorio (Uso de EPP).
- Protocolos Clave:
  * LOTO (Lockout/Tagout): Bloqueo y etiquetado antes de reparar máquinas.
  * EPP Obligatorio: Casco, botas, gafas en zona amarilla.
  * Pare y Piense: Evalúe riesgo antes de actuar.
- Punto de Encuentro: Zona A (Parqueadero principal).
- Herramienta IA: "Reportero de Riesgos" permite subir fotos para análisis automático de peligros.

BIENESTAR Y BENEFICIOS (Del Módulo 'Bienestar y Vida'):
- Semana de la Salud MGP: Del 20 al 25 de Octubre (Chequeos gratis, masajes).
- Beneficios Permanentes:
  * Gimnasio: 50% de descuento en BodyTech.
  * Snacks: Fruta fresca gratis los martes.
  * Seguro de Vida: Cobertura del 100% para titulares.
  * Apoyo Psicológico: Línea de escucha 24/7 anónima.
- Hábitos Saludables Sugeridos: Beber 2L agua, Pausa activa AM/PM, Comer fruta.
- Próximos Eventos:
  * 15 Oct: Torneo de Fútbol 5 (6:00 PM, Canchas La 10).
  * 22 Oct: Taller Finanzas Personales (10:00 AM).
  * 31 Oct: Fiesta Halloween Corporativa (4:00 PM).

NÓMINA Y FINANZAS (Del Módulo 'Nómina'):
- Fechas de Pago: Días 15 y 30 de cada mes (antes de las 5:00 PM).
- Banco: Bancolombia (Convenio nómina).
- Reglas de Corte (Horas Extra/Novedades):
  * Para pago del 15: Corte el día 10.
  * Para pago del 30: Corte el día 25.
- Trámites Disponibles: Descarga de desprendibles, certificados laborales (con/sin sueldo), reporte de incapacidades (plazo 48h).

SELECCIÓN Y CONTRATACIÓN (Del Módulo 'Selección'):
- Fases del Proceso:
  1. Atracción y Filtro (IA).
  2. Evaluación Profunda (DISC, Reto Técnico, Entrevista STAR).
  3. Verificación (Antecedentes, Referencias 360).
  4. Decisión (Entrevista Gerencial).
- Documentos Requeridos (Repositorio Digital):
  * Cédula al 150%.
  * Diploma/Acta de Grado.
  * Certificados EPS y Pensión.
- Competencias Clave: Innovación, Integridad Radical, Trabajo Colaborativo, Resiliencia.

MANUAL DE ROLES (Del Módulo 'Manuales'):
- Perfil Operativo: Cumplimiento EPP, reporte de producción/hora, mantenimiento preventivo.
- Perfil Administrativo: Herramientas ofimáticas, gestión documental, KPIs mensuales.
`;

// --- 2. CONTEXTO POR PÁGINA ---
// Esto le dice al bot qué está viendo el usuario AHORA MISMO y qué sugerir.
const PAGE_CONTEXTS: Record<string, string> = {
    'home': 'El usuario está en el Dashboard. Ve su progreso (Inducción SST, Documentación), el video "Manifiesto MGP" y accesos rápidos a Nómina y Ubicación.',
    'onboarding.letter': 'El usuario está leyendo la Carta del CEO Carlos Martínez. Es un momento inspirador sobre el futuro y el legado.',
    'onboarding.checklist': 'El usuario está en el Hub de Inducción. Ve las misiones de la Semana 1 (Contrato, Correo, Tour) y la Guía de Señalización (Colores de planta).',
    'onboarding.reinduction': 'El usuario está en Re-Inducción. Ve alertas sobre la Política de Datos v2.4 y el Protocolo LOTO.',
    'hr.payroll': 'El usuario está en Nómina. Ve el calendario de pagos (15 y 30), aviso sobre cortes de horas extra y opción de descargar desprendibles.',
    'operations.safety': 'El usuario está en Seguridad (SST). Ve el mapa de la planta (Zona Operativa), KPIs de accidentes y el Reportero de Riesgos con IA.',
    'hr.preselection': 'El usuario está en Selección. Ve el workflow de 4 fases y el formulario para subir Cédula y Diplomas.',
    'operations.training': 'El usuario está en Academia MGP. Ve cursos como "Inducción Corporativa" (Obligatorio) y "Seguridad Industrial".',
    'onboarding.identity': 'El usuario está en Cultura. Ve la línea de tiempo (2004-Hoy), los valores y la sección "Voces de MGP".',
    'hr.wellbeing': 'El usuario está en Bienestar. Ve la Semana de la Salud (Oct 20-25), beneficios (Gimnasio, Frutas) y el Tracker de Hábitos.',
    'hr.manuals': 'El usuario está viendo los Manuales. Hay perfiles específicos para Operativos y Administrativos.',
    'ai.image': 'El usuario está en MGP Neural (Imágenes). Puede editar fotos con IA.',
    'ai.video': 'El usuario está en MGP Neural (Video). Puede analizar videos de capacitación.',
    'ai.strategy': 'El usuario está en MGP Neural (Estrategia). Puede resolver problemas complejos.',
};

const SYSTEM_INSTRUCTION_BASE = `
ERES "MGP Neural", la Inteligencia Artificial oficial y experta de Industrias MGP.
TU OBJETIVO: Asistir a los colaboradores con precisión absoluta basada en los datos de la empresa.

INSTRUCCIONES DE COMPORTAMIENTO:
1. **FUENTE DE VERDAD:** Usa EXCLUSIVAMENTE la "BASE DE CONOCIMIENTO MAESTRA" proporcionada abajo. Si la respuesta está ahí, úsala.
2. **UBICACIÓN:** Siempre ten en cuenta en qué página está el usuario (CONTEXTO ACTUAL) para dar respuestas más relevantes.
3. **ESTILO:** Eres profesional, tecnológico, empático y eficiente. Usas emojis ocasionalmente para ser amigable (🤖, 🚀, ✅).
4. **FORMATO:** Usa **Negritas** para fechas, nombres y datos críticos. Usa listas para pasos a seguir.
5. **LIMITACIÓN:** Si te preguntan algo fuera de la base de conocimiento (ej. "¿Quién ganó el mundial?"), responde cortésmente pero redirige al trabajo.
6. **PROACTIVIDAD:** Si el usuario está en una página específica (ej. Seguridad), ofrece ayuda relacionada (ej. "¿Quieres reportar un riesgo?").

BASE DE CONOCIMIENTO MAESTRA:
${MGP_KNOWLEDGE_BASE}
`;

const Chatbot: React.FC<ChatbotProps> = ({ onClose, currentPage }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'init-1', 
      sender: 'bot', 
      text: "¡Hola! Soy MGP Neural 🤖. Conozco toda la historia, procesos, beneficios y normas de seguridad de MGP. ¿En qué te puedo ayudar hoy?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = useCallback(async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isTyping) return;

    const messageId = Date.now().toString();
    
    // Add User Message
    setMessages(prev => [...prev, { 
        id: messageId, 
        sender: 'user', 
        text: textToSend, 
        status: 'sent',
        timestamp: new Date() 
    }]);
    setInput('');
    setIsTyping(true);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        // Context Injection logic
        const currentPageDescription = PAGE_CONTEXTS[currentPage] || 'El usuario está navegando por el portal general.';
        const fullSystemInstruction = `${SYSTEM_INSTRUCTION_BASE}\n\nCONTEXTO ACTUAL DEL USUARIO: ${currentPageDescription}`;

        const history = messages.slice(-10).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        const botId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, {
            id: botId,
            sender: 'bot',
            text: '', 
            status: 'read',
            timestamp: new Date(),
            isStreaming: true
        }]);

        const model = 'gemini-2.5-flash'; 
        const result = await ai.models.generateContentStream({
            model,
            contents: [...history, { role: 'user', parts: [{ text: textToSend }] }],
            config: {
                systemInstruction: fullSystemInstruction,
            }
        });

        let fullText = '';
        
        for await (const chunk of result) {
            const chunkText = chunk.text;
            if (chunkText) {
                fullText += chunkText;
                setMessages(prev => prev.map(m => 
                    m.id === botId ? { ...m, text: fullText } : m
                ));
            }
        }

        setMessages(prev => prev.map(m => 
            m.id === botId ? { ...m, isStreaming: false } : m
        ));

    } catch (error) {
        console.error('Bot Error:', error);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'bot',
            text: '⚠️ Lo siento, perdí conexión con el servidor central. Por favor intenta de nuevo.',
            timestamp: new Date()
        }]);
    } finally {
        setIsTyping(false);
    }

  }, [input, isTyping, messages, currentPage]);

  // Dynamic suggestions based on page
  const getSuggestions = () => {
      if (currentPage === 'hr.payroll') return ['¿Cuándo pagan?', 'Corte horas extra', 'Banco convenio'];
      if (currentPage === 'operations.safety') return ['Códigos de color', 'Reportar accidente', 'Regla de Oro'];
      if (currentPage === 'hr.wellbeing') return ['Beneficios', 'Semana de la Salud', 'Próximos eventos'];
      return ['¿Quién es el CEO?', 'Valores MGP', 'Fechas de pago', 'Seguridad Industrial'];
  };

  const suggestions = getSuggestions();

  return (
    <div className="w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col animate-fade-in-up mb-4 border border-slate-200 z-50 overflow-hidden font-sans">
      
      {/* Header */}
      <header className="bg-slate-900 p-4 flex items-center justify-between shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-[40px] opacity-20 transform translate-x-10 -translate-y-10"></div>
        <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
                    <BrainCircuit className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div>
                <h3 className="text-white font-bold text-lg leading-tight">MGP Neural</h3>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                    Conectado a Base Corporativa
                </div>
            </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors relative z-10 p-2 hover:bg-white/10 rounded-full">
            <X className="h-5 w-5" />
        </button>
      </header>
      
      {/* Page Context Indicator */}
      <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wide">
            <MapPin className="h-3 w-3 text-red-500" />
            Contexto: {currentPage.split('.')[1] || 'General'}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 scroll-smooth custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${msg.sender === 'user' ? 'bg-slate-200' : 'bg-white border border-slate-200'}`}>
                {msg.sender === 'user' ? <User className="h-4 w-4 text-slate-500" /> : <Bot className="h-4 w-4 text-red-600" />}
            </div>
            
            <div className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 shadow-sm text-sm leading-relaxed ${
                    msg.sender === 'user' 
                    ? 'bg-slate-900 text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-sm'
                }`}>
                    <p className="whitespace-pre-wrap markdown-body">
                        {msg.text}
                        {msg.isStreaming && <span className="inline-block w-1.5 h-4 align-middle bg-red-500 ml-1 animate-pulse"></span>}
                    </p>
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                     <span className="text-[10px] text-slate-400">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </span>
                     {msg.sender === 'user' && (
                         msg.status === 'read' ? <CheckCheck className="h-3 w-3 text-blue-500" /> : <Check className="h-3 w-3 text-slate-400" />
                     )}
                </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="bg-white border-t border-slate-200 p-4">
        {/* Contextual Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-1 scrollbar-hide">
            {suggestions.map((sugg, idx) => (
                <button 
                    key={idx}
                    onClick={() => handleSend(sugg)}
                    className="whitespace-nowrap px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full hover:bg-red-50 hover:text-red-600 transition-colors border border-transparent hover:border-red-100"
                >
                    {sugg}
                </button>
            ))}
        </div>

        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu consulta..."
            className="flex-1 bg-slate-100 border border-slate-200 text-slate-900 rounded-xl pl-4 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
            disabled={isTyping}
          />
          <button 
            onClick={() => handleSend()} 
            disabled={isTyping || !input.trim()} 
            className="p-3 bg-slate-900 text-white rounded-xl disabled:bg-slate-200 disabled:text-slate-400 hover:bg-red-600 transition-all shadow-md group"
          >
            {isTyping ? <Sparkles className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
