import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { 
    CheckCircle, XCircle, Clock, PawPrint, 
    Calendar as CalendarIcon, TrendingUp, Search, MoreHorizontal 
} from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2'; // Pastikan sudah install: npm install sweetalert2

export default function Dashboard({ auth, bookings }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Fungsi Update Status dengan SweetAlert2 yang Premium
    const updateStatus = (id, newStatus) => {
        const isConfirm = newStatus === 'confirmed';
        
        Swal.fire({
            title: `<span className="font-black text-2xl uppercase tracking-tighter">${isConfirm ? 'Konfirmasi' : 'Batalkan'} Booking?</span>`,
            html: `Apakah Anda yakin ingin mengubah status anabul ke <b class="${isConfirm ? 'text-green-500' : 'text-red-500'}">${newStatus}</b>?`,
            icon: isConfirm ? 'question' : 'warning',
            showCancelButton: true,
            confirmButtonColor: isConfirm ? '#10b981' : '#e11d48',
            cancelButtonColor: '#64748b',
            confirmButtonText: isConfirm ? 'Ya, Konfirmasi!' : 'Ya, Batalkan',
            cancelButtonText: 'Kembali',
            reverseButtons: true,
            borderRadius: '20px',
            customClass: {
                popup: 'rounded-[2rem] border-none shadow-2xl',
                confirmButton: 'rounded-xl font-bold px-6 py-3',
                cancelButton: 'rounded-xl font-bold px-6 py-3'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(`/bookings/${id}/status`, { status: newStatus }, {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: `Status booking telah diperbarui.`,
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                            borderRadius: '20px',
                        });
                    }
                });
            }
        });
    };

    const stats = [
        { label: 'Total Booking', value: bookings.length, icon: CalendarIcon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Anabul', value: new Set(bookings.map(b => b.pet_name)).size, icon: PawPrint, color: 'text-pink-600', bg: 'bg-pink-50' },
        { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    const filteredBookings = bookings.filter(b => 
        b.pet_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.booking_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-black leading-tight text-slate-900 tracking-tight">
                            Paws Hub <span className="text-orange-500 italic">Management.</span>
                        </h2>
                        <p className="text-slate-400 text-sm font-bold mt-1 uppercase tracking-widest">Administrator Console</p>
                    </div>
                    <div className="bg-white border-2 border-slate-100 rounded-2xl px-5 py-2.5 flex items-center gap-3 shadow-sm focus-within:border-orange-200 focus-within:shadow-md transition-all group">
                        <Search size={18} className="text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Cari anabul atau kode..." 
                            className="border-none focus:ring-0 text-sm font-bold p-0 w-64 text-slate-700 placeholder:text-slate-300 placeholder:font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-10 bg-[#F8FAFC]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
                    
                    {/* Hero Welcome Banner */}
                    <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                        <div className="relative z-10 max-w-2xl">
                            <span className="bg-orange-500 text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-4 inline-block">
                                Overview Dashboard
                            </span>
                            <h3 className="text-4xl font-black tracking-tight mb-3 italic">Halo, {auth.user.name.split(' ')[0]}! 👋</h3>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                Sistem mendeteksi <span className="text-white font-bold underline decoration-orange-500 decoration-2 underline-offset-4">{bookings.filter(b => b.status === 'pending').length} reservasi baru</span> yang memerlukan perhatian segera.
                            </p>
                        </div>
                        {/* Decorative background icon */}
                        <PawPrint className="absolute right-[-40px] top-[-40px] text-white/[0.03] w-96 h-96 -rotate-12" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 group hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 cursor-default">
                                <div className={`p-5 rounded-[1.5rem] ${stat.bg} ${stat.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    <stat.icon size={28} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                    <p className="text-3xl font-black text-slate-900 tracking-tighter italic">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Table Container */}
                    <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                                <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase">Jadwal Reservasi</h4>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><MoreHorizontal size={20}/></button>
                            </div>
                        </div>

                        <div className="overflow-x-auto px-4 pb-4">
                            <table className="w-full text-left border-separate border-spacing-y-3">
                                <thead className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="px-6 py-4">Ref. Code</th>
                                        <th className="px-6 py-4">Guest Details</th>
                                        <th className="px-6 py-4">Service Plan</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-center">Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="group transition-all">
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-orange-50 rounded-l-[1.5rem] transition-colors">
                                                <span className="font-black text-slate-900 text-sm">#{booking.booking_code}</span>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-orange-50 transition-colors">
                                                <div className="font-black text-slate-900 text-base">{booking.pet_name}</div>
                                                <div className="text-xs text-slate-500 font-bold">{booking.customer_name}</div>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-orange-50 transition-colors">
                                                <div className="text-sm font-black text-slate-700 uppercase tracking-tighter">{booking.service?.name}</div>
                                                <div className="text-[10px] text-orange-500 font-black italic">{booking.booking_date}</div>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-orange-50 transition-colors">
                                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${
                                                    booking.status === 'confirmed' ? 'bg-white text-emerald-600 border-emerald-100' : 
                                                    booking.status === 'cancelled' ? 'bg-white text-rose-600 border-rose-100' : 
                                                    'bg-white text-orange-500 border-orange-100 shadow-sm'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-orange-50 rounded-r-[1.5rem] text-center transition-colors">
                                                <div className="flex justify-center gap-2">
                                                    {booking.status === 'pending' ? (
                                                        <>
                                                            <button 
                                                                onClick={() => updateStatus(booking.id, 'confirmed')} 
                                                                className="p-3 bg-white text-slate-900 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm hover:shadow-emerald-200 border border-slate-200 border-b-4 active:border-b-0 active:translate-y-1"
                                                            >
                                                                <CheckCircle size={18} />
                                                            </button>
                                                            <button 
                                                                onClick={() => updateStatus(booking.id, 'cancelled')} 
                                                                className="p-3 bg-white text-slate-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-slate-200 border-b-4 active:border-b-0 active:translate-y-1"
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 mx-auto flex items-center justify-center">
                                                            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}