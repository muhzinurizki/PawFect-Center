<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PetController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/PetManagement', [
            'pets' => Pet::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'breed' => 'nullable|string|max:255',
            'owner_name' => 'required|string|max:255',
            'owner_phone' => 'required|string|max:20',
            'notes' => 'nullable|string'
        ]);

        Pet::create($validated);
        return back()->with('message', 'Anabul berhasil didaftarkan ke database!');
    }

    public function update(Request $request, Pet $pet)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'breed' => 'nullable|string|max:255',
            'owner_name' => 'required|string|max:255',
            'owner_phone' => 'required|string|max:20',
            'notes' => 'nullable|string',
        ]);

        $pet->update($validated);
        return back()->with('message', 'Data anabul berhasil diperbarui.');
    }

    public function destroy(Pet $pet)
    {
        $pet->delete();
        return back()->with('message', 'Data anabul telah dihapus dari sistem.');
    }
}