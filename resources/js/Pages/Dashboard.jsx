import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import {
    CheckCircle, XCircle, Clock, PawPrint, 
    Calendar as CalendarIcon, TrendingUp,
    MessageCircle, Search, Zap, Phone, User, 
    ClipboardList, ArrowUpRight, LayoutGrid,
    Activity, ShieldCheck, MoreVertical
} from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard({ auth = {}, bookings = [] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const sendWhatsApp = (booking) => {
        if (!booking?.customer_phone) {
            Swal.fire("Error", "Nomor telepon tidak ditemukan", "error");
            return;
        }
        let phone = booking.customer_phone.replace(/[^0-9]/g, "");
        if (phone.startsWith("0")) phone = "62" + phone.slice(1);
        
        const message = `Halo Kak *${booking.customer_name}*! 👋%0A%0AKami dari *Paws Hub* ingin mengonfirmasi reservasi *${booking.pet_name}*%0A📅 *${booking.booking_date}*%0A🛠 *${booking.service?.name || 'Grooming'}*%0A%0AReservasi telah kami *SETUJUI*. Sampai jumpa! 🐾`;
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    };

    const updateStatus = (id, newStatus) => {
        const isConfirm = newStatus === "confirmed";
        Swal.fire({
            title: `<span class="font-black text-xl uppercase tracking-tighter">${isConfirm ? 'Confirm' : 'Decline'} Order</span>`,
            html: `<p class="text-sm text-slate-500">Update status to <b class="${isConfirm ? 'text-emerald-500' : 'text-rose-500'}">${newStatus.toUpperCase()}</b>?</p>`,
            icon: isConfirm ? "question" : "warning",
            showCancelButton: true,
            confirmButtonColor: "#0f172a",
            cancelButtonColor: "#94a3b8",
            confirmButtonText: "Execute Action",
            borderRadius: "30px",
            background: "#ffffff",
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(route('bookings.updateStatus', id), { status: newStatus }, {
                    onSuccess: () => {
                        if (newStatus === 'confirmed') {
                            const bookingData = bookings.find(b => b.id === id);
                            Swal.fire({
                                title: "Action Success",
                                text: "Notify customer via WhatsApp?",
                                icon: "success",
                                showCancelButton: true,
                                confirmButtonText: "Send Notification",
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
        { label: "Gross Booking", value: safeBookings.length, icon: CalendarIcon, color: "text-blue-600", bg: "bg-blue-100/50", accent: "blue" },
        { label: "Pending Verification", value: safeBookings.filter((b) => b.status === "pending").length, icon: Clock, color: "text-amber-500", bg: "bg-amber-100/50", accent: "amber" },
        { label: "Unique Patients", value: new Set(safeBookings.map((b) => b.pet_name)).size, icon: PawPrint, color: "text-purple-600", bg: "bg-purple-100/50", accent: "purple" },
        { label: "Success Rate", value: "98.2%", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-100/50", accent: "emerald" },
    ];

    const filteredBookings = safeBookings.filter(
        (b) =>
            (b.pet_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (b.customer_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (b.booking_code?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Command Center" />

            <div className="max-w-[1600px] mx-auto space-y-12 py-8 px-4 md:px-0">
                
                {/* --- HERO HEADER SECTION --- */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-xl shadow-slate-200">
                                V2.0 Stable
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                <Activity size={14} className="text-emerald-500" /> System Online
                            </div>
                        </div>
                        <h1 className="text-5xl font-black tracking-[-0.06em] text-slate-900 flex items-center gap-4">
                            Command_Center <Zap className="text-orange-500 fill-orange-500 animate-bounce" size={32} />
                        </h1>
                        <p className="text-slate-400 font-medium text-sm max-w-md italic">Monitor, verify, and manage your pet service ecosystem in real-time.</p>
                    </div>
                    
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur opacity-10 group-focus-within:opacity-30 transition duration-1000"></div>
                        <div className="relative flex items-center bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 w-full lg:w-[450px]">
                            <Search className="ml-6 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by code, patient, or owner..."
                                className="w-full pl-4 pr-8 py-5 border-none bg-transparent text-xs font-black tracking-tight focus:ring-0 placeholder:text-slate-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* --- ANALYTICS CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="group relative bg-white p-8 rounded-[3rem] border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 overflow-hidden">
                            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform duration-700 bg-${stat.accent}-500`}></div>
                            
                            <div className="flex justify-between items-start mb-8">
                                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                                    <stat.icon size={26} strokeWidth={2.5} />
                                </div>
                                <TrendingUp size={20} className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
                            </div>
                            
                            <div>
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <h3 className="text-4xl font-black tracking-tighter text-slate-900">{stat.value}</h3>
                                    <span className="text-[10px] font-bold text-emerald-500 tracking-tighter">+2.4%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- DATA LOG SECTION --- */}
                <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="px-12 py-10 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gradient-to-b from-slate-50/50 to-transparent">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
                                <LayoutGrid size={22} />
                            </div>
                            <div>
                                <h3 className="font-black text-lg tracking-tight text-slate-900 uppercase">Live_Reservation_Stream</h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Syncing {filteredBookings.length} records</p>
                                </div>
                            </div>
                        </div>
                        
                        <Link href={route('invoices.index')} className="flex items-center gap-3 px-6 py-3 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-300">
                            View Ledger <ArrowUpRight size={16} />
                        </Link>
                    </div>

                    {/* Modern Table */}
                    <div className="overflow-x-auto p-8">
                        <table className="w-full text-left border-separate border-spacing-y-4">
                            <thead>
                                <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
                                    <th className="px-8 pb-4">Internal_ID</th>
                                    <th className="px-8 pb-4">Patient_Profile</th>
                                    <th className="px-8 pb-4">Service_Spec</th>
                                    <th className="px-8 pb-4 text-center">Status_Ind</th>
                                    <th className="px-8 pb-4 text-right">Control</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="group transition-all duration-500">
                                            <td className="px-8 py-8 bg-white group-hover:bg-slate-50 rounded-l-[2.5rem] border-y border-l border-slate-50 group-hover:border-slate-200 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1 h-8 bg-orange-500 rounded-full group-hover:scale-y-125 transition-transform"></div>
                                                    <span className="font-mono font-black text-slate-900 text-sm tracking-tighter">
                                                        {booking.booking_code}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-8 bg-white group-hover:bg-slate-50 border-y border-slate-50 group-hover:border-slate-200">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-base text-slate-900 uppercase tracking-tight leading-tight">{booking.pet_name}</span>
                                                    <span className="text-[11px] text-slate-400 font-bold flex items-center gap-2 mt-1">
                                                        <User size={12} className="text-slate-300" /> {booking.customer_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-8 bg-white group-hover:bg-slate-50 border-y border-slate-50 group-hover:border-slate-200">
                                                <div className="px-4 py-1.5 bg-slate-50 rounded-lg inline-block border border-slate-100">
                                                    <div className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">{booking.service?.name}</div>
                                                </div>
                                                <div className="flex items-center gap-2 text-orange-500 font-black mt-2 text-[10px] tracking-widest uppercase">
                                                    <CalendarIcon size={12} /> {booking.booking_date}
                                                </div>
                                            </td>
                                            <td className="px-8 py-8 bg-white group-hover:bg-slate-50 border-y border-slate-50 group-hover:border-slate-200 text-center">
                                                <div className={`inline-flex px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                                                    booking.status === "confirmed" ? "bg-emerald-50/50 text-emerald-600 border-emerald-100" :
                                                    booking.status === "cancelled" ? "bg-rose-50/50 text-rose-600 border-rose-100" :
                                                    "bg-amber-50/50 text-amber-600 border-amber-100 animate-pulse"
                                                }`}>
                                                    {booking.status}
                                                </div>
                                            </td>
                                            <td className="px-8 py-8 bg-white group-hover:bg-slate-50 rounded-r-[2.5rem] border-y border-r border-slate-50 group-hover:border-slate-200 text-right">
                                                <div className="flex justify-end gap-3 translate-x-2 group-hover:translate-x-0 transition-transform opacity-40 group-hover:opacity-100">
                                                    <button onClick={() => sendWhatsApp(booking)} className="p-4 text-emerald-600 bg-white hover:bg-emerald-600 hover:text-white rounded-2xl transition-all shadow-sm border border-slate-100 hover:scale-110 active:scale-95">
                                                        <Phone size={18} />
                                                    </button>
                                                    {booking.status === 'pending' && (
                                                        <>
                                                            <button onClick={() => updateStatus(booking.id, 'confirmed')} className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-xl hover:scale-110 active:scale-95">
                                                                <CheckCircle size={18} />
                                                            </button>
                                                            <button onClick={() => updateStatus(booking.id, 'cancelled')} className="p-4 text-rose-500 bg-white hover:bg-rose-500 hover:text-white rounded-2xl transition-all border border-slate-100 hover:scale-110 active:scale-95">
                                                                <XCircle size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-40 text-center">
                                            <div className="flex flex-col items-center opacity-20">
                                                <ClipboardList size={80} strokeWidth={1} />
                                                <p className="mt-4 font-black uppercase tracking-[0.5em] text-xs">No Data Streams Found</p>
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