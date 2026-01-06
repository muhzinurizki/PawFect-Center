import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import {
    CheckCircle, XCircle, Clock, PawPrint, 
    Calendar as CalendarIcon, TrendingUp,
    MessageCircle, FilterX, Search,
    ArrowUpRight, Zap
} from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard({ auth = {}, bookings = [] }) {
    const [searchTerm, setSearchTerm] = useState("");

    // --- PROTEKSI DATA USER ---
    const userName = auth?.user?.name || "Admin";

    // --- FUNGSI WHATSAPP ---
    const sendWhatsApp = (booking) => {
        if (!booking || !booking.customer_phone) {
            Swal.fire("Error", "Nomor telepon tidak ditemukan", "error");
            return;
        }
        let phone = booking.customer_phone.replace(/[^0-9]/g, "");
        if (phone.startsWith("0")) phone = "62" + phone.slice(1);
        
        const message = `Halo Kak *${booking.customer_name}*! 👋%0A%0AKami dari *Paws Hub* ingin mengonfirmasi reservasi *${booking.pet_name}*%0A📅 *${booking.booking_date}*%0A🛠 *${booking.service?.name || 'Grooming'}*%0A%0AReservasi telah kami *SETUJUI*. Sampai jumpa! 🐾`;
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    };

    // --- FUNGSI UPDATE STATUS ---
    const updateStatus = (id, newStatus) => {
        const isConfirm = newStatus === "confirmed";
        Swal.fire({
            title: `<span class="font-black text-xl uppercase tracking-tighter">${isConfirm ? 'Konfirmasi' : 'Batalkan'} Booking</span>`,
            html: `<p class="text-sm text-slate-500">Ubah status anabul menjadi <b class="${isConfirm ? 'text-emerald-500' : 'text-rose-500'}">${newStatus.toUpperCase()}</b>?</p>`,
            icon: isConfirm ? "question" : "warning",
            showCancelButton: true,
            confirmButtonColor: isConfirm ? "#10b981" : "#e11d48",
            cancelButtonColor: "#94a3b8",
            confirmButtonText: "Ya, Lanjutkan",
            borderRadius: "24px",
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(`/bookings/${id}/status`, { status: newStatus }, {
                    onSuccess: () => {
                        if (newStatus === 'confirmed') {
                            const bookingData = bookings.find(b => b.id === id);
                            Swal.fire({
                                title: "Berhasil!",
                                text: "Ingin kirim pesan konfirmasi via WhatsApp?",
                                icon: "success",
                                showCancelButton: true,
                                confirmButtonText: "Kirim WA",
                                confirmButtonColor: "#22c55e",
                            }).then((wa) => { if (wa.isConfirmed) sendWhatsApp(bookingData); });
                        }
                    },
                });
            }
        });
    };

    const safeBookings = Array.isArray(bookings) ? bookings : [];
    
    const stats = [
        { label: "Total Booking", value: safeBookings.length, icon: CalendarIcon, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Pending", value: safeBookings.filter((b) => b.status === "pending").length, icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
        { label: "Active Pets", value: new Set(safeBookings.map((b) => b.pet_name)).size, icon: PawPrint, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Growth", value: "12%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    ];

    const filteredBookings = safeBookings.filter(
        (b) =>
            (b.pet_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (b.customer_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (b.booking_code?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
                            Dashboard <Zap className="text-orange-500 fill-orange-500" size={32} />
                        </h2>
                        <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.2em]">Operational Overview & Tracking</p>
                    </div>
                    
                    <div className="relative group min-w-[320px]">
                        <input
                            type="text"
                            placeholder="Search reservation..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-xs font-bold shadow-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all placeholder:text-slate-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                    </div>
                </div>
            }
        >
            <Head title="Admin Console" />

            <div className="space-y-8">
                {/* STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col gap-4 group hover:border-orange-200 transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={20} />
                                </div>
                                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-orange-400 transition-colors">Live Data</div>
                            </div>
                            <div>
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-tight">{stat.label}</p>
                                <p className="text-3xl font-black tracking-tighter text-slate-900 mt-1">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MAIN TABLE SECTION */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-slate-50/50 to-transparent">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                            <h3 className="font-black text-xs uppercase tracking-[0.1em] text-slate-800">Reservation Log</h3>
                        </div>
                        <button className="text-[10px] font-black text-orange-500 flex items-center gap-1 hover:underline">
                            VIEW ALL HISTORY <ArrowUpRight size={14} />
                        </button>
                    </div>

                    <div className="overflow-x-auto p-4">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-6 py-3 text-center">Reference</th>
                                    <th className="px-6 py-3">Pet Identity</th>
                                    <th className="px-6 py-3">Service Brief</th>
                                    <th className="px-6 py-3 text-center">Status</th>
                                    <th className="px-6 py-3 text-right">Management</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="group transition-all">
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-slate-100 rounded-l-2xl border-y border-l border-transparent group-hover:border-slate-200 transition-all">
                                                <span className="font-mono font-black text-slate-400 group-hover:text-slate-900 text-xs tracking-tighter">
                                                    #{booking.booking_code}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-slate-100 border-y border-transparent group-hover:border-slate-200">
                                                <div className="font-black text-sm text-slate-800">{booking.pet_name}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight italic">Owner: {booking.customer_name}</div>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-slate-100 border-y border-transparent group-hover:border-slate-200">
                                                <div className="text-xs font-black text-slate-600">{booking.service?.name || 'Grooming'}</div>
                                                <div className="text-[10px] text-indigo-500 font-black tracking-tighter mt-0.5">{booking.booking_date}</div>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-slate-100 border-y border-transparent group-hover:border-slate-200 text-center">
                                                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                                                    booking.status === "confirmed" ? "bg-white text-emerald-500 border-emerald-100" :
                                                    booking.status === "cancelled" ? "bg-white text-rose-500 border-rose-100" :
                                                    "bg-white text-orange-500 border-orange-100"
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-slate-100 rounded-r-2xl border-y border-r border-transparent group-hover:border-slate-200 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => sendWhatsApp(booking)} className="p-2.5 text-emerald-500 bg-white hover:bg-emerald-500 hover:text-white rounded-xl transition-all shadow-sm border border-slate-100">
                                                        <MessageCircle size={16} />
                                                    </button>
                                                    {booking.status === 'pending' && (
                                                        <>
                                                            <button onClick={() => updateStatus(booking.id, 'confirmed')} className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-orange-500 transition-all shadow-md">
                                                                <CheckCircle size={16} />
                                                            </button>
                                                            <button onClick={() => updateStatus(booking.id, 'cancelled')} className="p-2.5 text-rose-400 bg-white hover:bg-rose-50 rounded-xl transition-all border border-slate-100">
                                                                <XCircle size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-24 text-center">
                                            <div className="flex flex-col items-center opacity-30">
                                                <FilterX size={60} strokeWidth={1} />
                                                <p className="mt-4 font-black uppercase tracking-[0.4em] text-[10px]">No matches found</p>
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