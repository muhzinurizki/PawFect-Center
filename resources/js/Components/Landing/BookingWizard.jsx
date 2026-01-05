import { useState } from "react";
import { router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2"; // Import standar
import {
    Calendar,
    ArrowRight,
    ArrowLeft,
    Dog,
    Cat,
    ShieldCheck,
    Loader2,
    Sparkles,
    Smartphone,
    User,
    Clock,
} from "lucide-react";

export default function BookingWizard() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        petName: "",
        petType: "Anjing",
        service: "",
        service_id: "",
        date: "",
        time: "",
        name: "",
        phone: "",
    });

    const isStepValid = () => {
        if (step === 1) return formData.petName.trim().length >= 2;
        if (step === 2) return formData.service_id !== "";
        if (step === 3) return formData.date !== "" && formData.time !== "";
        if (step === 4) return formData.name.length > 2 && formData.phone.length > 9;
        return true;
    };

    const handleSubmit = () => {
        setLoading(true);
        router.post("/bookings", {
            customer_name: formData.name,
            customer_phone: formData.phone,
            pet_name: formData.petName,
            pet_type: formData.petType,
            service_id: formData.service_id,
            booking_date: formData.date,
            booking_time: formData.time,
        }, {
            onSuccess: () => {
                // Tampilan SweetAlert standar dengan string HTML
                Swal.fire({
                    title: "Booking Berhasil!",
                    html: `Jadwal untuk <b>${formData.petName}</b> sudah kami simpan.<br>Sampai jumpa di outlet, Kak!`,
                    icon: "success",
                    confirmButtonColor: "#ea580c", // Warna orange sesuai tema
                    confirmButtonText: "Sip, Mantap!",
                    padding: "2em",
                    customClass: {
                        popup: "rounded-[2rem]",
                        title: "font-black text-2xl",
                        confirmButton: "rounded-xl font-bold px-10 py-3"
                    }
                });

                // Reset Wizard
                setStep(1);
                setFormData({ petName: "", petType: "Anjing", service: "", service_id: "", date: "", time: "", name: "", phone: "" });
            },
            onError: () => {
                Swal.fire({
                    title: "Gagal!",
                    text: "Terjadi kendala teknis. Mohon cek kembali data Anda.",
                    icon: "error",
                    confirmButtonColor: "#ef4444"
                });
            },
            onFinish: () => setLoading(false),
        });
    };

    const variants = {
        enter: (d) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d < 0 ? 40 : -40, opacity: 0 }),
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-orange-50/30">
            <div className="max-w-xl mx-auto px-6">
                <div className="text-center mb-10">
                    <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                        Reservasi Online
                    </span>
                    <h2 className="text-3xl font-black text-gray-900 mt-4">Atur Jadwal Anabul</h2>
                    <p className="text-gray-500 mt-2">Hanya butuh 1 menit untuk pesanan Anda</p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-orange-200/40 overflow-hidden border border-orange-100">
                    <div className="bg-gray-900 p-6 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-orange-400 text-[10px] font-bold uppercase tracking-tighter">Progress</span>
                            <span className="text-white font-bold">Langkah {step} dari 4</span>
                        </div>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`h-1.5 w-10 rounded-full transition-all duration-500 ${step >= i ? "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]" : "bg-gray-700"}`} />
                            ))}
                        </div>
                    </div>

                    <div className="p-10 min-h-[460px] flex flex-col">
                        <AnimatePresence mode="wait" custom={direction}>
                            {/* STEP 1: PET INFO */}
                            {step === 1 && (
                                <motion.div key="s1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 leading-tight">Siapa nama <br/><span className="text-orange-500 text-3xl italic">Hero</span> kecil Anda?</h3>
                                        <p className="text-gray-400 text-sm mt-2 font-medium">Beri tahu kami siapa yang akan kami manjakan.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="relative group">
                                            <input
                                                autoFocus
                                                type="text"
                                                value={formData.petName}
                                                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                                                className="w-full p-5 pl-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-orange-400 focus:bg-white outline-none transition-all font-bold text-lg group-hover:bg-gray-100/50"
                                                placeholder="Contoh: Snowball"
                                            />
                                            <Sparkles className="absolute right-5 top-5 text-orange-300 pointer-events-none" size={24} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {["Anjing", "Kucing"].map((t) => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, petType: t })}
                                                    className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${formData.petType === t ? "border-orange-500 bg-orange-50 shadow-inner" : "border-gray-100 hover:border-orange-200"}`}
                                                >
                                                    <div className={`p-3 rounded-full ${formData.petType === t ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                                                        {t === "Anjing" ? <Dog size={28} /> : <Cat size={28} />}
                                                    </div>
                                                    <span className={`font-black text-sm uppercase tracking-widest ${formData.petType === t ? "text-orange-600" : "text-gray-400"}`}>{t}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: SERVICES */}
                            {step === 2 && (
                                <motion.div key="s2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                                    <h3 className="text-2xl font-black leading-tight">Layanan apa yang <br/> dibutuhkan <span className="text-orange-500">{formData.petName}</span>?</h3>
                                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {[
                                            { id: 1, name: "Full Grooming", price: "Rp 150k", category: "Premium", desc: "Mandi + Potong + Creambath" },
                                            { id: 2, name: "Pet Hotel", price: "Rp 100k", category: "Stay", desc: "Kamar AC + Makan 3x" },
                                            { id: 4, name: "Basic Grooming", price: "Rp 80k", category: "Standard", desc: "Hanya Mandi & Potong Kuku" },
                                        ].map((s) => (
                                            <button
                                                key={s.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, service_id: s.id, service: s.name })}
                                                className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex items-center justify-between group ${formData.service_id === s.id ? "border-orange-500 bg-orange-50 shadow-md" : "border-gray-50 bg-gray-50/50 hover:border-orange-200"}`}
                                            >
                                                <div>
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500/70">{s.category}</span>
                                                    <h4 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{s.name}</h4>
                                                    <p className="text-xs text-gray-400">{s.desc}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-black text-orange-600">{s.price}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: SCHEDULE */}
                            {step === 3 && (
                                <motion.div key="s3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                                    <h3 className="text-2xl font-black">Atur Waktu Kedatangan</h3>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Tanggal</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-orange-400 focus:bg-white outline-none font-bold appearance-none"
                                                />
                                                <Calendar className="absolute right-5 top-5 text-gray-400 pointer-events-none" size={20} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Jam</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {["09:00", "12:00", "15:00", "17:00", "19:00"].map((t) => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, time: t })}
                                                        className={`p-4 rounded-xl border-2 font-bold text-sm transition-all ${formData.time === t ? "bg-orange-500 border-orange-500 text-white" : "bg-gray-50 border-transparent text-gray-500 hover:border-orange-200"}`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: CUSTOMER INFO */}
                            {step === 4 && (
                                <motion.div key="s4" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-black">Sedikit lagi, Kak!</h3>
                                        <p className="text-gray-400 text-sm mt-1">Konfirmasi kemana kami harus menghubungi Anda.</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                placeholder="Nama Lengkap"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full p-4 pl-12 rounded-xl bg-gray-50 border-2 border-transparent focus:border-orange-400 outline-none font-medium transition-all"
                                            />
                                            <User className="absolute left-4 top-4 text-gray-300" size={20} />
                                        </div>
                                        <div className="relative group">
                                            <input
                                                type="tel"
                                                placeholder="WhatsApp (Contoh: 0812...)"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full p-4 pl-12 rounded-xl bg-gray-50 border-2 border-transparent focus:border-orange-400 outline-none font-medium transition-all"
                                            />
                                            <Smartphone className="absolute left-4 top-4 text-gray-300" size={20} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* NAVIGATION BUTTONS */}
                        <div className="mt-auto pt-8 flex gap-4">
                            {step > 1 && (
                                <button
                                    onClick={() => { setDirection(-1); setStep(step - 1); }}
                                    className="p-5 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                            )}
                            <button
                                onClick={step === 4 ? handleSubmit : () => { setDirection(1); setStep(step + 1); }}
                                disabled={!isStepValid() || loading}
                                className={`flex-1 p-5 rounded-2xl font-black text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${isStepValid() ? "bg-orange-600 hover:bg-orange-700 shadow-orange-200" : "bg-gray-200 cursor-not-allowed text-gray-400"}`}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        {step === 4 ? "Konfirmasi Pesanan" : "Langkah Berikutnya"}
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}