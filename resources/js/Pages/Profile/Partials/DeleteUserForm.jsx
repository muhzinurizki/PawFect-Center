import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { AlertTriangle, Trash2, ShieldAlert } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`${className}`}>
            <header className="mb-8">
                <h2 className="text-xl font-black text-rose-600 uppercase tracking-tight flex items-center gap-2">
                    Termination <span className="text-slate-900">Center</span>
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-500 italic leading-relaxed">
                    Setelah akun dihapus, seluruh data anabul dan histori reservasi akan hilang secara permanen. Tindakan ini tidak dapat dibatalkan.
                </p>
            </header>

            <button
                onClick={confirmUserDeletion}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-rose-100 text-rose-600 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all active:scale-95 shadow-sm"
            >
                <Trash2 size={16} />
                Hapus Akun Permanen
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-10 bg-white">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-rose-100 text-rose-600 rounded-[1.5rem]">
                            <AlertTriangle size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                                Konfirmasi <span className="text-rose-600">Hapus?</span>
                            </h2>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Verifikasi identitas diperlukan
                            </p>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8">
                        Untuk melanjutkan penghapusan akun <span className="font-black text-slate-900">Paws Hub</span> Anda, silakan masukkan password konfirmasi di bawah ini.
                    </p>

                    <div className="group">
                        <InputLabel
                            htmlFor="password"
                            value="Password Konfirmasi"
                            className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-rose-600 transition-colors"
                        />

                        <div className="relative mt-2">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="block w-full border-slate-200 focus:border-rose-500 focus:ring-rose-500 rounded-2xl shadow-sm font-bold text-slate-700 pl-11"
                                placeholder="Masukkan password Anda..."
                                isFocused
                            />
                            <ShieldAlert size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-400 transition-colors" />
                        </div>

                        <InputError message={errors.password} className="mt-2 font-bold text-xs italic" />
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-50 pt-8">
                        <SecondaryButton 
                            onClick={closeModal}
                            className="rounded-2xl border-none bg-slate-100 hover:bg-slate-200 text-slate-600 px-8 py-3 font-black uppercase tracking-widest text-xs"
                        >
                            Batalkan
                        </SecondaryButton>

                        <DangerButton 
                            className="rounded-2xl bg-rose-600 hover:bg-rose-700 px-8 py-3 font-black uppercase tracking-widest text-xs shadow-lg shadow-rose-200 transition-all active:scale-95" 
                            disabled={processing}
                        >
                            Ya, Hapus Akun Saya
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}