import { motion } from 'framer-motion';

export default function Hero() {
    return (
        /* 1. Menambahkan pt-24 (Padding Top) untuk memberi ruang bagi Navbar.
           2. Menggunakan min-h-[calc(100vh-80px)] agar Hero tetap memenuhi layar tanpa overlap.
        */
        <header className="relative w-full bg-white overflow-hidden px-6 lg:px-20 pt-28 lg:pt-32 pb-16 lg:pb-24">
            
            {/* Dekorasi Latar Belakang - Tetap di belakang */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/40 -z-10 blur-[120px] rounded-full" />
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                
                {/* KOLOM KIRI: Teks Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-7 z-10 text-left order-2 lg:order-1"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-orange-100/50 border border-orange-200 rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                            Premium Pet Experience
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-[80px] font-black text-gray-900 leading-[1.05] tracking-tighter mb-8">
                        Manjakan Anabul di <br />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-orange-500">PawFect Center</span>
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute -bottom-2 left-0 h-3 bg-orange-100 -z-10" 
                            />
                        </span>
                    </h1>

                    <p className="max-w-lg text-lg lg:text-xl text-gray-500 font-medium leading-relaxed mb-10">
                        Menghadirkan standar kemewahan baru untuk kenyamanan dan kebahagiaan keluarga berbulu Anda.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button 
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-5 bg-gray-900 text-white font-bold rounded-2xl shadow-xl shadow-gray-200 transition-all"
                        >
                            Reservasi Eksklusif
                        </motion.button>
                        <button className="px-10 py-5 bg-white text-gray-700 font-bold rounded-2xl border-2 border-gray-100 hover:border-orange-200 hover:text-orange-600 transition-all flex items-center justify-center gap-2">
                            Eksplor Galeri
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                    </div>

                    {/* Trusted By - Social Proof */}
                    <div className="mt-16 flex flex-col gap-4">
                        <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">Trusted by Elite Owners</p>
                        <div className="flex gap-8 opacity-30 grayscale items-center">
                            <div className="h-5 w-20 bg-gray-400 rounded-full" />
                            <div className="h-5 w-20 bg-gray-400 rounded-full" />
                            <div className="h-5 w-20 bg-gray-400 rounded-full" />
                        </div>
                    </div>
                </motion.div>

                {/* KOLOM KANAN: Visual Stack (Dibuat lebih rapi agar tidak nabrak) */}
                <div className="lg:col-span-5 relative h-[450px] lg:h-[550px] w-full flex items-center order-1 lg:order-2">
                    {/* Background Circle Decor */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl -z-10" />

                    {/* Image 1: Main Image */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute top-0 right-0 w-[80%] h-[70%] z-20"
                    >
                        <img 
                            src="/images/hero-cat.jpg" 
                            className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-[10px] border-white" 
                        />
                    </motion.div>

                    {/* Image 2: Secondary Image Overlay */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute bottom-4 left-0 w-[65%] h-[55%] z-30"
                    >
                        <img 
                            src="/images/hero-dog.jpg" 
                            className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border-[8px] border-white" 
                        />
                    </motion.div>
                </div>

            </div>
        </header>
    );
}