import React, { useState } from 'react';
import { Banknote, PlusCircle, Calendar as CalendarIcon, Info, TrendingUp, Download, DollarSign, Wallet } from 'lucide-react';

const EnhancedCalendar: React.FC = () => {
    const [currentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: startDay });
    const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    const isPayday = (day: number) => (day === 15 || day === 30);
    const getDayStyle = (day: number, index: number) => {
        const dayOfWeek = (startDay + index) % 7;
        const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
        if (isPayday(day)) return 'bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/30 transform scale-105';
        if (isWeekend) return 'bg-slate-50 text-slate-300';
        return 'bg-white text-slate-700 hover:bg-slate-50';
    };

    const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-lg text-slate-900">Calendario de Pagos</h4>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {monthName}
                </span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-2">
                {dayNames.map(day => <div key={day}>{day}</div>)}
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-sm flex-1">
                {emptyDays.map((_, i) => <div key={`empty-${i}`} className="w-full aspect-square"></div>)}
                {days.map((day, index) => (
                    <div key={day} className={`w-full aspect-square flex flex-col items-center justify-center rounded-xl transition-all text-xs ${getDayStyle(day, index)}`}>
                        <span>{day}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 text-center">
                * El pago se verá reflejado antes de las 5:00 PM.
            </div>
        </div>
    );
};


const PayrollPage: React.FC = () => (
    <div className="animate-fade-in-up space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                 <h1 className="text-4xl font-extrabold text-slate-900">Nómina y Finanzas</h1>
                 <p className="text-lg text-slate-500">Gestión transparente de tus ingresos y beneficios laborales.</p>
            </div>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                <Download className="h-4 w-4" /> Descargar Último Desprendible
            </button>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-6">
            <StatCard icon={<Wallet className="text-emerald-500"/>} title="Próximo Pago" value="15 de Octubre" subtext="Quincena 1" />
            <StatCard icon={<TrendingUp className="text-blue-500"/>} title="Días de Vacaciones" value="0 Días" subtext="Disponible después del año 1" />
            <StatCard icon={<DollarSign className="text-purple-500"/>} title="Banco Registrado" value="•••• 4589" subtext="Cuenta de Ahorros" />
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 h-full">
             <div className="lg:col-span-2 space-y-6">
                 {/* Main Info Block */}
                 <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Gestión Administrativa</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <ActionCard icon={<Banknote />} title="Certificados Laborales" desc="Solicita tu certificado con o sin sueldo para trámites bancarios." />
                        <ActionCard icon={<PlusCircle />} title="Reportar Incapacidad" desc="Sube tu soporte médico en las primeras 48 horas." />
                        <ActionCard icon={<CalendarIcon />} title="Histórico de Pagos" desc="Visualiza todos tus pagos desde el día de ingreso." />
                        <ActionCard icon={<Info />} title="Beneficios Extra" desc="Convenios con gimnasios y cajas de compensación." />
                    </div>
                 </div>

                 <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl flex gap-4 items-start">
                    <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600 shrink-0">
                        <Info className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-900 text-lg">Nota Importante sobre Horas Extra</h4>
                        <p className="text-indigo-700 mt-1 text-sm leading-relaxed">
                            Recuerda que para el pago de la quincena del 15, el corte de reporte de horas extra es el día 10. Para el pago del 30, el corte es el día 25.
                        </p>
                    </div>
                 </div>
             </div>

             <div className="h-full">
                 <EnhancedCalendar />
             </div>
        </div>
    </div>
);

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; subtext: string }> = ({ icon, title, value, subtext }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
            {React.cloneElement(icon as React.ReactElement, { className: 'h-6 w-6' })}
        </div>
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
            <h3 className="text-xl font-black text-slate-900">{value}</h3>
            <p className="text-xs text-slate-400">{subtext}</p>
        </div>
    </div>
)

const ActionCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
    <div className="group p-5 rounded-2xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 transition-all cursor-pointer">
        <div className="text-slate-400 group-hover:text-red-600 mb-3 transition-colors">
             {React.cloneElement(icon as React.ReactElement, { className: 'h-8 w-8' })}
        </div>
        <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-500">{desc}</p>
    </div>
);

export default PayrollPage;