import React, { useState } from 'react';
import { Heart, Activity, Coffee, Calendar, Sun, Umbrella, Smile, CheckSquare } from 'lucide-react';

const WellbeingPage: React.FC = () => {
  return (
    <div className="animate-fade-in-up space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">Bienestar y Vida</h1>
        <p className="text-lg text-slate-500 mt-2">Porque no solo eres un empleado, eres parte de nuestra familia.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
          {/* Main Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                  <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md">
                      <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Semana de la Salud MGP</h2>
                  <p className="text-red-100 text-lg mb-6 max-w-md">
                      Del 20 al 25 de Octubre. Chequeos gratuitos, masajes relajantes y talleres de nutrición para ti y tu familia.
                  </p>
                  <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-red-50 transition-colors">
                      Inscribirme Ahora
                  </button>
              </div>
          </div>

          {/* Daily Tip */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                  <div className="flex justify-between items-start mb-4">
                      <div className="bg-green-100 text-green-600 p-2 rounded-lg"><Sun className="h-6 w-6"/></div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Tip del Día</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Pausa Activa</h3>
                  <p className="text-slate-500 text-sm">Levántate de tu silla cada 2 horas. Estira tus brazos y camina por 5 minutos para oxigenar tu cerebro.</p>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
                   <div className="bg-green-500 h-2 rounded-full w-2/3"></div>
              </div>
          </div>

          {/* Healthy Habits Tracker (NEW) */}
           <div className="md:col-span-3 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                 <CheckSquare className="h-6 w-6 text-slate-400" />
                 <h3 className="text-xl font-bold text-slate-900">Hábitos Saludables</h3>
             </div>
             <div className="grid md:grid-cols-4 gap-4">
                <HabitCheck label="Beber 2L de Agua" />
                <HabitCheck label="Pausa Activa AM" />
                <HabitCheck label="Pausa Activa PM" />
                <HabitCheck label="Comer una fruta" />
             </div>
           </div>


          {/* Benefits Grid */}
          <div className="md:col-span-3 grid md:grid-cols-4 gap-4">
              <BenefitCard icon={<Umbrella className="text-blue-500"/>} title="Seguro de Vida" desc="Cobertura del 100% para titulares." />
              <BenefitCard icon={<Activity className="text-red-500"/>} title="Gimnasio" desc="50% de descuento en BodyTech." />
              <BenefitCard icon={<Coffee className="text-amber-700"/>} title="Snacks Saludables" desc="Fruta gratis todos los martes." />
              <BenefitCard icon={<Smile className="text-purple-500"/>} title="Apoyo Psicológico" desc="Línea de escucha 24/7 anónima." />
          </div>

          {/* Events Calendar Preview */}
          <div className="md:col-span-3 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                 <Calendar className="h-6 w-6 text-slate-400" />
                 <h3 className="text-xl font-bold text-slate-900">Próximos Eventos</h3>
             </div>
             <div className="space-y-4">
                 <EventRow day="15" month="OCT" title="Torneo de Fútbol 5" time="6:00 PM - Canchas La 10" />
                 <EventRow day="22" month="OCT" title="Taller de Finanzas Personales" time="10:00 AM - Auditorio Principal" />
                 <EventRow day="31" month="OCT" title="Fiesta de Halloween Corporativa" time="4:00 PM - Cafetería" />
             </div>
          </div>
      </div>
    </div>
  );
};

const HabitCheck: React.FC<{ label: string }> = ({ label }) => {
    const [checked, setChecked] = useState(false);
    return (
        <div 
            onClick={() => setChecked(!checked)}
            className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${checked ? 'bg-green-50 border-green-200 text-green-800' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
        >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${checked ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-slate-300'}`}>
                {checked && <Smile className="h-4 w-4" />}
            </div>
            <span className="font-bold text-sm">{label}</span>
        </div>
    )
}

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-red-200 hover:shadow-lg hover:shadow-red-100 transition-all cursor-pointer group">
        <div className="bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center mb-4 group-hover:bg-white border border-slate-100">
            {icon}
        </div>
        <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-xs text-slate-500">{desc}</p>
    </div>
);

const EventRow: React.FC<{ day: string; month: string; title: string; time: string }> = ({ day, month, title, time }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
        <div className="flex flex-col items-center justify-center bg-slate-100 w-14 h-14 rounded-xl text-slate-600 font-bold leading-tight">
            <span className="text-lg">{day}</span>
            <span className="text-xs font-bold uppercase">{month}</span>
        </div>
        <div>
            <h4 className="font-bold text-slate-800">{title}</h4>
            <p className="text-sm text-slate-500">{time}</p>
        </div>
        <button className="ml-auto text-xs font-bold text-red-600 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50">
            Agendar
        </button>
    </div>
)

export default WellbeingPage;