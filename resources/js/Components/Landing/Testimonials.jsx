import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
    { 
        name: "Budi Santoso", 
        pet: "Ciko (Golden Retriever)", 
        text: "Grooming terbaik! Ciko biasanya takut mandi, tapi di sini dia tenang banget. Pulang-pulang wangi tahan lama.",
        initials: "BS"
    },
    { 
        name: "Siska Amelia", 
        pet: "Mimi (Persian Cat)", 
        text: "Hotelnya bersih dan saya dikirimi update foto Mimi tiap pagi. Jadi tenang ninggalin kucing pas mudik.",
        initials: "SA"
    },
    { 
        name: "Andi Wijaya", 
        pet: "Rocky (Bulldog)", 
        text: "Adminnya responsif. Booking via web langsung dapet jadwal, nggak perlu nunggu chat dibalas lama.",
        initials: "AW"
    },
];

export default function Testimonials() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Dekorasi Background - Menjaga konsistensi dengan Hero */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-100 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 block">
                        Real Experiences
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter">
                        Dicintai Anabul, <br />Dipercaya Pemilik.
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {reviews.map((r, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative group p-10 bg-gray-50/50 rounded-[2.5rem] border border-transparent hover:border-orange-100 hover:bg-white hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500"
                        >
                            {/* Icon Quote sebagai aksen halus */}
                            <Quote className="absolute top-10 right-10 w-8 h-8 text-orange-200/40 group-hover:text-orange-200 transition-colors" />

                            <div className="flex gap-1 mb-8">
                                {[...Array(5)].map((_, starIndex) => (
                                    <Star key={starIndex} className="w-4 h-4 fill-orange-400 text-orange-400" />
                                ))}
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-10 relative z-10">
                                "{r.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-200">
                                    {r.initials}
                                </div>
                                <div>
                                    <h4 className="font-black text-gray-900 tracking-tight">{r.name}</h4>
                                    <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">{r.pet}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}