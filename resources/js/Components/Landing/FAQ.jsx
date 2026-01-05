import { Disclosure, Transition } from '@headlessui/react';
import { Plus } from 'lucide-react'; // Menggunakan Plus agar lebih modern daripada Chevron
import { motion } from 'framer-motion';

const faqs = [
    { q: "Apakah harus bawa perlengkapan sendiri untuk Pet Hotel?", a: "Kami menyediakan fasilitas lengkap seperti kasur ortopedi dan mangkuk makan premium. Namun, kami sangat menyarankan membawa pakan sendiri untuk menjaga stabilitas diet dan kenyamanan pencernaan anabul Anda." },
    { q: "Berapa lama proses grooming?", a: "Proses standar memakan waktu 1.5 hingga 3 jam. Waktu ini mencakup sesi relaksasi, mandi terapi, pengeringan, hingga styling detail sesuai permintaan Anda." },
    { q: "Apakah bisa booking untuk hari yang sama?", a: "Tergantung ketersediaan slot. Sistem reservasi real-time kami akan selalu menampilkan jadwal yang paling update untuk memastikan layanan tidak terburu-buru." },
];

export default function FAQ() {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 block">
                        Customer Support
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter">
                        Informasi yang Anda <br /> Perlukan.
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <Disclosure key={i}>
                            {({ open }) => (
                                <motion.div 
                                    initial={false}
                                    className={`border-b border-gray-100 transition-all duration-300 ${open ? 'pb-6' : 'pb-0'}`}
                                >
                                    <Disclosure.Button className="flex justify-between items-center w-full py-8 text-left group">
                                        <span className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${open ? 'text-orange-500' : 'text-gray-800 group-hover:text-orange-500'}`}>
                                            {faq.q}
                                        </span>
                                        <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${open ? 'rotate-45 text-orange-500' : 'text-gray-400'}`}>
                                            <Plus className="w-6 h-6" />
                                        </div>
                                    </Disclosure.Button>

                                    <Transition
                                        show={open}
                                        enter="transition-all duration-500 ease-out"
                                        enterFrom="max-h-0 opacity-0 transform -translate-y-4"
                                        enterTo="max-h-96 opacity-100 transform translate-y-0"
                                        leave="transition-all duration-300 ease-in"
                                        leaveFrom="max-h-96 opacity-100 transform translate-y-0"
                                        leaveTo="max-h-0 opacity-0 transform -translate-y-4"
                                    >
                                        <Disclosure.Panel static className="text-gray-500 text-lg leading-relaxed max-w-2xl pr-8">
                                            {faq.a}
                                        </Disclosure.Panel>
                                    </Transition>
                                </motion.div>
                            )}
                        </Disclosure>
                    ))}
                </div>

                {/* Footer FAQ - CTA Tambahan */}
                <div className="mt-20 text-center">
                    <p className="text-gray-400 font-medium">
                        Punya pertanyaan lain? <a href="#" className="text-orange-500 font-bold hover:underline">Hubungi Tim Kami melalui WhatsApp</a>
                    </p>
                </div>
            </div>
        </section>
    );
}