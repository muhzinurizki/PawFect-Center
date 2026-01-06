import React, { useState } from "react";
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
} from "lucide-react";

export default function InvoiceList({ auth = {}, invoices = [] }) {
    const [searchTerm, setSearchTerm] = useState("");

    // --- LOGIC FILTER ---
    const filteredInvoices = invoices.filter(
        (inv) =>
            (inv.customer_name?.toLowerCase() || "").includes(
                searchTerm.toLowerCase()
            ) ||
            (inv.pet_name?.toLowerCase() || "").includes(
                searchTerm.toLowerCase()
            ) ||
            (inv.booking_code?.toLowerCase() || "").includes(
                searchTerm.toLowerCase()
            )
    );

    // Format mata uang helper
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
                            placeholder="Cari kode, nama, atau anabul..."
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
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex items-center gap-5">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Confirmed Invoices
                            </p>
                            <p className="text-2xl font-black tracking-tighter">
                                {invoices.length}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex items-center gap-5">
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Payment Status
                            </p>
                            <p className="text-2xl font-black tracking-tighter text-emerald-600">
                                100% PAID
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex items-center gap-5">
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Update Cycle
                            </p>
                            <p className="text-2xl font-black tracking-tighter italic">
                                Real-time
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
                                Verified Transactions
                            </h3>
                        </div>
                    </div>

                    <div className="overflow-x-auto p-4">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-6 py-3">Reference</th>
                                    <th className="px-6 py-3">
                                        Customer & Pet
                                    </th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Issue Date</th>
                                    <th className="px-6 py-3 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInvoices.length > 0 ? (
                                    filteredInvoices.map((inv) => (
                                        <tr
                                            key={inv.id}
                                            className="group transition-all"
                                        >
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-indigo-50/50 rounded-l-2xl border-y border-l border-transparent group-hover:border-indigo-100 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-indigo-600 transition-colors">
                                                        <Receipt size={14} />
                                                    </div>
                                                    <span className="font-mono font-black text-slate-900 text-xs tracking-tighter">
                                                        #{inv.booking_code}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-indigo-50/50 border-y border-transparent group-hover:border-indigo-100 transition-all">
                                                <div className="font-black text-sm text-slate-800 leading-none">
                                                    {inv.customer_name}
                                                </div>
                                                <div className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight mt-1 italic">
                                                    🐾 {inv.pet_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-indigo-50/50 border-y border-transparent group-hover:border-indigo-100 transition-all">
                                                <div className="text-xs font-black text-slate-900">
                                                    {formatIDR(
                                                        inv.service?.price
                                                    )}
                                                </div>
                                                <div className="text-[9px] text-slate-400 font-bold uppercase">
                                                    {inv.service?.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-indigo-50/50 border-y border-transparent group-hover:border-indigo-100 transition-all">
                                                <div className="text-xs font-bold text-slate-600 leading-none">
                                                    {inv.booking_date}
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-1.5">
                                                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter">
                                                        Confirmed
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-indigo-50/50 rounded-r-2xl border-y border-r border-transparent group-hover:border-indigo-100 text-right transition-all">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route(
                                                            "invoices.edit",
                                                            inv.id
                                                        )}
                                                        className="p-2.5 bg-white text-slate-400 hover:text-indigo-600 rounded-xl border border-slate-100 hover:border-indigo-100 shadow-sm transition-all"
                                                        title="Edit Invoice Data"
                                                    >
                                                        <Edit3 size={14} />
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "invoices.show",
                                                            inv.id
                                                        )} // Mengarah ke rute show (Detail)
                                                        className="flex items-center gap-2 bg-slate-900 text-white pl-4 pr-3 py-2.5 rounded-xl text-[10px] font-black hover:bg-indigo-600 transition-all shadow-md active:scale-95 uppercase tracking-widest group/btn"
                                                    >
                                                        View{" "}
                                                        <ChevronRight
                                                            size={14}
                                                            className="group-hover/btn:translate-x-0.5 transition-transform"
                                                        />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-24 text-center"
                                        >
                                            <div className="flex flex-col items-center opacity-30">
                                                <FilterX
                                                    size={60}
                                                    strokeWidth={1}
                                                />
                                                <p className="mt-4 font-black uppercase tracking-[0.4em] text-[10px]">
                                                    No matches found
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FOOTER INFO */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-6 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Paws Hub Management System • Secure Billing v2.0
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400"
                                >
                                    {i}
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">
                            Authorized Personnel Only
                        </span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
