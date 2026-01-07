import { useState } from "react";
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
} from "lucide-react";

export default function AuthenticatedLayout({ user, header, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { url } = usePage();

    const isActive = (path) => url.startsWith(path);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* --- SIDEBAR --- */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-100 transition-all duration-300 ease-in-out shadow-sm
                ${isSidebarOpen ? "w-72" : "w-20"} hidden md:flex flex-col`}
            >
                {/* Logo Section */}
                <div className="p-6 mb-4">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2.5 rounded-2xl shadow-lg shadow-orange-500/30 shrink-0">
                            <LogoIcon className="text-white" size={20} />
                        </div>
                        {isSidebarOpen && (
                            <div className="overflow-hidden whitespace-nowrap">
                                <h1 className="text-lg font-black tracking-tighter text-slate-900 uppercase leading-none">
                                    Paws Hub
                                </h1>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                                    Professional
                                </span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 space-y-2">
                    <SidebarLink
                        href={route("dashboard")}
                        active={isActive("/dashboard")}
                        icon={<LayoutDashboard size={20} />}
                        label="Console"
                        isOpen={isSidebarOpen}
                    />
                    <SidebarLink
                        href={route("pets.index")}
                        active={isActive("/admin/pets")}
                        icon={<Dog size={20} />}
                        label="Pet Database"
                        isOpen={isSidebarOpen}
                    />
                    <SidebarLink
                        href={route("invoices.index")}
                        active={isActive("/invoices")}
                        icon={<FileText size={20} />}
                        label="E-Invoices"
                        isOpen={isSidebarOpen}
                    />
                </nav>

                {/* Bottom Section (User & Toggle) */}
                <div className="p-4 border-t border-slate-50 space-y-2">
                    <div
                        className={`flex items-center gap-3 p-3 rounded-2xl bg-slate-50 transition-all ${
                            !isSidebarOpen && "justify-center"
                        }`}
                    >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shrink-0 shadow-sm text-slate-400">
                            <User size={20} />
                        </div>
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="text-xs font-black text-slate-900 truncate">
                                    {user?.name || "Admin"}
                                </p>
                                <p className="text-[10px] font-bold text-orange-500 uppercase italic">
                                    Manager
                                </p>
                            </div>
                        )}
                    </div>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className={`w-full flex items-center gap-3 p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all group ${
                            !isSidebarOpen && "justify-center"
                        }`}
                    >
                        <LogOut
                            size={20}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        {isSidebarOpen && (
                            <span className="text-xs font-black uppercase tracking-widest">
                                Sign Out
                            </span>
                        )}
                    </Link>

                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden md:flex absolute -right-3 top-20 bg-white border border-slate-100 rounded-full p-1 shadow-sm text-slate-400 hover:text-orange-500 transition-colors"
                    >
                        <ChevronLeft
                            size={16}
                            className={`transition-transform duration-300 ${
                                !isSidebarOpen && "rotate-180"
                            }`}
                        />
                    </button>
                </div>
            </aside>

            {/* --- MOBILE OVERLAY & NAV --- */}
            {/* Tambahkan logika mobile nav jika diperlukan seperti kode sebelumnya, 
                namun di sini fokus pada Sidebar Desktop dahulu */}

            {/* --- MAIN CONTENT AREA --- */}
            <main
                className={`flex-1 transition-all duration-300 ${
                    isSidebarOpen ? "md:ml-72" : "md:ml-20"
                }`}
            >
                {/* Sticky Header Content (Optional for Page Title) */}
                <header className="sticky top-0 z-30 bg-[#F8FAFC]/80 backdrop-blur-md px-8 py-6">
                    <div className="max-w-7xl mx-auto">
                        {header && (
                            <div className="relative pl-6">
                                <div className="absolute left-0 top-1 w-1.5 h-full bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)]"></div>
                                {header}
                            </div>
                        )}
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-8 pb-10">{children}</div>
            </main>
        </div>
    );
}

// Sub-komponen SidebarLink
function SidebarLink({ href, active, icon, label, isOpen }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group relative
            ${
                active
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                    : "text-slate-400 hover:bg-white hover:text-slate-900 shadow-transparent hover:shadow-sm"
            } ${!isOpen && "justify-center"}`}
        >
            <div
                className={`transition-transform duration-300 ${
                    active ? "scale-110" : "group-hover:scale-110"
                }`}
            >
                {icon}
            </div>

            {isOpen ? (
                <span className="text-xs font-black uppercase tracking-[0.15em]">
                    {label}
                </span>
            ) : (
                /* Tooltip saat sidebar ditutup */
                <div className="absolute left-16 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 font-bold uppercase tracking-widest">
                    {label}
                </div>
            )}
        </Link>
    );
}
