import React from 'react';
import { RefreshCcw, CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';

const ReinductionPage: React.FC = () => {
  return (
    <div className="animate-fade-in-up space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Re-Inducción Corporativa</h1>
            <p className="text-lg text-slate-500 mt-2">Mantente al día. Actualizaciones críticas de procesos y cultura.</p>
         </div>
         <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold">
             <AlertCircle className="h-4 w-4" /> Pendiente Anual: 2024
         </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
          {/* Main Status */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
             <h3 className="text-xl font-bold text-slate-900 mb-6">Tu Estado de Actualización</h3>
             <div className="relative pt-4">
                 <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                 <div className="space-y-8">
                     <StatusItem title="Política de Datos 2024" status="done" date="Ene 15, 2024" />
                     <StatusItem title="Código de Ética v2.0" status="done" date="Feb 20, 2024" />
                     <StatusItem title="Protocolo de Seguridad Aumentada" status="pending" date="Vence: Oct 30" />
                 </div>
             </div>
          </div>

          {/* Active Module */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 opacity-20 blur-[80px]"></div>
               <div className="relative z-10">
                   <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                       <RefreshCcw className="h-6 w-6" />
                   </div>
                   <h2 className="text-2xl font-bold mb-2">Protocolo de Seguridad Aumentada</h2>
                   <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                       Hemos actualizado nuestros estándares para maquinaria pesada. Es vital que revises los nuevos procedimientos de bloqueo y etiquetado (LOTO).
                   </p>
                   <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                       Iniciar Actualización <ArrowRight className="h-5 w-5" />
                   </button>
               </div>
          </div>
      </div>

      {/* Docs */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Biblioteca de Cambios</h3>
          <div className="grid md:grid-cols-3 gap-4">
              <DocCard title="Manual de Convivencia" version="v3.1" />
              <DocCard title="Reglamento Interno" version="v5.0" />
              <DocCard title="Política Ambiental" version="v2.2" />
          </div>
      </div>
    </div>
  );
};

const StatusItem: React.FC<{ title: string; status: 'done' | 'pending'; date: string }> = ({ title, status, date }) => (
    <div className="flex items-center gap-4 relative z-10">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${status === 'done' ? 'bg-green-50 border-white text-green-600 shadow-sm' : 'bg-white border-slate-100 text-slate-300'}`}>
            {status === 'done' ? <CheckCircle2 className="h-6 w-6" /> : <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
        </div>
        <div>
            <h4 className={`font-bold ${status === 'done' ? 'text-slate-900' : 'text-slate-800'}`}>{title}</h4>
            <p className="text-xs text-slate-500">{date}</p>
        </div>
    </div>
);

const DocCard: React.FC<{ title: string; version: string }> = ({ title, version }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-slate-400" />
            <div>
                <p className="font-bold text-slate-800 text-sm">{title}</p>
                <p className="text-xs text-slate-400">{version}</p>
            </div>
        </div>
    </div>
)

export default ReinductionPage;