import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    Save, ArrowLeft, AlertCircle, 
    User, Dog, Calendar, 
    ChevronRight, CheckCircle2
} from 'lucide-react';

export default function InvoiceEdit({ auth, booking }) {
    // Inisialisasi Form dengan data booking yang ada
    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        customer_name: booking.customer_name || '',
        customer_phone: booking.customer_phone || '',
        pet_name: booking.pet_name || '',
        booking_date: booking.booking_date || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mengirim data ke route invoices.update yang sudah kita buat di web.php
        patch(route('invoices.update', booking.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link 
                        href={route('invoices.index')} 
                        className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter text-slate-900">
                            Edit Transaction <span className="text-indigo-500">#{booking.booking_code}</span>
                        </h2>
                        <p className="text-slate-500 font-medium uppercase text-[10px] tracking-widest mt-1">Adjust record details before issuing</p>
                    </div>
                </div>
            }
        >
            <Head title={`Edit Invoice ${booking.booking_code}`} />

            <div className="max-w-4xl mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* FORM SECTION */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden">
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Customer Name */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                            <User size={12} /> Owner Name
                                        </label>
                                        <input 
                                            type="text"
                                            value={data.customer_name}
                                            onChange={e => setData('customer_name', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                        />
                                        {errors.customer_name && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.customer_name}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                            Phone Number
                                        </label>
                                        <input 
                                            type="text"
                                            value={data.customer_phone}
                                            onChange={e => setData('customer_phone', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Pet Name */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                            <Dog size={12} /> Pet Name
                                        </label>
                                        <input 
                                            type="text"
                                            value={data.pet_name}
                                            onChange={e => setData('pet_name', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all italic"
                                        />
                                    </div>

                                    {/* Date */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                            <Calendar size={12} /> Transaction Date
                                        </label>
                                        <input 
                                            type="date"
                                            value={data.booking_date}
                                            onChange={e => setData('booking_date', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4 flex items-center gap-4">
                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-slate-900 text-white py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving Changes...' : <><Save size={18} /> Update Invoice Record</>}
                                    </button>
                                    
                                    {recentlySuccessful && (
                                        <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase animate-bounce">
                                            <CheckCircle2 size={16} /> Saved!
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* SIDE INFO */}
                    <div className="space-y-6">
                        <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-lg shadow-indigo-100">
                            <h4 className="font-black text-xs uppercase tracking-widest mb-4 opacity-60">Service Fixed</h4>
                            <p className="text-2xl font-black tracking-tighter mb-1 leading-none uppercase italic">{booking.service?.name}</p>
                            <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Selected Package</p>
                            
                            <div className="mt-8 pt-8 border-t border-indigo-500/30">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Total Fee</p>
                                <p className="text-3xl font-black tracking-tighter italic">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(booking.service?.price)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl italic font-black">!</div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Important Note</p>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                        Changing these details will update the digital record permanently. Please verify with the customer before saving.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}