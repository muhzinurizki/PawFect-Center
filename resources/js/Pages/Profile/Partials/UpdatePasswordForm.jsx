import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { ShieldCheck, Lock, KeyRound } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-8">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    Security <span className="text-indigo-600">Gate</span>
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-500 italic">
                    Gunakan kombinasi karakter yang kuat untuk menjaga akses akun tetap privat.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-8">
                <div className="group">
                    <InputLabel 
                        htmlFor="current_password" 
                        value="Password Saat Ini" 
                        className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    />

                    <div className="relative mt-2">
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            className="block w-full border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-2xl shadow-sm font-bold text-slate-700 pl-11"
                            autoComplete="current-password"
                        />
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors" />
                    </div>

                    <InputError message={errors.current_password} className="mt-2 font-bold text-xs italic" />
                </div>

                <div className="group">
                    <InputLabel 
                        htmlFor="password" 
                        value="Password Baru" 
                        className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    />

                    <div className="relative mt-2">
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="block w-full border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-2xl shadow-sm font-bold text-slate-700 pl-11"
                            autoComplete="new-password"
                        />
                        <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors" />
                    </div>

                    <InputError message={errors.password} className="mt-2 font-bold text-xs italic" />
                </div>

                <div className="group">
                    <InputLabel 
                        htmlFor="password_confirmation" 
                        value="Konfirmasi Password Baru" 
                        className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    />

                    <div className="relative mt-2">
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            className="block w-full border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-2xl shadow-sm font-bold text-slate-700 pl-11"
                            autoComplete="new-password"
                        />
                        <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors" />
                    </div>

                    <InputError message={errors.password_confirmation} className="mt-2 font-bold text-xs italic" />
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                    <PrimaryButton 
                        disabled={processing}
                        className="bg-slate-900 hover:bg-indigo-600 rounded-2xl px-8 py-3 font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg shadow-slate-200 hover:shadow-indigo-200"
                    >
                        Ganti Password
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-500"
                        enterFrom="opacity-0 translate-x-4"
                        leave="transition ease-in-out duration-500"
                        leaveTo="opacity-0 -translate-x-4"
                    >
                        <p className="text-sm font-black text-indigo-600 flex items-center gap-2 italic uppercase tracking-tighter">
                            <ShieldCheck size={18} /> Keamanan Terupdate
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}