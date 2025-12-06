import React from 'react';
import { BookUser, FileText, UserCheck, ExternalLink, HardHat, Laptop } from 'lucide-react';

const ManualsPage: React.FC = () => (
    <div className="animate-fade-in-up space-y-8">
        <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Manual de Funciones y Vinculación</h1>
            <p className="text-lg text-gray-600">Documentación clave para entender tu rol y formalizar tu ingreso.</p>
        </div>
        
        {/* Main Manual Card */}
        <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-md">
            <div className="flex items-start space-x-4">
                 <div className="bg-red-100 p-3 rounded-lg">
                    <BookUser className="h-8 w-8 text-red-600" />
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">Tu Guía para el Éxito</h3>
                    <p className="text-gray-600 mt-1 mb-4">
                        El Manual de Funciones es una herramienta esencial que define las expectativas y responsabilidades de tu cargo. 
                    </p>
                    <a 
                        href="https://1drv.ms/w/c/754623a0a5f367de/IQB0zv9FZYTKQoxyiw51UccGAR-EWw7DC-6NrgveT0Nb-2A?e=F3l7vt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-red-800 hover:bg-red-900 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                        <ExternalLink className="h-4 w-4" />
                        <span>Ver Manual de Funciones Completo</span>
                    </a>
                </div>
            </div>
        </div>

        {/* Role Specific Details */}
        <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:bg-white hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-yellow-100 text-yellow-700 p-3 rounded-full">
                        <HardHat className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Perfil Operativo</h3>
                </div>
                <p className="text-slate-500 mb-4 text-sm">Personal encargado de producción, logística y mantenimiento.</p>
                <ul className="space-y-3">
                    <RoleItem text="Cumplimiento estricto de EPP." />
                    <RoleItem text="Reporte de unidades producidas por hora." />
                    <RoleItem text="Mantenimiento preventivo de maquinaria." />
                    <RoleItem text="Asistencia a charlas de seguridad diarias." />
                </ul>
             </div>

             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:bg-white hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
                        <Laptop className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Perfil Administrativo</h3>
                </div>
                <p className="text-slate-500 mb-4 text-sm">Personal de oficinas, gestión y soporte.</p>
                 <ul className="space-y-3">
                    <RoleItem text="Manejo de herramientas ofimáticas y ERP." />
                    <RoleItem text="Gestión documental y archivo." />
                    <RoleItem text="Atención al cliente interno/externo." />
                    <RoleItem text="Cumplimiento de indicadores (KPIs) mensuales." />
                </ul>
             </div>
        </div>

        {/* General Process */}
        <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><UserCheck className="h-5 w-5 mr-2" /> Proceso de Vinculación Laboral</h3>
            <div className="grid md:grid-cols-4 gap-4">
                <Step num={1} text="Entrega de documentos físicos." />
                <Step num={2} text="Exámenes médicos de ingreso." />
                <Step num={3} text="Firma de contrato laboral." />
                <Step num={4} text="Afiliación a Seguridad Social." />
            </div>
        </div>
    </div>
);

const RoleItem: React.FC<{ text: string }> = ({ text }) => (
    <li className="flex items-start gap-2 text-slate-700 text-sm">
        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 shrink-0"></div>
        <span>{text}</span>
    </li>
);

const Step: React.FC<{ num: number; text: string }> = ({ num, text }) => (
    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
            {num}
        </div>
        <span className="text-sm font-medium text-slate-700">{text}</span>
    </div>
);

export default ManualsPage;