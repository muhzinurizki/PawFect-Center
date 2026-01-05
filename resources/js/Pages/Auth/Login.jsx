import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { LockKeyhole, Mail, PawPrint, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA] selection:bg-orange-200">
            <Head title="Admin Log in" />

            {/* --- SISI KIRI: BRANDING AREA --- */}
            <div className="hidden md:flex md:w-[45%] bg-[#0F172A] p-16 flex-col justify-between relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-orange-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-10"></div>
                
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-3 mb-12">
                        <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-2xl shadow-lg shadow-orange-900/20">
                            <PawPrint size={28} className="text-white" />
                        </div>
                        <span className="text-white font-black text-3xl tracking-tighter italic">Paws Hub<span className="text-orange-500">.</span></span>
                    </div>

                    <h1 className="text-6xl font-black text-white leading-[0.95] tracking-tighter">
                        Empowering <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Pet Care</span> <br />
                        Excellence.
                    </h1>
                    <p className="text-slate-400 mt-8 max-w-sm font-medium leading-relaxed text-lg border-l-2 border-orange-500/30 pl-6">
                        Sistem manajemen pintar untuk kebahagiaan anabul. Pantau reservasi dan kepuasan pelanggan secara real-time.
                    </p>
                </motion.div>

                <div className="relative z-10 space-y-6">
                    <div className="flex gap-4">
                        <div className="flex -space-x-3">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-slate-800 flex items-center justify-center text-xs text-white font-bold">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <div className="text-slate-400 text-sm font-medium">
                            <span className="text-white font-bold">1.2k+</span> Admin telah bergabung
                        </div>
                    </div>
                    
                    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex items-start gap-4 shadow-2xl">
                        <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm italic leading-snug">"Keep the paws clean and the tails wagging!"</p>
                            <p className="text-slate-500 text-[10px] mt-1 font-black uppercase tracking-widest">— Maintenance Team</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SISI KANAN: LOGIN FORM --- */}
            <div className="w-full md:w-[55%] flex items-center justify-center p-6 md:p-24 relative">
                {/* Floating Decoration for Mobile */}
                <div className="absolute top-10 right-10 md:hidden opacity-20">
                    <PawPrint size={100} className="text-orange-500 rotate-12" />
                </div>

                <div className="w-full max-w-md space-y-10">
                    <div className="text-center md:text-left">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6"
                        >
                            <ShieldCheck size={14} /> Admin Secure Access
                        </motion.div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Masuk Kembali</h2>
                        <p className="text-slate-500 font-medium mt-3">Silakan autentikasi identitas Anda.</p>
                    </div>

                    {status && (
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl font-bold text-sm text-emerald-600 animate-bounce">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 ml-1">
                                <Mail size={12} className="text-orange-500" /> Email Address
                            </label>
                            <div className="relative group">
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl p-4 pl-5 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-700 shadow-sm group-hover:border-slate-200"
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@pawshub.com"
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1 ml-1" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                    <LockKeyhole size={12} className="text-orange-500" /> Password
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-[10px] font-black uppercase text-orange-600 hover:text-orange-700 transition-colors"
                                    >
                                        Lupa Sandi?
                                    </Link>
                                )}
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl p-4 pl-5 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-700 shadow-sm"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} className="mt-1 ml-1" />
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <label className="flex items-center cursor-pointer group">
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-5 h-5 rounded-lg border-2 border-slate-200 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 transition-all"
                                />
                                <span className="ms-3 text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors select-none">Ingat saya untuk 30 hari</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="group w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50"
                        >
                            Sign In Now
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <ArrowRight size={22} />
                            </motion.div>
                        </button>
                    </form>

                    <div className="pt-8 text-center">
                        <div className="h-[1px] w-full bg-slate-100 relative mb-8">
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FDFCFB] px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Atau</span>
                        </div>
                        <p className="text-slate-400 text-sm font-bold">
                            Belum memiliki akses? 
                            <Link href={route('register')} className="text-orange-600 font-black ml-2 uppercase tracking-tighter hover:text-orange-700 hover:underline decoration-2 underline-offset-4">
                                Ajukan Akun
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}