import { PawPrint, Instagram, Facebook, MessageCircle, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { title: "Layanan", links: ["Grooming Sehat", "Pet Hotel Premium", "Vaksinasi & Medis", "Pet Shop Online"] },
        { title: "Perusahaan", links: ["Tentang Kami", "Karier", "Kemitraan", "Kebijakan Privasi"] }
    ];

    return (
        <footer className="bg-[#0A0A0A] text-gray-400 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                
                {/* Top Section: CTA & Social */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    
                    {/* Brand Info (Span 5) */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 text-white mb-8">
                            <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
                                <PawPrint className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase">PawFect</span>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-500 max-w-sm mb-10">
                            Menghadirkan standar baru dalam perawatan anabul eksklusif. Kepercayaan Anda adalah prioritas kami.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                                <motion.a 
                                    key={i} 
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    href="#" 
                                    className="p-3 bg-gray-900 border border-gray-800 rounded-2xl text-gray-400 hover:text-orange-500 hover:border-orange-500/50 transition-all shadow-xl"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links (Span 4) */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        {footerLinks.map((group, i) => (
                            <div key={i}>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">
                                    {group.title}
                                </h4>
                                <ul className="space-y-4">
                                    {group.links.map((link, j) => (
                                        <li key={j}>
                                            <a href="#" className="text-sm hover:text-orange-500 flex items-center group transition-colors">
                                                {link}
                                                <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact Info (Span 3) */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">
                            Hubungi Kami
                        </h4>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                                <span className="text-sm leading-relaxed">Gading Serpong, <br /> Tangerang, Banten</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                                <span className="text-sm font-bold text-white">+62 812 3456 7890</span>
                            </div>
                            <div className="pt-6 border-t border-gray-900">
                                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Jam Operasional</p>
                                <p className="text-sm text-gray-400 font-medium">08:00 — 20:00 (Setiap Hari)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Fine Print */}
                <div className="pt-12 border-t border-gray-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">
                        © {currentYear} PAWFECT CENTER — BEYOND PET CARE.
                    </p>
                    <div className="flex gap-8 text-[10px] font-bold tracking-widest text-gray-600 uppercase">
                        <a href="#" className="hover:text-white transition">Terms</a>
                        <a href="#" className="hover:text-white transition">Privacy</a>
                        <a href="#" className="hover:text-white transition">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}