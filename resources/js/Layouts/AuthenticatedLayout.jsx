import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { LayoutDashboard, UserCircle, LogOut, Menu, X, PawPrint, ChevronDown } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* --- NAVIGATION BAR --- */}
            <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm shadow-slate-200/20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between items-center">
                        <div className="flex items-center gap-10">
                            {/* Logo Section */}
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-200">
                                    <PawPrint className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-black text-xl tracking-tighter text-slate-900 italic">
                                    Paws<span className="text-orange-500">Hub.</span>
                                </span>
                            </Link>

                            {/* Desktop Navigation Links */}
                            <div className="hidden space-x-1 sm:flex h-20">
                                <NavLink 
                                    href={route('dashboard')} 
                                    active={route().current('dashboard')}
                                    className="flex items-center gap-2 px-4 border-b-4 transition-all"
                                >
                                    <LayoutDashboard size={18} />
                                    <span className="font-black text-sm uppercase tracking-widest">Dashboard</span>
                                </NavLink>
                                {/* Tambahkan NavLink lain di sini jika ada */}
                            </div>
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="hidden sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-3 px-4 py-2 border-2 border-slate-50 bg-slate-50/50 rounded-2xl text-sm font-bold text-slate-700 hover:bg-white hover:border-orange-200 hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-black text-xs shadow-inner">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="max-w-[100px] truncate">{user.name}</span>
                                            <ChevronDown size={16} className="text-slate-400" />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="48" align="right" contentClasses="py-2 bg-white rounded-2xl shadow-2xl border border-slate-100">
                                        <div className="px-4 py-3 border-b border-slate-50 mb-1">
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Signed in as</p>
                                            <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                                        </div>

                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2 font-bold text-slate-600 hover:text-orange-600">
                                            <UserCircle size={16} /> Profile Settings
                                        </Dropdown.Link>
                                        
                                        <div className="h-px bg-slate-50 my-1" />

                                        <Dropdown.Link 
                                            href={route('logout')} 
                                            method="post" 
                                            as="button" 
                                            className="flex items-center gap-2 font-bold text-rose-600 hover:bg-rose-50 w-full"
                                        >
                                            <LogOut size={16} /> Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Hamburger Menu (Mobile) */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((state) => !state)}
                                className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-orange-600 transition duration-150 focus:outline-none"
                            >
                                {showingNavigationDropdown ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- MOBILE NAVIGATION --- */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden bg-white border-t border-slate-100 shadow-xl`}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-slate-100 pb-1 pt-4 bg-slate-50/50">
                        <div className="px-6 flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-black">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <div className="text-base font-black text-slate-900">{user.name}</div>
                                <div className="text-sm font-medium text-slate-500">{user.email}</div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1 px-2">
                            <ResponsiveNavLink href={route('profile.edit')} className="rounded-xl flex items-center gap-2">
                                <UserCircle size={18} /> Profile Settings
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="rounded-xl text-rose-600 flex items-center gap-2"
                            >
                                <LogOut size={18} /> Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- HEADER --- */}
            {header && (
                <header className="bg-white/60 backdrop-blur-md border-b border-slate-100">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* --- MAIN CONTENT --- */}
            <main className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                {children}
            </main>
        </div>
    );
}