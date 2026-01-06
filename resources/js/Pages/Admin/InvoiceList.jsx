import React, { useState, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Eye,
    Search,
    Receipt,
    FileText,
    FilterX,
    CreditCard,
    Calendar,
    Edit3,
    ChevronRight,
    TrendingUp,
} from "lucide-react";

export default function InvoiceList({ auth = {}, invoices = [] }) {
    const [searchTerm, setSearchTerm] = useState("");

    // --- LOGIC CALCULATIONS (Memoized for Performance) ---
    const stats = useMemo(() => {
        const completed = invoices.filter(inv => inv.status === 'completed');
        const totalRevenue = completed.reduce((acc, curr) => acc + (curr.service?.price || 0), 0);
        return {
            totalCount: invoices.length,
            completedCount: completed.length,
            revenue: totalRevenue
        };
    }, [invoices]);

    const filteredInvoices = invoices.filter(
        (inv) =>
            (inv.customer_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (inv.pet_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (inv.booking_code?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    const formatIDR = (price) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price || 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
                            Invoice Archive{" "}
                            <Receipt className="text-indigo-500" size={32} />
                        </h2>
                        <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.2em]">
                            Financial Records & Transaction History
                        </p>
                    </div>

                    <div className="relative group min-w-[320px]">
                        <input
                            type="text"
                            placeholder="Search code, name, or pet..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-xs font-bold shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
                            size={18}
                        />
                    </div>
                </div>
            }
        >
            <Head title="E-Invoices Archive" />

            <div className="space-y-8">
                {/* QUICK STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex items-center gap-5 group hover:border-indigo-100 transition-all">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Invoices</p>
                            <p className="text-2xl font-black tracking-tighter text-slate-900">{stats.totalCount}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex items-center gap-5 group hover:border-emerald-100 transition-all">
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
                            <p className="text-2xl font-black tracking-tighter text-emerald-600">{formatIDR(stats.revenue)}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex items-center gap-5 group hover:border-orange-100 transition-all">
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl group-hover:scale-110 transition-transform">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed</p>
                            <p className="text-2xl font-black tracking-tighter text-slate-900">
                                {stats.completedCount} <span className="text-slate-300 text-lg">/ {stats.totalCount}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* TABLE CARD */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-indigo-50/30 to-transparent">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                            <h3 className="font-black text-xs uppercase tracking-[0.1em] text-slate-800">
                                Verified Transactions History
                            </h3>
                        </div>
                    </div>

                    <div className="overflow-x-auto p-4">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-6 py-3">Reference</th>
                                    <th className="px-6 py-3">Customer & Pet</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInvoices.length > 0 ? (
                                    filteredInvoices.map((inv) => (
                                        <tr key={inv.id} className="group transition-all">
                                            {/* REFERENCE */}
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-indigo-50/30 rounded-l-2xl border-y border-l border-transparent group-hover:border-indigo-100 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400 group-hover:text-indigo-600 transition-colors">
                                                        <Receipt size={14} />
                                                    </div>
                                                    <span className="font-mono font-black text-slate-900 text-xs tracking-tighter">
                                                        #{inv.booking_code}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* CUSTOMER & PET */}
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-indigo-50/30 border-y border-transparent group-hover:border-indigo-100 transition-all">
                                                <div className="font-black text-sm text-slate-800 leading-none">{inv.customer_name}</div>
                                                <div className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight mt-1 italic flex items-center gap-1">
                                                    <span className="bg-indigo-100 px-1.5 py-0.5 rounded text-[8px]">ANABUL</span> {inv.pet_name}
                                                </div>
                                            </td>

                                            {/* AMOUNT */}
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-indigo-50/30 border-y border-transparent group-hover:border-indigo-100 transition-all">
                                                <div className="text-xs font-black text-slate-900">{formatIDR(inv.service?.price)}</div>
                                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{inv.service?.name}</div>
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-indigo-50/30 border-y border-transparent group-hover:border-indigo-100 transition-all">
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-[10px] font-bold text-slate-600">{inv.booking_date}</div>
                                                    <div className={`flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full border ${
                                                        inv.status === 'completed' 
                                                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                                                        : 'bg-amber-50 border-amber-100 text-amber-600'
                                                    }`}>
                                                        <div className={`w-1 h-1 rounded-full ${inv.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                                                        <span className="text-[8px] font-black uppercase tracking-tighter">
                                                            {inv.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-indigo-50/30 rounded-r-2xl border-y border-r border-transparent group-hover:border-indigo-100 text-right transition-all">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route("invoices.edit", inv.id)}
                                                        className="p-2.5 bg-white text-slate-400 hover:text-indigo-600 rounded-xl border border-slate-100 hover:border-indigo-100 shadow-sm transition-all"
                                                        title="Edit Data"
                                                    >
                                                        <Edit3 size={14} />
                                                    </Link>
                                                    <Link
                                                        href={route("invoices.show", inv.id)}
                                                        className="flex items-center gap-2 bg-slate-900 text-white pl-4 pr-3 py-2.5 rounded-xl text-[10px] font-black hover:bg-indigo-600 transition-all shadow-md active:scale-95 uppercase tracking-widest group/btn"
                                                    >
                                                        Details <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-24 text-center">
                                            <div className="flex flex-col items-center">
                                                <FilterX size={60} className="text-slate-200" strokeWidth={1} />
                                                <p className="mt-4 font-black uppercase tracking-[0.4em] text-[10px] text-slate-400">
                                                    No Transaction Matches
                                                </p>
                                                <button 
                                                    onClick={() => setSearchTerm("")}
                                                    className="mt-4 text-[10px] font-black text-indigo-600 uppercase underline tracking-widest"
                                                >
                                                    Clear All Filters
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}