import React, { useState } from 'react';
import { Target, Eye, Gem, Send, RefreshCw, CheckCircle, Clock, Award, Rocket, MapPin, Globe, ArrowUpRight, GraduationCap, Quote } from 'lucide-react';

interface AboutPageProps {
    onNavigate?: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in-up space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Nuestra Historia, Tu Futuro.</h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          Industrias MGP no es solo una empresa de manufactura. Es el resultado de 20 años de innovación, pasión y personas extraordinarias como tú.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative">
         <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200 hidden md:block"></div>
         <div className="space-y-12">
            <TimelineItem year="2004" title="El Comienzo Humilde" description="Todo inició en un pequeño garaje con una sola máquina y un sueño grande. Nuestros fundadores creían que la calidad no era negociable." align="left" icon={<Clock className="h-6 w-6 text-white" />} />
            <TimelineItem year="2010" title="Expansión Nacional" description="Gracias a la confianza de nuestros primeros clientes, abrimos nuestra primera planta real. Pasamos de 5 a 50 empleados en un año." align="right" icon={<MapPin className="h-6 w-6 text-white" />} />
            <TimelineItem year="2018" title="Premio a la Innovación" description="Fuimos reconocidos por la industria como líderes en sostenibilidad y tecnología. Implementamos nuestra primera línea automatizada." align="left" icon={<Award className="h-6 w-6 text-white" />} />
            <TimelineItem year="Hoy" title="Un Futuro Sin Límites" description="Contigo a bordo, estamos listos para conquistar mercados internacionales. La IA y la tecnología son nuestros nuevos aliados." align="right" icon={<Rocket className="h-6 w-6 text-white" />} />
         </div>
      </div>
      
      {/* Location Section */}
      <div className="grid md:grid-cols-12 gap-8 items-center">
         <div className="md:col-span-5 space-y-6">
            <span className="text-red-600 font-bold tracking-widest uppercase text-sm">Base de Operaciones</span>
            <h2 className="text-4xl font-extrabold text-slate-900">El Corazón de MGP</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
                Nuestra planta principal en Ibagué es más que concreto y acero. Es donde las ideas se transforman en realidad.
            </p>
            <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="bg-red-50 p-3 rounded-full text-red-600"><MapPin /></div>
                    <div>
                        <p className="font-bold text-slate-900">Ibagué, Tolima</p>
                        <p className="text-sm text-slate-500">Zona Industrial El Papayo</p>
                    </div>
                </div>
            </div>
            <a href="https://www.google.com/maps/search/industrias+mgp+ibague/@4.4119106,-75.1740094,17z" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-xl shadow-slate-900/20">
                Ver en Google Maps <ArrowUpRight className="h-4 w-4" />
            </a>
         </div>
         <div className="md:col-span-7 h-[500px] bg-slate-200 rounded-3xl overflow-hidden relative group shadow-2xl">
            <img src="https://picsum.photos/1200/800?city" alt="Mapa Ibagué" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 text-white">
                <p className="font-mono text-xs text-red-400 mb-1">LIVE SATELLITE FEED</p>
                <h3 className="text-2xl font-bold">Planta Principal</h3>
                <p className="text-slate-300 text-sm">Industrias MGP</p>
            </div>
         </div>
      </div>
      
