import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    LayoutDashboard, UserCircle, LogOut, Menu, X, 
    PawPrint, Bell, Search, Settings, ChevronRight, 
    CalendarCheck, Users, PieChart, Plus, HelpCircle
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { label: 'Overview', icon: LayoutDashboard, route: 'dashboard', active: 'dashboard' },
        { label: 'Reservations', icon: CalendarCheck, route: 'dashboard', active: 'reservations.*' },
        { label: 'Clients', icon: Users, route: 'dashboard', active: 'clients.*' },
        { label: 'Analytics', icon: PieChart, route: 'dashboard', active: 'analytics' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-orange-100 selection:text-orange-600">
            {/* --- SLIM SIDEBAR (FIXED OVERFLOW) --- */}
            <aside className={`fixed inset-y-0 left-0 z-50 bg-slate-900 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isSidebarOpen ? 'w-64' : 'w-[88px]'
            } hidden lg:flex flex-col m-3 rounded-[2rem] shadow-xl overflow-hidden border border-white/5`}>
                
                {/* Logo Section */}
                <div className="h-24 flex items-center px-[22px] overflow-hidden shrink-0">
                    <div className="bg-orange-500 p-2.5 rounded-xl shadow-lg shadow-orange-500/40 shrink-0">
                        <PawPrint className="w-5 h-5 text-white" />
                    </div>
                    <span className={`ml-4 font-black text-xl tracking-tighter text-white transition-all duration-300 whitespace-nowrap ${
                        isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}>
                        Paws<span className="text-orange-500">Hub.</span>
                    </span>
                </div>

                {/* Navigation Links - Overflow Hidden to prevent scroll on collapse */}
                <nav className="flex-1 px-3 space-y-1 mt-2 overflow-hidden">
                    {menuItems.map((item) => {
                        const active = route().current(item.active);
                        return (
                            <Link
                                key={item.label}
                                href={route(item.route)}
                                className={`flex items-center h-12 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                                    active 
                                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                                }`}
                            >
                                <div className="w-[64px] shrink-0 flex items-center justify-center">
                                    <item.icon size={20} />
                                </div>
                                
                                <span className={`font-bold text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-opacity duration-200 ${
                                    isSidebarOpen ? 'opacity-100' : 'opacity-0'
                                }`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Profile & Logout Section */}
                <div className="p-3 bg-black/20 shrink-0 overflow-hidden">
                    <Link 
                        href={route('profile.edit')}
                        className={`flex items-center h-12 rounded-xl transition-all hover:bg-white/5 group ${
                            route().current('profile.edit') ? 'bg-white/10' : ''
                        }`}
                    >
                        <div className="w-[64px] shrink-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white font-black text-[10px] border border-white/10 group-hover:border-orange-500 transition-colors">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className={`transition-opacity duration-200 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                            <p className="text-[10px] font-black text-white uppercase tracking-tighter">{user.name}</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase">Profile Settings</p>
                        </div>
                    </Link>
                    
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center h-12 mt-1 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all"
                    >
                        <div className="w-[64px] shrink-0 flex items-center justify-center">
                            <LogOut size={18} />
                        </div>
                        <span className={`font-black text-[10px] uppercase tracking-widest transition-opacity duration-200 ${
                            isSidebarOpen ? 'opacity-100' : 'opacity-0'
                        }`}>
                            Sign Out
                        </span>
                    </Link>
                </div>
            </aside>

            {/* --- MAIN AREA --- */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-[272px]' : 'lg:ml-[112px]'}`}>
                
                {/* --- PROFESSIONAL TOPBAR --- */}
                <header className="h-20 flex items-center justify-between px-8 sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-slate-100 shadow-sm shadow-slate-200/20">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-orange-500 hover:bg-white transition-all shadow-sm active:scale-95"
                        >
                            {isSidebarOpen ? <Menu size={18} /> : <X size={18} />}
                        </button>
                        
                        {/* Quick Action: Create New (Helpful Function) */}
                        <div className="hidden md:flex items-center gap-2 px-1.5 py-1.5 bg-slate-100 rounded-[14px] border border-slate-200/60 transition-all hover:bg-slate-200/40">
                            <button className="flex items-center gap-2 px-4 py-1.5 bg-white text-slate-700 rounded-lg text-xs font-black uppercase tracking-widest shadow-sm hover:text-orange-600 transition-all">
                                <Plus size={14} className="text-orange-500" /> New Booking
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                                <HelpCircle size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar Utility */}
                        <div className="hidden lg:flex items-center relative group">
                            <Search size={16} className="absolute left-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Cari data anabul..." 
                                className="bg-slate-50 border-slate-200 border rounded-xl pl-11 pr-4 py-2 text-xs font-bold w-64 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="h-8 w-px bg-slate-100 mx-2" />

                        {/* Notifications */}
                        <button className="relative p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-orange-500 hover:bg-white transition-all">
                            <Bell size={18} />
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
                        </button>

                        {/* Profile Summary Tool */}
                        <div className="hidden sm:flex flex-col items-end leading-none">
                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{user.name}</span>
                            <span className="text-[9px] font-bold text-emerald-500 uppercase mt-1">Online</span>
                        </div>
                    </div>
                </header>

                <main className="p-8 pt-4 animate-in fade-in slide-in-from-top-2 duration-700">
                    {header && (
                        <div className="mb-8 border-b border-slate-100 pb-6 flex items-center justify-between">
                            <div>{header}</div>
                            {/* Breadcrumb style indicator */}
                            <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                <span className="hover:text-orange-500 cursor-pointer transition-colors">Admin</span>
                                <ChevronRight size={10} />
                                <span className="text-slate-900 font-black italic underline decoration-orange-500/30">Current View</span>
                            </div>
                        </div>
                    )}
                    
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}