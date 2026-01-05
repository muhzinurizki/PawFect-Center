import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { User, ShieldCheck, AlertTriangle, Settings } from 'lucide-react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="text-3xl font-black leading-tight text-slate-900 tracking-tight">
                        Account <span className="text-orange-500 italic">Settings.</span>
                    </h2>
                    <p className="text-slate-400 text-sm font-bold mt-1 uppercase tracking-widest">Kelola informasi profil dan keamanan akun Anda</p>
                </div>
            }
        >
            <Head title="Profile Settings" />

            <div className="py-12 bg-[#F8FAFC] min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-10">
                    
                    {/* Section 1: Profil Information */}
                    <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-10 py-8 border-b border-slate-50 flex items-center gap-4 bg-white">
                            <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl">
                                <User size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase">Informasi Profil</h4>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Update nama dan alamat email akun Anda</p>
                            </div>
                        </div>
                        <div className="p-10">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-2xl"
                            />
                        </div>
                    </div>

                    {/* Section 2: Security / Password */}
                    <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-10 py-8 border-b border-slate-50 flex items-center gap-4 bg-white">
                            <div className="p-3 bg-indigo-50 text-indigo-500 rounded-2xl">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase">Keamanan Akun</h4>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pastikan akun Anda menggunakan password yang kuat</p>
                            </div>
                        </div>
                        <div className="p-10">
                            <UpdatePasswordForm className="max-w-2xl" />
                        </div>
                    </div>

                    {/* Section 3: Danger Zone */}
                    <div className="bg-rose-50/30 rounded-[3rem] border-2 border-dashed border-rose-100 overflow-hidden">
                        <div className="px-10 py-8 border-b border-rose-100 flex items-center gap-4">
                            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-rose-600 text-xl tracking-tight uppercase">Zona Bahaya</h4>
                                <p className="text-xs text-rose-400 font-bold uppercase tracking-widest text-opacity-80">Hapus akun secara permanen</p>
                            </div>
                        </div>
                        <div className="p-10">
                            <DeleteUserForm className="max-w-2xl" />
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}