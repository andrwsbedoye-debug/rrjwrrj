import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle2, Camera, UploadCloud, Activity, MapPin, Eye, FileWarning } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { fileToBase64 } from '../../utils/helpers';

const SafetyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'report'>('dashboard');

    return (
        <div className="animate-fade-in-up space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900">Centro de Inteligencia SST</h1>
                    <p className="text-lg text-slate-500 mt-2">Monitoreo de seguridad y reporte de riesgos asistido por IA.</p>
                </div>
                <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button 
                        onClick={() => setActiveTab('dashboard')} 
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        <Activity className="h-4 w-4" /> Dashboard
                    </button>
                    <button 
                        onClick={() => setActiveTab('report')} 
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'report' ? 'bg-red-600 text-white shadow-md' : 'text-slate-500 hover:text-red-600'}`}
                    >
                        <AlertTriangle className="h-4 w-4" /> Reportar Riesgo (IA)
                    </button>
                </div>
            </div>

            {activeTab === 'dashboard' ? <SafetyDashboard /> : <AIHazardReporter />}
        </div>
    );
};

const SafetyDashboard: React.FC = () => (
    <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6">
            <KpiCard title="Días Sin Accidentes" value="145" icon={<Shield className="text-green-500"/>} trend="+12% vs año anterior" />
            <KpiCard title="Reportes Abiertos" value="3" icon={<FileWarning className="text-yellow-500"/>} trend="Baja prioridad" />
            <KpiCard title="Inspecciones" value="12/15" icon={<CheckCircle2 className="text-blue-500"/>} trend="Octubre" />
            <KpiCard title="Nivel de Riesgo" value="Bajo" icon={<Activity className="text-green-500"/>} trend="Zona A" />
        </div>

        {/* Map Visualization */}
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[100px] opacity-20"></div>
                 <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-bold flex items-center gap-2"><MapPin className="text-red-500"/> Planta Ibagué - Zona Operativa</h3>
                            <p className="text-slate-400 text-sm">Monitoreo en tiempo real</p>
                        </div>
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 animate-pulse">
                            OPERACIÓN NORMAL
                        </span>
                    </div>
                    
                    {/* Simulated Blueprint Overlay */}
                    <div className="mt-8 border border-white/10 bg-white/5 rounded-xl p-4 h-64 relative grid grid-cols-2 gap-2">
                         <div className="border border-white/10 rounded flex items-center justify-center hover:bg-white/10 transition-colors group cursor-pointer">
                            <span className="text-xs font-mono text-slate-400 group-hover:text-white">PRODUCCIÓN A</span>
                         </div>
                         <div className="border border-white/10 rounded flex items-center justify-center hover:bg-white/10 transition-colors group cursor-pointer relative">
                            <span className="text-xs font-mono text-slate-400 group-hover:text-white">ALMACÉN</span>
                            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
                         </div>
                         <div className="border border-white/10 rounded flex items-center justify-center hover:bg-white/10 transition-colors group cursor-pointer">
                            <span className="text-xs font-mono text-slate-400 group-hover:text-white">OFICINAS</span>
                         </div>
                         <div className="border border-white/10 rounded flex items-center justify-center hover:bg-white/10 transition-colors group cursor-pointer">
                             <span className="text-xs font-mono text-slate-400 group-hover:text-white">LOGÍSTICA</span>
                         </div>
                    </div>
                 </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Eye className="h-5 w-5 text-red-600"/> Alertas Recientes</h3>
                    <div className="space-y-4">
                        <AlertItem title="Piso resbaloso" loc="Pasillo 4" time="Hace 2h" severity="medium" />
                        <AlertItem title="Extintor Vencido" loc="Zona Carga" time="Hace 5h" severity="low" />
                        <AlertItem title="Uso EPP Incorrecto" loc="Línea 2" time="Ayer" severity="high" />
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-6 text-white shadow-lg">
                    <h3 className="font-bold text-lg mb-2">Protocolo de Emergencia</h3>
                    <p className="text-red-100 text-sm mb-4">En caso de evacuación, diríjase al Punto de Encuentro A.</p>
                    <button className="w-full bg-white text-red-700 font-bold py-2 rounded-lg text-sm hover:bg-red-50">
                        Ver Rutas
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const AIHazardReporter: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            setImage(URL.createObjectURL(f));
            setAnalysis(null);
        }
    };

    const analyzeHazard = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const base64 = await fileToBase64(file);
            const model = 'gemini-2.5-flash-image';
            const response = await ai.models.generateContent({
                model,
                contents: {
                    parts: [
                        { inlineData: { data: base64, mimeType: file.type } },
                        { text: "Actúa como un Experto en Seguridad Industrial (SST). Analiza esta imagen: 1) Identifica el peligro potencial. 2) Clasifica el riesgo (Bajo, Medio, Alto, Crítico). 3) Sugiere una acción correctiva inmediata. Responde en formato JSON simple sin markdown." }
                    ]
                }
            });
            setAnalysis(response.text);
        } catch (error) {
            console.error(error);
            setAnalysis("Error al analizar la imagen. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera className="h-8 w-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Reportero de Riesgos con IA</h2>
                    <p className="text-slate-500">Sube una foto de una condición insegura. Nuestra IA la analizará y generará un reporte preliminar.</p>
                </div>

                {!image ? (
                     <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group">
                        <UploadCloud className="h-12 w-12 text-slate-400 group-hover:text-red-500 transition-colors mb-2" />
                        <span className="font-semibold text-slate-700">Subir evidencia fotográfica</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                    </label>
                ) : (
                    <div className="space-y-6">
                        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video flex items-center justify-center">
                            <img src={image} alt="Hazard" className="h-full object-contain" />
                            {loading && (
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                    <Activity className="h-10 w-10 animate-spin mb-2 text-red-500" />
                                    <span className="font-mono animate-pulse">ANALIZANDO VECTORES DE RIESGO...</span>
                                </div>
                            )}
                        </div>

                        {!analysis && !loading && (
                            <button onClick={analyzeHazard} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                                <Activity className="h-5 w-5" /> Analizar con IA
                            </button>
                        )}

                        {analysis && (
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 animate-fade-in">
                                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><CheckCircle2 className="text-green-600"/> Análisis Completado</h3>
                                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono bg-white p-4 rounded-lg border border-slate-200 overflow-x-auto">
                                    {analysis}
                                </pre>
                                <div className="mt-4 flex gap-4">
                                    <button className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-bold">Enviar Reporte Oficial</button>
                                    <button onClick={() => {setImage(null); setAnalysis(null)}} className="px-6 text-slate-500 font-bold hover:text-slate-900">Cancelar</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const KpiCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend: string }> = ({ title, value, icon, trend }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className="bg-slate-50 p-3 rounded-xl">{icon}</div>
             {trend.includes('+') ? <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{trend}</span> : <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">{trend}</span>}
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-1">{value}</h3>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
    </div>
);

const AlertItem: React.FC<{ title: string; loc: string; time: string; severity: 'low' | 'medium' | 'high' }> = ({ title, loc, time, severity }) => {
    const colors = {
        low: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        medium: 'bg-orange-100 text-orange-700 border-orange-200',
        high: 'bg-red-100 text-red-700 border-red-200'
    };
    return (
        <div className="flex items-center justify-between p-3 rounded-xl border bg-slate-50 border-slate-100">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${severity === 'high' ? 'bg-red-500' : severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
                    <p className="text-xs text-slate-500">{loc}</p>
                </div>
            </div>
            <span className="text-xs font-mono text-slate-400">{time}</span>
        </div>
    );
}

export default SafetyPage;