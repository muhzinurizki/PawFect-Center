import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    PawPrint as LogoIcon, 
    LogOut, 
    LayoutDashboard, 
    FileText, 
    Settings,
    Menu,
    X,
    ChevronRight,
    User
} from 'lucide-react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();

    // Effect untuk deteksi scroll agar navbar berubah style
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => url.startsWith(path);

    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            {/* Navigasi Utama */}
            <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
                scrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center bg-white rounded-[2rem] px-6 py-3 shadow-xl shadow-slate-200/40 border border-slate-50">
                        
                        {/* Area Kiri: Brand & Menu */}
                        <div className="flex items-center gap-8">
                            <Link href="/dashboard" className="flex items-center gap-3 group">
                                <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2.5 rounded-2xl shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <LogoIcon className="text-white" size={20} />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-lg font-black tracking-tighter leading-none text-slate-900 uppercase">Paws Hub</h1>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em]">Professional</span>
                                </div>
                            </Link>

                            {/* Navigasi Desktop */}
                            <div className="hidden md:flex items-center gap-1">
                                <NavLink 
                                    href={route('dashboard')} 
                                    active={isActive('/dashboard')} 
                                    icon={<LayoutDashboard size={16} />}
                                    label="Console" 
                                />
                                <NavLink 
                                    href={route('invoices.index')} 
                                    active={isActive('/invoices')} 
                                    icon={<FileText size={16} />}
                                    label="Invoices" 
                                />
                            </div>
                        </div>

                        {/* Area Kanan: User & LogOut */}
                        <div className="hidden md:flex items-center gap-5">
                            <div className="flex items-center gap-3 pr-2 border-r border-slate-100">
                                <div className="text-right">
                                    <p className="text-xs font-black text-slate-900">{user?.name || 'Admin'}</p>
                                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter italic">Manager</p>
                                </div>
                                <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                                    <User size={20} className="text-slate-400" />
                                </div>
                            </div>
                            
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button" 
                                className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all border border-transparent hover:border-rose-100 group"
                            >
                                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Tombol Mobile */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors"
                            >
                                {showingNavigationDropdown ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigasi Mobile Dropdown */}
                <div className={`absolute top-full left-0 w-full px-4 mt-2 transition-all duration-300 ease-in-out ${
                    showingNavigationDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}>
                    <div className="bg-white rounded-[2rem] p-4 shadow-2xl border border-slate-50 space-y-2">
                        <MobileNavLink href={route('dashboard')} active={isActive('/dashboard')} label="Dashboard Console" />
                        <MobileNavLink href={route('invoices.index')} active={isActive('/invoices')} label="E-Invoice Archive" />
                        <div className="pt-2 border-t border-slate-50">
                            <Link href={route('logout')} method="post" as="button" className="w-full text-left px-5 py-4 rounded-2xl font-black text-xs text-rose-500 bg-rose-50/50 flex justify-between items-center uppercase tracking-widest">
                                Sign Out <LogOut size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Konten Halaman */}
            <div className="pt-32 pb-20">
                {header && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                        <div className="relative">
                            <div className="absolute -left-4 top-0 w-1 h-full bg-orange-500 rounded-full"></div>
                            {header}
                        </div>
                    </div>
                )}

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

// Sub-komponen agar kode bersih
function NavLink({ href, active, icon, label }) {
    return (
        <Link 
            href={href} 
            className={`px-5 py-2.5 rounded-2xl text-[11px] font-black transition-all duration-300 flex items-center gap-2 uppercase tracking-widest ${
                active 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
        >
            {icon} {label}
        </Link>
    );
}

function MobileNavLink({ href, active, label }) {
    return (
        <Link 
            href={href} 
            className={`flex justify-between items-center px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                active ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-600 bg-slate-50'
            }`}
        >
            {label} <ChevronRight size={16} />
        </Link>
    );
}