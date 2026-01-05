import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { PawPrint, Menu, X, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

export default function Navbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();

    // Efek glassmorphism saat scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Layanan', href: '#services' },
        { name: 'Statistik', href: '#stats' }, // Ditambahkan untuk navigasi yang lebih lengkap
        { name: 'Testimoni', href: '#testimonials' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <>
            {/* Scroll Progress Bar - Sentuhan Premium */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-orange-500 z-[110] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
                scrolled 
                ? 'bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3' 
                : 'bg-transparent py-6'
            }`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group relative z-50">
                        <motion.div 
                            whileHover={{ rotate: -10, scale: 1.1 }}
                            className="bg-gray-900 p-2 rounded-xl shadow-lg group-hover:bg-orange-500 transition-colors duration-300"
                        >
                            <PawPrint className="w-6 h-6 text-white" />
                        </motion.div>
                        <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">
                            PawFect<span className="text-orange-500">Center</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <div className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a 
                                    key={link.name} 
                                    href={link.href} 
                                    className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-orange-500 transition-all relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                                </a>
                            ))}
                        </div>
                        
                        <div className="h-4 w-[1px] bg-gray-200 mx-2" />

                        {auth?.user ? (
                            <Link 
                                href={route('dashboard')} 
                                className="flex items-center gap-2 text-sm font-black text-gray-900 hover:text-orange-500 transition-all uppercase tracking-widest"
                            >
                                <User className="w-4 h-4" />
                                Account
                            </Link>
                        ) : (
                            <Link 
                                href={route('login')} 
                                className="group relative px-7 py-3 overflow-hidden rounded-full bg-gray-900 text-white text-xs font-black uppercase tracking-widest shadow-xl hover:shadow-orange-200/50 transition-all"
                            >
                                <span className="relative z-10">Admin Portal</span>
                                <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Toggle Button */}
                    <button 
                        className="md:hidden relative z-50 p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors" 
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay - Sinematik */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 h-screen w-full bg-white z-[40] flex flex-col p-8 pt-32 md:hidden"
                        >
                            {/* Background Pattern Mobile */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[100px] -z-10" />

                            <div className="flex flex-col gap-8">
                                {navLinks.map((link, i) => (
                                    <motion.a 
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={link.name} 
                                        href={link.href} 
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl font-black text-gray-900 tracking-tighter hover:text-orange-500 transition-colors"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>

                            <div className="mt-auto pb-12">
                                <hr className="mb-8 border-gray-100" />
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="flex items-center justify-between text-2xl font-black text-orange-500">
                                        Dashboard <ArrowRight className="w-8 h-8" />
                                    </Link>
                                ) : (
                                    <Link href={route('login')} className="flex items-center justify-between text-2xl font-black text-gray-900 group">
                                        Admin Access <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                )}
                                <div className="mt-8 flex gap-6 opacity-40">
                                    <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
                                    <span className="text-xs font-bold uppercase tracking-widest">Facebook</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}