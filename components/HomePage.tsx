import React, { useState } from 'react';
import { PlayCircle, ArrowRight, Calendar, CheckCircle2, Trophy, Clock, Zap, MapPin } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onTriggerAnimation: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onTriggerAnimation }) => {
  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  // Interactive Progress State
  const [progressSteps, setProgressSteps] = useState([
    { title: "Configuración", status: 'completed' },
    { title: "Documentación", status: 'completed' },
    { title: "Inducción SST", status: 'current' },
    { title: "Conoce tu Equipo", status: 'pending' }
  ]);

  const toggleStep = (index: number) => {
    const newSteps = [...progressSteps];
    const current = newSteps[index];
    if (current.status === 'completed') current.status = 'pending';
    else if (current.status === 'pending') current.status = 'current';
    else current.status = 'completed';
    setProgressSteps(newSteps);
  };

  const completedCount = progressSteps.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / progressSteps.length) * 100);

  const handleStartRoute = () => {
    onTriggerAnimation();
    setTimeout(() => {
        onNavigate('onboarding.checklist');
    }, 1500);
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Hero Welcome Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 text-white p-10 flex flex-col md:flex-row items-center justify-between border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block py-1 px-3 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold tracking-wider uppercase">
                Bienvenido al equipo
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
                Hola, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Colaborador</span>.
            </h1>
            <p className="text-slate-300 text-lg max-w-lg leading-relaxed">
                Estamos encantados de que inicies este viaje con Industrias MGP. Tu talento es el motor de nuestra innovación.
            </p>
            <div className="flex items-center gap-4 pt-4">
                 <button onClick={handleStartRoute} className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-white/10 flex items-center gap-2 group">
                    Iniciar mi Ruta <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                 </button>
                 <div className="flex items-center text-slate-400 text-sm gap-2">
                    <Calendar className="h-4 w-4" /> {today}
                 </div>
            </div>
        </div>
        <div className="relative z-10 hidden md:block">
             <Trophy className="h-40 w-40 text-red-500/20" />
        </div>
      </div>

      {/* Journey Tracker - Now Functional */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
         <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-xl font-bold text-slate-900">Tu Progreso de Onboarding</h2>
                <p className="text-slate-500 text-sm">Haz clic en los pasos para actualizar tu estado.</p>
            </div>
            <span className="text-2xl font-black text-red-600">{progressPercent}%</span>
         </div>
         <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }}></div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {progressSteps.map((step, idx) => (
                <div key={idx} onClick={() => toggleStep(idx)} className="cursor-pointer">
                    <JourneyStep title={step.title} status={step.status as any} />
                </div>
            ))}
         </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
        
        {/* Main Feature - Video (Enhanced Button) */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-slate-900" onClick={() => window.open("https://youtu.be/D3UBK66rhBM", "_blank")}>
            <img src="https://picsum.photos/1200/800?grayscale" alt="Team Video" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            
            {/* Big Play Button in Center */}
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-red-600/90 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 animate-pulse">
                    <PlayCircle className="h-10 w-10 text-white fill-current" />
                </div>
                <span className="absolute mt-32 text-white font-bold tracking-widest uppercase text-sm opacity-80 bg-black/50 px-4 py-1 rounded-full backdrop-blur-sm">Ver Video Corporativo</span>
            </div>

            <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Manifiesto MGP</h3>
                <p className="text-slate-300 max-w-md">Descubre por qué hacemos lo que hacemos. Un mensaje de nuestros fundadores sobre el futuro.</p>
            </div>
        </div>

        {/* Quick Access 1 - Payroll */}
        <div onClick={() => onNavigate('hr.payroll')} className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
            <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center text-green-600 mb-4 group-hover:rotate-6 transition-transform">
                <Clock className="h-5 w-5" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-800">Próximo Pago</h3>
                <p className="text-slate-500 text-sm mt-1">Faltan 5 días para tu primer pago de nómina.</p>
            </div>
        </div>

        {/* Quick Access 2 - AI Tools / Location */}
        <div className="grid grid-cols-2 gap-4">
             <div onClick={() => onNavigate('ai.image')} className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white hover:shadow-indigo-500/30 transition-all cursor-pointer group flex flex-col justify-between h-full">
                <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center text-white backdrop-blur-sm mb-2">
                    <Zap className="h-4 w-4" />
                </div>
                <div>
                    <h3 className="text-base font-bold">MGP Neural</h3>
                    <p className="text-indigo-100 text-xs mt-1">Herramientas IA</p>
                </div>
            </div>
            
            <a href="https://www.google.com/maps/search/industrias+mgp+ibague/@4.4119106,-75.1740094,17z" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-6 rounded-2xl shadow-lg text-white hover:bg-slate-700 transition-all cursor-pointer group flex flex-col justify-between h-full">
                <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center text-white backdrop-blur-sm mb-2">
                    <MapPin className="h-4 w-4" />
                </div>
                <div>
                    <h3 className="text-base font-bold">Ubicación</h3>
                    <p className="text-slate-300 text-xs mt-1">Sede Ibagué</p>
                </div>
            </a>
        </div>

      </div>
    </div>
  );
};

const JourneyStep: React.FC<{ title: string; status: 'completed' | 'current' | 'pending' }> = ({ title, status }) => {
    const statusColors = {
        completed: 'bg-green-100 text-green-700 border-green-200',
        current: 'bg-red-100 text-red-700 border-red-200 ring-2 ring-red-500 ring-offset-2',
        pending: 'bg-slate-50 text-slate-400 border-slate-100'
    };
    
    const icons = {
        completed: <CheckCircle2 className="h-4 w-4" />,
        current: <Clock className="h-4 w-4" />,
        pending: <div className="h-4 w-4 rounded-full border-2 border-slate-300"></div>
    };

    return (
        <div className={`flex items-center gap-3 p-3 rounded-xl border ${statusColors[status]} transition-all hover:scale-105`}>
            {icons[status]}
            <span className="text-sm font-semibold">{title}</span>
        </div>
    )
}

export default HomePage;