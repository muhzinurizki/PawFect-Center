import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-8">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    Personal <span className="text-orange-500">Details</span>
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-500 italic">
                    Kelola identitas akun Anda agar tetap terbaru dan valid.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-8">
                <div className="group">
                    <InputLabel 
                        htmlFor="name" 
                        value="Nama Lengkap" 
                        className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-orange-500 transition-colors"
                    />

                    <TextInput
                        id="name"
                        className="mt-2 block w-full border-slate-200 focus:border-orange-500 focus:ring-orange-500 rounded-2xl shadow-sm font-bold text-slate-700"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2 font-bold text-xs italic" message={errors.name} />
                </div>

                <div className="group">
                    <InputLabel 
                        htmlFor="email" 
                        value="Alamat Email" 
                        className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-orange-500 transition-colors"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-2 block w-full border-slate-200 focus:border-orange-500 focus:ring-orange-500 rounded-2xl shadow-sm font-bold text-slate-700"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2 font-bold text-xs italic" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <p className="text-sm font-bold text-orange-800">
                            Email Anda belum terverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ms-2 rounded-md text-sm font-black uppercase tracking-tighter text-orange-600 underline hover:text-orange-900 focus:outline-none"
                            >
                                Klik di sini untuk kirim ulang.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-black text-emerald-600 flex items-center gap-1 uppercase tracking-tighter">
                                <CheckCircle2 size={14} /> Link verifikasi baru telah dikirim!
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                    <PrimaryButton 
                        disabled={processing}
                        className="bg-slate-900 hover:bg-orange-600 rounded-2xl px-8 py-3 font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg shadow-slate-200 hover:shadow-orange-200"
                    >
                        Update Profil
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-500"
                        enterFrom="opacity-0 translate-x-4"
                        leave="transition ease-in-out duration-500"
                        leaveTo="opacity-0 -translate-x-4"
                    >
                        <p className="text-sm font-black text-emerald-600 flex items-center gap-2 italic uppercase tracking-tighter">
                            <CheckCircle2 size={18} /> Berhasil Disimpan
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}