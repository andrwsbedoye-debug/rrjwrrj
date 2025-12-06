import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';

interface PresentationLetterPageProps {
  onNavigate: (page: string) => void;
}

const PresentationLetterPage: React.FC<PresentationLetterPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in-up flex items-center justify-center min-h-[80vh]">
      <div className="bg-white max-w-4xl w-full p-12 md:p-16 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-50 rounded-full transform -translate-x-1/3 translate-y-1/3 opacity-50"></div>
        <Quote className="absolute top-12 left-12 text-slate-100 h-32 w-32 -z-0" />

        <div className="relative z-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-200 pb-8">
                <div>
                    <p className="text-sm font-bold text-red-600 tracking-widest uppercase mb-2">Carta de la Presidencia</p>
                    <h1 className="text-4xl font-serif text-slate-900">Bienvenido al Futuro.</h1>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                     <p className="text-slate-500 text-sm">Medellín, Colombia</p>
                     <p className="text-slate-900 font-medium">{new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-serif">
                <p>
                    <span className="font-bold text-slate-900">Estimado/a Colega,</span>
                </p>
                <p>
                    Es un honor para mí darte la bienvenida a Industrias MGP. No eres simplemente una nueva contratación; eres una pieza vital en el engranaje de nuestra visión para los próximos 20 años.
                </p>
                <p>
                    Cuando fundamos esta compañía, lo hicimos con la convicción de que la excelencia no es un acto, sino un hábito. Hoy, tú heredas ese legado. Buscamos en ti no solo habilidad técnica, sino la curiosidad para innovar y la integridad para actuar correctamente, incluso cuando nadie está mirando.
                </p>
                <p>
                    Te invito a que explores, a que preguntes y a que desafíes el status quo. Aquí, tu voz importa. 
                </p>
                <p>
                    Estamos aquí para apoyarte en cada paso de tu crecimiento. Bienvenido a casa.
                </p>
            </div>

            {/* Signature */}
            <div className="pt-8 flex items-center justify-between">
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Firma CEO" className="h-12 opacity-80 mb-2" />
                    <p className="font-bold text-slate-900">Carlos Martínez</p>
                    <p className="text-sm text-slate-500">CEO & Fundador, Industrias MGP</p>
                </div>
                
                <button 
                    onClick={() => onNavigate('onboarding.checklist')}
                    className="group bg-slate-900 text-white px-8 py-4 rounded-xl font-sans font-bold shadow-xl hover:bg-red-700 transition-all flex items-center gap-3 transform hover:scale-105"
                >
                    Acepto el Reto <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationLetterPage;