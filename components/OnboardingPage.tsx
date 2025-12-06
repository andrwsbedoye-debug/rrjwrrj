import React, { useState } from 'react';
import { CheckCircle, Circle, Download, Briefcase, MapPin, AlertTriangle, ShieldCheck, FileText, Users, RefreshCcw, Lock, PenTool, CheckCircle2, ChevronRight, AlertCircle, Info, Footprints, Flame } from 'lucide-react';

const TASKS_INDUCTION = [
  { id: 1, text: "Firma tu contrato digital", type: 'Legal', time: '10 min' },
  { id: 2, text: "Configura tu correo corporativo", type: 'TI', time: '15 min' },
  { id: 3, text: "Tour Virtual de Planta", type: 'Cultura', time: '20 min' },
  { id: 4, text: "Reunión con Mentor", type: 'Social', time: '30 min' },
  { id: 5, text: "Objetivos Mes 1", type: 'Estrategia', time: '15 min' }
];

const TASKS_REINDUCTION = [
    { id: 1, text: "Actualización Política de Datos", type: 'Legal', time: 'Urgent', status: 'pending' },
    { id: 2, text: "Protocolo LOTO v2.0", type: 'Seguridad', time: 'New', status: 'pending' },
    { id: 3, text: "Código de Ética 2024", type: 'Cultura', time: 'Annual', status: 'done' }
];

type HubMode = 'induction' | 'reinduction';

