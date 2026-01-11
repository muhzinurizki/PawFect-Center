import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { 
    Plus, X, Stethoscope, Save, Activity, 
    Search, Thermometer, Weight, Calendar,
    ChevronRight, ClipboardList, TrendingUp
} from "lucide-react";

export default function Index({ auth, clinicalRecords, pets }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [activeId, setActiveId] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            pet_id: "",
            vet_name: auth.user.name,
            notes: "",
            weight: "",
            temperature: "",
        });

    const openCreateModal = () => {
        setEditMode(false);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (record) => {
        setEditMode(true);
        setActiveId(record.id);
        setData({
            pet_id: record.pet_id,
            vet_name: record.vet_name,
            notes: record.notes,
            weight: record.weight || "",
            temperature: record.temperature || "",
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        const action = editMode ? put : post;
        const url = editMode
            ? route("clinical-records.update", activeId)
            : route("clinical-records.store");
        action(url, { onSuccess: () => setIsModalOpen(false) });
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Clinical Records">
            <Head title="Clinical Logs" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* --- STATS OVERVIEW --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard 
                        icon={<ClipboardList className="text-blue-500" />} 
                        label="Total Entries" 
                        value={clinicalRecords.data.length} 
                        subLabel="All-time medical logs"
                    />
                    <StatCard 
                        icon={<Activity className="text-orange-500" />} 
                        label="Recent Activity" 
                        value="Active" 
                        subLabel="System monitoring live"
                    />
                    <StatCard 
                        icon={<TrendingUp className="text-emerald-500" />} 
                        label="Patient Growth" 
                        value={pets.length} 
                        subLabel="Registered subjects"
                    />
                </div>

                {/* --- HEADER ACTIONS --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h3 className="font-black text-slate-900 uppercase tracking-tighter text-2xl flex items-center gap-2">
                            <Stethoscope className="text-orange-500" size={24} />
                            Clinical_Feed
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Real-time Diagnostic Intelligence</p>
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                        <button
                            onClick={openCreateModal}
                            className="flex-1 md:flex-none bg-slate-900 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl shadow-slate-200"
                        >
                            <Plus size={16} /> New_Medical_Entry
                        </button>
                    </div>
                </div>

                {/* --- CONTENT LIST --- */}
                <div className="space-y-4">
                    {clinicalRecords.data.length > 0 ? (
                        clinicalRecords.data.map((log) => (
                            <div
                                key={log.id}
                                className="bg-white border border-slate-100 p-6 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden"
                            >
                                {/* Decoration line */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-all"></div>

                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                                        <Activity size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">
                                                {log.pet?.name || 'Unknown_Subject'}
                                            </h4>
                                            <span className="bg-slate-100 text-[8px] font-black px-2 py-1 rounded-md text-slate-500 uppercase">
                                                {log.pet?.type || 'Pet'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1 text-orange-500"><Calendar size={12}/> {new Date(log.created_at).toLocaleDateString()}</span>
                                            <span>Vet: {log.vet_name}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Vital Signs Preview */}
                                <div className="flex gap-4">
                                    <VitalTag icon={<Weight size={12}/>} value={`${log.weight || '-'} kg`} label="Weight" />
                                    <VitalTag icon={<Thermometer size={12}/>} value={`${log.temperature || '-'} °C`} label="Temp" />
                                </div>

                                <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                                    <button
                                        onClick={() => openEditModal(log)}
                                        className="flex-1 md:flex-none px-6 py-3 bg-slate-50 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        Edit_Log <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] py-20 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Stethoscope className="text-slate-200" size={40} />
                            </div>
                            <h4 className="font-black text-slate-300 uppercase tracking-[0.3em]">No_Records_Found</h4>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODAL (TETAP SAMA TAPI DENGAN STYLE TERKINI) --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)}></div>
                    <form onSubmit={submit} className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <div>
                                <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest">{editMode ? "Update_Clinical_Record" : "New_Entry_Protocol"}</h4>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Medical Diagnostic Interface</p>
                            </div>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors">
                                <X size={18} className="text-slate-300" />
                            </button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto space-y-6 custom-scrollbar">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-slate-400 ml-1 tracking-widest">Patient_Subject</label>
                                <select disabled={editMode} value={data.pet_id} onChange={(e) => setData("pet_id", e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-xs font-bold focus:ring-2 focus:ring-orange-500 transition-all">
                                    <option value="">Select...</option>
                                    {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.name.toUpperCase()}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-1 tracking-widest">Weight (Kg)</label>
                                    <input type="number" step="0.1" placeholder="0.0" value={data.weight} onChange={(e) => setData("weight", e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-xs font-bold focus:ring-2 focus:ring-orange-500" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-1 tracking-widest">Temperature (°C)</label>
                                    <input type="number" step="0.1" placeholder="0.0" value={data.temperature} onChange={(e) => setData("temperature", e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-xs font-bold focus:ring-2 focus:ring-orange-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-slate-400 ml-1 tracking-widest">Clinical_Observation</label>
                                <textarea placeholder="Enter detailed findings..." value={data.notes} onChange={(e) => setData("notes", e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 text-xs font-bold min-h-[120px] focus:ring-2 focus:ring-orange-500 resize-none"></textarea>
                                {errors.notes && <p className="text-rose-500 text-[9px] font-bold px-2">{errors.notes}</p>}
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50/50 flex gap-3">
                            <button type="submit" disabled={processing} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/10 disabled:opacity-50">
                                <Save size={16} /> {editMode ? "Authorize_Update" : "Finalize_Entry"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

// --- SUB-COMPONENTS ---

function StatCard({ icon, label, value, subLabel }) {
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl">
                {icon}
            </div>
            <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                <h4 className="text-xl font-black text-slate-900 tracking-tighter leading-none">{value}</h4>
                <p className="text-[8px] font-bold text-slate-300 uppercase mt-1">{subLabel}</p>
            </div>
        </div>
    );
}

function VitalTag({ icon, value, label }) {
    return (
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
            <div className="text-slate-400">{icon}</div>
            <div>
                <p className="text-[7px] font-black text-slate-400 uppercase leading-none">{label}</p>
                <p className="text-[10px] font-black text-slate-900 leading-none mt-0.5 tracking-tight">{value}</p>
            </div>
        </div>
    );
}