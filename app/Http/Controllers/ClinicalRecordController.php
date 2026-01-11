<?php

namespace App\Http\Controllers;

use App\Models\ClinicalRecord;
use App\Models\Pet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClinicalRecordController extends Controller {
    public function index() {
        return Inertia::render('Admin/ClinicalRecord/Index', [
            'clinicalRecords' => ClinicalRecord::with('pet:id,name,type')->latest()->paginate(10),
            'pets' => Pet::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'pet_id' => 'required|exists:pets,id',
            'vet_name' => 'required|string',
            'notes' => 'required|string',
            'weight' => 'nullable|numeric',
            'temperature' => 'nullable|numeric',
        ]);

        ClinicalRecord::create($validated);
        return redirect()->back()->with('success', 'Medical record created successfully.');
    }

    public function update(Request $request, ClinicalRecord $clinicalRecord) {
        $validated = $request->validate([
            'vet_name' => 'required|string',
            'notes' => 'required|string',
            'weight' => 'nullable|numeric',
            'temperature' => 'nullable|numeric',
        ]);

        $clinicalRecord->update($validated);
        return redirect()->back()->with('success', 'Medical record updated.');
    }
}