
import React, { useState, useCallback, useEffect } from 'react';
import { Home, Building, ClipboardList, Wrench, Bot, Users, ChevronDown, Sparkles, Briefcase, Shield, GraduationCap, Image as ImageIcon, Film, BrainCircuit, ChevronsLeft, UserSearch, BookUser, Banknote, Bell, Search, UserCircle, Heart, ScrollText, RefreshCcw } from 'lucide-react';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import OnboardingPage from './components/OnboardingPage';
import Chatbot from './components/Chatbot';
import Tutorial, { TUTORIAL_STEPS } from './components/Tutorial';
import TrainingPage from './components/pages/TrainingPage';
import SafetyPage from './components/pages/SafetyPage';
import ImageEditorPage from './components/pages/ImageEditorPage';
import VideoAnalysisPage from './components/pages/VideoAnalysisPage';
import StrategicAnalysisPage from './components/pages/StrategicAnalysisPage';
import PreselectionPage from './components/pages/PreselectionPage';
import ManualsPage from './components/pages/ManualsPage';
import PayrollPage from './components/pages/PayrollPage';
import PresentationLetterPage from './components/pages/PresentationLetterPage';
import WellbeingPage from './components/pages/WellbeingPage';
import ReinductionPage from './components/pages/ReinductionPage';

