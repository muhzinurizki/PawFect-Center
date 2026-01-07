import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Dog,
    Cat,
    Search,
    Plus,
    User,
    Phone,
    History,
    AlertCircle,
    Edit2,
    X,
    Sparkles,
    ShieldAlert,
    ChevronRight,
    Hash,
} from "lucide-react";
import Modal from "@/Components/Modal";

export default function PetManagement({ auth, pets = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: "",
        type: "Cat",
        breed: "",
        owner_name: "",
        owner_phone: "",
        notes: "",
    });

    const filteredPets = pets.filter(
        (pet) =>
            pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.owner_phone.includes(searchTerm)
    );

    const openModal = (pet = null) => {
        if (pet) {
            setSelectedPet(pet);
            setData({
                name: pet.name,
                type: pet.type,
                breed: pet.breed || "",
                owner_name: pet.owner_name,
                owner_phone: pet.owner_phone,
                notes: pet.notes || "",
            });
        } else {
            setSelectedPet(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (selectedPet) {
            put(route("pets.update", selectedPet.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setSelectedPet(null);
                },
            });
        } else {
            post(route("pets.store"), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pet Management" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em]">
                            <Sparkles size={14} /> Clinic Registry
                        </div>
                        <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
                            Pet{" "}
                            <span className="text-slate-400 font-light">
                                Database
                            </span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search pet, owner, or phone..."
                                className="pl-12 pr-6 py-4 bg-white border-none rounded-[1.5rem] text-xs font-bold shadow-sm ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500 w-full sm:w-80 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
                                size={18}
                            />
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="bg-slate-900 hover:bg-indigo-600 text-white flex items-center gap-3 px-8 py-4 rounded-[1.5rem] transition-all shadow-xl shadow-slate-200 active:scale-95 group"
                        >
                            <Plus
                                size={20}
                                className="group-hover:rotate-90 transition-transform duration-300"
                            />
                            <span className="text-xs font-black uppercase tracking-widest">
                                Add Patient
                            </span>
                        </button>
                    </div>
                </div>

                {/* --- STATS BRIEF --- */}
                <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="bg-white px-8 py-5 rounded-[2rem] border border-slate-50 shadow-sm flex items-center gap-4 min-w-fit">
                        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Hash size={18} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                Total Patients
                            </p>
                            <p className="text-xl font-black text-slate-900 leading-tight">
                                {pets.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- PET GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredPets.length > 0 ? (
                        filteredPets.map((pet) => (
                            <PetCard
                                key={pet.id}
                                pet={pet}
                                onEdit={() => openModal(pet)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center">
                            <Dog size={48} className="text-slate-300 mb-4" />
                            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                                No records found
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODAL FORM --- */}
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                maxWidth="2xl"
            >
                <div className="relative overflow-hidden bg-white rounded-[2rem]">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0 opacity-50" />

                    <form onSubmit={submit} className="relative p-10 z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">
                                    {selectedPet
                                        ? "Edit Details"
                                        : "Registration"}
                                </h2>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                                    {selectedPet
                                        ? `Updating record for ${selectedPet.name}`
                                        : "Adding new patient to system"}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 bg-slate-50 text-slate-400 hover:text-rose-500 rounded-xl transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                                    Pet Name
                                </label>
                                <input
                                    type="text"
                                    className="premium-input"
                                    placeholder="e.g. Luna"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                {errors.name && (
                                    <span className="text-rose-500 text-[10px] font-bold mt-1 ml-1 uppercase">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                                    Species
                                </label>
                                <select
                                    className="premium-input"
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                >
                                    <option value="Cat">Cat 🐈</option>
                                    <option value="Dog">Dog 🐕</option>
                                    <option value="Other">Other 🐾</option>
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                                    Breed / Ras
                                </label>
                                <input
                                    type="text"
                                    className="premium-input"
                                    placeholder="e.g. Persian, Golden Retriever"
                                    value={data.breed}
                                    onChange={(e) =>
                                        setData("breed", e.target.value)
                                    }
                                />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                                    Owner Name
                                </label>
                                <input
                                    type="text"
                                    className="premium-input"
                                    value={data.owner_name}
                                    onChange={(e) =>
                                        setData("owner_name", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    className="premium-input"
                                    value={data.owner_phone}
                                    onChange={(e) =>
                                        setData("owner_phone", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                                    Medical/Behavior Notes
                                </label>
                                <textarea
                                    className="premium-input min-h-[100px] py-4"
                                    placeholder="Important notes..."
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                ></textarea>
                            </div>
                        </div>

                        <div className="mt-10 flex items-center justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-95"
                            >
                                {selectedPet
                                    ? "Apply Changes"
                                    : "Confirm Registration"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .premium-input {
                    width: 100%;
                    background-color: #f8fafc;
                    border: none;
                    border-radius: 1.25rem;
                    padding: 1rem 1.25rem;
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #1e293b;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .premium-input:focus {
                    background-color: white;
                    box-shadow: 0 0 0 2px #6366f1;
                    outline: none;
                }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
            `,
                }}
            />
        </AuthenticatedLayout>
    );
}

// --- CARD COMPONENT ---
function PetCard({ pet, onEdit }) {
    const isCat = pet.type === "Cat";

    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group overflow-hidden flex flex-col">
            <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-8">
                    <div
                        className={`p-5 rounded-[2rem] transition-transform duration-500 group-hover:scale-110 shadow-inner ${
                            isCat
                                ? "bg-orange-50 text-orange-500"
                                : "bg-indigo-50 text-indigo-500"
                        }`}
                    >
                        {isCat ? <Cat size={32} /> : <Dog size={32} />}
                    </div>
                    <button
                        onClick={onEdit}
                        className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                    >
                        <Edit2 size={18} />
                    </button>
                </div>

                <div className="mb-8">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors italic">
                        {pet.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.1em] px-3 py-1.5 bg-slate-900 text-white rounded-full">
                            {pet.type}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.1em] px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full">
                            {pet.breed || "Mixed"}
                        </span>
                    </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                            <User size={16} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                                Owner
                            </p>
                            <p className="font-bold text-slate-800 text-sm leading-none">
                                {pet.owner_name}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                            <Phone size={16} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                                Contact
                            </p>
                            <p className="font-bold text-slate-800 text-sm leading-none">
                                {pet.owner_phone}
                            </p>
                        </div>
                    </div>
                </div>

                {pet.notes && (
                    <div className="mt-8 p-5 bg-rose-50/50 rounded-[1.8rem] border border-rose-100 flex gap-4 items-start">
                        <ShieldAlert
                            size={18}
                            className="text-rose-500 shrink-0"
                        />
                        <p className="text-[11px] text-rose-700 font-bold leading-relaxed uppercase tracking-tight italic">
                            {pet.notes}
                        </p>
                    </div>
                )}
            </div>

            <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between group-hover:bg-indigo-50 transition-colors">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
                    <History size={14} /> History
                </button>
                <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-indigo-600">
                    View Info <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
}
