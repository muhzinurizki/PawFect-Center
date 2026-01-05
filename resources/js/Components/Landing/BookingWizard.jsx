import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Calendar, Clock, User, CheckCircle2, ArrowRight, ArrowLeft, Dog, Cat, ShieldCheck } from 'lucide-react';

export default function BookingWizard() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0); // Untuk kontrol arah slide
    const [formData, setFormData] = useState({
        petName: '',
        petType: 'Anjing',
        service: '',
        date: '',
        time: '',
        name: '',
        phone: ''
    });

    const nextStep = () => {
        setDirection(1);
        setStep((s) => s + 1);
    };
    const prevStep = () => {
        setDirection(-1);
        setStep((s) => s - 1);
    };

    const variants = {
        enter: (d) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d < 0 ? 50 : -50, opacity: 0 }),
    };

    return (
        <section id="booking" className="py-32 bg-[#FDFCFB]">
            <div className="max-w-2xl mx-auto px-6">
                
                {/* Judul Luar Box */}
                <div className="text-center mb-12">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 block">
                        Reservation
                    </span>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
                        Atur Jadwal Anabul.
                    </h2>
                </div>

                <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(255,145,77,0.1)] overflow-hidden border border-orange-100/50">
                    
                    {/* Stepper Progress */}
                    <div className="bg-gray-900 p-8 flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                            <div className="bg-orange-500 p-2 rounded-lg">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white font-bold tracking-tight">Step {step}/4</span>
                        </div>
                        <div className="flex gap-2 w-32">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-orange-500' : 'bg-gray-700'}`} />
                            ))}
                        </div>
                    </div>

                    <div className="p-10 min-h-[450px] flex flex-col">
                        <AnimatePresence mode="wait" custom={direction}>
                            {step === 1 && (
                                <motion.div key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Siapa anabul yang akan berkunjung?</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 block mb-3">Nama Lengkap Anabul</label>
                                            <input 
                                                type="text" 
                                                value={formData.petName}
                                                placeholder="Contoh: Luna" 
                                                className="w-full p-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-gray-800"
                                                onChange={(e) => setFormData({...formData, petName: e.target.value})}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { id: 'Anjing', icon: Dog },
                                                { id: 'Kucing', icon: Cat }
                                            ].map((type) => (
                                                <button 
                                                    key={type.id}
                                                    onClick={() => setFormData({...formData, petType: type.id})}
                                                    className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-3 transition-all duration-300 ${formData.petType === type.id ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-inner' : 'border-gray-100 text-gray-400 hover:border-orange-200'}`}
                                                >
                                                    <type.icon className={`w-8 h-8 ${formData.petType === type.id ? 'animate-bounce' : ''}`} />
                                                    <span className="font-black uppercase tracking-widest text-[10px]">{type.id}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Layanan apa yang dibutuhkan?</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Full Grooming', price: 'Rp 150k++' },
                                            { name: 'Pet Hotel', price: 'Rp 100k/malam' },
                                            { name: 'Vaksinasi', price: 'Rp 250k++' }
                                        ].map((s) => (
                                            <button 
                                                key={s.name}
                                                onClick={() => setFormData({...formData, service: s.name})}
                                                className={`w-full p-6 text-left rounded-2xl border-2 transition-all group flex justify-between items-center ${formData.service === s.name ? 'border-orange-500 bg-orange-50' : 'border-gray-50 bg-gray-50/50 hover:border-orange-200'}`}
                                            >
                                                <div>
                                                    <span className={`block font-bold text-lg ${formData.service === s.name ? 'text-orange-600' : 'text-gray-800'}`}>{s.name}</span>
                                                    <span className="text-xs text-gray-400 font-medium">Mulai dari {s.price}</span>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.service === s.name ? 'bg-orange-500 border-orange-500' : 'border-gray-300 group-hover:border-orange-500'}`}>
                                                    {formData.service === s.name && <CheckCircle2 className="w-4 h-4 text-white" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Kapan jadwal terbaiknya?</h3>
                                    <div className="space-y-6">
                                        <input 
                                            type="date" 
                                            className="w-full p-4 rounded-2xl bg-gray-50 border-transparent focus:ring-4 focus:ring-orange-500/10 font-bold"
                                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        />
                                        <div className="grid grid-cols-3 gap-3">
                                            {['09:00', '11:00', '14:00', '16:00', '19:00', '20:00'].map((t) => (
                                                <button 
                                                    key={t}
                                                    onClick={() => setFormData({...formData, time: t})}
                                                    className={`p-3 rounded-xl border-2 font-black text-[11px] transition-all ${formData.time === t ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200' : 'border-gray-100 bg-white text-gray-500 hover:border-orange-200'}`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Detail terakhir.</h3>
                                    <div className="space-y-4">
                                        <input 
                                            type="text" 
                                            placeholder="Nama Pemilik" 
                                            className="w-full p-4 rounded-2xl bg-gray-50 border-transparent font-bold"
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                        <input 
                                            type="tel" 
                                            placeholder="No. WhatsApp (Aktif)" 
                                            className="w-full p-4 rounded-2xl bg-gray-50 border-transparent font-bold"
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                        <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100 space-y-3 relative overflow-hidden">
                                            <div className="absolute right-[-10px] bottom-[-10px] opacity-10 rotate-12">
                                                <ShieldCheck className="w-24 h-24 text-orange-600" />
                                            </div>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">Konfirmasi Reservasi</p>
                                            <div className="text-sm font-bold text-gray-800">
                                                <p className="mb-1">🐾 {formData.petName} — {formData.service}</p>
                                                <p>📅 {formData.date} • {formData.time} WIB</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-auto pt-10 flex gap-4">
                            {step > 1 && (
                                <button onClick={prevStep} className="p-5 rounded-2xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all active:scale-95">
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            )}
                            <button 
                                onClick={step === 4 ? () => alert("Booking Sent!") : nextStep}
                                className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-gray-200 hover:shadow-orange-200"
                            >
                                {step === 4 ? 'Konfirmasi Reservasi' : 'Lanjut'} 
                                {step !== 4 && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}