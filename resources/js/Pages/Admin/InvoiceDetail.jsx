import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from '@inertiajs/react'; // Tambahkan router di sini
import { 
    ArrowLeft, Printer, Edit3, 
    User, Phone, Calendar, 
    ShieldCheck, Scissors,
    Info, CreditCard, History,
    CheckCircle2, Clock
} from 'lucide-react';

export default function InvoiceDetail({ auth, booking }) {
    const formatIDR = (price) => new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(price || 0);

    // Fungsi Update Status
    const updateStatus = (newStatus) => {
        if (confirm(`Change status to ${newStatus.toUpperCase()}?`)) {
            router.patch(route('bookings.updateStatus', booking.id), {
                status: newStatus
            });
        }
    };

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
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`h-2 w-2 rounded-full ${booking.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] italic font-mono">
                                    Status: {booking.status}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* Tombol Mark as Completed - Hanya muncul jika status belum completed */}
                        {booking.status !== 'completed' && (
                            <button 
                                onClick={() => updateStatus('completed')}
                                className="flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                            >
                                <CheckCircle2 size={16} /> Mark Completed
                            </button>
                        )}

                        <Link 
                            href={route('invoices.edit', booking.id)}
                            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <Edit3 size={16} /> Edit
                        </Link>
                        
                        <Link 
                            href={route('bookings.invoice', booking.id)}
                            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                        >
                            <Printer size={16} /> Print
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Detail #${booking.booking_code}`} />

            <div className="max-w-5xl mx-auto py-8 space-y-8">
                
                {/* DYNAMIC STATUS BAR */}
                {booking.status === 'completed' ? (
                    <div className="bg-emerald-500 text-white p-4 rounded-[2rem] flex items-center justify-center gap-3 shadow-lg shadow-emerald-100">
                        <ShieldCheck size={20} />
                        <span className="text-xs font-black uppercase tracking-[0.3em]">This transaction is completed and archived</span>
                    </div>
                ) : (
                    <div className="bg-amber-500 text-white p-4 rounded-[2rem] flex items-center justify-center gap-3 shadow-lg shadow-amber-100">
                        <Clock size={20} />
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Transaction is active - awaiting final completion</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* INFORMATION IDENTITY */}
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
                                        <div className="p-3 bg-indigo-50 text-indigo-500 rounded-2xl">🐾</div>
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

                    {/* RIGHT COL: BILLING & AUDIT */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
                                <ShieldCheck size={120} />
                            </div>
                            <div className="relative z-10">
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
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1 text-indigo-400">Total Paid</p>
                                            <p className="text-4xl font-black tracking-tighter text-white italic">
                                                {formatIDR(booking.service?.price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AUDIT TRAIL */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
                                <History size={14} /> Audit Trail
                            </h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-0.5 h-12 bg-slate-100 relative">
                                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${booking.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-tight text-slate-900">
                                            {booking.status === 'completed' ? 'Transaction Completed' : 'Waiting Completion'}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase italic">
                                            {booking.status === 'completed' ? 'Status Verified' : 'In Progress'}
                                        </p>
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