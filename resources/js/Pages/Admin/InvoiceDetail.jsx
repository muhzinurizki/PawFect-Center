import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft, Printer, Edit3, 
    User, Phone, Calendar, 
    ShieldCheck, Hash, Scissors,
    Info, CreditCard, History
} from 'lucide-react';

export default function InvoiceDetail({ auth, booking }) {
    const formatIDR = (price) => new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(price || 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href={route('invoices.index')} className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
                                Transaction Detail <span className="text-indigo-500 font-mono italic">#{booking.booking_code}</span>
                            </h2>
                            <p className="text-slate-500 font-medium uppercase text-[10px] tracking-[0.2em] mt-1 italic font-mono">Status: Verified Transaction</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <Link 
                            href={route('invoices.edit', booking.id)}
                            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <Edit3 size={16} /> Edit Record
                        </Link>
                        <Link 
                            href={route('bookings.invoice', booking.id)}
                            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                        >
                            <Printer size={16} /> Generate Print
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Detail #${booking.booking_code}`} />

            <div className="max-w-5xl mx-auto py-8 space-y-8">
                {/* STATUS BAR */}
                <div className="bg-emerald-500 text-white p-4 rounded-[2rem] flex items-center justify-center gap-3 shadow-lg shadow-emerald-100">
                    <ShieldCheck size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.3em]">This transaction has been fully paid and verified in our database</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COL: CUSTOMER & PET */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mb-8 flex items-center gap-2">
                                <Info size={14} /> Information Identity
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl"><User size={20} /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Name</p>
                                            <p className="text-xl font-black text-slate-900">{booking.customer_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl"><Phone size={20} /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                                            <p className="text-lg font-bold text-slate-700">{booking.customer_phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 italic font-black">
                                        <div className="p-3 bg-indigo-50 text-indigo-500 rounded-2xl uppercase">🐾</div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Pet Name</p>
                                            <p className="text-2xl font-black text-indigo-600">{booking.pet_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl"><Calendar size={20} /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visit Date</p>
                                            <p className="text-lg font-bold text-slate-700">{booking.booking_date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SERVICE SUMMARY */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mb-8">Service Summary</h3>
                            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 bg-white rounded-2xl text-indigo-600 shadow-sm"><Scissors size={24} /></div>
                                    <div>
                                        <p className="font-black text-slate-900 text-lg uppercase tracking-tight">{booking.service?.name}</p>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Professional Care Package</p>
                                    </div>
                                </div>
                                <p className="text-2xl font-black text-slate-900">{formatIDR(booking.service?.price)}</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COL: BILLING SUMMARY */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200">
                            <div className="flex items-center gap-2 mb-8 opacity-50">
                                <CreditCard size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest italic">Billing Summary</span>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-bold opacity-60">
                                    <span>Subtotal</span>
                                    <span>{formatIDR(booking.service?.price)}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold opacity-60">
                                    <span>Tax (0%)</span>
                                    <span>Rp 0</span>
                                </div>
                                <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Total Paid</p>
                                        <p className="text-4xl font-black tracking-tighter text-indigo-400 italic">
                                            {formatIDR(booking.service?.price)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
                                <History size={14} /> Audit Trail
                            </h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-0.5 h-12 bg-slate-100 relative">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-tight text-slate-900">Payment Verified</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase italic">System • Automated</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-0.5 h-6 bg-slate-50 relative">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500"></div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-tight text-slate-900">Record Created</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase italic">{booking.booking_date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}