// Enhanced Falling Items Component
const FallingItems = ({ emoji }: { emoji: string }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 2 + 2}s`,
            animationDelay: `${Math.random() * 1}s`,
            top: '-50px'
          }}
        >
          {emoji}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: 1;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isChatOpen, setChatOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Animation State
  const [animationState, setAnimationState] = useState<{ active: boolean; emoji: string }>({ active: false, emoji: '🥾' });
  
  const [tutorialStep, setTutorialStep] = useState(0);
  const [isTutorialActive, setIsTutorialActive] = useState(false);

  useEffect(() => {
    const hasCompleted = localStorage.getItem('onboardingTutorialCompleted');
    if (hasCompleted !== 'true') {
        setIsTutorialActive(true);
        const firstStepPage = TUTORIAL_STEPS[0].page;
        setCurrentPage(firstStepPage);
        if (firstStepPage.includes('.')) {
          setOpenMenu(firstStepPage.split('.')[0]);
        }
    }
  }, []);

  const triggerAnimation = (emoji: string = '🥾') => {
      setAnimationState({ active: true, emoji });
      setTimeout(() => setAnimationState({ active: false, emoji: '🥾' }), 4000);
  };

  const closeTutorial = () => {
    setIsTutorialActive(false);
    localStorage.setItem('onboardingTutorialCompleted', 'true');
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= TUTORIAL_STEPS.length) {
      closeTutorial();
      return;
    }
    if(stepIndex < 0) return;

    const nextStepConfig = TUTORIAL_STEPS[stepIndex];
    setCurrentPage(nextStepConfig.page);
    if(nextStepConfig.page.includes('.')) {
        setOpenMenu(nextStepConfig.page.split('.')[0]);
    } else {
        setOpenMenu(null);
    }
    setTutorialStep(stepIndex);
  };

  const handleSetPage = (page: string) => {
    setCurrentPage(page);
    if (isTutorialActive) {
      setIsTutorialActive(false);
      localStorage.setItem('onboardingTutorialCompleted', 'true');
    }
  }

  const handleToggleMenu = (menu: string) => {
     if (menu === 'ai') {
        setOpenMenu(openMenu === menu ? null : menu);
    }
  }

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleSetPage} onTriggerAnimation={() => triggerAnimation('🥾')} />;
      case 'onboarding.letter': return <PresentationLetterPage onNavigate={handleSetPage} />;
      case 'onboarding.identity': return <AboutPage onNavigate={handleSetPage} />;
      case 'onboarding.checklist': return <OnboardingPage />; 
      case 'onboarding.reinduction': return <ReinductionPage />;
      case 'operations.training': return <TrainingPage onTriggerReward={(emoji) => triggerAnimation(emoji)} />;
      case 'operations.safety': return <SafetyPage />;
      case 'hr.preselection': return <PreselectionPage />;
      case 'hr.manuals': return <ManualsPage />;
      case 'hr.payroll': return <PayrollPage />;
      case 'hr.wellbeing': return <WellbeingPage />;
      case 'ai.image': return <ImageEditorPage />;
      case 'ai.video': return <VideoAnalysisPage />;
      case 'ai.strategy': return <StrategicAnalysisPage />;
      default: return <HomePage onNavigate={handleSetPage} onTriggerAnimation={() => triggerAnimation('🥾')} />;
    }
  }, [currentPage, handleSetPage]);
  
  const NavItem: React.FC<{ page: string; label: string; icon: React.ReactNode; isSubItem?: boolean; isCollapsed: boolean }> = ({ page, label, icon, isSubItem = false, isCollapsed }) => {
    const isActive = currentPage === page;
    return (
      <button
        onClick={() => handleSetPage(page)}
        className={`flex items-center space-x-3 p-3 w-full text-left rounded-lg transition-all duration-200 group relative ${ 
          isSubItem ? (isCollapsed ? 'pl-3 justify-center' : 'pl-10') : (isCollapsed ? 'justify-center' : '')
        } ${
          isActive
            ? 'bg-red-700 text-white shadow-lg shadow-red-900/20'
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
           {icon}
        </span>
        {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
        {isActive && !isCollapsed && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
      </button>
    );
  };

  const CollapsibleNavItem: React.FC<{name: string, title: string, icon: React.ReactNode, isCollapsed: boolean, children: React.ReactNode}> = ({name, title, icon, isCollapsed, children}) => {
    const isActive = currentPage.startsWith(name) || openMenu === name;
    return (
        <div className="mb-1">
            <button
                onClick={() => handleToggleMenu(name)}
                className={`flex items-center justify-between p-3 w-full text-left rounded-lg transition-colors ${
                    isActive ? 'text-white bg-slate-800' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
                <div className={`flex items-center space-x-3 ${isCollapsed ? 'w-full justify-center' : ''}`}>
                    {icon}
                    {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">{title}</span>}
                </div>
                {!isCollapsed && <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-96 opacity-100 mt-1 space-y-1' : 'max-h-0 opacity-0'}`}>
              {children}
            </div>
        </div>
    )
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden selection:bg-red-100 selection:text-red-900">
      {isTutorialActive && (
        <Tutorial
          stepIndex={tutorialStep}
          onNext={() => goToStep(tutorialStep + 1)}
          onPrev={() => goToStep(tutorialStep - 1)}
          onClose={closeTutorial}
        />
      )}

      {animationState.active && <FallingItems emoji={animationState.emoji} />}
    
      {/* Premium Dark Sidebar */}
      <aside className={`bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-72'} shadow-2xl z-20`}>
        <div className="flex flex-col h-full">
          <div className={`flex items-center h-20 px-6 border-b border-slate-800 ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}>
             <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-lg shadow-lg shadow-red-900/30">
                  <Building className="h-6 w-6 text-white" />
                </div>
                {!isSidebarCollapsed && (
                  <div>
                    <h1 className="text-lg font-bold text-white tracking-tight leading-none">MGP</h1>
                    <span className="text-xs text-slate-400 font-medium tracking-wide">PORTAL CORPORATIVO</span>
                  </div>
                )}
             </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6 custom-scrollbar">
            
            <div className="space-y-1">
               {!isSidebarCollapsed && <h3 className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Principal</h3>}
               <NavItem page="home" label="Dashboard" icon={<Home className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
            </div>

            <div className="space-y-1">
               {!isSidebarCollapsed && <h3 className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Talento Humano</h3>}
               <NavItem page="onboarding.letter" label="Carta del CEO" icon={<ScrollText className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
               <NavItem page="onboarding.checklist" label="Inducción" icon={<ClipboardList className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
               <NavItem page="onboarding.reinduction" label="Re-Inducción" icon={<RefreshCcw className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
               <NavItem page="onboarding.identity" label="Cultura & Legado" icon={<Users className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
               <NavItem page="hr.wellbeing" label="Bienestar & Vida" icon={<Heart className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
               <NavItem page="hr.payroll" label="Nómina & Pagos" icon={<Banknote className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
               <NavItem page="hr.preselection" label="Selección" icon={<UserSearch className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
               <NavItem page="hr.manuals" label="Manual de Roles" icon={<BookUser className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
            </div>

            <div className="space-y-1">
               {!isSidebarCollapsed && <h3 className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Operaciones</h3>}
               <NavItem page="operations.training" label="Academia MGP" icon={<GraduationCap className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
               <NavItem page="operations.safety" label="Centro de Seguridad" icon={<Shield className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
            </div>

             <div className="space-y-1">
               {!isSidebarCollapsed && <h3 className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Inteligencia Artificial</h3>}
                <CollapsibleNavItem name="ai" title="MGP Neural" icon={<Sparkles className="h-5 w-5 text-indigo-400" />} isCollapsed={isSidebarCollapsed}>
                    <NavItem page="ai.image" label="Estudio Creativo" icon={<ImageIcon className="h-5 w-5" />} isSubItem isCollapsed={isSidebarCollapsed} />
                    <NavItem page="ai.video" label="Video Analytics" icon={<Film className="h-5 w-5" />} isSubItem isCollapsed={isSidebarCollapsed} />
                    <NavItem page="ai.strategy" label="Estratega IA" icon={<BrainCircuit className="h-5 w-5" />} isSubItem isCollapsed={isSidebarCollapsed} />
                </CollapsibleNavItem>
            </div>
          </div>
          
           <div className="p-3 border-t border-slate-800">
             <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="flex items-center justify-center space-x-3 p-2 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              <ChevronsLeft className={`h-5 w-5 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 relative">
        {/* Glass Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
             <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-96 border border-slate-200 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 transition-all">
                <Search className="h-4 w-4 text-slate-400 mr-2" />
                <input type="text" placeholder="Buscar procesos, manuales o personas..." className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400" />
             </div>
             
             <div className="flex items-center space-x-6">
                <button className="relative p-2 text-slate-500 hover:text-red-600 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>
                <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-slate-800">Nuevo Colaborador</p>
                        <p className="text-xs text-slate-500">Área de Operaciones</p>
                    </div>
                    <div className="h-10 w-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <UserCircle className="h-6 w-6 text-slate-500" />
                    </div>
                </div>
             </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar scroll-smooth">
            <div className="max-w-7xl mx-auto">
                 {renderPage()}
            </div>
        </main>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        {isChatOpen && <Chatbot currentPage={currentPage} onClose={() => setChatOpen(false)} />}
        <button
          onClick={() => setChatOpen(!isChatOpen)}
          className="bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 focus:outline-none transition-all transform hover:scale-105 hover:-translate-y-1 border-4 border-white"
          aria-label="Open chat"
        >
          <Bot className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

export default App;
