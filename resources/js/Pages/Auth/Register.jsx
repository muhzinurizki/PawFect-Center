import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { LockKeyhole, Mail, User, PawPrint, ArrowRight, UserPlus, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA] selection:bg-orange-200">
            <Head title="Admin Registration" />

            {/* --- SISI KIRI: BRANDING (Visual) --- */}
            <div className="hidden md:flex md:w-[45%] bg-[#0F172A] p-16 flex-col justify-between relative overflow-hidden">
                {/* Decorative Glow */}
                <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-orange-600 rounded-full blur-[120px] opacity-20"></div>
                
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-3 mb-12">
                        <div className="bg-orange-500 p-3 rounded-2xl">
                            <PawPrint size={28} className="text-white" />
                        </div>
                        <span className="text-white font-black text-3xl tracking-tighter italic">Paws Hub<span className="text-orange-500">.</span></span>
                    </div>

                    <h1 className="text-6xl font-black text-white leading-[0.95] tracking-tighter">
                        Join Our <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 italic">Elite Admin</span> <br />
                        Circle.
                    </h1>
                    <p className="text-slate-400 mt-8 max-w-sm font-medium leading-relaxed text-lg border-l-2 border-orange-500/30 pl-6">
                        Mulai langkah Anda dalam mengelola ekosistem perawatan hewan peliharaan yang paling dicintai.
                    </p>
                </motion.div>

                <div className="relative z-10">
                    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex items-center gap-4">
                        <div className="bg-blue-500/20 p-3 rounded-full text-blue-400">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Data Terproteksi</p>
                            <p className="text-slate-500 text-xs">Enkripsi tingkat tinggi untuk keamanan data admin.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SISI KANAN: REGISTER FORM --- */}
            <div className="w-full md:w-[55%] flex items-center justify-center p-6 md:p-20 relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                            <UserPlus size={14} /> New Admin Account
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Daftar Akun</h2>
                        <p className="text-slate-500 font-medium mt-2">Lengkapi informasi di bawah untuk bergabung.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 ml-1">
                                <User size={12} className="text-orange-500" /> Full Name
                            </label>
                            <TextInput
                                id="name"
                                value={data.name}
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl p-4 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-700 shadow-sm"
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                            <InputError message={errors.name} className="ml-1" />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 ml-1">
                                <Mail size={12} className="text-orange-500" /> Email Address
                            </label>
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl p-4 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-700 shadow-sm"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@contoh.com"
                                required
                            />
                            <InputError message={errors.email} className="ml-1" />
                        </div>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 ml-1">
                                    <LockKeyhole size={12} className="text-orange-500" /> Password
                                </label>
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl p-4 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-700 shadow-sm"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 ml-1">
                                    <ShieldCheck size={12} className="text-orange-500" /> Confirm
                                </label>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl p-4 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-700 shadow-sm"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        <InputError message={errors.password} className="ml-1" />
                        <InputError message={errors.password_confirmation} className="ml-1" />

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50 mt-4"
                        >
                            Create Account <ArrowRight size={22} />
                        </button>
                    </form>

                    <div className="text-center pt-6">
                        <p className="text-slate-400 text-sm font-bold">
                            Sudah punya akun? 
                            <Link href={route('login')} className="text-orange-600 font-black ml-2 uppercase tracking-tighter hover:text-orange-700 hover:underline decoration-2 underline-offset-4">
                                Log In Disini
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}