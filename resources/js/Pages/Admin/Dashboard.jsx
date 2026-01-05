import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { 
    CheckCircle, XCircle, Clock, Search, 
    Calendar as CalendarIcon, PawPrint, Users, TrendingUp 
} from 'lucide-react';

export default function Dashboard({ auth, bookings = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Hitung Statistik Sederhana
    const stats = [
        { label: 'Total Booking', value: bookings.length, icon: CalendarIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Perlu Konfirmasi', value: bookings.filter(b => b.status === 'pending').length, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { label: 'Anabul Terdaftar', value: new Set(bookings.map(b => b.pet_name)).size, icon: PawPrint, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Selesai/Confirm', value: bookings.filter(b => b.status === 'confirmed').length, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    const updateStatus = (id, newStatus) => {
        if (confirm(`Ubah status booking menjadi ${newStatus}?`)) {
            router.patch(`/bookings/${id}/status`, { status: newStatus });
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            confirmed: 'bg-green-100 text-green-700 border-green-200',
            cancelled: 'bg-red-100 text-red-700 border-red-200',
        };
        return `px-3 py-1 rounded-full text-[10px] border font-black uppercase tracking-wider ${styles[status]}`;
    };

    // Filter pencarian sederhana
    const filteredBookings = bookings.filter(b => 
        b.pet_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.booking_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-2xl text-gray-800 tracking-tight">Management Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12 bg-[#FDFCFB] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                                    <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Daftar Reservasi</h3>
                                <p className="text-sm text-gray-400 font-medium">Pantau dan update status kedatangan anabul.</p>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-2xl border border-gray-100 flex items-center px-4 w-full md:w-80">
                                <Search className="w-4 h-4 text-gray-400 mr-2" />
                                <input 
                                    type="text" 
                                    placeholder="Cari kode, anabul, atau pemilik..." 
                                    className="bg-transparent border-none outline-none text-sm font-medium w-full focus:ring-0"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                                        <th className="p-6">Booking Code</th>
                                        <th className="p-6">Anabul & Owner</th>
                                        <th className="p-6">Layanan</th>
                                        <th className="p-6">Jadwal</th>
                                        <th className="p-6">Status</th>
                                        <th className="p-6 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredBookings.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-6">
                                                <span className="font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-lg text-xs border border-orange-100">
                                                    {item.booking_code}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <div className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{item.pet_name}</div>
                                                <div className="text-xs text-gray-400 font-medium">{item.customer_name} • {item.customer_phone}</div>
                                            </td>
                                            <td className="p-6">
                                                <div className="text-sm font-bold text-gray-700">{item.service?.name}</div>
                                                <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">{item.service?.category}</div>
                                            </td>
                                            <td className="p-6">
                                                <div className="text-sm font-bold text-gray-800">{item.booking_date}</div>
                                                <div className="text-xs text-gray-400 font-medium italic">{item.booking_time} WIB</div>
                                            </td>
                                            <td className="p-6">
                                                <span className={getStatusBadge(item.status)}>{item.status}</span>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center gap-2">
                                                    {item.status === 'pending' ? (
                                                        <>
                                                            <button 
                                                                onClick={() => updateStatus(item.id, 'confirmed')} 
                                                                className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all text-xs font-bold"
                                                                title="Konfirmasi"
                                                            >
                                                                <CheckCircle className="w-4 h-4" /> Approve
                                                            </button>
                                                            <button 
                                                                onClick={() => updateStatus(item.id, 'cancelled')} 
                                                                className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                                                title="Batalkan"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-gray-300 italic">No Action Needed</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredBookings.length === 0 && (
                            <div className="p-24 text-center">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-gray-200">
                                    <Clock className="w-8 h-8 text-gray-300" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900">Tidak ada data ditemukan</h4>
                                <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">Coba gunakan kata kunci lain atau cek kembali filter Anda.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}