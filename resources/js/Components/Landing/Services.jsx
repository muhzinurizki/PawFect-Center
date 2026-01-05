import { motion } from 'framer-motion';
import { PawPrint, Calendar, Package, ArrowUpRight } from 'lucide-react';

const services = [
    {
        title: "Professional Grooming",
        desc: "Mandi sehat, potong kuku, hingga styling bulu oleh groomer bersertifikat agar anabul tampil menawan.",
        icon: PawPrint,
        tag: "Best Seller",
        className: "md:col-span-2 bg-orange-50/50 border-orange-100"
    },
    {
        title: "Pet Hotel",
        desc: "Fasilitas bintang lima dengan CCTV 24/7 dan laporan harian.",
        icon: Calendar,
        tag: "Exclusive",
        className: "md:col-span-1 bg-gray-50 border-gray-100"
    },
    {
        title: "Pet Shop",
        desc: "Kurasi makanan premium dan aksesori berkualitas tinggi.",
        icon: Package,
        tag: "Quality",
        className: "md:col-span-1 bg-gray-50 border-gray-100"
    },
    {
        title: "Health Consultation",
        desc: "Konsultasi nutrisi dan kesehatan dasar harian untuk anabul kesayangan Anda.",
        icon: PawPrint,
        tag: "Support",
        className: "md:col-span-2 bg-gray-900 text-white border-transparent"
    }
];

export default function Services() {
    return (
        <section id="services" className="px-6 py-32 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header dengan Style yang Lebih Tajam */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 block">
                            Our Expertise
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                            Layanan Pilihan Untuk <br /> Standar Hidup Anabul.
                        </h2>
                    </div>
                    <p className="text-gray-500 font-medium max-w-sm">
                        Kami menggabungkan kasih sayang dengan profesionalisme untuk memastikan setiap anabul mendapatkan perawatan terbaik.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid gap-6 md:grid-cols-3">
                    {services.map((s, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className={`p-10 rounded-[2.5rem] border transition-all relative group flex flex-col justify-between overflow-hidden ${s.className}`}
                        >
                            {/* Decorative Background Icon */}
                            <s.icon className={`absolute -right-8 -top-8 w-40 h-40 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity`} />

                            <div>
                                <div className="flex justify-between items-start mb-12">
                                    <div className={`p-4 rounded-2xl ${s.title === "Health Consultation" ? "bg-orange-500 text-white" : "bg-white shadow-sm text-orange-600"}`}>
                                        <s.icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${s.title === "Health Consultation" ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-400"}`}>
                                        {s.tag}
                                    </span>
                                </div>
                                
                                <h3 className={`text-2xl font-black tracking-tight mb-4 ${s.title === "Health Consultation" ? "text-white" : "text-gray-900"}`}>
                                    {s.title}
                                </h3>
                                <p className={`leading-relaxed mb-8 ${s.title === "Health Consultation" ? "text-gray-400" : "text-gray-500"}`}>
                                    {s.desc}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all cursor-pointer">
                                <span className={s.title === "Health Consultation" ? "text-orange-500" : "text-gray-900"}>Pelajari Selengkapnya</span>
                                <ArrowUpRight className={`w-4 h-4 ${s.title === "Health Consultation" ? "text-orange-500" : "text-orange-500"}`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}