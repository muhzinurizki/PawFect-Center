import { Link } from '@inertiajs/react';
import { PawPrint } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans antialiased">
            {/* Sisi Kiri: Branding & Visual (Konsisten dengan Login) */}
            <div className="hidden md:flex md:w-1/2 bg-gray-900 p-12 flex-col justify-between relative overflow-hidden">
                {/* Dekorasi Background */}
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-orange-600 rounded-full blur-[80px] opacity-10"></div>
                
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 mb-8 group">
                        <div className="bg-orange-500 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                            <PawPrint size={24} />
                        </div>
                        <span className="text-white font-black text-2xl tracking-tighter italic">Paws Hub.</span>
                    </Link>
                    
                    <h2 className="text-4xl font-black text-white leading-tight tracking-tighter mb-4">
                        Tempat Terbaik untuk <br />
                        <span className="text-orange-500">Kebahagiaan Anabul.</span>
                    </h2>
                    <p className="text-gray-400 max-w-sm font-medium leading-relaxed">
                        Satu platform untuk mengelola semua kebutuhan grooming, hotel, dan kesehatan hewan peliharaan Anda.
                    </p>
                </div>

                <div className="relative z-10">
                    <div className="flex gap-4">
                        <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
                        <div className="h-1 w-4 bg-gray-700 rounded-full"></div>
                        <div className="h-1 w-4 bg-gray-700 rounded-full"></div>
                    </div>
                    <p className="text-gray-500 text-xs mt-4 font-bold uppercase tracking-widest">
                        © 2024 Paws & Relax Hub Management System
                    </p>
                </div>
            </div>

            {/* Sisi Kanan: Area Konten Form (Login/Register/Reset Pass) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[#FDFCFB]">
                <div className="w-full max-w-md">
                    {/* Logo Mobile Only */}
                    <div className="md:hidden flex justify-center mb-8">
                        <Link href="/" className="flex flex-col items-center gap-2">
                            <div className="bg-orange-500 p-3 rounded-2xl text-white shadow-lg shadow-orange-200">
                                <PawPrint size={32} />
                            </div>
                            <span className="text-gray-900 font-black text-xl italic tracking-tighter">Paws Hub.</span>
                        </Link>
                    </div>

                    {/* Konten Utama (Form Login/Register/etc) */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}