const OnboardingPage: React.FC = () => {
  const [mode, setMode] = useState<HubMode>('induction');
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [signedPolicy, setSignedPolicy] = useState(false);

  const toggleTask = (taskId: number) => {
    setCompletedTasks(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const progress = Math.round((completedTasks.length / TASKS_INDUCTION.length) * 100);

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Dynamic Header */}
      <div className="relative bg-slate-900 rounded-3xl p-1 overflow-hidden shadow-2xl">
          {/* Toggle Switch */}
          <div className="absolute top-6 right-6 z-20 bg-slate-800 p-1 rounded-xl flex border border-slate-700">
               <button 
                  onClick={() => setMode('induction')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${mode === 'induction' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'}`}
               >
                   <Briefcase className="h-4 w-4" /> Inducción
               </button>
               <button 
                  onClick={() => setMode('reinduction')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${mode === 'reinduction' ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
               >
                   <RefreshCcw className="h-4 w-4" /> Re-Inducción
               </button>
          </div>

          <div className="p-10 relative z-10 text-white">
              {mode === 'induction' ? (
                  <div className="max-w-2xl animate-fade-in">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Etapa 1: Onboarding</span>
                        <span className="text-slate-400 text-sm flex items-center gap-1"><MapPin className="h-3 w-3"/> Ibagué HQ</span>
                      </div>
                      <h1 className="text-5xl font-extrabold mb-4 leading-tight">Tu Legado Comienza <span className="text-blue-400">Aquí.</span></h1>
                      <p className="text-slate-300 text-lg leading-relaxed">
                          Bienvenido a MGP. Esta es tu hoja de ruta inicial. Completa las misiones, conoce el terreno y prepárate para impactar.
                      </p>
                  </div>
              ) : (
                  <div className="max-w-2xl animate-fade-in">
                       <div className="flex items-center gap-3 mb-2">
                        <span className="bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">Acción Requerida</span>
                        <span className="text-slate-400 text-sm">Ciclo 2024-2025</span>
                      </div>
                      <h1 className="text-5xl font-extrabold mb-4 leading-tight">Mantente a la <span className="text-red-500">Vanguardia.</span></h1>
                      <p className="text-slate-300 text-lg leading-relaxed">
                          La industria evoluciona, y nosotros también. Aquí encontrarás actualizaciones críticas de procesos, renovación de certificaciones y nuevas políticas.
                      </p>
                  </div>
              )}
          </div>
          
          {/* Background Decor */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className={`absolute -right-20 -bottom-40 w-96 h-96 rounded-full filter blur-[100px] opacity-30 transition-colors duration-700 ${mode === 'induction' ? 'bg-blue-500' : 'bg-red-600'}`}></div>
      </div>

      {/* --- INDUCTION MODE CONTENT --- */}
      {mode === 'induction' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
             <div className="lg:col-span-7 space-y-6">
                {/* Gamified Checklist */}
                <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-blue-600" />
                            Misiones de la Semana 1
                        </h2>
                        <span className="text-3xl font-black text-slate-200">{progress}%</span>
                    </div>
                    
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
                        <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                    </div>

                    <div className="space-y-3">
                        {TASKS_INDUCTION.map(task => (
                            <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                                completedTasks.includes(task.id) 
                                    ? 'bg-slate-50 border-slate-100 opacity-60' 
                                    : 'bg-white border-slate-100 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10'
                            }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                                        completedTasks.includes(task.id) ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-300 group-hover:bg-blue-100 group-hover:text-blue-600'
                                    }`}>
                                        {completedTasks.includes(task.id) ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                                    </div>
                                    <span className={`font-medium ${completedTasks.includes(task.id) ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                        {task.text}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">{task.time}</span>
                                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">{task.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Structure */}
                <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Users className="h-6 w-6 text-slate-900"/> Estructura de Mando
                    </h2>
                    <div className="relative rounded-xl overflow-hidden group cursor-zoom-in h-48 bg-slate-100 flex items-center justify-center">
                        <div className="text-center">
                            <Users className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                            <span className="text-slate-400 font-medium text-sm">Organigrama Interactivo</span>
                        </div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30"></div>
                    </div>
                </div>
             </div>

             <div className="lg:col-span-5 space-y-6">
                 <SignageGuide />
                 <DocumentLibrary mode="induction" />
             </div>
          </div>
      )}

      {/* --- REINDUCTION MODE CONTENT --- */}
      {mode === 'reinduction' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
              {/* Left Column: Alerts & Actions */}
              <div className="lg:col-span-4 space-y-6">
                  {/* Compliance Score */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-8 border-yellow-100 bg-white mb-4">
                            <span className="text-3xl font-black text-yellow-500">85%</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Estado de Cumplimiento</h3>
                        <p className="text-slate-500 text-sm mt-2">Tienes 2 módulos pendientes para estar al 100%.</p>
                      </div>
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                  </div>

                  {/* Critical Action Card */}
                  <div className="bg-red-50 border border-red-100 p-6 rounded-3xl">
                      <div className="flex items-start gap-4">
                          <div className="bg-white p-3 rounded-xl shadow-sm text-red-600">
                              <AlertTriangle className="h-6 w-6" />
                          </div>
                          <div>
                              <h4 className="font-bold text-red-900">Acción Requerida</h4>
                              <p className="text-red-700 text-sm mt-1 leading-relaxed">
                                  La política de tratamiento de datos ha cambiado. Debes leer y firmar la nueva versión antes del 30 de Octubre.
                              </p>
                          </div>
                      </div>
                      <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-red-500/20">
                          Revisar y Firmar
                      </button>
                  </div>
              </div>

              {/* Right Column: Content */}
              <div className="lg:col-span-8 space-y-6">
                  {/* Signature Simulation Widget */}
                  <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                              <PenTool className="h-5 w-5 text-slate-500" /> Firma Digital
                          </h3>
                          <span className="text-xs font-mono text-slate-400">ID: DOC-2024-X99</span>
                      </div>
                      
                      {!signedPolicy ? (
                          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-white hover:border-red-400 transition-colors group">
                              <FileText className="h-10 w-10 text-slate-300 mx-auto mb-4 group-hover:text-red-500 transition-colors" />
                              <h4 className="font-bold text-slate-700 mb-2">Política de Privacidad v2.4</h4>
                              <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                                  Al firmar, aceptas haber leído y comprendido los cambios en el tratamiento de datos biométricos.
                              </p>
                              <button 
                                onClick={() => setSignedPolicy(true)}
                                className="bg-slate-900 text-white px-8 py-2 rounded-lg font-bold hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
                              >
                                  <PenTool className="h-4 w-4" /> Firmar Documento
                              </button>
                          </div>
                      ) : (
                          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in">
                              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                              </div>
                              <h4 className="font-bold text-green-800 text-lg">¡Documento Firmado!</h4>
                              <p className="text-green-600 text-sm">Registrado en Blockchain corporativo. {new Date().toLocaleDateString()}</p>
                          </div>
                      )}
                  </div>

                  {/* Update List */}
                  <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Historial de Actualizaciones</h3>
                      <div className="space-y-4">
                          {TASKS_REINDUCTION.map(item => (
                              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                                  <div className="flex items-center gap-4">
                                      {item.status === 'done' ? <CheckCircle2 className="text-green-500 h-5 w-5"/> : <AlertCircle className="text-yellow-500 h-5 w-5"/>}
                                      <div>
                                          <h4 className="font-bold text-slate-800">{item.text}</h4>
                                          <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{item.type}</span>
                                      </div>
                                  </div>
                                  <ChevronRight className="h-4 w-4 text-slate-400" />
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

// --- SUB-COMPONENTS ---

// Replaced Abstract Blueprint with Color Guide
const SignageGuide: React.FC = () => {
    return (
        <div className="bg-slate-900 border-4 border-slate-800 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-400" /> Guía de Señalización MGP
            </h2>
            <p className="text-slate-400 text-xs mb-6">Identifica las zonas por su código de color en planta.</p>

            <div className="space-y-3">
                <SignageItem color="bg-green-500" icon={<Footprints className="h-4 w-4"/>} title="Ruta de Evacuación" desc="Pasillos y salidas seguras." />
                <SignageItem color="bg-red-600" icon={<Flame className="h-4 w-4"/>} title="Peligro / Incendio" desc="Extintores y material inflamable." />
                <SignageItem color="bg-yellow-500 text-slate-900" icon={<AlertTriangle className="h-4 w-4"/>} title="Precaución" desc="Desniveles o maquinaria en movimiento." />
                <SignageItem color="bg-blue-600" icon={<Info className="h-4 w-4"/>} title="Obligatorio" desc="Uso de EPP requerido en esta zona." />
            </div>
        </div>
    )
}

const SignageItem: React.FC<{ color: string; icon: React.ReactNode; title: string; desc: string }> = ({ color, icon, title, desc }) => (
    <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-lg ${color}`}>
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-sm text-white">{title}</h4>
            <p className="text-xs text-slate-400">{desc}</p>
        </div>
    </div>
);

const DocumentLibrary: React.FC<{ mode: HubMode }> = ({ mode }) => (
    <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-slate-400" /> 
            {mode === 'induction' ? 'Documentación Vital' : 'Biblioteca Técnica'}
        </h3>
        <div className="space-y-2">
            <DocumentLink title={mode === 'induction' ? "Manual de Bienvenida" : "Manual de Operaciones 2024"} />
            <DocumentLink title={mode === 'induction' ? "Reglamento Interno" : "Anexo Técnico v3"} />
            <DocumentLink title={mode === 'induction' ? "Beneficios Corporativos" : "Protocolo de Emergencia"} />
        </div>
    </div>
);

const DocumentLink: React.FC<{ title: string }> = ({ title }) => (
    <a href="#" className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group border border-slate-100">
        <span className="font-medium text-sm text-slate-700">{title}</span>
        <Download className="h-4 w-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
    </a>
);

export default OnboardingPage;