      {/* Voices of MGP (New Section) */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">Voces de MGP</h2>
          <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
                  <Quote className="text-slate-200 absolute top-4 left-4 w-10 h-10" />
                  <p className="text-slate-600 italic relative z-10 mb-4 pt-6">"Empecé como operario y hoy lidero el equipo de Innovación. MGP no solo te da empleo, te da alas para crecer profesionalmente."</p>
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                      <div>
                          <p className="font-bold text-slate-900 text-sm">Juan Pérez</p>
                          <p className="text-xs text-slate-500">Director de Innovación</p>
                      </div>
                  </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
                  <Quote className="text-slate-200 absolute top-4 left-4 w-10 h-10" />
                  <p className="text-slate-600 italic relative z-10 mb-4 pt-6">"La cultura de seguridad aquí es real. Me siento cuidada y valorada todos los días que entro a la planta."</p>
                  <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                      <div>
                          <p className="font-bold text-slate-900 text-sm">María Rodriguez</p>
                          <p className="text-xs text-slate-500">Supervisora SST</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* DNA Section + Call to Action */}
      <div className="bg-slate-900 text-white rounded-3xl p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600 rounded-full filter blur-[150px] opacity-20"></div>
        <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-10 text-center">El ADN de MGP</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
                <DNAValue icon={<Target />} title="Misión" text="Crear soluciones que redefinan los estándares de la industria." />
                <DNAValue icon={<Eye />} title="Visión" text="Ser la referencia global indiscutible para el 2030." />
                <DNAValue icon={<Gem />} title="Valores" text="Integridad radical, obsesión por la calidad, y trabajo en equipo." />
            </div>
            
            {/* NEW Call to Action Link */}
            {onNavigate && (
                <div className="flex justify-center">
                    <button 
                        onClick={() => onNavigate('operations.training')} 
                        className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-white/10 flex items-center gap-3 group"
                    >
                        <GraduationCap className="h-6 w-6" />
                        Iniciar Evaluación de Cultura
                        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            )}
        </div>
      </div>

      <ContactForm />

    </div>
  );
};

const TimelineItem: React.FC<{ year: string; title: string; description: string; align: 'left' | 'right'; icon: React.ReactNode }> = ({ year, title, description, align, icon }) => (
    <div className={`flex flex-col md:flex-row items-center justify-between gap-8 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <div className="w-full md:w-5/12 text-center md:text-right space-y-2">
            {align === 'left' && (
                <>
                    <span className="text-red-600 font-black text-4xl block">{year}</span>
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                    <p className="text-slate-500">{description}</p>
                </>
            )}
             {align === 'right' && <div className="hidden md:block"></div>} 
        </div>

        <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-red-600 shadow-lg shadow-red-500/50 shrink-0">
            {icon}
        </div>

        <div className="w-full md:w-5/12 text-center md:text-left space-y-2">
             {align === 'right' && (
                <>
                    <span className="text-red-600 font-black text-4xl block">{year}</span>
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                    <p className="text-slate-500">{description}</p>
                </>
            )}
            {align === 'left' && <div className="hidden md:block"></div>}
        </div>
    </div>
);

const DNAValue: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
    <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-colors">
        <div className="bg-white text-slate-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            {React.cloneElement(icon as React.ReactElement, { className: 'h-6 w-6' })}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-300 leading-relaxed text-sm">{text}</p>
    </div>
);

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    return (
        <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Hablemos</h2>
                    <p className="text-slate-500 mb-8">RRHH está aquí para apoyarte. Si tienes dudas sobre tu proceso, beneficios o cultura, no dudes en escribirnos.</p>
                    <div className="space-y-4">
                         <div className="flex items-center gap-3 text-slate-600">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600"><MapPin size={18} /></div>
                            <span>Zona Industrial, Ibagué</span>
                         </div>
                         <div className="flex items-center gap-3 text-slate-600">
                             <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600"><Clock size={18} /></div>
                            <span>Lun - Vie, 8:00 AM - 5:00 PM</span>
                         </div>
                    </div>
                </div>
                
                <div>
                    {isSuccess ? (
                        <div className="h-full flex flex-col items-center justify-center text-center bg-green-50 rounded-2xl p-6 border border-green-100">
                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-lg font-bold text-green-800">¡Mensaje Recibido!</h3>
                            <p className="text-green-600">Te responderemos pronto.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Mensaje</label>
                                <textarea name="message" rows={3} value={formData.message} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" required></textarea>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                                {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                                <span>Enviar</span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;