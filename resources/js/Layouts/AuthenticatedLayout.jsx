import { useState, useEffect, useCallback } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    PawPrint as LogoIcon,
    LogOut,
    LayoutDashboard,
    FileText,
    Settings,
    Menu,
    X,
    User,
    Dog,
    ChevronLeft,
    Bell,
    CheckCircle,
    AlertCircle,
    Activity,
    ChevronRight,
} from "lucide-react";

export default function AuthenticatedLayout({ user, header, children }) {
    const { url, props } = usePage();
    const { flash } = props;

    // State Management
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Responsive Handlers
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [url]);

    // Robust Active Link Detection
    const isActive = useCallback((path) => {
        if (path === '/dashboard' && url === '/dashboard') return true;
        if (path !== '/dashboard') {
            return url.startsWith(path);
        }
        return false;
    }, [url]);

    return (
        <div className="min-h-screen bg-[#FDFDFD] flex overflow-x-hidden font-sans selection:bg-orange-100 selection:text-orange-600">
            
            {/* 1. NOTIFICATION TOASTS (Top Layer) */}
            <div className="fixed top-6 right-6 z-[100] space-y-4 pointer-events-none">
                {flash?.success && (
                    <div className="bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 pointer-events-auto border border-emerald-400/20">
                        <CheckCircle size={20} className="shrink-0" />
                        <p className="text-xs font-black tracking-widest uppercase">{flash.success}</p>
                    </div>
                )}
            </div>

            {/* 2. MOBILE SIDEBAR OVERLAY */}
            <div 
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[80] md:hidden transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* 3. MASTER SIDEBAR */}
            <aside className={`fixed inset-y-0 left-0 z-[90] bg-white border-r border-slate-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col
                ${isSidebarOpen ? "w-72" : "w-24"} 
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                {/* Logo Section */}
                <div className="h-24 flex items-center px-7 shrink-0">
                    <Link href="/dashboard" className="flex items-center gap-4 group">
                        <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl shadow-slate-200 shrink-0 group-hover:bg-orange-600 transition-colors duration-300">
                            <LogoIcon className="text-white" size={24} />
                        </div>
                        {(isSidebarOpen || isMobileMenuOpen) && (
                            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                                <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase leading-none">Paws<span className="text-orange-500">Hub</span></h1>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1.5 underline decoration-orange-500/50 underline-offset-4">V.2.0.44</p>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Navigation Scroll Area */}
                <nav className="flex-1 px-4 space-y-7 overflow-y-auto no-scrollbar py-4">
                    <div>
                        <SectionLabel label="Operations" isOpen={isSidebarOpen || isMobileMenuOpen} />
                        <div className="space-y-1.5">
                            <SidebarLink 
                                href={route("dashboard")} 
                                active={isActive("/dashboard")} 
                                icon={<LayoutDashboard size={20} />} 
                                label="Console" 
                                isOpen={isSidebarOpen || isMobileMenuOpen} 
                            />
                            <SidebarLink 
                                href={route("pets.index")} 
                                active={isActive("/admin/pets")} 
                                icon={<Dog size={20} />} 
                                label="Patients" 
                                isOpen={isSidebarOpen || isMobileMenuOpen} 
                            />
                            <SidebarLink 
                                href={route("clinical-records.index")} 
                                active={isActive("/admin/clinical-records")} 
                                icon={<Activity size={20} />} 
                                label="Clinical_Log" 
                                isOpen={isSidebarOpen || isMobileMenuOpen} 
                            />
                        </div>
                    </div>

                    <div>
                        <SectionLabel label="Financial" isOpen={isSidebarOpen || isMobileMenuOpen} />
                        <div className="space-y-1.5">
                            <SidebarLink 
                                href={route("invoices.index")} 
                                active={isActive("/admin/invoices")} 
                                icon={<FileText size={20} />} 
                                label="Billing" 
                                isOpen={isSidebarOpen || isMobileMenuOpen} 
                            />
                            <SidebarLink 
                                href="#" 
                                active={isActive("/admin/settings")} 
                                icon={<Settings size={20} />} 
                                label="Config" 
                                isOpen={isSidebarOpen || isMobileMenuOpen} 
                            />
                        </div>
                    </div>
                </nav>

                {/* Account Section */}
                <div className="p-4 bg-slate-50/50 mt-auto border-t border-slate-100">
                    <div className={`flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all ${!isSidebarOpen && !isMobileMenuOpen && "md:justify-center"}`}>
                        <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0 font-black text-xs">
                            {user.name.charAt(0)}
                        </div>
                        {(isSidebarOpen || isMobileMenuOpen) && (
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-black text-slate-900 truncate uppercase tracking-tighter">{user.name}</p>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Authorized</p>
                            </div>
                        )}
                    </div>
                    
                    <Link 
                        href={route("logout")} 
                        method="post" 
                        as="button" 
                        className="w-full mt-3 flex items-center justify-center gap-2 p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-black text-[9px] uppercase tracking-[0.2em]"
                    >
                        <LogOut size={14} />
                        {(isSidebarOpen || isMobileMenuOpen) && <span>Terminate_Session</span>}
                    </Link>
                </div>

                {/* Sidebar Collapse Toggle (Desktop) */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    className="hidden lg:flex absolute -right-3.5 top-11 bg-slate-900 border-4 border-white text-white rounded-full p-1 shadow-lg hover:bg-orange-600 transition-all z-[100]"
                >
                    <ChevronLeft size={14} className={`transition-transform duration-500 ${!isSidebarOpen && "rotate-180"}`} />
                </button>
            </aside>

            {/* 4. MAIN LAYOUT WRAPPER */}
            <main className={`flex-1 transition-all duration-500 min-w-0 ${isSidebarOpen ? "lg:ml-72" : "lg:ml-24"}`}>
                
                {/* Responsive Sticky Header */}
                <header className="sticky top-0 z-[50] bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center gap-5">
                            <button 
                                onClick={() => setIsMobileMenuOpen(true)} 
                                className="lg:hidden p-2.5 bg-slate-900 text-white rounded-xl shadow-lg active:scale-90 transition-transform"
                            >
                                <Menu size={20} />
                            </button>
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                                    <span className="hover:text-orange-500 cursor-default transition-colors italic">System_Root</span>
                                    <ChevronRight size={10} className="text-slate-300" />
                                    <span className="text-slate-900">{header}</span>
                                </div>
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">{header}</h2>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="hidden sm:flex p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-orange-500 transition-all relative group">
                                <Bell size={18} className="group-hover:rotate-12 transition-transform" />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white ring-4 ring-orange-500/10"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

// Internal Helper: Section Labels
function SectionLabel({ label, isOpen }) {
    return (
        <div className={`flex items-center gap-3 px-4 mb-4 ${!isOpen && "justify-center"}`}>
            <p className={`text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] transition-opacity duration-300 ${!isOpen ? "opacity-0 absolute" : "opacity-100"}`}>
                {label}
            </p>
            {!isOpen && <div className="w-5 h-[2px] bg-slate-100 rounded-full" />}
        </div>
    );
}

// Internal Helper: Sidebar Navigation Links
function SidebarLink({ href, active, icon, label, isOpen }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative
            ${active 
                ? "bg-slate-900 text-white shadow-2xl shadow-slate-200" 
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1"
            } ${!isOpen && "md:justify-center"}`}
        >
            <div className={`transition-all duration-500 ${active ? "scale-110" : "group-hover:text-orange-500 group-hover:scale-110"}`}>
                {icon}
            </div>

            {isOpen && (
                <span className="text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap overflow-hidden">
                    {label}
                </span>
            )}

            {!isOpen && (
                <div className="hidden lg:block absolute left-20 bg-slate-900 text-white text-[9px] px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 z-[100] font-black uppercase tracking-widest shadow-2xl">
                    {label}
                </div>
            )}

            {active && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,1)]" />
            )}
        </Link>
    );
}