
import React, { useState } from 'react';
import { GraduationCap, ChevronRight, Play, X, ExternalLink, Star, RotateCcw, Check, Trophy, Send, Search, Clock, FileCheck, MessageSquareQuote, Lightbulb, Users, Lock, Fingerprint, HeartHandshake, ShieldCheck, Laptop, Globe } from 'lucide-react';

interface TrainingStep {
    type: 'intro' | 'message' | 'content' | 'quiz' | 'pledge' | 'finish';
    title: string;
    content?: string;
    image?: string;
    author?: string;
    role?: string;
    question?: string;
    options?: string[];
    correct?: number;
}

// --- EXPANDED DATA STRUCTURE (15+ STEPS PER MODULE) ---
const TRAINING_DATA: Record<string, TrainingStep[]> = {
    induction: [
        // PHASE 1: ORIGINS (Steps 1-3)
        {
            type: 'intro',
            title: "Capítulo 1: El Origen",
            content: "Bienvenido a Industrias MGP. \n\nPara entender hacia dónde vamos, primero debes entender de dónde venimos. No somos una corporación sin rostro; somos el resultado de 20 años de obsesión por la calidad. \n\nPrepárate para conocer el ADN que corre por nuestras máquinas y, ahora, por tus venas.",
            image: "https://picsum.photos/1200/600?sunrise"
        },
        {
            type: 'content',
            title: "2004: El Garaje",
            content: "Todo comenzó con una sola máquina de inyección y dos personas: Carlos Martínez y una visión inquebrantable. \n\nMientras otros buscaban abaratar costos, nosotros buscábamos la perfección. Esa decisión casi nos lleva a la quiebra en 2005, pero nos ganó la lealtad de nuestro primer cliente global en 2006. \n\nLección #1: La calidad es nuestra moneda de cambio.",
            image: "https://picsum.photos/1200/601?garage"
        },
        {
            type: 'message',
            title: "Mensaje de la Presidencia",
            content: "No te contratamos para llenar una silla. Te contratamos para que desafíes lo que hacemos. Si ves una forma mejor de hacer las cosas y no lo dices, nos estás fallando. Aquí, la jerarquía no está por encima de la buena idea.",
            author: "Carlos Martínez",
            role: "CEO & Fundador",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        
        // PHASE 2: VALUES (Steps 4-6)
        {
            type: 'content',
            title: "Filosofía: Integridad Radical",
            content: "En MGP practicamos la 'Integridad Radical'. \n\nSignifica hacer lo correcto incluso cuando nadie está mirando, incluso cuando cuesta dinero. Si una pieza tiene un defecto microscópico, se descarta. No hay zonas grises. \n\nNuestros clientes duermen tranquilos porque nosotros no dormimos hasta que el trabajo es perfecto.",
            image: "https://picsum.photos/1200/602?structure"
        },
        {
            type: 'content',
            title: "Obsesión por el Cliente",
            content: "No vendemos productos, vendemos confianza. Cada caja que sale de esta planta lleva tu nombre invisiblemente firmado en ella. \n\nSi el cliente tiene éxito, nosotros tenemos éxito. Es una simbiosis simple pero poderosa que ha mantenido nuestras luces encendidas por dos décadas.",
            image: "https://picsum.photos/1200/603?handshake"
        },
        {
            type: 'quiz',
            title: "Checkpoint de Cultura",
            question: "Detectas un error en un lote de producción urgente. Si lo reportas, el envío se retrasará 2 días. ¿Qué haces?",
            options: ["Lo dejo pasar, es un error pequeño", "Lo reporto inmediatamente, la calidad es primero", "Intento arreglarlo sin decirle a nadie", "Consulto si el cliente notará el error"],
            correct: 1
        },

        // PHASE 3: SAFETY & OPERATIONS (Steps 7-10)
        {
            type: 'intro',
            title: "Capítulo 2: Operaciones",
            content: "Entrar a nuestra planta es entrar a un ecosistema de precisión. Aquí conviven humanos y robots en una danza sincronizada. Pero hay una regla que gobierna sobre la productividad: Tu Vida.",
            image: "https://picsum.photos/1200/603?factory"
        },
        {
            type: 'message',
            title: "Desde la Planta",
            content: "En casa me esperan dos hijas. Por eso, yo no toco una máquina si no he verificado el bloqueo LOTO. Aquí nos cuidamos las espaldas. Si ves a un compañero sin gafas, es tu deber corregirlo. Eso es compañerismo real.",
            author: "Sofía Ramírez",
            role: "Directora de Operaciones",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            type: 'content',
            title: "Regla de Oro: Seguridad",
            content: "1. **Pare y Piense:** Antes de actuar, evalúe el riesgo.\n2. **EPP No Negociable:** Casco, botas y gafas son tu segunda piel.\n3. **Reporte Inmediato:** Un incidente no reportado es un accidente futuro esperando ocurrir.\n\nEn MGP, detener la línea por seguridad no se castiga, se aplaude.",
            image: "https://picsum.photos/1200/604?safety"
        },
        {
            type: 'quiz',
            title: "Decisión Crítica",
            question: "Un sensor de la máquina falla. Puedes anularlo manualmente para seguir produciendo. ¿Qué haces?",
            options: ["Lo anulo con cuidado", "Llamo a mantenimiento y detengo la operación", "Le pregunto al compañero más antiguo", "Sigo trabajando con precaución"],
            correct: 1
        },

        // PHASE 4: INNOVATION & GROWTH (Steps 11-13)
        {
            type: 'content',
            title: "MGP Neural & Innovación",
            content: "No somos solo manufactura; somos tecnología. Utilizamos IA para predecir fallos, visión artificial para control de calidad y analítica de datos para logística. \n\nTú tienes acceso a estas herramientas. Úsalas. No queremos que trabajes más duro, queremos que trabajes con más inteligencia.",
            image: "https://picsum.photos/1200/605?robot"
        },
        {
            type: 'content',
            title: "Meritocracia y Crecimiento",
            content: "Aquí no asciende el que más tiempo lleva, sino el que más valor aporta. \n\nEl 80% de nuestros gerentes empezaron en cargos operativos o junior. Tenemos becas, planes de carrera y mentorías. Tu techo lo defines tú.",
            image: "https://picsum.photos/1200/606?stairs"
        },
        {
            type: 'quiz',
            title: "Mentalidad de Crecimiento",
            question: "¿Qué se valora más para un ascenso en MGP?",
            options: ["La antigüedad en la empresa", "Llevarse bien con el jefe", "El aporte de valor y la innovación", "Cumplir el horario estrictamente"],
            correct: 2
        },

        // PHASE 5: COMMITMENT (Steps 14-15)
        {
            type: 'pledge',
            title: "Tu Compromiso",
            content: "Al finalizar esta inducción, aceptas vivir los valores de MGP: Integridad, Seguridad e Innovación. \n\n¿Estás listo para dejar tu huella?",
            image: "https://picsum.photos/1200/608?handshake"
        },
        {
            type: 'finish',
            title: "¡Bienvenido a Bordo!",
            content: "Has completado tu inducción. Es hora de ponerte las botas y construir el futuro.",
            image: "https://picsum.photos/1200/609?celebration"
        }
    ],
    safety: [
        { type: 'intro', title: "SST: Tu Escudo de Vida", content: "La seguridad no es un manual, es una mentalidad. En este módulo aprenderás las reglas que garantizan que vuelvas a casa sano y salvo cada día.", image: "https://picsum.photos/1200/600?shield" },
        { type: 'message', title: "Palabras del Experto", content: "Un segundo de distracción puede costar un dedo, un ojo o una vida. No hay 'pero' que valga cuando se trata de tu integridad física.", author: "Ing. Pedro Costa", role: "Jefe HSEQ", image: "https://randomuser.me/api/portraits/men/45.jpg" },
        { type: 'content', title: "Matriz de Peligros", content: "Identifica los peligros: Mecánico (atrapamiento), Eléctrico (alta tensión), Locativo (caídas), y Químico (sustancias). Saber dónde está el enemigo es la mitad de la batalla.", image: "https://picsum.photos/1200/601?danger" },
        { type: 'content', title: "EPP: Tu Armadura", content: "El Equipo de Protección Personal es tu última barrera. \n1. Casco: Golpes verticales.\n2. Gafas: Proyección de partículas.\n3. Botas: Aplastamiento y resbalones.\n4. Protectores Auditivos: Ruido > 80dB.", image: "https://picsum.photos/1200/602?helmet" },
        { type: 'quiz', title: "Reconocimiento de EPP", question: "¿Qué EPP es obligatorio en la zona de mecanizado?", options: ["Solo guantes", "Gafas de seguridad y protección auditiva", "Mascarilla", "Chaleco reflectivo"], correct: 1 },
        { type: 'content', title: "Bloqueo y Etiquetado (LOTO)", content: "Energía Cero. Antes de meter la mano en una máquina, debes apagarla, bloquear la fuente de energía con tu candado personal y verificar que no enciende. Tu llave es tu vida.", image: "https://picsum.photos/1200/603?lock" },
        { type: 'content', title: "Trabajo en Alturas", content: "Cualquier trabajo por encima de 1.50m requiere permiso, arnés y línea de vida. No hay héroes en las alturas, solo profesionales asegurados.", image: "https://picsum.photos/1200/604?height" },
        { type: 'quiz', title: "Caso Práctico LOTO", question: "Vas a cambiar una cuchilla. La máquina está apagada. ¿Qué haces?", options: ["Cambio la cuchilla rápido", "Pongo un cartel de 'No Tocar'", "Aplico bloqueo LOTO con mi candado y pruebo encendido", "Le aviso a mi compañero"], correct: 2 },
        { type: 'content', title: "Manejo de Químicos", content: "Cada sustancia tiene una hoja de seguridad (MSDS). Nunca trasvases químicos a botellas de bebidas. Si no sabes qué es, no lo toques.", image: "https://picsum.photos/1200/605?chemistry" },
        { type: 'content', title: "Riesgo Biomecánico", content: "Cuida tu espalda. Levanta cargas doblando las rodillas, no la cintura. Cargas mayores a 25kg requieren ayuda mecánica o de un compañero.", image: "https://picsum.photos/1200/606?lifting" },
        { type: 'message', title: "Cultura de Reporte", content: "Si ves un cable pelado y no dices nada, eres cómplice del accidente que le ocurra al siguiente. Reportar no es acusar, es proteger.", author: "María Gómez", role: "Vigía SST", image: "https://randomuser.me/api/portraits/women/22.jpg" },
        { type: 'content', title: "Plan de Emergencias", content: "Al escuchar la alarma continua: \n1. Conserva la calma.\n2. Detén tu máquina.\n3. Sal por la ruta VERDE.\n4. Llega al Punto de Encuentro A.", image: "https://picsum.photos/1200/607?exit" },
        { type: 'quiz', title: "Evacuación", question: "¿Cuál es el color de las rutas de evacuación?", options: ["Rojo", "Amarillo", "Verde", "Azul"], correct: 2 },
        { type: 'pledge', title: "Promesa de Autocuidado", content: "Prometo que ninguna meta de producción valdrá más que mi seguridad o la de mis compañeros. Me comprometo a llegar a casa sano cada día.", image: "https://picsum.photos/1200/608?family" },
        { type: 'finish', title: "Certificado SST", content: "Has demostrado tu compromiso con la seguridad. Eres oficialmente apto para ingresar a planta.", image: "https://picsum.photos/1200/609?medal" }
    ],
    digital: [
        { type: 'intro', title: "Ecosistema Digital MGP", content: "En MGP no usamos papel. Usamos datos. Este módulo te convertirá en un experto de nuestras herramientas digitales.", image: "https://picsum.photos/1200/600?digital" },
        { type: 'content', title: "El ERP: El Cerebro", content: "SAP Business One es nuestro sistema central. Aquí registras tiempos, solicitas materiales y gestionas vacaciones. Si no está en SAP, no existe.", image: "https://picsum.photos/1200/601?code" },
        { type: 'quiz', title: "Uso del ERP", question: "¿Dónde debes registrar tu entrada de material?", options: ["En una libreta", "En SAP Business One", "Por WhatsApp al jefe", "En Excel"], correct: 1 },
        { type: 'content', title: "Correo Corporativo", content: "Tu email es tu identidad oficial. Úsalo para todo comunicado formal. \nRegla: No abras adjuntos .exe o .zip de remitentes desconocidos.", image: "https://picsum.photos/1200/602?email" },
        { type: 'content', title: "Ciberseguridad: Phishing", content: "Los hackers no atacan firewalls, atacan personas. Si recibes un correo urgente pidiendo tu contraseña, es una trampa. MGP nunca pedirá tu clave por correo.", image: "https://picsum.photos/1200/603?hacker" },
        { type: 'message', title: "Seguridad de la Info", content: "Nuestros planos y fórmulas son nuestro tesoro. Compartir información confidencial fuera de la empresa es causal de despido inmediato.", author: "David IT", role: "CISO", image: "https://randomuser.me/api/portraits/men/88.jpg" },
        { type: 'content', title: "Gestión de Contraseñas", content: "Usa frases, no palabras. 'MiPerroFido123' es mala. 'MeGustaComerPizzaLosViernes!' es excelente. Nunca la escribas en un post-it.", image: "https://picsum.photos/1200/604?password" },
        { type: 'content', title: "Slack & Comunicación", content: "Usamos Slack para el día a día. \nCanales públicos: Información general. \nDM: Consultas rápidas. \nMantén el tono profesional pero ágil.", image: "https://picsum.photos/1200/605?chat" },
        { type: 'quiz', title: "Seguridad Digital", question: "¿Qué haces si recibes un email sospechoso?", options: ["Lo abro por curiosidad", "Lo reenvío a todos", "Lo reporto a TI como Phishing", "Lo borro y ya"], correct: 2 },
        { type: 'content', title: "La Nube (Drive)", content: "Todos los archivos deben guardarse en la nube corporativa, no en tu escritorio local. Si tu PC se daña, la nube salva tu trabajo.", image: "https://picsum.photos/1200/606?cloud" },
        { type: 'content', title: "MGP Neural (IA)", content: "Tienes acceso a nuestros bots de IA. Úsalos para resumir textos, analizar datos o generar ideas. No ingreses datos personales de clientes en la IA.", image: "https://picsum.photos/1200/607?ai" },
        { type: 'content', title: "Soporte TI", content: "La mesa de ayuda funciona mediante tickets. No llames al celular del ingeniero a menos que sea una emergencia crítica (servidor caído).", image: "https://picsum.photos/1200/608?support" },
        { type: 'quiz', title: "Respaldo", question: "¿Dónde guardas tus archivos importantes?", options: ["En el Escritorio", "En Mis Documentos", "En Google Drive Corporativo", "En una USB"], correct: 2 },
        { type: 'pledge', title: "Pacto Digital", content: "Me comprometo a proteger los activos digitales de MGP y a usar la tecnología de manera ética y productiva.", image: "https://picsum.photos/1200/608?matrix" },
        { type: 'finish', title: "Ciudadano Digital", content: "Estás listo para navegar en nuestro ecosistema tecnológico.", image: "https://picsum.photos/1200/609?network" }
    ],
    culture: [
        { type: 'intro', title: "Cultura MGP: Nuestro ADN", content: "Las empresas no son edificios, son personas. Este módulo define cómo interactuamos, cómo resolvemos conflictos y cómo vivimos juntos.", image: "https://picsum.photos/1200/600?team" },
        { type: 'content', title: "Respeto Absoluto", content: "No toleramos discriminación, acoso o burlas. Aquí se valora a la persona por sus ideas y su trabajo, no por su género, raza o creencia.", image: "https://picsum.photos/1200/601?diverse" },
        { type: 'content', title: "Comunicación Asertiva", content: "Se duro con los problemas, suave con las personas. Hablamos de frente, sin chismes de pasillo. Si tienes un problema con alguien, háblalo con esa persona primero.", image: "https://picsum.photos/1200/602?talk" },
        { type: 'message', title: "Clima Laboral", content: "Pasamos más tiempo aquí que en casa. Hagamos de este lugar un sitio donde valga la pena estar. Un 'buenos días' cambia todo.", author: "Ana RRHH", role: "Gerente Humana", image: "https://randomuser.me/api/portraits/women/65.jpg" },
        { type: 'quiz', title: "Conflicto", question: "Tienes un desacuerdo con un compañero. ¿Qué haces?", options: ["Me quejo con otros", "Lo ignoro", "Lo invito a hablar en privado y resolverlo", "Le envío un correo agresivo"], correct: 2 },
        { type: 'content', title: "Código de Vestimenta", content: "Oficina: Business Casual (lunes a jueves), Jeans (viernes). \nPlanta: Uniforme completo y limpio. Tu imagen habla de la calidad de tu trabajo.", image: "https://picsum.photos/1200/603?clothing" },
        { type: 'content', title: "Puntualidad", content: "Llegar a tiempo es respetar el tiempo de los demás. Las reuniones empiezan a la hora en punto. 5 minutos antes es estar a tiempo.", image: "https://picsum.photos/1200/604?clock" },
        { type: 'content', title: "Espacios Comunes", content: "La cocina y los baños son de todos. Déjalos como te gustaría encontrarlos. Lava tu taza. No dejes comida vieja en la nevera.", image: "https://picsum.photos/1200/605?kitchen" },
        { type: 'quiz', title: "Convivencia", question: "Terminas de almorzar. ¿Qué haces con tu plato?", options: ["Lo dejo en la mesa", "Lo pongo en el lavaplatos sucio", "Lo lavo y lo guardo", "Espero que el personal de aseo lo recoja"], correct: 2 },
        { type: 'content', title: "Política de Puertas Abiertas", content: "Puedes hablar con cualquier gerente, incluido el CEO, si tienes una idea o una preocupación grave. La burocracia no debe matar la innovación.", image: "https://picsum.photos/1200/606?door" },
        { type: 'content', title: "Sostenibilidad", content: "Apaga la luz si eres el último. Imprime solo si es vital. Separa los residuos. Somos una empresa verde.", image: "https://picsum.photos/1200/607?eco" },
        { type: 'content', title: "Celebraciones", content: "Celebramos los logros. Los cumpleaños del mes, los récords de producción y los aniversarios. Somos un equipo que sabe ganar.", image: "https://picsum.photos/1200/608?party" },
        { type: 'quiz', title: "Sostenibilidad", question: "¿Qué hacemos con el papel?", options: ["Todo a la basura normal", "Imprimimos todo por si acaso", "Evitamos imprimir y reciclamos", "Lo quemamos"], correct: 2 },
        { type: 'pledge', title: "Pacto de Convivencia", content: "Me comprometo a ser un compañero respetuoso, puntual y positivo. Aporto soluciones, no problemas.", image: "https://picsum.photos/1200/608?hug" },
        { type: 'finish', title: "Embajador Cultural", content: "Ahora eres guardián de nuestra cultura. Contagia tu energía.", image: "https://picsum.photos/1200/609?friends" }
    ]
};

interface TrainingPageProps {
    onTriggerReward?: (type: '🥾' | '🏆' | '⭐') => void;
}

const TrainingPage: React.FC<TrainingPageProps> = ({ onTriggerReward }) => {
  const [activeTab, setActiveTab] = useState<'explore' | 'history' | 'request'>('explore');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<{correct: boolean, selected: number | null}>({ correct: false, selected: null });

  const activeSteps = activeModuleId ? TRAINING_DATA[activeModuleId] : null;
  const currentStep = activeSteps ? activeSteps[currentStepIndex] : null;

  const startTraining = (id: string) => {
    setActiveModuleId(id);
    setCurrentStepIndex(0);
    setQuizAnswered({ correct: false, selected: null });
  };

  const handleNext = () => {
      if (!activeSteps) return;

      // TRIGGER REWARD LOGIC ON FINISH
      if (activeSteps[currentStepIndex + 1]?.type === 'finish') {
          if (onTriggerReward) {
              // BOOTS FOR INDUCTION, TROPHIES FOR OTHERS
              if (activeModuleId === 'induction') {
                  onTriggerReward('🥾');
              } else {
                  onTriggerReward('🏆');
              }
          }
      }

      if (currentStepIndex < activeSteps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
          setQuizAnswered({ correct: false, selected: null });
      } else {
          setActiveModuleId(null); // Close modal
      }
  };

  const handleQuizOption = (idx: number) => {
      if (!currentStep || currentStep.type !== 'quiz') return;
      const isCorrect = idx === currentStep.correct;
      setQuizAnswered({ correct: isCorrect, selected: idx });
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Academia MGP</h1>
            <p className="text-lg text-slate-500 mt-2">Plataforma de desarrollo profesional continuo.</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <TabButton active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} label="Explorar" icon={<Search className="h-4 w-4"/>} />
              <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')} label="Mis Cursos" icon={<FileCheck className="h-4 w-4"/>} />
              <TabButton active={activeTab === 'request'} onClick={() => setActiveTab('request')} label="Solicitar" icon={<Send className="h-4 w-4"/>} />
          </div>
      </div>

      {/* CONTENT: EXPLORE */}
      {activeTab === 'explore' && (
          <div className="space-y-12 animate-fade-in">
                
                {/* Hero Course (Induction) */}
                <div onClick={() => startTraining('induction')} className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px] group cursor-pointer border border-slate-800">
                    <img src="https://picsum.photos/1200/600?sunrise" alt="Induction" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-50 group-hover:brightness-75" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-8 left-8">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-red-900/50">Obligatorio</span>
                    </div>

                    <div className="absolute bottom-0 left-0 p-12 max-w-3xl">
                        <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">Inducción Corporativa MGP</h2>
                        <p className="text-slate-200 text-xl mb-8 font-light">
                            Tu punto de partida. 15 pasos para conocer nuestro ADN, validar tus conocimientos y recibir tus botas oficiales.
                        </p>
                        <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-3 text-lg">
                            <Play className="h-6 w-6 fill-current" /> Iniciar Experiencia
                        </button>
                    </div>
                </div>
                
                {/* Secondary Modules (UNLOCKED) */}
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Lightbulb className="h-6 w-6 text-yellow-500" /> Cursos Esenciales
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <CourseCard 
                            title="Seguridad Industrial (SST)" 
                            desc="Protocolos LOTO, EPP y trabajo en alturas. Tu vida es primero."
                            duration="45 min" 
                            rating={5.0} 
                            image="https://picsum.photos/500/301?factory" 
                            onClick={() => startTraining('safety')} 
                            icon={<ShieldCheck className="h-5 w-5 text-green-500" />}
                        />
                        <CourseCard 
                            title="Herramientas Digitales" 
                            desc="Domina el ERP, Ciberseguridad y el ecosistema Cloud MGP."
                            duration="30 min" 
                            rating={4.8} 
                            image="https://picsum.photos/500/302?tech" 
                            onClick={() => startTraining('digital')} 
                            icon={<Laptop className="h-5 w-5 text-blue-500" />}
                        />
                         <CourseCard 
                            title="Cultura y Ética" 
                            desc="Normas de convivencia, respeto y código de vestimenta."
                            duration="25 min" 
                            rating={4.9} 
                            image="https://picsum.photos/500/303?team" 
                            onClick={() => startTraining('culture')} 
                            icon={<Globe className="h-5 w-5 text-purple-500" />}
                        />
                    </div>
                </div>

                {/* Coming Soon Section */}
                <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200 border-dashed text-center">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Clock className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-600">Nuevas Capacitaciones en Camino</h3>
                    <p className="text-slate-500 mt-2 max-w-md mx-auto">
                        Estamos desarrollando módulos sobre <b>Liderazgo Ágil</b> y <b>Gestión de Residuos</b>. Se habilitarán automáticamente aquí.
                    </p>
                    <button onClick={() => setActiveTab('request')} className="mt-6 text-red-600 font-bold hover:text-red-700 underline">
                        ¿Necesitas un tema específico? Solicítalo aquí.
                    </button>
                </div>
          </div>
      )}

      {/* CONTENT: HISTORY & REQUEST */}
      {activeTab === 'history' && <div className="p-12 text-center text-slate-500">Historial de cursos completados...</div>}
      {activeTab === 'request' && <div className="p-12 text-center text-slate-500">Formulario de solicitud...</div>}

      {/* --- PREMIUM TRAINING MODAL --- */}
      {activeModuleId && currentStep && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] animate-fade-in relative">
                
                {/* Progress Bar */}
                <div className="h-2 bg-slate-100 w-full">
                    <div 
                        className="h-full bg-red-600 transition-all duration-500" 
                        style={{ width: `${((currentStepIndex + 1) / (activeSteps?.length || 1)) * 100}%` }}
                    ></div>
                </div>

                <button onClick={() => setActiveModuleId(null)} className="absolute top-6 right-6 z-50 bg-black/10 hover:bg-black/20 text-slate-900 p-2 rounded-full transition-colors">
                    <X className="h-6 w-6" />
                </button>

                <div className="flex-1 overflow-y-auto">
                    {/* Content Logic Switcher */}
                    
                    {/* TYPE: INTRO, CONTENT or PLEDGE */}
                    {(currentStep.type === 'intro' || currentStep.type === 'content' || currentStep.type === 'pledge') && (
                        <div>
                             <div className="relative h-80 w-full">
                                <img src={currentStep.image} alt={currentStep.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-10">
                                    <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-2 block">
                                        {currentStep.type === 'intro' ? 'Inicio del Módulo' : currentStep.type === 'pledge' ? 'Compromiso Final' : 'Lección'}
                                    </span>
                                    <h2 className="text-4xl font-extrabold text-slate-900">{currentStep.title}</h2>
                                </div>
                            </div>
                            <div className="p-10 max-w-3xl mx-auto text-center md:text-left">
                                <p className="text-xl text-slate-600 leading-relaxed whitespace-pre-line mb-8">
                                    {currentStep.content}
                                </p>
                                
                                {currentStep.type === 'pledge' && (
                                    <div className="flex justify-center py-6">
                                        <button 
                                            onClick={handleNext}
                                            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-600 transition-all shadow-xl flex items-center gap-3 transform hover:scale-105"
                                        >
                                            <Fingerprint className="h-6 w-6" />
                                            Firmo mi Compromiso
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* TYPE: MESSAGE (LEADERSHIP VOICE) */}
                    {currentStep.type === 'message' && (
                         <div className="h-full flex items-center justify-center bg-slate-50 p-12">
                             <div className="max-w-4xl w-full grid md:grid-cols-3 gap-8 items-center">
                                 <div className="md:col-span-1">
                                     <img src={currentStep.image} alt={currentStep.author} className="w-full aspect-square object-cover rounded-3xl shadow-xl rotate-3 border-4 border-white" />
                                 </div>
                                 <div className="md:col-span-2 relative">
                                     <MessageSquareQuote className="absolute -top-10 -left-6 h-20 w-20 text-slate-200" />
                                     <blockquote className="text-2xl font-serif text-slate-800 italic leading-relaxed relative z-10 mb-6">
                                         "{currentStep.content}"
                                     </blockquote>
                                     <div>
                                         <p className="font-bold text-slate-900 text-lg">{currentStep.author}</p>
                                         <p className="text-red-600 font-medium">{currentStep.role}</p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    )}

                    {/* TYPE: QUIZ */}
                    {currentStep.type === 'quiz' && (
                        <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50">
                            <div className="max-w-2xl w-full text-center">
                                <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600">
                                    <Lightbulb className="h-10 w-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-8">{currentStep.question}</h3>
                                <div className="grid gap-4">
                                    {currentStep.options?.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            disabled={quizAnswered.selected !== null}
                                            onClick={() => handleQuizOption(idx)}
                                            className={`p-6 text-lg font-medium rounded-xl border-2 transition-all text-left flex justify-between items-center ${
                                                quizAnswered.selected === idx
                                                    ? (quizAnswered.correct ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-500 bg-red-50 text-red-800')
                                                    : 'border-white bg-white hover:border-blue-200 text-slate-700 shadow-sm'
                                            }`}
                                        >
                                            {opt}
                                            {quizAnswered.selected === idx && (
                                                quizAnswered.correct ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TYPE: FINISH */}
                    {currentStep.type === 'finish' && (
                        <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white relative overflow-hidden">
                             {/* Confetti / Celebration Visuals */}
                             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/confetti.png')] opacity-10"></div>
                             
                             <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-8 animate-bounce text-yellow-600 relative z-10">
                                <Trophy className="h-16 w-16" />
                             </div>
                             <h2 className="text-5xl font-extrabold text-slate-900 mb-4 relative z-10">{currentStep.title}</h2>
                             <p className="text-xl text-slate-500 max-w-lg mx-auto relative z-10">{currentStep.content}</p>
                             
                             <div className="mt-8 flex gap-4 relative z-10">
                                 <button onClick={() => setActiveModuleId(null)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all">
                                     Volver al Catálogo
                                 </button>
                             </div>
                        </div>
                    )}

                </div>

                {/* Footer Controls (Hidden for Pledge/Finish to force specific actions) */}
                {currentStep.type !== 'pledge' && currentStep.type !== 'finish' && (
                    <div className="p-8 bg-white border-t border-slate-100 flex justify-between items-center">
                        <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">
                            Paso {currentStepIndex + 1} de {activeSteps?.length}
                        </span>
                        
                        <button 
                            onClick={handleNext}
                            disabled={currentStep.type === 'quiz' && quizAnswered.selected === null}
                            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
                                currentStep.type === 'quiz' && quizAnswered.selected === null 
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                : 'bg-slate-900 text-white hover:bg-red-600 hover:shadow-red-500/30'
                            }`}
                        >
                            Continuar
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
    <button 
        onClick={onClick} 
        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${active ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
    >
        {icon} {label}
    </button>
)

const CourseCard: React.FC<{ title: string; desc: string; duration: string; rating: number; image: string; onClick: () => void; isLocked?: boolean; icon?: React.ReactNode }> = ({ title, desc, duration, rating, image, onClick, isLocked, icon }) => (
    <div onClick={isLocked ? undefined : onClick} className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 transition-all duration-300 group relative ${isLocked ? 'opacity-70 grayscale' : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'}`}>
        {isLocked && (
            <div className="absolute inset-0 bg-slate-100/50 z-10 flex items-center justify-center backdrop-blur-[1px]">
                <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-slate-500 font-bold text-sm">
                    <Lock className="h-4 w-4" /> Próximamente
                </div>
            </div>
        )}
        <div className="h-48 overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {rating}
            </div>
            {icon && (
                <div className="absolute bottom-3 left-3 bg-white p-2 rounded-lg shadow-md">
                    {icon}
                </div>
            )}
        </div>
        <div className="p-6">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-xl text-slate-900 group-hover:text-red-600 transition-colors">{title}</h4>
            </div>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{desc}</p>
            <div className="flex items-center text-xs font-bold text-slate-400 gap-4 uppercase tracking-wider">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {duration}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" /> MGP Academy</span>
            </div>
        </div>
    </div>
);

export default TrainingPage;
