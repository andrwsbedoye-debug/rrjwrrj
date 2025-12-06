import React, { useState } from 'react';
import { UserSearch, UploadCloud, Users, Award, Search, BrainCircuit, ScanFace, ChevronRight, Fingerprint, FileText, Star, Briefcase, FileCheck } from 'lucide-react';

const PreselectionPage: React.FC = () => {
    const [activePhase, setActivePhase] = useState<number>(0);
    const [selectedPension, setSelectedPension] = useState<string>('');
    const [selectedEPS, setSelectedEPS] = useState<string>('');

    return (
    <div className="animate-fade-in-up space-y-12">
        
        {/* Hero Section */}
        <div className="relative bg-slate-900 rounded-3xl p-10 overflow-hidden shadow-2xl text-white">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-red-600 to-orange-600 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-red-300 border border-white/10 mb-6">
                    <UserSearch className="h-4 w-4" /> Talento Humano Estratégico
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight mb-6">Arquitectura de Talento MGP</h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                    Nuestro proceso de selección no busca solo llenar vacantes. Busca identificar <span className="text-white font-bold">potencial, pasión y propósito</span>.
                </p>
            </div>
        </div>

        {/* Phase 1: The Process Roadmap */}
        <div className="space-y-6">
            <div className="flex items-end justify-between px-2">
                <h2 className="text-3xl font-bold text-slate-900">El Camino del Candidato</h2>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Workflow de Selección</span>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
                <PhaseCard step={1} title="Atracción y Filtro" icon={<Search className="h-6 w-6"/>} desc="Filtro IA de hojas de vida." isActive={activePhase === 0} onClick={() => setActivePhase(0)} />
                <PhaseCard step={2} title="Evaluación 360°" icon={<BrainCircuit className="h-6 w-6"/>} desc="Pruebas técnicas y assesment." isActive={activePhase === 1} onClick={() => setActivePhase(1)} />
                <PhaseCard step={3} title="Verificación" icon={<ScanFace className="h-6 w-6"/>} desc="Antecedentes y referencias." isActive={activePhase === 2} onClick={() => setActivePhase(2)} />
                <PhaseCard step={4} title="Selección Final" icon={<Award className="h-6 w-6"/>} desc="Decisión de contratación." isActive={activePhase === 3} onClick={() => setActivePhase(3)} />
            </div>

            {/* Dynamic Detail View */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm transition-all animate-fade-in">
                {activePhase === 0 && <PhaseDetail title="Fase 1: Preselección" details={["Levantamiento del perfil.", "Publicación en portales.", "Screening telefónico."]} />}
                {activePhase === 1 && <PhaseDetail title="Fase 2: Evaluación Profunda" details={["Prueba Psicotécnica: DISC.", "Reto Técnico.", "Entrevista STAR."]} />}
                {activePhase === 2 && <PhaseDetail title="Fase 3: Seguridad y Confianza" details={["Validación de títulos.", "Antecedentes.", "Referencias 360."]} />}
                {activePhase === 3 && <PhaseDetail title="Fase 4: La Decisión" details={["Entrevista Gerencial.", "Carta de Oferta.", "Inicio Onboarding."]} />}
            </div>
        </div>

        {/* --- NEW: DOCUMENT UPLOAD SECTION --- */}
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md relative overflow-hidden">
                <div className="flex flex-col gap-2 mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <UploadCloud className="h-6 w-6 text-blue-600" /> Repositorio Digital
                    </h3>
                    <p className="text-slate-500 text-sm">Carga aquí tus documentos para formalizar el proceso.</p>
                </div>

                <div className="space-y-4">
                    <FileUploadItem label="Cédula de Ciudadanía (150%)" />
                    <FileUploadItem label="Diploma de Grado / Acta" />
                    <FileUploadItem label="Certificado EPS y Pensión" />
                </div>
            </div>

             {/* --- NEW: AFFILIATION SELECTOR --- */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex flex-col gap-2 mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-red-600" /> Afiliaciones
                    </h3>
                    <p className="text-slate-500 text-sm">Selecciona tus fondos actuales para el proceso de vinculación.</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fondo de Pensiones</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Porvenir', 'Protección', 'Colfondos', 'Skandia'].map(fund => (
                                <button
                                    key={fund}
                                    onClick={() => setSelectedPension(fund)}
                                    className={`p-3 rounded-lg text-sm font-bold border transition-all ${selectedPension === fund ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-200 hover:border-red-300'}`}
                                >
                                    {fund}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">EPS (Salud)</label>
                        <select 
                            className="w-full p-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:ring-2 focus:ring-red-500 outline-none"
                            value={selectedEPS}
                            onChange={(e) => setSelectedEPS(e.target.value)}
                        >
                            <option value="">Selecciona tu EPS...</option>
                            <option value="sura">EPS Sura</option>
                            <option value="sanitas">Sanitas</option>
                            <option value="compensar">Compensar</option>
                            <option value="nuevaeps">Nueva EPS</option>
                            <option value="saludtotal">Salud Total</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {/* Section: Competencies */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-3 rounded-xl text-red-600"><Fingerprint className="h-6 w-6" /></div>
                <h3 className="text-2xl font-bold text-slate-900">ADN del Candidato MGP</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <CompetencyBar label="Innovación & Curiosidad" percentage={90} />
                    <CompetencyBar label="Integridad Radical" percentage={100} />
                </div>
                <div className="space-y-4">
                    <CompetencyBar label="Trabajo Colaborativo" percentage={85} />
                    <CompetencyBar label="Resiliencia Operativa" percentage={80} />
                </div>
            </div>
        </div>

    </div>
    );
};

// --- Sub-components ---

const FileUploadItem: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex items-center justify-between p-4 bg-white border border-dashed border-slate-300 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
        <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-lg text-slate-400 group-hover:text-blue-500 transition-colors">
                <FileText className="h-5 w-5" />
            </div>
            <span className="font-medium text-slate-700 text-sm">{label}</span>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-100">Subir</span>
    </div>
);

const PhaseCard: React.FC<{ step: number; title: string; icon: React.ReactNode; desc: string; isActive: boolean; onClick: () => void }> = ({ step, title, icon, desc, isActive, onClick }) => (
    <div 
        onClick={onClick}
        className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${isActive ? 'bg-slate-900 border-slate-900 ring-4 ring-slate-200' : 'bg-white border-slate-200 hover:border-red-300 hover:shadow-lg'}`}
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${isActive ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-red-50 group-hover:text-red-600'}`}>
                {icon}
            </div>
            <span className={`text-4xl font-black opacity-10 ${isActive ? 'text-white' : 'text-slate-900'}`}>{step}</span>
        </div>
        <h3 className={`font-bold text-lg mb-2 ${isActive ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
    </div>
);

const PhaseDetail: React.FC<{ title: string; details: string[] }> = ({ title, details }) => (
    <div className="animate-fade-in">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ChevronRight className="h-5 w-5 text-red-600" /> {title}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
            {details.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-slate-700 font-medium text-sm">{item}</span>
                </div>
            ))}
        </div>
    </div>
);

const CompetencyBar: React.FC<{ label: string; percentage: number }> = ({ label, percentage }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-sm font-bold text-slate-700">{label}</span>
            <span className="text-sm font-bold text-slate-400">{percentage}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

export default PreselectionPage;