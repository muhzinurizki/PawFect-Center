import { motion } from 'framer-motion';

export default function Stats() {
    const data = [
        { label: "Anabul Terlayani", value: "2,000", suffix: "+" },
        { label: "Groomer Profesional", value: "12", suffix: "" },
        { label: "Kapasitas Hotel", value: "50", suffix: "" },
        { label: "Rating Google", value: "4.9", suffix: "/5" },
    ];

    return (
        <section className="relative py-24 bg-[#0A0A0A] overflow-hidden">
            {/* Dekorasi Cahaya Halus agar tidak flat */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-0">
                    {data.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative px-8 text-center ${
                                i !== data.length - 1 ? "md:border-r border-gray-800" : ""
                            }`}
                        >
                            {/* Efek angka yang besar dan tajam */}
                            <div className="flex items-baseline justify-center gap-1">
                                <motion.span 
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 100, delay: i * 0.1 + 0.3 }}
                                    className="text-5xl md:text-6xl font-black text-white tracking-tighter"
                                >
                                    {item.value}
                                </motion.span>
                                <span className="text-2xl font-bold text-orange-500">{item.suffix}</span>
                            </div>
                            
                            {/* Label dengan gaya minimalis premium */}
                            <div className="mt-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
                                    {item.label}
                                </span>
                            </div>

                            {/* Dot aksen di bawah setiap stat */}
                            <div className="mt-6 flex justify-center">
                                <div className="w-1 h-1 bg-orange-500/50 rounded-full" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Sub-Border dekoratif bawah */}
            <div className="mt-20 max-w-4xl mx-auto border-b border-gray-800/50" />
        </section>
    );
}